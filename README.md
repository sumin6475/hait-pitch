# Pitch Page Template (starter)

The reusable Next.js starter that Pitch Page Studio clones per project. Tokens are mirrored from the Figma template "Sumin Kiim" (frame `60-34`). Do not restyle it to a new look per project. Fill the content, keep the look.

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4, tokens defined in `app/globals.css` under `@theme`
- Framer Motion for scroll reveals and hero motion, with reduced-motion fallbacks
- Roboto via `next/font/google`

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## How a build works

1. The Pitch Brand Marketer fills `lib/content.ts` (the `PitchContent` object) from `inputs/project-intake.md`. Every field is placeholder text marked TODO until then.
2. The Pitch UI/UX Designer confirms token and layout choices against the Figma frame.
3. The Pitch Frontend Developer refines the section components, pulling any exact values from Figma via MCP, then deploys to Vercel.

## Structure

```
starter/
├── app/
│   ├── globals.css      Tailwind v4 + @theme design tokens (from Figma)
│   ├── layout.tsx       Roboto font, SEO + Open Graph metadata
│   └── page.tsx         Assembles the fixed section order
├── components/
│   ├── Header.tsx  Footer.tsx  Reveal.tsx
│   └── sections/   Hero, Problem, Features, Technical, Outcomes, CTA
└── lib/content.ts       The per-project content model (edit this per build)
```

## Design tokens (source: Figma `get_variable_defs` on node 107:935)

- **Primary** Indigo: 500 `#6366F1`, 600 `#4F46E5`
- **Neutral** Blue Gray (Slate): 100 `#F1F5F9` … 900 `#0F172A`
- **Accent** Blue: 400 `#60A5FA`
- **Semantic** success `#22C55E`, warning `#FBBF24`, danger `#E11D48`
- **Type** Roboto, display 72/800, h2 56/800, h3 48/800, h5 32/700, body 16–18/400
- **Elevation** `shadow-card`, `shadow-elevated`

Use the Tailwind utilities generated from these (`bg-primary-600`, `text-ink-900`, `text-display`, `shadow-elevated`). Do not hardcode hex values in components.

## The fixed sections

Hero → Problem → Features → **Technical / Stack & Skills** → Outcomes → CTA. The Technical section is the differentiator from a normal landing page and always ships. Full definitions in `../../PRD.md`.
