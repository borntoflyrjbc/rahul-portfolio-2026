# Rahul Jain Portfolio — Project Context

This file gives any LLM/agent immediate context for working on this project. Read this first.

## What this is

Personal portfolio website for **Rahul Jain** — Video Editor, Graphics & Motion Designer based in Jabalpur, Madhya Pradesh, India.

**Owner contact:** borntoflyrj@gmail.com · +91 99936 81478

## Tech stack

- **Framework:** React 19 + Vite 6 + TypeScript
- **Styling:** Tailwind CSS v4 (uses new `@import "tailwindcss"` + `@theme` syntax — NOT v3)
- **Animation:** Framer Motion (`motion/react`)
- **Icons:** lucide-react
- **Fonts:** Clash Display (loaded via Fontshare CDN)
- **Build output:** ~123 KB gzipped JS, ~14 KB gzipped CSS

## File structure

```
src/
  App.tsx        ← EVERYTHING is here (~1940 lines, single file)
  index.css      ← Global styles, animations (grain, marquee, fadeIn)
  main.tsx       ← Vite entry
index.html       ← Has YouTube/Cloudinary preconnects for perf
package.json     ← name: "rahul-jain-portfolio"
```

`src/App.tsx` contains all components inline. There is no component-per-file split — keep it that way unless explicitly asked.

## Sections (top to bottom in App.tsx)

| Order | Component | What it is |
|---|---|---|
| 1 | `Preloader` | Brand intro animation (~2.4s) before site loads |
| 2 | `ResumeModal` | Glassmorphism modal with full resume — opens via header button |
| 3 | `Header` | Fixed top nav, scroll-aware, mobile hamburger menu |
| 4 | `Hero` | Landing — badge with pulsing dot before "with AI Innovation", h1, CTAs, tools row |
| 5 | `About` | YouTube background video (mobile gets vertical short, desktop wide), experience cards |
| 6 | `ToolsMarquee` | Software icons (Premiere, AE, Ps, Ai, OBS, Sketch) — horizontal scroll on mobile |
| 7 | `AiToolsSection` | Single-row marquee of AI tool names (Runway, Kling, Google Omni Flash, etc.) |
| 8 | `ServicesSection` | 8 expertise cards in 2x4 grid (mobile 2-col, desktop 4-col) |
| 9 | `ClientsSection` | Two-row marquee of client logos in white pill cards (left + right scroll) |
| 10 | `CreativeWorks` | Masonry gallery (1/2/3 col) of YouTube videos + Cloudinary images, filterable |
| 11 | `Contact` | 3 cards: Email, Phone, Location |
| 12 | `Footer` | Minimal copyright row |
| 13 | `ScrollToTop` | FAB visible after 500px scroll |

Cinematic overlays: `.film-grain` and `.vignette` (fixed `z-9999/9998`, disabled on mobile).

## Design system

- **Background:** Pure black `#000000` everywhere (some sections `#050505` / `#0b0b0b` for slight depth)
- **Text:** `#F0F0F0` base; opacity scales (`text-white/70`, `text-white/40`, etc.) for hierarchy
- **Accent gradient:** `from-purple-300 via-fuchsia-300 to-cyan-300` — used for highlighted words in headings
- **Eyebrow labels:** `text-[10px] tracking-[0.35em] uppercase text-purple-400/70 font-medium` — every section has one
- **Headings:** Clash Display, `tracking-tight`, gradient on accent word
- **Body letter-spacing:** `0.015em` globally (set in index.css)
- **Borders:** very subtle — `border-white/[0.05]` to `border-white/[0.12]`
- **Hover lift:** `-translate-y-0.5` to `-translate-y-1` with shadow

## Animation conventions

