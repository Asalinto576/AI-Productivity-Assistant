import { createFileRoute, Link } from "@tanstack/react-router";
import { Lightbulb, MessageSquareText, NotebookPen, CalendarCheck, Search, MessagesSquare } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { StatusBadge } from "@/components/StatusBadge";
import { APPOINTMENTS, TASKS } from "@/lib/salon-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Asah Beauty Bar" },
      { name: "description", content: "Today's appointments, tasks and AI suggestions for Asah Beauty Bar." },
      { property: "og:title", content: "Dashboard — Asah Beauty Bar" },
      { property: "og:description", content: "Today's appointments, tasks and AI suggestions for Asah Beauty Bar." },
    ],
  }),
  component: Dashboard,
});

const prio: Record<string, string> = { High: "bg-destructive/10 text-destructive", Medium: "bg-warning/15 text-warning", Low: "bg-success/15 text-success" };

function Dashboard() {
  const pending = APPOINTMENTS.filter((a) => a.status === "Pending").length;
  const quick = [
    { label: "Generate Customer Message", tool: "messages", icon: MessageSquareText },
    { label: "Summarize Notes", tool: "notes", icon: NotebookPen },
    { label: "Plan My Day", tool: "planner", icon: CalendarCheck },
    { label: "Research Beauty Trends", tool: "research", icon: Search },
  ];
  return (
    <AppShell title="Good day, Asah team">
      <div className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-5">
        {quick.map((q) => (
          <Link key={q.tool} to="/tools/$tool" params={{ tool: q.tool }} className="rounded-2xl bg-card border p-4 text-sm hover:shadow-soft transition">
            <q.icon className="mb-2 h-5 w-5 text-gold" />{q.label}
          </Link>
        ))}
        <Link to="/chat" className="rounded-2xl bg-primary p-4 text-sm text-primary-foreground hover:shadow-soft transition">
          <MessagesSquare className="mb-2 h-5 w-5 text-gold" />Ask AI Assistant
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2 rounded-2xl border bg-card p-6">
          <h2 className="mb-4 text-2xl text-primary">Today's appointments</h2>
          <div className="divide-y">
            {APPOINTMENTS.map((a) => (
              <div key={a.id} className="flex flex-wrap items-center gap-3 py-3 text-sm">
                <span className="w-14 font-medium text-gold">{a.time}</span>
                <span className="flex-1 min-w-40"><b>{a.customer}</b><br /><span className="text-muted-foreground">{a.service} · {a.staff}</span></span>
                <StatusBadge status={a.status} />
              </div>
            ))}
          </div>
        </section>
        <div className="space-y-6">
          <section className="rounded-2xl bg-rose-gradient p-6">
            <h2 className="mb-3 flex items-center gap-2 text-2xl text-primary"><Lightbulb className="h-5 w-5 text-gold" />AI suggestions</h2>
            <ul className="space-y-2 text-sm">
              <li>• {pending} appointment reminders haven't been sent.</li>
              <li>• Kea has two bookings at 14:00 — possible conflict.</li>
              <li>• Busi's wedding is on 24 Oct — offer a lash add-on.</li>
            </ul>
          </section>
          <section className="rounded-2xl border bg-card p-6">
            <h2 className="mb-3 text-2xl text-primary">Today's tasks</h2>
            <ul className="space-y-2 text-sm">
              {TASKS.map((t) => (
                <li key={t.title} className="flex items-start justify-between gap-2">
                  <span>{t.title}</span>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs ${prio[t.priority]}`}>{t.priority}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
