"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Menu, X, Phone, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { navItems, contactInfo } from "@/data/navigation";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { buttonVariants } from "@/components/ui/button";

const HEADER_ZONE_HEIGHT = 120;

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [hasDarkSection, setHasDarkSection] = useState(false);
  const isDark = pathname === "/" || hasDarkSection;
  const accountHref = status === "authenticated" ? "/account" : "/account/login";
  const accountLabel = status === "authenticated" ? "My Account" : "Sign in";
  const isAdmin = session?.user?.role === "admin";

  useEffect(() => {
    const intersecting = new Set<Element>();
    const rootMarginBottom = Math.max(0, window.innerHeight - HEADER_ZONE_HEIGHT);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            intersecting.add(entry.target);
          } else {
            intersecting.delete(entry.target);
          }
        });
        setHasDarkSection(intersecting.size > 0);
      },
      { rootMargin: `0px 0px -${rootMarginBottom}px 0px`, threshold: 0 }
    );

    document.querySelectorAll('[data-header-theme="dark"]').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
      intersecting.clear();
      setHasDarkSection(false);
    };
  }, [pathname]);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 bg-white/5 backdrop-blur-sm border-b transition-colors duration-300",
      isDark ? "border-white/10" : "border-brand-sand/30"
    )}>

      {/* Top bar */}
      <div className={cn(
        "border-b overflow-hidden max-h-10 opacity-100 transition-colors duration-300",
        isDark ? "border-white/10" : "border-brand-sand/30"
      )}>
        <Container className={cn(
          "flex items-center justify-between py-2 text-xs tracking-wide transition-colors duration-300",
          isDark ? "text-white/60" : "text-brand-charcoal-light"
        )}>
          <span className="hidden sm:inline">{contactInfo.hours}</span>
          <div className="ml-auto flex items-center gap-4 sm:gap-5">
            {isAdmin ? (
              <Link href="/admin">
                <span className="bg-red-600 text-white text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded">
                  Dashboard
                </span>
              </Link>
            ) : null}
            <Link
              href={accountHref}
              className={cn(
                "inline-flex items-center gap-1.5 transition-colors",
                isDark ? "hover:text-brand-bronze" : "hover:text-brand-bronze"
              )}
            >
              <User className="h-3 w-3" />
              {accountLabel}
            </Link>
            <a
              href={`tel:${contactInfo.phone}`}
              className={cn(
                "flex items-center gap-1.5 transition-colors",
                isDark ? "hover:text-brand-bronze" : "hover:text-brand-bronze"
              )}
            >
              <Phone className="h-3 w-3" />
              {contactInfo.phone}
            </a>
          </div>
        </Container>
      </div>

      {/* Main nav */}
      <Container className="flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href="/" className="relative z-10">
          <span
            style={{ fontFamily: "var(--font-playfair)" }}
            className={cn(
              "text-2xl md:text-3xl font-bold tracking-wide transition-colors duration-300",
              isDark ? "text-white" : "text-brand-charcoal"
            )}
          >
            LUXTOR
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 relative">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "text-sm tracking-wide uppercase transition-colors duration-200 px-4 py-2 hover:text-brand-bronze min-h-[44px] inline-flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-brand-bronze focus-visible:ring-offset-2 outline-none rounded-sm font-semibold",
                pathname === item.href
                  ? "text-brand-bronze"
                  : isDark
                    ? "text-white"
                    : "text-brand-charcoal"
              )}
            >
              {item.label}
              {item.badge && (
                <span className="bg-red-600 text-white text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded">
                  {item.badge}
                </span>
              )}
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
          <SheetTrigger className={cn(
            "md:hidden relative z-10 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-brand-bronze focus-visible:ring-offset-2 outline-none transition-colors duration-300",
            isDark ? "text-white" : "text-brand-charcoal"
          )}>
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Open menu</span>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:w-80 bg-white pt-16">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "px-4 py-3 text-lg tracking-wide font-heading transition-colors min-h-[44px] flex items-center gap-2 rounded-sm font-semibold",
                    pathname === item.href
                      ? "text-brand-bronze bg-brand-cream"
                      : "text-brand-charcoal hover:text-brand-bronze hover:bg-brand-cream/50"
                  )}
                >
                  {item.label}
                  {item.badge && (
                    <span className="bg-red-600 text-white text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded">
                      {item.badge}
                    </span>
                  )}
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
              <div className="mt-4 px-4">
                <Link
                  href={accountHref}
                  onClick={() => setOpen(false)}
                  className="inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-brand-charcoal transition-colors hover:text-brand-bronze"
                >
                  <User className="h-4 w-4" />
                  {accountLabel}
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
