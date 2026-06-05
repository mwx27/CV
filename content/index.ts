import { cvEn } from "./cv.en";
import { cvPl } from "./cv.pl";
import type { CVData, Locale } from "./types";

export const cvByLocale: Record<Locale, CVData> = {
  en: cvEn,
  pl: cvPl,
};

/**
 * Bump this when you meaningfully revise the CV. Single source of truth for the
 * "last updated" stamp shown in both locales and in the PDF. Format: YYYY-MM-DD.
 */
const LAST_UPDATED = "2026-06-05";

const lastUpdatedLabel: Record<Locale, string> = {
  en: "Last updated",
  pl: "Ostatnia aktualizacja",
};

function formatLastUpdated(locale: Locale): string {
  const [year, month, day] = LAST_UPDATED.split("-").map(Number);
  const date = new Date(year, month - 1, day).toLocaleDateString(
    locale === "pl" ? "pl-PL" : "en-US",
    { day: "numeric", month: "long", year: "numeric" },
  );
  return `${lastUpdatedLabel[locale]}: ${date}`;
}

export function getCv(locale: Locale): CVData {
  return { ...cvByLocale[locale], lastUpdated: formatLastUpdated(locale) };
}
