import SeoLandingPage from "@/components/SeoLandingPage";

const PARTNER = "partner_id=0IQTGX8&utm_medium=online_publisher";

const HikingTours = () => (
  <SeoLandingPage
    path="/hiking-tours"
    breadcrumbLabel="Hiking Tours"
    title="Hiking Tours — Guided Mountain Hiking & Trekking Worldwide | HotelMountains.com"
    description="Book the best hiking tours and guided treks worldwide. Day hikes, multi-day treks, hut-to-hut trails, glacier walks and mountaineering trips in the Swiss Alps, Rockies, Himalayas, Andes, Japanese Alps and more — all with certified mountain guides."
    keywords="hiking tours, guided hiking tours, mountain hiking tours, trekking tours, multi day treks, hut to hut hiking, swiss alps hiking, dolomites hiking, tour du mont blanc, everest base camp trek, annapurna circuit, inca trail, w trek patagonia, kilimanjaro trek, japan hiking tours, hiking tours for beginners, hiking tours for seniors, family hiking tours, women only hiking tours, photography hiking tours, day hikes, half day hikes, full day hiking tours, glacier hikes, via ferrata, mountaineering courses"
    h1="Mountain Hiking Tours — Guided Hikes & Treks Around the World"
    intro="From half-day walks to legendary multi-week treks, browse and book guided mountain hiking tours led by certified local guides. Tour Du Mont Blanc, Everest Base Camp, Inca Trail, W Circuit, Hakuba traverse, Tour du Mont Rosa and hundreds more — all with verified operators."
    primaryCtaHref={`https://www.getyourguide.com/s/?q=mountain+hiking+tour&${PARTNER}`}
    primaryCtaLabel="Browse Hiking Tours"
    heroImage="https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=80"
    sections={[
      {
        heading: "Why Book a Guided Hiking Tour",
        paragraphs: [
          "A guided hiking tour removes the stress from mountain travel: route planning, navigation, weather monitoring, accommodation logistics, group safety and altitude monitoring are all handled by certified local mountain guides who know the area intimately. You hike farther, see more, learn about local flora, geology and culture, and you do it all with a clear safety net.",
          "Guided tours are essential for high-altitude treks (Everest Base Camp, Annapurna Circuit, Kilimanjaro), glacier crossings, via ferrata routes, and remote multi-day expeditions where weather and route-finding errors can be life-threatening. They are also fantastic for families, solo travelers and beginners who want to enjoy the mountains without the burden of logistics.",
          "On HotelMountains.com you can browse hiking tours from short half-day walks to 3-week expeditions. Every tour listing includes group size, fitness level, included gear, accommodation type, meal plan, transfers, guide language and free cancellation policy — so you can compare confidently and book with one click.",
        ],
      },
      {
        heading: "Top Hiking Tour Categories",
        paragraphs: [
          "**Day hiking tours:** Half-day or full-day guided hikes ideal for travelers based in a mountain town who want a single day of authentic alpine experience. Most popular in Zermatt, Interlaken, Chamonix, Banff, Asheville, Kamikochi and Cusco.",
          "**Multi-day treks:** 3 to 21 days of trekking with mountain hut, lodge or tent accommodation. Iconic options: Tour du Mont Blanc (170 km, 11 days), Tour du Mont Rosa, Alta Via 1 in the Dolomites, Haute Route (Chamonix–Zermatt), West Highland Way, Laugavegur, John Muir Trail, GR 20.",
          "**High-altitude treks:** Everest Base Camp (12–14 days), Annapurna Circuit (12–21 days), Manaslu Circuit, Kanchenjunga Base Camp, Kilimanjaro (5–9 days), Aconcagua (14–21 days), Salkantay & Inca Trail to Machu Picchu, W Trek and Circuit in Torres del Paine.",
          "**Hut-to-hut hiking:** A uniquely European mountain experience — sleep in mountain refuges, eat hearty regional meals, hike with a light pack between huts. Best in the Alps, Dolomites, Pyrenees, Tatras and Carpathians.",
          "**Family hiking tours:** Easier routes (5–12 km/day), kid-friendly pace, shorter days, more rest stops, family rooms in mountain accommodation. Available in the Swiss Alps, Rockies, Smokies, Dolomites and Japanese Alps.",
        ],
      },
      {
        heading: "How to Choose the Right Hiking Tour",
        paragraphs: [
          "**Match the difficulty to your fitness honestly.** Most tour pages list daily distance (km), elevation gain (meters), maximum altitude and a fitness rating. As a rough guide: easy = up to 12 km/400m gain per day, moderate = 12–18 km/400–900m, strenuous = 18–25 km/900–1500m, expedition = 25+ km or 1500m+ gain at altitude.",
          "**Check what's included.** A high-quality guided tour includes certified guides (UIAGM/IFMGA for technical routes), all permits, accommodation, most meals, group safety equipment, emergency communication, insurance and airport transfers. Avoid tours that bury fees for permits, transfers or 'optional' equipment in the fine print.",
          "**Consider group size.** Small-group tours (4–8 hikers) move faster, get more guide attention, and access smaller accommodation; larger groups (12–16) are usually cheaper but slower. Solo travelers should ask about single-supplement fees.",
          "**Plan for the season.** July–September is peak season in the Alps, Rockies, Pyrenees, Dolomites, Himalayas and Japanese Alps; November–March is best for Patagonia and New Zealand. Shoulder seasons (May–June, October) often deliver the best weather windows with fewer crowds.",
        ],
      },
    ]}
    partnerLinks={[
      { label: "Tour du Mont Blanc", href: `https://www.getyourguide.com/s/?q=tour+du+mont+blanc&${PARTNER}` },
      { label: "Everest Base Camp Trek", href: `https://www.getyourguide.com/s/?q=everest+base+camp&${PARTNER}` },
      { label: "Inca Trail to Machu Picchu", href: `https://www.getyourguide.com/s/?q=inca+trail&${PARTNER}` },
      { label: "Patagonia W Trek", href: `https://www.getyourguide.com/s/?q=patagonia+w+trek&${PARTNER}` },
      { label: "Dolomites Hiking", href: `https://www.getyourguide.com/s/?q=dolomites+hiking&${PARTNER}` },
      { label: "Kilimanjaro Trek", href: `https://www.getyourguide.com/s/?q=kilimanjaro+trek&${PARTNER}` },
    ]}
    faq={[
      {
        question: "How much does a guided hiking tour cost?",
        answer:
          "Day hiking tours typically cost $80–250 per person. Multi-day guided treks (Tour du Mont Blanc, Inca Trail, W Circuit) range from $1,200 to $3,500 including guides, accommodation and meals. Premium expeditions like Everest Base Camp run $2,500–$5,000. Full Everest summit climbs start around $45,000.",
      },
      {
        question: "Do I need experience to join a guided hiking tour?",
        answer:
          "No experience is needed for easy and moderate day tours and many beginner-friendly treks (Tour du Mont Blanc, Inca Trail, Annapurna Base Camp). High-altitude expeditions (Everest, Aconcagua), technical routes (Mont Blanc summit) and via ferrata generally require previous trekking experience and good cardiovascular fitness.",
      },
      {
        question: "What gear is provided on guided hiking tours?",
        answer:
          "Most tours provide group safety gear (ropes, harnesses where needed, first-aid kits, satellite communication), but you bring personal items: hiking boots, layered clothing, daypack, trekking poles, water bottle and headlamp. Multi-day treks usually rent sleeping bags and technical gear locally.",
      },
      {
        question: "Are hiking tours safe?",
        answer:
          "Guided hiking tours led by certified mountain guides are very safe. Mountain guides constantly monitor weather, terrain, group fitness and altitude symptoms, and adjust the route as needed. Always book with reputable operators (UIAGM/IFMGA-certified for technical routes) and disclose any health conditions before booking.",
      },
    ]}
  />
);

export default HikingTours;
