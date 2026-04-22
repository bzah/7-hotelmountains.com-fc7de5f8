import SeoLandingPage from "@/components/SeoLandingPage";

const PARTNER = "partner_id=0IQTGX8&utm_medium=online_publisher";

const SkiTrips = () => (
  <SeoLandingPage
    path="/ski-trips"
    breadcrumbLabel="Ski Trips"
    title="Ski Trips — Best Ski Resorts, Packages & Lessons Worldwide | HotelMountains.com"
    description="Plan and book the perfect ski trip. Compare ski resorts in the Alps, Rockies, Japan and Andes, book ski packages, lessons, lift passes, snowboard rentals and ski-in/ski-out hotels — for beginners, families and expert skiers alike."
    keywords="ski trips, ski packages, best ski resorts, ski holidays, ski vacations, ski-in ski-out resorts, family ski trips, ski lessons, ski school, snowboard lessons, lift pass, ski rental, swiss alps skiing, french alps skiing, austria skiing, italy skiing, japan ski resorts, niseko, hakuba, whistler, banff skiing, jackson hole, vail, aspen, st anton, zermatt skiing, val thorens, three valleys, courchevel, chamonix skiing, off piste skiing, backcountry skiing, ski touring, heliskiing, beginner ski packages"
    h1="Ski Trips & Snow Holidays — Worldwide Ski Resort Guide"
    intro="Compare and book ski trips at the world's top resorts. Ski packages, lift passes, ski school, snowboard rentals, ski-in/ski-out hotels and snow activities — from beginner-friendly resorts in Austria to deep powder in Japan and steep terrain in the American Rockies."
    primaryCtaHref={`https://www.getyourguide.com/s/?q=ski+package&${PARTNER}`}
    primaryCtaLabel="Browse Ski Trips"
    heroImage="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1200&q=80"
    sections={[
      {
        heading: "Choosing the Right Ski Resort",
        paragraphs: [
          "Picking the right ski resort makes or breaks a ski holiday. Beginners want gentle nursery slopes, English-speaking ski schools and short transfer times — Austria's Söll, France's La Plagne, Switzerland's Wengen and Italy's Selva Val Gardena are all excellent first-time choices. Intermediate skiers benefit from huge linked ski areas like the Three Valleys (France), Sella Ronda (Italy) and Portes du Soleil (France/Switzerland).",
          "Advanced and expert skiers chase steep terrain and reliable powder. Jackson Hole (Wyoming), Chamonix (France), St. Anton (Austria), Verbier (Switzerland), Niseko and Hakuba (Japan) consistently rank among the world's best resorts for off-piste, freeride and ski-touring. Heliskiing operations in Canada, Alaska, Iceland and Georgia offer the ultimate big-mountain experience.",
          "Family skiers should prioritize resorts with kids' ski schools, snow gardens, family-friendly accommodation, easy access to slopes and a range of non-ski activities. Top family ski destinations include Lech-Zürs (Austria), Avoriaz (France), Saas-Fee (Switzerland), Alta-Snowbird (Utah), Park City (Utah) and Banff/Lake Louise (Canada).",
        ],
      },
      {
        heading: "Top Ski Regions Worldwide",
        paragraphs: [
          "**The Alps (France, Switzerland, Austria, Italy):** The world's most developed ski region, with thousands of kilometers of pistes, hundreds of resorts and best-in-class infrastructure. Iconic resorts include Zermatt (Switzerland), Verbier, St. Moritz, Chamonix (France), Val Thorens, Courchevel, St. Anton (Austria), Lech, Cortina d'Ampezzo (Italy) and the Dolomiti Superski circuit.",
          "**North American Rockies (USA & Canada):** Big terrain, dry powder, fewer crowds and high-quality grooming. Top USA resorts: Vail, Aspen-Snowmass, Park City, Jackson Hole, Snowbird, Big Sky, Mammoth, Whistler-Blackcomb (officially Canada). Canadian classics: Banff/Lake Louise, Sunshine Village, Whistler, Revelstoke and Kicking Horse.",
          "**Japan (Niseko, Hakuba, Furano, Nozawa):** The world's most reliable powder skiing thanks to Siberian air masses dumping 10–15 meters of light, dry snow per season. Combine endless tree skiing with mountain onsen, ryokan stays and incredible food. Best from late December through February.",
          "**Andes (Argentina, Chile):** Southern hemisphere skiing from June to October. Bariloche and Las Leñas in Argentina, Portillo and Valle Nevado in Chile offer big terrain, low crowds and a Northern-summer ski option for offseason training and powder hunters.",
          "**Eastern Europe & Scandinavia:** Affordable, charming and increasingly well-equipped. Bansko (Bulgaria), Jasná (Slovakia), Borovets, Kopaonik (Serbia), Åre (Sweden) and Trysil (Norway) all offer excellent value for budget-conscious skiers.",
        ],
      },
      {
        heading: "How to Plan a Ski Trip",
        paragraphs: [
          "**Decide on dates first.** Snow conditions vary: mid-December to mid-April for the Alps and North America, mid-January to early March for guaranteed Japanese powder, July to September for the Andes. Avoid Christmas/New Year, Chinese New Year and February school holidays if you want to save money.",
          "**Book accommodation 4–6 months ahead.** Ski-in/ski-out hotels at top resorts sell out earliest. If they're full, look for hotels within 5 minutes of a gondola or with a free ski bus stop at the door.",
          "**Buy lift passes ahead of time.** Multi-day passes booked in advance can be 20–30% cheaper than at-window prices. Mega-passes like Epic Pass and Ikon Pass cover dozens of resorts worldwide and pay off after 4–5 ski days.",
          "**Pre-book ski school and rentals.** Group lessons and rental gear sell out at peak resorts. Booking online in advance also locks in lower prices and saves 60–90 minutes of queuing on day one of your trip.",
          "**Budget realistically.** A 7-day ski trip in the Alps or North America typically costs $1,500–$4,500 per person including flights, accommodation, lift pass, rental and food. Eastern Europe drops to $700–1,500; luxury weeks at top resorts can exceed $10,000.",
        ],
      },
    ]}
    partnerLinks={[
      { label: "Swiss Alps Ski Packages", href: `https://www.getyourguide.com/s/?q=swiss+alps+ski&${PARTNER}` },
      { label: "Chamonix Skiing", href: `https://www.getyourguide.com/chamonix-mont-blanc-l1101/?${PARTNER}` },
      { label: "Niseko & Hakuba (Japan)", href: `https://www.getyourguide.com/s/?q=niseko+ski&${PARTNER}` },
      { label: "Whistler Ski Trips", href: `https://www.getyourguide.com/whistler-l3506/?${PARTNER}` },
      { label: "Banff & Lake Louise Skiing", href: `https://www.getyourguide.com/banff-l981/?${PARTNER}` },
      { label: "Colorado Ski Resorts", href: `https://www.getyourguide.com/colorado-l918/?${PARTNER}` },
    ]}
    faq={[
      {
        question: "When is the best time to book a ski trip?",
        answer:
          "Book accommodation and lift passes 4–6 months in advance for peak weeks (Christmas, February school holidays, Chinese New Year). For shoulder weeks (early December, mid-January, mid-March) you can find good deals 4–8 weeks ahead. Last-minute deals are possible in low season but choice is limited.",
      },
      {
        question: "Where is the best place to learn skiing?",
        answer:
          "For first-time skiers, Austria (Söll, Saalbach, Obergurgl), France (La Plagne, Les Gets, Avoriaz), Switzerland (Wengen, Saas-Fee) and Italy (Selva Val Gardena) all offer dedicated beginner zones, top English-speaking ski schools, gentle progression slopes and family infrastructure.",
      },
      {
        question: "How much does a 1-week ski trip cost?",
        answer:
          "Budget Eastern Europe: $700–1,500 per person all-in. Mid-range Alps or North America: $1,500–3,000. Premium ski-in/ski-out at top resorts: $3,000–6,000. Luxury weeks at Aspen, Verbier or Niseko can exceed $10,000 per person, especially over Christmas and New Year.",
      },
      {
        question: "What ski gear do I need to bring?",
        answer:
          "Bring your own ski jacket and pants, base layers, gloves, ski socks, helmet, goggles and sunscreen. Skis, boots and poles are usually rented at the resort to save luggage weight and benefit from freshly tuned equipment. Pre-book rentals online for the best prices.",
      },
    ]}
  />
);

export default SkiTrips;
