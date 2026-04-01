import { useScroll, useTransform, cubicBezier } from "framer-motion";
import { RefObject } from "react";

const customEase = cubicBezier(0.25, 0.46, 0.45, 0.94);

export function useScrollParallax(
  ref: RefObject<HTMLElement>,
  offset: number = 30
) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  return y;
}

export function useScrollReveal(ref: RefObject<HTMLElement>) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.25"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return { opacity, y };
}

export function useScrollScale(ref: RefObject<HTMLElement>) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "start 0.2"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return { scale, opacity };
}

export const slideInVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: customEase,
    },
  }),
};

export const textRevealVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.5,
      ease: customEase,
    },
  }),
};

export const fadeInScaleVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.12,
      duration: 0.5,
      ease: customEase,
    },
  }),
};
