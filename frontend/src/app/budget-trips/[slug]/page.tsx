"use client";

import { use } from "react";
import Link from "next/link";
import { CheckCircle, Map, Mountain, Info, ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import AnimatedSection from "@/components/shared/AnimatedSection";
import CTASection from "@/components/sections/CTASection";
import BookingForm from "@/components/booking/BookingForm";
import { useBudgetTrip } from "@/hooks/useBudgetTrips";
import { Loader2 } from "lucide-react";

export default function BudgetTripDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  
  // Note: We need a hook to fetch a single budget trip. Assuming useBudgetTrip exists or we can just fetch it.
  const { data: trip, isLoading, error } = useBudgetTrip(resolvedParams.slug);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex items-center justify-center bg-beige">
        <Loader2 className="w-12 h-12 animate-spin text-gold" />
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex flex-col items-center justify-center bg-beige">
        <h1 className="text-3xl font-display font-bold text-warm-brown mb-4">Trip not found</h1>
        <Link href="/budget-trips" className="btn-secondary">Back to Budget Trips</Link>
      </div>
    );
  }

  return (
    <>
      <section className="relative pt-32 pb-24 bg-charcoal">
        <div className="absolute inset-0">
          <img
            src={trip.images?.[0] || "/images/placeholder.jpg"}
            alt={trip.name}
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/40 to-charcoal" />
        </div>
        <div className="relative z-10 container-luxury text-center">
          <AnimatedSection>
            <span className="text-gold-light text-xs font-semibold uppercase tracking-[0.3em] mb-4 block">
              {trip.category}
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-4xl mx-auto leading-tight">
              {trip.name}
            </h1>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            <div className="lg:col-span-2 space-y-12">
              <AnimatedSection direction="up">
                <h2 className="font-display text-2xl font-bold text-warm-brown mb-4">
                  Trip Overview
                </h2>
                <p className="text-brown-light leading-relaxed text-lg">
                  {trip.description}
                </p>
              </AnimatedSection>

              {trip.highlights && trip.highlights.length > 0 && (
                <AnimatedSection direction="up" delay={0.1}>
                  <h2 className="font-display text-2xl font-bold text-warm-brown mb-6">
                    Highlights
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {trip.highlights.map((item: string) => (
                      <div key={item} className="flex items-start gap-3 p-4 rounded-xl bg-beige border border-gold-light/20 transform-gpu will-change-transform">
                        <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
                        <span className="text-sm font-medium text-warm-brown">{item}</span>
                      </div>
                    ))}
                  </div>
                </AnimatedSection>
              )}
            </div>

            <div className="lg:col-span-1">
              <AnimatedSection direction="left">
                <BookingForm 
                  itemId={trip.id}
                  itemName={trip.name}
                  price={trip.price_estimate}
                  itemType="budget_trip"
                />
              </AnimatedSection>
            </div>

          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
