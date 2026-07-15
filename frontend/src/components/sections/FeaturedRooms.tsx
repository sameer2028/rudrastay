"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { formatPrice } from "@/lib/utils";
import { useFeaturedRooms } from "@/hooks/useRooms";
import { Loader2 } from "lucide-react";

export default function FeaturedRooms() {
  const { data: rooms, isLoading, error } = useFeaturedRooms();
  return (
    <section className="section-padding bg-white">
      <div className="container-luxury">
        <SectionHeading
          subtitle="Accommodations"
          title="Our Finest Rooms"
          description="Each room is thoughtfully designed to blend luxury with the natural beauty of the Doon Valley, offering a serene retreat after a day of exploration."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading && (
            <div className="col-span-full flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-gold" />
            </div>
          )}
          {error && (
            <div className="col-span-full text-center text-red-500 py-12">
              Failed to load rooms. Please try again later.
            </div>
          )}
          {rooms?.map((room, index) => (
            <AnimatedSection key={room.slug} delay={index * 0.15}>
              <Link href={`/rooms/${room.slug}`} className="block group">
                <div className="card-luxury">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={room.images?.[0] || "/images/placeholder.jpg"}
                      alt={room.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Price Badge */}
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
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-gold" />
                      <span className="text-xs text-brown-light">
                        Up to {room.capacity} guests
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-semibold text-warm-brown mb-2 group-hover:text-gold transition-colors duration-300">
                      {room.name}
                    </h3>
                    <p className="text-sm text-brown-light leading-relaxed mb-4 line-clamp-2">
                      {room.description}
                    </p>

                    {/* Amenities */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {room.amenities?.slice(0, 3).map((amenity) => (
                        <span
                          key={amenity}
                          className="px-3 py-1 text-xs text-brown-muted bg-beige rounded-full"
                        >
                          {amenity}
                        </span>
                      ))}
                      {room.amenities && room.amenities.length > 3 && (
                        <span className="px-3 py-1 text-xs text-gold bg-gold/5 rounded-full">
                          +{room.amenities.length - 3}
                        </span>
                      )}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center text-gold text-sm font-medium group-hover:gap-3 gap-2 transition-all duration-300">
                      <span>View Details</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/rooms" className="btn-secondary">
            View All Rooms
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
