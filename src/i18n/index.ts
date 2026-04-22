import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import es from "./locales/es.json";
import fr from "./locales/fr.json";
import ru from "./locales/ru.json";

export const SUPPORTED_LANGS = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
] as const;

export type LangCode = (typeof SUPPORTED_LANGS)[number]["code"];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
      fr: { translation: fr },
      ru: { translation: ru },
    },
    fallbackLng: "en",
    supportedLngs: SUPPORTED_LANGS.map((l) => l.code),
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      lookupLocalStorage: "hm_lang",
      caches: ["localStorage"],
    },
    interpolation: { escapeValue: false },
  });

// Sync <html lang="..."> with active language
const syncHtmlLang = (lng: string) => {
  document.documentElement.lang = lng;
  // All four supported languages are LTR — keep dir="ltr" explicitly
  document.documentElement.dir = "ltr";
};
syncHtmlLang(i18n.language);
i18n.on("languageChanged", syncHtmlLang);

export default i18n;
