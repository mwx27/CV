import { extractGeo } from "@/lib/tracking/request";

export const runtime = "nodejs";

// Records one CV visit: VisitTracker POSTs from the browser on every visit,
// PDF or organic (it mounts on every page render). We enrich with geo/UA (the
// visitor) and the client-sent `referrer` (document.referrer — the real source,
// e.g. linkedin, since this fetch's own referer header is just the CV page) and
// forward to n8n, which notifies the cv-opens-all Slack channel. PDF arrivals
// ALSO hit /api/track (with company) — this is the all-visits firehose.

const WEBHOOK_TIMEOUT_MS = 3_000;
const MAX_REFERRER_LEN = 500;

interface VisitRequestBody {
  referrer?: unknown;
  locale?: unknown;
}

// Coerce an untrusted field to a trimmed, length-capped string or null. Keeps
// junk (objects, oversized values) out of the tracking pipeline.
function cleanString(value: unknown, maxLen: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, maxLen) : null;
}

export async function POST(request: Request) {
  let body: VisitRequestBody;
  try {
    body = await request.json();
  } catch {
    // No body / invalid JSON is fine: a visit needs no fields to be recorded.
    body = {};
  }

  // Drop extractGeo's `referer` (the HTTP header): for this client-fired POST
  // it's just the CV page, useless. The real source is the client-sent
  // `referrer` (document.referrer) above. Keep only geo/UA from extractGeo.
  const { country, region, city, userAgent } = extractGeo(request);
  const payload = {
    ts: new Date().toISOString(),
    locale: cleanString(body.locale, 5),
    referrer: cleanString(body.referrer, MAX_REFERRER_LEN),
    country,
    region,
    city,
    userAgent,
  };

  const webhook = process.env.N8N_VISIT_WEBHOOK_URL;
  // Never forward visits from local dev — only real production traffic should
  // reach n8n, so a developer reloading localhost doesn't pollute the feed.
  if (!webhook || process.env.NODE_ENV !== "production") {
    // Dev / unconfigured: log so the flow stays visible without hitting n8n.
    console.log(`[cv-visit] ${JSON.stringify(payload)}`);
    return Response.json({ ok: true });
  }

  try {
    await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
    });
  } catch {
    // Best-effort: a tracking failure must never surface to the visitor.
  }

  return Response.json({ ok: true });
}
