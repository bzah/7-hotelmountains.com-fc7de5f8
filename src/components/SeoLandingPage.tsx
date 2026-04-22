import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Mountain, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { applySeoUrls } from "@/lib/seo";
import { destinations } from "@/data/destinations";
import { blogArticles } from "@/data/blogArticles";

export interface SeoLandingPageProps {
  /** Canonical path for this page, e.g. "/mountain-hotels" */
  path: string;
  /** Page <title> */
  title: string;
  /** Meta description */
  description: string;
  /** Comma-joined keywords */
  keywords: string;
  /** Visible H1 (defaults to title if omitted) */
  h1: string;
  /** Hero subtitle / lede */
  intro: string;
  /** Affiliate destination URL for the primary CTA */
  primaryCtaHref: string;
  /** Primary CTA label */
  primaryCtaLabel: string;
  /** Hero background image URL */
  heroImage: string;
  /** Long-form content sections */
  sections: { heading: string; paragraphs: string[] }[];
  /** FAQ pairs (also emitted as JSON-LD FAQPage) */
  faq: { question: string; answer: string }[];
  /** Affiliate links surfaced as a clickable grid */
  partnerLinks: { label: string; href: string }[];
  /** Breadcrumb label (last segment) */
  breadcrumbLabel: string;
}

const SITE = "https://hotelmountains.com";

const SeoLandingPage = ({
  path,
  title,
  description,
  keywords,
  h1,
  intro,
  primaryCtaHref,
  primaryCtaLabel,
  heroImage,
  sections,
  faq,
  partnerLinks,
  breadcrumbLabel,
}: SeoLandingPageProps) => {
  useEffect(() => {
    document.title = title;

    const upsertMeta = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    upsertMeta("description", description);
    upsertMeta("keywords", keywords);
    applySeoUrls(path);
    window.scrollTo(0, 0);

    const scripts: HTMLScriptElement[] = [];
    const pageUrl = `${SITE}${path}`;

    // FAQ schema
    if (faq.length) {
      const faqScript = document.createElement("script");
      faqScript.type = "application/ld+json";
      faqScript.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        url: pageUrl,
        mainEntity: faq.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      });
      document.head.appendChild(faqScript);
      scripts.push(faqScript);
    }

    // WebPage schema
    const webPageScript = document.createElement("script");
    webPageScript.type = "application/ld+json";
    webPageScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: h1,
      description,
      url: pageUrl,
      inLanguage: "en-US",
      isPartOf: { "@type": "WebSite", name: "HotelMountains.com", url: SITE },
    });
    document.head.appendChild(webPageScript);
    scripts.push(webPageScript);

    return () => {
      scripts.forEach((s) => s.parentNode && s.parentNode.removeChild(s));
    };
  }, [path, title, description, keywords, h1, faq]);

  const breadcrumbItems = [
    { label: "Home", to: "/" },
    { label: breadcrumbLabel },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <Breadcrumbs items={breadcrumbItems} pageUrl={`${SITE}${path}`} />

      {/* Hero */}
      <div className="relative h-[45vh] min-h-[360px]">
        <img
          src={heroImage}
          alt={h1}
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/40 to-foreground/10" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto max-w-4xl">
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-white mb-3">
              {h1}
            </h1>
            <p className="text-white/85 text-base md:text-lg max-w-2xl">{intro}</p>
            <a
              href={primaryCtaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-5 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              {primaryCtaLabel}
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <main className="container mx-auto max-w-4xl px-4 py-12">
        {sections.map((section) => (
          <section key={section.heading} className="mb-12">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-5">
              {section.heading}
            </h2>
            {section.paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-muted-foreground leading-relaxed mb-4"
                dangerouslySetInnerHTML={{
                  __html: p.replace(
                    /\*\*(.*?)\*\*/g,
                    '<strong class="text-foreground">$1</strong>'
                  ),
                }}
              />
            ))}
          </section>
        ))}

        {/* Partner / affiliate links */}
        {partnerLinks.length > 0 && (
          <section className="mb-14">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-5">
              Browse Top Picks
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {partnerLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between bg-card border border-border rounded-lg p-4 hover:shadow-elevated hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Mountain className="h-5 w-5 text-primary" />
                    <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {l.label}
                    </span>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Internal links to all destinations */}
        <section className="mb-14">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-5">
            Explore by Destination
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {destinations.map((d) => (
              <Link
                key={d.slug}
                to={`/destination/${d.slug}`}
                className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary/40 hover:shadow-card transition-all"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={d.heroImage}
                    alt={d.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 flex items-center gap-2">
                  <span className="text-xl">{d.emoji}</span>
                  <div>
                    <h3 className="font-heading font-bold text-foreground group-hover:text-primary transition-colors text-sm">
                      {d.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">{d.country}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Related blog articles */}
        <section className="mb-14">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-5">
            Related Travel Guides
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {blogArticles.slice(0, 3).map((p) => (
              <Link
                key={p.slug}
                to={`/blog/${p.slug}`}
                className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary/40 hover:shadow-card transition-all"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <span className="text-[10px] font-semibold text-secondary uppercase tracking-wider">
                    {p.category}
                  </span>
                  <h3 className="font-heading text-sm font-bold text-foreground mt-1.5 group-hover:text-primary transition-colors line-clamp-2">
                    {p.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ */}
        {faq.length > 0 && (
          <section className="mb-14">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faq.map((item, i) => (
                <details
                  key={i}
                  className="group bg-card border border-border rounded-xl overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-foreground hover:text-primary transition-colors list-none">
                    <span className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-secondary" />
                      {item.question}
                    </span>
                    <span className="ml-2 text-muted-foreground group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="px-5 pb-5 text-muted-foreground leading-relaxed">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-10">
          <a
            href={primaryCtaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            {primaryCtaLabel}
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SeoLandingPage;
