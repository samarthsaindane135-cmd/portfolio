"use client";

import ScrollReveal from "./ScrollReveal";
import SectionEyebrow from "./SectionEyebrow";
import { Award } from "lucide-react";

const certs = [
  "Master Python: 100 Projects in 100 Days — Udemy — 2024",
  "Introduction to Data Analytics — Coursera — 2024",
  "Python Development with OpenCV — Oasis Infobyte — Jan 2024",
  "Introduction to Cybersecurity — Skill India — 2024",
];

export default function Certifications() {
  return (
    <section id="certifications" className="section-padding bg-surface/30">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <SectionEyebrow
            command="$ cat certifications"
            label="certifications"
          />
        </ScrollReveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {certs.map((c, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <div className="flex items-start gap-3 p-4 rounded-lg border border-muted/10 bg-ink/30">
                <Award size={18} className="text-teal shrink-0 mt-0.5" />
                <span className="text-sm text-text/90">{c}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
