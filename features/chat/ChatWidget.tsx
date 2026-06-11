"use client";

import { useEffect, useRef, useState } from "react";
import type { AppLocale } from "@/i18n/routing";
import {
  ChatHeader,
  ChatInput,
  ChatLauncherButton,
  ChatNudge,
  MessageBubble,
  TypingIndicator,
} from "./components";
import { useChat } from "./hooks";
import { chatStrings } from "./strings";

// How long a visitor sits idle before the nudge bubble appears.
const NUDGE_DELAY_MS = 4000;

export function ChatWidget({ locale }: { locale: AppLocale }) {
  const t = chatStrings[locale];
  const [open, setOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [nudgeShown, setNudgeShown] = useState(false);
  const [nudgeText, setNudgeText] = useState<string | null>(null);
  const { messages, input, setInput, loading, send } = useChat(locale);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading, open]);

  // Nudge the visitor toward the chat once per session, a few seconds in,
  // with a random teaser from the pool.
  useEffect(() => {
    // Opening the chat retires the nudge for the session — set the flag here
    // too, not only in the timeout, so opening before the delay elapses doesn't
    // let a fresh timer get scheduled on close and nudge an already-engaged visitor.
    if (open) {
      sessionStorage.setItem("cv-chat-nudge-seen", "1");
      return;
    }
    if (sessionStorage.getItem("cv-chat-nudge-seen")) return;
    const id = setTimeout(() => {
      sessionStorage.setItem("cv-chat-nudge-seen", "1");
      const pool = t.nudges;
      setNudgeText(pool[Math.floor(Math.random() * pool.length)]);
      setNudgeShown(true);
    }, NUDGE_DELAY_MS);
    return () => clearTimeout(id);
  }, [open, t.nudges]);

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

      {nudgeText && !open && (
        <ChatNudge
          text={nudgeText}
          dismissLabel={t.nudgeDismiss}
          onOpen={() => {
            setNudgeText(null);
            setOpen(true);
          }}
          onDismiss={() => setNudgeText(null)}
        />
      )}

      <ChatLauncherButton
        open={open}
        onToggle={() => {
          setOpen((o) => !o);
          setHasOpened(true);
        }}
        openLabel={t.open}
        closeLabel={t.close}
        electric={nudgeShown && !hasOpened}
      />
    </div>
  );
}
