# Tasks

Audit baseline: 2026-09-29 at commit `3466912`. `tsc` clean · `eslint` 6 errors / 7 warnings · `npm audit` 1 critical, 3 high.
Format: `- [ ] **ID** what — where. why.` Tick with `[x]` and add the commit hash when done.

## P0 — Security & broken things

- [ ] **S1** Upgrade `next` 16.0.10 → 16.3.x (critical: RSC deserialization DoS, request smuggling, image-optimizer DoS; also clears the bundled `postcss`/`nanoid` highs). Bump `react`/`react-dom`/`eslint-config-next` to match.
- [ ] **S2** Drop `sharp` from `package.json` (high: libvips/libheif CVEs). Next installs its own copy for image optimization; the explicit dep only pins an old one. If it's kept, bump to 0.35.5+.
- [x] **B1** Removed dead `previewPages` from config. — 2026-09-29
- [x] **B2** `page.tsx` now renders a `sections` array into `<div id>` wrappers: one `<main>` (layout), no duplicate `id="landing"`, no nested sections. — 2026-09-29
- [ ] **B3** Navbar links bypass Lenis: `Navbar.tsx` `scrollToSection` calls native `scrollIntoView`, which fights Lenis's smooth scroll. Expose the Lenis instance and call `lenis.scrollTo(el)`.
- [ ] **B4** No navigation on mobile: Navbar is `hidden md:block`, so phones get no nav at all. Add a mobile nav or confirm it's intentional.

## P1 — Performance (the site's main problem)

- [ ] **P1** `public/` is 236 MB; single PNGs are up to 28 MB (`graphics-design-7.png`, `graphics-design-1.png`, `left-photo.png`, `landing-page-photo-final.png`). Re-export sources to ≤ ~2560px WebP/AVIF (or high-quality JPG). This is the biggest win on the site and also shrinks the repo.
- [x] **P2** (done 2026-09-29, uncommitted) `WorksDesktop.tsx` renders the grid as CSS `background-image` and the lightbox as `motion.img`, which ships the original 28 MB files unoptimized. Switch both to `next/image` (`fill` + `sizes`; `object-contain` in the lightbox).
- [x] **P3b** Speed pass (2026-09-29): Preloader total ~3.5 s → ~1.5 s (counter 0.7 s, lift 0.6 s, no extra delay); Lenis `duration` 2.2 → 1.1; FadeIn default 0.8 s → 0.5 s, stagger delays halved, and `once: true` (no replay on every scroll).
- [ ] **P3** (partly — see P3b) The Preloader is a fake 2.5 s timer (`Preloader.tsx`) that blocks the page on every visit and isn't tied to real loading. Delete it, or cut it to ~1 s and skip it on repeat visits via `sessionStorage`. Its "Loading Portfolio" text is `brand-text/30` on `zinc-950`, which is effectively invisible.
- [x] **P4** ParallaxText jitter: ScrollTrigger was out of sync with Lenis. Fixed by moving ParallaxText to framer-motion `useScroll` (see L1).
- [ ] **P4b** (duration done in P3b) `SmoothScroll.tsx` Lenis `duration: 2.2` is very floaty; try ~1.2. Could also use Lenis `autoRaf: true` instead of the hand-rolled rAF loop.
- [x] **P5** Dropped `"use client"` from `app/page.tsx`. — 2026-09-29
- [ ] **P6** Both mobile and desktop trees mount on every device (CSS-hidden), which doubles animations, GSAP tweens and `priority` image loads (About mobile+desktop both mark the same portrait `priority`). Acceptable for now; revisit only if P1–P5 aren't enough.
- [ ] **P7** `PapersDesktop/Mobile.tsx` hotlink a texture from `transparenttextures.com` (external runtime dependency). Vendor it into `public/` or drop it; it renders at 3% opacity.

## P2 — Dead code & hygiene

- [x] **H1** Lint is clean: typed SkillCard/SkillInfoDisplay/MobileSkillIcon props, Button anchor spread, EducationCard `cardTitle`, useContactForm now takes just `email`. — 2026-09-29
- [x] **H2** Removed: unused imports, Navbar dead scroll listener/position tween/`<main>` fallback, ParallaxText `speed`, Tilt `glareOpacity`, useInfiniteLoop `itemWidth`, the behance/github filter, Section snap classes, unused config keys, dead CSS (`:root {}`, commented scroll lock, `.perspective-1000`, `.papers-description-container`). Also replaced the 6 `X.tsx` mobile/desktop switchers with one `ui/Responsive.tsx`. — 2026-09-29
- [ ] **H3** (partly done 2026-09-29: resume link → `contact.resumeUrl`, Signature → `personal.name`. Remaining: content decisions) Hardcoded content → config: Contact uses a literal `/downloadable-documents/Gatchalian_Resume.pdf` even though `contact.resumeUrl` exists; `EducationDesktop` hardcodes "EDUCATION"; `Signature.tsx` and the Contact footers hardcode names (and mobile vs desktop disagree: "AE-DAM"/"Neil Brags" vs full names); copyright says 2025.
- [x] **H4** Bun only: deleted `package-lock.json` (gitignored), regenerated `bun.lock`. — 2026-09-29 (uncommitted)
- [ ] **H5** Dependency naming: code imports `framer-motion`, but `package.json` only lists `motion`, so it works by transitive luck. Either change imports to `motion/react` or depend on `framer-motion` directly.
- [ ] **H6** README is stale (also still says "glassmorphism"): the example config shape and color format don't match the real `portfolio.ts`/`globals.css`. Trim it to what's true or point it at CLAUDE.md.
- [ ] **H7** Normalize the `.JPG`/`.jpg` extensions in `works-assets/photography` (case-sensitive hosts). Fold into P1.
- [ ] **H8** The Linux machine commits as `you@example.com` (commit `3466912`). Set `git config --global user.email` there.

