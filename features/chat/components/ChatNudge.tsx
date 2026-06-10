export function ChatNudge({
  text,
  dismissLabel,
  onOpen,
  onDismiss,
}: {
  text: string;
  dismissLabel: string;
  onOpen: () => void;
  onDismiss: () => void;
}) {
  return (
    <div className="animate-chat-nudge relative w-[min(78vw,260px)]">
      <button
        type="button"
        onClick={onOpen}
        className="block w-full cursor-pointer rounded-2xl rounded-br-md border border-divider bg-background px-4 py-3 text-left text-[13px] leading-snug shadow-xl transition-transform hover:scale-[1.02]"
      >
        {text}
      </button>
      <button
        type="button"
        onClick={onDismiss}
        aria-label={dismissLabel}
        className="absolute -right-2 -top-2 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-divider bg-background text-muted shadow transition-colors hover:text-foreground"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-3.5 w-3.5"
          aria-hidden
        >
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>
  );
}
