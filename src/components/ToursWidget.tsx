import { useEffect } from "react";

const ToursWidget = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widget.getyourguide.com/dist/pa.umd.production.min.js";
    script.async = true;
    script.dataset.gyg_partner_id = "0IQTGX8";
    script.dataset.gyg_number_of_items = "8";
    script.dataset.gyg_locale_code = "en-US";
    script.dataset.gyg_currency = "USD";
    script.dataset.gyg_q = "mountain";
    script.dataset.gyg_widget = "activities";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section id="tours" className="py-14 md:py-24 bg-background">
      <div className="container mx-auto px-5 md:px-6">
        <div className="text-center mb-10 md:mb-16">
          <p className="text-secondary font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3">
            Book Adventures
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Popular Mountain Tours
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            Book verified mountain tours, hiking excursions, and adventure experiences worldwide.
            Trusted reviews. Best price guaranteed.
          </p>
        </div>

        <div className="max-w-5xl mx-auto overflow-hidden">
          <div
            data-gyg-href="https://widget.getyourguide.com/default/activities.frame"
            data-gyg-locale-code="en-US"
            data-gyg-widget="activities"
            data-gyg-number-of-items="8"
            data-gyg-partner-id="0IQTGX8"
            data-gyg-q="mountain"
            data-gyg-currency="USD"
          />
        </div>
      </div>
    </section>
  );
};

export default ToursWidget;
