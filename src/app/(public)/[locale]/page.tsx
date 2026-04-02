import { Hero } from "@/components/sections/Hero";
import { HeroQuoteForm } from "@/components/sections/HeroQuoteForm";
import { BrandIntro } from "@/components/sections/BrandIntro";
import { FeaturedCategories } from "@/components/sections/FeaturedCategories";
import { BentoGrid } from "@/components/sections/BentoGrid";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { QuoteCTA } from "@/components/sections/QuoteCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="lg:hidden">
        <HeroQuoteForm />
      </div>
      <BrandIntro />
      <FeaturedCategories />
      <BentoGrid />
      <WhyChooseUs />
      <QuoteCTA />
    </>
  );
}
