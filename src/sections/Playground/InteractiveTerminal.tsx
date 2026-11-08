import React, { useState, useRef, useEffect } from "react";
import { siteConfig } from "../../data/site";
import { projects } from "../../data/projects";
import { technologies } from "../../data/technologies";
import { Terminal as TerminalIcon, CornerDownLeft, Trash2 } from "lucide-react";

interface HistoryEntry {
  command: string;
  output: React.ReactNode;
}

export const InteractiveTerminal: React.FC = () => {
  const [inputVal, setInputVal] = useState<string>("");
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      command: "help",
      output: (
        <div className="space-y-1 text-slate-300">
          <p className="text-[#A3E635]">Available commands:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 pt-1 font-mono text-xs">
            <span><strong className="text-white">help</strong> : list commands</span>
            <span><strong className="text-white">about</strong> : developer summary</span>
            <span><strong className="text-white">skills</strong> : technical stack</span>
            <span><strong className="text-white">projects</strong> : project index</span>
            <span><strong className="text-white">contact</strong> : email & github</span>
            <span><strong className="text-white">clear</strong> : wipe terminal</span>
          </div>
        </div>
      ),
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    if (trimmed === "clear") {
      setHistory([]);
      setInputVal("");
      return;
    }

    let output: React.ReactNode;

    switch (trimmed) {
      case "help":
        output = (
          <div className="space-y-1 text-slate-300">
            <p className="text-[#A3E635]">Available commands:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 pt-1 font-mono text-xs">
              <span><strong className="text-white">help</strong> : list commands</span>
              <span><strong className="text-white">about</strong> : developer summary</span>
              <span><strong className="text-white">skills</strong> : technical stack</span>
              <span><strong className="text-white">projects</strong> : project index</span>
              <span><strong className="text-white">contact</strong> : email & github</span>
              <span><strong className="text-white">clear</strong> : wipe terminal</span>
            </div>
          </div>
        );
        break;

      case "about":
        output = (
          <div className="space-y-1.5 text-slate-300 text-xs">
            <p className="text-[#A3E635] font-bold">// ADANIX — Professional Overview</p>
            <p>{siteConfig.name} — {siteConfig.role}.</p>
            <p>{siteConfig.subheadline}</p>
            <p className="text-slate-400">Location: Yogyakarta, Indonesia</p>
          </div>
        );
        break;

      case "skills":
        output = (
          <div className="space-y-1.5 text-slate-300 text-xs">
            <p className="text-[#A3E635] font-bold">// Verified Technologies</p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {technologies.map((t) => (
                <span key={t.name} className="px-2 py-0.5 rounded bg-white/[0.08] text-white">
                  {t.name}
                </span>
              ))}
            </div>
          </div>
        );
        break;

      case "projects":
        output = (
          <div className="space-y-2 text-slate-300 text-xs">
            <p className="text-[#A3E635] font-bold">// Active Production Projects</p>
            {projects.map((p) => (
              <div key={p.id} className="p-2 rounded bg-white/[0.04] border border-white/[0.05]">
                <div className="text-white font-bold">{p.title} — {p.subtitle}</div>
                <div className="text-slate-400">{p.description}</div>
                <div className="text-[#60A5FA] mt-1">Live: {p.demoUrl}</div>
              </div>
            ))}
          </div>
        );
        break;

      case "contact":
        output = (
          <div className="space-y-1 text-slate-300 text-xs">
            <p className="text-[#A3E635] font-bold">// Verified Communication Channels</p>
            <p>Email: <a href={`mailto:${siteConfig.email}`} className="text-[#A3E635] underline">{siteConfig.email}</a></p>
            <p>GitHub: <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="text-[#60A5FA] underline">{siteConfig.github}</a></p>
            <p className="text-slate-400 mt-1">Or fill the contact form at section #contact.</p>
          </div>
        );
        break;

      default:
        output = (
          <div className="text-red-400 text-xs space-y-1">
            <p>Command not recognized: "{trimmed}".</p>
            <p className="text-slate-400">Type <span className="text-white font-mono">help</span> to view all allowed commands.</p>
          </div>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: trimmed, output }]);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(inputVal);
    }
  };

  const commandShortcuts = ["help", "about", "skills", "projects", "contact", "clear"];

  return (
    <div className="rounded-3xl bg-[#090B10] border border-white/[0.1] shadow-2xl overflow-hidden font-mono text-xs">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#141923] border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
          <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
          <span className="text-slate-400 text-xs font-mono ml-2 flex items-center gap-1.5">
            <TerminalIcon className="w-3.5 h-3.5 text-[#A3E635]" />
            adanix-shell@local:~$
          </span>
        </div>
        <button
          type="button"
          onClick={() => setHistory([])}
          className="p-1 rounded text-slate-400 hover:text-white"
          title="Clear screen"
          aria-label="Clear terminal"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Terminal Output Area */}
      <div className="p-4 sm:p-6 space-y-4 max-h-[360px] min-h-[220px] overflow-y-auto">
        {history.map((entry, index) => (
          <div key={index} className="space-y-1.5">
            <div className="flex items-center gap-2 text-slate-400">
              <span className="text-[#A3E635]">guest@adanix:~$</span>
              <span className="text-white font-semibold">{entry.command}</span>
            </div>
            <div className="pl-4 border-l border-white/[0.08]">{entry.output}</div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Command suggestion buttons for touch & mobile */}
      <div className="px-4 py-2 bg-[#0D111A] border-t border-white/[0.06] flex items-center gap-1.5 overflow-x-auto">
        <span className="text-[10px] text-slate-500 uppercase tracking-wider flex-shrink-0">
          Suggestions:
        </span>
        {commandShortcuts.map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={() => executeCommand(cmd)}
            className="px-2.5 py-1 rounded-md bg-white/[0.05] hover:bg-[#A3E635]/20 hover:text-[#A3E635] text-slate-300 text-[11px] transition-colors flex-shrink-0"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Input Line */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#141923] border-t border-white/[0.08]">
        <span className="text-[#A3E635] font-bold">guest@adanix:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type 'help' or click a suggestion..."
          className="w-full bg-transparent text-white focus:outline-none placeholder:text-slate-600 font-mono text-xs"
          aria-label="Interactive terminal input"
        />
        <button
          type="button"
          onClick={() => executeCommand(inputVal)}
          className="p-1 rounded bg-[#A3E635] text-[#090B10] hover:bg-[#bbf746] transition-colors"
          title="Send command"
          aria-label="Submit command"
        >
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
