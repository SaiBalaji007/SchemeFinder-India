# SchemeFinder — Frontend

A modern, responsive frontend for **SchemeFinder**, a platform that helps Indian citizens
discover government and NGO welfare schemes they're eligible for.

This is a **frontend-only** build: React + Vite + Tailwind CSS + Framer Motion + React Router,
using local dummy JSON data. No backend, database, or authentication is included by design —
it's structured so a Django REST API can be plugged in later with minimal changes.

## Getting started

```bash
npm install
npm run dev       # start local dev server
npm run build      # production build (outputs to dist/)
npm run preview    # preview the production build
```

## Project structure

```
src/
  components/       Reusable UI components (Navbar, Footer, SchemeCard, FilterSidebar, etc.)
    eligibility/     Multi-step eligibility form pieces
  pages/             Route-level pages (Home, Eligibility, Explore/Results, Scheme Details,
                      Categories, About, Contact, 404)
  layouts/           MainLayout (Navbar + Footer wrapper)
  context/           EligibilityContext — holds the user's profile & match results in memory
  data/              Dummy JSON/JS data: schemes.json (30 schemes), categories, states, FAQs...
  services/          schemeService.js — the ONLY place that talks to "data".
                      Swap its internals for real Django API calls later; pages never change.
  hooks/             useSchemes, useMultiStepForm, useCountUp
  utils/             helpers.js (formatting), iconMap.js (dynamic lucide icon lookup)
```

## Pages included

- **Home** — hero, trust badges, stats, categories preview, how it works, CTA, FAQ
- **Check Eligibility** (`/eligibility`) — 7-step guided form → loading animation → results
- **Explore / Results** (`/explore`, `/results`) — search, sidebar filters, sort, scheme cards
- **Scheme Details** (`/schemes/:id`) — overview, benefits, eligibility, documents, how to apply, FAQs
- **Categories** (`/categories`) — grid of scheme categories with icons
- **About** (`/about`) — mission, vision, goal, how it works, future plans
- **Contact** (`/contact`) — simple frontend-only contact form

## Connecting the Django backend later

All data access goes through `src/services/schemeService.js`. Today it reads
`src/data/schemes.json`. To connect Django:

1. Replace the function bodies in `schemeService.js` with `fetch`/`axios` calls to your
   Django REST endpoints (e.g. `GET /api/schemes/`, `GET /api/schemes/:id/`,
   `POST /api/eligibility/check/`).
2. Keep the same return shapes (array of scheme objects / a single scheme object) and every
   page and component will continue to work unchanged.
3. Add a `.env` file with `VITE_API_BASE_URL=https://your-django-api.com/api` and read it via
   `import.meta.env.VITE_API_BASE_URL` (a placeholder line is already commented in the service).

No component currently assumes JSON — swapping the service layer is the only change needed.

## Notes

- No login/signup, no database, no external API calls — everything runs entirely in the browser.
- Dummy data lives in `src/data/schemes.json` (30 schemes) and `src/data/*.js`.
- Design theme: purple + white, rounded corners, soft shadows, a subtle tricolor accent
  (nod to the Indian government/NGO context), Space Grotesk + Inter typography.
