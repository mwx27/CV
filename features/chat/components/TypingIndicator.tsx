export function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="rounded-2xl bg-divider/50 px-3 py-2 text-sm text-muted">
        <span className="inline-flex gap-1">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:-0.3s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:-0.15s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted" />
        </span>
      </div>
    </div>
  );
}
