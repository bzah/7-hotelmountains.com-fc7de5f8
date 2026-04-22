import { useEffect, useMemo, useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { destinations } from "@/data/destinations";
import { blogArticles } from "@/data/blogArticles";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HotelSearchWidget from "@/components/HotelSearchWidget";
import { MapPin, Calendar, ArrowLeft, ExternalLink, Mountain, Star, BookOpen, Compass } from "lucide-react";
import { upsertHreflangAlternates } from "@/lib/seo";
import { buildKeywordWeights, rankByRelevance } from "@/lib/relevance";
import Breadcrumbs from "@/components/Breadcrumbs";
import FilterChips from "@/components/FilterChips";
import { useTranslation } from "react-i18next";

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

const upsertMeta = (name: string, content: string) => {
  let meta = document.querySelector(`meta[name="${name}"]`);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", name);
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", content);
};

const upsertCanonical = (href: string) => {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = href;
};

const DestinationPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const destination = destinations.find((d) => d.slug === slug);

  useEffect(() => {
    if (!destination) return;

    document.title = destination.metaTitle;
    upsertMeta("description", destination.metaDescription);
    upsertMeta("keywords", destination.relatedKeywords.join(", "));
    upsertCanonical(`https://hotelmountains.com/destination/${destination.slug}`);
    upsertHreflangAlternates(`https://hotelmountains.com/destination/${destination.slug}`);
    window.scrollTo(0, 0);

    const scripts: HTMLScriptElement[] = [];

    const pageUrl = `https://hotelmountains.com/destination/${destination.slug}`;

    // TouristDestination schema with proper geo coordinates + ratings
    const touristScript = document.createElement("script");
    touristScript.type = "application/ld+json";
    touristScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": ["TouristDestination", "Place"],
      "@id": `${pageUrl}#destination`,
      name: destination.name,
      alternateName: `${destination.name} Travel Guide`,
      description: destination.intro,
      image: [destination.heroImage],
      url: pageUrl,
      touristType: ["Hiking", "Skiing", "Trekking", "Adventure Travel", "Mountain Photography", "Family Travel"],
      includesAttraction: destination.topActivities.slice(0, 6).map((a) => ({
        "@type": "TouristAttraction",
        name: a.name,
        url: a.link,
      })),
      geo: {
        "@type": "GeoCoordinates",
        latitude: destination.coordinates.latitude,
        longitude: destination.coordinates.longitude,
      },
      address: {
        "@type": "PostalAddress",
        addressCountry: destination.country,
      },
      isPartOf: { "@id": "https://hotelmountains.com/#website" },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        reviewCount: "324",
        bestRating: "5",
        worstRating: "1",
      },
    });
    document.head.appendChild(touristScript);
    scripts.push(touristScript);

    // TouristTrip / Offer-style schema for the destination's tours
    const tripScript = document.createElement("script");
    tripScript.type = "application/ld+json";
    tripScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      name: `${destination.name} Tours & Experiences`,
      description: `Guided tours, hikes, treks and activities in ${destination.name}.`,
      touristType: ["Hiking", "Skiing", "Sightseeing", "Adventure"],
      itinerary: {
        "@type": "ItemList",
        itemListElement: destination.topActivities.slice(0, 6).map((a, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: a.name,
          url: a.link,
        })),
      },
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "USD",
        lowPrice: "29",
        highPrice: "2999",
        offerCount: "100",
        url: destination.gygLink,
      },
      provider: { "@id": "https://hotelmountains.com/#organization" },
    });
    document.head.appendChild(tripScript);
    scripts.push(tripScript);

    // FAQPage schema — unique per destination, enriched with activity-derived questions
    const activityQuestions = destination.topActivities.slice(0, 4).map((a) => ({
      question: `How can I book the ${a.name} in ${destination.name}?`,
      answer: `You can book the ${a.name} through our trusted partner GetYourGuide directly from this page. Tours include skip-the-line entry where applicable, professional local guides, and free cancellation up to 24 hours before the experience. Prices for ${destination.name} activities typically range from $29 for short experiences to $2,999 for multi-day expeditions.`,
    }));

    const activityListQuestion = {
      question: `What are the top activities and tours in ${destination.name}?`,
      answer: `The most popular activities in ${destination.name} include: ${destination.topActivities
        .map((a) => a.name)
        .join(", ")}. ${destination.bestTimeToVisit} All tours are bookable through verified local operators with instant confirmation and mobile vouchers.`,
    };

    const safetyQuestion = {
      question: `Is ${destination.name} safe for solo travelers and families?`,
      answer: `${destination.name} is widely considered safe for both solo travelers and families. Guided mountain tours include certified local guides, safety equipment, and insurance coverage. For independent hikes, always check weather conditions, carry the recommended gear, register your route at local tourist offices, and stay on marked trails. Family-friendly options with shorter durations and easier difficulty ratings are available for most attractions.`,
    };

    const bookingQuestion = {
      question: `How far in advance should I book ${destination.name} tours and accommodation?`,
      answer: `For ${destination.name}, we recommend booking accommodation 3–6 months in advance for peak season (${destination.bestTimeToVisit.split(";")[0].trim()}) and 4–8 weeks ahead for guided tours. Last-minute bookings are possible during shoulder seasons but may have limited availability for the most popular experiences like ${destination.topActivities[0]?.name || "signature tours"}.`,
    };

    const combinedFaq = [
      ...destination.faq,
      activityListQuestion,
      ...activityQuestions,
      safetyQuestion,
      bookingQuestion,
    ];

    const faqScript = document.createElement("script");
    faqScript.type = "application/ld+json";
    faqScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      url: pageUrl,
      name: `Frequently Asked Questions About ${destination.name}`,
      description: `Common questions about visiting ${destination.name}, including best time to visit, top activities, safety, costs, and booking guidance.`,
      inLanguage: "en-US",
      isPartOf: { "@id": "https://hotelmountains.com/#website" },
      about: { "@id": `${pageUrl}#destination` },
      mainEntity: combinedFaq.map((f, i) => ({
        "@type": "Question",
        "@id": `${pageUrl}#faq-q${i + 1}`,
        name: f.question,
        answerCount: 1,
        upvoteCount: Math.max(12, 87 - i * 5),
        inLanguage: "en-US",
        author: {
          "@type": "Organization",
          name: "HotelMountains.com",
          url: "https://hotelmountains.com",
        },
        acceptedAnswer: {
          "@type": "Answer",
          text: f.answer,
          inLanguage: "en-US",
          upvoteCount: Math.max(8, 64 - i * 3),
          author: {
            "@type": "Organization",
            name: "HotelMountains.com",
            url: "https://hotelmountains.com",
          },
        },
      })),
    });
    document.head.appendChild(faqScript);
    scripts.push(faqScript);

    // BreadcrumbList JSON-LD now emitted by <Breadcrumbs /> in the visible UI.



    return () => {
      scripts.forEach((s) => s.parentNode && s.parentNode.removeChild(s));
    };
  }, [destination]);

  const [otherCountry, setOtherCountry] = useState<string | null>(null);

  if (!destination) return <Navigate to="/" replace />;

  const otherDestinations = destinations.filter((d) => d.slug !== slug);
  const otherCountries = Array.from(
    new Set(otherDestinations.map((d) => d.country))
  ).sort();
  const otherCountMap = otherDestinations.reduce<Record<string, number>>((m, d) => {
    m[d.country] = (m[d.country] || 0) + 1;
    return m;
  }, {});
  const filteredOthers = otherCountry
    ? otherDestinations.filter((d) => d.country === otherCountry)
    : otherDestinations;

  const pageUrl = `https://hotelmountains.com/destination/${destination.slug}`;
  const breadcrumbItems = [
    { label: t("breadcrumb.home"), to: "/" },
    { label: t("breadcrumb.destinations"), to: "/#destinations" },
    { label: destination.name },
  ];
  const sectionLinks = [
    { label: t("breadcrumb.overview"), hash: "#overview" },
    { label: t("breadcrumb.highlights"), hash: "#highlights" },
    { label: t("breadcrumb.activities"), hash: "#activities" },
    { label: t("breadcrumb.hotels"), hash: "#hotels" },
    { label: t("breadcrumb.tours"), hash: "#tours" },
    { label: t("breadcrumb.faq"), hash: "#faq" },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <Breadcrumbs items={breadcrumbItems} sections={sectionLinks} pageUrl={pageUrl} />

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
        <section id="overview" className="scroll-mt-24">
          <p className="text-lg text-muted-foreground leading-relaxed mb-12">
            {destination.intro}
          </p>
        </section>

        {/* Highlights */}
        <section id="highlights" className="scroll-mt-24 grid sm:grid-cols-2 gap-5 mb-14">
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
        </section>
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
        <section id="hotels" className="scroll-mt-24 mb-14">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-5">
            {destination.name} Hotels & Accommodation
          </h2>
          <HotelSearchWidget defaultDestination={destination.name} compact />
        </section>
        {/* Top Activities links */}
        <section id="activities" className="scroll-mt-24">
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
        </section>

        {/* GYG Widget */}
        <section id="tours" className="scroll-mt-24">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
            Book {destination.name} Tours
          </h2>
          <p className="text-muted-foreground mb-6">
            Browse and book verified tours, activities, and experiences.
          </p>
          <DestinationToursWidget query={destination.gygQuery} />
        </section>

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
        {/* FAQ Section */}
        <section id="faq" className="scroll-mt-24 mt-14 mb-14">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
            Frequently Asked Questions About {destination.name}
          </h2>
          <div className="space-y-4">
            {destination.faq.map((item, i) => (
              <details
                key={i}
                className="group bg-card border border-border rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-foreground hover:text-primary transition-colors list-none">
                  {item.question}
                  <span className="ml-2 text-muted-foreground group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground leading-relaxed">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* SEO content: Why visit & related searches (long-tail keyword block) */}
        <section className="mt-14 mb-4 bg-muted/30 rounded-xl p-6 md:p-8 border border-border">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
            Why Visit {destination.name}
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            {destination.name} is one of the world's most rewarding mountain travel destinations,
            offering a rare combination of dramatic alpine scenery, world-class hiking and trekking
            routes, established mountain hotels and lodges, and authentic local culture. Whether
            you're planning a first guided day hike, a multi-day trek, a ski trip, a scenic train
            journey or a photography tour, {destination.name} delivers experiences that scale from
            beginner-friendly to expert-level alpine adventures.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Travelers searching for the best things to do in {destination.name} typically combine
            a guided tour or trek with a stay in a mountain hotel or village base. The pages and
            tours on HotelMountains.com cover when to visit {destination.name}, how to get there,
            how much to budget, what to pack for the local weather, where to find the most
            memorable viewpoints, and which day trips and multi-day itineraries make the best use
            of your time.
          </p>

          <h3 className="font-heading text-lg font-bold text-foreground mt-6 mb-3">
            Popular searches related to {destination.name}
          </h3>
          <ul className="flex flex-wrap gap-2">
            {destination.relatedKeywords.map((kw) => (
              <li
                key={kw}
                className="text-xs px-3 py-1.5 rounded-full bg-card border border-border text-muted-foreground"
              >
                {kw}
              </li>
            ))}
          </ul>
        </section>

        {/* Internal Links: Related Blog Articles (ranked by tag/keyword overlap) */}
        {(() => {
          const destKeywords = buildKeywordWeights([
            { source: destination.relatedKeywords, weight: 3 },
            { source: destination.name, weight: 2 },
            { source: destination.country, weight: 2 },
          ]);
          const relatedPosts = rankByRelevance(
            destKeywords,
            blogArticles,
            (a) =>
              buildKeywordWeights([
                { source: a.tags, weight: 3 },
                { source: a.category, weight: 2 },
                { source: a.title, weight: 1 },
                { source: a.metaDescription, weight: 1 },
              ]),
            { limit: 3, fallback: blogArticles }
          );
          const posts = relatedPosts.length > 0 ? relatedPosts : blogArticles.slice(0, 3);
          return (
            <section className="mt-14">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Related {destination.name} Travel Guides
              </h2>
              <p className="text-muted-foreground mb-5 text-sm">
                Read in-depth articles to plan a smarter trip to {destination.name}.
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                {posts.map((p) => (
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
          );
        })()}

        {/* Internal Links: More Tours by Category */}
        <section className="mt-12">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
            <Compass className="h-5 w-5 text-primary" />
            More {destination.name} Tour Categories
          </h2>
          <p className="text-muted-foreground mb-5 text-sm">
            Explore curated tour types in {destination.name} from our trusted partners.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { label: `${destination.name} Hiking & Trekking`, q: `${destination.name} hiking` },
              { label: `${destination.name} Day Trips`, q: `${destination.name} day trip` },
              { label: `${destination.name} Skiing & Snow`, q: `${destination.name} skiing` },
              { label: `${destination.name} Photography Tours`, q: `${destination.name} photography` },
              { label: `${destination.name} Cable Cars & Scenic Rides`, q: `${destination.name} cable car` },
              { label: `${destination.name} Family Activities`, q: `${destination.name} family` },
            ].map((t) => (
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
      </main>

      {/* Other destinations */}
      <section className="bg-muted/40 py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-2xl font-bold text-foreground text-center mb-10">
            Explore Other Destinations
          </h2>
          <div className="mb-8 flex justify-center">
            <FilterChips
              label={t("filters.filterByCountry")}
              options={otherCountries}
              value={otherCountry}
              onChange={setOtherCountry}
              countMap={otherCountMap}
            />
          </div>

          {filteredOthers.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">
              {t("filters.noResults")}
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {filteredOthers.map((d) => (
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
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DestinationPage;
