"use client";

import { use } from "react";
import Link from "next/link";
import { Users, CheckCircle, ArrowRight, BedDouble, Bath, Maximize } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import SectionHeading from "@/components/shared/SectionHeading";
import AnimatedSection from "@/components/shared/AnimatedSection";
import CTASection from "@/components/sections/CTASection";
import BookingForm from "@/components/booking/BookingForm";
import { useRoom } from "@/hooks/useRooms";
import { Loader2 } from "lucide-react";

export default function RoomDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const { data: room, isLoading, error } = useRoom(resolvedParams.slug);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex items-center justify-center bg-beige">
        <Loader2 className="w-12 h-12 animate-spin text-gold" />
      </div>
    );
  }

  if (error || !room) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex flex-col items-center justify-center bg-beige">
        <h1 className="text-3xl font-display font-bold text-warm-brown mb-4">Room not found</h1>
        <Link href="/rooms" className="btn-secondary">Back to Rooms</Link>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-24 bg-charcoal">
        <div className="absolute inset-0">
          <img
            src={room.images?.[0] || "/images/placeholder.jpg"}
            alt={room.name}
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/40 to-charcoal" />
        </div>
        <div className="relative z-10 container-luxury text-center">
          <AnimatedSection>
            <span className="text-gold-light text-xs font-semibold uppercase tracking-[0.3em] mb-4 block">
              Luxury Stay
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {room.name}
            </h1>
              <div className="flex flex-wrap items-center justify-center gap-6 text-white/80 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gold-light" />
                  <span>Up to {room.capacity} Guests</span>
                </div>
              </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Details Section */}
      <section className="section-padding bg-white relative">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              
              <AnimatedSection direction="up" delay={0.05}>
                <h2 className="font-display text-2xl font-bold text-warm-brown mb-4">
                  Overview
                </h2>
                <p className="text-brown-light leading-relaxed text-lg mb-8">
                  {room.description}
                </p>

                {/* Photo Gallery */}
                {room.images && room.images.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                    {room.images.slice(0, 2).map((img, idx) => (
                      <div key={idx} className="relative h-48 sm:h-64 overflow-hidden rounded-xl shadow-sm border border-gold-light/20">
                        <img 
                          src={img} 
                          alt={`${room.name} view ${idx + 1}`} 
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </AnimatedSection>

              <AnimatedSection direction="up" delay={0.1}>
                <h2 className="font-display text-2xl font-bold text-warm-brown mb-6">
                  Room Amenities
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {room.amenities?.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-3 p-3 rounded-lg bg-beige/50 border border-gold-light/20 hover:border-gold/30 transition-colors transform-gpu will-change-transform">
                      <CheckCircle className="w-5 h-5 text-gold shrink-0" />
                      <span className="text-sm font-medium text-warm-brown">{amenity}</span>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
              
              <AnimatedSection direction="up" delay={0.2}>
                 <h2 className="font-display text-2xl font-bold text-warm-brown mb-6">
                  House Rules
                </h2>
                <ul className="space-y-3 text-sm text-brown-light list-disc pl-5">
                  <li>Check-in: 2:00 PM</li>
                  <li>Check-out: 11:00 AM</li>
                  <li>No smoking inside the rooms (designated smoking areas available)</li>
                  <li>Pets are allowed only in specific pet-friendly rooms</li>
                  <li>Quiet hours from 10:00 PM to 7:00 AM</li>
                </ul>
              </AnimatedSection>
            </div>

            {/* Sidebar Booking Widget */}
            <div className="lg:col-span-1">
              <AnimatedSection direction="left">
                <BookingForm 
                  itemId={room.id}
                  itemName={room.name}
                  price={room.price_per_night}
                  originalPrice={room.original_price}
                  capacity={room.capacity}
                  extraGuestPrice={room.extra_guest_price}
                  itemType="room"
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
