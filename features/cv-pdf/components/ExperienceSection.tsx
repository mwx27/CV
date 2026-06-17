import { Text } from "@react-pdf/renderer";
import type { CVRole } from "@/content/types";
import { parseInline } from "@/content/inline";
import { s } from "../styles";
import { resolveLogos } from "../resolveLogos";
import { RoleView } from "./RoleView";
import type { RoleLabels } from "./SubRoleView";

/** A titled experience block: section heading followed by its list of roles. */
export function ExperienceSection({
  title,
  intro,
  roles,
  labels,
  origin,
}: {
  title: string;
  intro?: string;
  roles: CVRole[];
  labels: RoleLabels;
  origin: string;
}) {
  return (
    <>
      <Text style={intro ? [s.sectionTitle, s.sectionTitleFlush] : s.sectionTitle}>{title}</Text>
      {intro ? (
        <Text style={s.sectionIntro}>
          {parseInline(intro).map((sp, i) =>
            sp.bold ? (
              <Text key={i} style={{ fontWeight: 700 }}>
                {sp.text}
              </Text>
            ) : (
              <Text key={i}>{sp.text}</Text>
            ),
          )}
        </Text>
      ) : null}
      {roles.map((r, i) => (
        <RoleView
          key={i}
          role={resolveLogos(r, origin)}
          labels={labels}
          isLast={i === roles.length - 1}
        />
      ))}
    </>
  );
}
