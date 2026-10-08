import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { StatusBadge } from "@/components/StatusBadge";
import { APPOINTMENTS, SERVICES } from "@/lib/salon-data";

export const Route = createFileRoute("/appointments")({
  head: () => ({
    meta: [
      { title: "Appointments & Services — Asah Beauty Bar" },
      { name: "description", content: "Today's bookings and the full Asah Beauty Bar service menu." },
      { property: "og:title", content: "Appointments & Services — Asah Beauty Bar" },
      { property: "og:description", content: "Today's bookings and the full Asah Beauty Bar service menu." },
    ],
  }),
  component: Appointments,
});

function Appointments() {
  return (
    <AppShell title="Appointments">
      <div className="overflow-x-auto rounded-2xl border bg-card">
        <table className="w-full text-sm">
          <thead className="bg-muted text-left"><tr>{["Time", "Customer", "Service", "Staff", "Status"].map((h) => <th key={h} className="p-3 font-medium">{h}</th>)}</tr></thead>
          <tbody>
            {APPOINTMENTS.map((a) => (
              <tr key={a.id} className="border-t">
                <td className="p-3 text-gold font-medium">{a.time}</td><td className="p-3">{a.customer}</td>
                <td className="p-3">{a.service}</td><td className="p-3">{a.staff}</td><td className="p-3"><StatusBadge status={a.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2 className="mt-10 mb-4 text-3xl text-primary">Service menu</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(SERVICES).map(([cat, items]) => (
          <div key={cat} className="rounded-2xl bg-rose-gradient p-5">
            <h3 className="text-xl text-primary">{cat}</h3>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">{items.map((i) => <li key={i}>{i}</li>)}</ul>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
