"use client";

import ScrollReveal from "./ScrollReveal";
import SectionEyebrow from "./SectionEyebrow";

export default function About() {
  return (
    <section id="about" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <SectionEyebrow command="$ whoami" label="about me" />
          <p className="text-base sm:text-lg text-text leading-relaxed max-w-3xl">
            Computer Engineering student with experience in full-stack
            development, AI agents, and RAG systems. Developed and deployed
            production projects using the MERN stack. Led a team to a top-3
            finish at a national GenAI hackathon. Proficient in frontend
            development, backend development, prompt engineering, and context
            engineering.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
