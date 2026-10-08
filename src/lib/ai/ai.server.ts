import { createOpenAI } from "@ai-sdk/openai";
import { streamText, type ModelMessage } from "ai";
import { createLovableAiGatewayRunIdFetch, getLovableAiGatewayRunId, withLovableAiGatewayRunIdHeader } from "./run-id.server";
import { TOOLS } from "./tools";

const SALON = `You are the AI assistant for Asah Beauty Bar, a luxury beauty salon offering acrylic nails, gel nails, makeup, hair installation, hairstyling, massage, eyelash extensions and lash styling.
Write in clear, warm, professional English. Use markdown headings and lists where useful. Never invent prices, medical advice or guarantees; if information is missing, use [placeholders] and say what the staff should confirm.
Remind staff to review AI output before sending it to customers when relevant.`;

const TOOL_PROMPTS: Record<string, string> = {
  messages: "Write a ready-to-send customer message. Match the requested channel length (SMS/WhatsApp short, email with subject line). Give the main version, then one shorter alternative.",
  notes: "Summarize the notes with sections: Customer summary, Services requested, Preferences, Allergies/health flags (highlight), Follow-up actions, Suggested upsell.",
  planner: "Create a practical time-blocked schedule as a markdown table (Time, Task, Staff, Priority High/Medium/Low), then list prep tasks and risks such as scheduling conflicts.",
  research: "Research the topic for a salon owner: key points, practical how-to for the salon, product/tool considerations, and business opportunity. Note that trends should be verified with current sources.",
  marketing: "Create on-brand marketing content with a hook, body, call to action and suggested hashtags. Provide 2 variations.",
};

export function streamAi(request: Request, tool: string, messages: ModelMessage[]) {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) return new Response("AI is not configured.", { status: 500 });
  const runIdFetch = createLovableAiGatewayRunIdFetch(getLovableAiGatewayRunId(request));
  const provider = createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: runIdFetch.fetch,
  });
  const extra = tool === "chat"
    ? "Act as a helpful salon admin chatbot for staff: answer questions, draft messages, suggest services and help with operations."
    : TOOL_PROMPTS[tool] ?? "";
  const result = streamText({
    model: provider.responses("openai/gpt-6-astra"),
    instructions: `${SALON}\n\n${extra}`,
    messages,
    abortSignal: request.signal,
    providerOptions: {
      openai: {
        store: false,
        forceReasoning: true,
        reasoningEffort: "low",
        reasoningSummary: "auto",
        include: ["reasoning.encrypted_content"],
      },
    },
  });
  return withLovableAiGatewayRunIdHeader(result.toTextStreamResponse(), runIdFetch);
}

export function toolInputToMessage(tool: string, input: Record<string, string>): string {
  const cfg = TOOLS[tool];
  if (!cfg) return JSON.stringify(input);
  return cfg.fields.map((f) => `${f.label}: ${input[f.name] || "(not provided)"}`).join("\n");
}
