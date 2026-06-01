import type { AppLocale } from "@/i18n/routing";

export interface ChatStrings {
  title: string;
  subtitle: string;
  greeting: string;
  placeholder: string;
  send: string;
  error: string;
  open: string;
  close: string;
}

export const chatStrings: Record<AppLocale, ChatStrings> = {
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
