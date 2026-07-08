"use client";

import { useState, useRef, useEffect } from "react";
import { Globe } from "lucide-react";
import { useLocale } from "./LocaleProvider";
import type { Locale } from "@/lib/i18n";

const flags: Record<Locale, string> = {
  en: "US",
  hi: "IN",
  mr: "IN",
};

const labels: Record<Locale, string> = {
  en: "English",
  hi: "हिन्दी",
  mr: "मराठी",
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

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-xs font-mono text-muted hover:text-amber transition-colors uppercase tracking-wider"
        aria-label="Switch language"
        aria-expanded={open}
      >
        <Globe size={14} />
        <span>{flags[locale]}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-32 bg-surface border border-muted/20 rounded-lg shadow-xl z-50 py-1">
          {(Object.keys(labels) as Locale[]).map((l) => (
            <button
              key={l}
              onClick={() => {
                setLocale(l);
                setOpen(false);
              }}
              className={`w-full text-left px-3 py-1.5 text-xs font-mono transition-colors ${
                l === locale
                  ? "text-amber bg-amber/10"
                  : "text-muted hover:text-text hover:bg-ink/50"
              }`}
            >
              {labels[l]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
