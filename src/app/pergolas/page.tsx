import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { QuoteCTA } from "@/components/sections/QuoteCTA";

export const metadata: Metadata = {
  title: "Designer Pergolas",
  description:
    "Luxury bioclimatic and traditional pergolas from LUXTOR. Create your perfect outdoor sanctuary with motorized louvre systems and premium design.",
};

export default function PergolaPage() {
  return (
    <>
      {/* Page header */}
      <Section className="pt-36 md:pt-44 pb-12 md:pb-16" variant="cream">
        <Container>
          <SectionHeading
            label="Outdoor Living"
            title="Designer Pergolas"
            description="Discover our collection of bioclimatic and traditional pergolas. Motorized louvre systems for perfect light and temperature control."
          />
        </Container>
      </Section>

      {/* Placeholder for pergolas grid */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[3/4] rounded-sm bg-brand-cream/50 border border-brand-sand/20 flex items-center justify-center"
              >
                <p className="text-sm text-muted-foreground">Pergola {i + 1}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <QuoteCTA />
    </>
  );
}
