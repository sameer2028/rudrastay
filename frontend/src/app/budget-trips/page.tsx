"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import AnimatedSection from "@/components/shared/AnimatedSection";
import CTASection from "@/components/sections/CTASection";
import { formatPrice } from "@/lib/utils";
import { BUDGET_CATEGORIES } from "@/lib/constants";
import { useBudgetTrips } from "@/hooks/useBudgetTrips";
import { Loader2 } from "lucide-react";

export default function BudgetTripsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  
  const queryCategory = activeCategory === "all" ? undefined : activeCategory;
  const { data: filteredTrips, isLoading, error } = useBudgetTrips(queryCategory);

  return (
    <>
      <section className="relative pt-32 pb-16 bg-beige">
        <div className="container-luxury text-center">
          <AnimatedSection>
            <span className="text-gold text-xs font-semibold uppercase tracking-[0.3em] mb-4 block">
              Plan by Budget
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-warm-brown mb-4">
              Budget Trips
            </h1>
            <p className="text-brown-light max-w-2xl mx-auto">
              Find the perfect trip that matches your budget and travel style.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-luxury">
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-5 py-2 text-xs font-medium uppercase tracking-wider rounded-full transition-all duration-300 ${
                activeCategory === "all"
                  ? "bg-gold text-white shadow-gold"
                  : "bg-beige text-brown-light hover:bg-gold-light/30"
              }`}
            >
              All
            </button>
            {BUDGET_CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-5 py-2 text-xs font-medium uppercase tracking-wider rounded-full transition-all duration-300 ${
                  activeCategory === cat.value
                    ? "bg-gold text-white shadow-gold"
                    : "bg-beige text-brown-light hover:bg-gold-light/30"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Trip Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading && (
              <div className="col-span-full flex justify-center py-20">
                <Loader2 className="w-10 h-10 animate-spin text-gold" />
              </div>
            )}
            {error && (
              <div className="col-span-full text-center text-red-500 py-20">
                Failed to load budget trips. Please try again later.
              </div>
            )}
            {filteredTrips?.map((trip, index) => (
              <AnimatedSection key={trip.name} delay={index * 0.08}>
                <div className="card-luxury group">
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={trip.images?.[0] || "/images/placeholder.jpg"}
                      alt={trip.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-3 right-3 px-3 py-1 bg-gold text-white text-xs font-bold rounded-full">
                      {formatPrice(trip.price_estimate)}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-lg font-semibold text-warm-brown mb-3 group-hover:text-gold transition-colors">
                      {trip.name}
                    </h3>
                    <div className="space-y-2 mb-4">
                      {trip.highlights?.map((h) => (
                        <div key={h} className="flex items-center gap-2">
                          <Sparkles className="w-3 h-3 text-gold" />
                          <span className="text-xs text-brown-light">{h}</span>
                        </div>
                      ))}
                    </div>
                    <Link
                      href={`/budget-trips/${trip.slug}`}
                      className="flex items-center gap-2 text-gold text-sm font-medium hover:gap-3 transition-all"
                    >
                      View Details <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {!isLoading && filteredTrips?.length === 0 && (
            <div className="text-center py-16">
              <p className="text-brown-light">No trips found in this category.</p>
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
