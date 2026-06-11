# Aryan Sethi — Portfolio

A cinematic, scroll-driven portfolio for an AI Engineer, built with the Next.js
App Router and statically exported for GitHub Pages.

**Live:** https://aryan-stark.github.io/aryan-portfolio

## Tech stack

- **Next.js 16** (App Router, static export)
- **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** for animation, **Lenis** for smooth scroll
- **Geist** font, **Phosphor** icons

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
```

## Production build (static export)

```bash
npm run build    # outputs a fully static site to ./out
```

The build is configured with `output: "export"` in `next.config.ts`, so `next
build` emits static HTML/CSS/JS into `out/` with no server runtime required.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the
static export and publishes it to GitHub Pages.

GitHub Pages serves the site from a sub-path (`/aryan-portfolio`), so the build
sets `NEXT_PUBLIC_BASE_PATH=/aryan-portfolio`. This drives both `basePath`/
`assetPrefix` in `next.config.ts` and the `asset()` helper in
`src/lib/basePath.ts`, which prefixes public assets (frame sequences, images)
that Next.js does not rewrite automatically. A `public/.nojekyll` file prevents
GitHub Pages from stripping the `_next/` directory.

## Project structure

```
src/
  app/            App Router entry (layout, page, global styles)
  components/     UI, section, and provider components
  lib/            Content + config (hero, cinematic, skills, basePath helper)
public/
  frames/         Hero frame sequence
  frames2/        Cinematic reveal frame sequence
```
