# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project structure

The entire site lives in `embedded-portfolio/` — a Next.js 15 App Router project (TypeScript, Tailwind CSS v4, shadcn/ui, Framer Motion via `motion/react`).

```
embedded-portfolio/
  app/
    layout.tsx          # Root layout: ThemeProvider, Navbar, ScrollToTop, Vercel Analytics
    page.tsx            # Single-page home: Hero → DownloadsRow → About → Projects → Contact
    globals.css         # Tailwind v4 @theme tokens + dark mode
    actions/contact.ts  # Server Action — sends email via Resend
    projects/
      page.tsx          # /projects grid (case-study index)
      [slug]/page.tsx   # Dynamic case-study detail; project-alpha has a bespoke layout
  components/
    sections/           # Hero, About, Projects, Contact (home page sections)
    MotionInView.tsx    # Reusable scroll-triggered fade-in wrapper (Framer Motion)
    Navbar.tsx          # Fixed nav; handles hash-scroll vs. full-nav routing
    DownloadsRow.tsx    # Resume PDF / GitHub / LinkedIn quick-links
    ThemeProvider.tsx   # next-themes wrapper
    ThemeToggle.tsx     # Dark/light toggle button
    ScrollToTop.tsx     # Scroll-to-top button
  lib/
    projects.ts         # Source of truth for all project data (Project type + projects array)
  public/
    images/             # headshot.jpg, img1–3.jpg (used as cover images)
    resume/resume.pdf
```

## Commands

All commands must be run from the `embedded-portfolio/` directory.

```bash
cd embedded-portfolio

npm run dev      # start dev server at http://localhost:3000
npm run build    # production build
npm run lint     # ESLint
```

## Key architecture decisions

**Adding / editing projects** — all project data lives in `lib/projects.ts` as a typed array. Each entry drives both the `/projects` index card and the `/projects/[slug]` detail page. The `[slug]/page.tsx` currently renders a richer bespoke layout only for `project-alpha`; all other slugs fall through to a compact generic layout.

**Contact form** — uses React 19's `useActionState` + `useFormStatus` wired to a Server Action (`app/actions/contact.ts`). Requires three env vars at runtime: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`.

**Animations** — `MotionInView` wraps any content that should fade in on scroll. It respects `useReducedMotion` via the Navbar; new animated sections should use it consistently.

**Theme** — dark/light via `next-themes`. Dark variant is `.dark *` (set in `globals.css`). The `ThemeProvider` must wrap everything and `suppressHydrationWarning` is set on `<html>`.

**Routing** — the site is mostly a single-page app; `/#about`, `/#projects`, `/#contact` are smooth-scrolled in-page. The Navbar differentiates `"hash"`, `"route"`, and `"home"` link kinds to handle cross-page hash navigation correctly.

## Env vars (local dev)

Create `embedded-portfolio/.env.local`:

```
RESEND_API_KEY=re_...
CONTACT_TO_EMAIL=you@example.com
CONTACT_FROM_EMAIL=noreply@yourdomain.com
```

---

## Design Skills

The following two sections define how Claude Code should approach all frontend design work in this project — new components, redesigns, and visual polish. Both sets of rules apply automatically whenever touching UI code.

---

### Skill: Anti-Slop Frontend Design (design-taste-frontend)

> Applies to: landing pages, portfolios, new components, any visual UI work.
> None of these rules fire blindly — read the brief first, then pull what fits.

#### Brief Inference — Read the Room First

Before writing any code, infer the design direction from:
1. **Page kind** — landing, portfolio, case study, editorial, redesign
2. **Vibe words** — "minimalist", "dark tech", "premium", "agency", "Linear-style", "brutalist"
3. **Reference signals** — URLs, screenshots, named products or brands
4. **Audience** — recruiter, hiring manager, design-conscious peer, B2B buyer
5. **Existing brand assets** — color, type, photography already in the project
6. **Quiet constraints** — accessibility-first, public-sector, trust-first contexts override aesthetics

State a one-line **Design Read** before generating: `"Reading this as: <page kind> for <audience>, with a <vibe> language, leaning toward <design system or aesthetic family>."`

