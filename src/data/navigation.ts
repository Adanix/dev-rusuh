export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { id: "hero", label: "Home", href: "#hero" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "capabilities", label: "Capabilities", href: "#capabilities" },
  { id: "tech-stack", label: "Tech Stack", href: "#tech-stack" },
  { id: "workflow", label: "Workflow", href: "#workflow" },
  { id: "playground", label: "Playground", href: "#playground" },
  { id: "contact", label: "Contact", href: "#contact" },
];
