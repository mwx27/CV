import { useState } from "react";
import type { AppLocale } from "@/i18n/routing";
import type { ChatMessage } from "../components";
import { chatStrings } from "../strings";

export function useChat(locale: AppLocale) {
  const t = chatStrings[locale];
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: t.greeting },
  ]);
  const [sessionId] = useState(() => crypto.randomUUID());

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

  return { messages, input, setInput, loading, send };
}
