import { useEffect, useState } from "react";

// Orchestrates the teaser → storm sequence that draws an idle visitor toward the
// chat: a nudge bubble appears, then the electric storm sweeps in and opens the
// chat. The widget owns open/hasOpened; this hook owns the sequence's own state
// (nudge + storm) and the timers/listeners that drive it.

// ── Testing ───────────────────────────────────────────────────────────────
// Single source of truth for tuning the sequence. Flip `enabled` to false for
// production once-per-session behaviour. When enabled, the sequence replays on
// every tab activation (no reload), bypasses the once-per-session guard, and
// uses a quicker lead-in so the storm is easy to watch while tuning.
const TEST = {
  enabled: false,
  nudgeDelayMs: 1000,
};

// How long a visitor sits idle before the nudge bubble appears, and how long
// after that the storm sweeps in. The storm gap doubles as the window to notice
// and read the teaser before the chat auto-opens, so keep it readable-length.
const NUDGE_DELAY_MS = 4000;
const STORM_DELAY_MS = 3500;
const NUDGE_SEEN_KEY = "cv-chat-nudge-seen";

type Params = {
  open: boolean;
  hasOpened: boolean;
  teaser: string;
  setOpen: (open: boolean) => void;
  setHasOpened: (hasOpened: boolean) => void;
};

export function useNudgeStorm({ open, hasOpened, teaser, setOpen, setHasOpened }: Params) {
  const [nudgeShown, setNudgeShown] = useState(false);
  const [nudgeText, setNudgeText] = useState<string | null>(null);
  const [stormActive, setStormActive] = useState(false);

  // Nudge the visitor toward the chat once per session, a few seconds in.
  // (Test mode drives the sequence off tab activation instead — see below.)
  useEffect(() => {
    if (TEST.enabled) return;
    // Opening the chat retires the nudge for the session — set the flag here
    // too, not only in the timeout, so opening before the delay elapses doesn't
    // let a fresh timer get scheduled on close and nudge an already-engaged visitor.
    if (open) {
      sessionStorage.setItem(NUDGE_SEEN_KEY, "1");
      return;
    }
    if (sessionStorage.getItem(NUDGE_SEEN_KEY)) return;
    const id = setTimeout(() => {
      sessionStorage.setItem(NUDGE_SEEN_KEY, "1");
      setNudgeText(teaser);
      setNudgeShown(true);
    }, NUDGE_DELAY_MS);
    return () => clearTimeout(id);
  }, [open, teaser]);

  // A couple of seconds after the nudge lands, the storm sweeps in — unless the
  // visitor already opened the chat, which retires the whole sequence.
  useEffect(() => {
    if (TEST.enabled || !nudgeShown || hasOpened || open) return;
    const id = setTimeout(() => setStormActive(true), STORM_DELAY_MS);
    return () => clearTimeout(id);
  }, [nudgeShown, hasOpened, open]);

  // Test mode: on every tab activation, replay the full sequence — bubble after
  // a short lead-in, then the storm — with no reload. Background tabs freeze
  // rAF, so reacting to activation is the only way the hidden tabs ever play.
  useEffect(() => {
    if (!TEST.enabled) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const play = () => {
      if (document.visibilityState !== "visible") return;
      timers.forEach(clearTimeout);
      timers.length = 0;
      // Tear down any in-flight run (unmounts the canvas), then replay fresh.
      setStormActive(false);
      setOpen(false);
      setHasOpened(false);
      setNudgeShown(false);
      setNudgeText(null);
      timers.push(
        setTimeout(() => {
          setNudgeText(teaser);
          setNudgeShown(true);
        }, TEST.nudgeDelayMs),
        setTimeout(() => setStormActive(true), TEST.nudgeDelayMs + STORM_DELAY_MS),
      );
    };
    // Defer the initial run so it isn't a synchronous setState during commit.
    timers.push(setTimeout(play, 0));
    document.addEventListener("visibilitychange", play);
    window.addEventListener("focus", play);
    return () => {
      timers.forEach(clearTimeout);
      document.removeEventListener("visibilitychange", play);
      window.removeEventListener("focus", play);
    };
  }, [teaser, setOpen, setHasOpened]);

  return {
    nudgeText,
    // The launcher's resting arcs glow while the nudge is live but the chat
    // hasn't been opened yet.
    electric: nudgeShown && !hasOpened,
    stormActive,
    dismissNudge: () => setNudgeText(null),
    openFromNudge: () => {
      setNudgeText(null);
      setOpen(true);
    },
    completeStorm: () => {
      setStormActive(false);
      setNudgeText(null);
      setOpen(true);
      setHasOpened(true);
    },
  };
}
