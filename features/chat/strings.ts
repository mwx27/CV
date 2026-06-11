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
  nudges: string[];
  nudgeDismiss: string;
}

export const chatStrings: Record<AppLocale, ChatStrings> = {
  en: {
    title: "Ask about my CV",
    subtitle: "AI assistant — answers from Maciej's CV",
    greeting:
      "Hi!👋 Who do I have the pleasure of talking to?🙂\n\nAsk me about Maciej's experience, projects or skills.\n\nLeave your email and I'll send you a summary of our chat 📬",
    placeholder: "Ask a question…",
    send: "Send",
    error: "Something went wrong. Please try again.",
    open: "Open chat",
    close: "Close chat",
    nudges: [
      "This CV doesn't tell the whole story. I will 👀",
      "The CV keeps it brief. I talk about projects with no character limit 😏",
      "I know Maciej's strengths… even the ones that didn't make the CV 🤫",
      "Maciej's not here right now, but he left me in charge. I know almost everything 😏",
    ],
    nudgeDismiss: "Dismiss",
  },
  pl: {
    title: "Zapytaj o moje CV",
    subtitle: "Asystent AI — odpowiada na podstawie CV Macieja",
    greeting:
      "Cześć!👋 Z kim mam przyjemność?🙂\n\nZapytaj mnie o doświadczenie, projekty albo umiejętności Macieja.\n\nZostaw mejla, a wyślę Ci podsumowanie naszej rozmowy 📬",
    placeholder: "Zadaj pytanie…",
    send: "Wyślij",
    error: "Coś poszło nie tak. Spróbuj ponownie.",
    open: "Otwórz czat",
    close: "Zamknij czat",
    nudges: [
      "To CV nie mówi wszystkiego. Ja powiem więcej 👀",
      "CV to tylko streszczenie. Ja gadam o projektach bez limitu znaków 😏",
      "Znam mocne strony Macieja… nawet te, których w CV nie napisał 🤫",
      "Macieja tu teraz nie ma, ale zostawił mnie. Wiem prawie wszystko 😏",
    ],
    nudgeDismiss: "Zamknij",
  },
};
