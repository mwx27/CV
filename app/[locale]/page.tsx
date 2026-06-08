import { notFound } from "next/navigation";
import { getCv } from "@/content";
import { routing, type AppLocale } from "@/i18n/routing";
import { ChatWidget, CVPage, OpenTracker } from "@/features";

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
      <OpenTracker />
    </>
  );
}
