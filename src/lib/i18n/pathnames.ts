import { locales, type Locale } from "@/i18n/routing";

const INTERNAL_PREFIXES = ["/account", "/admin", "/api"] as const;

export function hasLocalePrefix(pathname: string) {
  return locales.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`));
}

export function stripLocalePrefix(pathname: string) {
  for (const locale of locales) {
    if (pathname === `/${locale}`) {
      return "/";
    }

    if (pathname.startsWith(`/${locale}/`)) {
      return pathname.slice(locale.length + 1) || "/";
    }
  }

  return pathname || "/";
}

export function isInternalPath(pathname: string) {
  return INTERNAL_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

export function localizePublicPath(pathname: string, locale: Locale) {
  const normalizedPath = stripLocalePrefix(pathname);

  if (isInternalPath(normalizedPath)) {
    return `/${locale}`;
  }

  if (normalizedPath === "/") {
    return `/${locale}`;
  }

  return `/${locale}${normalizedPath}`;
}
