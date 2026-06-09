"use client";

import { useEffect } from "react";

// Fires a single visit event to /api/visit on mount — for EVERY visit, PDF or
// organic. It mounts alongside OpenTracker, so a PDF arrival lands on both the
// cv-opens channel (via OpenTracker, with company) and the cv-opens-all channel
// (via this). Firing from the client (not the server) is deliberate: corporate
// link-scanners and crawlers prefetch URLs but run no JS, so a server-side fire
// would log phantom visits. Real browsers run this effect.

export function VisitTracker({ locale }: { locale: string }) {
  useEffect(() => {
    void fetch("/api/visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // document.referrer is the real source (Google, LinkedIn, direct); the
      // fetch's own referer header would just be this CV page.
      body: JSON.stringify({ locale, referrer: document.referrer || null }),
      keepalive: true,
    }).catch(() => {
      // Best-effort: a tracking failure must never affect the page.
    });
  }, [locale]);

  return null;
}
