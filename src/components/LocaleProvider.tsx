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

function jsonp(url: string): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    const cb = `_jp_${Date.now()}`;
    (window as unknown as Record<string, unknown>)[cb] = (data: unknown) => {
      delete (window as unknown as Record<string, unknown>)[cb];
      resolve(data as Record<string, unknown>);
    };
    const s = document.createElement("script");
    s.src = `${url}${url.includes("?") ? "&" : "?"}callback=${cb}`;
    s.onerror = () => {
      delete (window as unknown as Record<string, unknown>)[cb];
      reject(new Error("JSONP failed"));
    };
    document.head.appendChild(s);
  });
}

export function LocaleProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const ranRef = useRef(false);
  const localeRef = useRef(locale);
  localeRef.current = locale;

  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;

    const existing = document.cookie.match(
      new RegExp(`(^| )${COOKIE_NAME}=([^;]+)`)
    );
    if (existing) return;

    const setFromCountry = (code: string | null) => {
      const fromCountry = detectLocaleFromCountry(code);
      if (fromCountry && fromCountry !== localeRef.current) {
        setLocaleState(fromCountry);
        document.cookie = `${COOKIE_NAME}=${fromCountry}; path=/; max-age=31536000; SameSite=Lax`;
      }
    };

    fetch("https://ipinfo.io/json")
      .then((r) => r.json())
      .then((data) => setFromCountry((data as { country?: string }).country ?? null))
      .catch(() =>
        jsonp("https://ip-api.com/json/?fields=countryCode")
          .then((data) =>
            setFromCountry((data as { countryCode?: string }).countryCode ?? null)
          )
          .catch(() => {})
      );
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
