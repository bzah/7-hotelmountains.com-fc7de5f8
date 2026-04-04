import LegalPageLayout from "@/components/LegalPageLayout";
import { Mail, Globe, Clock } from "lucide-react";

const Contact = () => (
  <LegalPageLayout
    title="Contact Us"
    metaTitle="Contact Us — HotelMountains.com"
    metaDescription="Get in touch with HotelMountains.com. Questions about mountain travel, tour bookings, or partnership inquiries — we're here to help."
  >
    <p>
      Have a question about mountain travel, need help planning your trip, or want to partner with us?
      We'd love to hear from you.
    </p>

    <div className="grid sm:grid-cols-3 gap-6 my-10 not-prose">
      {[
        { icon: Mail, label: "Email", value: "info@hotelmountains.com", href: "mailto:info@hotelmountains.com" },
        { icon: Globe, label: "Website", value: "hotelmountains.com", href: "https://hotelmountains.com" },
        { icon: Clock, label: "Response Time", value: "Within 48 hours", href: null },
      ].map((item) => (
        <div key={item.label} className="bg-card border border-border rounded-xl p-5 text-center">
          <item.icon className="h-6 w-6 text-primary mx-auto mb-3" />
          <h3 className="font-heading font-bold text-foreground text-sm">{item.label}</h3>
          {item.href ? (
            <a href={item.href} className="text-sm text-primary hover:underline">{item.value}</a>
          ) : (
            <p className="text-sm text-muted-foreground">{item.value}</p>
          )}
        </div>
      ))}
    </div>

    <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">General Inquiries</h2>
    <p>
      For questions about our travel guides, destination recommendations, or any other general inquiry,
      please email us at <a href="mailto:info@hotelmountains.com" className="text-primary hover:underline">info@hotelmountains.com</a>.
    </p>

    <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">Partnership & Advertising</h2>
    <p>
      Interested in partnering with HotelMountains.com? We work with tour operators, hotels, travel brands,
      and tourism boards worldwide. Reach out to discuss collaboration opportunities.
    </p>

    <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">Content Corrections</h2>
    <p>
      We strive for accuracy in all our guides. If you notice any outdated information, errors, or have
      suggestions for improving our content, please let us know and we'll update it promptly.
    </p>
  </LegalPageLayout>
);

export default Contact;
