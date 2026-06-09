import type { CVData } from "@/content/types";
import { skillGroups, type SkillItem } from "@/content/skills";
import { EntryCard } from "./EntryCard";

// Two axes: `ai` → blue hue; `level` → weight + lightness (strong = vivid, faint = pale).
function chipClass(item: SkillItem): string {
  const level = item.level ?? "regular";
  if (item.ai) {
    if (level === "strong") return "border-ai/40 bg-ai/[0.12] font-medium text-ai";
    if (level === "faint") return "border-ai/15 bg-transparent text-ai/40";
    return "border-ai/20 bg-ai/[0.04] text-ai/85";
  }
  if (level === "strong") return "border-foreground/25 bg-foreground/[0.07] font-medium text-foreground";
  if (level === "faint") return "border-divider/50 bg-transparent text-foreground/40";
  return "border-divider bg-foreground/[0.02] text-foreground/75";
}

function Heading({ children }: { children: React.ReactNode }) {
  return <h3 className="text-base sm:text-lg font-bold">{children}</h3>;
}

function Legend({ data }: { data: CVData }) {
  return (
    <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] text-muted">
      <span className="font-semibold">{data.labels.skillsLegendLabel}:</span>
      <span className="flex items-center gap-1.5">
        <span className="flex gap-0.5">
          <i className="size-2.5 rounded-sm border border-foreground/25 bg-foreground/[0.07]" />
          <i className="size-2.5 rounded-sm border border-divider bg-foreground/[0.02]" />
          <i className="size-2.5 rounded-sm border border-divider/50" />
        </span>
        <span>
          <span className="text-foreground/80">{data.labels.skillsLegendStrong}</span>
          {" → "}
          <span className="text-foreground/40">{data.labels.skillsLegendFaint}</span>
        </span>
      </span>
      <span className="flex items-center gap-1.5">
        <i className="size-2.5 rounded-sm border border-ai/40 bg-ai/[0.12]" />
        <span className="text-ai/90">{data.labels.skillsLegendAgentic}</span>
      </span>
    </div>
  );
}

export function SkillsBlock({ data }: { data: CVData }) {
  return (
    <section>
      <EntryCard density="compact">
        <Heading>{data.labels.skillsTechStack}</Heading>
        <Legend data={data} />
        <div className="mt-2 space-y-2.5 pl-3">
          {skillGroups.map((group) => (
            <div key={group.key}>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">
                {data.labels.skillGroups[group.key]}
              </p>
              <div className="mt-1 flex flex-wrap gap-1">
                {group.items.map((item) => (
                  <span
                    key={item.name}
                    className={`inline-block rounded border px-1.5 py-px text-[11px] leading-tight ${chipClass(item)}`}
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </EntryCard>

      <EntryCard density="compact">
        <Heading>{data.labels.skillsOther}</Heading>
        <p className="mt-0.5 pl-3 text-sm leading-snug text-foreground/90">{data.skills.other}</p>
      </EntryCard>

      <EntryCard density="compact">
        <Heading>{data.labels.skillsSoft}</Heading>
        <p className="mt-0.5 pl-3 text-sm leading-snug text-foreground/90">{data.skills.soft}</p>
      </EntryCard>

      <EntryCard density="compact">
        <Heading>{data.labels.skillsLanguages}</Heading>
        <p className="mt-0.5 pl-3 text-sm leading-snug text-foreground/90">{data.skills.languages}</p>
      </EntryCard>
    </section>
  );
}
