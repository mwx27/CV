import { Document, Page, Text, View, StyleSheet, Image, Link, Font, Svg, Path, Rect } from "@react-pdf/renderer";
import type { CVData, CVRole, CVSubRole, ContactIcon } from "@/content/types";
import { parseInline } from "@/content/inline";

let fontsRegistered = false;
function ensureFontsRegistered(origin: string) {
  if (fontsRegistered) return;
  Font.register({
    family: "Raleway",
    fonts: [
      { src: `${origin}/fonts/Raleway-400.ttf`, fontWeight: 400 },
      { src: `${origin}/fonts/Raleway-600.ttf`, fontWeight: 600 },
      { src: `${origin}/fonts/Raleway-700.ttf`, fontWeight: 700 },
    ],
  });
  Font.register({
    family: "BebasNeuePL",
    fonts: [{ src: `${origin}/fonts/BebasNeue-Regular.ttf`, fontWeight: 400 }],
  });
  fontsRegistered = true;
}

const ACCENT = "#E50914";
const MUTED = "#6B6B6B";
const DIVIDER = "#E6E6E6";
const AI = "#2563EB";

const s = StyleSheet.create({
  page: {
    paddingHorizontal: 30,
    paddingTop: 24,
    paddingBottom: 18,
    fontFamily: "Raleway",
    fontSize: 8.5,
    color: "#1A1A1A",
    lineHeight: 1.3,
  },
  headerRow: { flexDirection: "row", alignItems: "center" },
  photo: { width: 78, height: 78, borderRadius: 39, objectFit: "cover", flexShrink: 0 },
  headerMain: { flex: 1, marginLeft: 14, flexDirection: "column" },
  nameRow: { fontFamily: "BebasNeuePL", fontSize: 32, fontWeight: 400, letterSpacing: 0.5, lineHeight: 1.05 },
  nameAccent: { color: ACCENT },
  tagline: { marginTop: 4, fontSize: 8.5, lineHeight: 1.35, flexDirection: "column" },
  contactRow: { flexDirection: "row", flexWrap: "wrap", marginTop: 8, fontSize: 8.5 },
  contactItem: { flexDirection: "row", alignItems: "center", marginRight: 14 },
  contactLink: { color: "#1A1A1A", textDecoration: "none", marginLeft: 4 },
  sectionTitle: {
    marginTop: 8,
    marginBottom: 5,
    fontFamily: "BebasNeuePL",
    fontSize: 16,
    fontWeight: 400,
    letterSpacing: 1,
    textTransform: "uppercase",
    borderBottomWidth: 2,
    borderBottomColor: ACCENT,
    paddingBottom: 5,
  },
  entry: { marginBottom: 4, paddingBottom: 3, borderBottomWidth: 0.5, borderBottomColor: ACCENT },
  entryLast: { borderBottomWidth: 0, marginBottom: 0, paddingBottom: 0 },
  entryHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  entryHeaderMain: { flex: 1, paddingRight: 8 },
  roleTitle: { fontSize: 10.5, fontWeight: 700 },
  rolePeriod: { fontSize: 8.5, fontWeight: 400, color: MUTED },
  company: { marginTop: 1, fontSize: 8.5 },
  logo: { height: 24, width: 76, objectFit: "contain", objectPosition: "right", flexShrink: 0 },
  logoLg: { height: 48, width: 56, objectFit: "contain", objectPosition: "right", flexShrink: 0 },
  bulletRow: { flexDirection: "row", marginTop: 1 },
  bulletDot: { width: 8, marginLeft: 4, fontSize: 8.5 },
  bulletText: { flex: 1, fontSize: 8.5 },
  subRole: { marginTop: 4, paddingTop: 4, borderTopWidth: 0.5, borderTopColor: "#d4d4d4" },
  subRoleHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  subRoleCompany: { fontSize: 9.5, fontWeight: 600 },
  subRolePeriod: { fontSize: 8.5, color: MUTED, marginTop: 1 },
  techStack: { marginTop: 3, fontSize: 7.5, color: MUTED },
  techStackLabel: { fontWeight: 700 },
  subTechStack: { marginTop: 1, fontSize: 7.5, color: MUTED },
  aiRow: { marginTop: 1, fontSize: 7.5, color: AI, flexDirection: "row", alignItems: "center" },
  aiRowLabel: { fontSize: 7.5, color: AI, marginLeft: 3, fontWeight: 700 },
  aiRowText: { fontSize: 7.5, color: AI },
  statusRow: { marginTop: 3, fontSize: 7.5, color: MUTED },
  skillRow: { marginTop: 2 },
  skillLabel: { fontSize: 9, fontWeight: 700 },
  skillValue: { fontSize: 9 },
  hobbies: { fontSize: 9 },
  lastUpdatedTop: { position: "absolute", top: 12, right: 30, fontSize: 8, color: MUTED },
  gdpr: {
    position: "absolute",
    bottom: 18,
    left: 30,
    right: 30,
    fontSize: 6,
    color: MUTED,
    lineHeight: 1.3,
  },
});

