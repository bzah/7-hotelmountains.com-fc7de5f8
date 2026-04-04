import LegalPageLayout from "@/components/LegalPageLayout";
import { Mountain, Globe, Users, Heart } from "lucide-react";

const About = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "HotelMountains.com",
    url: "https://hotelmountains.com",
    logo: "https://hotelmountains.com/favicon.png",
    description:
      "Mountain travel guide and tour booking platform helping adventurers discover the world's greatest peaks, trails, and mountain destinations.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
    },
    areaServed: "Worldwide",
    priceRange: "$$",
    sameAs: [],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
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
