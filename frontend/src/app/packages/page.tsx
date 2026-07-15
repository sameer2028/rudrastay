"use client";

import type { Metadata } from "next";
import Link from "next/link";
import { Clock, ArrowRight, CheckCircle } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import AnimatedSection from "@/components/shared/AnimatedSection";
import CTASection from "@/components/sections/CTASection";
import { formatPrice } from "@/lib/utils";
import { usePackages } from "@/hooks/usePackages";
import { Loader2 } from "lucide-react";

export default function PackagesPage() {
  const { data: packages, isLoading, error } = usePackages();
  return (
    <>
      <section className="relative pt-32 pb-16 bg-beige">
        <div className="container-luxury text-center">
          <AnimatedSection>
            <span className="text-gold text-xs font-semibold uppercase tracking-[0.3em] mb-4 block">
              Curated Experiences
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-warm-brown mb-4">
              Tour Packages
            </h1>
            <p className="text-brown-light max-w-2xl mx-auto">
              Hand-picked travel packages designed to showcase the best of Dehradun with the comfort of Rudra Stay.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-luxury">
          <div className="space-y-12">
            {isLoading && (
              <div className="flex justify-center py-20">
                <Loader2 className="w-10 h-10 animate-spin text-gold" />
              </div>
            )}
            {error && (
              <div className="text-center text-red-500 py-20">
                Failed to load packages. Please try again later.
              </div>
            )}
            {packages?.map((pkg, index) => (
              <AnimatedSection key={pkg.slug} delay={index * 0.1}>
                <div className="card-luxury overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="relative h-72 lg:h-auto">
                      <img
                        src={pkg.images?.[0] || "/images/placeholder.jpg"}
                        alt={pkg.name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full flex items-center gap-1.5 shadow-sm">
                        <Clock className="w-3.5 h-3.5 text-gold" />
                        <span className="text-xs font-medium text-warm-brown">
                          {pkg.duration_days} Days / {pkg.duration_days - 1} Nights
                        </span>
                      </div>
                    </div>

                    <div className="p-8 lg:p-10 flex flex-col justify-between">
                      <div>
                        <h2 className="font-display text-2xl font-bold text-warm-brown mb-3">
                          {pkg.name}
                        </h2>
                        <p className="text-sm text-brown-light leading-relaxed mb-6">
                          {pkg.description}
                        </p>

                        <h4 className="text-xs font-semibold uppercase tracking-wider text-gold mb-3">
                          What's Included
                        </h4>
                        <div className="grid grid-cols-2 gap-2 mb-6">
                          {pkg.inclusions?.map((item) => (
                            <div key={item} className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-success shrink-0" />
                              <span className="text-sm text-brown-light">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-6 border-t border-gold-light/20">
                        <div>
                          <span className="text-xs text-brown-muted">Starting from</span>
                          <div className="flex items-baseline gap-1">
                            <span className="font-price text-2xl font-bold text-warm-brown">
                              {formatPrice(pkg.price)}
                            </span>
                            <span className="text-xs text-brown-muted">/person</span>
                          </div>
                        </div>
                        <Link
                          href={`/packages/${pkg.slug}`}
                          className="btn-primary text-sm"
                        >
                          View Details
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
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
