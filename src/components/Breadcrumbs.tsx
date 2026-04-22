import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export interface BreadcrumbItem {
  label: string;
  to?: string;
  /** Anchor target on the same page (e.g. "#faq") for internal section jumping. */
  hash?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  /**
   * Optional list of in-page section anchors to render as a secondary
   * "section breadcrumb" strip — improves Google sitelinks and crawl depth.
   */
  sections?: { label: string; hash: string }[];
  /** Canonical URL of the current page (for JSON-LD BreadcrumbList). */
  pageUrl: string;
}

const Breadcrumbs = ({ items, sections, pageUrl }: BreadcrumbsProps) => {
  const { t, i18n } = useTranslation();

  // Inject a localized BreadcrumbList JSON-LD that mirrors the visible trail.
  useEffect(() => {
    const itemListElement = items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.label,
      ...(it.to
        ? { item: it.to.startsWith("http") ? it.to : `https://hotelmountains.com${it.to}` }
        : { item: pageUrl }),
    }));

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.hmBreadcrumb = "1";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      inLanguage: i18n.language,
      itemListElement,
    });

    // Remove any previously-injected breadcrumb schema first
    document
      .querySelectorAll('script[data-hm-breadcrumb="1"]')
      .forEach((el) => el.parentNode?.removeChild(el));
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, [items, pageUrl, i18n.language]);

  return (
    <nav
      aria-label={t("breadcrumb.home")}
      className="container mx-auto max-w-4xl px-4 pt-4"
      lang={i18n.language}
    >
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        {items.map((it, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${it.label}-${i}`} className="flex items-center gap-1.5">
              {i === 0 && <Home className="h-3.5 w-3.5" aria-hidden="true" />}
              {it.to && !isLast ? (
                <Link
                  to={it.to}
                  className="hover:text-primary transition-colors hover:underline underline-offset-2"
                >
                  {it.label}
                </Link>
              ) : (
                <span
                  className={isLast ? "text-foreground font-medium" : ""}
                  aria-current={isLast ? "page" : undefined}
                >
                  {it.label}
                </span>
              )}
              {!isLast && (
                <ChevronRight className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ol>

      {sections && sections.length > 0 && (
        <ul
          className="mt-3 flex flex-wrap gap-2 text-xs"
          aria-label="Page sections"
        >
          {sections.map((s) => (
            <li key={s.hash}>
              <a
                href={s.hash}
                className="px-3 py-1.5 rounded-full bg-muted/60 hover:bg-primary/10 hover:text-primary border border-border text-muted-foreground transition-colors"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Breadcrumbs;
