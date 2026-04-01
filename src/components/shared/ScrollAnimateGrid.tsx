"use client";

import { useRef } from "react";
import { motion, cubicBezier } from "framer-motion";
import { ReactNode } from "react";

interface ScrollAnimateGridProps {
  children: ReactNode[];
  className?: string;
  staggerDelay?: number;
}

const customEase = cubicBezier(0.25, 0.46, 0.45, 0.94);

export function ScrollAnimateGrid({
  children,
  className = "",
  staggerDelay = 0.1,
}: ScrollAnimateGridProps) {
  const ref = useRef<HTMLDivElement>(null);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: customEase,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={container}
    >
      {Array.isArray(children) &&
        children.map((child, index) => (
          <motion.div key={index} variants={item}>
            {child}
          </motion.div>
        ))}
    </motion.div>
  );
}
