import React from "react";
import { capabilities } from "../../data/capabilities";
import { projects } from "../../data/projects";
import { Cpu, AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";

export const CapabilitiesSection: React.FC = () => {
  const handleScrollToProject = (_projectId: string) => {
    const el = document.getElementById("projects");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="capabilities" className="py-20 relative bg-[#090B10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-left space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141923] border border-white/[0.08] text-xs font-mono text-[#60A5FA]">
            <Cpu className="w-3.5 h-3.5" />
            <span>// CAPABILITIES MATRIX</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            What I <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">Build.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl font-light">
            Engineered software solutions tailored to eliminate operational friction and solve tangible business challenges.
          </p>
        </div>

        {/* 2x2 Bento Capability Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {capabilities.map((cap) => {
            const relatedProjects = projects.filter((p) =>
              cap.relatedProjectIds.includes(p.id)
            );

            return (
              <div
                key={cap.id}
                className="group p-6 sm:p-8 rounded-3xl bg-[#141923] border border-white/[0.08] hover:border-[#60A5FA]/40 transition-all duration-300 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-[#60A5FA]/10 text-[#60A5FA] border border-[#60A5FA]/20 font-semibold">
                      {cap.badge}
                    </span>
                    <span className="text-xs font-mono text-slate-500">// CAPABILITY</span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-[#60A5FA] transition-colors">
                    {cap.title}
                  </h3>

                  {/* Problem vs Solution Split */}
                  <div className="space-y-3 pt-2">
                    <div className="p-3.5 rounded-2xl bg-[#0D111A] border border-red-500/10 space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-mono text-red-400 font-medium">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>The Operational Friction</span>
                      </div>
                      <p className="text-xs text-slate-300/80 leading-relaxed pl-5">
                        {cap.problem}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-[#0D111A] border border-emerald-500/10 space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Architectural Solution</span>
                      </div>
                      <p className="text-xs text-slate-300/90 leading-relaxed pl-5">
                        {cap.solution}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer: Tech pills and concrete project reference */}
                <div className="space-y-3 pt-4 border-t border-white/[0.06]">
                  <div className="flex flex-wrap gap-1.5">
                    {cap.techPill.map((pill) => (
                      <span
                        key={pill}
                        className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-[#1B2230] text-slate-300 border border-white/[0.06]"
                      >
                        {pill}
                      </span>
                    ))}
                  </div>

                  {relatedProjects.length > 0 && (
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-1">
                      <span>Verified in:</span>
                      <div className="flex gap-2">
                        {relatedProjects.map((p) => (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => handleScrollToProject(p.id)}
                            className="text-xs text-[#A3E635] hover:underline flex items-center gap-1"
                          >
                            <span>{p.title}</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
