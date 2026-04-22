const PARTNER = "partner_id=0IQTGX8&utm_medium=online_publisher";

const faqs = [
  {
    question: "What is the tallest mountain in the world?",
    answer: "Mount Everest stands at 8,849 meters (29,032 ft) in the Himalayas, on the border of Nepal and Tibet. It's the ultimate dream for mountaineers. You can trek to Everest Base Camp without technical climbing experience.",
  },
  {
    question: "What time is it in mountain time?",
    answer: "Mountain Time (MT) covers parts of the western United States and Canada, including Denver, Salt Lake City, and Calgary. Mountain Standard Time (MST) is UTC-7, while Mountain Daylight Time (MDT) is UTC-6.",
  },
  {
    question: "Where are the Appalachian Mountains?",
    answer: "The Appalachian Mountains stretch approximately 2,000 miles along the eastern side of North America, from Alabama and Georgia in the south to Maine and New Brunswick in the north. They're home to the famous Appalachian Trail.",
  },
  {
    question: "What is the best time to visit Rocky Mountain National Park?",
    answer: "The best time to visit Rocky Mountain National Park is June through September when Trail Ridge Road is open. Summer offers wildflower blooms and excellent hiking. Winter is perfect for snowshoeing and cross-country skiing.",
  },
  {
    question: "What is a Bernese Mountain Dog?",
    answer: "The Bernese Mountain Dog is a large, sturdy breed originally from the Swiss Alps near Bern. These gentle giants were bred as farm dogs and are known for their striking tri-color coat, loyalty, and calm temperament.",
  },
  {
    question: "What are the best mountain destinations for beginners?",
    answer: "Great beginner-friendly mountain destinations include the Great Smoky Mountains (USA), Swiss Alps villages like Grindelwald, the Lake District (UK), and the Japanese Alps town of Kamikochi. All offer easy trails with stunning views.",
  },
];

const MountainGuide = () => {
  return (
    <section id="guide" className="py-14 md:py-24 bg-muted/50">
      <div className="container mx-auto px-5 md:px-6">
        <div className="text-center mb-10 md:mb-16">
          <p className="text-secondary font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3">
            Travel Guide
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Mountain Travel FAQ
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            Everything you need to know about mountain destinations, from peak heights to the best times to visit.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4 md:space-y-6">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group bg-background rounded-xl border border-border shadow-card"
            >
              <summary className="flex items-start justify-between gap-4 cursor-pointer p-5 sm:p-6 font-heading text-base sm:text-lg font-semibold text-foreground hover:text-primary transition-colors list-none">
                <span className="flex-1">{faq.question}</span>
                <span className="text-muted-foreground group-open:rotate-45 transition-transform text-2xl leading-none shrink-0">
                  +
                </span>
              </summary>
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm sm:text-base text-muted-foreground leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>

        <div className="text-center mt-10 md:mt-12">
          <a
            href={`https://www.getyourguide.com/s/?q=mountain+tours&${PARTNER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary text-primary-foreground px-6 sm:px-8 py-3.5 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Browse All Mountain Tours →
          </a>
        </div>
      </div>
    </section>
  );
};

export default MountainGuide;
