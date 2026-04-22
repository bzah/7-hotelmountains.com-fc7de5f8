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
