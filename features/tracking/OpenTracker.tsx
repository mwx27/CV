"use client";

import { useEffect } from "react";

// Reads the `cv_ref` cookie left by the /r/<downloadId> redirect, clears it,
// and fires a single open event to /api/track. Firing from the client — not
// from the /r redirect on the server — is load-bearing: corporate mail
// link-scanners (SafeLinks, Mimecast) prefetch the URL but run no JS, so a
// server-side fire would log phantom opens the recruiter never made. Real
// browsers run this effect; scanners don't.

const COOKIE_NAME = "cv_ref";

function readCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export function OpenTracker() {
  useEffect(() => {
    const downloadId = readCookie(COOKIE_NAME);
    if (!downloadId) return;

    // Clear immediately so a reload or client navigation can't double-fire the
    // open. Match the attributes /r set it with (Path, and Secure on HTTPS) so
    // the delete reliably targets the same cookie across browsers.
    const secure = location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${COOKIE_NAME}=; Max-Age=0; Path=/; SameSite=Lax${secure}`;

    void fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ downloadId }),
      keepalive: true,
    }).catch(() => {
      // Best-effort: a tracking failure must never affect the page.
    });
  }, []);

  return null;
}
