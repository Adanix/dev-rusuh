import React, { useState } from "react";
import { workflowSteps, type WorkflowStep } from "../../data/workflow";
import { GitBranch, Check, Compass } from "lucide-react";

export const WorkflowSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<WorkflowStep>(workflowSteps[0]);

  return (
    <section id="workflow" className="py-20 relative bg-[#090B10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-left space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141923] border border-white/[0.08] text-xs font-mono text-[#A3E635]">
            <Compass className="w-3.5 h-3.5" />
            <span>// ENGINEERING METHODOLOGY</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            How I <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">Work.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl font-light">
            A disciplined engineering lifecycle prioritizing domain comprehension and clean architecture over premature optimization.
          </p>
        </div>

        {/* Stepper Navigation Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
          {workflowSteps.map((step) => {
            const isActive = activeStep.step === step.step;

            return (
              <button
                key={step.step}
                type="button"
                onClick={() => setActiveStep(step)}
                className={`p-4 rounded-2xl text-left transition-all border flex flex-col justify-between h-28 ${
                  isActive
                    ? "bg-[#1B2230] border-[#A3E635] shadow-lg shadow-[#A3E635]/10 scale-[1.02]"
                    : "bg-[#141923] border-white/[0.06] hover:border-white/[0.15]"
                }`}
                aria-pressed={isActive}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`font-mono text-xs font-bold ${
                      isActive ? "text-[#A3E635]" : "text-slate-500"
                    }`}
                  >
                    PHASE {step.step}
                  </span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#A3E635]" />}
                </div>
                <div className="font-display font-bold text-sm sm:text-base text-white">
                  {step.name}
                </div>
                <span className="text-[10px] font-mono text-slate-400">
                  Click to view
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Step Deep-Dive Card */}
        <div className="p-6 sm:p-10 rounded-3xl bg-[#141923] border border-white/[0.1] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 text-8xl font-display font-black text-white/[0.02] select-none pointer-events-none">
            {activeStep.step}
          </div>

          <div className="max-w-3xl space-y-6 relative z-10">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#A3E635]/15 text-[#A3E635] font-semibold border border-[#A3E635]/30">
                PHASE {activeStep.step} — {activeStep.name.toUpperCase()}
              </span>
              <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                <GitBranch className="w-3.5 h-3.5" />
                <span>Workflow Pipeline</span>
              </span>
            </div>

            <h3 className="font-display text-2xl sm:text-4xl font-bold text-white">
              {activeStep.headline}
            </h3>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
              {activeStep.description}
            </p>

            {/* Key Deliverables & Guiding Principle */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/[0.08]">
              <div className="space-y-2.5">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Key Deliverables
                </span>
                <ul className="space-y-1.5">
                  {activeStep.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <Check className="w-3.5 h-3.5 text-[#A3E635] flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2 bg-[#0D111A] p-4 rounded-2xl border border-white/[0.06]">
                <span className="text-xs font-mono uppercase tracking-wider text-[#60A5FA]">
                  Core Engineering Principle
                </span>
                <p className="text-xs font-mono text-slate-200 italic pt-1">
                  "{activeStep.keyPrinciple}"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
