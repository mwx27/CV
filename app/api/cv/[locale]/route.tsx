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

export async function GET(
  request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const data = getCv(locale);
  const url = new URL(request.url);
  const origin = url.origin;

  // Unique per download; embedded in the PDF and logged with metadata so a
  // leaked file can be traced back. Fire-and-forget via after(): it runs once
  // the response is sent and is kept alive by the runtime (waitUntil), so it
  // adds no latency to the download and can't 500 the request.
  const downloadId = crypto.randomUUID();
  after(() => recordDownload(request, locale, downloadId));

  const buffer = await renderToBuffer(
    <CVDocument data={data} origin={origin} locale={locale} downloadId={downloadId} />,
  );

  const filename = `Maciej-Wojda-CV-${locale}.pdf`;
  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
