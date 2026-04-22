import LegalPageLayout from "@/components/LegalPageLayout";
import { Mountain, Globe, Users, Heart } from "lucide-react";

const About = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "TravelAgency"],
        "@id": "https://hotelmountains.com/#organization",
        name: "HotelMountains.com",
        alternateName: "Hotel Mountains",
        url: "https://hotelmountains.com",
        logo: {
          "@type": "ImageObject",
          url: "https://hotelmountains.com/favicon.png",
          width: 512,
          height: 512,
        },
        image: "https://hotelmountains.com/favicon.png",
        description:
          "Mountain travel guide and tour booking platform helping adventurers discover the world's greatest peaks, trails, ski resorts, and mountain destinations across the Alps, Rockies, Himalayas, Andes, Appalachians, and Japanese Alps.",
        slogan: "Your gateway to the world's greatest mountains",
        foundingDate: "2024",
        email: "info@hotelmountains.com",
        telephone: "+1-800-MOUNTAIN",
        priceRange: "$$",
        currenciesAccepted: "USD, EUR, GBP, CHF, JPY",
        paymentAccepted: "Credit Card, Debit Card, PayPal",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Online Service",
          addressLocality: "Global",
          addressRegion: "Worldwide",
          postalCode: "00000",
          addressCountry: "US",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 46.8182,
          longitude: 8.2275,
        },
        areaServed: [
          { "@type": "Place", name: "Swiss Alps" },
          { "@type": "Place", name: "Rocky Mountains" },
          { "@type": "Place", name: "Himalayas" },
          { "@type": "Place", name: "Andes Mountains" },
          { "@type": "Place", name: "Appalachian Mountains" },
          { "@type": "Place", name: "Japanese Alps" },
          { "@type": "Country", name: "Worldwide" },
        ],
        serviceArea: {
          "@type": "GeoShape",
          name: "Worldwide mountain destinations",
        },
        knowsAbout: [
          "Mountain travel",
          "Hiking tours",
          "Ski resorts",
          "Mountaineering",
          "Trekking expeditions",
          "Alpine hotels",
          "Adventure travel",
        ],
        availableLanguage: ["English", "Spanish", "French", "Russian"],
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            opens: "00:00",
            closes: "23:59",
          },
        ],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          reviewCount: "1247",
          bestRating: "5",
          worstRating: "1",
        },
        sameAs: [
          "https://www.facebook.com/hotelmountains",
          "https://www.instagram.com/hotelmountains",
          "https://twitter.com/hotelmountains",
        ],
      },
      {
        "@type": "AboutPage",
        "@id": "https://hotelmountains.com/about#webpage",
        url: "https://hotelmountains.com/about",
        name: "About HotelMountains.com",
        description:
          "Learn about HotelMountains.com — your trusted mountain travel guide covering the Swiss Alps, Rocky Mountains, Himalayas, and more.",
        inLanguage: "en-US",
        isPartOf: { "@id": "https://hotelmountains.com/#website" },
        about: { "@id": "https://hotelmountains.com/#organization" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://hotelmountains.com" },
          { "@type": "ListItem", position: 2, name: "About", item: "https://hotelmountains.com/about" },
        ],
      },
    ],
  };

  return (
    <LegalPageLayout
      title="About HotelMountains.com"
      metaTitle="About Us — HotelMountains.com | Mountain Travel Experts"
      metaDescription="Learn about HotelMountains.com — your trusted mountain travel guide covering the Swiss Alps, Rocky Mountains, Himalayas, and more. Discover our mission and team."
      jsonLd={jsonLd}
    >
      <div className="grid sm:grid-cols-2 gap-6 mb-10 not-prose">
        {[
          { icon: Mountain, label: "6+ Mountain Ranges", desc: "Detailed guides for the world's greatest peaks" },
          { icon: Globe, label: "Worldwide Coverage", desc: "From the Alps to the Andes, Himalayas to Appalachians" },
          { icon: Users, label: "Trusted by Travelers", desc: "Thousands of adventurers use our guides every month" },
          { icon: Heart, label: "Passion-Driven", desc: "Built by mountain lovers, for mountain lovers" },
        ].map((item) => (
          <div key={item.label} className="bg-card border border-border rounded-xl p-5 flex gap-4 items-start">
            <item.icon className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-heading font-bold text-foreground">{item.label}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">Our Mission</h2>
      <p>
        HotelMountains.com is your ultimate resource for mountain travel worldwide. We believe that the world's
        mountains are among the most awe-inspiring places on Earth, and our mission is to help every adventurer —
        from first-time hikers to seasoned mountaineers — discover, plan, and book unforgettable mountain
        experiences.
      </p>

      <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">What We Do</h2>
      <p>
        We create comprehensive, in-depth travel guides for the world's greatest mountain destinations. Our content
        covers everything from the best hiking trails and ski resorts to practical travel tips, accommodation
        recommendations, and curated tour bookings through our trusted partners.
      </p>
      <p>
        Whether you're planning a weekend getaway to the Blue Ridge Mountains, a trekking expedition to Everest Base
        Camp, or a luxury ski holiday in the Swiss Alps, HotelMountains.com has the information you need to make
        your trip extraordinary.
      </p>

      <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">Our Destinations</h2>
      <p>
        We currently cover six major mountain ranges in detail: the <strong className="text-foreground">Swiss Alps</strong>,{" "}
        <strong className="text-foreground">Rocky Mountains</strong>,{" "}
        <strong className="text-foreground">Appalachian Mountains</strong>,{" "}
        <strong className="text-foreground">Himalayas</strong>,{" "}
        <strong className="text-foreground">Andes Mountains</strong>, and the{" "}
        <strong className="text-foreground">Japanese Alps</strong>. Each destination page includes practical travel
        information, top activities, hotel search, tour bookings, and frequently asked questions.
      </p>

      <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">Affiliate Disclosure</h2>
      <p>
        HotelMountains.com participates in affiliate programs, including GetYourGuide's partner program. When you
        book tours or activities through our links, we may earn a commission at no additional cost to you. This
        helps us maintain and improve our free travel guides.
      </p>
    </LegalPageLayout>
  );
};

export default About;
