export interface Technology {
  name: string;
  category: "Frontend" | "Backend" | "Database" | "Infrastructure";
  description: string;
  provenance: string;
  highlight?: boolean;
}

export const technologies: Technology[] = [
  // Backend
  {
    name: "PHP",
    category: "Backend",
    description: "Server-side scripting language powering mission-critical logic, transaction integrity, and backend APIs.",
    provenance: "Core engine for SIMORSA, NIXSI, and Takjil Schedule.",
    highlight: true,
  },
  {
    name: "Laravel",
    category: "Backend",
    description: "Full-stack framework utilized for expressive routing, Eloquent ORM, authentication guards, and middleware pipelines.",
    provenance: "Applied across all production management applications.",
    highlight: true,
  },
  {
    name: "RESTful APIs",
    category: "Backend",
    description: "Design of stateless JSON endpoints with structured HTTP verbs, validation gates, and consistent status payloads.",
    provenance: "Used for frontend-backend asynchronous state exchanges.",
  },

  // Frontend
  {
    name: "React",
    category: "Frontend",
    description: "Component-based UI library used for building interactive interfaces, state-driven widgets, and reactive playgrounds.",
    provenance: "Foundation of this interactive portfolio and dynamic client apps.",
    highlight: true,
  },
  {
    name: "TypeScript",
    category: "Frontend",
    description: "Typed superset of JavaScript ensuring compile-time contract safety, autocomplete speed, and refactoring confidence.",
    provenance: "Applied for portfolio architecture and structured web applications.",
    highlight: true,
  },
  {
    name: "JavaScript (ES6+)",
    category: "Frontend",
    description: "Core client language for asynchronous DOM manipulation, WebGL integration, and client-side calculations.",
    provenance: "Integrated across all interactive client systems.",
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    description: "Modern utility-first CSS framework enabling token-based design systems, zero-drift spacing, and bespoke dark mode.",
    provenance: "Used in SIMORSA UI modules and this portfolio system.",
    highlight: true,
  },
  {
    name: "Bootstrap",
    category: "Frontend",
    description: "Responsive grid layout and component toolkit used for rapid enterprise dashboard scaffolding.",
    provenance: "Core UI layout framework for SIMORSA and NIXSI.",
  },

  // Database
  {
    name: "MySQL",
    category: "Database",
    description: "Relational database management system providing ACID-compliant transaction safety, indexing, and referential constraints.",
    provenance: "Stores patient records, pharmacy inventories, and user credentials.",
    highlight: true,
  },
  {
    name: "Relational Modeling",
    category: "Database",
    description: "3NF schema normalization, foreign key integrity, cascade triggers, and analytical query structures.",
    provenance: "Designed for multi-entity medical and inventory data relationships.",
  },

  // Infrastructure & Tools
  {
    name: "Docker & Compose",
    category: "Infrastructure",
    description: "Containerization toolchain enabling zero-toolchain host isolation, deterministic runtime environments, and rapid orchestration.",
    provenance: "Used to build, test, and host applications across development VPS.",
    highlight: true,
  },
  {
    name: "Git & GitHub",
    category: "Infrastructure",
    description: "Distributed version control for atomic commits, feature branching, merge verification, and CI/CD automation.",
    provenance: "All projects version-controlled at github.com/Adanix.",
  },
  {
    name: "Linux / Ubuntu Server",
    category: "Infrastructure",
    description: "Command-line server administration, permission management (setgid/chmod), systemd daemon supervision, and networking.",
    provenance: "Primary environment hosting all homelab services and VPS apps.",
  },
  {
    name: "Nginx & Reverse Proxy",
    category: "Infrastructure",
    description: "Web server and proxy routing managing SSL termination, WebSocket upgrades (HMR), and multi-domain virtual hosts.",
    provenance: "Powers public-facing domains with zero-collision port isolation.",
  },
  {
    name: "Vite",
    category: "Infrastructure",
    description: "Next-generation frontend build tool providing instantaneous Hot Module Replacement and tree-shaken static production bundles.",
    provenance: "Build orchestrator for this portfolio and modern frontend assets.",
  },
];
