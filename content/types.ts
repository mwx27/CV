import type { SkillGroupKey } from "./skills";

export type Locale = "en" | "pl";

export type ContactIcon = "phone" | "email" | "github" | "linkedin";

export interface CVLink {
  label: string;
  href: string;
  icon: ContactIcon;
}

export interface CVSubRole {
  company: string;
  logo?: string;
  period: string;
  details?: string[];
  bullets: string[];
  techStack?: string;
  aiTool?: string;
  status?: string;
}

export interface CVRole {
  title: string;
  company?: string;
  logo?: string;
  logoSize?: "default" | "lg";
  period: string;
  employmentType?: string;
  bullets?: string[];
  techStack?: string;
  subRoles?: CVSubRole[];
}

export interface CVOtherItem {
  label: string;
  href?: string;
  prefix?: string;
}

export interface CVEducationEntry {
  degree: string;
  school: string;
  period: string;
  details?: string[];
}

export interface CVSkills {
  other: string;
  soft: string;
  languages: string;
}

export interface CVData {
  name: { first: string; last: string };
  tagline: string[];
  photo: string;
  contact: CVLink[];
  sections: {
    aiItExperience: string;
    itExperience: string;
    engineeringExperience: string;
    education: string;
    skills: string;
    hobby: string;
  };
  labels: {
    techStack: string;
    status: string;
    aiTool: string;
    skillsTechStack: string;
    skillsLegendLabel: string;
    skillsLegendStrong: string;
    skillsLegendFaint: string;
    skillsLegendAgentic: string;
    skillGroups: Record<SkillGroupKey, string>;
    skillsOther: string;
    skillsSoft: string;
    skillsLanguages: string;
    downloadPdf: string;
    others: string;
  };
  /** Optional lead-in shown under the first (AI) experience section heading. */
  aiIntro?: string;
  aiItExperience: CVRole[];
  itExperience: CVRole[];
  engineeringExperience: CVRole[];
  education: CVEducationEntry[];
  otherEducation: { title: string; period: string; items: CVOtherItem[] };
  skills: CVSkills;
  hobbies: string;
  gdprNotice: string;
  /** Localized "last updated" line, injected by getCv() — not authored per locale. */
  lastUpdated?: string;
}
