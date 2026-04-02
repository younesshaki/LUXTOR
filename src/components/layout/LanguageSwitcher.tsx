"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { locales, type Locale } from "@/i18n/routing";
import { localizePublicPath, stripLocalePrefix, isInternalPath } from "@/lib/i18n/pathnames";

const localeLabels: Record<Locale, string> = {
  en: "EN",
  fr: "FR",
  ar: "AR",
};

function persistLocaleCookie(locale: Locale) {
  window.document.cookie = `NEXT_LOCALE=${locale};path=/;max-age=31536000;SameSite=Lax`;
}

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  function switchLocale(newLocale: Locale) {
    const normalizedPath = pathname ?? "/";
    const nextPath = isInternalPath(stripLocalePrefix(normalizedPath))
      ? `/${newLocale}`
      : localizePublicPath(normalizedPath, newLocale);
    const query = searchParams.toString();

    persistLocaleCookie(newLocale);
    router.replace(query ? `${nextPath}?${query}` : nextPath);
  }

  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {locales.map((code) => (
        <button
          key={code}
          onClick={() => switchLocale(code)}
          className={cn(
            "text-[11px] tracking-wide px-1.5 py-0.5 transition-colors rounded-sm",
            locale === code
              ? "text-brand-bronze font-bold"
              : "opacity-60 hover:opacity-100"
          )}
        >
          {localeLabels[code]}
        </button>
      ))}
    </div>
  );
}
