import { useState } from "react";
import { Search, Plane, CalendarDays, Users, ArrowRightLeft } from "lucide-react";

const TP_MARKER = "714761";

const popularRoutes = [
  { label: "NYC → Geneva", from: "JFK", to: "GVA" },
  { label: "London → Zurich", from: "LHR", to: "ZRH" },
  { label: "LA → Denver", from: "LAX", to: "DEN" },
  { label: "Paris → Kathmandu", from: "CDG", to: "KTM" },
  { label: "Tokyo → Cusco", from: "NRT", to: "CUZ" },
  { label: "Chicago → Calgary", from: "ORD", to: "YYC" },
  { label: "Sydney → Queenstown", from: "SYD", to: "ZQN" },
  { label: "Dubai → Innsbruck", from: "DXB", to: "INN" },
];

const FlightSearchWidget = () => {
  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);
  const returnDate = new Date(nextWeek);
  returnDate.setDate(returnDate.getDate() + 7);

  const formatDate = (d: Date) => d.toISOString().split("T")[0];

  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departDate, setDepartDate] = useState(formatDate(nextWeek));
  const [returnDateStr, setReturnDateStr] = useState(formatDate(returnDate));
  const [passengers, setPassengers] = useState("1");
  const [tripType, setTripType] = useState<"round" | "oneway">("round");

  const handleSearch = () => {
    const originQ = encodeURIComponent(origin || "New York");
    const destQ = encodeURIComponent(destination || "Geneva");
    const url = `https://search.aviasales.com/search?origin_iata=${originQ}&destination_iata=${destQ}&depart_date=${departDate}${tripType === "round" ? `&return_date=${returnDateStr}` : ""}&adults=${passengers}&marker=${TP_MARKER}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const swapCities = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  return (
    <section id="flights" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">
            Mountain Flights
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            Fly to the Mountains
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find the cheapest flights to mountain destinations worldwide. Compare airlines and book
            the best deals for your next alpine adventure.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-card border border-border rounded-2xl p-6 md:p-8 shadow-elevated">
          {/* Trip type toggle */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setTripType("round")}
              className={`text-sm font-medium px-4 py-1.5 rounded-full transition-all ${
                tripType === "round"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Round trip
            </button>
            <button
              onClick={() => setTripType("oneway")}
              className={`text-sm font-medium px-4 py-1.5 rounded-full transition-all ${
                tripType === "oneway"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              One way
            </button>
          </div>

          {/* Origin / Destination */}
          <div className="grid md:grid-cols-[1fr_auto_1fr] gap-3 mb-4 items-end">
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                From
              </label>
              <div className="relative">
                <Plane className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground rotate-[-45deg]" />
                <input
                  type="text"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  placeholder="City or airport code"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                />
              </div>
            </div>

            <button
              onClick={swapCities}
              className="hidden md:flex items-center justify-center h-10 w-10 rounded-full border border-border hover:bg-muted transition-colors self-end mb-0.5"
              aria-label="Swap cities"
            >
              <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
            </button>

            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                To
              </label>
              <div className="relative">
                <Plane className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground rotate-45" />
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Mountain destination"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Dates and passengers */}
          <div className={`grid gap-4 mb-4 ${tripType === "round" ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                Departure
              </label>
              <div className="relative">
                <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="date"
                  value={departDate}
                  onChange={(e) => setDepartDate(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                />
              </div>
            </div>
            {tripType === "round" && (
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                  Return
                </label>
                <div className="relative">
                  <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="date"
                    value={returnDateStr}
                    onChange={(e) => setReturnDateStr(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                  />
                </div>
              </div>
            )}
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                Passengers
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <select
                  value={passengers}
                  onChange={(e) => setPassengers(e.target.value)}
                  className="w-full pl-10 pr-8 py-3 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all appearance-none"
                >
                  <option value="1">1 Passenger</option>
                  <option value="2">2 Passengers</option>
                  <option value="3">3 Passengers</option>
                  <option value="4">4 Passengers</option>
                  <option value="5">5+ Passengers</option>
                </select>
              </div>
            </div>
          </div>

          <button
            onClick={handleSearch}
            className="w-full sm:w-auto bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <Search className="h-4 w-4" />
            Search Flights
          </button>

          <p className="text-[11px] text-muted-foreground mt-4 text-center">
            Flight search powered by Aviasales — We may earn a commission at no extra cost to you.
          </p>
        </div>

        {/* Popular Routes */}
        <div className="max-w-4xl mx-auto mt-8">
          <p className="text-sm text-muted-foreground text-center mb-4">Popular mountain routes:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {popularRoutes.map((route) => (
              <button
                key={route.label}
                onClick={() => {
                  setOrigin(route.from);
                  setDestination(route.to);
                }}
                className="text-xs bg-card border border-border px-3 py-1.5 rounded-full text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
              >
                {route.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlightSearchWidget;
