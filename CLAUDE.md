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
