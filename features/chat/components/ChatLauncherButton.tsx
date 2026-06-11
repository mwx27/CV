export function ChatLauncherButton({
  open,
  onToggle,
  openLabel,
  closeLabel,
  electric = false,
}: {
  open: boolean;
  onToggle: () => void;
  openLabel: string;
  closeLabel: string;
  electric?: boolean;
}) {
  return (
    <div className="relative h-14 w-14">
      {electric && (
        // Inline so the arcs don't depend on the global CSS pipeline.
        <style>{`
          @keyframes chat-arc-flicker {
            0%, 100% { opacity: 0; }
            4%  { opacity: 1; }
            8%  { opacity: 0.15; }
            11% { opacity: 1; }
            16% { opacity: 0; }
          }
          @keyframes chat-arc-burst {
            0%   { opacity: 0; }
            4%   { opacity: 1; }
            29%  { opacity: 1; }
            33%  { opacity: 0; }
            100% { opacity: 0; }
          }
          .chat-arcs {
            filter: drop-shadow(0 0 2px #67e8f9) drop-shadow(0 0 5px #3b82f6);
            animation: chat-arc-burst 3s ease-in-out infinite;
          }
          .chat-arcs path { stroke: #eaffff; stroke-width: 1.4; fill: none;
            stroke-linecap: round; stroke-linejoin: round; opacity: 0; }
          .chat-arc-a { animation: chat-arc-flicker 1.1s steps(1,end) infinite; }
          .chat-arc-b { animation: chat-arc-flicker 1.7s steps(1,end) infinite; animation-delay: .2s; }
          .chat-arc-c { animation: chat-arc-flicker 1.3s steps(1,end) infinite; animation-delay: .5s; }
          .chat-arc-d { animation: chat-arc-flicker 1.9s steps(1,end) infinite; animation-delay: .85s; }
          .chat-arc-e { animation: chat-arc-flicker 1.5s steps(1,end) infinite; animation-delay: .35s; }
          .chat-arc-f { animation: chat-arc-flicker 1.25s steps(1,end) infinite; animation-delay: .6s; }
          .chat-arc-g { animation: chat-arc-flicker 1.6s steps(1,end) infinite; animation-delay: .1s; }
          .chat-arc-h { animation: chat-arc-flicker 1.4s steps(1,end) infinite; animation-delay: .95s; }
          .chat-arc-i { animation: chat-arc-flicker 1.8s steps(1,end) infinite; animation-delay: .45s; }
          .chat-arc-j { animation: chat-arc-flicker 1.15s steps(1,end) infinite; animation-delay: .75s; }
          @media (prefers-reduced-motion: reduce) { .chat-arcs { display: none; } }
        `}</style>
      )}

      <div className="relative z-10">
        <button
          type="button"
          onClick={onToggle}
          aria-label={open ? closeLabel : openLabel}
          className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-accent text-white shadow-lg transition-transform hover:scale-105"
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

      {electric && (
        <svg
          viewBox="0 0 80 80"
          className="chat-arcs pointer-events-none absolute left-1/2 top-1/2 z-20 h-20 w-20 -translate-x-1/2 -translate-y-1/2 overflow-visible"
          aria-hidden
        >
          <path className="chat-arc-a" d="M40 13 L43 19 L37 22 L42 29">
            <animate attributeName="d" dur="0.5s" repeatCount="indefinite"
              values="M40 13 L43 19 L37 22 L42 29;M40 13 L36 18 L44 21 L39 29;M40 13 L44 20 L38 23 L43 29" />
          </path>
          <path className="chat-arc-b" d="M67 40 L61 43 L64 37 L58 41">
            <animate attributeName="d" dur="0.45s" repeatCount="indefinite"
              values="M67 40 L61 43 L64 37 L58 41;M67 40 L62 37 L59 43 L57 39;M67 40 L60 42 L63 36 L58 41" />
          </path>
          <path className="chat-arc-c" d="M40 67 L37 61 L43 58 L38 51">
            <animate attributeName="d" dur="0.55s" repeatCount="indefinite"
              values="M40 67 L37 61 L43 58 L38 51;M40 67 L44 62 L36 59 L41 51;M40 67 L38 60 L42 57 L37 51" />
          </path>
          <path className="chat-arc-d" d="M13 40 L19 37 L16 43 L22 39">
            <animate attributeName="d" dur="0.48s" repeatCount="indefinite"
              values="M13 40 L19 37 L16 43 L22 39;M13 40 L18 43 L21 37 L23 41;M13 40 L20 38 L17 44 L22 40" />
          </path>
          <path className="chat-arc-e" d="M58 22 L64 18 L60 14 L68 9">
            <animate attributeName="d" dur="0.4s" repeatCount="indefinite"
              values="M58 22 L64 18 L60 14 L68 9;M58 22 L63 16 L67 19 L70 11;M58 22 L65 19 L61 13 L69 10" />
          </path>
          <path className="chat-arc-f" d="M22 22 L17 18 L24 16 L18 11">
            <animate attributeName="d" dur="0.43s" repeatCount="indefinite"
              values="M22 22 L17 18 L24 16 L18 11;M22 22 L16 20 L20 14 L12 12;M22 22 L18 17 L25 18 L19 10" />
          </path>
          <path className="chat-arc-g" d="M58 58 L63 54 L66 60 L61 64">
            <animate attributeName="d" dur="0.52s" repeatCount="indefinite"
              values="M58 58 L63 54 L66 60 L61 64;M58 58 L62 62 L67 57 L64 66;M58 58 L64 55 L65 61 L60 63" />
          </path>
          <path className="chat-arc-h" d="M22 58 L17 62 L24 63 L18 68">
            <animate attributeName="d" dur="0.47s" repeatCount="indefinite"
              values="M22 58 L17 62 L24 63 L18 68;M22 58 L16 60 L21 65 L13 67;M22 58 L18 63 L25 62 L19 69" />
          </path>
          <path className="chat-arc-i" d="M40 12 L36 6 L44 7 L39 2">
            <animate attributeName="d" dur="0.41s" repeatCount="indefinite"
              values="M40 12 L36 6 L44 7 L39 2;M40 12 L45 7 L37 5 L42 1;M40 12 L35 8 L43 4 L38 1" />
          </path>
          <path className="chat-arc-j" d="M68 40 L74 37 L72 44 L78 41">
            <animate attributeName="d" dur="0.49s" repeatCount="indefinite"
              values="M68 40 L74 37 L72 44 L78 41;M68 40 L73 43 L76 37 L79 42;M68 40 L75 38 L71 45 L78 40" />
          </path>
        </svg>
      )}
    </div>
  );
}
