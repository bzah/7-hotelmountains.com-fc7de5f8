import { useMemo, useState } from "react";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { destinations } from "@/data/destinations";
import FilterChips from "@/components/FilterChips";

const DestinationsSection = () => {
  return (
    <section id="destinations" className="py-14 md:py-24 bg-background">
      <div className="container mx-auto px-5 md:px-6">
        <div className="text-center mb-10 md:mb-16">
          <p className="text-secondary font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3">
            Explore Worldwide
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Top Mountain Destinations
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            From the tallest mountain in the world to hidden alpine gems — discover the best mountain
            destinations for hiking, skiing, and unforgettable adventures.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          {destinations.map((dest) => (
            <Link
              key={dest.slug}
              to={`/destination/${dest.slug}`}
              className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border border-border"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={dest.heroImage}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-5 sm:p-6">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-2xl sm:text-3xl shrink-0">{dest.emoji}</span>
                  <div className="min-w-0">
                    <h3 className="font-heading text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {dest.name}
                    </h3>
                    <div className="flex items-center gap-1 text-muted-foreground text-sm">
                      <MapPin className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{dest.country}</span>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                  {dest.intro}
                </p>
                <span className="inline-block mt-4 text-sm font-semibold text-primary group-hover:underline">
                  Explore Destination →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;