If the brief is ambiguous, ask **one** clarifying question. If you can confidently infer, proceed.

**Anti-Default Discipline:** Never default to AI-purple gradients, centered hero over dark mesh, three equal feature cards, generic glassmorphism on everything, Inter everywhere, or infinite-loop micro-animations. These are the LLM defaults — reach past them.

#### The Three Dials

After reading the brief, set three dials that gate every layout, motion, and density decision:

- `DESIGN_VARIANCE` — 1 (perfect symmetry) to 10 (artsy chaos). **Default: 8**
- `MOTION_INTENSITY` — 1 (static) to 10 (cinematic/physics). **Default: 6**
- `VISUAL_DENSITY` — 1 (art gallery/airy) to 10 (cockpit/packed data). **Default: 4**

| Signal | VARIANCE | MOTION | DENSITY |
|---|---|---|---|
| minimalist / clean / calm / Linear-style | 5–6 | 3–4 | 2–3 |
| premium consumer / Apple-y / luxury | 7–8 | 5–7 | 3–4 |
| playful / Awwwards / experimental / agency | 9–10 | 8–10 | 3–4 |
| landing page / portfolio (default) | 7–9 | 6–8 | 3–5 |
| trust-first / public-sector / a11y-critical | 3–4 | 2–3 | 4–5 |

For this portfolio: default to **developer portfolio preset** → `VARIANCE: 6 / MOTION: 5 / DENSITY: 4`.

#### Stack Defaults (this project already has these)

