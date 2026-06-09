import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { cvEn } from "@/content/cv.en";
import { cvPl } from "@/content/cv.pl";
import { skillGroups } from "@/content/skills";
import type {
  CVData,
  CVEducationEntry,
  CVRole,
  CVSubRole,
} from "@/content/types";

export interface BundleOptions {
  includeInventories?: boolean;
}

export interface BundleResult {
  markdown: string;
  inventoryCount: number;
}

export async function buildKnowledgeBundle(
  opts: BundleOptions = {},
): Promise<BundleResult> {
  const { includeInventories = true } = opts;

  const parts: string[] = [];
  parts.push(header());
  parts.push(formatCV(cvEn, "English"));
  parts.push(formatCV(cvPl, "Polish"));

  let inventoryCount = 0;
  if (includeInventories) {
    const inventories = await loadInventories();
    inventoryCount = inventories.length;
    if (inventories.length > 0) {
      parts.push(
        "\n---\n\n# Project inventories\n\nDetailed prep notes per project — deeper than CV bullets, with candid technical detail and historical context. Treat the FLAGSHIP/SENIOR/SOLID/BASELINE labels as the engineer's own assessment of significance.\n",
      );
      for (const inv of inventories) {
        parts.push(`\n---\n\n## Inventory: ${inv.name}\n\n${inv.content}`);
      }
    }
  }

  return { markdown: parts.join("\n"), inventoryCount };
}

function header(): string {
  return `# Maciej Wojda — knowledge base for AI assistant

This document is the knowledge source for an AI assistant answering questions about Maciej Wojda (software engineer) from recruiters and potential collaborators.

## Source priority

1. **CV (English)** and **CV (Polish)** sections are the authoritative public CV content — same information in two languages.
2. **Project inventories** are detailed prep notes per project, going deeper than CV bullets.
3. If a question can't be answered from this document, say so honestly. Never invent facts about Maciej's work, education, or background.

## Style guidance for the assistant

- Answer in the third person ("Maciej did X", "He worked on Y") — describe him, do not impersonate.
- Match the language of the question (Polish → Polish, English → English).
- Keep answers concise unless asked for detail.
- It's fine to quote short snippets from these sources when useful.`;
}

function formatCV(cv: CVData, lang: string): string {
  const lines: string[] = [];
  lines.push(`\n---\n\n# CV (${lang})\n`);

  lines.push(`## Personal\n`);
  lines.push(`Name: ${cv.name.first} ${cv.name.last}`);
  for (const c of cv.contact) {
    lines.push(`- ${c.icon}: ${c.label} (${c.href})`);
  }

  lines.push(`\n## Tagline\n`);
  for (const t of cv.tagline) {
    lines.push(`- ${stripBold(t)}`);
  }

  lines.push(`\n## ${cv.sections.aiItExperience}\n`);
  for (const role of cv.aiItExperience) {
    lines.push(formatRole(role, cv.labels));
  }

  lines.push(`\n## ${cv.sections.itExperience}\n`);
  for (const role of cv.itExperience) {
    lines.push(formatRole(role, cv.labels));
  }

  lines.push(`\n## ${cv.sections.engineeringExperience}\n`);
  for (const role of cv.engineeringExperience) {
    lines.push(formatRole(role, cv.labels));
  }

  lines.push(`\n## ${cv.sections.education}\n`);
  for (const e of cv.education) {
    lines.push(formatEducation(e));
  }

  lines.push(
    `\n### ${cv.otherEducation.title} (${cv.otherEducation.period})\n`,
  );
  for (const item of cv.otherEducation.items) {
    const link = item.href ? ` (${item.href})` : "";
    const prefix = item.prefix ? `${item.prefix} ` : "";
    lines.push(`- ${prefix}${item.label}${link}`);
  }

  lines.push(`\n## ${cv.sections.skills}\n`);
  lines.push(`### ${cv.labels.skillsTechStack}\n`);
  for (const group of skillGroups) {
    const items = group.items
      .map((item) => (item.ai ? `${item.name} (AI-assisted)` : item.name))
      .join(", ");
    lines.push(`- **${cv.labels.skillGroups[group.key]}:** ${items}`);
  }
  lines.push(`- **${cv.labels.skillsOther}** ${cv.skills.other}`);
  lines.push(`- **${cv.labels.skillsSoft}** ${cv.skills.soft}`);
  lines.push(`- **${cv.labels.skillsLanguages}** ${cv.skills.languages}`);

  lines.push(`\n## ${cv.sections.hobby}\n${cv.hobbies}`);

  return lines.join("\n");
}

function formatRole(role: CVRole, labels: CVData["labels"]): string {
  const lines: string[] = [];
  const employment = role.employmentType ? `, ${role.employmentType}` : "";
  const company = role.company ? ` — ${role.company}` : "";
  lines.push(`\n### ${role.title}${company} (${role.period}${employment})\n`);

  if (role.bullets) {
    for (const b of role.bullets) {
      lines.push(`- ${b}`);
    }
  }
  if (role.techStack) {
    lines.push(`\n${labels.techStack} ${role.techStack}`);
  }
  if (role.subRoles) {
    for (const sub of role.subRoles) {
      lines.push(formatSubRole(sub, labels));
    }
  }
  return lines.join("\n");
}

function formatSubRole(sub: CVSubRole, labels: CVData["labels"]): string {
  const lines: string[] = [];
  lines.push(`\n#### ${sub.company} (${sub.period})\n`);
  if (sub.details && sub.details.length > 0) {
    lines.push(`*${sub.details.join(" · ")}*\n`);
  }
  for (const b of sub.bullets) {
    lines.push(`- ${b}`);
  }
  if (sub.techStack) lines.push(`\n${labels.techStack} ${sub.techStack}`);
  if (sub.aiTool) lines.push(`${labels.aiTool} ${sub.aiTool}`);
  if (sub.status) lines.push(`${labels.status} ${sub.status}`);
  return lines.join("\n");
}

function formatEducation(e: CVEducationEntry): string {
  const lines: string[] = [];
  lines.push(`\n### ${e.degree} — ${e.school} (${e.period})`);
  if (e.details) {
    for (const d of e.details) {
      lines.push(`- ${d}`);
    }
  }
  return lines.join("\n");
}

function stripBold(s: string): string {
  return s.replace(/\*\*([^*]+)\*\*/g, "$1");
}

interface InventoryFile {
  name: string;
  content: string;
}

async function loadInventories(): Promise<InventoryFile[]> {
  const dir = path.join(process.cwd(), "content", "data-inventories-public");
  try {
    const files = await readdir(dir);
    const mdFiles = files.filter((f) => f.endsWith(".md")).sort();
    return await Promise.all(
      mdFiles.map(async (f) => ({
        name: f.replace(/\.md$/, ""),
        content: await readFile(path.join(dir, f), "utf-8"),
      })),
    );
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code !== "ENOENT") {
      console.error(`Failed to load inventories from ${dir}:`, err);
    }
    return [];
  }
}
