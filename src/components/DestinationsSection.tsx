import { MapPin } from "lucide-react";

const GYG_BASE = "https://www.getyourguide.com";
const PARTNER = "partner_id=0IQTGX8&utm_medium=online_publisher";

const destinations = [
  {
    name: "Swiss Alps",
    country: "Switzerland",
    description: "Iconic peaks like the Matterhorn and Jungfrau. Ski resorts, alpine meadows, and scenic train routes through dramatic mountain passes.",
    link: `${GYG_BASE}/switzerland-l117/?${PARTNER}`,
    emoji: "🇨🇭",
  },
  {
    name: "Rocky Mountains",
    country: "USA & Canada",
    description: "Stretching from New Mexico to British Columbia — experience Rocky Mountain National Park, Banff, and world-class skiing in Colorado.",
    link: `${GYG_BASE}/rocky-mountain-national-park-l97277/?${PARTNER}`,
    emoji: "🏔️",
  },
  {
    name: "Appalachian Mountains",
    country: "Eastern USA",
    description: "Ancient peaks stretching from Georgia to Maine. Hike the legendary Appalachian Trail through the Great Smoky Mountains and Blue Ridge.",
    link: `${GYG_BASE}/great-smoky-mountains-l4575/?${PARTNER}`,
    emoji: "🌲",
  },
  {
    name: "Himalayas",
    country: "Nepal & India",
    description: "Home to Mount Everest and the world's tallest peaks. Trek to Everest Base Camp or discover ancient monasteries in the clouds.",
    link: `${GYG_BASE}/nepal-l293/?${PARTNER}`,
    emoji: "🏔️",
  },
  {
    name: "Andes Mountains",
    country: "South America",
    description: "The world's longest mountain range. From Machu Picchu to Patagonian glaciers, the Andes offer unmatched adventure across 7 countries.",
    link: `${GYG_BASE}/peru-l188/?${PARTNER}`,
    emoji: "🦙",
  },
  {
    name: "Japanese Alps",
    country: "Japan",
    description: "Stunning peaks on Honshu island. Visit Kamikochi valley, soak in mountain onsen, and explore traditional alpine villages like Shirakawa-go.",
    link: `${GYG_BASE}/japan-l248/?${PARTNER}`,
    emoji: "🇯🇵",
  },
];

const DestinationsSection = () => {
  return (
    <section id="destinations" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-secondary font-semibold text-sm uppercase tracking-wider mb-3">
            Explore Worldwide
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            Top Mountain Destinations
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            From the tallest mountain in the world to hidden alpine gems — discover the best mountain
            destinations for hiking, skiing, and unforgettable adventures.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest) => (
            <a
              key={dest.name}
              href={dest.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-card rounded-xl p-6 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border border-border"
            >
              <div className="flex items-start gap-3 mb-4">
                <span className="text-3xl">{dest.emoji}</span>
                <div>
                  <h3 className="font-heading text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {dest.name}
                  </h3>
                  <div className="flex items-center gap-1 text-muted-foreground text-sm">
                    <MapPin className="h-3.5 w-3.5" />
                    {dest.country}
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {dest.description}
              </p>
              <span className="inline-block mt-4 text-sm font-semibold text-primary group-hover:underline">
                Explore Tours →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;
