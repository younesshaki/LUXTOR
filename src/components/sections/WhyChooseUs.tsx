"use client";

import { motion } from "framer-motion";
import { Ruler, Gem, Wrench, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FadeInStagger, staggerItem } from "@/components/shared/MotionWrapper";
import { whyChooseUsKeys } from "@/data/categories";

const icons = [Ruler, Gem, Wrench, MessageCircle];

export function WhyChooseUs() {
  const t = useTranslations();

  return (
    <Section>
      <Container>
        <SectionHeading
          label={t("home.whyChooseUs.label")}
          title={t("home.whyChooseUs.title")}
          description={t("home.whyChooseUs.description")}
        />

        <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {whyChooseUsKeys.map((item, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={item.titleKey}
                variants={staggerItem}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand-cream border border-brand-sand/30 mb-6 group-hover:bg-brand-sand/30 transition-colors duration-300">
                  <Icon className="h-6 w-6 text-brand-bronze" strokeWidth={1.5} />
                </div>
                <h3 className="font-heading text-xl md:text-2xl text-brand-black mb-3">
                  {t(item.titleKey)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(item.descriptionKey)}
                </p>
              </motion.div>
            );
          })}
        </FadeInStagger>
      </Container>
    </Section>
  );
}
