# Rahul Jain Portfolio — Antigravity Agent Context

> This file is the source-of-truth handoff prompt for any future AI agent working on this portfolio. Read it completely before changing the project.

## 1. Primary instruction

You are continuing an existing portfolio website for **Rahul Jain**, a video editor, motion designer, creative technologist, and broadcast/content professional based in **Jabalpur, Madhya Pradesh, India**.

Do not rebuild the portfolio from scratch. First inspect the current implementation, then make the smallest complete change needed. Preserve working content, YouTube IDs, Cloudinary URLs, navigation behavior, animations, responsive layout, and existing visual identity unless the user explicitly asks for a redesign.

The website is a cinematic, dark, award-style creative portfolio. It should feel premium, editorial, immersive, and production-focused rather than like a generic developer template.

## 2. Project stack

- Runtime: Vite + React + TypeScript
- Package manager: use the existing lockfile/package manager
- Dev command: `npm run dev`
- Build command: `npm run build`
- Type check: `npm run lint`
- Preview port: `3000`
- Main app: `src/App.tsx`
- Global styles: `src/index.css`
- Static resume page: `public/resume.html` if present
- Dependencies include React 19, Motion, Lucide React, Tailwind CSS 4, Vite, and TypeScript.

Do not migrate to Next.js or add a backend unless the user specifically requests it. This is currently a client-side portfolio and does not require a database for its existing content.

## 3. Brand and visual direction

### Mood

Cinematic, futuristic, confident, creative, high-contrast, editorial, and polished. The site should communicate professional video production and motion design capability within the first viewport.

### Colors

- Base: pure black `#000000`
- Primary text: near-white `#F0F0F0`
- Accent 1: purple / violet
- Accent 2: fuchsia / magenta
- Accent 3: cyan
- Supporting borders and surfaces: translucent white and dark gray

Use the existing purple–fuchsia–cyan gradient language. Avoid random colors, pastel business-dashboard styling, excessive cards, or generic blue SaaS styling.

### Typography

- Body: **Satoshi** from Fontshare
- Headings/display: **Clash Display** from Fontshare
- Preserve the existing font imports and typography tokens in `src/index.css`.
- Use large expressive display typography for hero moments and compact uppercase labels for metadata.

### Effects

The existing design intentionally uses:

- Film grain overlay on desktop
- Vignette/depth treatment
- Aurora gradient blobs
- Shimmering gradient text
- Scroll progress bar
- Custom desktop cursor with hot/hover state
- Motion-driven hero parallax
- Tilted showcase cards and hover glare
- Marquee strips
- Smooth scrolling
- Reduced-motion fallbacks

These effects are part of the identity. Keep them performant and accessible. Disable or reduce them on mobile/reduced-motion devices as the existing code does.

## 4. Portfolio owner content

### Contact

- Name: Rahul Jain
- Location: Jabalpur, M.P., India
- Phone: `+91 99936 81478`
- Email: `borntoflyrj@gmail.com`

Use the existing contact links and do not invent replacement contact details.

### Core positioning

Rahul is a video editor and motion designer who combines storytelling, editing, motion graphics, AI-assisted production, graphic design, live broadcasting, and digital content strategy.

### Software and tools

- Adobe Premiere Pro
- After Effects
- Photoshop
- Illustrator
- Audition
- OBS Studio
- WordPress

### AI and generative tools

- AI Video Production
- Midjourney
- Runway ML
- ElevenLabs
- Prompt Engineering
- Kling AI

### Design and motion

- Motion Graphics
- UI/UX Design
- Brand Identity
- Social Media Design
- Video Editing
- Digital Marketing

### Broadcast and production

- Live Broadcasting
- Camera Operation
- News Production
- Social Media Management
- Content Strategy

## 5. Existing page structure

The main page is a single-page portfolio with these meaningful sections and IDs:

1. **Hero** — identity, role, cinematic introduction, running timecode, tool chips, parallax visuals, primary CTA to showreel, secondary CTA to contact.
2. **About** — professional story and positioning.
3. **Expertise / Services** — video production and editing, motion graphics, graphic design/visual identity, live broadcast/content production, and related creative services.
4. **Showreel / Creative works** — portfolio gallery with filters.
5. **Skills / Experience** — resume-style experience and skill presentation.
6. **Contact** — email, phone, location, and final CTA.
7. **Footer** — compact contact/navigation information.

The header has desktop navigation and a mobile menu. Navigation scrolls to sections with an 80px offset and tracks the active section while scrolling.

## 6. Portfolio data rules

The canonical portfolio data lives in `src/App.tsx` in the `allWorks` array.

Categories:

- `All Work`
- `Video & Motion`
- `Graphics & Design`

Video items use YouTube IDs and may be:

- `horizontal` / 16:9
- `vertical` / 9:16
- `aspect-square` / 1:1

Graphics items use Cloudinary image URLs. Preserve all current IDs, titles, categories, aspect ratios, and image URLs. Do not replace working media with placeholders. When adding a new work, append it to the appropriate section and use the correct media type and aspect ratio.

Pinned featured work currently includes:

