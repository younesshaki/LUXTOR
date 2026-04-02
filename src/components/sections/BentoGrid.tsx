"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, cubicBezier } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

const customEase = cubicBezier(0.25, 0.46, 0.45, 0.94);
const bentoVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.12,
      duration: 0.6,
      ease: customEase,
    },
  }),
};

export function BentoGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("home.bentoGrid");

  return (
    <Section variant="cream">
      <Container>
        <motion.div
          ref={containerRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
        >
          {/* Large craftsmanship tile */}
          <motion.div className="col-span-2 row-span-2" custom={0} variants={bentoVariants}>
            <div className="relative aspect-square md:aspect-auto md:h-[500px] overflow-hidden bg-brand-sand/20 rounded-lg group">
              <Image
                src="/images/accessories/accessory-4.jpg"
                alt={t("craftsmanshipAlt")}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 via-transparent to-transparent flex items-end p-4 md:p-8">
                <h3 className="font-heading text-2xl md:text-3xl text-white">
                  {t("craftsmanshipTitle")}
                </h3>
              </div>
            </div>
          </motion.div>

          {/* Stat: 15+ years */}
          <motion.div className="col-span-1" custom={1} variants={bentoVariants}>
            <div className="bg-white rounded-lg p-6 md:p-8 h-full flex flex-col justify-center items-center text-center shadow-sm hover:shadow-md transition-shadow duration-300">
              <motion.p
                className="text-4xl md:text-5xl font-heading text-brand-bronze mb-2"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                viewport={{ once: true }}
              >
                {t("yearsValue")}
              </motion.p>
              <p className="text-sm md:text-base text-brand-charcoal/70">
                {t("yearsLabel")}
              </p>
            </div>
          </motion.div>

          {/* Stat: 2K+ homes */}
          <motion.div className="col-span-1" custom={2} variants={bentoVariants}>
            <div className="bg-white rounded-lg p-6 md:p-8 h-full flex flex-col justify-center items-center text-center shadow-sm hover:shadow-md transition-shadow duration-300">
              <motion.p
                className="text-4xl md:text-5xl font-heading text-brand-bronze mb-2"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
              >
                {t("homesValue")}
              </motion.p>
              <p className="text-sm md:text-base text-brand-charcoal/70">
                {t("homesLabel")}
              </p>
            </div>
          </motion.div>

          {/* Made to Measure tile */}
          <motion.div className="col-span-2" custom={3} variants={bentoVariants}>
            <div className="bg-brand-charcoal rounded-lg p-6 md:p-8 h-full flex flex-col justify-between text-white hover:shadow-lg transition-shadow duration-300">
              <div>
                <h3 className="font-heading text-2xl md:text-3xl mb-3">
                  {t("madeToMeasureTitle")}
                </h3>
                <p className="text-white/70 text-sm md:text-base mb-6">
                  {t("madeToMeasureDescription")}
                </p>
              </div>
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 text-brand-sand hover:text-brand-bronze transition-colors text-sm font-medium group"
              >
                {t("getYourQuote")}
                <motion.span
                  className="inline-block"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.span>
              </Link>
            </div>
          </motion.div>

          {/* Wide quote tile */}
          <motion.div className="col-span-2" custom={4} variants={bentoVariants}>
            <div className="bg-white rounded-lg p-6 md:p-8 border-l-4 border-brand-bronze shadow-sm hover:shadow-md transition-shadow duration-300">
              <p className="font-heading text-lg md:text-xl text-brand-charcoal mb-4 italic">
                {t("testimonialQuote")}
              </p>
              <p className="text-sm text-brand-charcoal/60 font-medium">
                {t("testimonialAuthor")}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
