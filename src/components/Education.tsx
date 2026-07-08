"use client";

import ScrollReveal from "./ScrollReveal";
import SectionEyebrow from "./SectionEyebrow";
import { GraduationCap } from "lucide-react";

const education = [
  {
    school: "Indira College of Engineering and Management, Pune, India",
    degree: "Bachelor of Engineering in Computer Engineering",
    period: "Expected May 2027",
  },
  {
    school: "Rustomjie International School, Jalgaon, India",
    degree: "Secondary School Certificate (10th Grade)",
    period: "May 2020",
  },
];

export default function Education() {
  return (
    <section id="education" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <SectionEyebrow command="$ cat education" label="education" />
        </ScrollReveal>

        <div className="space-y-8">
          {education.map((ed, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="flex gap-4">
                <div className="mt-1 shrink-0">
                  <GraduationCap size={20} className="text-amber" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text">
                    {ed.degree}
                  </h3>
                  <p className="text-sm text-muted">{ed.school}</p>
                  <span className="font-mono text-xs text-muted/60">
                    {ed.period}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
