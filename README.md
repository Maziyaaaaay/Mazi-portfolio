# mazinkp.in — Portfolio

Personal portfolio of **Muhammed Mazin KP** — AI Content Architect, Educator & Founder.

Dark cinematic single-page site built with Next.js 15 (App Router), statically prerendered for full search-engine crawlability.

## Stack

- **Framework:** Next.js 15 · React 19 · TypeScript (strict)
- **Styling:** Tailwind CSS v4 (CSS-first config in `src/app/globals.css`)
- **Animation:** Framer Motion 12 (scroll reveals, filter transitions) + GSAP 3 (filmstrip loop, counters)
- **Fonts:** Bebas Neue (local, display) · Space Grotesk (body) · JetBrains Mono (data/tools) via `next/font`
- **Icons:** Lucide React

## Commands

```bash
npm run dev     # dev server on :3000
npm run build   # production build (static)
npm run start   # serve production build
npm run lint    # eslint
```

## Editing content

All copy and data — projects, achievements, services, pipeline stages, nav links, contact details — live in **`src/lib/constants.ts`**. Components render from there; edit one file to update the site.

Design tokens (colors, easing, fonts) are CSS variables in **`src/app/globals.css`**.

## Structure

```
src/
  app/            layout (fonts, meta, JSON-LD), page, globals.css,
                  robots.ts, sitemap.ts, icon.svg, opengraph-image.tsx
  components/
    sections/     Hero, Manifesto, WhatIDo, ToolStack, Work,
                  Achievements, Teaching, Travel, Contact, Footer
    ui/           NavBar, FilmStrip, ProjectCard, PosterFrame,
                  VideoModal, CustomCursor, CounterStat, SectionLabel, ToolBadge
  lib/            constants.ts (all content), animations.ts (shared variants)
  types/          shared TypeScript types
public/uploads/   work-sample videos and photos
```

## Notes

- Videos never preload — they mount only inside the fullscreen modal on demand.
- `prefers-reduced-motion` collapses all animation to instant appear.
- Client films without exportable footage (HU, TopAd, Coreve, …) use typographic
  poster frames (`PosterFrame`) in the brand's palette; swap in real stills by
  adding `image`/`video` paths in `constants.ts`.
