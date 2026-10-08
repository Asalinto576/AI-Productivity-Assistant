import { createFileRoute, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2, Wand2 } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { AiOutput } from "@/components/AiOutput";
import { Button } from "@/components/ui/button";
import { TOOLS } from "@/lib/ai/tools";
import { streamFromAi } from "@/lib/ai/stream";

export const Route = createFileRoute("/tools/$tool")({
  loader: ({ params }) => {
    const cfg = TOOLS[params.tool];
    if (!cfg) throw notFound();
    return cfg;
  },
  head: ({ loaderData }) => {
    const t = loaderData ? `${loaderData.title} — Asah Beauty Bar` : "Tool — Asah Beauty Bar";
    const d = loaderData?.blurb ?? "AI salon tools";
    return { meta: [{ title: t }, { name: "description", content: d }, { property: "og:title", content: t }, { property: "og:description", content: d }] };
  },
  component: ToolPage,
});

function ToolPage() {
  const cfg = Route.useLoaderData();
  return <ToolForm key={cfg.id} />;
}

function ToolForm() {
  const cfg = Route.useLoaderData();
  const [input, setInput] = useState<Record<string, string>>(() =>
    Object.fromEntries(cfg.fields.map((f) => [f.name, f.options?.[0] ?? ""])),
  );
  const [out, setOut] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function run(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError(""); setOut("");
    try { await streamFromAi({ tool: cfg.id, input }, setOut); }
    catch (err) { setError(err instanceof Error ? err.message : "Something went wrong."); }
    finally { setLoading(false); }
  }

  const field = "w-full rounded-lg border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring";
  return (
    <AppShell title={cfg.title}>
      <p className="-mt-3 mb-8 text-muted-foreground">{cfg.blurb}</p>
      <div className="grid gap-8 lg:grid-cols-2">
        <form onSubmit={run} className="space-y-4 rounded-2xl bg-rose-gradient p-6">
          {cfg.fields.map((f) => (
            <label key={f.name} className="block space-y-1">
              <span className="text-sm font-medium">{f.label}</span>
              {f.type === "select" ? (
                <select className={field} value={input[f.name]} onChange={(e) => setInput({ ...input, [f.name]: e.target.value })}>
                  {f.options!.map((o) => <option key={o}>{o}</option>)}
                </select>
              ) : f.type === "textarea" ? (
                <textarea rows={6} className={field} placeholder={f.placeholder} value={input[f.name]} onChange={(e) => setInput({ ...input, [f.name]: e.target.value })} />
              ) : (
                <input className={field} placeholder={f.placeholder} value={input[f.name]} onChange={(e) => setInput({ ...input, [f.name]: e.target.value })} />
              )}
            </label>
          ))}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? <Loader2 className="animate-spin" /> : <Wand2 />} {cfg.cta}
          </Button>
        </form>
        <div>
          {error && <p className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive">{error}</p>}
          {out ? <AiOutput text={out} /> : !error && (
            <div className="flex h-full min-h-60 items-center justify-center rounded-2xl border border-dashed text-center text-sm text-muted-foreground p-6">
              {loading ? "Thinking…" : "Your AI result will appear here."}
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
