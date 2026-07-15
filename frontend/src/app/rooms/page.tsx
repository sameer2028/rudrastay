"use client";

import type { Metadata } from "next";
import Link from "next/link";
import { Users, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import AnimatedSection from "@/components/shared/AnimatedSection";
import CTASection from "@/components/sections/CTASection";
import { formatPrice } from "@/lib/utils";
import { useRooms } from "@/hooks/useRooms";
import { Loader2 } from "lucide-react";

export default function RoomsPage() {
  const { data: rooms, isLoading, error } = useRooms();
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-beige">
        <div className="container-luxury text-center">
          <AnimatedSection>
            <span className="text-gold text-xs font-semibold uppercase tracking-[0.3em] mb-4 block">
              Accommodations
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-warm-brown mb-4">
              Our Rooms & Suites
            </h1>
            <p className="text-brown-light max-w-2xl mx-auto">
              Each room is a sanctuary of comfort, blending contemporary luxury with the
              timeless beauty of the Doon Valley.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Room Listing */}
      <section className="section-padding bg-white">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {isLoading && (
              <div className="col-span-full flex justify-center py-20">
                <Loader2 className="w-10 h-10 animate-spin text-gold" />
              </div>
            )}
            {error && (
              <div className="col-span-full text-center text-red-500 py-20">
                Failed to load rooms. Please try again later.
              </div>
            )}
            {rooms?.map((room, index) => (
              <AnimatedSection key={room.slug} delay={index * 0.1}>
                <Link href={`/rooms/${room.slug}`} className="block group">
                  <div className="card-luxury">
                    <div className="relative h-72 overflow-hidden">
                      <img
                        src={room.images?.[0] || "/images/placeholder.jpg"}
                        alt={room.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="absolute top-4 right-4 px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full shadow-md flex items-center">
                        {room.original_price && room.original_price > room.price_per_night && (
                          <span className="text-xs text-brown-muted line-through mr-1.5 font-medium">
                            {formatPrice(room.original_price)}
                          </span>
                        )}
                        <span className="font-price text-lg font-bold text-warm-brown">
                          {formatPrice(room.price_per_night)}
                        </span>
                        <span className="text-xs text-brown-light ml-1">/night</span>
                      </div>

                      {room.is_available && (
                        <div className="absolute top-4 left-4 px-3 py-1 bg-success/90 text-white text-xs font-medium rounded-full">
                          Available
                        </div>
                      )}
                    </div>

                    <div className="p-8">
                      <div className="flex items-center gap-2 mb-3">
                        <Users className="w-4 h-4 text-gold" />
                        <span className="text-xs text-brown-light">
                          Up to {room.capacity} guests
                        </span>
                      </div>

                      <h2 className="font-display text-2xl font-semibold text-warm-brown mb-3 group-hover:text-gold transition-colors">
                        {room.name}
                      </h2>
                      <p className="text-sm text-brown-light leading-relaxed mb-5">
                        {room.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {room.amenities?.map((amenity) => (
                          <span
                            key={amenity}
                            className="px-3 py-1 text-xs text-brown-muted bg-beige rounded-full"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-gold text-sm font-medium group-hover:gap-3 transition-all">
                          View Details <ArrowRight className="w-4 h-4" />
                        </span>
                        <span className="btn-primary text-xs px-6 py-2">
                          Book Now
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
