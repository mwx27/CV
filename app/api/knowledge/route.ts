import { buildKnowledgeBundle } from "@/lib/knowledge/bundle";

export const runtime = "nodejs";

export async function GET(request: Request) {
  // Dev-only: local bundle generator. In prod the bundle lives in n8n, never served here.
  if (process.env.NODE_ENV === "production") {
    return new Response("Not found", { status: 404 });
  }

  const url = new URL(request.url);
  const includeInventories = url.searchParams.get("inventories") !== "0";

  const { markdown, inventoryCount } = await buildKnowledgeBundle({
    includeInventories,
  });

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Inventory-Count": String(inventoryCount),
      "X-Bundle-Chars": String(markdown.length),
    },
  });
}
