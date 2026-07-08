# Samarth Saindane — Portfolio

Personal portfolio built with Next.js 14, TypeScript, Tailwind CSS, Three.js, and Framer Motion.

## Tech Stack

- **Framework:** Next.js 14 (App Router) + React 18 + TypeScript
- **Styling:** Tailwind CSS
- **3D Graphics:** Three.js via @react-three/fiber + @react-three/drei
- **Animation:** Framer Motion
- **Icons:** lucide-react
- **Fonts:** IBM Plex Sans, IBM Plex Mono (Google Fonts)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── ContextGraph.tsx
│   ├── About.tsx
│   ├── Skills.tsx
│   ├── Experience.tsx
│   ├── Projects.tsx
│   ├── Education.tsx
│   ├── Certifications.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   ├── ScrollReveal.tsx
│   └── SectionEyebrow.tsx
└── public/
    └── resume.pdf
```

## Before Deploying

1. Add your `resume.pdf` to `/public/`
2. Update `projects.demo` URLs in `src/components/Projects.tsx` with your live demo links
