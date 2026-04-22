import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { blogArticles } from "@/data/blogArticles";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FilterChips from "@/components/FilterChips";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import { applySeoUrls } from "@/lib/seo";

const META_TITLE =
  "Mountain Travel Blog — Hiking Guides, Trekking Tips, Trail Reviews & Tour Advice | HotelMountains.com";
const META_DESCRIPTION =
  "Expert mountain travel blog. In-depth hiking guides, multi-day trekking itineraries, ski resort reviews, gear lists, altitude tips and tour advice for the Swiss Alps, Rocky Mountains, Himalayas, Andes, Appalachian Trail, Patagonia and Japanese Alps.";
const META_KEYWORDS = [
  "mountain travel blog",
  "hiking blog",
  "trekking guides",
  "mountain hiking tips",
  "best hiking trails",
  "trekking itinerary",
  "altitude sickness tips",
  "hiking gear list",
  "ski resort reviews",
  "mountain photography tips",
  "swiss alps hiking guide",
  "appalachian trail guide",
  "everest base camp tips",
  "machu picchu trek guide",
  "patagonia trekking guide",
  "rocky mountain national park guide",
].join(", ");

const upsertMeta = (name: string, content: string) => {
  let meta = document.querySelector(`meta[name="${name}"]`);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", name);
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", content);
};

const Blog = () => {
  const { t } = useTranslation();
  const [category, setCategory] = useState<string | null>(null);

  const categories = useMemo(
    () => Array.from(new Set(blogArticles.map((a) => a.category))).sort(),
    []
  );
  const countMap = useMemo(() => {
    const m: Record<string, number> = {};
    blogArticles.forEach((a) => {
      m[a.category] = (m[a.category] || 0) + 1;
    });
    return m;
  }, []);
  const filtered = useMemo(
    () => (category ? blogArticles.filter((a) => a.category === category) : blogArticles),
    [category]
  );

  useEffect(() => {
    document.title = META_TITLE;
    upsertMeta("description", META_DESCRIPTION);
    upsertMeta("keywords", META_KEYWORDS);
    applySeoUrls("/blog");

    const scripts: HTMLScriptElement[] = [];

    // CollectionPage schema with rich item list of articles
    const collection = document.createElement("script");
    collection.type = "application/ld+json";
    collection.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Mountain Travel Blog",
      description: META_DESCRIPTION,
      url: "https://hotelmountains.com/blog",
      publisher: {
        "@type": "Organization",
        name: "HotelMountains.com",
        url: "https://hotelmountains.com",
        logo: "https://hotelmountains.com/favicon.png",
      },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: blogArticles.map((a, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `https://hotelmountains.com/blog/${a.slug}`,
          name: a.title,
        })),
      },
    });
    document.head.appendChild(collection);
    scripts.push(collection);

    // Breadcrumb schema
    const breadcrumb = document.createElement("script");
    breadcrumb.type = "application/ld+json";
    breadcrumb.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://hotelmountains.com/" },
        { "@type": "ListItem", position: 2, name: "Blog", item: "https://hotelmountains.com/blog" },
      ],
    });
    document.head.appendChild(breadcrumb);
    scripts.push(breadcrumb);

    window.scrollTo(0, 0);
    return () => {
      scripts.forEach((s) => s.parentNode && s.parentNode.removeChild(s));
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-secondary font-semibold text-sm uppercase tracking-widest">
              Travel Journal
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
              Mountain Travel Guides & Trekking Tips
            </h1>
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
              In-depth guides for exploring the world's greatest mountain ranges. From the granite
              walls of Patagonia and the high passes of the Himalayas to the larch forests of the
              Swiss Alps and the Blue Ridge of the Appalachian Mountains — practical itineraries,
              gear advice, altitude tips and seasonal recommendations from real mountain travel.
            </p>
          </div>

          {/* SEO content block: long-tail topical authority */}
          <div className="max-w-3xl mx-auto bg-card border border-border rounded-xl p-6 md:p-8 mb-14">
            <h2 className="font-heading text-xl font-bold text-foreground mb-3">
              What you'll find on the HotelMountains travel blog
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Our mountain travel blog is built around real, on-the-ground experience in the
              world's most rewarding ranges. Whether you're planning a first guided hike in the
              Bernese Oberland, comparing the Annapurna Circuit with the Manaslu Circuit, choosing
              between Banff and Jasper, or timing your trip to the Great Smoky Mountains for peak
              fall foliage, you'll find honest, detailed advice here.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Topics regularly covered include: best time to visit each mountain region, beginner
              vs. advanced trekking routes, ski resort comparisons, altitude acclimatization, layered
              clothing systems, choosing between mountain huts and lodges, scenic train journeys
              like the Glacier Express and Bernina Express, photography spots, and how to combine
              flights, hotels and tours into a single mountain itinerary.
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
