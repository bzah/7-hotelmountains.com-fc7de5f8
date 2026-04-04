import { Mountain } from "lucide-react";
import { Link } from "react-router-dom";

const PARTNER = "partner_id=0IQTGX8&utm_medium=online_publisher";

const Footer = () => {
  return (
    <footer className="bg-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Mountain className="h-6 w-6 text-primary" />
              <span className="font-heading text-lg font-bold text-background">
                HotelMountains.com
              </span>
            </div>
            <p className="text-background/60 text-sm leading-relaxed">
              Your ultimate guide to mountain travel worldwide. Discover peaks, trails, and adventures
              across every continent.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-bold text-background mb-4">Destinations</h4>
            <ul className="space-y-2 text-sm">
              {[
                { name: "Swiss Alps", slug: "swiss-alps" },
                { name: "Rocky Mountains", slug: "rocky-mountains" },
                { name: "Appalachian Mountains", slug: "appalachian-mountains" },
                { name: "Himalayas", slug: "himalayas" },
                { name: "Andes Mountains", slug: "andes-mountains" },
                { name: "Japanese Alps", slug: "japanese-alps" },
              ].map((dest) => (
                <li key={dest.slug}>
                  <Link
                    to={`/destination/${dest.slug}`}
                    className="text-background/60 hover:text-primary transition-colors"
                  >
                    {dest.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-background mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              {[
                { name: "About Us", path: "/about" },
                { name: "Contact", path: "/contact" },
                { name: "Blog", path: "/blog" },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-background/60 hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="font-heading font-bold text-background mb-4 mt-8">Activities</h4>
            <ul className="space-y-2 text-sm">
              {["Mountain Hiking", "Skiing", "Photography Tours", "Guided Expeditions"].map(
                (act) => (
                  <li key={act}>
                    <a
                      href={`https://www.getyourguide.com/s/?q=${encodeURIComponent(act)}&${PARTNER}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-background/60 hover:text-primary transition-colors"
                    >
                      {act}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-background mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              {[
                { name: "Privacy Policy", path: "/privacy-policy" },
                { name: "Terms of Service", path: "/terms-of-service" },
                { name: "Cookie Policy", path: "/cookie-policy" },
                { name: "DMCA", path: "/dmca" },
                { name: "Legal Notice", path: "/legal-notice" },
                { name: "Parents Info", path: "/parents-info" },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-background/60 hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-background/40 text-sm">
            © {new Date().getFullYear()} HotelMountains.com — All rights reserved
          </p>
          <p className="text-background/30 text-xs">
            Tours powered by GetYourGuide. We may earn a commission at no extra cost to you.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
