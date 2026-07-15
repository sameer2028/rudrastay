"use client";

import type { Metadata } from "next";
import { Star, Quote } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import AnimatedSection from "@/components/shared/AnimatedSection";
import CTASection from "@/components/sections/CTASection";
import { useReviews } from "@/hooks/useReviews";
import { Loader2 } from "lucide-react";

export default function ReviewsPage() {
  const { data: reviews, isLoading, error } = useReviews();

  const avgRating = reviews && reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

  return (
    <>
      <section className="relative pt-32 pb-16 bg-beige">
        <div className="container-luxury text-center">
          <AnimatedSection>
            <span className="text-gold text-xs font-semibold uppercase tracking-[0.3em] mb-4 block">
              Testimonials
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-warm-brown mb-4">
              Guest Reviews
            </h1>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                ))}
              </div>
              <span className="font-price text-2xl font-bold text-warm-brown">{avgRating}</span>
              <span className="text-brown-light text-sm">({reviews?.length || 0} reviews)</span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading && (
              <div className="col-span-full flex justify-center py-20">
                <Loader2 className="w-10 h-10 animate-spin text-gold" />
              </div>
            )}
            {error && (
              <div className="col-span-full text-center text-red-500 py-20">
                Failed to load reviews. Please try again later.
              </div>
            )}
            {reviews?.map((review, index) => (
              <AnimatedSection key={review.id} delay={index * 0.08}>
                <div className="bg-cream rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                  <Quote className="w-8 h-8 text-gold-light mb-4" />
                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="text-sm text-brown-light leading-relaxed flex-1 mb-6 italic">
                    &ldquo;{review.content}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-gold-light/20">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                      <span className="font-display text-sm font-bold text-gold">
                        {review.guest_name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-warm-brown">{review.guest_name}</p>
                      <p className="text-xs text-brown-muted">{review.guest_location}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
