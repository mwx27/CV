import { buildKnowledgeBundle } from "@/lib/knowledge/bundle";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const expected = process.env.KNOWLEDGE_BUNDLE_TOKEN;
  if (!expected) {
    return new Response("KNOWLEDGE_BUNDLE_TOKEN not configured", {
      status: 500,
    });
  }

  const auth = request.headers.get("authorization") ?? "";
  const provided = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (provided !== expected) {
    return new Response("Unauthorized", { status: 401 });
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
