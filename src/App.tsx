import React from "react";
import { Navbar } from "./components/layout/Navbar";
import { HeroSection } from "./sections/Hero/HeroSection";
import { ProjectsSection } from "./sections/Projects/ProjectsSection";
import { CapabilitiesSection } from "./sections/Capabilities/CapabilitiesSection";
import { TechStackSection } from "./sections/TechStack/TechStackSection";
import { WorkflowSection } from "./sections/Workflow/WorkflowSection";
import { PlaygroundSection } from "./sections/Playground/PlaygroundSection";
import { ContactSection } from "./sections/Contact/ContactSection";
import { Footer } from "./components/layout/Footer";

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#090B10] text-[#F1F5F9] bg-grid-pattern relative selection:bg-[#A3E635] selection:text-[#090B10] overflow-x-hidden">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Semantic Landmark */}
      <main id="main-content" className="relative z-10">
        {/* Section 01: Hero Experience */}
        <HeroSection />

        {/* Section 02: Featured Projects */}
        <ProjectsSection />

        {/* Section 03: Capabilities / What I Build */}
        <CapabilitiesSection />

        {/* Section 04: Technical Arsenal */}
        <TechStackSection />

        {/* Section 05: How I Work / Workflow */}
        <WorkflowSection />

        {/* Section 06: Developer Playground */}
        <PlaygroundSection />

        {/* Section 07: Contact */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
