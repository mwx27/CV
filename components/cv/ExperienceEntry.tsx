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

function SubRoleBlock({ sub }: { sub: CVSubRole }) {
  return (
    <div className="mt-3 flex items-start justify-between gap-3">
      <div className="flex-1">
        <div>
          <span className="text-[15px] font-semibold">{sub.company}</span>{" "}
          <MetaText>{sub.period}</MetaText>
        </div>
        <BulletList bullets={sub.bullets} />
      </div>
      {sub.logo && <CompanyLogo src={sub.logo} alt={sub.company} />}
    </div>
  );
}

export function ExperienceEntry({ role, techStackLabel }: { role: CVRole; techStackLabel: string }) {
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
        {role.logo && !role.subRoles && (
          <CompanyLogo src={role.logo} alt={role.company ?? role.title} size={role.logoSize} />
        )}
      </div>

      {role.subRoles?.map((s) => <SubRoleBlock key={s.company} sub={s} />)}

      {role.techStack && (
        <p className="mt-3 text-xs sm:text-sm text-muted">
          <span className="font-semibold">{techStackLabel}</span> {role.techStack}
        </p>
      )}
    </EntryCard>
  );
}
