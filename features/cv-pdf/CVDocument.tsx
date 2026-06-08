import { Document, Page, Text, View, Image, Link } from "@react-pdf/renderer";
import type { CVData } from "@/content/types";
import type { AppLocale } from "@/i18n/routing";
import { parseInline } from "@/content/inline";
import { s } from "./styles";
import { ensureFontsRegistered } from "./fonts";
import { ExperienceSection, PdfContactIcon, ExternalLinkIcon } from "./components";

// Shown as the online-version link text. Hardcoded (not derived from `origin`)
// so the PDF reads "maciejwojda.cv" even when generated locally — the link
// itself uses `origin` so it still resolves in dev.
const SITE_DOMAIN = "maciejwojda.cv";

const ONLINE_LINK_LABEL: Record<AppLocale, string> = {
  en: "Visit",
  pl: "Odwiedź",
};

export function CVDocument({
  data,
  origin,
  locale,
  downloadId,
}: {
  data: CVData;
  origin: string;
  locale: AppLocale;
  downloadId?: string;
}) {
  ensureFontsRegistered(origin);
  const photo = `${origin}${data.photo}`;
  return (
    <Document
      title={`${data.name.first} ${data.name.last} — CV`}
      author={`${data.name.first} ${data.name.last}`}
      keywords={downloadId ? `dl:${downloadId}` : undefined}
    >
      <Page size="A4" style={s.page}>
        <View style={s.topRight}>
          {data.lastUpdated ? (
            <Text style={s.lastUpdatedText}>{data.lastUpdated}</Text>
          ) : null}
          <View style={s.onlineLinkRow}>
            <Text style={s.onlineLinkLabel}>{ONLINE_LINK_LABEL[locale]} </Text>
            <Link src={origin} style={s.onlineLinkUrl}>
              <Text style={s.onlineLinkUrlText}>{SITE_DOMAIN}</Text>
              <ExternalLinkIcon size={7} />
            </Link>
          </View>
        </View>
        <View style={s.headerRow}>
          <Image src={photo} style={s.photo} />
          <View style={s.headerMain}>
            <View style={{ flexDirection: "row", alignItems: "baseline" }}>
              <Text style={s.nameRow}>{data.name.first} </Text>
              <Text style={[s.nameRow, s.nameAccent]}>{data.name.last}</Text>
            </View>
            <View style={s.tagline}>
              {data.tagline.map((line, i) => (
                <Text key={i}>
                  {parseInline(line).map((sp, j) =>
                    sp.bold ? (
                      <Text key={j} style={{ fontWeight: 700 }}>
                        {sp.text}
                      </Text>
                    ) : (
                      <Text key={j}>{sp.text}</Text>
                    ),
                  )}
                </Text>
              ))}
            </View>
          </View>
        </View>

        <View style={s.contactRow}>
          {data.contact.map((c) => (
            <View key={c.href} style={s.contactItem}>
              <PdfContactIcon name={c.icon} size={9} />
              <Link src={c.href} style={s.contactLink}>
                {c.label}
              </Link>
            </View>
          ))}
        </View>

        <ExperienceSection title={data.sections.aiItExperience} roles={data.aiItExperience} labels={data.labels} origin={origin} />
      </Page>

      <Page size="A4" style={s.page}>
        <ExperienceSection title={data.sections.itExperience} roles={data.itExperience} labels={data.labels} origin={origin} />
      </Page>

      <Page size="A4" style={s.page}>
        <ExperienceSection title={data.sections.engineeringExperience} roles={data.engineeringExperience} labels={data.labels} origin={origin} />

        <Text style={s.sectionTitle}>{data.sections.education}</Text>
        {data.education.map((e) => (
          <View key={e.degree + e.school} style={s.entry} wrap={false}>
            <Text style={s.roleTitle}>
              {e.degree}, {e.school} <Text style={s.rolePeriod}>{e.period}</Text>
            </Text>
            {e.details?.map((d, i) => <Text key={i} style={{ marginTop: 1, fontSize: 9 }}>{d}</Text>)}
          </View>
        ))}
        <View style={[s.entry, s.entryLast]} wrap={false}>
          <Text style={s.roleTitle}>
            {data.otherEducation.title} <Text style={s.rolePeriod}>{data.otherEducation.period}</Text>
          </Text>
          {data.otherEducation.items.map((it, i) => (
            <Text key={i} style={{ marginTop: 1, fontSize: 9 }}>
              {it.prefix ? `${it.prefix} ` : ""}
              {it.href ? <Link src={it.href} style={s.contactItem}>{it.label}</Link> : it.label}
            </Text>
          ))}
        </View>

        <Text style={s.sectionTitle}>{data.sections.skills}</Text>
        <View style={s.skillRow}>
          <Text style={s.skillLabel}>{data.labels.skillsTechStack}</Text>
          <Text style={s.skillValue}>{data.skills.techStack}</Text>
        </View>
        <View style={s.skillRow}>
          <Text style={s.skillLabel}>{data.labels.skillsLegacy}</Text>
          <Text style={s.skillValue}>{data.skills.legacy}</Text>
        </View>
        <View style={s.skillRow}>
          <Text style={s.skillLabel}>{data.labels.skillsOther}</Text>
          <Text style={s.skillValue}>{data.skills.other}</Text>
        </View>
        <View style={s.skillRow}>
          <Text style={s.skillLabel}>{data.labels.skillsSoft}</Text>
          <Text style={s.skillValue}>{data.skills.soft}</Text>
        </View>
        <View style={s.skillRow}>
          <Text style={s.skillLabel}>{data.labels.skillsLanguages}</Text>
          <Text style={s.skillValue}>{data.skills.languages}</Text>
        </View>

        <Text style={s.sectionTitle}>{data.sections.hobby}</Text>
        <Text style={s.hobbies}>{data.hobbies}</Text>

        <Text style={s.gdpr}>{data.gdprNotice}</Text>
      </Page>
    </Document>
  );
}
