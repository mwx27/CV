import { renderToBuffer } from "@react-pdf/renderer";
import { notFound } from "next/navigation";
import { CVDocument } from "@/features";
import { getCv } from "@/content";
import { routing, type AppLocale } from "@/i18n/routing";

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

  const buffer = await renderToBuffer(<CVDocument data={data} origin={origin} locale={locale} />);

  const filename = `Maciej-Wojda-CV-${locale}.pdf`;
  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
