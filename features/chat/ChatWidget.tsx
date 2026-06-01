"use client";

import { useEffect, useRef, useState } from "react";
import type { AppLocale } from "@/i18n/routing";
import {
  ChatHeader,
  ChatInput,
  ChatLauncherButton,
  MessageBubble,
  TypingIndicator,
} from "./components";
import { useChat } from "./hooks";
import { chatStrings } from "./strings";

export function ChatWidget({ locale }: { locale: AppLocale }) {
  const t = chatStrings[locale];
  const [open, setOpen] = useState(false);
  const { messages, input, setInput, loading, send } = useChat(locale);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading, open]);

  return (
    <div className="no-print fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div
          role="dialog"
          aria-label={t.title}
          className="flex h-[min(70vh,560px)] w-[min(92vw,380px)] flex-col overflow-hidden rounded-2xl border border-divider bg-background shadow-2xl"
        >
          <ChatHeader
            title={t.title}
            subtitle={t.subtitle}
            closeLabel={t.close}
            onClose={() => setOpen(false)}
          />

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <MessageBubble key={i} message={m} />
            ))}
            {loading && <TypingIndicator />}
          </div>

          <ChatInput
            value={input}
            onChange={setInput}
            onSend={() => void send()}
            disabled={loading}
            placeholder={t.placeholder}
            sendLabel={t.send}
          />
        </div>
      )}

      <ChatLauncherButton
        open={open}
        onToggle={() => setOpen((o) => !o)}
        openLabel={t.open}
        closeLabel={t.close}
      />
    </div>
  );
}
