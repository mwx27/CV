import { extractGeo, isDownloadId } from "@/lib/tracking/request";

export const runtime = "nodejs";

// Records one CV "open": OpenTracker POSTs { downloadId } from the recruiter's
// browser after they follow the PDF's /r/<id> link. We enrich it with geo/UA
// (which describe the recruiter here, since the fetch runs in their browser)
// and forward to n8n, which joins downloadId→company in the cv-downloads sheet
// to surface who opened the CV. The app does NOT resolve the company itself.

const WEBHOOK_TIMEOUT_MS = 3_000;

interface TrackRequestBody {
  downloadId?: unknown;
}

export async function POST(request: Request) {
  let body: TrackRequestBody;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!isDownloadId(body.downloadId)) {
    return Response.json(
      { error: "downloadId must be a UUID" },
      { status: 400 },
    );
  }

  const payload = {
    downloadId: body.downloadId,
    ts: new Date().toISOString(),
    ...extractGeo(request),
  };

  const webhook = process.env.N8N_OPEN_WEBHOOK_URL;
  // Never forward opens from local dev — only real production traffic should
  // reach n8n, so testing the /r link locally doesn't log phantom opens.
  if (!webhook || process.env.NODE_ENV !== "production") {
    // Dev / unconfigured: log so the flow stays visible without hitting n8n.
    console.log(`[cv-open] ${JSON.stringify(payload)}`);
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
