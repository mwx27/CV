import { Text, View, Image } from "@react-pdf/renderer";
import type { CVRole } from "@/content/types";
import { s } from "../styles";
import { Bullet } from "./Bullet";
import { SubRoleView, type RoleLabels } from "./SubRoleView";

export function RoleView({
  role,
  labels,
  isLast,
}: {
  role: CVRole;
  labels: RoleLabels;
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
      {role.subRoles?.map((sr) => <SubRoleView key={sr.company} sub={sr} labels={labels} />)}
      {role.techStack && (
        <Text style={s.techStack}>
          <Text style={s.techStackLabel}>{labels.techStack} </Text>
          {role.techStack}
        </Text>
      )}
    </View>
  );
}
