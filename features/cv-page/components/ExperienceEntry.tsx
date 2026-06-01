import Image from "next/image";
import type { CVRole, CVSubRole } from "@/content/types";
import { EntryCard } from "./EntryCard";
import { MetaText } from "./MetaText";

function CompanyLogo({
  src,
  alt,
  size = "default",
}: {
  src: string;
  alt: string;
  size?: "default" | "lg";
}) {
  const lg = size === "lg";
  return (
    <div
      className={
        "relative shrink-0 " +
        (lg ? "h-16 w-20 sm:h-20 sm:w-24" : "h-9 w-24 sm:w-28")
      }
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={lg ? "(min-width: 640px) 96px, 80px" : "(min-width: 640px) 112px, 96px"}
        className="object-contain object-right"
      />
    </div>
  );
}

function BulletList({ bullets }: { bullets: string[] }) {
  return (
    <ul className="mt-1 list-disc pl-5 text-sm leading-snug space-y-0.5">
      {bullets.map((b, i) => (
        <li key={i}>{b}</li>
      ))}
    </ul>
  );
}

function ChipIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M15 2v2 M15 20v2 M2 15h2 M2 9h2 M20 15h2 M20 9h2 M9 2v2 M9 20v2" />
    </svg>
  );
}

function SubRoleBlock({ sub, techStackLabel, statusLabel, aiToolLabel }: { sub: CVSubRole; techStackLabel: string; statusLabel: string; aiToolLabel: string }) {
  return (
    <div className="mt-3 pt-3 border-t border-[#d4d4d4] flex items-start justify-between gap-3">
      <div className="flex-1">
        <div className="text-[15px] font-semibold leading-tight">
          {sub.company} <MetaText>({sub.period})</MetaText>
        </div>
        {sub.details && sub.details.length > 0 && (
          <MetaText className="block">{sub.details.join(" • ")}</MetaText>
        )}
        <BulletList bullets={sub.bullets} />
        {sub.status && (
          <p className="mt-1 text-[11px] sm:text-xs text-muted">
            <span className="font-semibold">{statusLabel}</span> {sub.status}
          </p>
        )}
        {sub.techStack && (
          <p className="mt-0.5 text-[11px] sm:text-xs text-muted">
            <span className="font-semibold">{techStackLabel}</span> {sub.techStack}
          </p>
        )}
        {sub.aiTool && (
          <p className="mt-0.5 flex items-center gap-1.5 text-[11px] sm:text-xs text-[#2563eb]">
            <ChipIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            <span>
              <span className="font-semibold">{aiToolLabel}</span> {sub.aiTool}
            </span>
          </p>
        )}
      </div>
      {sub.logo && <CompanyLogo src={sub.logo} alt={sub.company} />}
    </div>
  );
}

export function ExperienceEntry({ role, techStackLabel, statusLabel, aiToolLabel }: { role: CVRole; techStackLabel: string; statusLabel: string; aiToolLabel: string }) {
  return (
    <EntryCard>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h3 className="text-lg sm:text-xl font-bold leading-tight">
            {role.title}{" "}
            <MetaText>
              ({role.period}
              {role.employmentType ? `, ${role.employmentType}` : ""})
            </MetaText>
          </h3>
          {role.company && (
            <p className="mt-0.5 text-sm text-foreground/80">{role.company}</p>
          )}
          {role.bullets && <BulletList bullets={role.bullets} />}
        </div>
        {role.logo && (
          <CompanyLogo src={role.logo} alt={role.company ?? role.title} size={role.logoSize} />
        )}
      </div>

      {role.subRoles?.map((s) => <SubRoleBlock key={s.company} sub={s} techStackLabel={techStackLabel} statusLabel={statusLabel} aiToolLabel={aiToolLabel} />)}

      {role.techStack && (
        <p className="mt-3 text-[11px] sm:text-xs text-muted">
          <span className="font-semibold">{techStackLabel}</span> {role.techStack}
        </p>
      )}
    </EntryCard>
  );
}
