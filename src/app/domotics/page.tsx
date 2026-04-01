import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { QuoteCTA } from "@/components/sections/QuoteCTA";

export const metadata: Metadata = {
  title: "Smart Home Control",
  description:
    "Smart home automation systems from LUXTOR. Control your blinds, curtains, awnings and pergolas with motorized motors and voice integration.",
};

export default function DomoticsPage() {
  return (
    <>
      {/* Page header */}
      <Section className="pt-36 md:pt-44 pb-12 md:pb-16" variant="cream">
        <Container>
          <SectionHeading
            label="Connected Living"
            title="Smart Home Control"
            description="Bring your home into the future with our smart automation systems. Control all your window treatments and outdoor features from your phone or voice command."
          />
        </Container>
      </Section>

      {/* Placeholder for domotics grid */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[3/4] rounded-sm bg-brand-cream/50 border border-brand-sand/20 flex items-center justify-center"
              >
                <p className="text-sm text-muted-foreground">System {i + 1}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <QuoteCTA />
    </>
  );
}
