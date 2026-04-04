import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { blogArticles } from "@/data/blogArticles";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Clock, Calendar, MapPin } from "lucide-react";

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = blogArticles.find((a) => a.slug === slug);

  useEffect(() => {
    if (article) {
      document.title = article.metaTitle;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) {
        meta.setAttribute("content", article.metaDescription);
      }
      window.scrollTo(0, 0);

      // JSON-LD
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: article.metaDescription,
        image: article.image,
        datePublished: article.date,
        publisher: {
          "@type": "Organization",
          name: "HotelMountains.com",
        },
      });
      document.head.appendChild(script);
      return () => {
        document.head.removeChild(script);
      };
    }
  }, [article]);

  if (!article) return <Navigate to="/blog" replace />;

  const relatedArticles = blogArticles
    .filter((a) => a.slug !== slug)
    .slice(0, 3);

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