- **Entry:** `motion.div` with `initial={{ opacity: 0, y: 14-20 }} animate={{ opacity: 1, y: 0 }}` — duration 0.4-0.6s
- **Scroll-triggered:** `whileInView` + `viewport={{ once: true }}` (don't re-trigger)
- **Stagger:** delays 0.05-0.15s between siblings
- **Easings:** prefer `[0.22, 1, 0.36, 1]` (custom ease-out-quart) for premium feel
- **Marquee:** CSS keyframes with `translate3d` for GPU compositing (defined in index.css)
- **Reduced motion:** `@media (prefers-reduced-motion: reduce)` disables grain + marquees

## Mobile considerations (CRITICAL — site is mobile-first)

- **About section:** Different YouTube video on mobile (`X0a5TWVw5Ns` vertical short) vs desktop (`HLwZQqF1xYE` wide). Detected via `window.innerWidth < 768`.
- **VideoCard autoplay:** Two-observer system — preload observer mounts iframe invisibly when card is 400px below viewport, active observer triggers playback at 35% visibility. Result: instant play, no buffer wait.
- **Marquees:** Use `mr-X` instead of `gap-X` for seamless `translate3d(-50%)` loop (gap causes 1px jitter at the wrap point — DO NOT change to gap).
- **Heavy effects disabled on mobile:** film-grain, blur orbs (`hidden md:block`), animated background gradients.
- **Hover detection:** `window.matchMedia("(hover: none)").matches` — captured once via `useRef`.

## Image/video assets

- **Stills:** Cloudinary `res.cloudinary.com/dijteej5k/...`
- **Videos:** YouTube embeds via `youtube-nocookie.com` (lighter, no cookie tracking)
- **Logos:** Cloudinary too. Client logos in `clientLogos` array (~16 brands).
- **Profile photo:** `https://res.cloudinary.com/dijteej5k/image/upload/q_auto/f_auto/v1776566296/image_copy_f4hwky.jpg`

When adding new works, push to `allWorks` array with shape:
```ts
{ id: "youtubeId", title: "...", category: "Video & Motion", aspect: "vertical|aspect-square|horizontal" }
// or for images:
{ type: "image", src: "cloudinary url", title: "...", category: "Graphics & Design" }
```

`getItemTag()` returns "Graphics" for images, "Video & Motion" for videos. Don't reintroduce per-aspect tags.

## Deployment

- **GitHub repo:** https://github.com/borntoflyrjbc/rahul-portfolio-2026
- **Hosting:** Vercel (free Hobby tier), auto-deploy on push to `main`
- **Branch:** `main` only (no dev/staging)
- **Build command:** `vite build` (Vercel auto-detects)
- **No env vars needed**

## Future-changes workflow

```bash
# After editing any file:
git add .
git commit -m "describe the change"
git push
# Vercel auto-deploys in 30-60 seconds
```

User has GitHub credentials cached on Windows — push works without prompt.

## User communication style

- User is **layman** — does not write code. Communicate in **Hindi-English mix (Hinglish)**, simple language.
- User prefers **direct execution** over long explanations: "kar do" means do it, don't ask.
- For deployment/CLI tasks: walk through step-by-step, anticipate confusion.
- Confirm before destructive actions only — for editorial site changes, just do them and `git push`.

## Things NOT to break

1. **Don't restructure App.tsx** into multiple files unless explicitly asked — single-file is intentional.
2. **Don't remove the YouTube IFrame Player API setup** in `About` — it handles auto-restart after end + mobile/desktop video swap.
3. **Don't change marquee `mr-X` to `gap-X`** — breaks seamless loop.
4. **Don't preload too aggressively on mobile** (current rootMargin 400px is the sweet spot — more = bandwidth thrash, less = laggy autoplay).
5. **Don't add per-aspect tags back** to `getItemTag()` — user explicitly removed Short/Reel/Video distinction.
6. **Don't introduce a UI library** (shadcn, MUI, etc.) — design is hand-rolled and intentional.
7. **Don't comment WHAT code does** — well-named identifiers are enough. Only explain WHY for non-obvious things.

## Recent decisions worth remembering

  - **Resume Layout Precision Rules (Locked 22-Oct-2026)**:
    - In Core Skills: use AI Video Generation (Seedance / Kling / Omni Flash) (omit 'Google ' in resume to prevent 2-line wrapping).
    - In Tools & AI Stack (Resume only):
      - Video Editing & Post: Adobe Premiere Pro, After Effects, Adobe Audition (omit OBS Studio & Color Grading).
      - Graphic & Motion Design: Photoshop, Illustrator (omit Social Media Content).
      - Generative AI Video & Voice: Seedance, Kling, Omni Flash, Runway, ElevenLabs, Midjourney.
      - Code & Development: VS Code (omit Cursor IDE & Workflow Automation in resume).
    - Ensures right column aligns with left column and never causes page stretching.
  - **Featured Gallery Curation Order (Locked 22-Oct-2026)**:
    - Position 1 (Top Hero Work): DxlG4S1B7jI (CGI AI Product Commercial)
    - Position 2: OEVnJtqnaLc (SAM — End of Season Sale)
    - Position 3: GRZH515PBiw (SAM Parking AI Commercial)
    - Position 4: Fa2lhAShL34 (SAM Event AI Commercial)
    - Gallery Middle: V6aM_ugfihs (SAM — Battle of the Bands) and gSmx6HeQPWI (Amrit Bharat Station — Gangapur City Teaser)
    - Gallery Lower: WHUFW_fuk5k (AI Promotion Commercial) and ZT5UbhJlM94 (Rail Talk — Official Railway Podcast)
  - **Core Skills Clean Rules (Locked 22-Oct-2026)**:
    - Zero percentages (%) on skills bars in resume (clean titles with animated gradient lines only).
    - Exact 6 Core Skills:
      1. Video Editing (Premiere Pro)
      2. Motion Graphics (After Effects)
      3. AI Video Generation (Seedance / Kling / Google Omni Flash)
      4. AI Voiceover & Music Generation (ElevenLabs / Suno)
      5. AI Image Generation (Midjourney / Concept Design)
      6. AI Graphics & Visual Design (Photoshop / Illustrator)
  - **Resume & Tools Stack Rules (Locked 22-Oct-2026)**:
    - Zero 'Available for work' badges on resume (clean header only).
    - ZERO 'Veo' mentions — ALWAYS write 'Google Omni Flash' everywhere in portfolio and resume.
    - 'Tools & AI Stack' in resume and modal must ALWAYS be systematically categorized into 4 tiers:
      1. Video Editing & Post-Production (Premiere, AE, Audition, OBS, Lumetri)
      2. Graphic & Motion Design (Photoshop, Illustrator, Social Media Content)
      3. Generative AI Video & Voice (Seedance, Kling, Google Omni Flash, Runway, ElevenLabs, Midjourney)
      4. Workflow Automation & IDE (VS Code, Cursor IDE, Workflow Automation)
- **Locked 21-Oct-2026 Decisions (CRITICAL)**:
  - **Forbidden terms completely banned**: ZERO mentions of 'XML', 'vibe coding', 'Python/TypeScript scripting', 'Figma', 'Sketch', or 'DaVinci Resolve' across the entire codebase (src/App.tsx, public/resume.html, dist/).
  - **Tool names cleaned**: Version numbers stripped (Seedance, Kling, Google Omni Flash, Runway, ElevenLabs, Midjourney). Added VS Code (with custom SVG logo) & Cursor IDE / Workflow Automation. Added Illustrator to Hero bottom strip.
  - **Company & Railway names locked**: 'CIN News Network, Jabalpur' (strictly CIN, not CI) and 'Degree 360, Delhi · Project: West Central Railway (WCR)' (never 'Degree 360 | Remote' on public cards/resume).
  - **Header navigation (Strictly 5 items)**: 1-to-1 matching section titles: About (#about), Expertise (#services), Showreel (#showreel), My Work (#creative-works), Contact (#contact) + Top-Right Resume CTA. No internal experimental 'AI Studio' links.
  - **AI Studio 5 Pure AI Modes Architecture (Updated 22-Oct-2026)**:
    - Traditional 'Motion Graphics & VFX' completely removed from the AI section (traditional editing lives in ToolsMarquee/Expertise).
    - AI Studio strictly features 5 Pure AI modes:
      1. AI Image & Video (Seedance, Kling, Google Omni Flash, Runway, Midjourney)
      2. AI Music & Voice (ElevenLabs, Suno, Adobe Audition, Premiere Pro Sound)
      3. AI Avatar & Presenter (Hedra, LivePortrait, OmniHuman, ElevenLabs)
      4. AI Editing Automations (Automated Pipelines, Whisper AI, Smart Scene Detection, Auto-Captions)
      5. AI Agentic Workflows (VS Code, Cursor IDE, Autonomous Agents, Workflow Scripts)
  - **Hero 3D Canvas (Hero3DCanvas)**: Three.js WebGL canvas at z-[2] with 16:9 cinema viewfinder, 9:16 vertical reel frame, dual CatmullRom timeline curves, optical aperture rings, 420 volumetric cinema dust motes, and smooth mouse parallax.

- **Preloader subtitles** are NOT uppercase ("Video Editor" not "VIDEO EDITOR") — user explicitly fixed this.
- **Hero badge dot** sits BEFORE "with AI Innovation" gradient text, not at the start of the badge.
- **Client logo cards** are large (170-210px wide, 90-110px tall) with subtle gradient bg + ring + soft shadow — user explicitly wanted bigger boxes with glassmorphism feel.
- **Resume opens in modal** (not PDF download) — glassmorphism dark UI, scan-line entry animation.
- **About section is centered** on all screens (not split-layout).

## Quick reference: where common things live in App.tsx

- `allWorks` array: lines ~40-177 — all gallery items (videos + images)
- `services` array: lines ~179-186 — alternative services list (currently unused, prefer `serviceCards`)
- `serviceCards` array: lines ~1312-1385 — 8 expertise cards rendered in `ServicesSection`
- `clientLogos` array: lines ~1207-1224 — brands rendered in marquee
- `aiToolsRow1`: line ~1137 — tool names in AI marquee
- `experiences` array: lines ~845-867 — work history shown in About
- `Preloader`: lines ~189-283
- `Hero`: lines ~678-841
- `VideoCard`: lines ~1509-1641
- `getItemTag`: lines ~1450-1452

(Line numbers approximate — search by name if shifted.)
