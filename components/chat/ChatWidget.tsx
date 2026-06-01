"use client";

import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { AppLocale } from "@/i18n/routing";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const strings: Record<
  AppLocale,
  {
    title: string;
    subtitle: string;
    greeting: string;
    placeholder: string;
    send: string;
    error: string;
    open: string;
    close: string;
  }
> = {
  en: {
    title: "Ask about my CV",
    subtitle: "AI assistant — answers from Maciej's CV",
    greeting:
      "Hi! Ask me anything about Maciej's experience, projects or skills.",
    placeholder: "Ask a question…",
    send: "Send",
    error: "Something went wrong. Please try again.",
    open: "Open chat",
    close: "Close chat",
  },
  pl: {
    title: "Zapytaj o moje CV",
    subtitle: "Asystent AI — odpowiada na podstawie CV Macieja",
    greeting:
      "Cześć! Zapytaj mnie o doświadczenie, projekty albo umiejętności Macieja.",
    placeholder: "Zadaj pytanie…",
    send: "Wyślij",
    error: "Coś poszło nie tak. Spróbuj ponownie.",
    open: "Otwórz czat",
    close: "Zamknij czat",
  },
};

export function ChatWidget({ locale }: { locale: AppLocale }) {
  const t = strings[locale];
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: t.greeting },
  ]);
  const [sessionId] = useState(() => crypto.randomUUID());
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading, open]);

  // Auto-grow the textarea up to its CSS max-height (then it scrolls).
  // Runs on every input change, including the reset to "" after send.
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [input]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    setMessages((m) => [...m, { role: "user", content: text }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, sessionId }),
      });
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      setMessages((m) => [
        ...m,
        { role: "assistant", content: data.answer as string },
      ]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: t.error }]);
    } finally {
      setLoading(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void send();
    }
  }

  return (
    <div className="no-print fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div
          role="dialog"
          aria-label={t.title}
          className="flex h-[min(70vh,560px)] w-[min(92vw,380px)] flex-col overflow-hidden rounded-2xl border border-divider bg-background shadow-2xl"
        >
          <div className="flex items-start justify-between gap-2 border-b border-divider px-4 py-3">
            <div>
              <p className="text-sm font-bold">{t.title}</p>
              <p className="text-[11px] text-muted">{t.subtitle}</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t.close}
              className="-mr-1 rounded-full p-1 text-muted hover:bg-divider/60 hover:text-foreground transition-colors"
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

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  m.role === "user" ? "flex justify-end" : "flex justify-start"
                }
              >
                <div
                  className={
                    "max-w-[85%] rounded-2xl px-3 py-2 text-sm " +
                    (m.role === "user"
                      ? "whitespace-pre-wrap bg-accent text-white"
                      : "bg-divider/50 text-foreground")
                  }
                >
                  {m.role === "user" ? (
                    m.content
                  ) : (
                    <div className="space-y-2 [&_a]:text-accent [&_a]:underline [&_code]:rounded [&_code]:bg-divider/70 [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-[12px] [&_h1]:mt-2 [&_h1]:text-base [&_h1]:font-bold [&_h2]:mt-2 [&_h2]:text-sm [&_h2]:font-bold [&_h3]:mt-2 [&_h3]:text-sm [&_h3]:font-semibold [&_hr]:my-2 [&_hr]:border-divider [&_ol]:list-decimal [&_ol]:pl-5 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0 [&_pre]:overflow-x-auto [&_pre]:rounded [&_pre]:bg-divider/70 [&_pre]:p-2 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_ul]:list-disc [&_ul]:pl-5">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          a: ({ href, children }) => (
                            <a
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {children}
                            </a>
                          ),
                        }}
                      >
                        {m.content}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-divider/50 px-3 py-2 text-sm text-muted">
                  <span className="inline-flex gap-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted" />
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-divider p-3">
            <div className="flex items-end gap-2">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder={t.placeholder}
                rows={1}
                className="max-h-28 flex-1 resize-none overflow-y-auto rounded-xl border border-divider bg-background px-3 py-2 text-sm outline-none focus:border-muted"
              />
              <button
                type="button"
                onClick={() => void send()}
                disabled={loading || !input.trim()}
                className="rounded-xl bg-accent px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-accent/90 disabled:opacity-40"
              >
                {t.send}
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? t.close : t.open}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-lg transition-transform hover:scale-105"
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
    </div>
  );
}
