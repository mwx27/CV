import { NextResponse, type NextRequest } from "next/server";
import { isDownloadId } from "@/lib/tracking/request";

export const dynamic = "force-dynamic";

// The PDF's "Visit maciejwojda.cv" link points here as /r/<downloadId>. This
// route hands the id off to the landing page via a short-lived cookie and
// redirects to a clean root, so the recruiter's address bar shows no token.
// The actual open event is fired client-side by OpenTracker (not here) so that
// corporate link-scanners, which prefetch URLs but run no JS, don't log phantom
// opens.

const REF_COOKIE = "cv_ref";
// Long enough to survive the redirect + page load, short enough that a stale id
// never lingers in the browser.
const REF_MAX_AGE_S = 60;

// next-intl reads NEXT_LOCALE with priority over Accept-Language. Pinning it to
// the PDF's locale keeps the recruiter on the language the CV was sent in:
// otherwise the redirect to the clean root `/` gets re-negotiated and an English
// CV would bounce to `/pl` on a Polish-configured browser. A year mirrors
// next-intl's own cookie, so the choice persists across later visits.
const LOCALE_COOKIE = "NEXT_LOCALE";
const LOCALE_MAX_AGE_S = 60 * 60 * 24 * 365;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;

  // Locale hand-off: every PDF link carries ?l=<locale> (en or pl). Pin that
  // language via the NEXT_LOCALE cookie AND target the matching path, so the
  // landing page opens in the PDF's language regardless of the recruiter's
  // browser. A link with no/unknown ?l (e.g. truncated) just lands on `/`
  // without pinning, leaving next-intl's normal locale detection in charge —
  // we never silently override a visitor's language without an explicit signal.
  const url = new URL(request.url);
  const l = url.searchParams.get("l");
  const locale = l === "pl" ? "pl" : l === "en" ? "en" : null;
  const dest = locale === "pl" ? "/pl" : "/";

  const response = NextResponse.redirect(new URL(dest, url.origin));

  if (locale) {
    response.cookies.set(LOCALE_COOKIE, locale, {
      maxAge: LOCALE_MAX_AGE_S,
      sameSite: "lax",
      path: "/",
    });
  }

  // Drop a non-validated token silently: still redirect, just don't track.
  if (isDownloadId(token)) {
    response.cookies.set(REF_COOKIE, token, {
      maxAge: REF_MAX_AGE_S,
      sameSite: "lax",
      // NOT httpOnly: OpenTracker reads this cookie client-side to fire the open.
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
  }

  return response;
}
