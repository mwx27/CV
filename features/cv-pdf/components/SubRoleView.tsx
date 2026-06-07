import { Text, View, Image } from "@react-pdf/renderer";
import type { CVData, CVSubRole } from "@/content/types";
import { s } from "../styles";
import { Bullet } from "./Bullet";
import { ChipIcon } from "./icons";

/** The three per-entry labels threaded through the role components. */
export type RoleLabels = Pick<CVData["labels"], "techStack" | "status" | "aiTool">;

export function SubRoleView({ sub, labels }: { sub: CVSubRole; labels: RoleLabels }) {
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
              <Text style={s.techStackLabel}>{labels.status} </Text>
              {sub.status}
            </Text>
          )}
          {sub.techStack && (
            <Text style={s.subTechStack}>
              <Text style={s.techStackLabel}>{labels.techStack} </Text>
              {sub.techStack}
            </Text>
          )}
          {sub.aiTool && (
            <View style={s.aiRow}>
              <ChipIcon size={8} />
              <Text style={s.aiRowLabel}>{labels.aiTool} </Text>
              <Text style={s.aiRowText}>{sub.aiTool}</Text>
            </View>
          )}
        </View>
        {sub.logo && <Image src={sub.logo} style={s.logo} />}
      </View>
    </View>
  );
}