- **Framework:** Next.js 15 App Router, React Server Components
- **Styling:** Tailwind v4 — use `@tailwindcss/postcss`, NOT `tailwindcss` plugin in postcss config
- **Animation:** `motion/react` (import `{ motion }` from `"motion/react"`)
- **Icons:** Phosphor (`@phosphor-icons/react`), Tabler (`@tabler/icons-react`), or Radix icons. **Discouraged:** Lucide by default (it's the AI default)
- **State:** `useMotionValue` / `useTransform` for continuous pointer/scroll values — never `useState` for these
- **Viewport:** Always `min-h-[100dvh]` for full-height sections, never `h-screen`
- **Grid:** CSS Grid for multi-column. Never complex flexbox percentage math (`w-[calc(33%-1rem)]`)

#### Typography Rules

- **Display headlines:** `text-4xl md:text-6xl tracking-tighter leading-none`
- **Body:** `text-base leading-relaxed max-w-[65ch]`
- **Font choice:** Geist, Outfit, Cabinet Grotesk, or Satoshi as defaults. **Inter is discouraged as default.** Specifically banned as defaults: `Fraunces` and `Instrument_Serif`.
- **Italic descenders:** If italic display text contains `y g j p q`, use `leading-[1.1]` minimum + `pb-1` reserve — `leading-none` clips descenders.
- **Eyebrow restraint:** Max 1 eyebrow label per 3 sections. Do not put `text-xs uppercase tracking-widest` above every section header.

#### Color Rules

- Max 1 accent color. Saturation < 80%.
- **No AI purple/blue glow** as default. Use neutral bases (Zinc/Slate/Stone) + one considered accent.
- One gray family per project — no mixing warm and cool grays.
- **Color consistency lock:** once an accent is chosen, it applies everywhere on the page.
- Tint shadows to the background hue — no pure black drop shadows.

#### Layout Rules

- **Hero must fit in the initial viewport** — headline max 2 lines, subtext max 20 words, CTAs visible without scroll.
- **Hero top padding cap:** max `pt-24` at desktop.
- **Hero stack:** max 4 text elements (eyebrow OR brand strip, headline, subtext, CTAs). No feature bullets, trust strips, or pricing teasers inside the hero.
- **Anti-center bias:** when `DESIGN_VARIANCE > 4`, avoid centered-everything layouts. Use split-screen, left-aligned, or asymmetric structures.
- **Section-layout repetition ban:** each layout family (3-col cards, split image+text, full-width quote) used at most once per page.
- **Zigzag cap:** max 2 consecutive image+text zigzag sections. Break the 3rd with a different layout family.
- **No split-header default** (big headline left, small explainer right) — stack vertically instead.
- **Bento cells:** exactly as many cells as you have content for. No empty cells.
- **Nav:** single line on desktop, max 80px height.

#### Interactive States (always implement all of these)

- **Hover:** background shift, scale, or translate
- **Active/pressed:** `scale-[0.98]` or `-translate-y-[1px]`
- **Transitions:** 200–300ms on all interactive elements
- **Focus ring:** visible, WCAG-compliant — non-negotiable
- **Loading:** skeleton loaders matching final layout shape, not generic spinners
- **Button contrast:** WCAG AA minimum (4.5:1 body, 3:1 large text). No white text on white button.
- **CTA wrap ban:** button labels must fit on one line at desktop. 3 words max for primary CTAs.
- **No duplicate CTA intent:** one label per intent per page ("Get in touch" and "Contact me" on the same page is a fail).

#### Motion Rules

- **Motion must be motivated:** every animation must communicate hierarchy, storytelling, feedback, or state transition. "It looks cool" is not valid.
- **Marquee max 1 per page.**
- **If `MOTION_INTENSITY > 4`:** the page must actually move — entry transitions on hero, scroll-reveal on key sections, hover physics on CTAs at minimum.
- **Spring physics default:** `type: "spring", stiffness: 100, damping: 20` — no linear easing.
- **Animations:** use `transform` and `opacity`. Never animate `top`, `left`, `width`, `height`.
- **`prefers-reduced-motion`:** always respect it via `useReducedMotion()`.

#### Content Rules

- No Lorem Ipsum. Write real draft copy.
- No AI copy clichés: "Elevate", "Seamless", "Unleash", "Next-Gen", "Game-changer", "Delve", "Tapestry".
- No "Oops!" error messages. Be direct: "Connection failed. Please try again."
- No exclamation marks in success messages.
- Sentence case for headers, not Title Case On Every Word.
- No fake-precise invented numbers (`92%`, `4.1×`) unless from real data or explicitly labeled as mock.

#### Pre-Flight Checklist (mandatory before declaring any UI task done)

- [ ] Design Read stated
- [ ] Dials set and consistent with the read
- [ ] Hero fits initial viewport on desktop and mobile
- [ ] No eyebrow above every section
- [ ] No duplicate CTA intent
- [ ] All button labels fit on one line at desktop
- [ ] All interactive states implemented (hover, active, focus, loading, error)
- [ ] `min-h-[100dvh]` used for full-height sections
- [ ] No `useState` for continuous pointer/scroll values
- [ ] `prefers-reduced-motion` respected
- [ ] Every animation has a stated reason
- [ ] No pure black shadows
- [ ] Accent color used consistently throughout

---

### Skill: Redesign Existing Projects (redesign-existing-projects)

> Applies to: any task involving "redesign", "make this look better", "fix the UI", "polish this", or when handed existing code to upgrade.
> **Rule: work with the existing stack. Do not migrate frameworks or styling libraries.**

#### Workflow

1. **Scan** — read the codebase, identify framework, styling method, current patterns
2. **Diagnose** — run through the audit below, list every generic pattern and weak point found
3. **Fix** — apply targeted upgrades in priority order (see Fix Priority below)

#### Design Audit: What to Look For and Fix

**Typography**
- Browser default fonts or Inter everywhere → replace with Geist, Outfit, Cabinet Grotesk, or Satoshi
- Headlines lack presence → increase size, tighten `letter-spacing`, reduce `line-height`
- Body text too wide → cap at `max-w-[65ch]`, increase `line-height`
- Only weights 400 and 700 used → introduce 500 and 600 for subtler hierarchy
- All-caps subheaders everywhere → try lowercase italic or sentence case instead
- Orphaned words on last lines → fix with `text-wrap: balance` or `text-wrap: pretty`

**Color and Surfaces**
- Pure `#000000` background → replace with off-black (`#0a0a0a`, `#111`, or tinted dark)
- Oversaturated accents → keep saturation below 80%
- More than one accent color → remove all but one
- AI purple/blue gradient aesthetic → replace with neutral base + single considered accent
- Generic `box-shadow` with pure black → tint shadows to background hue
- Flat design with zero texture → add subtle noise or grain overlay
- Random dark section in a light page (or vice versa) → commit to one theme per page

**Layout**
- Everything centered and symmetrical → break with offset margins or left-aligned headers
- Three equal feature cards in a row → replace with zigzag, asymmetric grid, or masonry
- `height: 100vh` → replace with `min-height: 100dvh`
- No `max-width` container → add `max-w-[1200px] mx-auto` or equivalent
- Uniform `border-radius` on everything → vary radius: tighter inner, softer containers
- No overlap or depth → use negative margins to layer elements
- Missing whitespace → double the spacing, let the layout breathe
- Buttons not bottom-aligned in card groups → pin CTAs to card bottom

**Interactivity and States**
- No hover states on buttons → add background shift, scale, or translate
- No active/pressed feedback → add `scale-[0.98]` or `translateY(1px)` on press
- Instant transitions → add 200–300ms ease to all interactive elements
- Missing focus ring → add visible WCAG-compliant focus indicators
- Generic circular spinners → replace with skeleton loaders matching layout shape
- No empty states or error states → design composed states for both
- `scroll-behavior` missing → add `scroll-behavior: smooth` for anchor links
- Animations using `top`/`left`/`width`/`height` → switch to `transform` and `opacity`

**Content**
- Generic placeholder names → use realistic, diverse names
- Fake round numbers (`99%`, `50k`) → use organic data (`47.2%`, `48.3k`)
- AI copy clichés → rewrite with plain, specific language
- Lorem Ipsum → replace with real draft copy
- Title Case On Every Header → use sentence case

**Component Patterns**
- Generic card (border + shadow + white bg) → use only background color, or only spacing
- Three-card carousel testimonials → masonry wall, embedded posts, or rotating single quote
- Accordion FAQ → side-by-side list or inline disclosure
- Lucide/Feather icons → switch to Phosphor or Tabler for differentiation
- Inconsistent icon stroke widths → standardize to one weight globally

**Code Quality**
- Div soup → use semantic HTML: `<nav>`, `<main>`, `<article>`, `<aside>`, `<section>`
- Inline styles mixed with CSS classes → move all styling to the styling system
- Hardcoded pixel widths → use relative units (`%`, `rem`, `em`, `max-width`)
- Missing `alt` text → describe image content; never `alt=""` on meaningful images
- Arbitrary `z-index: 9999` → establish a clean z-index scale
- Missing meta tags → add `<title>`, `description`, `og:image`

#### Fix Priority (maximum visual impact, minimum risk)

1. **Font swap** — biggest instant improvement, lowest risk
2. **Color palette cleanup** — remove clashing or oversaturated colors
3. **Hover and active states** — makes the interface feel alive
4. **Layout and spacing** — proper grid, max-width, consistent padding
5. **Replace generic components** — swap cliché patterns for modern alternatives
6. **Add loading, empty, and error states** — makes it feel finished
7. **Polish typography scale and spacing** — the premium final touch

#### Upgrade Techniques (use when appropriate)

**Typography:** variable font animation on scroll/hover, outlined-to-fill text transitions, text mask reveals

**Layout:** broken grid / deliberate asymmetry, whitespace maximization, parallax card stacks, split-screen scroll

**Motion:** staggered entry with Y-translate + opacity, spring physics on all interactive elements, scroll-driven reveals

**Surfaces:** true glassmorphism (backdrop-filter + 1px inner border + inner shadow), spotlight borders that illuminate under cursor, grain/noise overlay, tinted colored shadows

#### Rules

- Work within the existing tech stack — do not migrate frameworks or styling libraries
- Do not break existing functionality — test after every change
- Check `package.json` before importing any new library
- Check Tailwind version (v3 vs v4) before modifying config
- Keep changes reviewable and focused — targeted improvements over big rewrites
