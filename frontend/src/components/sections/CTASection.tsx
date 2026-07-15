"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone, MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export default function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/images/gallery/gallery-14.jpeg"
          alt="Night Sky View from Rudra Stay"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-luxury text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-gold-light text-xs font-semibold uppercase tracking-[0.3em] mb-4 block">
            Start Your Journey
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Ready to Experience <br />
            <span className="text-gold-light">Mountain Luxury?</span>
          </h2>
          <p className="text-white/60 max-w-xl mx-auto mb-10 text-base leading-relaxed">
            Book your stay today and discover the perfect blend of luxury,
            nature, and warmth. Our team is ready to create an unforgettable
            experience for you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/rooms"
              className="px-10 py-4 bg-gold text-white text-sm font-semibold uppercase tracking-wider rounded hover:bg-gold-dark transition-all duration-300 shadow-gold"
            >
              Book Your Stay
              <ArrowRight className="w-4 h-4 inline-block ml-2" />
            </Link>

            <a
              href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 bg-green-600 text-white text-sm font-semibold uppercase tracking-wider rounded hover:bg-green-700 transition-all duration-300"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us
            </a>

            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="flex items-center gap-2 px-8 py-4 border border-white/20 text-white text-sm font-semibold uppercase tracking-wider rounded hover:bg-white/10 transition-all duration-300"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
