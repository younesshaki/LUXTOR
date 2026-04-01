import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { QuoteCTA } from "@/components/sections/QuoteCTA";

export const metadata: Metadata = {
  title: "Home Accessories",
  description:
    "Premium accessories for your window treatments and home decor. Hardware, fabrics, tiebacks, and more from LUXTOR.",
};

export default function AccessoriesPage() {
  return (
    <>
      {/* Page header */}
      <Section className="pt-36 md:pt-44 pb-12 md:pb-16" variant="cream">
        <Container>
          <SectionHeading
            label="Complete Your Design"
            title="Home Accessories"
            description="Explore our curated selection of premium accessories including hardware, tracks, tiebacks, and specialty fabrics to complete your interior vision."
          />
        </Container>
      </Section>

      {/* Placeholder for accessories grid */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[3/4] rounded-sm bg-brand-cream/50 border border-brand-sand/20 flex items-center justify-center"
              >
                <p className="text-sm text-muted-foreground">Accessory {i + 1}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <QuoteCTA />
    </>
  );
}
