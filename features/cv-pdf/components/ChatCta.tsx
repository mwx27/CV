import { StyleSheet, Text, Link } from "@react-pdf/renderer";
import type { AppLocale } from "@/i18n/routing";
import { MUTED, ACCENT } from "../styles";
import { ExternalLinkIcon } from "./icons";

// Top-right corner invite that replaced the old "Visit maciejwojda.cv" line: an
// emoji + prompt whose tail (`link`) is styled like a link to nudge the reader
// into the chat. `href` is the tracked redirect built in CVDocument.

// Chosen copy: a muted `lead` + a blue underlined `link` tail. Other candidates
// kept around in case we want to swap:
// const COPY: Record<AppLocale, { lead: string; link: string }> = { en: { lead: "Have a question? ",   link: "Ask CV here" }, pl: { lead: "Masz pytanie? ", link: "Zapytaj CV tu" } }
// const COPY: Record<AppLocale, { lead: string; link: string }> = { en: { lead: "Chat with my CV ",    link: "here" },        pl: { lead: "Porozmawiaj z moim CV ", link: "tutaj" } }
// const COPY: Record<AppLocale, { lead: string; link: string }> = { en: { lead: "Questions? ",         link: "Ask my CV here" },   pl: { lead: "Masz pytania? ", link: "Zapytaj moje CV tutaj" } }
// const COPY: Record<AppLocale, { lead: string; link: string }> = { en: { lead: "Have a question? ", link: "Just ask here" }, pl: { lead: "Masz pytanie? ", link: "Zapytaj tu" } };
const COPY: Record<AppLocale, { lead: string; link: string }> = { en: { lead: "You can ", link: "talk with this CV here" }, pl: { lead: "Możesz ", link: "porozmawiać z tym CV tutaj" } };

const v = StyleSheet.create({
  cta: { marginTop: 3, flexDirection: "row", alignItems: "center", textDecoration: "none" },
  emoji: { fontSize: 9 },
  lead: { fontSize: 8, color: MUTED, fontWeight: 700, marginLeft: 4 },
  link: { fontSize: 8, color: ACCENT, fontWeight: 700, letterSpacing: 0.2, textDecoration: "underline" },
});

export function ChatCta({ href, locale }: { href: string; locale: AppLocale }) {
  const copy = COPY[locale];
  return (
    <Link src={href} style={v.cta}>
      <Text style={v.emoji}>💬</Text>
      <Text style={v.lead}>{copy.lead}</Text>
      <Text style={v.link}>{copy.link}</Text>
      <ExternalLinkIcon size={7} color={ACCENT}/>
    </Link>
  );
}
