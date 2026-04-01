import { Hero } from "@/components/sections/Hero";
import { BrandIntro } from "@/components/sections/BrandIntro";
import { FeaturedCategories } from "@/components/sections/FeaturedCategories";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { QuoteCTA } from "@/components/sections/QuoteCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandIntro />
      <FeaturedCategories />
      <WhyChooseUs />
      <QuoteCTA />
    </>
  );
}
