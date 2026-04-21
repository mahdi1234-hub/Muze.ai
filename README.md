# Muze.ai — The State of the Customer Journey, 2026

An enterprise-grade, production-ready **interactive data storytelling case study** for a
fictitious B2B SaaS analytics company. Built as a reference implementation of the
**Complete React Data Storytelling Stack**.

> Live site: https://muze-ai.vercel.app

## Storytelling stack

| Layer          | Library                         | Purpose                                            |
| -------------- | ------------------------------- | -------------------------------------------------- |
| Scroll engine  | **react-scrollama**             | IntersectionObserver-driven step changes           |
| Charts         | **@nivo** (bar/pie/treemap/heatmap/sankey/funnel/bump/stream/calendar/radar/chord) | High-level storytelling visualizations |
| Custom viz     | **@visx** (shape, scale, axis, gradient, network, tooltip, glyph, grid) | Bespoke hero visuals                               |
| Animation      | **motion** (framer-motion)      | Layout, page and chart transitions                 |
| Physics        | **@react-spring/web**           | Counter animations, funnel bloom                   |
| Timeline       | **gsap**                        | Reserved for sequenced animations                  |
| Low-level      | **d3**                          | Scales, bisectors, color interpolation             |
| App shell      | **Next.js 16** (App Router, TS, Tailwind v4) |                                       |

## Report structure

1. **Hero** — 8.24M journeys across 340 companies, animated counters.
2. **Executive summary** — six top-line KPIs.
3. **Awareness** — first-touch attribution, content mix (scrollytelling).
4. **Acquisition** — Nivo + Visx funnels.
5. **Activation** — engagement heatmap, chord co-occurrence.
6. **Conversion** — Sankey + custom Visx attribution network.
7. **Revenue** — bump + stream + Visx gradient area.
8. **Retention** — calendar heatmap + Visx cohort matrix.
9. **Advocacy** — radar, chord, hero area.
10. **Insights & Recommendations** — executive findings.
11. **Methodology** — how the study was built.
12. **CTA footer** — book a walkthrough.

## Design system

Pure dark editorial (`#06060a`) with a violet → cyan → pink gradient accent,
glass-panel cards, subtle noise and radial bloom backgrounds. Built to match the
aesthetic used by NYT, The Pudding, Bloomberg and Spotify Wrapped.

## Local development

```bash
npm install --legacy-peer-deps   # Visx peers React 16–18 but works with 19
npm run dev
```

## Production build

```bash
npm run build
npm run start
```

## Deploying to Vercel

Push to `main`; Vercel auto-deploys. No environment variables are required.
