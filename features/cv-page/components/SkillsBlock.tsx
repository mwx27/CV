import type { CVData } from "@/content/types";

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-sm leading-snug">
      <p className="font-semibold">{label}</p>
      <p className="mt-0.5 text-foreground/90">{value}</p>
    </div>
  );
}

export function SkillsBlock({ data }: { data: CVData }) {
  return (
    <div className="space-y-3">
      <Row label={data.labels.skillsTechStack} value={data.skills.techStack} />
      <Row label={data.labels.skillsLegacy} value={data.skills.legacy} />
      <Row label={data.labels.skillsOther} value={data.skills.other} />
      <Row label={data.labels.skillsSoft} value={data.skills.soft} />
      <Row label={data.labels.skillsLanguages} value={data.skills.languages} />
    </div>
  );
}
