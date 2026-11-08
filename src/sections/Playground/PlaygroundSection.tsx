import React, { useState } from "react";
import { InteractiveTerminal } from "./InteractiveTerminal";
import { ApiExplorer } from "./ApiExplorer";
import { ComponentPlayground } from "./ComponentPlayground";
import { Terminal, Code2, Sliders, Gamepad2 } from "lucide-react";

export const PlaygroundSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"terminal" | "api" | "component">("terminal");

  return (
    <section id="playground" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141923] border border-white/[0.08] text-xs font-mono text-[#A3E635]">
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>// EXPERIMENTAL ZONE</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Developer <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">Playground.</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-xl font-light">
              Interactive sandboxes to inspect system architecture, simulate API contract endpoints, and experiment with component tokens.
            </p>
          </div>

          {/* Playground Mode Tabs */}
          <div className="flex flex-wrap gap-2 bg-[#141923] p-1.5 rounded-2xl border border-white/[0.08]">
            <button
              type="button"
              onClick={() => setActiveTab("terminal")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "terminal"
                  ? "bg-[#A3E635] text-[#090B10] shadow-md shadow-[#A3E635]/15"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Interactive Terminal</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("api")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "api"
                  ? "bg-[#60A5FA] text-[#090B10] shadow-md shadow-[#60A5FA]/15"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>API Explorer (Mock)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("component")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "component"
                  ? "bg-[#34D399] text-[#090B10] shadow-md shadow-[#34D399]/15"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Component Tokens</span>
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="transition-all duration-300">
          {activeTab === "terminal" && <InteractiveTerminal />}
          {activeTab === "api" && <ApiExplorer />}
          {activeTab === "component" && <ComponentPlayground />}
        </div>
      </div>
    </section>
  );
};
