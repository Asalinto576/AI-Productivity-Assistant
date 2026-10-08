import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { ArrowUp, Loader2, RotateCcw } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { streamFromAi } from "@/lib/ai/stream";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Assistant — Asah Beauty Bar" },
      { name: "description", content: "Chat with the Asah Beauty Bar AI assistant for salon admin help." },
      { property: "og:title", content: "AI Assistant — Asah Beauty Bar" },
      { property: "og:description", content: "Chat with the Asah Beauty Bar AI assistant for salon admin help." },
    ],
  }),
  component: ChatPage,
});

type Msg = { role: "user" | "assistant"; content: string };
const STARTERS = ["Write a polite reply to a customer asking for lash prices", "How should we handle late arrivals?", "Suggest an add-on for a gel manicure client"];

function ChatPage() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const ta = useRef<HTMLTextAreaElement>(null);
  const end = useRef<HTMLDivElement>(null);

  useEffect(() => { ta.current?.focus(); }, [loading]);
  useEffect(() => { end.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  async function send(content: string) {
    if (!content.trim() || loading) return;
    const history: Msg[] = [...msgs, { role: "user", content }];
    setMsgs([...history, { role: "assistant", content: "" }]);
    setText(""); setLoading(true); setError("");
    try {
      await streamFromAi({ tool: "chat", messages: history }, (full) =>
        setMsgs([...history, { role: "assistant", content: full }]));
    } catch (e) {
      setMsgs(history);
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally { setLoading(false); }
  }

  return (
    <AppShell title="AI Assistant">
      <div className="flex h-[70vh] flex-col rounded-2xl border bg-card shadow-soft">
        <div className="flex-1 space-y-5 overflow-y-auto p-6">
          {msgs.length === 0 && (
            <div className="text-center pt-8">
              <img src={logo} alt="" className="mx-auto h-24 w-24 object-contain" />
              <p className="mt-3 font-display text-2xl text-primary">How can I help the salon today?</p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {STARTERS.map((s) => <button key={s} onClick={() => send(s)} className="rounded-full bg-secondary px-4 py-2 text-sm hover:bg-accent">{s}</button>)}
              </div>
            </div>
          )}
          {msgs.map((m, i) => m.role === "user" ? (
            <div key={i} className="ml-auto max-w-[80%] rounded-2xl rounded-br-sm bg-primary px-4 py-3 text-sm text-primary-foreground">{m.content}</div>
          ) : (
            <div key={i} className="flex gap-3">
              <img src={logo} alt="" className="h-8 w-8 shrink-0 rounded-full bg-secondary object-contain" />
              <div className="max-w-[85%] space-y-2 text-sm leading-relaxed [&_ul]:list-disc [&_ol]:list-decimal [&_ul,&_ol]:pl-5 [&_strong]:text-primary">
                {m.content ? <ReactMarkdown>{m.content}</ReactMarkdown> : <Loader2 className="h-4 w-4 animate-spin text-gold" />}
              </div>
            </div>
          ))}
          {error && <p className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}
          <div ref={end} />
        </div>
        <form onSubmit={(e) => { e.preventDefault(); send(text); }} className="flex items-end gap-2 border-t p-3">
          <button type="button" onClick={() => setMsgs([])} className="rounded-md p-2 text-muted-foreground hover:bg-muted" aria-label="New conversation"><RotateCcw className="h-4 w-4" /></button>
          <textarea
            ref={ta} rows={1} value={text} onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(text); } }}
            placeholder="Ask anything about the salon…"
            className="max-h-40 flex-1 resize-none bg-transparent px-2 py-2 text-sm focus:outline-none"
          />
          <Button type="submit" size="icon" disabled={loading || !text.trim()} aria-label="Send">
            {loading ? <Loader2 className="animate-spin" /> : <ArrowUp />}
          </Button>
        </form>
      </div>
    </AppShell>
  );
}
