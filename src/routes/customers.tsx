import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { CUSTOMERS } from "@/lib/salon-data";

export const Route = createFileRoute("/customers")({
  head: () => ({
    meta: [
      { title: "Customers — Asah Beauty Bar" },
      { name: "description", content: "Client profiles, preferences and notes at Asah Beauty Bar." },
      { property: "og:title", content: "Customers — Asah Beauty Bar" },
      { property: "og:description", content: "Client profiles, preferences and notes at Asah Beauty Bar." },
    ],
  }),
  component: Customers,
});

function Customers() {
  return (
    <AppShell title="Customers">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CUSTOMERS.map((c) => (
          <div key={c.name} className="rounded-2xl border bg-card p-5 shadow-soft">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-gradient font-display text-lg text-primary-foreground">{c.name[0]}</span>
              <div><p className="font-medium">{c.name}</p><p className="text-xs text-muted-foreground">{c.phone}</p></div>
            </div>
            <dl className="mt-4 space-y-1 text-sm">
              <div><dt className="inline text-muted-foreground">Favourite: </dt><dd className="inline">{c.favourite}</dd></div>
              <div><dt className="inline text-muted-foreground">Last visit: </dt><dd className="inline">{c.lastVisit}</dd></div>
              <div><dt className="inline text-muted-foreground">Notes: </dt><dd className="inline">{c.notes}</dd></div>
            </dl>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
