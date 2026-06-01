"use client";

import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";

export function LanguageToggle({ current }: { current: AppLocale }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  return (
    <div className="no-print inline-flex items-center rounded-full border border-divider bg-background overflow-hidden text-xs font-semibold">
      {routing.locales.map((locale) => {
        const active = locale === current;
        return (
          <button
            key={locale}
            type="button"
            disabled={isPending}
            onClick={() => {
              if (active) return;
              startTransition(() => {
                router.replace(pathname, { locale });
              });
            }}
            className={
              "px-3 py-1.5 uppercase transition-colors " +
              (active ? "bg-accent text-white" : "text-foreground hover:bg-divider/60") +
              (isPending ? " opacity-60" : "")
            }
            aria-pressed={active}
          >
            {locale}
          </button>
        );
      })}
    </div>
  );
}
