export function ChatHeader({
  title,
  subtitle,
  closeLabel,
  onClose,
}: {
  title: string;
  subtitle: string;
  closeLabel: string;
  onClose: () => void;
}) {
  return (
    <div className="flex items-start justify-between gap-2 border-b border-divider px-4 py-3">
      <div>
        <p className="text-sm font-bold">{title}</p>
        <p className="text-[11px] text-muted">{subtitle}</p>
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label={closeLabel}
        className="-mr-1 cursor-pointer rounded-full p-1 text-muted hover:bg-divider/60 hover:text-foreground transition-colors"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-4 w-4"
          aria-hidden
        >
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>
  );
}
