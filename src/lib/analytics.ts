// GA4 event tracking utilities + global click listener
// Tracks affiliate clicks, outbound links, downloads, and SPA pageviews.

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const MEASUREMENT_ID = "G-WVEHV770TD";

const DOWNLOAD_EXTENSIONS = [
  "pdf", "zip", "rar", "7z", "tar", "gz",
  "doc", "docx", "xls", "xlsx", "ppt", "pptx",
  "csv", "txt", "rtf",
  "mp3", "mp4", "wav", "avi", "mov", "mkv", "webm",
  "dmg", "exe", "apk", "iso", "pkg", "msi",
];

// Known affiliate / partner domains used across the site
const AFFILIATE_DOMAINS = [
  "getyourguide.com",
  "booking.com",
  "tp.media",         // TravelPayouts (flights/hotels widgets)
  "aviasales",
  "hotellook",
  "tripadvisor.com",
  "expedia.com",
  "agoda.com",
  "hotels.com",
  "viator.com",
];

const AFFILIATE_PARAM_KEYS = [
  "partner_id", "aff", "affiliate", "utm_medium",
  "marker", "trs", "shmarker",
];

export function gaEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}

export function gaPageview(path: string, title?: string) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("config", MEASUREMENT_ID, {
    page_path: path,
    page_title: title ?? document.title,
    page_location: window.location.origin + path,
  });
}

function getHostname(url: string): string | null {
  try {
    return new URL(url, window.location.href).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

function isOutbound(host: string | null): boolean {
  if (!host) return false;
  const current = window.location.hostname.replace(/^www\./, "");
  return host !== current;
}

function isAffiliate(href: string, host: string | null): boolean {
  if (!host) return false;
  if (AFFILIATE_DOMAINS.some((d) => host === d || host.endsWith(`.${d}`))) return true;
  try {
    const u = new URL(href, window.location.href);
    return AFFILIATE_PARAM_KEYS.some((k) => u.searchParams.has(k));
  } catch {
    return false;
  }
}

function getDownloadExt(href: string): string | null {
  try {
    const u = new URL(href, window.location.href);
    const path = u.pathname.toLowerCase();
    const m = path.match(/\.([a-z0-9]+)$/);
    if (!m) return null;
    return DOWNLOAD_EXTENSIONS.includes(m[1]) ? m[1] : null;
  } catch {
    return null;
  }
}

function trackAnchor(anchor: HTMLAnchorElement) {
  const href = anchor.getAttribute("href");
  if (!href || href.startsWith("#") || href.startsWith("javascript:")) return;

  const host = getHostname(href);
  const linkText = (anchor.innerText || anchor.getAttribute("aria-label") || "").trim().slice(0, 100);
  const baseParams = {
    link_url: href,
    link_domain: host ?? "",
    link_text: linkText,
    link_classes: anchor.className || "",
    page_path: window.location.pathname,
  };

  // Mailto / Tel
  if (href.startsWith("mailto:")) {
    gaEvent("contact_click", { method: "email", ...baseParams });
    return;
  }
  if (href.startsWith("tel:")) {
    gaEvent("contact_click", { method: "phone", ...baseParams });
    return;
  }

  // Download
  const ext = getDownloadExt(href);
  if (ext) {
    gaEvent("file_download", { file_extension: ext, file_name: href.split("/").pop() ?? "", ...baseParams });
    return;
  }

  // Affiliate (also fires outbound)
  if (isAffiliate(href, host)) {
    gaEvent("affiliate_click", { affiliate_network: host, ...baseParams });
    gaEvent("click", { outbound: true, ...baseParams });
    return;
  }

  // Generic outbound
  if (isOutbound(host)) {
    gaEvent("click", { outbound: true, ...baseParams });
  }
}

let initialized = false;

export function initAnalytics() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;

  document.addEventListener(
    "click",
    (e) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest("a") as HTMLAnchorElement | null;
      if (!anchor) return;
      try {
        trackAnchor(anchor);
      } catch {
        // never block navigation
      }
    },
    { capture: true },
  );
}
