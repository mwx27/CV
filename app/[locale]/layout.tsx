import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Raleway, Bebas_Neue } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { routing, type AppLocale } from "@/i18n/routing";
import "../globals.css";

const raleway = Raleway({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["400", "600", "700"],
});

const bebas = Bebas_Neue({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Maciej Wojda — CV",
  description: "Software engineer — CV / resume",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

function isValidLocale(value: string): value is AppLocale {
  return (routing.locales as readonly string[]).includes(value);
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      className={`${raleway.variable} ${bebas.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <NextIntlClientProvider locale={locale} messages={{}}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
