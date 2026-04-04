import { Mountain } from "lucide-react";

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
              {["Swiss Alps", "Rocky Mountains", "Appalachian Mountains", "Himalayas", "Andes", "Japanese Alps"].map(
                (dest) => (
                  <li key={dest}>
                    <a
                      href={`https://www.getyourguide.com/s/?q=${encodeURIComponent(dest)}&${PARTNER}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-background/60 hover:text-primary transition-colors"
                    >
                      {dest}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-background mb-4">Activities</h4>
            <ul className="space-y-2 text-sm">
              {["Mountain Hiking", "Skiing", "Photography Tours", "Camping", "Guided Expeditions", "Wildlife Safaris"].map(
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
            <h4 className="font-heading font-bold text-background mb-4">Popular Searches</h4>
            <ul className="space-y-2 text-sm">
              {[
                "Brokeback Mountain Tours",
                "Mountain Time Zone Guide",
                "Bernese Mountain Dog Trails",
                "Rocky Mountain National Park",
                "Tallest Mountain in the World",
                "Appalachian Trail Guide",
              ].map((item) => (
                <li key={item}>
                  <a href="#guide" className="text-background/60 hover:text-primary transition-colors">
                    {item}
                  </a>
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
