"use client";

import { useRef } from "react";
import ScrollReveal from "./ScrollReveal";
import SectionEyebrow from "./SectionEyebrow";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Internship Application Bot (Interno-bot)",
    period: "Apr 2026",
    tech: ["Python", "Selenium", "BeautifulSoup", "Docker"],
    points: [
      "Automated internship discovery by scraping Internshala and LinkedIn; handled form filling and submission without manual intervention",
      "Orchestrated email monitoring and CV profile management for targeted submissions, configured via environment variables",
      "Deployed as a Docker service with a systemd unit for continuous operation",
    ],
    demo: "https://t.me/InternoAIbot",
    repo: "https://github.com/ssam-dev",
  },
  {
    title: "Gym Management System (GMS)",
    period: "Jan 2024",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB"],
    points: [
      "Built a full-stack web application to manage 500+ members and 50+ trainers, deployed on Vercel",
      "Set up membership expiry notifications, cutting manual tracking overhead by 60%",
      "Received 95% positive ratings from a 20-owner beta group; added equipment inventory for 200+ items",
    ],
    demo: "https://gms-ivory-sigma.vercel.app/login",
    repo: "https://github.com/ssam-dev",
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <ScrollReveal delay={index * 0.15}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative p-6 rounded-xl bg-surface border border-muted/10 transition-transform duration-200 ease-out will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-text">
              {project.title}
            </h3>
            <span className="font-mono text-xs text-muted">{project.period}</span>
          </div>
          <div className="flex gap-3">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Live demo of ${project.title}`}
                className="text-muted hover:text-amber transition-colors"
              >
                <ExternalLink size={18} />
              </a>
            )}
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Source code of ${project.title}`}
              className="text-muted hover:text-teal transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12 24 5.37 18.63 0 12 0z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((t) => (
            <span
              key={t}
              className="font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 rounded border border-muted/15 text-muted"
            >
              {t}
            </span>
          ))}
        </div>

        <ul className="space-y-2">
          {project.points.map((pt, j) => (
            <li
              key={j}
              className="text-sm text-text/80 pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-px before:bg-teal/60"
            >
              {pt}
            </li>
          ))}
        </ul>
      </div>
    </ScrollReveal>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section-padding bg-surface/30">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <SectionEyebrow command="$ ls ./projects" label="work" />
        </ScrollReveal>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
