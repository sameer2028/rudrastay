"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SectionHeading from "@/components/shared/SectionHeading";
import AnimatedSection from "@/components/shared/AnimatedSection";

const GLIMPSE_PHOTOS = [
  { url: "/glimpse/20260702_200924.jpg.jpeg", caption: "Luxury Exterior" },
  { url: "/glimpse/3858.jpeg", caption: "Cozy Interiors" },
  { url: "/glimpse/WA_1781112829877.jpeg", caption: "Premium Views" },
  { url: "/glimpse/WA_1781112940256.jpeg", caption: "World-Class Amenities" },
];

export default function GalleryPreview() {
  return (
    <section className="section-padding bg-charcoal">
      <div className="container-luxury">
        <SectionHeading
          subtitle="Gallery"
          title="Glimpses of Paradise"
          description="Take a visual journey through our property, rooms, and the breathtaking landscapes that surround Rudra Stay."
          light
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {GLIMPSE_PHOTOS.map((item, index) => (
            <AnimatedSection
              key={index}
              delay={index * 0.1}
            >
              <motion.div
                whileHover={{ scale: 0.98 }}
                className="relative rounded-lg overflow-hidden cursor-pointer group aspect-square"
              >
                <img
                  src={item.url}
                  alt={item.caption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-all duration-300 flex items-end">
                  <p className="p-4 text-white text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    {item.caption}
                  </p>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-8 py-3 border border-gold-light/30 text-gold-light text-sm font-medium uppercase tracking-wider rounded hover:bg-gold-light/10 transition-all duration-300"
          >
            View Full Gallery
          </Link>
        </div>
      </div>
    </section>
  );
}
