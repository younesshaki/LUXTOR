"use client";

import { useLayoutEffect, useState } from "react";
import NextLink from "next/link";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Menu, X, Phone, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { navItems, contactInfo } from "@/data/navigation";
import { Link } from "@/i18n/navigation";
import { usePathname } from "@/i18n/navigation";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { buttonVariants } from "@/components/ui/button";
import { LanguageSwitcher } from "./LanguageSwitcher";

const HEADER_ZONE_HEIGHT = 120;

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [headerTheme, setHeaderTheme] = useState<"light" | "dark">("light");
  const isDark = headerTheme === "dark";
  const t = useTranslations();

  const accountHref = status === "authenticated" ? "/account" : "/account/login";
  const accountLabel = status === "authenticated" ? t("header.myAccount") : t("header.signIn");
  const isAdmin = session?.user.role === "admin";

  useLayoutEffect(() => {
    let frameId = 0;

    const updateHeaderTheme = () => {
      frameId = 0;

      const activeSection = Array.from(
        document.querySelectorAll<HTMLElement>("[data-header-theme]")
      ).find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= HEADER_ZONE_HEIGHT && rect.bottom > HEADER_ZONE_HEIGHT;
      });

      const nextTheme =
        activeSection?.dataset.headerTheme === "dark" ? "dark" : "light";

      setHeaderTheme((currentTheme) =>
        currentTheme === nextTheme ? currentTheme : nextTheme
      );
    };

    const scheduleUpdate = () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }

      frameId = requestAnimationFrame(updateHeaderTheme);
    };

    updateHeaderTheme();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      setHeaderTheme("light");
    };
  }, [pathname]);

  return (
    <header className={cn(
      "fixed top-0 inset-x-0 z-50 bg-white/5 backdrop-blur-sm border-b transition-colors duration-300",
      isDark ? "border-white/10" : "border-brand-sand/30"
    )}>

      {/* Top bar */}
      <div className={cn(
        "border-b overflow-hidden max-h-10 opacity-100 transition-colors duration-300",
        isDark ? "border-white/10" : "border-brand-sand/30"
      )}>
        <Container className={cn(
          "max-w-[96rem] flex items-center justify-between py-2 text-xs tracking-wide transition-colors duration-300 2xl:px-8",
          isDark ? "text-white/60" : "text-brand-charcoal-light"
        )}>
          <span className="hidden sm:inline">{t("header.hours")}</span>
          <div className="ms-auto flex items-center gap-4 sm:gap-5">
            <LanguageSwitcher />
            {isAdmin ? (
              <NextLink
                href="/admin"
                className="bg-red-600 text-white text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded"
              >
                {t("header.dashboard")}
              </NextLink>
            ) : null}
            <NextLink
              href={accountHref}
              className={cn(
                "inline-flex items-center gap-1.5 transition-colors",
                isDark ? "hover:text-brand-bronze" : "hover:text-brand-bronze"
              )}
            >
              <User className="h-3 w-3" />
              {accountLabel}
            </NextLink>
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
      <Container className="grid h-16 max-w-[96rem] grid-cols-[auto_1fr_auto] items-center gap-4 md:h-20 2xl:grid-cols-[max-content_minmax(0,1fr)_max-content] 2xl:gap-8 2xl:px-8">
        {/* Logo */}
        <Link href="/" className="relative z-10 justify-self-start">
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
        <nav className="relative hidden min-w-0 items-center justify-center gap-0 justify-self-center 2xl:flex">
          {navItems.map((item) => (
            <Link
              key={item.labelKey}
              href={item.href}
              className={cn(
                "inline-flex min-h-[44px] items-center gap-1.5 rounded-sm px-2.5 py-2 text-sm font-semibold uppercase tracking-wide transition-colors duration-200 hover:text-brand-bronze focus-visible:ring-2 focus-visible:ring-brand-bronze focus-visible:ring-offset-2 outline-none",
                pathname === item.href
                  ? "text-brand-bronze"
                  : isDark
                    ? "text-white"
                    : "text-brand-charcoal"
              )}
            >
              {t(item.labelKey)}
              {item.badgeKey && (
                <span className="bg-red-600 text-white text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded">
                  {t(item.badgeKey)}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center justify-self-end 2xl:flex">
          <Link
            href="/quote"
            className={cn(
              buttonVariants({ variant: "default", size: "sm" }),
              "h-10 rounded-none bg-brand-bronze px-5 text-xs uppercase tracking-wide whitespace-nowrap text-white hover:bg-brand-bronze/90"
            )}
          >
            {t("header.getQuote")}
          </Link>
        </div>

        {/* Mobile menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className={cn(
            "relative z-10 flex min-h-[44px] min-w-[44px] items-center justify-center justify-self-end p-2 transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-brand-bronze focus-visible:ring-offset-2 outline-none 2xl:hidden",
            isDark ? "text-white" : "text-brand-charcoal"
          )}>
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">{t("header.openMenu")}</span>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:w-80 bg-white pt-16">
            <SheetTitle className="sr-only">{t("header.navigationMenu")}</SheetTitle>
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.labelKey}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "px-4 py-3 text-lg tracking-wide font-heading transition-colors min-h-[44px] flex items-center gap-2 rounded-sm font-semibold",
                    pathname === item.href
                      ? "text-brand-bronze bg-brand-cream"
                      : "text-brand-charcoal hover:text-brand-bronze hover:bg-brand-cream/50"
                  )}
                >
                  {t(item.labelKey)}
                  {item.badgeKey && (
                    <span className="bg-red-600 text-white text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded">
                      {t(item.badgeKey)}
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
                  {t("header.requestQuote")}
                </Link>
              </div>
              <div className="mt-4 px-4">
                <NextLink
                  href={accountHref}
                  onClick={() => setOpen(false)}
                  className="inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-brand-charcoal transition-colors hover:text-brand-bronze"
                >
                  <User className="h-4 w-4" />
                  {accountLabel}
                </NextLink>
              </div>
              <div className="mt-4 px-4">
                <LanguageSwitcher />
              </div>
              <div className="mt-8 px-4 pt-6 border-t border-brand-sand/30">
                <p className="text-xs text-muted-foreground mb-1">{t("header.hours")}</p>
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
