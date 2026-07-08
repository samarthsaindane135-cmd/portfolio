"use client";

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import SectionEyebrow from "./SectionEyebrow";

const categories = [
  {
    id: "languages",
    label: "Languages",
    items: ["C++", "Python", "JavaScript"],
  },
  {
    id: "aiml",
    label: "AI / ML",
    items: [
      "Large Language Models (LLMs)",
      "RAG Systems",
      "AI Agents",
      "Context Engineering",
      "Agentic AI",
      "Prompt Engineering",
    ],
  },
  {
    id: "frameworks",
    label: "AI Frameworks",
    items: ["PyTorch", "TensorFlow"],
  },
  {
    id: "web",
    label: "Web Technologies",
    items: ["React", "Node.js", "Express.js"],
  },
  {
    id: "databases",
    label: "Databases",
    items: ["MySQL", "PostgreSQL", "MongoDB"],
  },
  {
    id: "tools",
    label: "AI Tools",
    items: [
      "Windsurf",
      "Cursor",
      "GitHub Copilot",
      "v0",
      "Replit",
      "Lovable",
      "Gemini",
      "ElevenLabs",
    ],
  },
  {
    id: "devtools",
    label: "Developer Tools",
    items: ["Git", "GitHub"],
  },
  {
    id: "other",
    label: "Other",
    items: ["System Design", "Full-Stack Development", "Docker", "Selenium"],
  },
];

export default function Skills() {
  const [active, setActive] = useState(categories[0].id);

  const activeCategory = categories.find((c) => c.id === active);

  return (
    <section id="skills" className="section-padding bg-surface/30">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <SectionEyebrow command="$ skills --list" label="technologies" />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`font-mono text-xs tracking-wider uppercase px-3 py-1.5 rounded-full border transition-colors ${
                  active === cat.id
                    ? "border-amber text-amber bg-amber/10"
                    : "border-muted/20 text-muted hover:border-muted/40"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          {activeCategory && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {activeCategory.items.map((item) => (
                <div
                  key={item}
                  className="px-4 py-3 rounded-lg bg-ink/50 border border-muted/10 text-sm text-text hover:border-amber/30 transition-colors"
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
