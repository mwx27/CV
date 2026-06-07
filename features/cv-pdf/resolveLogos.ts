import type { CVRole } from "@/content/types";

/** Prefix every role/sub-role logo path with `origin` so @react-pdf can fetch it. */
export function resolveLogos(role: CVRole, origin: string): CVRole {
  return {
    ...role,
    logo: role.logo ? `${origin}${role.logo}` : role.logo,
    subRoles: role.subRoles?.map((sr) => ({
      ...sr,
      logo: sr.logo ? `${origin}${sr.logo}` : sr.logo,
    })),
  };
}
