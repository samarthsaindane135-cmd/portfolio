"use client";

import ScrollReveal from "./ScrollReveal";
import SectionEyebrow from "./SectionEyebrow";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    role: "Python Development Intern",
    org: "Oasis Infobyte (Remote)",
    period: "Jan 2024 – Mar 2024",
    points: [
      "Developed 15+ image processing applications in Python using OpenCV within a 10-person team",
      "Identified 5 workflow inefficiencies and implemented fixes that reduced manual work by 25%",
      "Shipped bug fixes and feature updates in collaboration with 8 developers",
    ],
  },
  {
    role: "Team Leader – AI Track",
    org: "GenAI Hackathon, Pune",
    period: "Jan 2024",
    points: [
      "Led a 4-person team in designing and prototyping an AI-powered e-commerce solution; secured top-3 placement",
      "Refined prompt engineering strategies, boosting model output relevance by 40%",
      "Presented a technical demo to a panel of 5 industry judges, explaining AI concepts without jargon",
    ],
  },
  {
    role: "Team Member – Full Stack Track",
    org: "Smart India Hackathon (SIH), Government of India",
    period: "Jan 2024",
    points: [
      "Designed a digital tourism solution for Sikkim and pitched findings to an 8-judge evaluation committee",
      "Contributed to winning the internal college round by delivering a production-ready prototype",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <SectionEyebrow command="$ history" label="experience" />
        </ScrollReveal>

        <div className="relative">
          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-muted/20" />

          {experiences.map((exp, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="relative pl-10 pb-12 last:pb-0">
                <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-surface border-2 border-amber flex items-center justify-center">
                  <Briefcase size={12} className="text-amber" />
                </div>

                <div className="font-mono text-xs text-muted mb-1">
                  {exp.period}
                </div>
                <h3 className="text-lg font-semibold text-text">
                  {exp.role}
                </h3>
                <p className="text-sm text-muted mb-3">{exp.org}</p>
                <ul className="space-y-2">
                  {exp.points.map((pt, j) => (
                    <li
                      key={j}
                      className="text-sm text-text/80 pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-px before:bg-amber/60"
                    >
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
