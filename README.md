# Atchayam G. — Cinematic Portfolio

Futuristic, immersive portfolio of **Atchayam G.** — Principal Consultant, Technical Lead Architect & AI-Native Mobile/Web Engineer.

**Live:** https://atchayamg.github.io/portfolio/

## Experience Design

An interactive digital world rather than a page: a Three.js city of glowing monoliths, energy trails and drifting light particles, with a scroll-driven cinematic camera that travels through portfolio "zones" — hero, career story, experience timeline, holographic skill panels, project case studies, AI workflow, achievements and contact.

- Theme: dark void `#04050a`, electric blue `#2f6bff`, cyan `#22d3ee`, violet `#8b5cf6`
- Type: Space Grotesk (display) · Inter (body) · JetBrains Mono (data)
- Identity assets (portrait restyle, city backdrop) generated with **Higgsfield AI** (Nano Banana Pro), theme-matched

## Tech Stack

- **React 18 + TypeScript + Vite**
- **Three.js + React Three Fiber** — instanced digital city, particle field, energy trails, scroll-driven camera rig
- **GSAP + ScrollTrigger** — scroll-based reveals and storytelling
- **Framer Motion** — loader, nav and hero micro-interactions
- **Tailwind CSS** — design tokens, glassmorphism components

## Performance, A11y & Fallbacks

- Cinematic loader with real asset preloading and a hard timeout (never hangs)
- Lazy-loaded 3D scene in a separate chunk; DPR clamping + reduced particle counts on mobile
- Static gradient fallback when WebGL is unavailable
- `prefers-reduced-motion` honored everywhere (camera, reveals, transitions)
- Semantic HTML, skip link, keyboard-focus rings, ARIA labels, WCAG-AA contrast
- SEO: meta + Open Graph + JSON-LD Person schema

## Development

```bash
npm install
npm run dev       # local dev server
npm run build     # type-check + production build → dist/
npm run preview   # preview the production build
```

## Deployment (GitHub Pages)

`vite.config.ts` sets `base: '/portfolio/'`. Build and publish `dist/` to the `portfolio` repo (Pages branch or /docs). Also works on Vercel/Netlify — set base to `/` for root domains.

© 2026 Atchayam G. Content may not be reproduced without permission.
