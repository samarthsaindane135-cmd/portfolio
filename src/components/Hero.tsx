"use client";

import dynamic from "next/dynamic";
import { ArrowDown, Download, Mail } from "lucide-react";
import { useLocale } from "./LocaleProvider";
import { getTranslations } from "@/lib/i18n";

const ContextGraph = dynamic(() => import("./ContextGraph"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 -z-10 bg-ink">
      <div className="w-full h-full bg-gradient-to-b from-ink via-surface/50 to-ink animate-pulse" />
    </div>
  ),
});

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/ssam-dev",
    aria: "GitHub profile",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/samarth-saindane-91992",
    aria: "LinkedIn profile",
  },
];

export default function Hero() {
  const { locale } = useLocale();
  const t = getTranslations(locale);
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <ContextGraph />

      <div className="section-padding relative z-10 text-center max-w-4xl mx-auto">
        <p className="font-mono text-xs tracking-widest uppercase text-teal mb-6">
          {t.subtitle}
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-text mb-4">
          Samarth Saindane
        </h1>

        <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-2">
          Full-Stack &amp; AI/RAG Developer
        </p>

        <p className="text-sm text-muted/70 max-w-xl mx-auto mb-10">
          Building full-stack products and AI agents — from MERN apps to RAG
          systems.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <button
            onClick={() => scrollTo("#projects")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber text-ink font-semibold rounded-lg hover:brightness-110 transition-all text-sm"
          >
            <ArrowDown size={16} />
            View Projects
          </button>

          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 px-6 py-3 border border-muted/30 text-text rounded-lg hover:border-amber hover:text-amber transition-all text-sm"
          >
            <Download size={16} />
            Download Resume
          </a>

          <button
            onClick={() => scrollTo("#contact")}
            className="inline-flex items-center gap-2 px-6 py-3 border border-muted/30 text-text rounded-lg hover:border-teal hover:text-teal transition-all text-sm"
          >
            <Mail size={16} />
            Get in Touch
          </button>
        </div>

        <div className="flex items-center justify-center gap-6">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.aria}
              className="font-mono text-xs tracking-wider text-muted hover:text-amber transition-colors uppercase"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            scrollTo("#about");
          }}
          aria-label="Scroll to about section"
        >
          <ArrowDown size={20} className="text-muted/40" />
        </a>
      </div>
    </section>
  );
}
