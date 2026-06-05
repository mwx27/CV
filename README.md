# Maciej Wojda — CV

**Last Updated:** 2026-06-05 16:34 CEST

The personal CV site of Maciej Wojda — a software engineer who's had a hand in 30+ projects, currently focused on AI-assisted development and iOS.

**Live:** [maciejwojda.cv](https://maciejwojda.cv)  
[PDF (EN)](https://maciejwojda.cv/api/cv/en) · [PDF (PL)](https://maciejwojda.cv/api/cv/pl)

A bilingual (🇬🇧 English / 🇵🇱 Polish) CV site built with Next.js. One TypeScript source renders live to the web page and a downloadable PDF; that content — plus deeper, off-the-page notes — also powers an **"Ask my CV"** AI chat widget.

## Features

- **Bilingual** — English at `/`, Polish at `/pl`, switchable in the UI. The PDF follows the chosen language.
- **Downloadable PDF** — a print-ready CV generated on demand, straight from the live content.
- **Ask my CV** — a floating chat widget where recruiters can dig into my projects, skills, and background. Powered by Claude (via n8n), it knows more than the printed CV shows: the CV is kept short and selective, while the chat also draws on detailed per-project notes kept off the page.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router) + React 19
- [next-intl](https://next-intl.dev) for locale routing
- [@react-pdf/renderer](https://react-pdf.org) for the PDF export
- Tailwind CSS v4
- [n8n](https://n8n.io) + Claude for the chat backend
- Deployed on [Vercel](https://vercel.com)

## Getting started

Requires [pnpm](https://pnpm.io).

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

To enable the chat widget locally, set the n8n webhook URL (see `.env.example`):

```bash
# .env.local
N8N_CHAT_WEBHOOK_URL=https://your-n8n-instance/webhook/...
```

`pnpm build` / `pnpm start` / `pnpm lint` are also available.

Quality is enforced by TypeScript and ESLint, with a production build on every Vercel deploy as the gate. There's no unit-test suite by design: the content is static and the `CVData` schema turns malformed content into a compile error rather than a runtime bug.

## How it fits together

The CV is deliberately short — one TypeScript file per language, hand-curated for readability. But behind it sits a fuller layer of per-project notes that powers the chat widget and stays off the page.

**Content layers:**

| Layer | Location | Visibility |
|---|---|---|
| CV | `content/cv.{en,pl}.ts` | Public — in repo, renders to website and PDF |
| Public inventories | `content/data-inventories-public/` | Gitignored, feeds the chat |
| Private notes | `content/data-inventories/` | Gitignored, never shared |

**What renders from the CV:**
- Website — live on every request (`app/[locale]/page.tsx`)
- PDF — generated on demand (`app/api/cv/[locale]/route.tsx`)

**What powers the chat:**
- `lib/knowledge/bundle.ts` combines the CV and public inventories into one document, pasted by hand into n8n as a static snapshot.
- **Long-context, not RAG** — the knowledge base is small and hand-curated, so the whole bundle fits in the model's context. No vector store, no retrieval step, no embedding infrastructure to maintain.
- The chat answers in more depth than the printed CV because it carries the full inventories.
- Trade-off: the snapshot must be re-synced by hand after an edit.

## How the notes get written

The private notes and CV bullets are produced by [`cv-bullets`](https://github.com/mwx27/claude-code-skills) — a Claude Code skill that mines a project's repo and git history, filters findings by seniority signal, and writes both the inventory and the CV bullets.

## License

Personal project — content (the CV) is © Maciej Wojda. Code is provided as-is for reference.
