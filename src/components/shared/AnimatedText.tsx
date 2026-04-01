"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import SplitType from "split-type";

interface AnimatedTextProps {
  children: string;
  className?: string;
  type?: "lines" | "words" | "chars";
  delay?: number;
}

export function AnimatedText({
  children,
  className = "",
  type = "words",
  delay = 0,
}: AnimatedTextProps) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const split = new SplitType(textRef.current, {
      types: type,
    });

    const targets = type === "lines" ? split.lines : type === "words" ? split.words : split.chars;

    if (targets && Array.isArray(targets)) {
      // Set initial state
      targets.forEach((target) => {
        const el = target as HTMLElement;
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.display = "inline-block";
        el.style.transition = "opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
      });

      // Trigger animation
      targets.forEach((target, i) => {
        const el = target as HTMLElement;
        setTimeout(() => {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }, delay + i * 50);
      });
    }

    return () => {
      split.revert();
    };
  }, [children, type, delay]);

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  );
}
