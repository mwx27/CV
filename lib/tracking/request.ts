// Shared request → tracking-payload helpers for the download (recordDownload)
// and open (/api/track) flows. Geo fields come from Vercel's edge headers and
// are absent in local dev → null. Raw IP is intentionally NOT collected (low
// value over Vercel geo, high privacy cost — see the recruiter-tracking plan).

// Loose UUID shape check. Download ids are minted via crypto.randomUUID() in
// the PDF route; this keeps obvious junk out of the tracking pipeline without
// validating against any registry — the n8n side owns the downloadId→company
// join.
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isDownloadId(value: unknown): value is string {
  return typeof value === "string" && UUID_RE.test(value);
}

// Vercel URL-encodes x-vercel-ip-city. A malformed value (stray `%`, `%zz`)
// makes decodeURIComponent throw; fall back to the raw value so tracking never
// throws on a junk header.
export function safeDecode(value: string | null): string | null {
  if (value == null) return null;
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export interface RequestGeo {
  referer: string | null;
  country: string | null;
  region: string | null;
  city: string | null;
  userAgent: string | null;
}

// Pull the geo/UA/referer fields off a request's headers. For a download these
// describe the visitor hitting /api/cv; for an open they describe the recruiter,
// since the /api/track fetch runs in the recruiter's browser.
export function extractGeo(request: Request): RequestGeo {
  return {
    referer: request.headers.get("referer"),
    country: request.headers.get("x-vercel-ip-country"),
    region: request.headers.get("x-vercel-ip-country-region"),
    city: safeDecode(request.headers.get("x-vercel-ip-city")),
    userAgent: request.headers.get("user-agent"),
  };
}
