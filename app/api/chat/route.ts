export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_MESSAGE_LENGTH = 2000;
// Abort just below maxDuration so a hung upstream yields a clean 504
// rather than a platform-level function timeout.
const UPSTREAM_TIMEOUT_MS = 55_000;

interface ChatRequestBody {
  message?: unknown;
  sessionId?: unknown;
}

export async function POST(request: Request) {
  const webhookUrl = process.env.N8N_CHAT_WEBHOOK_URL;
  if (!webhookUrl) {
    return Response.json(
      { error: "N8N_CHAT_WEBHOOK_URL not configured" },
      { status: 500 },
    );
  }

  let body: ChatRequestBody;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { message, sessionId } = body;
  if (typeof message !== "string" || message.trim().length === 0) {
    return Response.json(
      { error: "message must be a non-empty string" },
      { status: 400 },
    );
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return Response.json(
      { error: `message exceeds ${MAX_MESSAGE_LENGTH} characters` },
      { status: 400 },
    );
  }

  let upstream: Response;
  try {
    upstream = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        sessionId: typeof sessionId === "string" ? sessionId : undefined,
      }),
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });
  } catch (err) {
    if (err instanceof Error && err.name === "TimeoutError") {
      return Response.json({ error: "Upstream timed out" }, { status: 504 });
    }
    return Response.json({ error: "Upstream unreachable" }, { status: 502 });
  }

  if (!upstream.ok) {
    return Response.json(
      { error: "Upstream error" },
      { status: 502 },
    );
  }

  let data: unknown;
  try {
    data = await upstream.json();
  } catch {
    return Response.json({ error: "Invalid upstream response" }, { status: 502 });
  }

  const answer =
    typeof data === "object" &&
    data !== null &&
    typeof (data as { answer?: unknown }).answer === "string"
      ? (data as { answer: string }).answer
      : "";
  if (!answer) {
    return Response.json({ error: "Empty answer from upstream" }, { status: 502 });
  }

  return Response.json({ answer });
}
