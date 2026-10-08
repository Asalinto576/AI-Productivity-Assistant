export type Appointment = { id: string; customer: string; service: string; time: string; staff: string; status: "Confirmed" | "Pending" | "Completed" | "Cancelled" };

export const APPOINTMENTS: Appointment[] = [
  { id: "1", customer: "Thandi Mokoena", service: "Acrylic full set – ombre", time: "09:00", staff: "Lerato", status: "Confirmed" },
  { id: "2", customer: "Naledi Khumalo", service: "Volume lashes", time: "10:30", staff: "Zinhle", status: "Pending" },
  { id: "3", customer: "Amara Okafor", service: "Wig installation", time: "11:00", staff: "Ayanda", status: "Confirmed" },
  { id: "4", customer: "Sarah van Wyk", service: "Gel manicure", time: "13:00", staff: "Lerato", status: "Pending" },
  { id: "5", customer: "Busi Ndlovu", service: "Bridal makeup trial", time: "14:00", staff: "Kea", status: "Confirmed" },
  { id: "6", customer: "Lindiwe Dube", service: "Full-body massage", time: "14:00", staff: "Kea", status: "Pending" },
  { id: "7", customer: "Precious Sithole", service: "Lash refill", time: "16:00", staff: "Zinhle", status: "Completed" },
];

export const TASKS = [
  { title: "Send reminders for tomorrow's bookings", priority: "High" },
  { title: "Resolve 14:00 double booking for Kea", priority: "High" },
  { title: "Restock lash glue and acrylic powder", priority: "Medium" },
  { title: "Post weekend promo on Instagram", priority: "Medium" },
  { title: "Clean and sterilise nail station tools", priority: "Low" },
] as const;

export type Customer = { name: string; phone: string; favourite: string; lastVisit: string; notes: string };

export const CUSTOMERS: Customer[] = [
  { name: "Thandi Mokoena", phone: "071 234 5678", favourite: "Ombre acrylic", lastVisit: "2026-09-24", notes: "Prefers long coffin shape." },
  { name: "Naledi Khumalo", phone: "082 555 1020", favourite: "Volume lashes", lastVisit: "2026-09-30", notes: "Sensitive eyes – use sensitive glue." },
  { name: "Amara Okafor", phone: "063 778 9012", favourite: "Wig installation", lastVisit: "2026-09-12", notes: "Brings own frontal wig." },
  { name: "Busi Ndlovu", phone: "074 901 3344", favourite: "Bridal makeup", lastVisit: "2026-08-28", notes: "Wedding on 24 October." },
  { name: "Precious Sithole", phone: "060 440 2211", favourite: "Lash refill", lastVisit: "2026-10-08", notes: "Every 3 weeks." },
];

export const SERVICES: Record<string, string[]> = {
  "Acrylic Nails": ["Full set", "Acrylic refill", "French acrylic", "Ombre acrylic", "Nail art", "Short / Medium / Long"],
  "Gel Nails": ["Gel overlay", "Gel manicure", "Gel extensions", "French gel", "Gel nail art"],
  Makeup: ["Natural", "Glam", "Bridal", "Event", "Photoshoot"],
  Hair: ["Hair installation", "Wig installation", "Weave installation", "Braiding", "Styling", "Blowout", "Special-event styles"],
  Massage: ["Relaxation", "Back", "Neck & shoulder", "Full-body"],
  Eyelashes: ["Classic", "Hybrid", "Volume", "Lash refill", "Lash removal"],
};
