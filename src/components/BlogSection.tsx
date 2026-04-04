import { blogArticles } from "@/data/blogArticles";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Calendar } from "lucide-react";

const BlogSection = () => {
  const featured = blogArticles.slice(0, 3);

  return (
    <section id="blog" className="py-20 bg-muted/40">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <span className="text-secondary font-semibold text-sm uppercase tracking-widest">
            Travel Journal
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            Mountain Travel Guides & Tips
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Expert guides, seasonal tips, and insider knowledge to help you plan
            unforgettable mountain adventures around the world.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((article) => (
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
                <h3 className="font-heading text-lg font-bold text-foreground mt-2 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {article.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(article.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            View All Articles
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
