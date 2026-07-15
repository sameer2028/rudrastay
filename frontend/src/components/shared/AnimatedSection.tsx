"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { type ReactNode } from "react";

interface AnimatedSectionProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

const directionVariants = {
  up: { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 } },
  down: { initial: { opacity: 0, y: -40 }, animate: { opacity: 1, y: 0 } },
  left: { initial: { opacity: 0, x: 40 }, animate: { opacity: 1, x: 0 } },
  right: { initial: { opacity: 0, x: -40 }, animate: { opacity: 1, x: 0 } },
};

export default function AnimatedSection({
  children,
  delay = 0,
  direction = "up",
  className = "",
  ...props
}: AnimatedSectionProps) {
  const variants = directionVariants[direction];

  return (
    <motion.div
      initial={variants.initial}
      whileInView={variants.animate}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ 
        willChange: "transform, opacity", 
        backfaceVisibility: "hidden", 
        WebkitBackfaceVisibility: "hidden" 
      }}
      className={`transform-gpu ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
