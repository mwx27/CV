import { Document, Page, Text, View, Image, Link } from "@react-pdf/renderer";
import type { CVData } from "@/content/types";
import type { AppLocale } from "@/i18n/routing";
import { parseInline } from "@/content/inline";
import { skillGroups } from "@/content/skills";
import { s, skillItemStyle, AI, FG, FG_FAINT } from "./styles";
import { ensureFontsRegistered } from "./fonts";
import { ExperienceSection, PdfContactIcon, ChatCta } from "./components";

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

  // The online-version link routes through /r/<downloadId> instead of the bare
  // site: that redirect drops a hand-off cookie and lands on a clean root, so a
  // recruiter opening the CV can be traced back to this download (the open is
  // fired client-side from the landing page). `?l=<locale>` carries the PDF's
  // language so the /r route can pin it and the landing page opens in the same
  // language. Without a downloadId (link generated outside the tracked download
  // flow) fall back to the bare site — nothing to trace.
  const onlineHref = downloadId
    ? `${origin}/r/${downloadId}?l=${locale}`
    : origin;
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
          <ChatCta href={onlineHref} locale={locale} />
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
        <View style={s.entry}>
          <Text style={s.roleTitle}>{data.labels.skillsTechStack}</Text>
          <Text style={s.skillLegend}>
            <Text style={{ fontWeight: 700 }}>{data.labels.skillsLegendLabel}: </Text>
            <Text style={{ color: FG, fontWeight: 600 }}>{data.labels.skillsLegendStrong}</Text>
            {" → "}
            <Text style={{ color: FG_FAINT }}>{data.labels.skillsLegendFaint}</Text>
            {"   ·   "}
            <Text style={{ color: AI }}>{data.labels.skillsLegendAgentic}</Text>
          </Text>
          {skillGroups.map((group) => (
            <View key={group.key} style={s.skillGroupRow}>
              <Text style={s.skillValue}>
                <Text style={s.skillGroupLabel}>{data.labels.skillGroups[group.key]}  </Text>
                {group.items.map((item, i) => (
                  <Text key={item.name} style={skillItemStyle(item)}>
                    {item.name}
                    {i < group.items.length - 1 ? ", " : ""}
                  </Text>
                ))}
              </Text>
            </View>
          ))}
        </View>
        <View style={s.entry}>
          <Text style={s.roleTitle}>{data.labels.skillsOther}</Text>
          <Text style={[s.skillValue, { marginLeft: 10 }]}>{data.skills.other}</Text>
        </View>
        <View style={s.entry}>
          <Text style={s.roleTitle}>{data.labels.skillsSoft}</Text>
          <Text style={[s.skillValue, { marginLeft: 10 }]}>{data.skills.soft}</Text>
        </View>
        <View style={[s.entry, s.entryLast]}>
          <Text style={s.roleTitle}>{data.labels.skillsLanguages}</Text>
          <Text style={[s.skillValue, { marginLeft: 10 }]}>{data.skills.languages}</Text>
        </View>

        <Text style={s.sectionTitle}>{data.sections.hobby}</Text>
        <Text style={s.hobbies}>{data.hobbies}</Text>

        <Text style={s.gdpr}>{data.gdprNotice}</Text>
      </Page>
    </Document>
  );
}
