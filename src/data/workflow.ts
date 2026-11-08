export interface WorkflowStep {
  step: string;
  name: string;
  headline: string;
  description: string;
  deliverables: string[];
  keyPrinciple: string;
}

export const workflowSteps: WorkflowStep[] = [
  {
    step: "01",
    name: "Understand",
    headline: "Deconstruct Problem & Domain Boundaries",
    description: "Deep examination of user workflows, domain-specific business rules, data entities, and failure points before writing a single line of code.",
    deliverables: ["Entity Relationship Outline", "User Role Boundaries", "Core Functional Scope"],
    keyPrinciple: "Clarity over premature code.",
  },
  {
    step: "02",
    name: "Plan & Design",
    headline: "Architect Database Schema & Component Hierarchy",
    description: "Designing normalized relational structures, indexing strategies, API contract definitions, and accessible UI layout hierarchies.",
    deliverables: ["Normalized Database Schema", "Component Breakdown", "Interactive State Maps"],
    keyPrinciple: "Solid data models prevent architectural dead-ends.",
  },
  {
    step: "03",
    name: "Develop",
    headline: "Modular Implementation & Clean Engineering",
    description: "Writing maintainable, type-safe, and self-documenting code. Implementing responsive frontend views coupled cleanly with secure backend logic.",
    deliverables: ["Isolated Service Layer", "Responsive UI Components", "Transactional Endpoints"],
    keyPrinciple: "Maintainability is a feature, not an afterthought.",
  },
  {
    step: "04",
    name: "Test & Refine",
    headline: "Multi-Viewport QA & Edge-Case Validation",
    description: "Testing edge cases, input validation barriers, viewport responsiveness across 320px–1920px, and eliminating layout shifts.",
    deliverables: ["Cross-Device Viewport QA", "Input Sanitization Checks", "Browser Console Zero-Error"],
    keyPrinciple: "If it breaks on mobile, it is broken.",
  },
  {
    step: "05",
    name: "Deploy",
    headline: "Automated Build, Containerization & Release",
    description: "Setting up automated CI/CD pipelines, containerized environments, static asset bundling, and robust production proxy routing.",
    deliverables: ["Static Production Bundle", "GitHub Actions Workflow", "Live Verification"],
    keyPrinciple: "Deterministic deployments with zero host pollution.",
  },
];
