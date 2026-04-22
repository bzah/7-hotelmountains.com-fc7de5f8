import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { blogArticles } from "@/data/blogArticles";
import { destinations } from "@/data/destinations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { ArrowLeft, Clock, Calendar, MapPin, Mountain, ExternalLink, Compass } from "lucide-react";
import { upsertHreflangAlternates } from "@/lib/seo";

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const article = blogArticles.find((a) => a.slug === slug);

  useEffect(() => {
    if (article) {
      document.title = article.metaTitle;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) {
        meta.setAttribute("content", article.metaDescription);
      }
      window.scrollTo(0, 0);

      const url = `https://hotelmountains.com/blog/${article.slug}`;

      // Canonical
      let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
      }
      canonical.href = url;
      upsertHreflangAlternates(url);

      // Article schema (rich result eligible)
      const article_script = document.createElement("script");
      article_script.type = "application/ld+json";
      article_script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        headline: article.title,
        name: article.title,
        description: article.metaDescription,
        image: {
          "@type": "ImageObject",
          url: article.image,
          width: 1200,
          height: 800,
        },
        datePublished: article.date,
        dateModified: article.date,
        articleSection: article.category,
        keywords: [article.category, "mountain travel", "hiking", "trekking", article.title.toLowerCase()].join(", "),
        wordCount: article.content.join(" ").split(/\s+/).length,
        timeRequired: `PT${article.readTime.replace(/\D/g, "")}M`,
        inLanguage: "en",
        author: {
          "@type": "Organization",
          name: "HotelMountains.com Editorial Team",
          url: "https://hotelmountains.com/about",
        },
        publisher: {
          "@type": "Organization",
          "@id": "https://hotelmountains.com/#organization",
          name: "HotelMountains.com",
          url: "https://hotelmountains.com",
          logo: {
            "@type": "ImageObject",
            url: "https://hotelmountains.com/favicon.png",
            width: 512,
            height: 512,
          },
        },
        isPartOf: { "@id": "https://hotelmountains.com/#website" },
      });
      document.head.appendChild(article_script);

      // BreadcrumbList JSON-LD now emitted by <Breadcrumbs /> in the visible UI.

      return () => {
        if (article_script.parentNode) article_script.parentNode.removeChild(article_script);
      };
    }
  }, [article]);

  if (!article) return <Navigate to="/blog" replace />;

  const relatedArticles = blogArticles
    .filter((a) => a.slug !== slug)
    .slice(0, 3);

  // Match destinations whose first-word name appears in the article category or title
  const relatedDestinations = destinations
    .filter((d) => {
      const key = d.name.toLowerCase().split(" ")[0];
      return (
        article!.category.toLowerCase().includes(key) ||
        article!.title.toLowerCase().includes(key)
      );
    })
    .slice(0, 3);

  const destinationLinks =
    relatedDestinations.length > 0 ? relatedDestinations : destinations.slice(0, 3);

  const moreTourQueries = [
    { label: `${article!.category} Hiking Tours`, q: `${article!.category} hiking` },
    { label: `${article!.category} Day Trips`, q: `${article!.category} day trip` },
    { label: `${article!.category} Guided Treks`, q: `${article!.category} trek` },
    { label: `${article!.category} Photography Tours`, q: `${article!.category} photography` },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <div className="relative h-[50vh] min-h-[400px]">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="container mx-auto max-w-3xl">
              <span className="inline-block bg-secondary text-secondary-foreground text-xs font-semibold px-3 py-1 rounded-full mb-4">
                {article.category}
              </span>
              <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                {article.title}
              </h1>
              <div className="flex items-center gap-4 text-white/80 text-sm">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {new Date(article.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {article.readTime}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <article className="container mx-auto max-w-3xl px-4 py-12">
          <div className="prose prose-lg max-w-none">
            {article.content.map((block, i) => {
              if (block.startsWith("## ")) {
                return (
                  <h2
                    key={i}
                    className="font-heading text-2xl font-bold text-foreground mt-10 mb-4"
                  >
                    {block.replace("## ", "")}
                  </h2>
                );
              }
              return (
                <p key={i} className="text-muted-foreground leading-relaxed mb-5">
                  {block}
                </p>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-12 p-8 rounded-xl bg-primary/10 border border-primary/20 text-center">
            <h3 className="font-heading text-xl font-bold text-foreground mb-2">
              Ready to Explore?
            </h3>
            <p className="text-muted-foreground mb-5">
              Book guided tours and activities for your next mountain adventure.
            </p>
            <a
              href={`https://www.getyourguide.com/s/?q=${encodeURIComponent(article.category)}&partner_id=0IQTGX8&utm_medium=online_publisher`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              <MapPin className="h-4 w-4" />
              Find {article.category} Tours
            </a>
          </div>

          {/* Internal Links: Related Destinations */}
          <section className="mt-12">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
              <Compass className="h-5 w-5 text-primary" />
              Related Mountain Destinations
            </h2>
            <p className="text-muted-foreground mb-5 text-sm">
              Explore in-depth travel guides for destinations mentioned in this article.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {destinationLinks.map((d) => (
                <Link
                  key={d.slug}
                  to={`/destination/${d.slug}`}
                  className="group bg-card border border-border rounded-lg p-4 hover:border-primary/40 hover:shadow-card transition-all"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{d.emoji}</span>
                    <span className="font-heading font-bold text-foreground group-hover:text-primary transition-colors">
                      {d.name}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{d.country} — full travel guide</p>
                </Link>
              ))}
            </div>
          </section>

          {/* Internal Links: More Tours */}
          <section className="mt-10">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
              <Mountain className="h-5 w-5 text-primary" />
              More {article.category} Tours
            </h2>
            <p className="text-muted-foreground mb-5 text-sm">
              Browse curated tour categories to find your perfect mountain adventure.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {moreTourQueries.map((t) => (
                <a
                  key={t.label}
                  href={`https://www.getyourguide.com/s/?q=${encodeURIComponent(t.q)}&partner_id=0IQTGX8&utm_medium=online_publisher`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between bg-card border border-border rounded-lg p-4 hover:border-primary/40 hover:shadow-card transition-all group"
                >
                  <span className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm">
                    {t.label}
                  </span>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </section>

          {/* Back */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-primary font-medium mt-10 hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to All Articles
          </Link>
        </article>

        {/* Related */}
        <section className="bg-muted/40 py-16">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-2xl font-bold text-foreground text-center mb-10">
              More Mountain Guides
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {relatedArticles.map((a) => (
                <Link
                  key={a.slug}
                  to={`/blog/${a.slug}`}
                  className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={a.image}
                      alt={a.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-semibold text-secondary uppercase tracking-wider">
                      {a.category}
                    </span>
                    <h3 className="font-heading text-base font-bold text-foreground mt-1.5 group-hover:text-primary transition-colors line-clamp-2">
                      {a.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogArticle;
