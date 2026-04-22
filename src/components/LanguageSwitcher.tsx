import { useTranslation } from "react-i18next";
import { Globe, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SUPPORTED_LANGS } from "@/i18n";

interface LanguageSwitcherProps {
  className?: string;
}

const LanguageSwitcher = ({ className }: LanguageSwitcherProps) => {
  const { i18n, t } = useTranslation();
  const current =
    SUPPORTED_LANGS.find((l) => l.code === i18n.resolvedLanguage) ??
    SUPPORTED_LANGS[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={t("nav.language")}
        className={
          "flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors focus:outline-none " +
          (className ?? "")
        }
      >
        <Globe className="h-4 w-4" />
        <span className="uppercase">{current.code}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[160px]">
        {SUPPORTED_LANGS.map((lang) => {
          const active = lang.code === current.code;
          return (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => i18n.changeLanguage(lang.code)}
              className="cursor-pointer flex items-center justify-between gap-2"
            >
              <span className="flex items-center gap-2">
                <span aria-hidden>{lang.flag}</span>
                <span>{lang.label}</span>
              </span>
              {active && <Check className="h-4 w-4 text-primary" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