## Visual bugs (from headless screenshots, 2026-09-29)

- [x] **V1** Fonts: moved `rubik.variable`/`oswald.variable` to `<html>`; Rubik + Oswald now actually render. Re-tuned desktop Contact spacing (it overflowed and clipped "REACH OUT!" with the taller Oswald). — 2026-09-29
- [x] **V2** Navbar overlap: collapsed the Navbar to a single menu button that slides the section buttons out on hover/focus, so at rest it no longer covers section content. (The expanded bar still overlays content while open — intended.) — 2026-09-29
- [ ] **V3** Phone overlaps: Landing tagline + signature sit on top of the portrait; Skills icons cover the "SKILLS" heading; the Works category `<select>` covers the "WORKS" heading; ParallaxText pushes "PAPERS" down over the "Published Paper" label and description; "EDUCATIONAL" / "BACKGROUND" lines touch (`leading-[0.8]`).
- [x] **V4** Desktop Contact clipping + crowded credits — fixed with V1 (content was 807px in a 785px box). At 1024 wide the Navbar still covers the heading → V2.
- [x] **V5** Education desktop fits at 1440×900 and 1024×768 (vertically centered layout instead of stacked `pt-32`+`mt-20`+`mt-40`); tree items now select on hover instead of click. — 2026-09-29
- [x] **V7** About desktop: replaced the oversized 140%-wide "WHO AM I?" card (only there to hide the photo's hard crop) with a CSS mask fade on the portrait + plain title over the fade. — 2026-09-29
- [ ] **V8** About desktop at 1024×768: the bio column is taller than the screen, so the first paragraph is clipped at the top and the quote falls off the bottom (was like this before V7).
- [x] **V9** Replaced glassmorphism site-wide with 3D surfaces (`surface-raised` / `surface-inset` utilities); deleted `GlassCard`. — 2026-09-29
- [x] **V10** Skills desktop: replaced the infinite carousel (7 skills repeated 6×, always moving, hover-to-pause) with a static row of all 7 icons + always-visible names; hover still fills the detail panel. Deleted `hooks/useInfiniteLoop.ts`. — 2026-09-29
- [ ] **K1** Content (for Ae-dam): skill descriptions are generic Adobe product blurbs. Replace each with what *she* does with the tool (e.g. "Photo compositing and posters for FAME events") — `config/portfolio.ts` `skills.items[].description`.
- [ ] **V6** Section headings use 6 different treatments (embossed card, gradient sheen, ghost word, 2%-opacity ghost word that's invisible on Works, solid pink). Pick one or two.

## Structure

- [ ] **C1** Merge mobile/desktop pairs into single responsive components where the layouts are really the same content re-flowed (About, Education, Papers, Contact are good candidates; Works and Skills genuinely differ). Halves the upkeep and fixes the mobile/desktop drift. Do after V1–V6 so it's not merging buggy layouts.

## P3 — Accessibility & polish

- [ ] **A1** Clickable `<div>`s with no keyboard support: EducationTree items, EducationMobile rows, and the paper cards. Make them `<button>`s.
- [ ] **A2** The Works lightbox has no Escape-to-close and no focus handling (PaperViewer has Escape, so reuse that pattern). Alt text is `Work 0`, `Work 1`…; give it at least the category name.
- [ ] **A3** No `prefers-reduced-motion` handling anywhere (Lenis, FadeIn, the Education sheen loop). Add `<MotionConfig reducedMotion="user">`, a Lenis guard, and a `motion-reduce:animate-none` on the CSS keyframe animations.
- [ ] **A4** `PaperViewer.tsx` returns `null` before `<AnimatePresence>`, so its exit animation never runs. Also, iframe PDF preview doesn't render on iOS Safari, so fall back to opening the PDF in a new tab on mobile.
- [ ] **A5** SEO/meta: no favicon, no Open Graph/Twitter image, no `metadataBase`. Add them in `app/layout.tsx` plus `app/icon.png` / `app/opengraph-image.png`.
- [x] **A6** Fixed with V5. — 2026-09-29

## Later / only if needed

- [x] **L1** Removed GSAP (`gsap`, `@gsap/react`). ParallaxText → framer `useScroll`; Navbar magnification + Magnetic → inline transform + CSS transition; Education sheen/card switch + PaperViewer entrance → CSS keyframes in `globals.css`. Also deleted Navbar's no-op position tween and dead `isLanding` scroll listener. — 2026-09-29 (uncommitted)

## Done

- [x] Synced Mac checkout to `origin/main` (`3466912`), removed stray `public/node_modules/` (448 MB). — 2026-09-29
