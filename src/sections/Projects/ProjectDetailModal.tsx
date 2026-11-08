import React, { useEffect } from "react";
import type { Project } from "../../data/projects";
import { X, ExternalLink, Key, User, Check, Copy } from "lucide-react";
import { GithubIcon } from "../../components/ui/GithubIcon";

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const [copiedKey, setCopiedKey] = React.useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const copyToClipboard = (text: string, keyName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(keyName);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#141923] border border-white/[0.12] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-slate-300">
                {project.category}
              </span>
              <span
                className="text-[11px] font-mono px-2.5 py-0.5 rounded-full font-semibold"
                style={{
                  backgroundColor: `${project.accentColor}20`,
                  color: project.accentColor,
                  borderColor: `${project.accentColor}40`,
                }}
              >
                {project.badge}
              </span>
            </div>
            <h2 id="modal-project-title" className="font-display text-2xl sm:text-3xl font-bold text-white">
              {project.title}
            </h2>
            <p className="text-sm text-slate-400 mt-1">{project.subtitle}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635]"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Abstract Architectural Identity Banner */}
        <div
          className="relative h-32 rounded-2xl overflow-hidden p-6 flex items-center justify-between border"
          style={{
            borderColor: `${project.accentColor}30`,
            background: `linear-gradient(135deg, ${project.accentColor}15 0%, #141923 100%)`,
          }}
        >
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
              Verified Production Architecture
            </span>
            <div className="text-lg font-bold text-white font-mono">
              // {project.id.toUpperCase()}_SYSTEM
            </div>
          </div>
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center font-display font-black text-2xl border"
            style={{
              backgroundColor: `${project.accentColor}25`,
              borderColor: `${project.accentColor}60`,
              color: project.accentColor,
            }}
          >
            {project.title.charAt(0)}
          </div>
        </div>

        {/* Full Description */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">Overview</h3>
          <p className="text-sm text-slate-300 leading-relaxed">{project.description}</p>
        </div>

        {/* Key Features */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">Key Architectural Features</h3>
          <ul className="grid grid-cols-1 gap-2">
            {project.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 bg-white/[0.02] p-2.5 rounded-xl border border-white/[0.04]">
                <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: project.accentColor }} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack Tags */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">Verified Technologies</h3>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono px-3 py-1 rounded-lg bg-[#1B2230] text-slate-200 border border-white/[0.08]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Demo Credentials Box */}
        {project.demoCredentials && (
          <div className="p-4 rounded-2xl bg-[#090B10]/80 border border-white/[0.1] space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-[#A3E635]">
                <Key className="w-3.5 h-3.5" />
                Live Demo Test Credentials
              </span>
              <span>Public Testing</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#141923] border border-white/[0.06]">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  {project.demoCredentials.userLabel || "User"}:
                </span>
                <div className="flex items-center gap-2">
                  <code className="text-white font-bold">{project.demoCredentials.user}</code>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(project.demoCredentials!.user, "user")}
                    className="p-1 text-slate-400 hover:text-white"
                    title="Copy username"
                  >
                    {copiedKey === "user" ? <Check className="w-3.5 h-3.5 text-[#A3E635]" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#141923] border border-white/[0.06]">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5" />
                  Pass:
                </span>
                <div className="flex items-center gap-2">
                  <code className="text-white font-bold">{project.demoCredentials.pass}</code>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(project.demoCredentials!.pass, "pass")}
                    className="p-1 text-slate-400 hover:text-white"
                    title="Copy password"
                  >
                    {copiedKey === "pass" ? <Check className="w-3.5 h-3.5 text-[#A3E635]" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-white/[0.08]">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-medium px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-slate-200 hover:text-white transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Repository</span>
            </a>
          )}
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold px-5 py-2.5 rounded-xl bg-[#A3E635] text-[#090B10] hover:bg-[#b5f543] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#A3E635]/15"
          >
            <span>Launch Live Demo</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
