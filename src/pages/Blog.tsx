import { useEffect } from "react";
import { Link } from "react-router-dom";
import { blogArticles } from "@/data/blogArticles";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Clock, Calendar, ArrowRight } from "lucide-react";

const Blog = () => {
  useEffect(() => {
    document.title = "Mountain Travel Blog — Hiking Guides, Trail Tips & Tour Reviews | HotelMountains.com";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", "Read expert mountain travel guides, hiking trail reviews, and adventure tips. Covering the Swiss Alps, Rocky Mountains, Himalayas, Appalachian Trail, and more.");
    } else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = "Read expert mountain travel guides, hiking trail reviews, and adventure tips. Covering the Swiss Alps, Rocky Mountains, Himalayas, Appalachian Trail, and more.";
      document.head.appendChild(m);
    }

    // Blog CollectionPage schema
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Mountain Travel Blog",
      description: "Expert mountain travel guides, hiking trail reviews, and adventure tips.",
      url: "https://hotelmountains.com/blog",
      publisher: {
        "@type": "Organization",
        name: "HotelMountains.com",
        url: "https://hotelmountains.com"
      }
    });
    document.head.appendChild(script);

    window.scrollTo(0, 0);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-secondary font-semibold text-sm uppercase tracking-widest">
              Travel Journal
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
              Mountain Travel Guides
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              In-depth guides and tips for exploring the world's greatest mountain destinations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {blogArticles.map((article) => (
              <Link
                key={article.slug}
                to={`/blog/${article.slug}`}
                className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold text-secondary uppercase tracking-wider">
                    {article.category}
                  </span>
                  <h2 className="font-heading text-lg font-bold text-foreground mt-2 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {article.readTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(article.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
