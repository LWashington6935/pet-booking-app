
<!-- Replace USER and REPO below after pushing to GitHub -->
<p align="center">
  <a href="https://github.com/USER/REPO/actions/workflows/ci.yml">
    <img alt="CI" src="https://img.shields.io/github/actions/workflow/status/USER/REPO/ci.yml?label=CI&logo=github&style=for-the-badge">
  </a>
  <img alt="Lighthouse" src="https://img.shields.io/badge/Lighthouse-95%2B-green?style=for-the-badge&logo=lighthouse">
  <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FUSER%2FREPO&project-name=pet-booking-app&repository-name=pet-booking-app">
    <img alt="Deploy with Vercel" src="https://vercel.com/button">
  </a>
</p>

# Pet Booking App (Next.js + TypeScript + Tailwind)

A tiny Wag-style demo to showcase **web engineering** skills: React/TypeScript, accessible UI, and testing (Vitest + Playwright).

## Tech
- Next.js 14 (App Router) + React 18 + TypeScript
- TailwindCSS (dark mode, responsive)
- React Hook Form + Zod validation
- Vitest + Testing Library (unit)
- Playwright (e2e)
- Lightweight mock data (no backend)

## Quick start
```bash
pnpm i   # or: npm i / yarn
pnpm dev # -> http://localhost:3000
```

## Scripts
- `dev` run dev server
- `build` compile for production
- `start` start prod server
- `test` run unit tests (Vitest)
- `e2e` run Playwright tests
- `lint` lint with eslint

## Pages
- `/` Home with top walkers
- `/book` Accessible booking form with form validation and JSON preview
- `/walkers/[id]` Walker profile
- `/dashboard` Shows last booking (localStorage)

## A11y & UX
- Keyboard focus-visible styles
- ARIA labels for critical groups (duration)
- Color-contrast friendly dark mode toggle (persisted)

## Notes
This is a front-end demo; swap the mock data for a real API later. Add analytics, error boundaries, and a design-system pass if needed.


---

## UX Mini Case Study

**Goal:** Let a pet owner book a walk in under **60 seconds** with confidence.

### Users & Constraints
- Busy owner on mobile, possibly one-handed.
- Needs trust (walker rating), transparency (price/time), and fast confirmation.

### Key Decisions
1. **Mobile-first layout** with large tap targets and clear labels → reduces mis-taps on phones.
2. **Three-step mental model on one screen** (Who / When / Where) → avoids multi-page friction.
3. **Validation with Zod + inline messages** → prevents error loops and clarifies requirements instantly.
4. **Accessible controls** (keyboard focus, ARIA for radio group, strong contrast) → inclusive by default.
5. **Immediate JSON preview + success toast option** → creates confidence that submission worked.
6. **Dark mode** toggle with persistence → comfort for late-night bookings.

### Evidence / Quality
- Lighthouse a11y checks ≥ 90 locally (typical).
- Unit tests for critical UI (buttons present) + e2e for booking flow ensure regressions are caught.
- Simple telemetry hook could record time-to-complete and drop-off at each field in future iterations.

### Next Iterations
- Add price estimate that updates with duration & walker rate.
- Offer re-book from Dashboard with one click.
- Introduce skeleton loading & optimistic UI for snappier feel.
- Expand to real backend; store bookings and list them on Dashboard.


## Deploy

**One-click** (after pushing to GitHub):  
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FUSER%2FREPO&project-name=pet-booking-app&repository-name=pet-booking-app)

**Or via CLI:**
```bash
npm i -g vercel
vercel          # first deploy (link project)
npm run deploy  # subsequent prod deploys
```


### Lighthouse (optional)
Run locally:
```bash
# in another terminal while dev server is running at :3000
npx lighthouse http://localhost:3000 --only-categories=performance,accessibility,best-practices,seo --view
```
Target: **95+** Accessibility, **90+** Performance (optimize images/fonts if needed).


## Storybook Deploy
Deploy Storybook as a separate static site on Vercel.

```bash
npm i -g vercel
npm run deploy:storybook   # builds to ./storybook-static and deploys it
```
**Tip:** Create a second Vercel project for Storybook and run the command there, or use the Vercel dashboard with:
- **Build Command:** `npm run build-storybook`
- **Output Directory:** `storybook-static`


---

## Walkthrough Script (Loom-style)

**Intro (5s)**  
Hi, I’m Lucas. This is a mini Wag-style **Pet Booking App** I built with **React, TypeScript, and Next.js** to showcase UI/UX, testing, and API routes.

**1) Home & Navigation (10s)**  
Here’s the home page with top walkers. I’ll jump to **Book a Walk**. Dark mode is built in and persisted.

**2) Booking UX (25s)**  
The form uses **React Hook Form + Zod** for accessible validation. When I pick a walker and duration, the **price estimator** updates live, and there’s a **price breakdown** with a service fee. I’ll submit now—notice we **optimistically redirect** to Bookings so the app feels instant.

**3) Bookings & Optimistic Updates (20s)**  
On the **Bookings** page, I get pagination, a **demo add** button, and a **Delete** with **Undo**. Create/delete operations are **optimistic**, then reconciled with the API. There’s also a **Dashboard** that shows my last booking locally.

**4) Design System & Storybook (15s)**  
I’ve included a small **design system** (Button, Card, Modal) and **Storybook** for documentation. You can run Storybook or deploy it standalone on Vercel.

**5) Quality & Deploy (15s)**  
Unit tests with **Vitest**, e2e with **Playwright**, and a GitHub Actions **CI** pipeline. It’s set up for **one‑click Vercel deploy**.

**Outro (5s)**  
This demonstrates my front-end engineering focus: a11y-first design, strict TypeScript, and polished DX. Thanks for watching!


## Publish the UI Package (@pet/ui)
This repo includes a tiny component library in `packages/ui` that you can publish to npm.

```bash
# set your npm scope if desired, then:
npm install
npm run build:ui

# login and publish
npm login
cd packages/ui
npm publish --access public
```

In your apps:
```tsx
import { Button, Card, Modal } from '@pet/ui'
```