- SAM — End of Season Sale
- Save Environment — World Environment Day 2026
- Dr. Paul – Video 3
- Railway Safety — जल्दबाज़ी जीवन पर भारी
- Train Me Pet Kaise Le Jaye — Railway Rules
- Udyam Project Edit
- Cinematic Ad
- Cinematic 4K Showreel
- Udyam Villa

The page includes many additional horizontal, square, vertical, and graphic-design pieces. The full list in `src/App.tsx` is authoritative and must be inspected before modifying gallery behavior.

## 7. Interaction and behavior requirements

Preserve these behaviors:

- Preloader with a roughly 2.4-second cinematic loading sequence.
- Header changes styling after scrolling.
- Desktop and mobile navigation both work.
- Mobile menu closes after selecting a section.
- Resume opens `/resume.html` in a new tab with `noopener noreferrer`.
- Resume modal, if used in the current flow, closes on Escape and locks body scroll while open.
- Smooth anchor scrolling accounts for the fixed header.
- Portfolio category filters update visible items.
- Video cards open/play the associated YouTube work using the existing implementation.
- Image work opens in the existing lightbox/modal behavior.
- Escape closes open overlays/modals where applicable.
- Hover effects should not be required for mobile users.
- All interactive elements must remain keyboard accessible.
- Respect `prefers-reduced-motion`.

## 8. Accessibility and quality rules

- Use semantic HTML where possible.
- Every meaningful image needs useful alt text; decorative layers should be hidden from assistive technology.
- Buttons and links must have clear accessible names.
- Do not rely on color alone to communicate state.
- Preserve visible focus states.
- Keep contrast readable over gradients and imagery.
- Do not use emoji as UI icons; use the existing Lucide icons.
- Do not add `localStorage`, mock auth, fake backend data, or unnecessary integrations.
- Avoid fetching data inside `useEffect`.
- Clean up animation frames, event listeners, and observers.
- Avoid performance regressions from loading every video iframe immediately; preserve lazy loading or the existing deferred media strategy.

## 9. Code conventions

- Keep components understandable and split new substantial UI into focused components.
- Use TypeScript types for new data structures.
- Reuse existing Motion and Lucide patterns.
- Prefer Tailwind utility classes consistent with the current codebase.
- Keep global CSS additions in `src/index.css` and avoid scattering style hacks.
- Do not remove existing comments that explain non-obvious behavior.
- Do not add debug logs permanently. Temporary debug logs must use the prefix `[v0]` and be removed after debugging.
- Do not make unrelated formatting or dependency changes.

## 10. Safe workflow for future changes

1. Read this file.
2. Inspect `src/App.tsx`, `src/index.css`, `package.json`, and any directly related asset/component files.
3. Search for the exact section, component, ID, or data item that must change.
4. Make the smallest complete edit.
5. Run `npm run lint`.
6. Run `npm run build` for build/config/dependency changes or when behavior is substantial.
7. Verify user-visible changes in the browser at desktop and mobile widths.
8. Check browser errors and console errors.
9. Summarize what changed and mention any validation that could not run.

## 11. Do not accidentally change

Unless explicitly requested, do not change:

- The portfolio owner's identity or contact information
- The existing YouTube work IDs
- Cloudinary asset URLs
- Section IDs used by navigation
- Resume URL `/resume.html`
- Font family direction
- Dark cinematic visual identity
- Mobile menu behavior
- Reduced-motion behavior
- Existing gallery filters
- The project from Vite to another framework

## 12. Copy-paste continuation prompt

Use the following prompt whenever starting work in another agent:

> You are continuing Rahul Jain's existing cinematic portfolio. Read `PORTFOLIO_ANTIGRAVITY_CONTEXT.md` completely, then inspect `src/App.tsx`, `src/index.css`, `package.json`, and any directly relevant files before editing. Do not rebuild or migrate the app. Preserve all existing portfolio content, YouTube IDs, Cloudinary URLs, section IDs, contact details, resume link, responsive behavior, animations, and dark purple/fuchsia/cyan visual identity. Make only the smallest complete change requested. Follow the accessibility, performance, reduced-motion, and validation rules in the context file. After editing, run the relevant type-check/build checks and verify the visible result in a browser.

## 13. Important handoff note

This document is a maintained memory/handoff file, not a replacement for the source code. If this document conflicts with the live implementation, inspect the live implementation and update this document after confirming the new behavior. Never put API keys, passwords, tokens, or private credentials in this file.

_Last updated: 2026-10-16._

---

## Agent acknowledgement checklist

Before making a change, confirm internally:

- [ ] I understand this is a Vite React portfolio, not a Next.js app.
- [ ] I read the relevant live code instead of relying only on this document.
- [ ] I will preserve existing media data and contact details.
- [ ] I will keep the cinematic black/purple/fuchsia/cyan direction.
- [ ] I will preserve responsive and reduced-motion behavior.
- [ ] I will validate the changed user-visible behavior.
- [ ] I will not add secrets or unnecessary integrations.

After the change:

- [ ] Type-check/build completed or the blocker is reported.
- [ ] Browser verification completed for visible behavior when applicable.
- [ ] This context file is updated if architecture or behavior changed.

## End of context

Proceed only after reading the entire file and the live source files.
