import { StyleSheet } from "@react-pdf/renderer";
import type { SkillItem } from "@/content/skills";

export const ACCENT = "#E50914";
export const MUTED = "#6B6B6B";
export const DIVIDER = "#E6E6E6";
export const AI = "#2563EB";
export const AI_FAINT = "#B8CBF5";
export const FG = "#1A1A1A";
export const FG_FAINT = "#B0B0B0";

// Mirrors the web chip encoding: `ai` → blue hue; `level` → weight + lightness
// (faint is markedly paler than regular so the tiers are visually distinct).
export function skillItemStyle(item: SkillItem): { color: string; fontWeight: 400 | 600 } {
  const level = item.level ?? "regular";
  if (item.ai) {
    return { color: level === "faint" ? AI_FAINT : AI, fontWeight: level === "strong" ? 600 : 400 };
  }
  return {
    color: level === "faint" ? FG_FAINT : FG,
    fontWeight: level === "strong" ? 600 : 400,
  };
}

export const s = StyleSheet.create({
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
  skillLegend: { fontSize: 7, color: MUTED, marginTop: 1 },
  skillGroupRow: { marginTop: 2, marginLeft: 10 },
  skillGroupLabel: { fontSize: 7.5, fontWeight: 700, color: MUTED, textTransform: "uppercase", letterSpacing: 0.4 },
  skillValue: { fontSize: 9 },
  hobbies: { fontSize: 9 },
  topRight: { position: "absolute", top: 12, right: 30, alignItems: "flex-end" },
  lastUpdatedText: { fontSize: 8, color: MUTED },
  onlineLinkRow: { marginTop: 3, flexDirection: "row", alignItems: "center" },
  onlineLinkLabel: { fontSize: 8, color: MUTED, fontWeight: 400 },
  onlineLinkUrl: { flexDirection: "row", alignItems: "center" },
  onlineLinkUrlText: { fontSize: 8, color: AI, fontWeight: 400, letterSpacing: 0.2 },
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
