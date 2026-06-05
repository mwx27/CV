# CLAUDE.md

**Last Updated:** 2026-06-05 16:34 CEST

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

Package manager is **pnpm** (`pnpm@10.33.4`). There is no test suite.

- `pnpm dev` — Next.js dev server (http://localhost:3000)
- `pnpm build` — production build
- `pnpm start` — serve the production build
- `pnpm lint` — ESLint (`eslint-config-next`)

## What this is

A bilingual (English / Polish) personal CV site for Maciej Wojda. The same CV data drives **three outputs**: the web page, a server-rendered PDF, and a knowledge bundle for an "Ask my CV" AI chat widget. Deployed on Vercel.

## Architecture

### Single source of truth: `content/`

CV content is hand-authored **TypeScript**, not markdown or a CMS. `content/cv.en.ts` and `content/cv.pl.ts` are two parallel `CVData` objects — identical structure, different language. There is no translation message catalog; the language switch is just picking the other object.

- `content/types.ts` — the `CVData` schema (roles, sub-roles, education, skills, labels). Change shape here first.
- `content/index.ts` — `getCv(locale)` returns the right object. Also holds `LAST_UPDATED` (a manual `YYYY-MM-DD` constant) — bump it after a meaningful CV revision; it drives the "last updated" stamp on the page and the PDF.
- `content/inline.ts` — `parseInline()` turns `**bold**` spans inside CV strings into renderable parts. CV strings use `**`-style emphasis; rendering code must run them through this, not treat them as plain text.

### Three consumers of `CVData`

1. **Web** — `app/[locale]/page.tsx` delegates rendering to `features/cv-page/CVPage.tsx`, which composes presentational components from `features/cv-page/components/`.
2. **PDF** — `app/api/cv/[locale]/route.tsx` renders `features/cv-pdf/CVDocument.tsx` with `@react-pdf/renderer` (`runtime = "nodejs"`, `force-dynamic`). The web `DownloadButton` links here. PDF components are a separate component tree from the web ones — keep them in sync manually when content shape changes.
3. **AI knowledge bundle** — `lib/knowledge/bundle.ts` flattens *both* EN+PL `CVData` plus curated inventories into one markdown document for the chat assistant.

### i18n (next-intl)

`i18n/routing.ts` defines locales `["en", "pl"]`, default `en`, `localePrefix: "as-needed"` (so `/` is English, `/pl` is Polish). `middleware.ts` handles locale negotiation and excludes `/api`, `_next`, etc. next-intl is used **only for routing/locale negotiation** — `messages` is intentionally `{}` everywhere because translations live in the `CVData` objects.

### "Ask my CV" chat

- `features/chat/` (client) — `ChatWidget.tsx` is a thin shell: open/close state, scroll-to-bottom, and the dialog skeleton. Chat data, network and session live in `hooks/useChat.ts` (generates `sessionId` once per mount, POSTs `{message, sessionId}`). UI pieces sit under `components/` (`MessageBubble`, `ChatHeader`, `ChatInput`, `ChatLauncherButton`, `TypingIndicator`); each folder re-exports through an `index.ts` barrel. Assistant replies render markdown (CommonMark + GFM via `react-markdown` + `remark-gfm`); user messages stay plain text. EN/PL UI labels live in `strings.ts`.
- `app/api/chat/route.ts` — thin proxy. Validates the message (non-empty, ≤2000 chars), forwards to `N8N_CHAT_WEBHOOK_URL`, aborts at 55s (just under the 60s `maxDuration` so a hung upstream returns a clean 504), and returns `{answer}`. **No model or knowledge lives here** — the actual Claude call and the knowledge bundle live in an n8n workflow.
- This is deliberately **long-context, not RAG**: the entire bundle is pasted into n8n by hand. `/api/knowledge` is a **dev-only** generator (returns 404 in production) for regenerating that bundle to copy into n8n.

### Inventories pipeline (mostly gitignored)

These directories are **local-only**, not in the repo — a fresh clone won't have them:

- `content/data-inventories/` — private prep notes per project: full bullet candidates, FLAGSHIP/SENIOR/SOLID/BASELINE tiers, commit evidence. Produced via the `cv-bullets` skill.
- `content/data-inventories-public/` — curated, public-safe versions of the above. These are what `bundle.ts` reads (`loadInventories()`) and what the bot is allowed to expose.
- `n8n/` — exported n8n workflow JSON; a deployment artifact that embeds the bundle.

Only the `content/*.ts` files are tracked in git. When editing the bot's knowledge, edit the public inventories and regenerate via `/api/knowledge`; the private inventories are the raw source you curate down from.

## Conventions

- Path alias `@/` maps to the repo root.
- Public feature API lives in `features/index.ts` — consumers import from `@/features` (e.g. `import { ChatWidget, CVPage } from "@/features"`), not from individual feature paths. Internal pieces inside a feature use relative imports.
- App Router with async `params` — route/page params are `Promise<{ locale: string }>`; `await` them. Validate locale with the `isValidLocale` guard and `notFound()` on miss (see existing routes for the pattern).
- `next.config.ts` keeps a `/tr-apk` → APK redirect.
