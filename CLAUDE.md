# CLAUDE.md

**Last Updated:** 2026-06-16 16:00 CEST

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

Package manager is **pnpm** (`pnpm@10.33.4`). There is no test suite.

- `pnpm dev` — Next.js dev server (http://localhost:3000)
- `pnpm build` — production build
- `pnpm start` — serve the production build
- `pnpm lint` — ESLint (`eslint-config-next`)

## What this is

A bilingual (English / Polish) personal CV site for Maciej Wojda. The same CV data drives **three outputs**: the web page, a server-rendered PDF, and a knowledge bundle for an "Ask my CV" AI chat widget. Visits, PDF downloads, and PDF opens are tracked to n8n/Slack as engagement analytics. Deployed on Vercel.

## Architecture

### Single source of truth: `content/`

CV content is hand-authored **TypeScript**, not markdown or a CMS. `content/cv.en.ts` and `content/cv.pl.ts` are two parallel `CVData` objects — identical structure, different language. There is no translation message catalog; the language switch is just picking the other object.

- `content/types.ts` — the `CVData` schema (roles, sub-roles, education, skills, labels). Change shape here first.
- `content/index.ts` — `getCv(locale)` returns the right object. Also holds `LAST_UPDATED` (a manual `YYYY-MM-DD` constant) — bump it after a meaningful CV revision; it drives the "last updated" stamp on the page and the PDF.
- `content/inline.ts` — `parseInline()` turns `**bold**` spans inside CV strings into renderable parts. CV strings use `**`-style emphasis; rendering code must run them through this, not treat them as plain text.

### Three consumers of `CVData`

1. **Web** — `app/[locale]/page.tsx` delegates rendering to `features/cv-page/CVPage.tsx`, which composes presentational components from `features/cv-page/components/`.
2. **PDF** — `app/api/cv/[locale]/route.tsx` renders `features/cv-pdf/CVDocument.tsx` with `@react-pdf/renderer` (`runtime = "nodejs"`, `force-dynamic`). The web `DownloadButton` links here. `CVDocument.tsx` is the root; its `styles.ts`, `fonts.ts`, `resolveLogos.ts`, and `components/` are split out. PDF components are a separate component tree from the web ones — keep them in sync manually when content shape changes. The route also mints a per-download UUID (`downloadId`, embedded in the PDF) and accepts an optional `?company=<label>` tag — both feed the tracking pipeline (see below).
3. **AI knowledge bundle** — `lib/knowledge/bundle.ts` flattens *both* EN+PL `CVData` plus curated inventories into one markdown document for the chat assistant.

### i18n (next-intl)

`i18n/routing.ts` defines locales `["en", "pl"]`, default `en`, `localePrefix: "as-needed"` (so `/` is English, `/pl` is Polish). `middleware.ts` handles locale negotiation and excludes `/api`, `_next`, etc. next-intl is used **only for routing/locale negotiation** — `messages` is intentionally `{}` everywhere because translations live in the `CVData` objects.

### "Ask my CV" chat

- `features/chat/` (client) — `ChatWidget.tsx` is a thin shell: open/close state, scroll-to-bottom, and the dialog skeleton. Chat data, network and session live in `hooks/useChat.ts` (generates `sessionId` once per mount, POSTs `{message, sessionId}`). UI pieces sit under `components/` (`MessageBubble`, `ChatHeader`, `ChatInput`, `ChatLauncherButton`, `TypingIndicator`); each folder re-exports through an `index.ts` barrel. A second hook, `hooks/useNudgeStorm.ts`, owns the once-per-session attract sequence — an idle visitor gets a teaser nudge (`ChatNudge`), then an `ElectricStorm` sweeps in and auto-opens the chat (guarded by the `cv-chat-nudge-seen` sessionStorage key; a `TEST` flag in the hook replays it on tab activation for tuning). Assistant replies render markdown (CommonMark + GFM via `react-markdown` + `remark-gfm`); user messages stay plain text. EN/PL UI labels live in `strings.ts`.
- `app/api/chat/route.ts` — thin proxy. Validates the message (non-empty, ≤2000 chars), forwards to `N8N_CHAT_WEBHOOK_URL`, aborts at 55s (just under the 60s `maxDuration` so a hung upstream returns a clean 504), and returns `{answer}`. **No model or knowledge lives here** — the actual Claude call and the knowledge bundle live in an n8n workflow.
- This is deliberately **long-context, not RAG**: the entire bundle is pasted into n8n by hand. `/api/knowledge` is a **dev-only** generator (returns 404 in production) for regenerating that bundle to copy into n8n.

### Engagement analytics

Three event types flow to n8n (which posts to Slack and joins ids to companies). All forwarding is **production-only** — dev logs to console instead — and **best-effort**: a tracking failure must never surface to the visitor or break a download. Geo/UA come from Vercel edge headers (`x-vercel-ip-*`); raw IP is intentionally not collected. Shared header→payload helpers live in `lib/tracking/request.ts` (`extractGeo`, `isDownloadId`, `safeDecode`).

1. **Download** — the PDF route fires `lib/tracking/recordDownload.ts` via `after()` (no added latency). Payload = `downloadId` + `locale` + `company` + geo → `N8N_DOWNLOAD_WEBHOOK_URL`. Only `downloadId` is embedded in the PDF; the company tag stays server-side so the recipient never sees it.
2. **Open** — the PDF's "Visit" link points at `app/r/[token]/route.ts` (`/r/<downloadId>?l=<locale>`). That redirect pins `NEXT_LOCALE` (so the recruiter stays in the CV's language) and drops a short-lived, non-httpOnly `cv_ref` cookie, then redirects to a clean `/` (no token in the address bar). On the landing page `features/tracking/OpenTracker.tsx` reads + clears `cv_ref` and POSTs `{downloadId}` to `app/api/track/route.ts` → `N8N_OPEN_WEBHOOK_URL`. **Firing the open client-side is load-bearing**: corporate link-scanners (SafeLinks, Mimecast) prefetch the URL but run no JS, so a server-side fire would log phantom opens.
3. **Visit** — `features/tracking/VisitTracker.tsx` POSTs on every page mount (PDF or organic) to `app/api/visit/route.ts` → `N8N_VISIT_WEBHOOK_URL` (the all-visits firehose / `cv-opens-all` channel). It sends `document.referrer` (the real source — the request's own referer header is just the CV page). A PDF arrival hits both OpenTracker (with company) and VisitTracker.

Both trackers mount in `app/[locale]/page.tsx`. Webhook env vars are unset in dev, so nothing reaches n8n locally.

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
