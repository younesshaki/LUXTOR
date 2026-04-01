"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { FadeIn } from "@/components/shared/MotionWrapper";

export function QuoteCTA() {
  return (
    <Section variant="dark" className="relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-brand-bronze/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-bronze/5 rounded-full translate-x-1/3 translate-y-1/3" />

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.25em] text-brand-sand mb-4">
              Start Your Project
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight mb-6">
              Let&apos;s Create Something
              <br />
              <span className="text-brand-sand">Beautiful Together</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-base md:text-lg text-white/60 leading-relaxed max-w-xl mx-auto mb-10">
              Book a free consultation with our design experts. We&apos;ll visit your
              space, understand your vision, and craft a personalized solution just for
              you.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/quote"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-brand-bronze hover:bg-brand-bronze/90 text-white rounded-none uppercase tracking-wider text-xs h-13 px-10"
                )}
              >
                Request a Free Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "border-white/20 text-white hover:bg-white/10 rounded-none uppercase tracking-wider text-xs h-13 px-10 bg-transparent"
                )}
              >
                Contact Us
              </Link>
            </div>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}
