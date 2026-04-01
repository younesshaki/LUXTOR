"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { navLinks, contactInfo } from "@/data/navigation";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { buttonVariants } from "@/components/ui/button";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      {/* Top bar */}
      <div
        className={cn(
          "border-b border-brand-sand/30 transition-all duration-300 overflow-hidden",
          scrolled ? "max-h-0 opacity-0" : "max-h-10 opacity-100"
        )}
      >
        <Container className="flex items-center justify-between py-2 text-xs tracking-wide text-brand-charcoal-light">
          <span className="hidden sm:inline">{contactInfo.hours}</span>
          <a
            href={`tel:${contactInfo.phone}`}
            className="flex items-center gap-1.5 hover:text-brand-bronze transition-colors ml-auto"
          >
            <Phone className="h-3 w-3" />
            {contactInfo.phone}
          </a>
        </Container>
      </div>

      {/* Main nav */}
      <Container className="flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href="/" className="relative z-10">
          <span className="font-heading text-2xl md:text-3xl tracking-[0.2em] font-light text-brand-black">
            LUXTOR
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm tracking-wide uppercase transition-colors duration-200 hover:text-brand-bronze",
                pathname === link.href
                  ? "text-brand-bronze"
                  : "text-brand-charcoal"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/quote"
            className={cn(
              buttonVariants({ variant: "default", size: "sm" }),
              "bg-brand-bronze hover:bg-brand-bronze/90 text-white tracking-wide uppercase text-xs rounded-none px-6 h-10"
            )}
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="md:hidden relative z-10 p-2 text-brand-charcoal">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Open menu</span>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:w-80 bg-white pt-16">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "px-4 py-3 text-lg tracking-wide font-heading transition-colors",
                    pathname === link.href
                      ? "text-brand-bronze bg-brand-cream"
                      : "text-brand-charcoal hover:text-brand-bronze hover:bg-brand-cream/50"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-6 px-4">
                <Link
                  href="/quote"
                  onClick={() => setOpen(false)}
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "w-full bg-brand-bronze hover:bg-brand-bronze/90 text-white tracking-wide uppercase text-sm rounded-none h-12"
                  )}
                >
                  Request a Quote
                </Link>
              </div>
              <div className="mt-8 px-4 pt-6 border-t border-brand-sand/30">
                <p className="text-xs text-muted-foreground mb-1">{contactInfo.hours}</p>
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="text-sm text-brand-bronze font-medium"
                >
                  {contactInfo.phone}
                </a>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </Container>
    </header>
  );
}
