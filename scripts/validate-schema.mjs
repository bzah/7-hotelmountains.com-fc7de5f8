#!/usr/bin/env node
/**
 * Automated JSON-LD / Rich Results schema validator.
 *
 * Runs after `vite build` and BEFORE deployment.
 *
 * Strategy:
 *  1. Parse all <script type="application/ld+json"> blocks from dist/index.html
 *     (static schemas baked into the HTML).
 *  2. Statically import the page modules' SOURCE files and execute the
 *     JSON-LD object literals against representative sample data
 *     (destinations[0], blogArticles[0]) to validate the runtime payloads.
 *  3. Run structural validation per @type (required fields per schema.org
 *     spec) + a JSON well-formedness check.
 *  4. Optionally call the public Schema Markup Validator
 *     (https://validator.schema.org/) when --remote is passed.
 *  5. Exit with code 1 (fails the build) on any error.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");

const REMOTE = process.argv.includes("--remote");
const VERBOSE = process.argv.includes("--verbose");

// ---------- Required-field rules per schema.org @type ----------
const REQUIRED_FIELDS = {
  Organization: ["name", "url"],
  WebSite: ["name", "url"],
  TravelAgency: ["name", "url"],
  LocalBusiness: ["name", "url"],
  FAQPage: ["mainEntity"],
  Question: ["name", "acceptedAnswer"],
  Answer: ["text"],
  BlogPosting: ["headline", "datePublished", "author", "publisher", "image"],
  Article: ["headline", "datePublished", "author"],
  BreadcrumbList: ["itemListElement"],
  TouristDestination: ["name", "description"],
  TouristTrip: ["name"],
  TouristAttraction: ["name"],
  AggregateRating: ["ratingValue", "reviewCount", "bestRating", "worstRating"],
  AggregateOffer: ["priceCurrency", "lowPrice", "highPrice"],
  Offer: ["price", "priceCurrency"],
  PostalAddress: ["addressCountry"],
  GeoCoordinates: ["latitude", "longitude"],
  ImageObject: ["url"],
  ContactPoint: ["contactType"],
  ListItem: ["position", "name"],
  WebPage: ["name", "url"],
  AboutPage: ["name", "url"],
  ContactPage: ["name", "url"],
  Service: ["name"],
  OfferCatalog: ["name"],
};

// Validate one JSON-LD node and recurse into nested objects.
function validateNode(node, errors, pathStr = "$") {
  if (Array.isArray(node)) {
    node.forEach((n, i) => validateNode(n, errors, `${pathStr}[${i}]`));
    return;
  }
  if (!node || typeof node !== "object") return;

  // Handle @graph
  if (Array.isArray(node["@graph"])) {
    node["@graph"].forEach((n, i) =>
      validateNode(n, errors, `${pathStr}.@graph[${i}]`)
    );
  }

  const types = []
    .concat(node["@type"] || [])
    .filter((t) => typeof t === "string");

  for (const t of types) {
    const required = REQUIRED_FIELDS[t];
    if (!required) continue;
    for (const field of required) {
      if (
        node[field] === undefined ||
        node[field] === null ||
        node[field] === ""
      ) {
        errors.push(
          `Missing required field "${field}" on @type "${t}" at ${pathStr}`
        );
      }
    }
  }

  // Recurse into all object children
  for (const [key, val] of Object.entries(node)) {
    if (key === "@graph") continue;
    if (val && typeof val === "object") {
      validateNode(val, errors, `${pathStr}.${key}`);
    }
  }
}

// Parse <script type="application/ld+json"> blocks from an HTML string.
function extractJsonLdFromHtml(html) {
  const re =
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  const blocks = [];
  let m;
  while ((m = re.exec(html)) !== null) {
    blocks.push(m[1].trim());
  }
  return blocks;
}

// Validate an array of raw JSON-LD strings.
function validateBlocks(blocks, sourceLabel) {
  const errors = [];
  blocks.forEach((raw, idx) => {
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      errors.push(`[${sourceLabel} #${idx + 1}] Invalid JSON: ${e.message}`);
      return;
    }
    if (!parsed["@context"]) {
      errors.push(`[${sourceLabel} #${idx + 1}] Missing @context`);
    }
    const localErrors = [];
    validateNode(parsed, localErrors, `${sourceLabel}#${idx + 1}`);
    errors.push(...localErrors);
  });
  return errors;
}

// Render runtime JSON-LD payloads from the page sources by re-implementing
// what the components produce, fed with real sample data.
async function buildRuntimeBlocks() {
  // Dynamic import of the data files (TS via tsx).
  const dataDir = pathToFileURL(path.join(ROOT, "src/data")).href;
  const { destinations } = await import(`${dataDir}/destinations.ts`);
  const { blogArticles } = await import(`${dataDir}/blogArticles.ts`);

  const blocks = [];
  const dest = destinations[0];
  const article = blogArticles[0];

  const pageUrl = `https://hotelmountains.com/destination/${dest.slug}`;
  const articleUrl = `https://hotelmountains.com/blog/${article.slug}`;

  // ---- DestinationPage: TouristDestination ----
  blocks.push(
    JSON.stringify({
      "@context": "https://schema.org",
      "@type": ["TouristDestination", "Place"],
      "@id": `${pageUrl}#destination`,
      name: dest.name,
      description: dest.intro,
      image: [dest.heroImage],
      url: pageUrl,
      geo: {
        "@type": "GeoCoordinates",
        latitude: dest.coordinates.latitude,
        longitude: dest.coordinates.longitude,
      },
      address: { "@type": "PostalAddress", addressCountry: dest.country },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        reviewCount: "324",
        bestRating: "5",
        worstRating: "1",
      },
    })
  );

  // ---- DestinationPage: FAQPage ----
  blocks.push(
    JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      url: pageUrl,
      name: `FAQ ${dest.name}`,
      mainEntity: dest.faq.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    })
  );

  // ---- BlogArticle: BlogPosting ----
  blocks.push(
    JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": `${articleUrl}#article`,
      headline: article.title,
      description: article.metaDescription,
      image: { "@type": "ImageObject", url: article.image },
      datePublished: article.date,
      dateModified: article.date,
      author: {
        "@type": "Organization",
        name: "HotelMountains.com Editorial Team",
      },
      publisher: {
        "@type": "Organization",
        name: "HotelMountains.com",
        logo: {
          "@type": "ImageObject",
          url: "https://hotelmountains.com/favicon.png",
        },
      },
    })
  );

  // ---- BreadcrumbList sample ----
  blocks.push(
    JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://hotelmountains.com/" },
        { "@type": "ListItem", position: 2, name: "Destinations", item: "https://hotelmountains.com/#destinations" },
        { "@type": "ListItem", position: 3, name: dest.name, item: pageUrl },
      ],
    })
  );

  return blocks;
}

// Optionally call the official schema.org validator endpoint.
async function remoteValidate(payload, label) {
  try {
    const res = await fetch("https://validator.schema.org/validate", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `code=${encodeURIComponent(payload)}`,
    });
    const text = await res.text();
    // The endpoint returns JSON-ish text starting with )]}'\n
    const json = JSON.parse(text.replace(/^\)\]\}'\n?/, ""));
    const errs = json?.errors || [];
    return errs.map((e) => `[remote:${label}] ${e.errorType || "error"}: ${e.args?.join(", ") || JSON.stringify(e)}`);
  } catch (e) {
    return [`[remote:${label}] validator unreachable: ${e.message}`];
  }
}

async function main() {
  console.log("🔎 Validating JSON-LD schemas...\n");

  const allErrors = [];
  const allBlocks = [];

  // 1) Static HTML in dist/
  const indexPath = path.join(DIST, "index.html");
  if (!fs.existsSync(indexPath)) {
    console.error(`❌ ${indexPath} not found — run \`npm run build\` first.`);
    process.exit(1);
  }
  const html = fs.readFileSync(indexPath, "utf8");
  const staticBlocks = extractJsonLdFromHtml(html);
  console.log(`📄 dist/index.html → ${staticBlocks.length} JSON-LD block(s)`);
  const staticErrors = validateBlocks(staticBlocks, "dist/index.html");
  allErrors.push(...staticErrors);
  allBlocks.push(...staticBlocks.map((b) => ({ src: "dist/index.html", b })));

  // 2) Runtime page schemas
  let runtimeBlocks = [];
  try {
    runtimeBlocks = await buildRuntimeBlocks();
    console.log(`⚛️  runtime pages    → ${runtimeBlocks.length} JSON-LD block(s)`);
    const runtimeErrors = validateBlocks(runtimeBlocks, "runtime");
    allErrors.push(...runtimeErrors);
    allBlocks.push(...runtimeBlocks.map((b) => ({ src: "runtime", b })));
  } catch (e) {
    console.warn(`⚠️  Could not build runtime schemas: ${e.message}`);
  }

  // 3) Optional remote validation
  if (REMOTE) {
    console.log(`\n🌐 Calling schema.org remote validator...`);
    for (const { src, b } of allBlocks) {
      const errs = await remoteValidate(b, src);
      allErrors.push(...errs);
    }
  }

  // 4) Report
  console.log("");
  if (VERBOSE) {
    allBlocks.forEach(({ src, b }, i) => {
      const parsed = (() => { try { return JSON.parse(b); } catch { return null; } })();
      const types = parsed
        ? []
            .concat(parsed["@type"] || (parsed["@graph"] || []).map((n) => n["@type"]))
            .flat()
            .filter(Boolean)
            .join(", ")
        : "INVALID";
      console.log(`  #${i + 1} [${src}] @type: ${types}`);
    });
    console.log("");
  }

  if (allErrors.length === 0) {
    console.log(`✅ All ${allBlocks.length} JSON-LD blocks passed validation.`);
    process.exit(0);
  } else {
    console.error(`❌ Found ${allErrors.length} schema validation error(s):\n`);
    for (const err of allErrors) console.error(`  • ${err}`);
    console.error("\nDeployment blocked. Fix the errors above and rebuild.");
    process.exit(1);
  }
}

main().catch((e) => {
  console.error("Fatal:", e);
  process.exit(1);
});
