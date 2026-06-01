import type { AppLocale } from "@/i18n/routing";

export function DownloadButton({ locale, label }: { locale: AppLocale; label: string }) {
  return (
    <a
      href={`/api/cv/${locale}`}
      className="no-print inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white shadow-sm hover:bg-accent/90 transition-colors"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden>
        <path d="M12 4v12m0 0-4-4m4 4 4-4" />
        <path d="M5 20h14" />
      </svg>
      {label}
    </a>
  );
}
