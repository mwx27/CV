import { parseInline } from "@/content/inline";
import { MainSectionTitle } from "./MainSectionTitle";

export function MainSection({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <MainSectionTitle rule={!intro}>{title}</MainSectionTitle>
      {intro && (
        <p className="mb-5 border-b-[3px] border-accent pb-1 text-xs leading-relaxed text-ai">
          {parseInline(intro).map((s, i) =>
            s.bold ? (
              <strong key={i} className="font-semibold text-foreground">
                {s.text}
              </strong>
            ) : (
              <span key={i}>{s.text}</span>
            ),
          )}
        </p>
      )}
      <section>{children}</section>
    </>
  );
}
