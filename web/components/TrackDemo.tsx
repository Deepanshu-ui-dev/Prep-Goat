"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WORKFLOW_STEPS = [
  { step: "01", title: "Select a Canonical Problem", tag: "Curated Spec" },
  { step: "02", title: "Whiteboard or Code", tag: "Dual Workbench" },
  { step: "03", title: "Automated L6 Evaluation", tag: "Stress Test" },
  { step: "04", title: "Diff Against Gold Standard", tag: "Gap Resolution" },
];

interface ArchNode {
  id: string;
  title: string;
  subtitle: string;
  role: string;
  icon: string;
  specs: string;
  latency: string;
  color: string;
  qps: string;
}

const ARCH_NODES: ArchNode[] = [
  {
    id: "clients",
    title: "Global Clients",
    subtitle: "Web, iOS, Android",
    role: "Traffic Origin",
    icon: "🌐",
    specs: "Edge Distributed · HTTPS/WSS",
    latency: "35ms",
    color: "#60a5fa",
    qps: "480k QPS",
  },
  {
    id: "dns",
    title: "Cloudflare Anycast",
    subtitle: "GeoDNS & DDoS Defense",
    role: "Global Router",
    icon: "🛡️",
    specs: "Layer 3/4 Mitigation · BGP Anycast",
    latency: "2.1ms",
    color: "#f59e0b",
    qps: "480k QPS",
  },
  {
    id: "gateway",
    title: "Envoy API Gateway",
    subtitle: "Auth, TLS Termination",
    role: "Reverse Proxy",
    icon: "⚡",
    specs: "Dynamic Routing · Circuit Breakers",
    latency: "0.8ms",
    color: "#ec4899",
    qps: "478k QPS",
  },
  {
    id: "limiter",
    title: "Rate Limiter Engine",
    subtitle: "Sliding Window Counter",
    role: "Core Enforcement",
    icon: "⏱️",
    specs: "Distributed Token Bucket · Lua Core",
    latency: "0.6ms",
    color: "#FF5500",
    qps: "478k QPS",
  },
  {
    id: "redis",
    title: "Redis Cluster",
    subtitle: "In-Memory Sharded State",
    role: "Shared Cache",
    icon: "💾",
    specs: "16k Hash Slots · Multi-Master",
    latency: "0.4ms",
    color: "#34d399",
    qps: "478k QPS",
  },
  {
    id: "db",
    title: "PostgreSQL Aurora",
    subtitle: "Persistent Quota Ledger",
    role: "Relational DB",
    icon: "🗄️",
    specs: "Multi-AZ Read Replicas",
    latency: "4.2ms",
    color: "#38bdf8",
    qps: "12k QPS",
  },
];

const CODE_SNIPPETS: Record<string, string> = {
  "TokenBucketLimiter.ts": `// TokenBucketLimiter.ts · SOLID-Compliant Production Implementation
export interface IRateLimiter {
  acquire(clientId: string, tokensRequested: number): Promise<boolean>;
  getQuota(clientId: string): Promise<QuotaSnapshot>;
}

export class DistributedTokenBucket implements IRateLimiter {
  constructor(
    private readonly cache: ICacheCluster,
    private readonly capacity: number,
    private readonly refillRatePerSecond: number
  ) {}

  public async acquire(clientId: string, tokens = 1): Promise<boolean> {
    const key = \`ratelimit:\${clientId}\`;
    const now = Date.now();

    // Atomic Lua evaluation prevents distributed race condition
    const script = \`
      local bucket = redis.call('HMGET', KEYS[1], 'tokens', 'lastUpdated')
      local currentTokens = tonumber(bucket[1]) or ARGV[1]
      local lastUpdated = tonumber(bucket[2]) or ARGV[3]
      local elapsed = math.max(0, (ARGV[3] - lastUpdated) / 1000)
      currentTokens = math.min(ARGV[1], currentTokens + (elapsed * ARGV[2]))
      
      if currentTokens >= tonumber(ARGV[4]) then
        currentTokens = currentTokens - tonumber(ARGV[4])
        redis.call('HMSET', KEYS[1], 'tokens', currentTokens, 'lastUpdated', ARGV[3])
        return 1
      else
        return 0
      end
    \`;

    const allowed = await this.cache.eval(script, [key], [
      this.capacity,
      this.refillRatePerSecond,
      now,
      tokens
    ]);

    return allowed === 1;
  }
}`,
  "IRateLimiter.ts": `// IRateLimiter.ts · Interface Contract
export interface QuotaSnapshot {
  remainingTokens: number;
  resetTimestamp: number;
}

export interface IRateLimiter {
  acquire(clientId: string, tokensRequested: number): Promise<boolean>;
  getQuota(clientId: string): Promise<QuotaSnapshot>;
}`,
  "RedisStorage.ts": `// RedisStorage.ts · Storage Adapter
export interface ICacheCluster {
  eval(script: string, keys: string[], args: (string | number)[]): Promise<number>;
}`,
};

