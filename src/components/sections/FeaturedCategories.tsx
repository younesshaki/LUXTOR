"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { featuredCategories } from "@/data/categories";
import { slideInVariants } from "@/lib/animations";

export function FeaturedCategories() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <Section variant="cream">
      <Container>
        <SectionHeading
          label="Collections"
          title="Curated for Your Home"
          description="Explore our carefully selected collections, each designed to bring a unique character to your living spaces."
        />

        <motion.div
          ref={containerRef}
          className="grid grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.08,
                delayChildren: 0.05,
              },
            },
          }}
        >
          {featuredCategories.map((cat, i) => (
            <motion.div key={cat.title} custom={i} variants={slideInVariants}>
              <Link href={cat.href} className="group block">
                <motion.div className="relative aspect-[3/4] overflow-hidden bg-brand-sand/20 rounded-sm mb-5">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <motion.div className="absolute bottom-4 right-4 bg-white/90 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <ArrowUpRight className="h-4 w-4 text-brand-black" />
                  </motion.div>
                </motion.div>
                <h3 className="font-heading text-xl md:text-2xl text-brand-black mb-1">
                  {cat.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {cat.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
