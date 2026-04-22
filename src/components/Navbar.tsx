import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "@/assets/logo.png";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const navLinks = [
    { label: t("nav.home"), href: "#" },
    { label: t("nav.destinations"), href: "#destinations" },
    { label: t("nav.activities"), href: "#activities" },
    { label: t("nav.tours"), href: "#tours" },
    { label: t("nav.flights"), href: "#flights" },
    { label: t("nav.hotels"), href: "#hotels" },
    { label: t("nav.blog"), href: "/blog", isRoute: true },
    { label: t("nav.guide"), href: "#guide" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <a href="#" className="flex items-center gap-2">
          <img
            src={logo}
            alt="HotelMountains.com logo"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
          />
          <span className="font-heading text-xl font-bold text-foreground">
            Hotel<span className="text-primary">Mountains</span>.com
          </span>
        </a>

        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) =>
            link.isRoute ? (
              <Link
                key={link.label}
                to={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            )
          )}
          <LanguageSwitcher />
          <a
            href="https://www.getyourguide.com/?partner_id=0IQTGX8&utm_medium=online_publisher"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-primary-foreground px-5 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            {t("nav.bookNow")}
          </a>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <LanguageSwitcher />
          <button
            onClick={() => setOpen(!open)}
            className="text-foreground"
            aria-label={t("nav.toggleMenu")}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-background border-b border-border px-4 pb-4">
          {navLinks.map((link) =>
            link.isRoute ? (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            )
          )}
          <a
            href="https://www.getyourguide.com/?partner_id=0IQTGX8&utm_medium=online_publisher"
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-2 bg-primary text-primary-foreground px-5 py-2 rounded-lg text-sm font-semibold text-center"
          >
            {t("nav.bookNow")}
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
