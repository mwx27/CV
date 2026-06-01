export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-8 mb-4 text-3xl font-display uppercase tracking-wider text-foreground border-b-[3px] border-accent pb-1">
      {children}
    </h2>
  );
}
