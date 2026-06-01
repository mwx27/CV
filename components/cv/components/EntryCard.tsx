export function EntryCard({
  children,
  density = "default",
}: {
  children: React.ReactNode;
  density?: "default" | "compact";
}) {
  const spacing = density === "compact" ? "pb-4 mb-4" : "pb-5 mb-5";
  return (
    <article
      className={`border-b border-accent ${spacing} last:border-b-0 last:mb-0`}
    >
      {children}
    </article>
  );
}
