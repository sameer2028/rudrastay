"use client";

import { motion } from "framer-motion";
import {
  Wifi, Snowflake, Car, UtensilsCrossed, Waves, Dumbbell,
  Tv, Flame, Mountain, DoorOpen, Sparkles, ConciergeBell,
} from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import AnimatedSection from "@/components/shared/AnimatedSection";

const AMENITIES = [
  { icon: Wifi, label: "High-Speed Wi-Fi" },
  { icon: Snowflake, label: "Air Conditioning" },
  { icon: Car, label: "Free Parking" },
  { icon: UtensilsCrossed, label: "Restaurant" },
  { icon: Sparkles, label: "Spa & Wellness" },
  { icon: Waves, label: "Swimming Pool" },
  { icon: Dumbbell, label: "Fitness Center" },
  { icon: ConciergeBell, label: "24/7 Room Service" },
  { icon: Tv, label: "Smart TV" },
  { icon: Flame, label: "Hot Water" },
  { icon: Mountain, label: "Mountain Views" },
  { icon: DoorOpen, label: "Private Balcony" },
];

export default function AmenitiesSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-luxury">
        <SectionHeading
          subtitle="Amenities"
          title="Everything You Need"
          description="From world-class facilities to thoughtful touches, every detail at Rudra Stay is designed for your comfort and delight."
        />

        <AnimatedSection delay={0.2}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {AMENITIES.map((amenity) => (
              <div
                key={amenity.label}
                className="flex flex-col items-center text-center p-4 sm:p-6 rounded-xl border border-gold-light/20 bg-cream/40 hover:bg-gold/5 hover:border-gold/30 hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 cursor-default shadow-sm will-change-transform"
              >
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-3">
                  <amenity.icon className="w-5 h-5 text-gold" />
                </div>
                <span className="text-[11px] sm:text-xs font-medium text-warm-brown leading-tight">
                  {amenity.label}
                </span>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
