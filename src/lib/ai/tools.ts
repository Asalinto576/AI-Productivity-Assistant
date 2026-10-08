// Shared (browser-safe) tool configuration. Prompts live server-side in prompts.server.ts.
export type Field = {
  name: string;
  label: string;
  type: "text" | "textarea" | "select";
  options?: string[];
  placeholder?: string;
  examples?: string[];
};

export type ToolConfig = { id: string; title: string; blurb: string; cta: string; fields: Field[] };

const services = [
  "Acrylic nails", "Gel nails", "Makeup", "Hair installation", "Hairstyling",
  "Massage", "Eyelash extensions", "Eyelash styling",
];

export const TOOLS: Record<string, ToolConfig> = {
  messages: {
    id: "messages",
    title: "Smart Message Writer",
    blurb: "Confirmations, reminders, reschedules and follow-ups in seconds.",
    cta: "Write message",
    fields: [
      { name: "type", label: "Message type", type: "select", options: ["Appointment confirmation", "Reminder", "Reschedule", "Cancellation", "Follow-up / thank you", "Enquiry reply", "Promotion"] },
      { name: "channel", label: "Channel", type: "select", options: ["WhatsApp", "SMS", "Email", "Instagram DM"] },
      { name: "tone", label: "Tone", type: "select", options: ["Warm & friendly", "Professional", "Luxury & elegant", "Short & direct"] },
      { name: "customer", label: "Customer name", type: "text", placeholder: "e.g. Thandi" },
      { name: "service", label: "Service", type: "select", options: services },
      {
        name: "details",
        label: "Details",
        type: "textarea",
        placeholder: "Date, time, staff, price, special notes…",
        examples: [
          "Thandi, acrylic full set, Sat 11 Oct, 09:00, Lerato, R450",
          "Naledi, volume lashes, tomorrow 10:30, Zinhle, please come 5 min early",
          "Busi, bridal makeup, moving Sat 18 Oct to Sun 19 Oct, same time",
          "Amina, birthday event, prefers WhatsApp only, often runs late",
          "Refill due, gel nails, every 3 weeks, asks for quiet appointment",
        ],
      },
    ],
  },
  notes: {
    id: "notes",
    title: "Notes Summarizer",
    blurb: "Turn messy appointment and customer notes into clear summaries.",
    cta: "Summarize",
    fields: [{ name: "notes", label: "Paste notes", type: "textarea", placeholder: "Customer wants long coffin acrylic, nude ombre, allergic to…" }],
  },
  planner: {
    id: "planner",
    title: "Task Planner",
    blurb: "Plan the salon day or week with priorities and staff assignments.",
    cta: "Plan it",
    fields: [
      { name: "period", label: "Plan for", type: "select", options: ["Today", "Tomorrow", "This week"] },
      { name: "staff", label: "Staff on duty", type: "text", placeholder: "Lerato (nails), Ayanda (hair)…" },
      { name: "tasks", label: "Appointments & tasks", type: "textarea", placeholder: "09:00 gel manicure, restock lash glue, post on Instagram…" },
    ],
  },
  research: {
    id: "research",
    title: "Beauty Research",
    blurb: "Trends, techniques, products and business ideas — explained simply.",
    cta: "Research",
    fields: [
      { name: "topic", label: "What do you want to know?", type: "textarea", placeholder: "Top nail trends this season for summer events" },
      { name: "depth", label: "Depth", type: "select", options: ["Quick overview", "Detailed report"] },
    ],
  },
  marketing: {
    id: "marketing",
    title: "Marketing Content",
    blurb: "Captions, promos and campaign ideas that match your brand.",
    cta: "Create content",
    fields: [
      { name: "format", label: "Format", type: "select", options: ["Instagram caption", "Facebook post", "TikTok idea", "WhatsApp broadcast", "Promo flyer text"] },
      { name: "service", label: "Service to promote", type: "select", options: services },
      { name: "offer", label: "Offer / angle", type: "textarea", placeholder: "20% off lash refills this Friday" },
    ],
  },
};