const escapeHtml = (str: string) =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const highlightCode = (line: string) => {
  const safeLine = escapeHtml(line);
  return safeLine
    .replace(
      /\b(export|interface|class|constructor|private|readonly|public|async|await|return|if|else|const)\b/g,
      '<span style="color:#c084fc">$1</span>'
    )
    .replace(
      /\b(IRateLimiter|DistributedTokenBucket|ICacheCluster|Promise|boolean|number|string|QuotaSnapshot)\b/g,
      '<span style="color:#60a5fa">$1</span>'
    )
    .replace(/(\/\/.*)/g, '<span style="color:#6a737d;font-style:italic">$1</span>')
    .replace(/(`.*?`|'.*?'|&quot;.*?&quot;)/g, '<span style="color:#4ade80">$1</span>');
};

export function TrackDemo() {
  const [activeTrack, setActiveTrack] = useState<"hld" | "lld">("hld");
  const [selectedNode, setSelectedNode] = useState<ArchNode>(ARCH_NODES[3]);
  const [activeFile, setActiveFile] = useState<string>("TokenBucketLimiter.ts");
  const [analyzingCode, setAnalyzingCode] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [activePacketIndex, setActivePacketIndex] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePacketIndex((prev) => (prev + 1) % ARCH_NODES.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const runAnalysis = () => {
    setAnalyzingCode(true);
    setAnalysisResult(null);

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setAnalyzingCode(false);
      setAnalysisResult(
        "✓ L6 Grade: All 5 SOLID invariants validated. Thread-safety: 100%. Race hazards: 0. Atomic Lua verified."
      );
    }, 1200);
  };

  const currentSnippet = CODE_SNIPPETS[activeFile] || CODE_SNIPPETS["TokenBucketLimiter.ts"];

  return (
    <section id="tracks" className="border-t border-white/[0.06] bg-[#060505]/70 py-24 relative overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] pointer-events-none opacity-[0.14] blur-[130px]"
        style={{ background: "radial-gradient(ellipse, #FF5500 0%, #A51700 50%, transparent 75%)" }}
      />
      <div
        className="absolute top-0 right-0 w-[400px] h-[300px] pointer-events-none opacity-[0.06] blur-[90px]"
        style={{ background: "radial-gradient(circle, #6366f1 0%, transparent 70%)" }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col items-center gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl text-center"
          >
            <span className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-[#FF7726] bg-[#FF5500]/10 border border-[#FF5500]/25 px-4 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] animate-pulse" />
              INTERACTIVE WORKBENCH
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-[1.15] line-clamp-2">
              Two Disciplines. <span className="text-white/35">Tested with equal depth.</span>
            </h2>
            <p className="mt-3 text-[#8E8A85] text-sm leading-relaxed max-w-lg mx-auto">
              Switch between High-Level distributed topologies and Low-Level object-oriented design — both graded with the same uncompromising rubric.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex items-center gap-1.5 p-1.5 rounded-2xl tactile-card shadow-inner self-start lg:self-auto shrink-0"
          >
            {(["hld", "lld"] as const).map((track) => (
              <button
                key={track}
                onClick={() => setActiveTrack(track)}
                className={`relative flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 ${activeTrack === track
                    ? "bg-gradient-to-b from-[#1E1916] to-[#141110] text-white border border-white/[0.1] shadow-lg"
                    : "text-white/40 hover:text-white/70 hover:bg-white/[0.03]"
                  }`}
              >
                {activeTrack === track && (
                  <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#FF5500] animate-ping" />
                )}
                <span className="text-base">{track === "hld" ? "⊞" : "⌘"}</span>
                <span>{track === "hld" ? "High-Level Design" : "Low-Level Design"}</span>
                <span className="text-[9px] font-mono bg-white/[0.07] px-1.5 py-0.5 rounded-md text-white/40">
                  {track.toUpperCase()}
                </span>
              </button>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mb-10 grid grid-cols-2 lg:grid-cols-4 gap-2 tactile-card rounded-2xl p-2"
        >
          {WORKFLOW_STEPS.map((s, idx) => (
            <div
              key={s.step}
              className="group relative flex items-center gap-3 rounded-xl px-3.5 py-3 hover:bg-white/[0.04] transition-colors"
            >
              <span className="shrink-0 w-7 h-7 rounded-lg bg-[#FF5500]/15 border border-[#FF5500]/25 flex items-center justify-center font-mono text-[11px] font-extrabold text-[#FF7726] group-hover:scale-110 transition-transform">
                {s.step}
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-white leading-tight truncate">{s.title}</p>
                <p className="text-[9px] font-mono text-white/30 uppercase tracking-wider truncate">{s.tag}</p>
              </div>
              {idx < WORKFLOW_STEPS.length - 1 && (
                <span className="hidden lg:block absolute -right-1 top-1/2 -translate-y-1/2 text-white/10 group-hover:text-[#FF5500]/50 transition-colors">
                  →
                </span>
              )}
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="glass-card rounded-2xl overflow-hidden border border-white/[0.1] shadow-[0_32px_80px_rgba(0,0,0,0.8)]"
        >
          <AnimatePresence mode="wait">
            {activeTrack === "hld" ? (
              <motion.div
                key="hld-track"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="p-6 sm:p-8"
              >
                <div className="flex flex-wrap items-center justify-between border-b border-white/[0.07] pb-4 mb-6 gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    </div>
                    <div className="w-px h-4 bg-white/10" />
                    <span className="text-xs font-mono text-white/60 font-medium">distributed_rate_limiter.architecture</span>
                    <span className="text-[10px] font-mono text-white/30 bg-white/[0.05] px-2 py-0.5 rounded-md flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      LIVE TOPOLOGY
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="text-white/40">Inspecting:</span>
                    <span className="text-[#FF7726] font-semibold bg-[#FF5500]/10 border border-[#FF5500]/20 px-2.5 py-1 rounded-lg">
                      {selectedNode.icon} {selectedNode.title}
                    </span>
                  </div>
                </div>

                <div className="tech-dot-grid rounded-xl border border-white/[0.05] p-5 overflow-hidden relative">
                  <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {ARCH_NODES.map((node, index) => {
                      const isSelected = selectedNode.id === node.id;
                      const hasActivePacket = activePacketIndex === index;
                      return (
                        <motion.div
                          key={node.id}
                          onClick={() => setSelectedNode(node)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`cursor-pointer rounded-xl p-4 transition-all duration-300 relative overflow-hidden ${isSelected
                              ? "tactile-card border-[#FF5500] shadow-[0_0_24px_rgba(255,85,0,0.3)] ring-1 ring-[#FF5500]/50"
                              : hasActivePacket
                                ? "tactile-card border-white/[0.22] bg-[#141210]"
                                : "tactile-card hover:border-white/[0.2]"
                            }`}
                        >
                          {hasActivePacket && (
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF5500]/15 to-transparent pointer-events-none"
                              animate={{ x: ["-100%", "200%"] }}
                              transition={{ duration: 1.2, ease: "linear" }}
                            />
                          )}

                          <div className="flex items-center justify-between mb-2.5 relative z-10">
                            <span className="text-xl">{node.icon}</span>
                            <div className="flex items-center gap-1.5 font-mono text-[10px]">
                              <span className="text-white/30 text-[9px]">{node.qps}</span>
                              <span
                                className="font-bold px-1.5 py-0.5 rounded-md"
                                style={{
                                  color: node.color,
                                  background: `${node.color}18`,
                                  border: `1px solid ${node.color}30`,
                                }}
                              >
                                {node.latency}
                              </span>
                            </div>
                          </div>
                          <h4 className="text-xs font-bold text-white leading-snug relative z-10">{node.title}</h4>
                          <p className="text-[10px] text-white/40 mt-0.5 leading-snug relative z-10">{node.subtitle}</p>
                          <div className="mt-2.5 pt-2 border-t border-white/[0.05] flex items-center justify-between text-[9px] font-mono relative z-10">
                            <span className="text-white/35">{node.role}</span>
                            {isSelected ? (
                              <span className="text-[#FF7726] flex items-center gap-1 font-bold">
                                <span className="w-1 h-1 rounded-full bg-[#FF5500] animate-ping" />
                                Inspecting
                              </span>
                            ) : (
                              <span className="text-white/20 flex items-center gap-1">
                                <span className="w-1 h-1 rounded-full bg-emerald-400" /> Active
                              </span>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-4 p-4 rounded-xl tactile-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                      style={{ background: `${selectedNode.color}18`, border: `1px solid ${selectedNode.color}30` }}
                    >
                      {selectedNode.icon}
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-white flex items-center gap-2">
                        {selectedNode.title}
                        <span className="text-[10px] font-mono text-[#FF7726] bg-[#FF5500]/10 px-2 py-0.5 rounded">
                          {selectedNode.qps}
                        </span>
                      </h5>
                      <p className="text-xs text-white/40 font-mono mt-0.5">{selectedNode.specs}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-mono shrink-0">
                    <div className="text-center">
                      <div className="text-white/35 text-[10px] mb-0.5">LATENCY</div>
                      <div className="text-emerald-400 font-bold">{selectedNode.latency}</div>
                    </div>
                    <div className="w-px h-8 bg-white/10" />
                    <div className="text-center">
                      <div className="text-white/35 text-[10px] mb-0.5">STATE</div>
                      <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Healthy
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="lld-track"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="p-6 sm:p-8"
              >
                <div className="flex flex-wrap items-center justify-between border-b border-white/[0.07] pb-4 mb-4 gap-3">
                  <div className="flex items-center gap-2">
                    {Object.keys(CODE_SNIPPETS).map((file) => (
                      <button
                        key={file}
                        onClick={() => {
                          setActiveFile(file);
                          setAnalysisResult(null);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-[11px] font-mono transition-all ${activeFile === file
                            ? "bg-[#1A1512] text-[#FF7726] border border-[#FF5500]/30"
                            : "text-white/35 hover:text-white/70 hover:bg-white/[0.03]"
                          }`}
                      >
                        {activeFile === file && <span className="mr-1.5 text-[#FF5500]">●</span>}
                        {file}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={runAnalysis}
                    disabled={analyzingCode}
                    className="btn-luminous px-4 py-1.5 rounded-lg text-xs font-mono font-semibold text-white flex items-center gap-2 cursor-pointer disabled:opacity-70 shadow-[0_0_16px_rgba(255,85,0,0.4)]"
                  >
                    {analyzingCode ? (
                      <>
                        <span className="w-3 h-3 rounded-full border-2 border-white border-r-transparent animate-spin" />
                        Parsing AST Hierarchy...
                      </>
                    ) : (
                      <>▶ Run SOLID Audit</>
                    )}
                  </button>
                </div>

                <div className="bg-[#080706] rounded-xl border border-white/[0.05] h-[340px] overflow-y-auto no-scrollbar font-mono relative">
                  {analyzingCode && (
                    <motion.div
                      className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF5500] to-transparent pointer-events-none z-20 shadow-[0_0_10px_#FF5500]"
                      animate={{ top: ["0%", "100%", "0%"] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                    />
                  )}

                  <div className="flex">
                    <div className="select-none text-right text-white/15 text-[11px] leading-[1.8] py-4 pl-4 pr-3 border-r border-white/[0.05] w-12 shrink-0">
                      {currentSnippet.split("\n").map((_, idx) => (
                        <div key={idx}>{idx + 1}</div>
                      ))}
                    </div>
                    <pre className="text-[12px] leading-[1.8] text-white/75 py-4 px-4 overflow-x-auto">
                      {currentSnippet.split("\n").map((line, idx) => (
                        <div key={idx}>
                          <span dangerouslySetInnerHTML={{ __html: highlightCode(line) || "&nbsp;" }} />
                        </div>
                      ))}
                    </pre>
                  </div>
                </div>

                <div
                  className={`mt-4 p-4 rounded-xl border font-mono text-xs flex items-start gap-3 transition-all duration-300 ${analysisResult
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300 shadow-[0_0_16px_rgba(16,185,129,0.15)]"
                      : "tactile-card"
                    }`}
                >
                  <span className={`mt-0.5 shrink-0 ${analysisResult ? "text-emerald-400" : "text-white/20"}`}>
                    {analysisResult ? "✓" : "›"}
                  </span>
                  <div className="flex-1">
                    <div className={`font-semibold ${analysisResult ? "text-emerald-400" : "text-white/40"}`}>
                      {analysisResult || "Ready · Press 'Run SOLID Audit' to trigger deterministic AST compilation."}
                    </div>
                    {!analysisResult && (
                      <div className="text-white/20 text-[10px] mt-0.5">TypeScript 5.4 · Strict Mode · AST Auditor Ready</div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}