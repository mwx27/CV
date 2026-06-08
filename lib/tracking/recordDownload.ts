import type { AppLocale } from "@/i18n/routing";

// Fire-and-forget record of one anonymous PDF download. The full metadata lives
// here (server-side); only `downloadId` is embedded in the PDF itself, so a
// leaked file can be traced back to this record. Geo fields come from Vercel's
// edge headers (absent in local dev → null). Raw IP is intentionally NOT
// collected (see the recruiter-tracking plan: low value, high privacy cost).

const WEBHOOK_TIMEOUT_MS = 3_000;

// Vercel URL-encodes x-vercel-ip-city. Decode defensively: a malformed value
// (stray `%`, `%zz`) makes decodeURIComponent throw, and since recordDownload
// is awaited in the route, that throw would surface as an HTTP 500 on an
// otherwise-fine PDF — violating the "tracking never breaks the download"
// contract. Fall back to the raw value instead of throwing.
function safeDecode(value: string | null): string | null {
  if (value == null) return null;
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export async function recordDownload(
  request: Request,
  locale: AppLocale,
  downloadId: string,
): Promise<void> {
  const payload = {
    downloadId,
    ts: new Date().toISOString(),
    locale,
    referer: request.headers.get("referer"),
    country: request.headers.get("x-vercel-ip-country"),
    region: request.headers.get("x-vercel-ip-country-region"),
    city: safeDecode(request.headers.get("x-vercel-ip-city")),
    userAgent: request.headers.get("user-agent"),
  };

  const webhook = process.env.N8N_DOWNLOAD_WEBHOOK_URL;
  if (!webhook) {
    // Local dev / unconfigured: log so the flow is testable without n8n.
    console.log(`[cv-download] ${JSON.stringify(payload)}`);
    return;
  }

  try {
    await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
    });
  } catch {
    // Best-effort: a tracking failure must never break the PDF download.
  }
}
