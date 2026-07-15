"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SectionHeading from "@/components/shared/SectionHeading";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { useGallery } from "@/hooks/useGallery";

export default function GalleryPreview() {
  const { data: galleryItems } = useGallery();
  const GALLERY_PHOTOS = galleryItems?.filter(item => item.type === "photo") || [];
  const displayPhotos = GALLERY_PHOTOS.slice(0, 5);
  
  const SPANS = [
    "col-span-2 row-span-2",
    "",
    "",
    "col-span-2",
    ""
  ];

  if (!galleryItems || displayPhotos.length === 0) {
    return null; // Do not render if no photos
  }

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
          {displayPhotos.map((item, index) => (
            <AnimatedSection
              key={index}
              delay={index * 0.1}
              className={SPANS[index] || ""}
            >
              <motion.div
                whileHover={{ scale: 0.98 }}
                className="relative rounded-lg overflow-hidden cursor-pointer group h-full min-h-[180px]"
              >
                <img
                  src={item.url}
                  alt={item.caption || ""}
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
