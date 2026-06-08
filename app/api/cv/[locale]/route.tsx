import { renderToBuffer } from "@react-pdf/renderer";
import { notFound } from "next/navigation";
import { after } from "next/server";
import { CVDocument } from "@/features";
import { getCv } from "@/content";
import { routing, type AppLocale } from "@/i18n/routing";
import { recordDownload } from "@/lib/tracking/recordDownload";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isValidLocale(value: string): value is AppLocale {
  return (routing.locales as readonly string[]).includes(value);
}

// `?company=<label>` is a free-form string (already URL-decoded by searchParams)
// naming who this PDF is for. Drop control chars, collapse whitespace, cap the
// length, and treat empty as absent — so a junk value can't break the PDF
// metadata or bloat the tracking row.
function cleanCompany(raw: string | null): string | null {
  if (!raw) return null;
  const cleaned = Array.from(raw)
    .filter((ch) => {
      const code = ch.charCodeAt(0);
      return code >= 0x20 && code !== 0x7f;
    })
    .join("")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 100);
  return cleaned.length > 0 ? cleaned : null;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const data = getCv(locale);
  const url = new URL(request.url);
  const origin = url.origin;

  // Optional tag for who this download is being sent to. Flows into the tracking
  // row and the filename (`slug`); deliberately NOT embedded in the PDF — the
  // download id already maps to the company via the tracking row, and a readable
  // company name in the PDF metadata would expose the tag to the recipient.
  const company = cleanCompany(url.searchParams.get("company"));
  const slug = company
    ? company
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
    : "";

  // Unique per download; embedded in the PDF and logged with metadata so a
  // leaked file can be traced back. Fire-and-forget via after(): it runs once
  // the response is sent and is kept alive by the runtime (waitUntil), so it
  // adds no latency to the download and can't 500 the request.
  const downloadId = crypto.randomUUID();
  after(() => recordDownload(request, locale, downloadId, company));

  const buffer = await renderToBuffer(
    <CVDocument data={data} origin={origin} locale={locale} downloadId={downloadId} />,
  );

  const filename = slug
    ? `Maciej-Wojda-CV-${locale}-${slug}.pdf`
    : `Maciej-Wojda-CV-${locale}.pdf`;
  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
