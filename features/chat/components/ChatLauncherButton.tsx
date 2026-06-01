export function ChatLauncherButton({
  open,
  onToggle,
  openLabel,
  closeLabel,
}: {
  open: boolean;
  onToggle: () => void;
  openLabel: string;
  closeLabel: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={open ? closeLabel : openLabel}
      className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-accent text-white shadow-lg transition-transform hover:scale-105"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-6 w-6"
        aria-hidden
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 17 0z" />
      </svg>
    </button>
  );
}
