import { Filter } from "lucide-react";
import { useTranslation } from "react-i18next";

interface FilterChipsProps {
  /** Visible label above the chip row, e.g. "Filter by category". */
  label?: string;
  /** All available option values. */
  options: string[];
  /** Currently selected value, or null for "All". */
  value: string | null;
  /** Called with the new selection (null = All). */
  onChange: (next: string | null) => void;
  /** Optional icon prefix per chip. */
  countMap?: Record<string, number>;
  className?: string;
}

const FilterChips = ({
  label,
  options,
  value,
  onChange,
  countMap,
  className = "",
}: FilterChipsProps) => {
  const { t } = useTranslation();
  const allLabel = t("filters.all", { defaultValue: "All" });
  const totalCount = countMap
    ? Object.values(countMap).reduce((a, b) => a + b, 0)
    : undefined;

  return (
    <div className={`not-prose ${className}`}>
      {label && (
        <div className="flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <Filter className="h-3.5 w-3.5" />
          <span>{label}</span>
        </div>
      )}
      <div className="flex flex-wrap gap-2" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={value === null}
          onClick={() => onChange(null)}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
            value === null
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-primary"
          }`}
        >
          {allLabel}
          {totalCount !== undefined && (
            <span className="ml-1.5 opacity-70">({totalCount})</span>
          )}
        </button>
        {options.map((opt) => {
          const active = value === opt;
          const c = countMap?.[opt];
          return (
            <button
              key={opt}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onChange(active ? null : opt)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                active
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-primary"
              }`}
            >
              {opt}
              {typeof c === "number" && (
                <span className="ml-1.5 opacity-70">({c})</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FilterChips;
