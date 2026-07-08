"use client";

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import SectionEyebrow from "./SectionEyebrow";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const contactLinks = [
  {
    label: "Email",
    value: "samarthsaindane135@gmail.com",
    href: "mailto:samarthsaindane135@gmail.com",
    icon: Mail,
  },
  {
    label: "Phone",
    value: "+91 94039 10482",
    href: "tel:+919403910482",
    icon: Phone,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/samarth-saindane-91992",
    href: "https://linkedin.com/in/samarth-saindane-91992",
    icon: ({ className }: { className?: string }) => (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="currentColor"
        width="18"
        height="18"
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    value: "github.com/ssam-dev",
    href: "https://github.com/ssam-dev",
    icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12 24 5.37 18.63 0 12 0z" />
      </svg>
    ),
  },
  {
    label: "Location",
    value: "Jalgaon, Maharashtra, India",
    icon: MapPin,
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("Portfolio Contact");
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.open(`mailto:samarthsaindane135@gmail.com?subject=${subject}&body=${body}`);
  };

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <SectionEyebrow command="$ ./connect" label="contact" />
        </ScrollReveal>

        <div className="grid gap-12 md:grid-cols-2">
          <ScrollReveal delay={0.1}>
            <div className="space-y-5">
              {contactLinks.map((link) => {
                const Icon = link.icon;
                const content = (
                  <div className="flex items-center gap-3 group">
                    <Icon className="text-muted group-hover:text-amber transition-colors shrink-0" />
                    <div>
                      <p className="text-xs font-mono text-muted/60">
                        {link.label}
                      </p>
                      <p className="text-sm text-text group-hover:text-amber transition-colors">
                        {link.value}
                      </p>
                    </div>
                  </div>
                );

                return link.href ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                  >
                    {content}
                  </a>
                ) : (
                  <div key={link.label}>{content}</div>
                );
              })}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-surface border border-muted/20 text-text placeholder:text-muted/40 text-sm focus:outline-none focus:border-amber transition-colors"
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-surface border border-muted/20 text-text placeholder:text-muted/40 text-sm focus:outline-none focus:border-amber transition-colors"
                />
              </div>
              <div>
                <label htmlFor="message" className="sr-only">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Your message..."
                  value={form.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-surface border border-muted/20 text-text placeholder:text-muted/40 text-sm focus:outline-none focus:border-amber transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber text-ink font-semibold rounded-lg hover:brightness-110 transition-all text-sm"
              >
                <Send size={16} />
                Send Message
              </button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
