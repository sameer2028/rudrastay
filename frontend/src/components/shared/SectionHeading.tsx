"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  subtitle?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}

export default function SectionHeading({
  subtitle,
  title,
  description,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={`mb-16 ${align === "center" ? "text-center" : "text-left"}`}
    >
      {subtitle && (
        <span
          className={`inline-block text-xs font-semibold uppercase tracking-[0.3em] mb-3 ${
            light ? "text-gold-light" : "text-gold"
          }`}
        >
          {subtitle}
        </span>
      )}
      <h2
        className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${
          light ? "text-white" : "text-warm-brown"
        }`}
      >
        {title}
      </h2>
      <div
        className={`gold-line mb-6 ${align === "left" ? "!ml-0" : ""}`}
      />
      {description && (
        <p
          className={`max-w-2xl text-base leading-relaxed ${
            align === "center" ? "mx-auto" : ""
          } ${light ? "text-white/70" : "text-brown-light"}`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
