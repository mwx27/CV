import type { CVData, CVEducationEntry } from "@/content/types";
import { EntryCard } from "./EntryCard";
import { MetaText } from "./MetaText";

function EducationItem({ entry }: { entry: CVEducationEntry }) {
  return (
    <EntryCard density="compact">
      <h3 className="text-base sm:text-lg font-bold">
        {entry.degree}, {entry.school} <MetaText>{entry.period}</MetaText>
      </h3>
      {entry.details?.map((d, i) => (
        <p key={i} className="mt-1 text-sm leading-snug">
          {d}
        </p>
      ))}
    </EntryCard>
  );
}

export function EducationBlock({ data }: { data: CVData }) {
  return (
    <>
      {data.education.map((e) => (
        <EducationItem key={e.degree + e.school} entry={e} />
      ))}
      <EntryCard density="compact">
        <h3 className="text-base sm:text-lg font-bold">
          {data.otherEducation.title} <MetaText>{data.otherEducation.period}</MetaText>
        </h3>
        <ul className="mt-1 text-sm leading-snug space-y-0.5">
          {data.otherEducation.items.map((item, i) => (
            <li key={i}>
              {item.prefix && <span className="mr-2">{item.prefix}</span>}
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-divider underline-offset-2 hover:text-accent"
                >
                  {item.label}
                </a>
              ) : (
                <span>{item.label}</span>
              )}
            </li>
          ))}
        </ul>
      </EntryCard>
    </>
  );
}
