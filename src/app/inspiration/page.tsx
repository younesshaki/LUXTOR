import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { QuoteCTA } from "@/components/sections/QuoteCTA";

export const metadata: Metadata = {
  title: "Inspiration",
  description:
    "Find your style with LUXTOR's inspiration gallery. Room designs, color guides, and trend tips for your perfect interior.",
};

export default function InspirationPage() {
  return (
    <>
      {/* Page header */}
      <Section className="pt-36 md:pt-44 pb-12 md:pb-16" variant="cream">
        <Container>
          <SectionHeading
            label="Design Ideas"
            title="Find Your Style"
            description="Explore real rooms transformed by LUXTOR. Get inspired by our curated galleries, color guides, and seasonal trends."
          />
        </Container>
      </Section>

      {/* Placeholder for inspiration gallery */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[3/4] rounded-sm bg-brand-cream/50 border border-brand-sand/20 flex items-center justify-center"
              >
                <p className="text-sm text-muted-foreground">Room {i + 1}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <QuoteCTA />
    </>
  );
}
