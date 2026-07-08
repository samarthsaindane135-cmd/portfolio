"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import type { Locale } from "@/lib/i18n";
import { detectLocaleFromCountry } from "@/lib/i18n";

const COOKIE_NAME = "NEXT_LOCALE";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  initialLocale,
  countryLocale,
  children,
}: {
  initialLocale: Locale;
  countryLocale: Locale | null;
  children: ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const ranRef = useRef(false);

  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;

    const existing = document.cookie.match(
      new RegExp(`(^| )${COOKIE_NAME}=([^;]+)`)
    );
    if (existing) return;

    if (countryLocale && countryLocale !== locale) {
      setLocaleState(countryLocale);
      document.cookie = `${COOKIE_NAME}=${countryLocale}; path=/; max-age=31536000; SameSite=Lax`;
      return;
    }

    fetch("https://ipinfo.io/json")
      .then((r) => r.json())
      .then((data) => {
        const fromCountry = detectLocaleFromCountry(
          (data as { country?: string }).country ?? null
        );
        if (fromCountry && fromCountry !== locale) {
          setLocaleState(fromCountry);
          document.cookie = `${COOKIE_NAME}=${fromCountry}; path=/; max-age=31536000; SameSite=Lax`;
        }
      })
      .catch(() => {});
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    document.cookie = `${COOKIE_NAME}=${l}; path=/; max-age=31536000; SameSite=Lax`;
  }, []);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
