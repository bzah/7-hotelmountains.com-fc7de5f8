import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { gaPageview } from "@/lib/analytics";

/** Fires a GA4 page_view on every SPA route change. */
const RouteTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname + location.search;
    // Defer so document.title (set by SEO helpers) is up-to-date.
    const id = window.setTimeout(() => gaPageview(path), 0);
    return () => window.clearTimeout(id);
  }, [location.pathname, location.search]);

  return null;
};

export default RouteTracker;
