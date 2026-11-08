import React from "react";
import { siteConfig } from "../../data/site";
import { HeroCanvas } from "../../components/3d/HeroCanvas";
import { ArrowDown, Code2, Terminal } from "lucide-react";

export const HeroSection: React.FC = () => {
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background radial gradient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#A3E635]/[0.035] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-[#60A5FA]/[0.03] rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headline & Positioning */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141923] border border-white/[0.08] text-xs font-mono text-slate-300">
              <span className="w-2 h-2 rounded-full bg-[#A3E635]"></span>
              <span>Full-Stack Web Engineering</span>
              <span className="text-slate-500">•</span>
              <span className="text-[#A3E635]">System Architectures</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-1">
              <p className="text-sm sm:text-base font-mono uppercase tracking-widest text-[#60A5FA]">
                // {siteConfig.brand}
              </p>
              <h1 className="font-display text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
                I BUILD <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A3E635] via-lime-300 to-[#60A5FA]">DIGITAL SYSTEMS.</span>
              </h1>
            </div>

            {/* Subtitle / Positioning */}
            <p className="text-base sm:text-lg text-slate-300/90 leading-relaxed max-w-2xl font-light">
              {siteConfig.subheadline} Focused on clean database modeling, operational resilience, and intuitive full-stack web applications.
            </p>

            {/* Key Architectural Highlights (Honest, Proof-of-Work oriented) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-[#141923]/60 border border-white/[0.06]">
                <div className="flex items-center gap-2 text-xs font-mono text-[#A3E635] mb-1">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Backend</span>
                </div>
                <div className="text-xs text-slate-300 font-medium">Laravel & PHP Core</div>
              </div>
              <div className="p-3 rounded-xl bg-[#141923]/60 border border-white/[0.06]">
                <div className="flex items-center gap-2 text-xs font-mono text-[#60A5FA] mb-1">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Frontend</span>
                </div>
                <div className="text-xs text-slate-300 font-medium">React & Modern UI</div>
              </div>
              <div className="p-3 rounded-xl bg-[#141923]/60 border border-white/[0.06] col-span-2 sm:col-span-1">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>Database</span>
                </div>
                <div className="text-xs text-slate-300 font-medium">Relational MySQL</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                type="button"
                onClick={() => handleScrollTo("projects")}
                className="px-6 py-3 rounded-xl bg-[#A3E635] text-[#090B10] font-semibold text-sm hover:bg-[#b5f543] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#A3E635]/15 flex items-center gap-2"
              >
                <span>Explore Projects</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => handleScrollTo("playground")}
                className="px-6 py-3 rounded-xl bg-[#141923] text-slate-200 border border-white/[0.1] font-medium text-sm hover:text-white hover:border-[#A3E635]/40 hover:bg-[#1B2230] transition-all flex items-center gap-2"
              >
                <Terminal className="w-4 h-4 text-[#A3E635]" />
                <span>Interactive Playground</span>
              </button>
            </div>
          </div>

          {/* Right Column: 3D Object & Interactive Canvas */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="w-full max-w-md lg:max-w-none relative">
              <div className="glass-panel p-2 sm:p-4 rounded-3xl relative overflow-hidden">
                <div className="absolute top-3 left-4 flex items-center gap-1.5 z-20">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
                  <span className="text-[10px] font-mono text-slate-400 ml-2">CORE_KERNEL_3D.obj</span>
                </div>
                <HeroCanvas />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Cue */}
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => handleScrollTo("projects")}
            className="flex flex-col items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-[#A3E635] transition-colors"
            aria-label="Scroll to projects"
          >
            <span>DISCOVER WORK</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};
