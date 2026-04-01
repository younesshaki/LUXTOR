import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Explore LUXTOR's curated collections of premium curtains, blinds, sheers, and home decor accessories.",
};

export default function CollectionsPage() {
  return (
    <>
      {/* Page header */}
      <Section className="pt-36 md:pt-44 pb-12 md:pb-16" variant="cream">
        <Container>
          <SectionHeading
            label="Our Collections"
            title="Curated With Care"
            description="Browse our range of premium window treatments and home decor, each collection thoughtfully designed to suit different styles and spaces."
          />
        </Container>
      </Section>

      {/* Placeholder for collection grid */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[3/4] rounded-sm bg-brand-cream/50 border border-brand-sand/20 flex items-center justify-center"
              >
                <p className="text-sm text-muted-foreground">Collection {i + 1}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
