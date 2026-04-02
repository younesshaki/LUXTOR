"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, cubicBezier } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";
import { HeroQuoteForm } from "./HeroQuoteForm";
import { Link } from "@/i18n/navigation";

interface Slide {
  id: number;
  key: "slide1" | "slide2" | "slide3";
  ctaHref: string;
  ctaVariant?: "default" | "red";
  image: string;
  imageAlt: string;
}

const slides: Slide[] = [
  {
    id: 1,
    key: "slide1",
    ctaHref: "/collections",
    image: "/images/3HLinen_Beige_Natural_Pencil_Pleat_Curtains_Unlined.webp",
    imageAlt: "Premium Linen Beige Curtains",
  },
  {
    id: 2,
    key: "slide2",
    ctaHref: "/collections",
    image: "/images/EMILE_0139_WEB.webp",
    imageAlt: "Designer Window Treatment",
  },
  {
    id: 3,
    key: "slide3",
    ctaHref: "/collections",
    image: "/images/rosenmandel-room-darkening-curtains-1-pair-yellow-beige-with-heading-tape__1149270_pe887138_s5.avif",
    imageAlt: "Room Darkening Yellow Beige Curtains",
  },
];

const customEase = cubicBezier(0.25, 0.46, 0.45, 0.94);

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 + i * 0.15,
      duration: 0.6,
      ease: customEase,
    },
  }),
};

export function Hero() {
  const [current, setCurrent] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [paused, setPaused] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("home.hero");

  const slide = slides[current];
  const previousSlide = previous !== null ? slides[previous] : null;

  const transitionTo = useCallback(
    (nextIndex: number, nextDirection: 1 | -1) => {
      if (nextIndex === current) {
        return;
      }

      setPrevious(current);
      setDirection(nextDirection);
      setCurrent(nextIndex);
    },
    [current]
  );

  useEffect(() => {
    if (paused) return;

    const timer = setInterval(() => {
      transitionTo((current + 1) % slides.length, 1);
    }, 6000);

    return () => clearInterval(timer);
  }, [current, paused, transitionTo]);

  const goToSlide = (index: number) => {
    transitionTo(index, index > current ? 1 : -1);
  };

  const goToPrev = () => {
    transitionTo((current - 1 + slides.length) % slides.length, -1);
  };

  const goToNext = () => {
    transitionTo((current + 1) % slides.length, 1);
  };

  return (
    <section
      data-header-theme="dark"
      className="relative min-h-[100svh] flex items-center overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background image carousel with parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {previousSlide ? (
          <motion.div
            key={`previous-${previousSlide.id}`}
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 1.15, ease: "easeInOut" }}
            onAnimationComplete={() => {
              setPrevious((activePrevious) =>
                activePrevious === previous ? null : activePrevious
              );
            }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 z-10 bg-black/28" />
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-brand-black/72 via-brand-black/42 to-brand-black/24" />
            <div className="absolute inset-0">
              <Image
                src={previousSlide.image}
                alt={previousSlide.imageAlt}
                fill
                className="object-cover"
                priority={false}
                sizes="100vw"
                quality={90}
              />
            </div>
          </motion.div>
        ) : null}

        <motion.div
          key={slide.id}
          initial={{ opacity: 0.35, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.15, ease: "easeInOut" }}
          className="absolute inset-0"
          ref={imageRef}
        >
          <div className="absolute inset-0 z-10 bg-black/28" />
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-brand-black/72 via-brand-black/42 to-brand-black/24" />
          <motion.div
            className="absolute inset-0"
            animate={{ y: paused ? 0 : [0, -20, 0] }}
            transition={{
              duration: 6,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          >
            <Image
              src={slide.image}
              alt={slide.imageAlt}
              fill
              className="object-cover"
              priority={current === 0}
              sizes="100vw"
              quality={90}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Main content grid */}
      <Container className="relative z-20 pt-32 pb-20 min-h-[100svh] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-8 lg:gap-12 items-center w-full">
          {/* Left side - carousel content */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ x: direction * 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction * -60, opacity: 0 }}
                transition={{ duration: 0.6, ease: customEase }}
              >
                <motion.p
                  className="text-xs uppercase tracking-[0.3em] text-brand-sand mb-6"
                  custom={0}
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {t(`${slide.key}.label`)}
                </motion.p>

                <motion.h1
                  className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-5xl font-light text-white leading-[1.1] mb-6"
                  custom={1}
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {t(`${slide.key}.heading`)}
                </motion.h1>

                <motion.p
                  className="text-base md:text-lg text-white/70 leading-relaxed max-w-lg mb-10"
                  custom={2}
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {t(`${slide.key}.description`)}
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4"
                  custom={3}
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link
                    href={slide.ctaHref}
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      slide.ctaVariant === "red"
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-brand-bronze hover:bg-brand-bronze/90",
                      "text-white rounded-none uppercase tracking-wider text-xs h-13 px-8 transition-all duration-300 hover:shadow-lg"
                    )}
                  >
                    {t(`${slide.key}.cta`)}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Slide counter */}
            <motion.div
              className="mt-12 text-xs uppercase tracking-[0.2em] text-white/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </motion.div>
          </div>

          {/* Right side - quote form panel (desktop only) */}
          <div className="hidden lg:block">
            <HeroQuoteForm variant="panel" />
          </div>
        </div>
      </Container>

      {/* Navigation controls */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30 flex items-center gap-6 md:gap-8">
        {/* Dot indicators with enhanced animation */}
        <div className="flex gap-4">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={t("goToSlide", { number: index + 1 })}
              className={cn(
                "rounded-full transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-brand-bronze focus-visible:ring-offset-2",
                current === index
                  ? "w-6 h-1 bg-white"
                  : "w-2 h-1 bg-white/40 hover:bg-white/60"
              )}
              whileHover={{ scale: current === index ? 1 : 1.2 }}
              whileTap={{ scale: 0.95 }}
              animate={current === index ? { boxShadow: "0 0 20px rgba(255,255,255,0.4)" } : { boxShadow: "0 0 0px rgba(255,255,255,0)" }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>

        {/* Arrow buttons (mobile hidden) */}
        <div className="hidden sm:flex gap-3">
          <button
            onClick={goToPrev}
            aria-label={t("previousSlide")}
            className="p-2 text-white hover:text-brand-bronze transition-colors focus-visible:ring-2 focus-visible:ring-brand-bronze focus-visible:ring-offset-2 outline-none rounded-sm"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={goToNext}
            aria-label={t("nextSlide")}
            className="p-2 text-white hover:text-brand-bronze transition-colors focus-visible:ring-2 focus-visible:ring-brand-bronze focus-visible:ring-offset-2 outline-none rounded-sm"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-gradient-to-b from-white/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
