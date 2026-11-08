import React, { useState } from "react";
import { projects, type Project } from "../../data/projects";
import { ProjectDetailModal } from "./ProjectDetailModal";
import { ExternalLink, Key, ArrowRight, Layers, Sparkles } from "lucide-react";

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Management Systems", "Diagnostic & Healthcare", "Workflow & Community"];

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141923] border border-white/[0.08] text-xs font-mono text-[#A3E635]">
              <Layers className="w-3.5 h-3.5" />
              <span>// PROOF OF WORK</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">Projects.</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-xl font-light">
              Real-world systems with verifiable functionality, live demonstration credentials, and specialized domain workflows.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-[#A3E635] text-[#090B10] font-semibold shadow-md shadow-[#A3E635]/15"
                    : "bg-[#141923] text-slate-400 hover:text-white border border-white/[0.06] hover:border-white/[0.15]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative flex flex-col justify-between rounded-3xl bg-[#141923] border border-white/[0.08] hover:border-[#A3E635]/40 transition-all duration-300 hover:shadow-2xl hover:shadow-[#A3E635]/5 overflow-hidden"
            >
              {/* Top Accent Line */}
              <div
                className="h-1 w-full"
                style={{ backgroundColor: project.accentColor }}
              />

              {/* Card Body */}
              <div className="p-6 sm:p-7 space-y-5">
                {/* Header row */}
                <div className="flex items-start justify-between gap-3">
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-slate-300">
                    {project.category}
                  </span>
                  <span
                    className="text-[11px] font-mono px-2.5 py-0.5 rounded-full font-semibold"
                    style={{
                      backgroundColor: `${project.accentColor}15`,
                      color: project.accentColor,
                    }}
                  >
                    {project.badge}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <div className="space-y-1.5">
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-[#A3E635] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">
                    {project.subtitle}
                  </p>
                </div>

                {/* Abstract Visual Card Representation */}
                <div
                  className="h-36 rounded-2xl p-4 flex flex-col justify-between border border-white/[0.06] relative overflow-hidden bg-[#090B10]/70"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span>HOSTED_APP</span>
                    <span className="text-[#A3E635] flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> LIVE
                    </span>
                  </div>

                  <div className="font-mono text-xs text-slate-300 space-y-1">
                    <div className="truncate text-slate-400">// stack</div>
                    <div className="truncate text-white font-semibold">
                      {project.tags.slice(0, 3).join(" • ")}
                    </div>
                  </div>

                  {project.demoCredentials && (
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 bg-white/[0.03] px-2 py-1 rounded border border-white/[0.04]">
                      <Key className="w-3 h-3 text-[#A3E635]" />
                      <span>Creds: {project.demoCredentials.user} / {project.demoCredentials.pass}</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300/80 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-[#1B2230] text-slate-300 border border-white/[0.05]"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/[0.03] text-slate-500">
                      +{project.tags.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 sm:p-5 bg-[#0D111A] border-t border-white/[0.06] flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="text-xs font-medium text-slate-300 hover:text-white flex items-center gap-1.5 group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Architecture Details</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#A3E635]" />
                </button>

                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-xl bg-white/[0.06] hover:bg-[#A3E635] hover:text-[#090B10] text-slate-200 transition-all"
                  title="Open live demonstration"
                >
                  <span>Live Site</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Detail Overlay */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
