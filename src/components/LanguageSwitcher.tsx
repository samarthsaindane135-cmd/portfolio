"use client";

import { useState, useRef, useEffect } from "react";
import { Globe } from "lucide-react";
import { useLocale } from "./LocaleProvider";
import type { Locale } from "@/lib/i18n";

const flags: Record<Locale, string> = {
  en: "🇺🇸", hi: "🇮🇳", mr: "🇮🇳",
  ja: "🇯🇵", ko: "🇰🇷", zh: "🇨🇳",
  fr: "🇫🇷", de: "🇩🇪", es: "🇪🇸",
  pt: "🇵🇹", ru: "🇷🇺", ar: "🇸🇦",
  it: "🇮🇹", nl: "🇳🇱", tr: "🇹🇷",
  vi: "🇻🇳", th: "🇹🇭", pl: "🇵🇱",
  sv: "🇸🇪", da: "🇩🇰", fi: "🇫🇮",
  no: "🇳🇴", cs: "🇨🇿", ro: "🇷🇴",
  hu: "🇭🇺", el: "🇬🇷", he: "🇮🇱",
  id: "🇮🇩", ms: "🇲🇾", tl: "🇵🇭",
};

const labels: Record<Locale, string> = {
  en: "English", hi: "हिन्दी", mr: "मराठी",
  ja: "日本語", ko: "한국어", zh: "中文",
  fr: "Français", de: "Deutsch", es: "Español",
  pt: "Português", ru: "Русский", ar: "العربية",
  it: "Italiano", nl: "Nederlands", tr: "Türkçe",
  vi: "Tiếng Việt", th: "ภาษาไทย", pl: "Polski",
  sv: "Svenska", da: "Dansk", fi: "Suomi",
  no: "Norsk", cs: "Čeština", ro: "Română",
  hu: "Magyar", el: "Ελληνικά", he: "עברית",
  id: "Bahasa Indonesia", ms: "Bahasa Melayu", tl: "Filipino",
};

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const currentFlag = flags[locale] || "🌐";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-xs font-mono text-muted hover:text-amber transition-colors tracking-wider"
        aria-label="Switch language"
        aria-expanded={open}
      >
        <Globe size={14} />
        <span>{currentFlag}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-44 max-h-72 overflow-y-auto bg-surface border border-muted/20 rounded-lg shadow-xl z-50 py-1 scrollbar-thin">
          {(Object.keys(labels) as Locale[]).map((l) => (
            <button
              key={l}
              onClick={() => {
                setLocale(l);
                setOpen(false);
              }}
              className={`w-full text-left px-3 py-1.5 text-xs font-mono transition-colors flex items-center gap-2 ${
                l === locale
                  ? "text-amber bg-amber/10"
                  : "text-muted hover:text-text hover:bg-ink/50"
              }`}
            >
              <span>{flags[l]}</span>
              <span>{labels[l]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
