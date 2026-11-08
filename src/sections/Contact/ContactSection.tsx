import React, { useState } from "react";
import { siteConfig } from "../../data/site";
import { Mail, Send, AlertTriangle, CheckCircle, ExternalLink, HelpCircle } from "lucide-react";
import { GithubIcon } from "../../components/ui/GithubIcon";

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    _gotcha: "", // Honeypot field
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check honeypot
    if (formData._gotcha) {
      setStatus("success");
      return;
    }

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setErrorMessage("Please complete all required fields (Name, Email, Message).");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus("error");
      setErrorMessage("Please provide a valid email address.");
      return;
    }

    // Check if endpoint is configured
    if (!siteConfig.formspreeEndpoint) {
      setStatus("error");
      setErrorMessage(
        "Form submission service is awaiting environment configuration (VITE_FORMSPREE_ENDPOINT). Please click the direct email link below to reach out directly!"
      );
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch(siteConfig.formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || "Portfolio Inquiry",
          message: formData.message,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "", _gotcha: "" });
      } else {
        const errorData = await response.json();
        setStatus("error");
        setErrorMessage(
          errorData?.error || "Failed to deliver message. Please contact directly via email."
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error occurred. Please contact directly via email.");
    }
  };

  return (
    <section id="contact" className="py-20 relative bg-[#090B10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-left space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141923] border border-white/[0.08] text-xs font-mono text-[#A3E635]">
            <Mail className="w-3.5 h-3.5" />
            <span>// COMMUNICATION GATEWAY</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">Touch.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl font-light">
            Available for technical inquiries, architecture consultations, and full-stack software development discussions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#141923] border border-white/[0.08] space-y-6">
              <h3 className="font-display text-xl font-bold text-white">
                Verified Channels
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                To maintain authentic and focused communication, this portfolio only maintains two direct communication channels alongside this form.
              </p>

              {/* Verified Channel 1: Email */}
              <a
                href={`mailto:${siteConfig.email}`}
                className="group flex items-start gap-4 p-4 rounded-2xl bg-[#0D111A] border border-white/[0.06] hover:border-[#A3E635]/40 transition-all"
              >
                <div className="p-2.5 rounded-xl bg-[#A3E635]/15 text-[#A3E635] flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-1 truncate">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                    Direct Email
                  </span>
                  <div className="text-sm font-mono text-white font-semibold truncate group-hover:text-[#A3E635] transition-colors">
                    {siteConfig.email}
                  </div>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    Opens your email client <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </a>

              {/* Verified Channel 2: GitHub */}
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 p-4 rounded-2xl bg-[#0D111A] border border-white/[0.06] hover:border-[#60A5FA]/40 transition-all"
              >
                <div className="p-2.5 rounded-xl bg-[#60A5FA]/15 text-[#60A5FA] flex-shrink-0 group-hover:scale-110 transition-transform">
                  <GithubIcon className="w-5 h-5" />
                </div>
                <div className="space-y-1 truncate">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                    Source Code & Repositories
                  </span>
                  <div className="text-sm font-mono text-white font-semibold truncate group-hover:text-[#60A5FA] transition-colors">
                    github.com/Adanix
                  </div>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    Inspect public contributions <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </a>

              {/* Endpoint Notice */}
              <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.05] text-[11px] font-mono text-slate-400 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <HelpCircle className="w-3.5 h-3.5 text-[#A3E635]" />
                  <span>Deployment Context</span>
                </div>
                <p>
                  Zero backend databases or tracking cookies are utilized. Messages are securely routed through static form endpoints.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-8 rounded-3xl bg-[#141923] border border-white/[0.08] space-y-5 shadow-2xl"
              noValidate
            >
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                <h3 className="font-display text-xl font-bold text-white">
                  Send Message
                </h3>
                <span className="text-[11px] font-mono text-slate-400">
                  * Required fields
                </span>
              </div>

              {/* Honeypot field (hidden from real users) */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="_gotcha">Do not fill this</label>
                <input
                  id="_gotcha"
                  type="text"
                  name="_gotcha"
                  value={formData._gotcha}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Status alerts */}
              {status === "success" && (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3 text-xs text-emerald-300">
                  <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-400" />
                  <div>
                    <div className="font-bold">Message sent successfully!</div>
                    <div className="mt-0.5 text-emerald-200/80">Thank you for reaching out. I will respond to your message promptly.</div>
                  </div>
                </div>
              )}

              {status === "error" && (
                <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-start gap-3 text-xs text-red-300">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-400" />
                  <div>
                    <div className="font-bold">Transmission Error</div>
                    <div className="mt-0.5 text-red-200/80">{errorMessage}</div>
                  </div>
                </div>
              )}

              {/* Form Input: Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-mono text-slate-300 flex items-center justify-between">
                    <span>Name *</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-xl bg-[#090B10] border border-white/[0.08] focus:border-[#A3E635] focus:outline-none text-white text-xs font-mono transition-colors placeholder:text-slate-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-mono text-slate-300 flex items-center justify-between">
                    <span>Email Address *</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#090B10] border border-white/[0.08] focus:border-[#A3E635] focus:outline-none text-white text-xs font-mono transition-colors placeholder:text-slate-600"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label htmlFor="subject" className="text-xs font-mono text-slate-300">
                  Subject (Optional)
                </label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Project Consultation / System Architecture"
                  className="w-full px-4 py-3 rounded-xl bg-[#090B10] border border-white/[0.08] focus:border-[#A3E635] focus:outline-none text-white text-xs font-mono transition-colors placeholder:text-slate-600"
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label htmlFor="message" className="text-xs font-mono text-slate-300">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Describe your inquiry or system requirements..."
                  className="w-full px-4 py-3 rounded-xl bg-[#090B10] border border-white/[0.08] focus:border-[#A3E635] focus:outline-none text-white text-xs font-mono transition-colors placeholder:text-slate-600 resize-y"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-3.5 rounded-xl bg-[#A3E635] text-[#090B10] font-semibold text-xs hover:bg-[#bbf746] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#A3E635]/15 flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
              >
                {status === "loading" ? (
                  <span>Transmitting Message...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
