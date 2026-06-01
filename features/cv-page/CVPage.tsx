import type { CVData } from "@/content/types";
import type { AppLocale } from "@/i18n/routing";
import {
  ContactBar,
  DownloadButton,
  EducationBlock,
  ExperienceEntry,
  Header,
  LanguageToggle,
  SectionTitle,
  SkillsBlock,
} from "./components";

export function CVPage({
  data,
  locale,
}: {
  data: CVData;
  locale: AppLocale;
}) {
  return (
    <main className="mx-auto max-w-[920px] px-5 sm:px-10 py-8 sm:py-12">
      <div className="no-print mb-6 flex items-center justify-end gap-3">
        <DownloadButton locale={locale} label={data.labels.downloadPdf} />
        <LanguageToggle current={locale} />
      </div>

      <Header data={data} />
      <ContactBar data={data} />

      <SectionTitle>{data.sections.aiItExperience}</SectionTitle>
      <section>
        {data.aiItExperience.map((role, i) => (
          <ExperienceEntry
            key={i}
            role={role}
            techStackLabel={data.labels.techStack}
            statusLabel={data.labels.status}
            aiToolLabel={data.labels.aiTool}
          />
        ))}
      </section>

      <SectionTitle>{data.sections.itExperience}</SectionTitle>
      <section>
        {data.itExperience.map((role, i) => (
          <ExperienceEntry
            key={i}
            role={role}
            techStackLabel={data.labels.techStack}
            statusLabel={data.labels.status}
            aiToolLabel={data.labels.aiTool}
          />
        ))}
      </section>

      <SectionTitle>{data.sections.engineeringExperience}</SectionTitle>
      <section>
        {data.engineeringExperience.map((role, i) => (
          <ExperienceEntry
            key={i}
            role={role}
            techStackLabel={data.labels.techStack}
            statusLabel={data.labels.status}
            aiToolLabel={data.labels.aiTool}
          />
        ))}
      </section>

      <SectionTitle>{data.sections.education}</SectionTitle>
      <EducationBlock data={data} />

      <SectionTitle>{data.sections.skills}</SectionTitle>
      <SkillsBlock data={data} />

      <SectionTitle>{data.sections.hobby}</SectionTitle>
      <p className="text-sm">{data.hobbies}</p>

      <footer className="mt-10 text-[10px] leading-snug text-muted">
        {data.gdprNotice}
      </footer>
    </main>
  );
}
