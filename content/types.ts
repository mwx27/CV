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
  bullets: string[];
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
  techStack: string;
  legacy: string;
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
    itExperience: string;
    engineeringExperience: string;
    education: string;
    skills: string;
    hobby: string;
  };
  labels: {
    techStack: string;
    skillsTechStack: string;
    skillsLegacy: string;
    skillsOther: string;
    skillsSoft: string;
    skillsLanguages: string;
    downloadPdf: string;
    others: string;
  };
  itExperience: CVRole[];
  engineeringExperience: CVRole[];
  education: CVEducationEntry[];
  otherEducation: { title: string; period: string; items: CVOtherItem[] };
  skills: CVSkills;
  hobbies: string;
  gdprNotice: string;
}
