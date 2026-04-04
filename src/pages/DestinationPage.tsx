import { useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { destinations } from "@/data/destinations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HotelSearchWidget from "@/components/HotelSearchWidget";
import { MapPin, Calendar, ArrowLeft, ExternalLink, Mountain, Star } from "lucide-react";

const DestinationToursWidget = ({ query }: { query: string }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widget.getyourguide.com/dist/pa.umd.production.min.js";
    script.async = true;
    script.dataset.gyg_partner_id = "0IQTGX8";
    script.dataset.gyg_number_of_items = "6";
    script.dataset.gyg_locale_code = "en-US";
    script.dataset.gyg_currency = "USD";
    script.dataset.gyg_q = query;
    script.dataset.gyg_widget = "activities";
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [query]);

  return (
    <div
      data-gyg-href="https://widget.getyourguide.com/default/activities.frame"
      data-gyg-locale-code="en-US"
      data-gyg-widget="activities"
      data-gyg-number-of-items="6"
      data-gyg-partner-id="0IQTGX8"
      data-gyg-q={query}
      data-gyg-currency="USD"
    />
  );
};

const DestinationPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const destination = destinations.find((d) => d.slug === slug);

  useEffect(() => {
    if (destination) {
      document.title = destination.metaTitle;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) {
        meta.setAttribute("content", destination.metaDescription);
      } else {
        const m = document.createElement("meta");
        m.name = "description";
        m.content = destination.metaDescription;
        document.head.appendChild(m);
      }
      window.scrollTo(0, 0);

      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "TouristDestination",
        name: destination.name,
        description: destination.intro,
        image: destination.heroImage,
        touristType: ["Hiking", "Skiing", "Adventure Travel"],
        geo: { "@type": "GeoCoordinates" },
      });
      document.head.appendChild(script);
      return () => {
        document.head.removeChild(script);
      };
    }
  }, [destination]);

  if (!destination) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <div className="relative h-[55vh] min-h-[420px]">
        <img
          src={destination.heroImage}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto max-w-4xl">
            <Link
              to="/#destinations"
              className="inline-flex items-center gap-1.5 text-white/70 text-sm mb-4 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              All Destinations
            </Link>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-4xl">{destination.emoji}</span>
              <div>
                <h1 className="font-heading text-3xl md:text-5xl font-bold text-white">
                  {destination.name}
                </h1>
                <div className="flex items-center gap-1.5 text-white/80 mt-1">
                  <MapPin className="h-4 w-4" />
                  <span>{destination.country}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto max-w-4xl px-4 py-12">
        {/* Intro */}
        <p className="text-lg text-muted-foreground leading-relaxed mb-12">
          {destination.intro}
        </p>

        {/* Highlights */}
        <div className="grid sm:grid-cols-2 gap-5 mb-14">
          {destination.highlights.map((h) => (
            <div
              key={h.title}
              className="bg-card border border-border rounded-xl p-5 shadow-card"
            >
              <div className="flex items-start gap-3">
                <Star className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-heading font-bold text-foreground mb-1">
                    {h.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{h.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Content sections */}
        {destination.sections.map((section) => (
          <div key={section.heading} className="mb-12">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-5">
              {section.heading}
            </h2>
            {section.content.map((para, i) => (
              <p
                key={i}
                className="text-muted-foreground leading-relaxed mb-4"
                dangerouslySetInnerHTML={{
                  __html: para.replace(
                    /\*\*(.*?)\*\*/g,
                    '<strong class="text-foreground">$1</strong>'
                  ),
                }}
              />
            ))}
          </div>
        ))}

        {/* Best time */}
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 mb-14">
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h3 className="font-heading font-bold text-foreground mb-1">
                Best Time to Visit
              </h3>
              <p className="text-muted-foreground">{destination.bestTimeToVisit}</p>
            </div>
          </div>
        </div>

        {/* Hotel Search */}
        <div className="mb-14">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-5">
            {destination.name} Hotels & Accommodation
          </h2>
          <HotelSearchWidget defaultDestination={destination.name} compact />
        </div>
        {/* Top Activities links */}
        <h2 className="font-heading text-2xl font-bold text-foreground mb-5">
          Top {destination.name} Activities
        </h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-14">
          {destination.topActivities.map((activity) => (
            <a
              key={activity.name}
              href={activity.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between bg-card border border-border rounded-lg p-4 hover:shadow-elevated hover:border-primary/30 transition-all group"
            >
              <div className="flex items-center gap-3">
                <Mountain className="h-5 w-5 text-primary" />
                <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {activity.name}
                </span>
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          ))}
        </div>

        {/* GYG Widget */}
        <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
          Book {destination.name} Tours
        </h2>
        <p className="text-muted-foreground mb-6">
          Browse and book verified tours, activities, and experiences.
        </p>
        <DestinationToursWidget query={destination.gygQuery} />

        {/* Browse all link */}
        <div className="text-center mt-10">
          <a
            href={destination.gygLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            View All {destination.name} Tours
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </main>

      {/* Other destinations */}
      <section className="bg-muted/40 py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-2xl font-bold text-foreground text-center mb-10">
            Explore Other Destinations
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {destinations
              .filter((d) => d.slug !== slug)
              .map((d) => (
                <Link
                  key={d.slug}
                  to={`/destination/${d.slug}`}
                  className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-all hover:-translate-y-1 border border-border"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={d.heroImage}
                      alt={d.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{d.emoji}</span>
                      <h3 className="font-heading font-bold text-foreground group-hover:text-primary transition-colors">
                        {d.name}
                      </h3>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{d.country}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DestinationPage;
