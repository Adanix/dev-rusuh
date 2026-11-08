import React, { useState } from "react";
import { projects } from "../../data/projects";
import { Play, Copy, Check, Server } from "lucide-react";

interface EndpointDef {
  method: "GET" | "POST";
  path: string;
  description: string;
  response: object;
}

export const ApiExplorer: React.FC = () => {
  const endpoints: EndpointDef[] = [
    {
      method: "GET",
      path: "/api/v1/projects",
      description: "Retrieve all verified production projects and live credentials.",
      response: {
        status: "success",
        code: 200,
        simulated: true,
        data: projects.map((p) => ({
          id: p.id,
          title: p.title,
          category: p.category,
          demo_url: p.demoUrl,
          tags: p.tags,
        })),
        meta: {
          total: projects.length,
          environment: "local-simulation",
        },
      },
    },
    {
      method: "GET",
      path: "/api/v1/system/health",
      description: "Simulated health check ping for core microservices.",
      response: {
        status: "healthy",
        code: 200,
        simulated: true,
        services: {
          database_mysql: { status: "connected", latency_ms: 1.2 },
          reverse_proxy: { status: "active", engine: "nginx-proxy-manager" },
          cache_driver: { status: "operational" },
        },
        timestamp: new Date().toISOString(),
      },
    },
    {
      method: "POST",
      path: "/api/v1/auth/validate-demo",
      description: "Verify client authorization headers against simulated scope.",
      response: {
        status: "authenticated",
        code: 200,
        simulated: true,
        token_type: "Bearer",
        permissions: ["read:projects", "execute:simulation"],
        user: "guest_inspector@adanix.local",
      },
    },
  ];

  const [activeEndpoint, setActiveEndpoint] = useState<EndpointDef>(endpoints[0]);
  const [responseOutput, setResponseOutput] = useState<string>(
    JSON.stringify(endpoints[0].response, null, 2)
  );
  const [copied, setCopied] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSendRequest = (endpoint: EndpointDef) => {
    setActiveEndpoint(endpoint);
    setLoading(true);
    setTimeout(() => {
      setResponseOutput(JSON.stringify(endpoint.response, null, 2));
      setLoading(false);
    }, 250);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(responseOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-3xl bg-[#090B10] border border-white/[0.1] shadow-2xl overflow-hidden font-mono text-xs">
      {/* Header with explicit SIMULATED banner */}
      <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 py-3 bg-[#141923] border-b border-white/[0.08] gap-2">
        <div className="flex items-center gap-2">
          <Server className="w-4 h-4 text-[#60A5FA]" />
          <span className="text-white font-bold">API Explorer</span>
        </div>
        <div className="px-2.5 py-0.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-[10px] font-semibold tracking-wider">
          SIMULATED LOCAL RESPONSE // NO LIVE SERVER
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-white/[0.08]">
        {/* Endpoint Selector (5 Cols) */}
        <div className="md:col-span-5 p-4 sm:p-5 space-y-3 bg-[#0D111A]">
          <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-2">
            Select Mock Endpoint:
          </div>
          <div className="space-y-2">
            {endpoints.map((ep) => {
              const isSelected = activeEndpoint.path === ep.path;
              return (
                <button
                  key={ep.path}
                  type="button"
                  onClick={() => handleSendRequest(ep)}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${
                    isSelected
                      ? "bg-[#141923] border-[#60A5FA] shadow-md shadow-[#60A5FA]/10"
                      : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.06]"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        ep.method === "GET"
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-emerald-500/20 text-emerald-400"
                      }`}
                    >
                      {ep.method}
                    </span>
                    <span className="text-xs text-white font-bold truncate">
                      {ep.path}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-sans leading-normal">
                    {ep.description}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => handleSendRequest(activeEndpoint)}
              className="w-full py-2.5 rounded-xl bg-[#60A5FA] text-[#090B10] font-semibold text-xs hover:bg-[#93c5fd] transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Simulate Request</span>
            </button>
          </div>
        </div>

        {/* Response Viewer (7 Cols) */}
        <div className="md:col-span-7 p-4 sm:p-5 space-y-3 bg-[#090B10]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Status:</span>
              <span className="text-emerald-400 font-bold">200 OK (Simulated)</span>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 hover:text-white transition-colors text-[11px]"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#A3E635]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy JSON"}</span>
            </button>
          </div>

          <div className="relative rounded-2xl bg-[#05070B] border border-white/[0.08] p-4 max-h-[300px] overflow-auto">
            {loading ? (
              <div className="text-slate-500 animate-pulse py-8 text-center">
                Processing simulated request...
              </div>
            ) : (
              <pre className="text-[11px] text-[#A3E635] font-mono leading-relaxed whitespace-pre">
                {responseOutput}
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
