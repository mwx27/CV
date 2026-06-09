import { notFound } from "next/navigation";
import { getCv } from "@/content";
import { routing, type AppLocale } from "@/i18n/routing";
import { ChatWidget, CVPage, OpenTracker, VisitTracker } from "@/features";

function isValidLocale(value: string): value is AppLocale {
  return (routing.locales as readonly string[]).includes(value);
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const data = getCv(locale);

  return (
    <>
      <CVPage data={data} locale={locale} />
      <ChatWidget locale={locale} />
      {/* OpenTracker fires only for PDF arrivals (reads the cv_ref cookie);
          VisitTracker fires on every visit. Both mount: a PDF open lands on
          both the cv-opens (with company) and cv-opens-all channels. */}
      <OpenTracker />
      <VisitTracker locale={locale} />
    </>
  );
}
