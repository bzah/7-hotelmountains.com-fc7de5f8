import { Mountain } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const PARTNER = "partner_id=0IQTGX8&utm_medium=online_publisher";

const Footer = () => {
  const { t } = useTranslation();

  const destinations = [
    { name: "Swiss Alps", slug: "swiss-alps" },
    { name: "Rocky Mountains", slug: "rocky-mountains" },
    { name: "Appalachian Mountains", slug: "appalachian-mountains" },
    { name: "Himalayas", slug: "himalayas" },
    { name: "Andes Mountains", slug: "andes-mountains" },
    { name: "Japanese Alps", slug: "japanese-alps" },
  ];

  const company = [
    { name: t("footer.about"), path: "/about" },
    { name: t("footer.contact"), path: "/contact" },
    { name: t("footer.blog"), path: "/blog" },
  ];

  const activities = [
    { key: "actHiking", q: "Mountain Hiking" },
    { key: "actSkiing", q: "Skiing" },
    { key: "actPhoto", q: "Photography Tours" },
    { key: "actGuided", q: "Guided Expeditions" },
  ] as const;

  const legal = [
    { name: t("footer.privacy"), path: "/privacy-policy" },
    { name: t("footer.terms"), path: "/terms-of-service" },
    { name: t("footer.cookies"), path: "/cookie-policy" },
    { name: t("footer.dmca"), path: "/dmca" },
    { name: t("footer.legalNotice"), path: "/legal-notice" },
    { name: t("footer.parents"), path: "/parents-info" },
  ];

  return (
    <footer className="bg-foreground py-12 md:py-16">
      <div className="container mx-auto px-5 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Mountain className="h-6 w-6 text-primary" />
              <span className="font-heading text-lg font-bold text-background">
                HotelMountains.com
              </span>
            </div>
            <p className="text-background/60 text-sm leading-relaxed">
              {t("footer.tagline")}
            </p>
          </div>

          <div>
            <h4 className="font-heading font-bold text-background mb-4">
              {t("footer.destinations")}
            </h4>
            <ul className="space-y-2 text-sm">
              {destinations.map((dest) => (
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
            <h4 className="font-heading font-bold text-background mb-4">
              {t("footer.company")}
            </h4>
            <ul className="space-y-2 text-sm">
              {company.map((item) => (
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

            <h4 className="font-heading font-bold text-background mb-4 mt-8">
              {t("footer.activities")}
            </h4>
            <ul className="space-y-2 text-sm">
              {activities.map((act) => (
                <li key={act.key}>
                  <a
                    href={`https://www.getyourguide.com/s/?q=${encodeURIComponent(act.q)}&${PARTNER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-background/60 hover:text-primary transition-colors"
                  >
                    {t(`footer.${act.key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-background mb-4">
              {t("footer.legal")}
            </h4>
            <ul className="space-y-2 text-sm">
              {legal.map((item) => (
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
            © {new Date().getFullYear()} HotelMountains.com — {t("footer.rights")}
          </p>
          <p className="text-background/30 text-xs">
            {t("footer.disclosure")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
