import type { CVData } from "@/content/types";
import type { AppLocale } from "@/i18n/routing";
import {
  ContactBar,
  DownloadButton,
  EducationBlock,
  ExperienceEntry,
  Header,
  LanguageToggle,
  MainSection,
  SkillsBlock,
} from "./components";

export function CVPage({
  data,
  locale,
}: {
  data: CVData;
  locale: AppLocale;
}) {
  const experienceSections: {
    title: string;
    roles: CVData["aiItExperience"];
    intro?: string;
  }[] = [
    { title: data.sections.aiItExperience, roles: data.aiItExperience, intro: data.aiIntro },
    { title: data.sections.itExperience, roles: data.itExperience },
    { title: data.sections.engineeringExperience, roles: data.engineeringExperience },
  ];

  return (
    <main className="mx-auto max-w-[920px] px-5 sm:px-10 py-8 sm:py-12">
      <div className="no-print mb-6">
        <div className="flex items-center justify-end gap-3">
          <DownloadButton locale={locale} label={data.labels.downloadPdf} />
          <LanguageToggle current={locale} />
        </div>
        {data.lastUpdated && (
          <p className="mt-2 text-right text-xs text-muted">{data.lastUpdated}</p>
        )}
      </div>

      <Header data={data} />
      <ContactBar data={data} />

      {experienceSections.map((s) => (
        <MainSection key={s.title} title={s.title} intro={s.intro}>
          {s.roles.map((role, i) => (
            <ExperienceEntry
              key={i}
              role={role}
              techStackLabel={data.labels.techStack}
              statusLabel={data.labels.status}
              aiToolLabel={data.labels.aiTool}
            />
          ))}
        </MainSection>
      ))}

      <MainSection title={data.sections.education}>
        <EducationBlock data={data} />
      </MainSection>

      <MainSection title={data.sections.skills}>
        <SkillsBlock data={data} />
      </MainSection>

      <MainSection title={data.sections.hobby}>
        <p className="text-sm">{data.hobbies}</p>
      </MainSection>

      <footer className="mt-10 text-[10px] leading-snug text-muted">
        {data.gdprNotice}
      </footer>
    </main>
  );
}
