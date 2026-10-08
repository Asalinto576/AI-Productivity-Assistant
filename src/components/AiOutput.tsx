import ReactMarkdown from "react-markdown";
import { Copy } from "lucide-react";
import { toast } from "sonner";

export function AiOutput({ text }: { text: string }) {
  return (
    <div className="relative rounded-2xl border bg-card p-6 shadow-soft">
      <button
        onClick={() => { navigator.clipboard.writeText(text); toast.success("Copied"); }}
        className="absolute right-4 top-4 rounded-md p-2 text-muted-foreground hover:bg-muted"
        aria-label="Copy"
      ><Copy className="h-4 w-4" /></button>
      <div className="prose-salon space-y-3 text-sm leading-relaxed [&_h1]:text-2xl [&_h2]:text-xl [&_h3]:text-lg [&_h1,&_h2,&_h3]:text-primary [&_ul]:list-disc [&_ol]:list-decimal [&_ul,&_ol]:pl-5 [&_table]:w-full [&_th]:border-b [&_th]:text-left [&_td]:border-b [&_td,&_th]:p-2 [&_strong]:text-primary">
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>
      <p className="mt-4 text-xs text-muted-foreground">AI-generated — please review before sending to customers.</p>
    </div>
  );
}
