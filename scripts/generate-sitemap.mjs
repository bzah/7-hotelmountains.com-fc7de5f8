/**
 * Sitemap generator — Rank Math style.
 *
 * Reads:
 *   - src/data/destinations.ts
 *   - src/data/blogArticles.ts
 *
 * Writes (Rank Math compatible filenames at the site root):
 *   - public/sitemap_index.xml
 *   - public/page-sitemap.xml
 *   - public/destination-sitemap.xml
 *   - public/post-sitemap.xml
 *
 * Usage:  node scripts/generate-sitemap.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const PUBLIC_DIR = resolve(ROOT, "public");
const SITE = "https://hotelmountains.com";
const TODAY = new Date().toISOString().slice(0, 10);
const STYLESHEET = `${SITE}/sitemap.xsl`;

mkdirSync(PUBLIC_DIR, { recursive: true });

/* -------------------- tiny extractors (no TS compile) -------------------- */

function readSource(rel) {
  return readFileSync(resolve(ROOT, rel), "utf8");
}

/** Extract { slug, image, date } from each entry in an array of object literals. */
function extractEntries(source, fields) {
  const entries = [];
  // Match each { ... } block at top level of the exported array (greedy enough for our shape).
  const blockRegex = /\{\s*slug:\s*"([^"]+)"[\s\S]*?(?=\n\s*\},?\s*\n\s*\{|\n\s*\}\s*\];)/g;
  let m;
  while ((m = blockRegex.exec(source)) !== null) {
    const block = m[0];
    const slug = m[1];
    const out = { slug };
    for (const f of fields) {
      const re = new RegExp(`${f}:\\s*"([^"]+)"`);
      const fm = block.match(re);
      if (fm) out[f] = fm[1];
    }
    entries.push(out);
  }
  return entries;
}

const destSource = readSource("src/data/destinations.ts");
const blogSource = readSource("src/data/blogArticles.ts");

const destinations = extractEntries(destSource, ["heroImage"]).map((d) => ({
  slug: d.slug,
  image: d.heroImage,
}));

const posts = extractEntries(blogSource, ["image", "date", "title"]).map((p) => ({
  slug: p.slug,
  image: p.image,
  date: p.date || TODAY,
  title: p.title || "",
}));

if (!destinations.length) throw new Error("No destinations parsed");
if (!posts.length) throw new Error("No blog posts parsed");

/* -------------------- builders -------------------- */

const xmlHead = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="${STYLESHEET}"?>`;

const escapeXml = (s) =>
  String(s).replace(/[<>&'"]/g, (c) =>
    ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[c])
  );

function urlsetEntry({ loc, lastmod = TODAY, changefreq, priority, image, imageTitle }) {
  return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>${
    image
      ? `
    <image:image>
      <image:loc>${escapeXml(image)}</image:loc>${
          imageTitle ? `\n      <image:title>${escapeXml(imageTitle)}</image:title>` : ""
        }
    </image:image>`
      : ""
  }
  </url>`;
}

function urlset(entries) {
  return `${xmlHead}
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries.map(urlsetEntry).join("\n")}
</urlset>
`;
}

/* -------------------- page-sitemap.xml -------------------- */

const pages = [
  { path: "/",                changefreq: "daily",   priority: "1.0" },
  { path: "/blog",            changefreq: "weekly",  priority: "0.8" },
  { path: "/about",           changefreq: "monthly", priority: "0.7" },
  { path: "/contact",         changefreq: "monthly", priority: "0.6" },
  { path: "/mountain-hotels", changefreq: "weekly",  priority: "0.9" },
  { path: "/hiking-tours",    changefreq: "weekly",  priority: "0.9" },
  { path: "/ski-trips",       changefreq: "weekly",  priority: "0.9" },
  { path: "/privacy-policy",  changefreq: "yearly",  priority: "0.3" },
  { path: "/terms-of-service",changefreq: "yearly",  priority: "0.3" },
  { path: "/cookie-policy",   changefreq: "yearly",  priority: "0.3" },
  { path: "/dmca",            changefreq: "yearly",  priority: "0.3" },
  { path: "/legal-notice",    changefreq: "yearly",  priority: "0.3" },
  { path: "/parents-info",    changefreq: "yearly",  priority: "0.3" },
];

const pageXml = urlset(
  pages.map((p) => ({
    loc: `${SITE}${p.path}`,
    changefreq: p.changefreq,
    priority: p.priority,
  }))
);

/* -------------------- destination-sitemap.xml -------------------- */

const destXml = urlset(
  destinations.map((d) => ({
    loc: `${SITE}/destination/${d.slug}`,
    changefreq: "weekly",
    priority: "0.9",
    image: d.image,
    imageTitle: d.slug.replace(/-/g, " "),
  }))
);

/* -------------------- post-sitemap.xml -------------------- */

const postXml = urlset(
  posts.map((p) => ({
    loc: `${SITE}/blog/${p.slug}`,
    lastmod: p.date,
    changefreq: "monthly",
    priority: "0.7",
    image: p.image,
    imageTitle: p.title,
  }))
);

/* -------------------- sitemap_index.xml -------------------- */

const sitemapIndex = `${xmlHead}
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE}/page-sitemap.xml</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE}/destination-sitemap.xml</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE}/post-sitemap.xml</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>
</sitemapindex>
`;

/* -------------------- write -------------------- */

const outputs = [
  ["sitemap_index.xml", sitemapIndex],
  ["page-sitemap.xml", pageXml],
  ["destination-sitemap.xml", destXml],
  ["post-sitemap.xml", postXml],
];

for (const [name, body] of outputs) {
  writeFileSync(resolve(PUBLIC_DIR, name), body, "utf8");
  console.log(`✓ wrote public/${name}`);
}

console.log(`\nDestinations: ${destinations.length} | Posts: ${posts.length}`);
