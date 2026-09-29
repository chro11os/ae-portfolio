# AE Portfolio

Single-page portfolio for Jaon Ae-dam Gatchalian (motion/graphics/3D designer). Built by Neil Brags Guzman.
Open work lives in [TASKS.md](TASKS.md) — check it before starting, tick items off when done.

## Commands

Package manager is **bun only** — never run npm/yarn/pnpm (`package-lock.json` is gitignored).

```bash
bun install
bun dev             # next dev on :3000
bun run build       # production build — run before calling a change done
bun run lint        # eslint (clean — keep it that way)
bunx tsc --noEmit   # typecheck (clean)
```

No test suite. Verify visually at both `< lg` (mobile) and `>= lg` (desktop) widths.
Headless screenshots: a puppeteer-core script driving the system Chrome against `PORT=3100 bun run start` works well; wait ~3.5 s for the Preloader, and scroll each section into view first (FadeIn only animates in view).

## Stack

Next.js 16 (App Router) · React 19 · Tailwind v4 (CSS-first, no tailwind.config) · TypeScript strict
Animation: **framer-motion** (imported as `framer-motion`, pulled in transitively by the `motion` package) + plain CSS keyframes (defined as `--animate-*` in `app/globals.css` `@theme`). Smooth scroll: Lenis.
No GSAP — it was removed on purpose. Don't reintroduce it; use framer-motion for scroll/gesture-driven motion and CSS for fire-and-forget animations.

## Layout

```
app/layout.tsx         fonts (Rubik → font-sans, Oswald → font-display), Navbar, Lenis wrapper
app/page.tsx           `sections` array = page order; each wrapped in <div id> (the Navbar's scroll targets)
config/portfolio.ts    ALL site content (text, image paths, links). Edit content here, not in components.
components/pages/<x>/  one folder per section:
    XDesktop.tsx       lg+ layout, fixed h-screen
    XMobile.tsx        < lg layout, flowing height
                       page.tsx pairs them with <Responsive mobile desktop> (components/ui/Responsive.tsx)
components/ui/         shared primitives (Section, FadeIn, Button, Input, GlassCard, Typography, Navbar, ...)
hooks/                 useContactForm (mailto), useInfiniteLoop (skills carousel)
public/works-assets/   gallery images, referenced by path from config
```

## Conventions

- Brand tokens in `app/globals.css` `@theme`: `brand-bg #EBEBEB`, `brand-pink #F04A75`, `brand-text #333`. Use `text-brand-pink` etc., never raw hex.
- Headings: `font-display font-bold uppercase`. Body: `font-sans`.
- Every section root is `<Section>` (min-h-screen mobile, h-screen + overflow-hidden on lg).
- Scroll-in animation = wrap in `<FadeIn direction delay>`; it replays on every scroll (`once: false`) by design.
- Relative imports (`../../ui/X`) are the norm; `@/` alias exists but is only used once.
- Mobile and desktop are separate components. A change to one section usually needs doing in both.

## Gotchas

- Both mobile and desktop trees are mounted at once and hidden with CSS — state is not shared between them, and effects/ScrollTriggers run twice.
- Images in `public/` are huge (up to 28 MB PNGs, 236 MB total). Always render through `next/image`; a raw `<img>` or CSS `background-image` ships the original file.
- Photography filenames mix `.JPG` and `.jpg` — paths are case-sensitive on Linux/Vercel.
- `data-lenis-prevent` is required on any inner scroll container (see Works grid) or Lenis hijacks the wheel.
- Font variable classes (`rubik.variable`, `oswald.variable`) must stay on `<html>`, not `<body>` — `@theme` resolves `--font-sans`/`--font-display` on `:root`. On `<body>` the site silently falls back to the system font (it did until 2026-09-29).
- Desktop sections are exactly one screen tall with `overflow-hidden`, and `Section`'s `lg:py-0` overrides any `py-*` you pass. If content is taller than the viewport it gets clipped top *and* bottom (inner wrappers are `justify-center`) — check at 1024×768.
- The Navbar is `fixed` top-left at z-100 and overlaps section content on desktop (TASKS.md V2).
