import { notFound } from "next/navigation";
import { getCv } from "@/content";
import { routing, type AppLocale } from "@/i18n/routing";
import { Header, ContactBar } from "@/components/cv/Header";
import { SectionTitle } from "@/components/cv/SectionTitle";
import { ExperienceEntry } from "@/components/cv/ExperienceEntry";
import { EducationBlock } from "@/components/cv/EducationBlock";
import { SkillsBlock } from "@/components/cv/SkillsBlock";
import { LanguageToggle } from "@/components/cv/LanguageToggle";
import { DownloadButton } from "@/components/cv/DownloadButton";

function isValidLocale(value: string): value is AppLocale {
  return (routing.locales as readonly string[]).includes(value);
}

export default async function CVPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const data = getCv(locale);

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
          <ExperienceEntry key={i} role={role} techStackLabel={data.labels.techStack} statusLabel={data.labels.status} aiToolLabel={data.labels.aiTool} />
        ))}
      </section>

      <SectionTitle>{data.sections.itExperience}</SectionTitle>
      <section>
        {data.itExperience.map((role, i) => (
          <ExperienceEntry key={i} role={role} techStackLabel={data.labels.techStack} statusLabel={data.labels.status} aiToolLabel={data.labels.aiTool} />
        ))}
      </section>

      <SectionTitle>{data.sections.engineeringExperience}</SectionTitle>
      <section>
        {data.engineeringExperience.map((role, i) => (
          <ExperienceEntry key={i} role={role} techStackLabel={data.labels.techStack} statusLabel={data.labels.status} aiToolLabel={data.labels.aiTool} />
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
