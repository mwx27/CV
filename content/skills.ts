// Single source of truth for the structured "Tech stack" section.
//
// Tech names are language-neutral, so the items live here ONCE (shared by EN/PL);
// only the group headings are localized, via `labels.skillGroups` in each CVData.
//
// Two independent visual axes (see SkillsBlock / CVDocument for the encoding):
//   level — proficiency, drives weight + lightness: strong (vivid) → faint (pale/muted)
//   ai    — learned/used in the agentic era, drives hue: true → blue (the same
//           convention as the "AI tool:" rows in the experience section)

export type SkillLevel = "strong" | "regular" | "faint";

export interface SkillItem {
  name: string;
  /** Proficiency. Defaults to "regular" when omitted. */
  level?: SkillLevel;
  /** Picked up / used in the agentic era — rendered blue. */
  ai?: boolean;
}

export type SkillGroupKey =
  | "languages"
  | "web"
  | "mobile"
  | "blockchain"
  | "backend"
  | "cloud"
  | "ai";

export interface SkillGroup {
  key: SkillGroupKey;
  items: SkillItem[];
}

// Within each group, items are ordered by proficiency: strong → regular → faint.
export const skillGroups: SkillGroup[] = [
  {
    key: "languages",
    items: [
      { name: "TypeScript", level: "strong" },
      { name: "JavaScript", level: "strong" },
      { name: "VBA", level: "strong" },
      { name: "VB.NET", level: "strong" },
      { name: "Python", level: "regular" },
      { name: "C#", level: "faint" },
      { name: "PHP", level: "faint" },
      { name: "C", level: "faint" },
      { name: "C++", level: "faint" },
      { name: "Java", level: "faint" },
      { name: "Free Pascal", level: "faint" },
    ],
  },
  {
    key: "web",
    items: [
      { name: "React", level: "strong" },
      { name: "Next.js", level: "strong" },
      { name: "Vite", level: "strong" },
      { name: "Tailwind CSS", level: "strong" },
      { name: "TanStack Query", level: "strong" },
      { name: "Redux", level: "regular" },
      { name: "Jotai", level: "regular" },
      { name: "Styled Components", level: "regular" },
      { name: "SASS/SCSS", level: "faint" },
    ],
  },
  {
    key: "mobile",
    items: [
      { name: "React Native + Expo", level: "strong" },
      { name: "NativeWind", level: "regular", ai: true },
      { name: "Swift + SwiftUI", level: "regular", ai: true },
      { name: "Kotlin + Jetpack Compose", level: "regular", ai: true },
      { name: "Android Studio", level: "regular", ai: true },
      { name: "Xcode", level: "regular", ai: true },
    ],
  },
  {
    key: "blockchain",
    items: [
      { name: "Ethereum / EVM", level: "strong" },
      { name: "WAGMI", level: "strong" },
      { name: "Ethers", level: "regular" },
      { name: "viem", level: "regular" },
      { name: "Solidity", level: "faint" },
      { name: "Hardhat", level: "faint" },
    ],
  },
  {
    key: "backend",
    items: [
      { name: "Express.js", level: "strong" },
      { name: "Next.js", level: "regular", ai: true },
      { name: "Clerk", level: "regular", ai: true },
      { name: "Redis", level: "regular", ai: true },
      { name: "Node.js", level: "regular" },
      { name: "Firebase", level: "regular" },
      { name: "PostgreSQL", level: "regular" },
      { name: "SQLite", level: "regular" },
      { name: "NestJS", level: "regular" },
      { name: "MySQL", level: "regular" },
      { name: "MongoDB", level: "regular" },
    ],
  },
  {
    key: "cloud",
    items: [
      { name: "Vercel", level: "strong" },
      { name: "Cloudflare", level: "regular", ai: true },
      { name: "Sentry", level: "regular", ai: true },
      { name: "PostHog", level: "regular", ai: true },
      { name: "Google Cloud", level: "regular" },
      { name: "AWS", level: "regular" },
      { name: "Docker", level: "regular" },
      { name: "NewRelic", level: "regular" },
    ],
  },
  {
    key: "ai",
    items: [
      { name: "Claude Code", level: "strong", ai: true },
      { name: "Cursor", level: "regular", ai: true },
      { name: "AI SDK", level: "regular", ai: true },
      { name: "n8n", level: "regular", ai: true },
    ],
  },
];
