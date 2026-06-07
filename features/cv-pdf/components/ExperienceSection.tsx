import { Text } from "@react-pdf/renderer";
import type { CVRole } from "@/content/types";
import { s } from "../styles";
import { resolveLogos } from "../resolveLogos";
import { RoleView } from "./RoleView";
import type { RoleLabels } from "./SubRoleView";

/** A titled experience block: section heading followed by its list of roles. */
export function ExperienceSection({
  title,
  roles,
  labels,
  origin,
}: {
  title: string;
  roles: CVRole[];
  labels: RoleLabels;
  origin: string;
}) {
  return (
    <>
      <Text style={s.sectionTitle}>{title}</Text>
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
