export async function streamFromAi(
  body: unknown,
  onText: (full: string) => void,
  signal?: AbortSignal,
) {
  const res = await fetch("/api/ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: signal ?? null,
  });
  if (!res.ok || !res.body) {
    const msg = await res.text().catch(() => "");
    if (res.status === 402) throw new Error("AI credits have run out. Please top up to keep using AI features.");
    if (res.status === 429) throw new Error("Too many requests right now — please wait a moment and try again.");
    throw new Error(msg || "The AI request failed. Please try again.");
  }
  const reader = res.body.getReader();
  const dec = new TextDecoder();
  let full = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    full += dec.decode(value, { stream: true });
    onText(full);
  }
  if (!full.trim()) throw new Error("The AI returned no response. Please try again.");
  return full;
}
