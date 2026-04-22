/**
 * SEO helpers for canonical + hreflang management.
 *
 * Strategy:
 *  - Every localizable page emits one canonical URL (the clean URL without ?lang)
 *  - Plus an <link rel="alternate" hreflang="xx" href="...?lang=xx"> per supported language
 *  - Plus an <link rel="alternate" hreflang="x-default" href="..."> pointing to the canonical
 *
 * This is the Google-recommended pattern when language variants share the same URL
 * with a query parameter selecting the locale. See:
 * https://developers.google.com/search/docs/specialty/international/localized-versions
 */

import { SUPPORTED_LANGS } from "@/i18n";

const SITE_ORIGIN = "https://hotelmountains.com";

const HREFLANG_DATA_ATTR = "data-hm-hreflang";

/** Insert or update the <link rel="canonical"> tag. */
export function upsertCanonical(pathOrUrl: string) {
  const href = pathOrUrl.startsWith("http")
    ? pathOrUrl
    : `${SITE_ORIGIN}${pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`}`;

  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = href;
  return href;
}

/**
 * Replace all hreflang alternate tags managed by us with a fresh set
 * for the given canonical URL.
 */
export function upsertHreflangAlternates(canonicalPathOrUrl: string) {
  const canonical = canonicalPathOrUrl.startsWith("http")
    ? canonicalPathOrUrl
    : `${SITE_ORIGIN}${canonicalPathOrUrl.startsWith("/") ? canonicalPathOrUrl : `/${canonicalPathOrUrl}`}`;

  // Remove any previously-managed hreflang links so navigating between pages
  // never leaves stale alternates in <head>.
  document
    .querySelectorAll(`link[rel="alternate"][${HREFLANG_DATA_ATTR}]`)
    .forEach((el) => el.parentNode?.removeChild(el));

  const make = (hreflang: string, href: string) => {
    const link = document.createElement("link");
    link.rel = "alternate";
    link.setAttribute("hreflang", hreflang);
    link.href = href;
    link.setAttribute(HREFLANG_DATA_ATTR, "1");
    document.head.appendChild(link);
  };

  // One alternate per supported language using ?lang=xx
  for (const { code } of SUPPORTED_LANGS) {
    const url = new URL(canonical);
    url.searchParams.set("lang", code);
    make(code, url.toString());
  }

  // x-default → the clean canonical (English by default fallback)
  make("x-default", canonical);
}

/** Convenience: set canonical AND hreflang alternates in one call. */
export function applySeoUrls(canonicalPathOrUrl: string) {
  const href = upsertCanonical(canonicalPathOrUrl);
  upsertHreflangAlternates(href);
  return href;
}
