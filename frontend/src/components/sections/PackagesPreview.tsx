"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, ArrowRight, IndianRupee } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { formatPrice } from "@/lib/utils";
import { useFeaturedPackages } from "@/hooks/usePackages";
import { Loader2 } from "lucide-react";

export default function PackagesPreview() {
  const { data: packages, isLoading, error } = useFeaturedPackages();
  return (
    <section className="section-padding bg-white">
      <div className="container-luxury">
        <SectionHeading
          subtitle="Curated Experiences"
          title="Tour Packages"
          description="Hand-picked travel packages that combine the best of Uttarakhand with the comfort and luxury of Rudra Stay."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {isLoading && (
            <div className="col-span-full flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-gold" />
            </div>
          )}
          {error && (
            <div className="col-span-full text-center text-red-500 py-12">
              Failed to load packages. Please try again later.
            </div>
          )}
          {packages?.map((pkg, index) => (
            <AnimatedSection key={pkg.slug} delay={index * 0.15}>
              <Link href={`/packages/${pkg.slug}`} className="block group">
                <div className="card-luxury">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={pkg.images?.[0] || "/images/placeholder.jpg"}
                      alt={pkg.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full flex items-center gap-1.5 shadow-sm">
                      <Clock className="w-3.5 h-3.5 text-gold" />
                      <span className="text-xs font-medium text-warm-brown">
                        {pkg.duration_days} Days
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-display text-lg font-semibold text-warm-brown mb-2 group-hover:text-gold transition-colors">
                      {pkg.name}
                    </h3>
                    <p className="text-sm text-brown-light leading-relaxed mb-4 line-clamp-2">
                      {pkg.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gold-light/20">
                      <div className="flex items-baseline gap-1">
                        <span className="font-price text-xl font-bold text-warm-brown">
                          {formatPrice(pkg.price)}
                        </span>
                        <span className="text-xs text-brown-muted">/person</span>
                      </div>
                      <span className="flex items-center gap-1 text-gold text-sm font-medium group-hover:gap-2 transition-all">
                        Details <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/packages" className="btn-secondary">
            View All Packages
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
