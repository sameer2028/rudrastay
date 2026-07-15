"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Leaf, Shield, Heart, Mountain } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import AnimatedSection from "@/components/shared/AnimatedSection";

const REASONS = [
  {
    icon: Mountain,
    title: "Stunning Location",
    description:
      "Perched in the heart of Dehradun with panoramic Dehradun views that take your breath away every morning.",
  },
  {
    icon: Shield,
    title: "Trust & Safety",
    description:
      "100% verified property with round-the-clock security, ensuring a safe and comfortable stay for you and your family.",
  },
  {
    icon: Heart,
    title: "Personalized Service",
    description:
      "Our dedicated team crafts bespoke experiences — from custom itineraries to special occasion celebrations.",
  },
  {
    icon: Leaf,
    title: "Eco-Luxury",
    description:
      "We blend luxury with sustainability, using local materials and eco-friendly practices to protect the mountains we love.",
  },
];

export default function AboutPreview() {
  return (
    <section className="section-padding bg-beige">
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <AnimatedSection direction="left">
            <div className="relative">
              <div className="relative rounded-lg overflow-hidden shadow-xl">
                <img
                  src="/images/gallery/gallery-29.jpeg"
                  alt="Rudra Stay property view"
                  className="w-full h-auto max-h-[500px] object-contain"
                />
              </div>
              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="absolute -bottom-6 -right-6 bg-white rounded-lg p-6 shadow-lg max-w-[200px]"
              >
                <p className="font-price text-3xl font-bold text-gold mb-1">2+</p>
                <p className="text-sm text-brown-light">
                  Years of Hospitality Excellence
                </p>
              </motion.div>
            </div>
          </AnimatedSection>

          {/* Content Side */}
          <div>
            <SectionHeading
              subtitle="About Us"
              title="A Sanctuary in the Mountains"
              description="Rudra Stay is more than a hotel — it's a gateway to the majestic Doon Valley. Founded with a vision to offer authentic luxury amidst nature, we create moments that become lifelong memories."
              align="left"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {REASONS.map((reason, index) => (
                <AnimatedSection key={reason.title} delay={index * 0.1}>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                      <reason.icon className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h4 className="font-display text-base font-semibold text-warm-brown mb-1">
                        {reason.title}
                      </h4>
                      <p className="text-xs text-brown-light leading-relaxed">
                        {reason.description}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            <Link href="/about" className="btn-primary">
              Our Story
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
