import { Compass, Footprints, Camera, Snowflake, Tent, Binoculars } from "lucide-react";

const PARTNER = "partner_id=0IQTGX8&utm_medium=online_publisher";

const activities = [
  {
    icon: Footprints,
    title: "Mountain Hiking",
    description: "Trek iconic trails from the Appalachian Trail to Everest Base Camp. Guided hikes for all skill levels.",
    link: `https://www.getyourguide.com/s/?q=mountain+hiking&${PARTNER}`,
  },
  {
    icon: Snowflake,
    title: "Skiing & Snowboarding",
    description: "Hit the slopes at world-class resorts in the Alps, Rockies, and Japanese Alps.",
    link: `https://www.getyourguide.com/s/?q=mountain+skiing&${PARTNER}`,
  },
  {
    icon: Camera,
    title: "Photography Tours",
    description: "Capture stunning mountain landscapes with expert-led photography expeditions.",
    link: `https://www.getyourguide.com/s/?q=mountain+photography+tour&${PARTNER}`,
  },
  {
    icon: Tent,
    title: "Mountain Camping",
    description: "Sleep under the stars at high-altitude campsites with breathtaking panoramic views.",
    link: `https://www.getyourguide.com/s/?q=mountain+camping&${PARTNER}`,
  },
  {
    icon: Compass,
    title: "Guided Expeditions",
    description: "Join expert mountaineers on summit expeditions and multi-day alpine treks.",
    link: `https://www.getyourguide.com/s/?q=mountain+expedition&${PARTNER}`,
  },
  {
    icon: Binoculars,
    title: "Wildlife Safaris",
    description: "Spot mountain wildlife — from Bernese mountain dogs to Andean condors and Himalayan snow leopards.",
    link: `https://www.getyourguide.com/s/?q=mountain+wildlife&${PARTNER}`,
  },
];

const ActivitiesSection = () => {
  return (
    <section id="activities" className="py-14 md:py-24 bg-muted/50">
      <div className="container mx-auto px-5 md:px-6">
        <div className="text-center mb-10 md:mb-16">
          <p className="text-secondary font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3">
            Things to Do
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Mountain Activities & Adventures
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            Whether you're chasing mountain time on a quiet trail or conquering the tallest mountain in the world,
            find your perfect mountain adventure.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {activities.map((activity) => {
            const Icon = activity.icon;
            return (
              <a
                key={activity.title}
                href={activity.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-background rounded-xl p-6 sm:p-8 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border border-border text-center"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 sm:mb-5">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-heading text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3 group-hover:text-primary transition-colors">
                  {activity.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {activity.description}
                </p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ActivitiesSection;
