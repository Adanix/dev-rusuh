import React from "react";
import { siteConfig } from "../../data/site";
import { Mail, ArrowUp } from "lucide-react";
import { GithubIcon } from "../ui/GithubIcon";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#090B10] border-t border-white/[0.08] py-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand & Description */}
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="font-display font-bold text-xl tracking-wider text-white">
                {siteConfig.brand}
              </span>
              <span className="text-xs font-mono text-slate-500">// FULL-STACK PORTFOLIO</span>
            </div>
            <p className="text-xs text-slate-400 font-light">
              Engineering digital systems, clinical tools, and scalable web solutions.
            </p>
          </div>

          {/* Contact Links & Back to Top */}
          <div className="flex items-center gap-6">
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-xs font-mono text-slate-400 hover:text-[#A3E635] transition-colors flex items-center gap-1.5"
              aria-label="Send direct email"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email</span>
            </a>

            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-slate-400 hover:text-[#60A5FA] transition-colors flex items-center gap-1.5"
              aria-label="Open GitHub profile"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>

            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-[#141923] border border-white/[0.08] text-slate-400 hover:text-white hover:border-[#A3E635]/40 transition-colors"
              aria-label="Back to top"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-8 pt-6 border-t border-white/[0.04] text-center text-xs font-mono text-slate-500">
          &copy; {currentYear} {siteConfig.name} ({siteConfig.brand}). All Rights Reserved. Static frontend deployed via GitHub Pages.
        </div>
      </div>
    </footer>
  );
};
