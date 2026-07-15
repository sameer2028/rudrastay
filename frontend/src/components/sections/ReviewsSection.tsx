"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import AnimatedSection from "@/components/shared/AnimatedSection";

const REVIEWS = [
  {
    name: "Priya Sharma",
    location: "Delhi, India",
    rating: 5,
    content:
      "An absolutely magical experience! The mountain views from our suite were breathtaking. The staff went above and beyond to make our anniversary special. We'll definitely be back!",
  },
  {
    name: "Rajesh Mehra",
    location: "Mumbai, India",
    rating: 5,
    content:
      "Rudra Stay exceeded every expectation. The blend of luxury and natural beauty is unmatched. Perfect for a family getaway — the kids loved the mountain trails!",
  },
  {
    name: "Anita Gupta",
    location: "Bangalore, India",
    rating: 5,
    content:
      "The best hotel experience in Dehradun. Impeccable rooms, incredible food, and the most helpful staff. The tour packages they offer are well-organized and great value.",
  },
];

export default function ReviewsSection() {
  return (
    <section className="section-padding bg-beige">
      <div className="container-luxury">
        <SectionHeading
          subtitle="Testimonials"
          title="What Our Guests Say"
          description="Don't just take our word for it — hear from travelers who have experienced the Rudra Stay difference."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review, index) => (
            <AnimatedSection key={review.name} delay={index * 0.15}>
              <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                {/* Quote Icon */}
                <Quote className="w-8 h-8 text-gold-light mb-4" />

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-gold text-gold"
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-sm text-brown-light leading-relaxed flex-1 mb-6 italic">
                  &ldquo;{review.content}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-gold-light/20">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                    <span className="font-display text-sm font-bold text-gold">
                      {review.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-warm-brown">
                      {review.name}
                    </p>
                    <p className="text-xs text-brown-muted">{review.location}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/reviews" className="btn-secondary">
            Read All Reviews
          </Link>
        </div>
      </div>
    </section>
  );
}
