import { cvEn } from "./cv.en";
import { cvPl } from "./cv.pl";
import type { CVData, Locale } from "./types";

export const cvByLocale: Record<Locale, CVData> = {
  en: cvEn,
  pl: cvPl,
};

export function getCv(locale: Locale): CVData {
  return cvByLocale[locale];
}
