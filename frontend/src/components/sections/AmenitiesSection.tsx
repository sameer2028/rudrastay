"use client";

import { motion } from "framer-motion";
import {
  Tv, Wifi, BedDouble, Bed, Bath, ChefHat, 
  UtensilsCrossed, Utensils, Mountain, Trees, Car, 
  Sofa, Droplet, GlassWater, Flame, FlameKindling
} from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import AnimatedSection from "@/components/shared/AnimatedSection";

const AMENITIES = [
  { icon: Tv, label: "T.V." },
  { icon: Wifi, label: "Wi-Fi" },
  { icon: BedDouble, label: "2 Bedrooms" },
  { icon: Bed, label: "3 Beds" },
  { icon: Bath, label: "2 Attached Washrooms" },
  { icon: ChefHat, label: "Kitchen" },
  { icon: UtensilsCrossed, label: "Cutlery" },
  { icon: Utensils, label: "Cooking Utensils" },
  { icon: Mountain, label: "Mountain View" },
  { icon: Trees, label: "Valley View" },
  { icon: Car, label: "Free Roof/Open Parking" },
  { icon: Sofa, label: "9 Seater Sofa" },
  { icon: Droplet, label: "24/7 Water" },
  { icon: GlassWater, label: "Reverse Osmosis System" },
  { icon: Flame, label: "Hot Water" },
  { icon: FlameKindling, label: "Chargeable Gas Services" },
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
