"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden">
      {/* Background image placeholder */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black/70 via-brand-black/40 to-transparent z-10" />
        <Image
          src="/images/hero.svg"
          alt="Luxurious interior with elegant curtains"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={90}
        />
      </div>

      <Container className="relative z-20 pt-32 pb-20">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs uppercase tracking-[0.3em] text-brand-sand mb-6"
          >
            Premium Home Decor
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.1] mb-6"
          >
            Elegance
            <br />
            <span className="text-brand-sand">Woven Into</span>
            <br />
            Every Thread
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-base md:text-lg text-white/70 leading-relaxed max-w-lg mb-10"
          >
            Discover bespoke curtains, blinds, and home decor crafted to
            transform your space into a sanctuary of refined comfort.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/collections"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-brand-bronze hover:bg-brand-bronze/90 text-white rounded-none uppercase tracking-wider text-xs h-13 px-8"
              )}
            >
              Explore Collections
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/quote"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "border-white/30 text-white hover:bg-white/10 rounded-none uppercase tracking-wider text-xs h-13 px-8 bg-transparent"
              )}
            >
              Request a Quote
            </Link>
          </motion.div>
        </div>
      </Container>

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
