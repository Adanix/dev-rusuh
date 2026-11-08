import React, { useState } from "react";
import { technologies, type Technology } from "../../data/technologies";
import { Wrench, CheckCircle, Info } from "lucide-react";

export const TechStackSection: React.FC = () => {
  const [selectedTech, setSelectedTech] = useState<Technology>(technologies[0]);
  const [categoryFilter, setCategoryFilter] = useState<string>("All");

  const categories = ["All", "Backend", "Frontend", "Database", "Infrastructure"];

  const filteredTechnologies = categoryFilter === "All"
    ? technologies
    : technologies.filter((t) => t.category === categoryFilter);

  return (
    <section id="tech-stack" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141923] border border-white/[0.08] text-xs font-mono text-[#A3E635]">
              <Wrench className="w-3.5 h-3.5" />
              <span>// TECHNICAL ARSENAL</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Technology <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">Stack.</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-xl font-light">
              Pragmatic tools and battle-tested frameworks applied across production repositories. Zero artificial percentage scores.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoryFilter(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  categoryFilter === cat
                    ? "bg-[#A3E635] text-[#090B10] font-semibold"
                    : "bg-[#141923] text-slate-400 hover:text-white border border-white/[0.06]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Master-Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Tech Grid (8 Cols) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-3.5">
            {filteredTechnologies.map((tech) => {
              const isSelected = selectedTech.name === tech.name;

              return (
                <button
                  key={tech.name}
                  type="button"
                  onClick={() => setSelectedTech(tech)}
                  className={`p-4 rounded-2xl text-left transition-all duration-200 border flex flex-col justify-between h-28 ${
                    isSelected
                      ? "bg-[#1B2230] border-[#A3E635] shadow-lg shadow-[#A3E635]/10 scale-[1.02]"
                      : "bg-[#141923] border-white/[0.06] hover:border-white/[0.2] hover:bg-[#181E2B]"
                  }`}
                  aria-pressed={isSelected}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.05] text-slate-400">
                      {tech.category}
                    </span>
                    {tech.highlight && (
                      <span className="w-2 h-2 rounded-full bg-[#A3E635]" title="Primary core tool" />
                    )}
                  </div>
                  <div className="font-display font-bold text-sm sm:text-base text-white">
                    {tech.name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                    <Info className="w-3 h-3 text-slate-500" />
                    <span>Click to inspect</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Inspector Panel (4 Cols) */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="p-6 sm:p-7 rounded-3xl bg-[#141923] border border-white/[0.1] shadow-xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                <span className="text-xs font-mono uppercase tracking-widest text-[#A3E635]">
                  // TECHNOLOGY INSPECTOR
                </span>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-white/[0.06] text-slate-300">
                  {selectedTech.category}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="font-display text-2xl font-bold text-white">
                  {selectedTech.name}
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  Production Engineering Context
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Role in Architecture
                </span>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {selectedTech.description}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#0D111A] border border-white/[0.06] space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-mono text-[#60A5FA]">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Real Implementation Provenance</span>
                </div>
                <p className="text-xs text-slate-300/90 leading-relaxed pl-5 font-mono">
                  {selectedTech.provenance}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
