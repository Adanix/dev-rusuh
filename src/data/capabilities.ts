export interface Capability {
  id: string;
  title: string;
  badge: string;
  problem: string;
  solution: string;
  relatedProjectIds: string[];
  techPill: string[];
}

export const capabilities: Capability[] = [
  {
    id: "management-systems",
    title: "Enterprise & Inventory Management",
    badge: "Core Capability",
    problem: "Manual stock control leads to misplaced inventory, missed expiration dates, stockouts, and untraceable distribution.",
    solution: "Custom web-based management platforms with centralized databases, automated stock threshold triggers, and real-time audit trails.",
    relatedProjectIds: ["simorsa"],
    techPill: ["Laravel", "MySQL", "Batch Tracking", "Audit Logs"],
  },
  {
    id: "diagnostic-clinical",
    title: "Diagnostic & Clinical Expert Systems",
    badge: "Specialized",
    problem: "Frontline health workers need fast, accurate standardized evaluations without calculating complex mathematical indices manually.",
    solution: "Algorithmic decision support tools embedding recognized medical standards to deliver immediate diagnostic insights and growth tracking.",
    relatedProjectIds: ["nixsi"],
    techPill: ["Rule Engines", "Mathematical Indices", "Medical Informatics"],
  },
  {
    id: "workflow-automation",
    title: "Operational & Logistics Workflows",
    badge: "Process Optimization",
    problem: "Ad-hoc messaging and chaotic spreadsheets result in duplicate scheduling, missed assignments, and coordination breakdowns.",
    solution: "Centralized coordination engines with dynamic conflict prevention, slot reservations, and responsive multi-user interfaces.",
    relatedProjectIds: ["takjil-schedule"],
    techPill: ["Dynamic Rostering", "Conflict Guards", "Real-Time State"],
  },
  {
    id: "database-api",
    title: "Relational Architecture & Web APIs",
    badge: "Engineering Foundation",
    problem: "Poor schema design causes data corruption, race conditions, sluggish reporting, and architectural dead-ends.",
    solution: "Strictly normalized relational database schemas, secure authentication layers, ACID transaction boundaries, and responsive frontend integration.",
    relatedProjectIds: ["simorsa", "nixsi", "takjil-schedule"],
    techPill: ["Relational MySQL", "REST APIs", "Role-Based Access", "Query Indexing"],
  },
];
