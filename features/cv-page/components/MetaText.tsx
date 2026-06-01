export function MetaText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`text-sm font-normal text-muted ${className ?? ""}`}>
      {children}
    </span>
  );
}
