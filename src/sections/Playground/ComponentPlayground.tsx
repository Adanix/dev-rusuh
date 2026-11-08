import React, { useState } from "react";
import { Sliders, ArrowRight, ShieldCheck } from "lucide-react";

export const ComponentPlayground: React.FC = () => {
  const [accent, setAccent] = useState<"lime" | "blue" | "emerald" | "amber">("lime");
  const [surfaceMode, setSurfaceMode] = useState<"glass" | "elevated" | "outline">("glass");
  const [interactiveState, setInteractiveState] = useState<"active" | "hover" | "disabled">("active");

  const accentColors = {
    lime: { hex: "#A3E635", name: "Electric Lime", text: "text-[#A3E635]", bg: "bg-[#A3E635]" },
    blue: { hex: "#60A5FA", name: "Electric Blue", text: "text-[#60A5FA]", bg: "bg-[#60A5FA]" },
    emerald: { hex: "#34D399", name: "Cyber Emerald", text: "text-[#34D399]", bg: "bg-[#34D399]" },
    amber: { hex: "#FBBF24", name: "Industrial Amber", text: "text-[#FBBF24]", bg: "bg-[#FBBF24]" },
  };

  const currentAccent = accentColors[accent];

  return (
    <div className="rounded-3xl bg-[#090B10] border border-white/[0.1] shadow-2xl overflow-hidden font-mono text-xs">
      {/* Title Bar */}
      <div className="flex items-center justify-between px-6 py-3 bg-[#141923] border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-[#A3E635]" />
          <span className="text-white font-bold">Component Design Token Playground</span>
        </div>
        <span className="text-slate-400 text-[11px]">Interactive Live Preview</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-white/[0.08]">
        {/* Controls Column (5 cols) */}
        <div className="md:col-span-5 p-6 space-y-5 bg-[#0D111A]">
          {/* Accent Color Toggle */}
          <div className="space-y-2">
            <label className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
              Primary Design Accent:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(["lime", "blue", "emerald", "amber"] as const).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setAccent(key)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs transition-all ${
                    accent === key
                      ? "bg-[#141923] border-white text-white font-bold shadow-md"
                      : "bg-white/[0.02] border-white/[0.06] text-slate-400 hover:text-white"
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: accentColors[key].hex }}
                  />
                  <span>{accentColors[key].name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Surface Mode Toggle */}
          <div className="space-y-2">
            <label className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
              Surface & Depth:
            </label>
            <div className="flex gap-2">
              {(["glass", "elevated", "outline"] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setSurfaceMode(mode)}
                  className={`flex-1 py-1.5 rounded-xl border text-xs capitalize transition-all ${
                    surfaceMode === mode
                      ? "bg-[#141923] border-[#A3E635] text-white font-bold"
                      : "bg-white/[0.02] border-white/[0.06] text-slate-400 hover:text-white"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive State */}
          <div className="space-y-2">
            <label className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
              Simulated Interaction State:
            </label>
            <div className="flex gap-2">
              {(["active", "hover", "disabled"] as const).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setInteractiveState(st)}
                  className={`flex-1 py-1.5 rounded-xl border text-xs capitalize transition-all ${
                    interactiveState === st
                      ? "bg-[#141923] border-[#A3E635] text-white font-bold"
                      : "bg-white/[0.02] border-white/[0.06] text-slate-400 hover:text-white"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Preview Display (7 cols) */}
        <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-center items-center bg-[#090B10] space-y-6">
          <div className="w-full max-w-sm">
            {/* The Dynamically Controlled Card */}
            <div
              className={`p-6 rounded-3xl transition-all duration-300 border ${
                surfaceMode === "glass"
                  ? "bg-[#141923]/70 backdrop-blur-xl border-white/[0.12] shadow-2xl"
                  : surfaceMode === "elevated"
                  ? "bg-[#1B2230] border-white/[0.18] shadow-2xl shadow-black/80"
                  : "bg-transparent border-white/[0.25]"
              } ${interactiveState === "disabled" ? "opacity-40 pointer-events-none" : ""}`}
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono"
                  style={{
                    backgroundColor: `${currentAccent.hex}20`,
                    color: currentAccent.hex,
                  }}
                >
                  LIVE COMPONENT
                </span>
                <ShieldCheck className="w-4 h-4 text-slate-400" />
              </div>

              <h4 className="font-display text-lg font-bold text-white mb-2">
                Digital System Node
              </h4>
              <p className="text-xs text-slate-300 font-sans leading-relaxed mb-5">
                Demonstrating dynamic token inheritance with synchronized CSS color variables and interactive borders.
              </p>

              {/* Dynamic Button */}
              <button
                type="button"
                className={`w-full py-2.5 rounded-xl font-sans text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  interactiveState === "hover"
                    ? "scale-[1.03] shadow-lg"
                    : ""
                }`}
                style={{
                  backgroundColor: currentAccent.hex,
                  color: "#090B10",
                  boxShadow: `0 4px 20px ${currentAccent.hex}30`,
                }}
              >
                <span>Deploy Microservice</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="text-[10px] font-mono text-slate-500">
            Active Accent: <span style={{ color: currentAccent.hex }}>{currentAccent.hex}</span> • Surface: {surfaceMode} • State: {interactiveState}
          </div>
        </div>
      </div>
    </div>
  );
};