function ChipIcon({ size = 9 }: { size?: number }) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size}>
      <Rect x="4" y="4" width="16" height="16" rx="2" stroke={AI} strokeWidth="2" fill="none" />
      <Rect x="9" y="9" width="6" height="6" stroke={AI} strokeWidth="2" fill="none" />
      <Path d="M15 2v2 M15 20v2 M2 15h2 M2 9h2 M20 15h2 M20 9h2 M9 2v2 M9 20v2" stroke={AI} strokeWidth="2" fill="none" />
    </Svg>
  );
}

function Bullet({ text }: { text: string }) {
  return (
    <View style={s.bulletRow}>
      <Text style={s.bulletDot}>•</Text>
      <Text style={s.bulletText}>{text}</Text>
    </View>
  );
}

function PdfContactIcon({ name, size = 9 }: { name: ContactIcon; size?: number }) {
  switch (name) {
    case "phone":
      return (
        <Svg viewBox="0 0 24 24" width={size} height={size}>
          <Path
            d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.05-.24 11.36 11.36 0 0 0 3.56.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.47.57 3.56a1 1 0 0 1-.24 1.05l-2.21 2.18Z"
            fill="#1A1A1A"
          />
        </Svg>
      );
    case "email":
      return (
        <Svg viewBox="0 0 24 24" width={size} height={size}>
          <Rect x="3" y="5" width="18" height="14" rx="2" stroke="#1A1A1A" strokeWidth="2" fill="none" />
          <Path d="M3 7 L12 13 L21 7" stroke="#1A1A1A" strokeWidth="2" fill="none" />
        </Svg>
      );
    case "github":
      return (
        <Svg viewBox="0 0 24 24" width={size} height={size}>
          <Path
            d="M12 .5a11.5 11.5 0 0 0-3.63 22.41c.57.1.78-.25.78-.55v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.68 1.25 3.34.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.18-1.18 3.18-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.41-5.26 5.69.41.35.78 1.04.78 2.1v3.12c0 .3.21.66.79.55A11.5 11.5 0 0 0 12 .5Z"
            fill="#1A1A1A"
          />
        </Svg>
      );
    case "linkedin":
      return (
        <Svg viewBox="0 0 24 24" width={size} height={size}>
          <Path
            d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.84v1.64h.05c.54-1.02 1.85-2.1 3.81-2.1 4.07 0 4.82 2.68 4.82 6.16V21h-4v-5.62c0-1.34-.02-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97V21h-4V9Z"
            fill="#1A1A1A"
          />
        </Svg>
      );
  }
}

function SubRoleView({ sub, techStackLabel, statusLabel, aiToolLabel }: { sub: CVSubRole; techStackLabel: string; statusLabel: string; aiToolLabel: string }) {
  return (
    <View style={s.subRole}>
      <View style={s.subRoleHeader}>
        <View style={{ flex: 1 }}>
          <Text>
            <Text style={s.subRoleCompany}>{sub.company} </Text>
            <Text style={s.subRolePeriod}>({sub.period})</Text>
          </Text>
          {sub.details && sub.details.length > 0 && (
            <Text style={s.subRolePeriod}>{sub.details.join(" • ")}</Text>
          )}
          {sub.bullets.map((b, i) => <Bullet key={i} text={b} />)}
          {sub.status && (
            <Text style={s.statusRow}>
              <Text style={s.techStackLabel}>{statusLabel} </Text>
              {sub.status}
            </Text>
          )}
          {sub.techStack && (
            <Text style={s.subTechStack}>
              <Text style={s.techStackLabel}>{techStackLabel} </Text>
              {sub.techStack}
            </Text>
          )}
          {sub.aiTool && (
            <View style={s.aiRow}>
              <ChipIcon size={8} />
              <Text style={s.aiRowLabel}>{aiToolLabel} </Text>
              <Text style={s.aiRowText}>{sub.aiTool}</Text>
            </View>
          )}
        </View>
        {sub.logo && <Image src={sub.logo} style={s.logo} />}
      </View>
    </View>
  );
}

