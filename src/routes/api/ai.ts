import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/ai")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { streamAi, toolInputToMessage } = await import("@/lib/ai/ai.server");
        const body = (await request.json()) as {
          tool: string;
          input?: Record<string, string>;
          messages?: { role: "user" | "assistant"; content: string }[];
        };
        const messages = body.tool === "chat"
          ? (body.messages ?? []).slice(-30)
          : [{ role: "user" as const, content: toolInputToMessage(body.tool, body.input ?? {}) }];
        if (!messages.length) return new Response("Nothing to send.", { status: 400 });
        return streamAi(request, body.tool, messages);
      },
    },
  },
});
