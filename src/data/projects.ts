export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  tags: string[];
  demoUrl: string;
  repoUrl?: string;
  demoCredentials?: {
    userLabel?: string;
    user: string;
    pass: string;
  };
  features: string[];
  accentColor: string;
  badge: string;
}

export const projects: Project[] = [
  {
    id: "simorsa",
    title: "SIMORSA",
    subtitle: "Hospital Pharmacy Medicine Management",
    description: "A specialized enterprise Information System engineered for hospital pharmacies. Manages full lifecycle drug inventory, batch expiration schedules, patient prescription dispensing, and auditable distribution records.",
    category: "Management Systems",
    tags: ["Laravel", "PHP", "MySQL", "TailwindCSS", "Bootstrap", "JavaScript"],
    demoUrl: "https://obat-manajemen.iceiy.com",
    repoUrl: "https://github.com/Adanix",
    demoCredentials: {
      userLabel: "User",
      user: "NIX",
      pass: "Adanix123",
    },
    features: [
      "Real-time medicine batch stock tracking with automatic expiry alerts",
      "Streamlined prescription dispatch and distribution validation",
      "Departmental requisition approval workflows",
      "Comprehensive reporting exportable for clinical audits",
    ],
    accentColor: "#A3E635",
    badge: "Enterprise Clinical",
  },
  {
    id: "nixsi",
    title: "NIXSI (CEKSA)",
    subtitle: "Early Child Nutrition Diagnosis & Stunting Monitoring",
    description: "An expert diagnostic tool developed for healthcare staff and community health clinics (Posyandu) to diagnose toddler nutritional status, calculate WHO-standard anthropometric indices, and assist in stunting mitigation.",
    category: "Diagnostic & Healthcare",
    tags: ["Laravel", "PHP", "MySQL", "Bootstrap", "JavaScript"],
    demoUrl: "https://nixsi.iceiy.com",
    repoUrl: "https://github.com/Adanix/ceksa",
    demoCredentials: {
      userLabel: "Email",
      user: "maintener@gmail.com",
      pass: "123",
    },
    features: [
      "Rule-based diagnosis engine calculating Z-scores for height/weight age metrics",
      "Early warning indicators for acute malnutrition and growth stunting",
      "Patient longitudinal growth tracking with history timeline",
      "Clinician evaluation dashboard with secure role-based access",
    ],
    accentColor: "#60A5FA",
    badge: "Healthcare Expert System",
  },
  {
    id: "takjil-schedule",
    title: "Takjil Schedule",
    subtitle: "Community Iftar Snack Distribution Scheduler",
    description: "A community coordination platform designed to organize and optimize the daily distribution of iftar meals across Ramadan. Replaces chaotic manual spreadsheets with synchronized scheduling and volunteer roster management.",
    category: "Workflow & Community",
    tags: ["Laravel", "PHP", "MySQL", "Bootstrap", "JavaScript"],
    demoUrl: "https://jadwal-takjil.iceiy.com",
    repoUrl: "https://github.com/Adanix",
    demoCredentials: {
      userLabel: "User",
      user: "owner",
      pass: "123",
    },
    features: [
      "Automated slot allocation preventing donor date collisions",
      "Real-time volunteer and donor confirmation tracking",
      "Mobile-friendly public roster for daily meal logistics",
      "Administrative override and bulk scheduling tools",
    ],
    accentColor: "#34D399",
    badge: "Logistics Automation",
  },
];
