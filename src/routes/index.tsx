import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageSquareText, NotebookPen, CalendarCheck, Search, Megaphone, MessagesSquare, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Asah Beauty Bar — AI Salon Assistant" },
      { name: "description", content: "AI-powered productivity assistant for Asah Beauty Bar: messages, notes, planning, research and marketing." },
      { property: "og:title", content: "Asah Beauty Bar — AI Salon Assistant" },
      { property: "og:description", content: "AI-powered productivity assistant for Asah Beauty Bar." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const features = [
  { icon: MessageSquareText, t: "Customer messages", d: "Confirmations, reminders and follow-ups in your voice." },
  { icon: NotebookPen, t: "Notes summaries", d: "Preferences, allergies and actions — at a glance." },
  { icon: CalendarCheck, t: "Day planning", d: "Time-blocked schedules with staff and priorities." },
  { icon: Search, t: "Beauty research", d: "Trends, techniques and product insights." },
  { icon: Megaphone, t: "Marketing content", d: "Captions and promos that bring clients back." },
  { icon: MessagesSquare, t: "AI assistant", d: "Ask anything about running the salon." },
];

function Index() {
  return (
    <div className="min-h-screen bg-rose-gradient">
      <header className="mx-auto flex max-w-6xl items-center justify-between p-5">
        <span className="font-display text-2xl text-primary">Asah <span className="text-sm font-sans tracking-[0.3em] text-gold">BEAUTY BAR</span></span>
        <Button asChild variant="outline"><Link to="/dashboard">Open dashboard</Link></Button>
      </header>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-10 md:grid-cols-2 md:py-20">
        <div>
          <p className="mb-4 text-sm tracking-[0.3em] text-gold">AI SALON ASSISTANT</p>
          <h1 className="text-5xl md:text-7xl leading-[0.95] text-primary">Less admin.<br /><em>More beauty.</em></h1>
          <p className="mt-6 max-w-md text-lg text-muted-foreground">
            The Asah Beauty Bar assistant writes client messages, summarizes notes, plans the day and researches trends — so the team can focus on nails, lashes, hair and glam.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg"><Link to="/dashboard">Get started</Link></Button>
            <Button asChild size="lg" variant="ghost"><Link to="/chat">Ask the assistant</Link></Button>
          </div>
        </div>
        <img src={logo} alt="Asah Beauty Bar logo" width={1024} height={1024} className="mx-auto w-full max-w-md drop-shadow-xl" />
      </section>
      <section className="bg-background">
        <div className="mx-auto grid max-w-6xl gap-5 px-5 py-16 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.t} className="rounded-2xl border bg-card p-6 shadow-soft">
              <f.icon className="h-6 w-6 text-gold" />
              <h3 className="mt-3 text-2xl text-primary">{f.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.d}</p>
            </div>
          ))}
        </div>
        <p className="flex items-center justify-center gap-2 pb-12 text-sm text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-gold" /> Responsible AI: staff always review before anything is sent.
        </p>
      </section>
    </div>
  );
}
