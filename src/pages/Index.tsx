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

const Index = () => {
  useEffect(() => {
    document.title = "HotelMountains.com — Mountain Travel & Tours Worldwide";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", "Explore the world's greatest mountain destinations. Book mountain hiking tours, skiing adventures, and guided expeditions in the Alps, Rockies, Himalayas, Appalachian Mountains and more.");
    } else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = "Explore the world's greatest mountain destinations. Book mountain hiking tours, skiing adventures, and guided expeditions in the Alps, Rockies, Himalayas, Appalachian Mountains and more.";
      document.head.appendChild(m);
    }

    // JSON-LD structured data
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      "name": "HotelMountains.com",
      "url": "https://hotelmountains.com",
      "description": "Mountain travel guide and tour booking platform covering destinations worldwide including the Alps, Rocky Mountains, Himalayas, and Appalachian Mountains.",
      "areaServed": "Worldwide",
      "sameAs": [],
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.getyourguide.com/s/?q={search_term}&partner_id=0IQTGX8",
        "query-input": "required name=search_term"
      }
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <DestinationsSection />
      <ActivitiesSection />
      <ToursWidget />
      <HotelSearchWidget />
      <BlogSection />
      <MountainGuide />
      <Footer />
    </div>
  );
};

export default Index;
