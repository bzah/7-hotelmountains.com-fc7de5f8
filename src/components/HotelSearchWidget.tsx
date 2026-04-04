import { useState } from "react";
import { Search, Calendar, Users, BedDouble } from "lucide-react";

// Travelpayouts Affiliate Marker ID
const TP_MARKER = "714761";

const popularDestinations = [
  { label: "Swiss Alps, Switzerland", query: "Swiss Alps" },
  { label: "Zermatt, Switzerland", query: "Zermatt" },
  { label: "Interlaken, Switzerland", query: "Interlaken" },
  { label: "Estes Park, Colorado", query: "Estes Park, Colorado" },
  { label: "Banff, Canada", query: "Banff" },
  { label: "Chamonix, France", query: "Chamonix" },
  { label: "Kathmandu, Nepal", query: "Kathmandu" },
  { label: "Asheville, North Carolina", query: "Asheville" },
  { label: "Cusco, Peru", query: "Cusco" },
  { label: "Takayama, Japan", query: "Takayama" },
];

interface HotelSearchWidgetProps {
  defaultDestination?: string;
  compact?: boolean;
}

const HotelSearchWidget = ({ defaultDestination = "", compact = false }: HotelSearchWidgetProps) => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date(today);
  dayAfter.setDate(dayAfter.getDate() + 2);

  const formatDate = (d: Date) => d.toISOString().split("T")[0];

  const [destination, setDestination] = useState(defaultDestination);
  const [checkIn, setCheckIn] = useState(formatDate(tomorrow));
  const [checkOut, setCheckOut] = useState(formatDate(dayAfter));
  const [guests, setGuests] = useState("2");

  const handleSearch = () => {
    const query = encodeURIComponent(destination || "mountain hotel");
    const url = `https://search.hotellook.com/hotels?marker=${TP_MARKER}&destination=${query}&checkIn=${checkIn}&checkOut=${checkOut}&adults=${guests}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (compact) {
    return (
      <div className="bg-card border border-border rounded-xl p-6 shadow-card">
        <div className="flex items-center gap-2 mb-4">
          <BedDouble className="h-5 w-5 text-secondary" />
          <h3 className="font-heading font-bold text-foreground">Find Mountain Hotels</h3>
        </div>
        <div className="space-y-3">
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Where are you going?"
            className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="px-3 py-2.5 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="px-3 py-2.5 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <button
            onClick={handleSearch}
            className="w-full bg-secondary text-secondary-foreground py-2.5 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <Search className="h-4 w-4" />
            Search Hotels
          </button>
        </div>
        <p className="text-[10px] text-muted-foreground mt-3 text-center">
          Powered by Booking.com
        </p>
      </div>
    );
  }

  return (
    <section id="hotels" className="py-20 bg-muted/40">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-secondary font-semibold text-sm uppercase tracking-widest">
            Mountain Accommodations
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            Find Your Perfect Mountain Hotel
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From cozy alpine chalets to luxury mountain resorts — compare prices and book the best
            accommodation for your next mountain adventure.
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-4xl mx-auto bg-card border border-border rounded-2xl p-6 md:p-8 shadow-elevated">
          <div className="grid md:grid-cols-4 gap-4 mb-4">
            <div className="md:col-span-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                Destination
              </label>
              <div className="relative">
                <BedDouble className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="City, region, or hotel name"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                Check-in
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                Check-out
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-end gap-4">
            <div className="w-full sm:w-auto">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                Guests
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="pl-10 pr-8 py-3 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all appearance-none"
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="5">5+ Guests</option>
                </select>
              </div>
            </div>
            <button
              onClick={handleSearch}
              className="w-full sm:w-auto bg-secondary text-secondary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <Search className="h-4 w-4" />
              Search Hotels
            </button>
          </div>

          <p className="text-[11px] text-muted-foreground mt-4 text-center">
            Hotel search powered by Booking.com — We may earn a commission at no extra cost to you.
          </p>
        </div>

        {/* Popular Destinations */}
        <div className="max-w-4xl mx-auto mt-8">
          <p className="text-sm text-muted-foreground text-center mb-4">Popular mountain stays:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {popularDestinations.map((dest) => (
              <button
                key={dest.query}
                onClick={() => {
                  setDestination(dest.query);
                }}
                className="text-xs bg-card border border-border px-3 py-1.5 rounded-full text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
              >
                {dest.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotelSearchWidget;
