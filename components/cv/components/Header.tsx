import Image from "next/image";
import type { CVData } from "@/content/types";
import { parseInline } from "@/content/inline";
import { ContactIconGlyph } from "./icons";

function InlineLine({ text }: { text: string }) {
  const spans = parseInline(text);
  return (
    <>
      {spans.map((s, i) =>
        s.bold ? (
          <strong key={i} className="font-bold">
            {s.text}
          </strong>
        ) : (
          <span key={i}>{s.text}</span>
        ),
      )}
    </>
  );
}

export function Header({ data }: { data: CVData }) {
  return (
    <header className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:gap-8">
      <Image
        src={data.photo}
        alt={`${data.name.first} ${data.name.last}`}
        width={140}
        height={140}
        priority
        className="h-32 w-32 sm:h-36 sm:w-36 rounded-full object-cover ring-1 ring-divider"
      />
      <div className="flex-1 text-center sm:text-left">
        <h1 className="font-display text-5xl sm:text-6xl uppercase tracking-wide leading-none">
          <span>{data.name.first}</span>{" "}
          <span className="text-accent">{data.name.last}</span>
        </h1>
        <div className="mt-3 text-sm sm:text-[15px] leading-snug text-foreground/90 space-y-0.5">
          {data.tagline.map((line, i) => (
            <p key={i}>
              <InlineLine text={line} />
            </p>
          ))}
        </div>
      </div>
    </header>
  );
}

export function ContactBar({ data }: { data: CVData }) {
  return (
    <div className="mt-5 flex flex-wrap items-center justify-center sm:justify-start gap-x-4 sm:gap-x-5 gap-y-1.5 text-[13px] sm:text-sm">
      {data.contact.map((c) => (
        <a
          key={c.href}
          href={c.href}
          target={c.href.startsWith("http") ? "_blank" : undefined}
          rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="inline-flex items-center gap-1.5 text-foreground hover:text-accent transition-colors whitespace-nowrap"
        >
          <ContactIconGlyph name={c.icon} className="h-3.5 w-3.5 text-foreground" />
          <span>{c.label}</span>
        </a>
      ))}
    </div>
  );
}
