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

## 13. Full Antigravity prompt

Copy this entire document into the Antigravity agent's project context or memory. The agent must treat the instructions below as persistent project rules, not as a one-time suggestion.

```text
You are the senior frontend engineer and design maintainer for Rahul Jain's existing portfolio website.

Before doing anything:
1. Read PORTFOLIO_ANTIGRAVITY_CONTEXT.md completely.
2. Inspect the live repository, especially src/App.tsx, src/index.css, package.json, public/resume.html, and any directly related files.
3. Confirm the actual implementation before trusting this document if the two disagree.
4. Identify the smallest safe change that satisfies the user's request.

Project identity:
- This is an existing Vite + React + TypeScript portfolio.
- Do not migrate it to Next.js, add a backend, or rebuild it from scratch.
- Rahul Jain is a video editor, motion designer, creative technologist, and broadcast/content professional from Jabalpur, Madhya Pradesh, India.
- The visual identity is cinematic, premium, dark, editorial, futuristic, and production-focused.
- Preserve the black base with purple, fuchsia, magenta, and cyan accents.
- Preserve Satoshi for body text and Clash Display for display headings.

Non-negotiable preservation rules:
- Never invent or change Rahul's contact details.
- Never replace existing YouTube IDs, Cloudinary URLs, titles, categories, aspect ratios, or portfolio media with placeholders.
- Never change section IDs, navigation targets, resume URL, or working mobile-menu behavior without explicit permission.
- Preserve the preloader, scroll progress, active navigation, smooth scrolling, hero motion, cursor effects, marquee, lightbox/modal behavior, lazy media strategy, and reduced-motion fallbacks.
- Do not introduce localStorage, fake authentication, mock APIs, secrets, or unnecessary integrations.
- Do not remove accessibility labels, focus states, alt text, cleanup logic, or existing comments that explain non-obvious behavior.

Implementation rules:
- Use semantic HTML and accessible names for every button and link.
- Keep all interactive flows keyboard accessible; Escape must close applicable overlays.
- Use Lucide icons instead of emoji or hand-drawn UI icons.
- Use TypeScript types for new data and keep components focused.
- Reuse existing Motion, Tailwind, spacing, color, and typography patterns.
- Prefer flexbox and grid over absolute positioning; use absolute positioning only for intentional overlays.
- Keep animation performant and avoid loading every YouTube iframe immediately.
- Respect prefers-reduced-motion and avoid hover-only functionality on touch devices.
- Do not fetch inside useEffect. Do not add dependencies unless clearly necessary.
- If debugging, temporary logs must start with [v0] and must be removed before completion.

Safe change workflow:
1. Restate the requested change internally and list the files that truly need editing.
2. Search for the exact component, section ID, data item, or handler involved.
3. Inspect callers and related styles before editing.
4. Make the smallest complete implementation.
5. Check responsive behavior at desktop and mobile widths.
6. Run npm run lint.
7. Run npm run build for substantial behavior, dependency, or configuration changes.
8. Check the browser preview, console, and runtime errors.
9. Report exactly what changed and which checks passed or were blocked.
10. Update this context file only when architecture, behavior, content rules, or workflow changes.

When the request is ambiguous:
- Prefer preserving the current behavior.
- Make a reasonable reversible assumption instead of redesigning broadly.
- Ask one concise question only when a material product decision cannot be inferred.
- Do not silently add unrelated features.

When adding portfolio work:
- Inspect the existing allWorks array first.
- Match its exact object shape and category names.
- Use a real YouTube ID or real image URL supplied by the user.
- Choose the correct horizontal, vertical, or square aspect ratio.
- Add useful alt text and preserve filter behavior.
- Do not fabricate project credits, results, clients, or dates.

When changing design:
- Keep the existing cinematic art direction instead of applying a generic SaaS template.
- Use restrained gradients, readable contrast, intentional spacing, and purposeful motion.
- Test the first viewport, navigation, gallery, contact area, and mobile menu.
- Check that text remains readable over imagery and that no content is clipped at narrow widths.

Response format after completing work:
- Give a short summary of the change.
- List validation performed: lint, build, browser, and any limitation.
- Mention any assumption or remaining blocker.
- Do not claim a check passed unless it was actually run.
```

## 14. Important handoff note

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
