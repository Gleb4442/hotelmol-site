"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations, TranslationKey } from "./translations";

export type Language = "en" | "ru" | "ua" | "pl" | "de";

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => any;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

const getBrowserLanguage = (): Language => {
  if (typeof window === "undefined") return "en";
  
  const browserLang = navigator.language.split("-")[0];
  const supportedLanguages: Language[] = ["en", "ru", "ua", "pl", "de"];
  
  if (supportedLanguages.includes(browserLang as Language)) {
    return browserLang as Language;
  }
  
  // Special case for Ukrainian (be, uk)
  if (browserLang === "uk") return "ua";
  
  return "en";
};

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("language");
        if (stored && (stored as Language) !== language) {
          setLanguageState(stored as Language);
        } else if (!stored) {
          const detected = getBrowserLanguage();
          setLanguageState(detected);
          localStorage.setItem("language", detected);
        }
      } catch (e) {
        console.error("Local storage access denied", e);
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("language", lang);
      } catch (e) {
        console.error("Local storage access denied", e);
      }
    }
  };

  const t = (key: TranslationKey): any => {
    const translation = translations[language]?.[key] || translations["en"]?.[key] || key;
    return translation;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within TranslationProvider");
  }
  return context;
}
