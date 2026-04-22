import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Blog from "./pages/Blog.tsx";
import BlogArticle from "./pages/BlogArticle.tsx";
import DestinationPage from "./pages/DestinationPage.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import TermsOfService from "./pages/TermsOfService.tsx";
import CookiePolicy from "./pages/CookiePolicy.tsx";
import DMCA from "./pages/DMCA.tsx";
import LegalNotice from "./pages/LegalNotice.tsx";
import ParentsInfo from "./pages/ParentsInfo.tsx";
import MountainHotels from "./pages/MountainHotels.tsx";
import HikingTours from "./pages/HikingTours.tsx";
import SkiTrips from "./pages/SkiTrips.tsx";
import NotFound from "./pages/NotFound.tsx";
import RouteTracker from "./components/RouteTracker.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <RouteTracker />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogArticle />} />
          <Route path="/destination/:slug" element={<DestinationPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/dmca" element={<DMCA />} />
          <Route path="/legal-notice" element={<LegalNotice />} />
          <Route path="/parents-info" element={<ParentsInfo />} />
          <Route path="/mountain-hotels" element={<MountainHotels />} />
          <Route path="/hiking-tours" element={<HikingTours />} />
          <Route path="/ski-trips" element={<SkiTrips />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
