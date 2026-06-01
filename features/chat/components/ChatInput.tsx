"use client";

import { useEffect, useRef } from "react";

export function ChatInput({
  value,
  onChange,
  onSend,
  disabled,
  placeholder,
  sendLabel,
}: {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  disabled: boolean;
  placeholder: string;
  sendLabel: string;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-grow the textarea up to its CSS max-height (then it scrolls).
  // Runs on every input change, including the reset to "" after send.
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  }

  return (
    <div className="border-t border-divider p-3">
      <div className="flex items-end gap-2">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          rows={1}
          className="max-h-28 flex-1 resize-none overflow-y-auto rounded-xl border border-divider bg-background px-3 py-2 text-sm outline-none focus:border-muted"
        />
        <button
          type="button"
          onClick={onSend}
          disabled={disabled || !value.trim()}
          className="rounded-xl bg-accent px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-accent/90 disabled:opacity-40"
        >
          {sendLabel}
        </button>
      </div>
    </div>
  );
}
