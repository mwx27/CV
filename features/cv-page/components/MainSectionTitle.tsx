export function MainSectionTitle({
  children,
  rule = true,
}: {
  children: React.ReactNode;
  /** Draw the accent underline beneath the heading. Off when an intro carries the rule instead. */
  rule?: boolean;
}) {
  return (
    <h2
      className={`mt-8 text-3xl font-display uppercase tracking-wider text-foreground ${
        rule ? "mb-4 border-b-[3px] border-accent pb-1" : "-mb-1"
      }`}
    >
      {children}
    </h2>
  );
}
