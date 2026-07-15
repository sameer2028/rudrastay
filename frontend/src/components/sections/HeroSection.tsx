"use client";

import { motion } from "framer-motion";
import { ChevronDown, Star } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative h-[100svh] min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-resort.png"
          alt="Rudra Stay Resort — Panoramic Mountain View"
          className="w-full h-full object-cover scale-[1.3] md:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center gap-2 sm:gap-3 mb-6"
        >
          <div className="w-8 sm:w-12 h-[1px] bg-gold-light" />
          <span className="text-gold-light text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.4em] whitespace-nowrap">
            Welcome to Rudra Stay
          </span>
          <div className="w-8 sm:w-12 h-[1px] bg-gold-light" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.2] sm:leading-[1.1] mb-6 drop-shadow-lg"
        >
          Experience Luxury in the
          <span className="block text-gold-light mt-2">Heart of Dehradun</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-white/80 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed drop-shadow"
        >
          Nestled amidst the majestic Doon Valley, Rudra Stay offers an
          unparalleled retreat with world-class amenities, breathtaking views,
          and curated experiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full"
        >
          <Link
            href="/rooms"
            className="w-full sm:w-auto px-6 py-3 sm:px-10 sm:py-4 bg-gold text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded hover:bg-gold-dark transition-all duration-300 shadow-gold hover:shadow-xl hover:-translate-y-0.5"
          >
            Explore Our Rooms
          </Link>
          <Link
            href="/packages"
            className="w-full sm:w-auto px-6 py-3 sm:px-10 sm:py-4 bg-white/10 backdrop-blur-sm text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            View Packages
          </Link>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-8 sm:mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-white/70 text-[10px] sm:text-xs"
        >
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-gold text-gold" />
            ))}
            <span className="ml-2">4.9 Rating</span>
          </div>
          <div className="hidden sm:block w-[1px] h-4 bg-white/20" />
          <span>500+ Happy Guests</span>
          <div className="hidden sm:block w-[1px] h-4 bg-white/20" />
          <span className="hidden sm:block">Premium Amenities</span>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-[10px] uppercase tracking-[0.3em]">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-gold-light" />
        </motion.div>
      </motion.div>
    </section>
  );
}
