import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DestinationsSection from "@/components/DestinationsSection";
import ActivitiesSection from "@/components/ActivitiesSection";
import ToursWidget from "@/components/ToursWidget";
import HotelSearchWidget from "@/components/HotelSearchWidget";
import FlightSearchWidget from "@/components/FlightSearchWidget";
import MountainGuide from "@/components/MountainGuide";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const META_TITLE =
  "HotelMountains.com — Mountain Travel Guides, Hiking Tours & Ski Trips Worldwide";
const META_DESCRIPTION =
  "HotelMountains.com is the ultimate mountain travel guide. Explore the Swiss Alps, Rocky Mountains, Himalayas, Andes, Appalachian Mountains and Japanese Alps — book guided hiking tours, multi-day treks, ski packages, scenic train rides, mountain hotels and small-group expeditions worldwide.";
const META_KEYWORDS = [
  "mountain travel",
  "mountain tours",
  "mountain hiking guide",
  "mountain hotels",
  "swiss alps tours",
  "rocky mountain national park",
  "himalayas trekking",
  "everest base camp",
  "andes mountains",
  "machu picchu tours",
  "patagonia trekking",
  "appalachian trail",
  "great smoky mountains",
  "japanese alps",
  "mountain time zone",
  "tallest mountain in the world",
  "best mountain destinations",
  "guided mountain tours",
  "ski trips europe",
  "hiking tours worldwide",
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

const Index = () => {
  useEffect(() => {
    document.title = META_TITLE;
    upsertMeta("description", META_DESCRIPTION);
    upsertMeta("keywords", META_KEYWORDS);

    const scripts: HTMLScriptElement[] = [];

    // TravelAgency schema
    const travelAgency = document.createElement("script");
    travelAgency.type = "application/ld+json";
    travelAgency.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      name: "HotelMountains.com",
      url: "https://hotelmountains.com",
      logo: "https://hotelmountains.com/favicon.png",
      description:
        "Mountain travel guide and tour booking platform covering destinations worldwide including the Swiss Alps, Rocky Mountains, Himalayas, Andes, Appalachian Mountains, and Japanese Alps. Book hiking tours, ski packages, treks, and mountain hotels.",
      areaServed: "Worldwide",
      knowsAbout: [
        "Mountain hiking",
        "Skiing",
        "Trekking",
        "Mountain hotels",
        "Alpine tours",
        "National parks",
        "Adventure travel",
      ],
      potentialAction: {
        "@type": "SearchAction",
        target:
          "https://www.getyourguide.com/s/?q={search_term}&partner_id=0IQTGX8",
        "query-input": "required name=search_term",
      },
    });
    document.head.appendChild(travelAgency);
    scripts.push(travelAgency);

    // ItemList schema for top destinations (helps Google understand site structure)
    const itemList = document.createElement("script");
    itemList.type = "application/ld+json";
    itemList.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Top Mountain Destinations",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Swiss Alps", url: "https://hotelmountains.com/destination/swiss-alps" },
        { "@type": "ListItem", position: 2, name: "Rocky Mountains", url: "https://hotelmountains.com/destination/rocky-mountains" },
        { "@type": "ListItem", position: 3, name: "Appalachian Mountains", url: "https://hotelmountains.com/destination/appalachian-mountains" },
        { "@type": "ListItem", position: 4, name: "Himalayas", url: "https://hotelmountains.com/destination/himalayas" },
        { "@type": "ListItem", position: 5, name: "Andes Mountains", url: "https://hotelmountains.com/destination/andes-mountains" },
        { "@type": "ListItem", position: 6, name: "Japanese Alps", url: "https://hotelmountains.com/destination/japanese-alps" },
      ],
    });
    document.head.appendChild(itemList);
    scripts.push(itemList);

    // FAQPage schema — high-volume mountain travel questions for rich results
    const faqSchema = document.createElement("script");
    faqSchema.type = "application/ld+json";
    faqSchema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is the best mountain destination in the world?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The Swiss Alps are widely considered the world's premier mountain destination thanks to their dense network of marked hiking trails, world-class ski resorts like Zermatt and Verbier, scenic train rides, and iconic peaks such as the Matterhorn and Jungfrau. The Rocky Mountains, Himalayas, Andes, Japanese Alps, and Appalachian Mountains are also top global mountain destinations.",
          },
        },
        {
          "@type": "Question",
          name: "What is the tallest mountain in the world?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Mount Everest in the Himalayas is the tallest mountain on Earth measured from sea level, standing at 8,848.86 meters (29,031.7 ft). Mauna Kea in Hawaii is technically taller from base to summit (over 10,000 m), and Chimborazo in Ecuador is the farthest point from Earth's center due to the planet's bulge at the equator.",
          },
        },
        {
          "@type": "Question",
          name: "When is the best time of year for mountain travel?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "For hiking, June through September is the best time in the Northern Hemisphere mountains (Alps, Rockies, Appalachians, Himalayas) when trails are snow-free and weather is stable. For skiing, December through March is peak season. The Andes and other Southern Hemisphere ranges reverse this calendar — June to September is ski season and December to March is summer trekking season.",
          },
        },
        {
          "@type": "Question",
          name: "Do I need a guide to hike in the mountains?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "For well-marked trails in places like the Swiss Alps, Rocky Mountain National Park, or the Appalachian Trail, an experienced hiker can go without a guide. For high-altitude treks like Everest Base Camp, technical climbs, glacier travel, or remote Andes/Patagonia routes, a licensed mountain guide is strongly recommended for safety and navigation. HotelMountains.com lists guided tours for every skill level.",
          },
        },
        {
          "@type": "Question",
          name: "How much does a mountain hiking tour cost?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Day hiking tours in the Alps and Rockies typically range from $80 to $250 per person. Multi-day guided treks (Tour du Mont Blanc, Inca Trail, W Circuit Patagonia) cost $1,200–$3,500 including guides, lodging and meals. Premium expeditions like Everest Base Camp run $2,500–$5,000, while a full Everest summit climb starts around $45,000.",
          },
        },
        {
          "@type": "Question",
          name: "What gear do I need for mountain travel?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Essentials include broken-in waterproof hiking boots, a 25–35L daypack, layered clothing (base, fleece, waterproof shell), trekking poles, sun protection, headlamp, water bottle and basic first aid. For high-altitude or winter trips add insulated jacket, gloves, microspikes/crampons, and altitude medication. Most guided tours provide technical equipment.",
          },
        },
      ],
    });
    document.head.appendChild(faqSchema);
    scripts.push(faqSchema);

    // Service schema — what HotelMountains.com offers
    const service = document.createElement("script");
    service.type = "application/ld+json";
    service.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Mountain Travel & Tour Booking",
      provider: {
        "@type": "TravelAgency",
        name: "HotelMountains.com",
        url: "https://hotelmountains.com",
      },
      areaServed: "Worldwide",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Mountain Travel Services",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Guided Mountain Hiking Tours" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Multi-day Trekking Expeditions" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Ski & Snowboard Packages" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mountain Hotel Bookings" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Scenic Mountain Train Rides" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Small-Group Mountain Expeditions" } },
        ],
      },
    });
    document.head.appendChild(service);
    scripts.push(service);

    // BreadcrumbList for homepage
    const breadcrumb = document.createElement("script");
    breadcrumb.type = "application/ld+json";
    breadcrumb.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://hotelmountains.com/" },
      ],
    });
    document.head.appendChild(breadcrumb);
    scripts.push(breadcrumb);

    return () => {
      scripts.forEach((s) => {
        if (s.parentNode) s.parentNode.removeChild(s);
      });
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <DestinationsSection />
      <ActivitiesSection />
      <ToursWidget />
      <FlightSearchWidget />
      <HotelSearchWidget />
      <BlogSection />
      <MountainGuide />
      <Footer />
    </div>
  );
};

export default Index;
