import { useState } from "react";
import { Menu, X, Mountain } from "lucide-react";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Destinations", href: "#destinations" },
  { label: "Activities", href: "#activities" },
  { label: "Tours", href: "#tours" },
  { label: "Hotels", href: "#hotels" },
  { label: "Blog", href: "/blog", isRoute: true },
  { label: "Travel Guide", href: "#guide" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <a href="#" className="flex items-center gap-2">
          <Mountain className="h-7 w-7 text-primary" />
          <span className="font-heading text-xl font-bold text-foreground">
            Hotel<span className="text-primary">Mountains</span>.com
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
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
          <a
            href="https://www.getyourguide.com/?partner_id=0IQTGX8&utm_medium=online_publisher"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-primary-foreground px-5 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Book Now
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-foreground"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
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
            Book Now
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
