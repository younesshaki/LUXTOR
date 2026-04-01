"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { FadeIn } from "@/components/shared/MotionWrapper";

export function BrandIntro() {
  return (
    <Section>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image side */}
          <FadeIn>
            <div className="relative aspect-[4/5] bg-brand-cream rounded-sm overflow-hidden">
              <Image
                src="/images/inspiration/inspiration-5.jpg"
                alt="Curated fabric selection at LUXTOR showroom"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Decorative accent */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-brand-sand/40 rounded-sm hidden lg:block" />
            </div>
          </FadeIn>

          {/* Text side */}
          <div>
            <FadeIn delay={0.1}>
              <p className="text-xs uppercase tracking-[0.25em] text-brand-bronze mb-4">
                Our Story
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-light text-brand-black leading-tight mb-6">
                Where Craftsmanship
                <br />
                Meets Design
              </h2>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  At LUXTOR, we believe your home deserves more than ordinary. Every
                  curtain, every blind, every piece of decor is selected and crafted
                  with an unwavering commitment to quality and aesthetics.
                </p>
                <p>
                  Our team of designers works closely with you to understand your
                  vision, offering personalized consultations that ensure every detail
                  reflects your unique style and space.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="mt-8 flex gap-12">
                <motion.div>
                  <p className="font-heading text-4xl text-brand-bronze">15+</p>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">
                    Years Experience
                  </p>
                </motion.div>
                <motion.div>
                  <p className="font-heading text-4xl text-brand-bronze">2K+</p>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">
                    Homes Styled
                  </p>
                </motion.div>
                <motion.div>
                  <p className="font-heading text-4xl text-brand-bronze">100%</p>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">
                    Custom Made
                  </p>
                </motion.div>
              </div>
            </FadeIn>
          </div>
        </div>
      </Container>
    </Section>
  );
}