function RoleView({
  role,
  techStackLabel,
  statusLabel,
  aiToolLabel,
  isLast,
}: {
  role: CVRole;
  techStackLabel: string;
  statusLabel: string;
  aiToolLabel: string;
  isLast?: boolean;
}) {
  return (
    <View style={isLast ? [s.entry, s.entryLast] : s.entry}>
      <View style={s.entryHeader}>
        <View style={s.entryHeaderMain}>
          <Text>
            <Text style={s.roleTitle}>{role.title} </Text>
            <Text style={s.rolePeriod}>
              ({role.period}{role.employmentType ? `, ${role.employmentType}` : ""})
            </Text>
          </Text>
          {role.company && <Text style={s.company}>{role.company}</Text>}
          {role.bullets?.map((b, i) => <Bullet key={i} text={b} />)}
        </View>
        {role.logo && (
          <Image src={role.logo} style={role.logoSize === "lg" ? s.logoLg : s.logo} />
        )}
      </View>
      {role.subRoles?.map((sr) => <SubRoleView key={sr.company} sub={sr} techStackLabel={techStackLabel} statusLabel={statusLabel} aiToolLabel={aiToolLabel} />)}
      {role.techStack && (
        <Text style={s.techStack}>
          <Text style={s.techStackLabel}>{techStackLabel} </Text>
          {role.techStack}
        </Text>
      )}
    </View>
  );
}

export function CVDocument({ data, origin }: { data: CVData; origin: string }) {
  ensureFontsRegistered(origin);
  const photo = `${origin}${data.photo}`;
  return (
    <Document title={`${data.name.first} ${data.name.last} — CV`} author={`${data.name.first} ${data.name.last}`}>
      <Page size="A4" style={s.page}>
        {data.lastUpdated ? (
          <Text style={s.lastUpdatedTop}>{data.lastUpdated}</Text>
        ) : null}
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

        <Text style={s.sectionTitle}>{data.sections.aiItExperience}</Text>
        {data.aiItExperience.map((r, i) => (
          <RoleView
            key={i}
            role={resolveLogos(r, origin)}
            techStackLabel={data.labels.techStack}
            statusLabel={data.labels.status}
            aiToolLabel={data.labels.aiTool}
            isLast={i === data.aiItExperience.length - 1}
          />
        ))}

      </Page>

      <Page size="A4" style={s.page}>
        <Text style={s.sectionTitle}>{data.sections.itExperience}</Text>
        {data.itExperience.map((r, i) => (
          <RoleView
            key={i}
            role={resolveLogos(r, origin)}
            techStackLabel={data.labels.techStack}
            statusLabel={data.labels.status}
            aiToolLabel={data.labels.aiTool}
            isLast={i === data.itExperience.length - 1}
          />
        ))}
      </Page>

      <Page size="A4" style={s.page}>
        <Text style={s.sectionTitle}>{data.sections.engineeringExperience}</Text>
        {data.engineeringExperience.map((r, i) => (
          <RoleView
            key={i}
            role={resolveLogos(r, origin)}
            techStackLabel={data.labels.techStack}
            statusLabel={data.labels.status}
            aiToolLabel={data.labels.aiTool}
            isLast={i === data.engineeringExperience.length - 1}
          />
        ))}

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

function resolveLogos(role: CVRole, origin: string): CVRole {
  return {
    ...role,
    logo: role.logo ? `${origin}${role.logo}` : role.logo,
    subRoles: role.subRoles?.map((sr) => ({
      ...sr,
      logo: sr.logo ? `${origin}${sr.logo}` : sr.logo,
    })),
  };
}
