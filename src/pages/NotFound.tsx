import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mountain, Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "Page Not Found — HotelMountains.com";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", "The page you're looking for doesn't exist. Explore our mountain travel guides, destinations, and tours instead.");
    }
    console.error("404 Error:", location.pathname);
  }, [location.pathname]);

  const suggestions = [
    { name: "Swiss Alps", path: "/destination/swiss-alps" },
    { name: "Rocky Mountains", path: "/destination/rocky-mountains" },
    { name: "Himalayas", path: "/destination/himalayas" },
    { name: "Travel Blog", path: "/blog" },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <Mountain className="h-16 w-16 text-primary mx-auto mb-6 opacity-60" />
          <h1 className="font-heading text-6xl md:text-8xl font-bold text-foreground mb-4">404</h1>
          <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-3">
            Trail Not Found
          </h2>
          <p className="text-muted-foreground text-lg mb-2">
            The path <code className="bg-muted px-2 py-1 rounded text-sm">{location.pathname}</code> doesn't lead anywhere.
          </p>
          <p className="text-muted-foreground mb-10">
            It might have been moved, renamed, or never existed. Let's get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
            <Link
              to="/blog"
              className="inline-flex items-center justify-center gap-2 bg-card border border-border text-foreground px-6 py-3 rounded-lg font-semibold hover:bg-muted transition-colors"
            >
              <Search className="h-4 w-4" />
              Browse Guides
            </Link>
          </div>

          <div>
            <h3 className="font-heading font-bold text-foreground mb-5">Popular Destinations</h3>
            <div className="grid grid-cols-2 gap-3">
              {suggestions.map((s) => (
                <Link
                  key={s.path}
                  to={s.path}
                  className="flex items-center justify-center gap-2 bg-card border border-border rounded-xl p-4 text-sm font-medium text-foreground hover:border-primary/40 hover:text-primary transition-all"
                >
                  <ArrowLeft className="h-3.5 w-3.5 rotate-180" />
                  {s.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
