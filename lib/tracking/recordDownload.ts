import type { AppLocale } from "@/i18n/routing";
import { extractGeo } from "./request";

// Fire-and-forget record of one anonymous PDF download. The full metadata lives
// here (server-side); only `downloadId` is embedded in the PDF itself, so a
// leaked file can be traced back to this record.

const WEBHOOK_TIMEOUT_MS = 3_000;

export async function recordDownload(
  request: Request,
  locale: AppLocale,
  downloadId: string,
  company: string | null = null,
): Promise<void> {
  const payload = {
    downloadId,
    ts: new Date().toISOString(),
    locale,
    company,
    ...extractGeo(request),
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
