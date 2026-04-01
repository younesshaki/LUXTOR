import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { QuoteCTA } from "@/components/sections/QuoteCTA";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about LUXTOR's story, our commitment to craftsmanship, and our passion for transforming spaces with premium home decor.",
};

export default function AboutPage() {
  return (
    <>
      {/* Page header */}
      <Section className="pt-36 md:pt-44 pb-12 md:pb-16" variant="cream">
        <Container>
          <SectionHeading
            label="About LUXTOR"
            title="Crafting Elegance Since Day One"
            description="We started with a simple belief: everyone deserves a beautiful home. Today, we've grown into a trusted name in premium home decor, serving thousands of homes with bespoke solutions."
          />
        </Container>
      </Section>

      {/* Our values */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Quality First",
                text: "We never compromise on materials. Every fabric, every mechanism, every finish is chosen for its durability and beauty.",
              },
              {
                title: "Design-Led",
                text: "Our in-house design team stays ahead of trends while respecting timeless aesthetics that will look beautiful for years.",
              },
              {
                title: "Client-Focused",
                text: "Your satisfaction drives everything we do. From first consultation to final installation, we're with you every step.",
              },
            ].map((item) => (
              <div key={item.title}>
                <h3 className="font-heading text-2xl text-brand-black mb-4">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <QuoteCTA />
    </>
  );
}
