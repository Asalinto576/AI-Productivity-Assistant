import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { LayoutDashboard, MessageSquareText, NotebookPen, CalendarCheck, Search, Megaphone, MessagesSquare, Users, CalendarDays } from "lucide-react";
import logo from "@/assets/logo.png";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/tools/$tool", params: { tool: "messages" }, label: "Messages", icon: MessageSquareText },
  { to: "/tools/$tool", params: { tool: "notes" }, label: "Notes", icon: NotebookPen },
  { to: "/tools/$tool", params: { tool: "planner" }, label: "Planner", icon: CalendarCheck },
  { to: "/tools/$tool", params: { tool: "research" }, label: "Research", icon: Search },
  { to: "/tools/$tool", params: { tool: "marketing" }, label: "Marketing", icon: Megaphone },
  { to: "/chat", label: "AI Assistant", icon: MessagesSquare },
  { to: "/appointments", label: "Appointments", icon: CalendarDays },
  { to: "/customers", label: "Customers", icon: Users },
] as const;

export function AppShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="min-h-screen md:flex">
      <aside className="bg-sidebar text-sidebar-foreground md:w-64 md:min-h-screen md:sticky md:top-0 shrink-0">
        <Link to="/" className="flex items-center gap-3 p-5">
          <span className="rounded-full bg-background p-1"><img src={logo} alt="Asah Beauty Bar logo" className="h-10 w-10 object-contain" /></span>
          <span className="font-display text-xl leading-tight">Asah<br /><span className="text-xs font-sans tracking-[0.3em] text-sidebar-primary">BEAUTY BAR</span></span>
        </Link>
        <nav className="flex md:flex-col gap-1 overflow-x-auto px-3 pb-3">
          {nav.map((n) => (
            <Link
              key={n.label}
              {...(n as { to: "/dashboard" })}
              className="flex items-center gap-3 whitespace-nowrap rounded-lg px-3 py-2 text-sm hover:bg-sidebar-accent"
              activeProps={{ className: "bg-sidebar-accent text-sidebar-primary" }}
            >
              <n.icon className="h-4 w-4" /> {n.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-5 md:p-10 max-w-6xl">
        <h1 className="text-4xl md:text-5xl text-primary mb-6">{title}</h1>
        {children}
      </main>
    </div>
  );
}
