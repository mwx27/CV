import { Svg, Path, Rect } from "@react-pdf/renderer";
import type { ContactIcon } from "@/content/types";
import { AI } from "../styles";

export function ChipIcon({ size = 9 }: { size?: number }) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size}>
      <Rect x="4" y="4" width="16" height="16" rx="2" stroke={AI} strokeWidth="2" fill="none" />
      <Rect x="9" y="9" width="6" height="6" stroke={AI} strokeWidth="2" fill="none" />
      <Path d="M15 2v2 M15 20v2 M2 15h2 M2 9h2 M20 15h2 M20 9h2 M9 2v2 M9 20v2" stroke={AI} strokeWidth="2" fill="none" />
    </Svg>
  );
}

export function ExternalLinkIcon({ size = 7 }: { size?: number }) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} style={{ marginLeft: 2 }}>
      <Path d="M14 4h6v6 M20 4l-9 9" stroke={AI} strokeWidth="2.2" fill="none" />
      <Path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" stroke={AI} strokeWidth="2.2" fill="none" />
    </Svg>
  );
}

export function PdfContactIcon({ name, size = 9 }: { name: ContactIcon; size?: number }) {
  switch (name) {
    case "phone":
      return (
        <Svg viewBox="0 0 24 24" width={size} height={size}>
          <Path
            d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.05-.24 11.36 11.36 0 0 0 3.56.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.47.57 3.56a1 1 0 0 1-.24 1.05l-2.21 2.18Z"
            fill="#1A1A1A"
          />
        </Svg>
      );
    case "email":
      return (
        <Svg viewBox="0 0 24 24" width={size} height={size}>
          <Rect x="3" y="5" width="18" height="14" rx="2" stroke="#1A1A1A" strokeWidth="2" fill="none" />
          <Path d="M3 7 L12 13 L21 7" stroke="#1A1A1A" strokeWidth="2" fill="none" />
        </Svg>
      );
    case "github":
      return (
        <Svg viewBox="0 0 24 24" width={size} height={size}>
          <Path
            d="M12 .5a11.5 11.5 0 0 0-3.63 22.41c.57.1.78-.25.78-.55v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.68 1.25 3.34.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.18-1.18 3.18-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.41-5.26 5.69.41.35.78 1.04.78 2.1v3.12c0 .3.21.66.79.55A11.5 11.5 0 0 0 12 .5Z"
            fill="#1A1A1A"
          />
        </Svg>
      );
    case "linkedin":
      return (
        <Svg viewBox="0 0 24 24" width={size} height={size}>
          <Path
            d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.84v1.64h.05c.54-1.02 1.85-2.1 3.81-2.1 4.07 0 4.82 2.68 4.82 6.16V21h-4v-5.62c0-1.34-.02-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97V21h-4V9Z"
            fill="#1A1A1A"
          />
        </Svg>
      );
  }
}
