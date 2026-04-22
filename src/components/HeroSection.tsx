import { useTranslation } from "react-i18next";
import heroImage from "@/assets/hero-mountain.jpg";

const HeroSection = () => {
  const { t } = useTranslation();
  return (
    <section className="relative min-h-[100svh] min-h-[600px] flex items-center justify-center overflow-hidden">
      <img
        src={heroImage}
        alt="Stunning mountain landscape with alpine lake at golden hour"
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{ background: "var(--hero-overlay)" }}
      />
      <div className="relative z-10 text-center px-5 sm:px-6 max-w-4xl mx-auto pt-20">
        <h1 className="font-heading text-[2.5rem] leading-[1.05] sm:text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground mb-5 md:mb-6 animate-fade-in-up">
          {t("hero.title")}
        </h1>
        <p
          className="font-heading text-lg sm:text-xl md:text-2xl text-primary-foreground/90 mb-3 md:mb-4 italic animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          {t("hero.subtitle")}
        </p>
        <p
          className="text-sm sm:text-base md:text-lg text-primary-foreground/80 mb-8 md:mb-10 max-w-2xl mx-auto animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          {t("hero.description")}
        </p>
        <div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-fade-in-up"
          style={{ animationDelay: "0.6s" }}
        >
          <a
            href="#destinations"
            className="bg-primary text-primary-foreground px-6 sm:px-8 py-3.5 rounded-lg font-semibold text-base sm:text-lg hover:opacity-90 transition-opacity"
          >
            {t("hero.ctaDestinations")}
          </a>
          <a
            href="https://www.getyourguide.com/?partner_id=0IQTGX8&utm_medium=online_publisher"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary-foreground/20 backdrop-blur-sm text-primary-foreground px-6 sm:px-8 py-3.5 rounded-lg font-semibold text-base sm:text-lg border border-primary-foreground/30 hover:bg-primary-foreground/30 transition-colors"
          >
            {t("hero.ctaTours")}
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
