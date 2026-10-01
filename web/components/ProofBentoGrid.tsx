"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface StatItem {
  id: string;
  value: string;
  label: string;
  sublabel: string;
}

const STATS: StatItem[] = [
  { id: "stat-1", value: "500K", label: "Requests/sec", sublabel: "Simulated peak throughput" },
  { id: "stat-2", value: "L6", label: "Bar Raised", sublabel: "Staff-calibrated rubric" },
  { id: "stat-3", value: "50+", label: "Canonical Problems", sublabel: "HLD + LLD coverage" },
  { id: "stat-4", value: "12m", label: "Avg Feedback Loop", sublabel: "From submit to insight" },
];

/* ─── 1. Animated Video Widget: SOLID Code Auditor ─── */
function SolidAuditorWidget() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  const solidRules = [
    { name: "Single Responsibility", status: "PASS", desc: "No multi-domain side effects", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
    { name: "Open-Closed Principle", status: "PASS", desc: "Pluggable storage provider", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
    { name: "Liskov Substitution", status: "PASS", desc: "Subtypes preserve invariants", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
    { name: "Interface Segregation", status: "WARN", desc: "Fat rate-limiter interface", color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
  ];

  return (
    <div className="mt-5 bg-[#060504]/90 border border-white/[0.08] rounded-xl p-4 font-mono text-[11px] relative overflow-hidden shadow-inner">
      {/* Laser scan line moving like a video scanner */}
      <motion.div
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF5500] to-transparent pointer-events-none z-20 shadow-[0_0_8px_#FF5500]"
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      {/* Terminal Header */}
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-2 mb-3 text-[10px] text-white/40">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-white/70">AST_AUDITOR_V2</span>
        </div>
        <span className="text-[#FF7726] text-[9px] bg-[#FF5500]/10 px-2 py-0.5 rounded border border-[#FF5500]/20">
          SCANNING 142 AST NODES
        </span>
      </div>

      {/* Dynamic Rule Rows */}
      <div className="space-y-2">
        {solidRules.map((rule, idx) => {
          const isScanning = activeStep === idx;
          return (
            <motion.div
              key={rule.name}
              className={`flex items-center justify-between py-1.5 px-2 rounded-lg border transition-all duration-300 ${isScanning
                  ? "bg-[#FF5500]/10 border-[#FF5500]/40 shadow-[0_0_12px_rgba(255,85,0,0.15)]"
                  : "bg-white/[0.02] border-white/[0.04]"
                }`}
            >
              <div className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${isScanning ? "bg-[#FF5500] animate-ping" : "bg-white/20"}`} />
                <span className={isScanning ? "text-white font-bold" : "text-white/60"}>
                  {rule.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {isScanning ? (
                  <span className="text-[9px] font-bold text-[#FF7726] animate-pulse">AUDITING...</span>
                ) : (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${rule.color}`}>
                    {rule.status}
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── 2. Animated Video Widget: Live Stress Simulation Wave ─── */
function StressSimulationWidget() {
  const [qps, setQps] = useState(498200);
  const [p99, setP99] = useState(1.4);

  useEffect(() => {
    const interval = setInterval(() => {
      setQps(490000 + Math.floor(Math.random() * 24000));
      setP99(+(1.2 + Math.random() * 0.5).toFixed(1));
    }, 1400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-5 bg-[#060504]/90 border border-white/[0.08] rounded-xl p-4 relative overflow-hidden shadow-inner">
      {/* Background live grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(to right, #FFF 1px, transparent 1px), linear-gradient(to bottom, #FFF 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />

      {/* Telemetry Header */}
      <div className="flex items-center justify-between text-[10px] font-mono text-white/40 mb-2 relative z-10" aria-live="polite">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#FF5500] animate-ping" />
          <span className="text-[#FF7726] font-bold" suppressHydrationWarning>
            {new Intl.NumberFormat("en-US").format(qps)} QPS
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[9px] text-white/30">LATENCY</span>
          <span className="text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded">
            p99: {p99}ms ↓
          </span>
        </div>
      </div>

      {/* Animated Live Wave Stream */}
      <div className="relative h-16 w-full overflow-hidden my-1 flex items-center">
        <svg viewBox="0 0 300 60" className="w-full h-full overflow-visible" preserveAspectRatio="none">
          <defs>
            <linearGradient id="liveWaveGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF5500" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#FF5500" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1="0" y1="15" x2="300" y2="15" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
          <line x1="0" y1="45" x2="300" y2="45" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />

          {/* Animated Area Wave */}
          <motion.path
            d="M 0 45 Q 40 45, 75 20 T 150 15 T 225 35 T 300 20 L 300 60 L 0 60 Z"
            fill="url(#liveWaveGrad)"
            animate={{
              d: [
                "M 0 45 Q 40 45, 75 20 T 150 15 T 225 35 T 300 20 L 300 60 L 0 60 Z",
                "M 0 40 Q 50 20, 95 35 T 175 12 T 245 42 T 300 25 L 300 60 L 0 60 Z",
                "M 0 45 Q 40 45, 75 20 T 150 15 T 225 35 T 300 20 L 300 60 L 0 60 Z",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Animated Wave Stroke */}
          <motion.path
            d="M 0 45 Q 40 45, 75 20 T 150 15 T 225 35 T 300 20"
            fill="none"
            stroke="#FF5500"
            strokeWidth="2.5"
            className="filter drop-shadow-[0_0_8px_rgba(255,85,0,0.9)]"
            animate={{
              d: [
                "M 0 45 Q 40 45, 75 20 T 150 15 T 225 35 T 300 20",
                "M 0 40 Q 50 20, 95 35 T 175 12 T 245 42 T 300 25",
                "M 0 45 Q 40 45, 75 20 T 150 15 T 225 35 T 300 20",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Glowing pulse dot traveling on peak */}
          <motion.circle
            cx="150"
            cy="15"
            r="4"
            fill="#FFFFFF"
            stroke="#FF5500"
            strokeWidth="2"
            animate={{
              cy: [15, 12, 15],
              cx: [150, 175, 150],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>

      <div className="flex items-center justify-between text-[9px] font-mono text-white/30 pt-1 border-t border-white/[0.05]">
        <span>0ms (T-0)</span>
        <span className="text-[#FF7726] font-bold">● CHAOS BURST INJECTED</span>
        <span>+500ms</span>
      </div>
    </div>
  );
}

/* ─── 3. Animated Video Widget: Canonical Diff Inspector ─── */
function CanonicalDiffWidget() {
  const [diffMatch, setDiffMatch] = useState(84);
  const [highlightIdx, setHighlightIdx] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setHighlightIdx((prev) => (prev + 1) % 3);
      setDiffMatch(82 + Math.floor(Math.random() * 16));
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  const diffItems = [
    { type: "del", text: "− Single Redis Master Node", tag: "Bottleneck", tagBg: "bg-rose-500/20 text-rose-300 border-rose-500/30", rowBg: "bg-rose-500/10 border-rose-500/20 text-rose-300" },
    { type: "add", text: "+ Redis Cluster /w Consistent Hash", tag: "Canonical", tagBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30", rowBg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-300" },
    { type: "add", text: "+ Circuit Breaker Fallback Policy", tag: "Added", tagBg: "bg-blue-500/20 text-blue-300 border-blue-500/30", rowBg: "bg-blue-500/10 border-blue-500/20 text-blue-300" },
  ];

  return (
    <div className="mt-5 space-y-2 bg-[#060504]/90 border border-white/[0.08] rounded-xl p-4 font-mono text-[11px] relative overflow-hidden shadow-inner">
      {/* Diff Header */}
      <div className="flex items-center justify-between text-[10px] text-white/40 pb-2 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
          <span>YOUR TOPOLOGY</span>
          <span className="text-white/20">vs</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-emerald-400 font-bold">CANONICAL</span>
        </div>
        <div className="text-[#FF7726] font-bold bg-[#FF5500]/10 border border-[#FF5500]/20 px-2 py-0.5 rounded text-[9px]">
          {diffMatch}% STAFF MATCH
        </div>
      </div>

      {/* Diff Lines with active glowing scan */}
      {diffItems.map((item, idx) => {
        const isCurrent = highlightIdx === idx;
        return (
          <motion.div
            key={item.text}
            className={`flex items-center justify-between p-2 rounded-lg border transition-all duration-300 relative overflow-hidden ${item.rowBg} ${isCurrent ? "ring-1 ring-[#FF5500]/50 shadow-[0_0_12px_rgba(255,85,0,0.15)]" : ""
              }`}
          >
            {isCurrent && (
              <motion.div
                className="absolute inset-0 bg-white/5 pointer-events-none"
                animate={{ opacity: [0.2, 0.6, 0.2] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
            <span className="text-[10px] font-semibold truncate mr-2">{item.text}</span>
            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border shrink-0 ${item.tagBg}`}>
              {item.tag}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}

const FEATURES = [
  {
    id: "01",
    tag: "OBJECT-ORIENTED RIGOR",
    headline: "Graded on SOLID, not subjective vibes.",
    body: "Every class hierarchy is parsed into abstract syntax trees to flag Liskov violations, tight coupling, and hidden race conditions with deterministic grading.",
    widget: <SolidAuditorWidget />,
    footer: { left: "Deterministic AST Parser", right: "100% Objective", rightColor: "text-[#FF7726]" },
  },
  {
    id: "02",
    tag: "STRESS SIMULATION",
    headline: "Stop guessing. Stress-test under real load.",
    body: "Run continuous 500k QPS simulation bursts across your topology to expose database connection pool starvation and cold-start latency spikes.",
    widget: <StressSimulationWidget />,
    footer: { left: "Chaos Injection Engine", right: "Zero Downtime", rightColor: "text-emerald-400" },
  },
  {
    id: "03",
    tag: "CANONICAL DIFF",
    headline: "See exactly where your architecture diverged.",
    body: "Unlock the verified Staff-level solution and perform a side-by-side architectural diff to understand why your cache topology was susceptible to the thundering herd problem.",
    widget: <CanonicalDiffWidget />,
    footer: { left: "Canonical Node Diff", right: "100% Unlocked", rightColor: "text-[#FF7726]" },
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0 },
};

export function ProofBentoGrid() {
  return (
    <section className="border-t border-white/[0.06] bg-[#080706] pt-8 pb-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto mb-16 text-center"
        >
          <span className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-[#FF7726] bg-[#FF5500]/10 border border-[#FF5500]/25 px-4 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] animate-pulse" />
            THE PREP-GOAT STANDARD
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-[1.15] line-clamp-2">
            Engineered for Rigor. <span className="text-white/30">Calibrated by Staff Interviewers.</span>
          </h2>
          <p className="mt-4 text-[#9E9A94] text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            The only platform that treats your system design submission as a production postmortem — not a checkbox exercise.
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden mb-10"
        >
          {STATS.map((stat) => (
            <div key={stat.id} className="tactile-card px-6 py-6 text-center group hover:border-[#FF5500]/30 transition-colors">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white group-hover:text-[#FF7726] transition-colors relative z-10">
                {stat.value}
              </div>
              <div className="text-xs font-semibold text-white/65 mt-1 relative z-10">{stat.label}</div>
              <div className="text-[10px] text-white/30 mt-0.5 font-mono relative z-10">{stat.sublabel}</div>
            </div>
          ))}
        </motion.div>

        {/* Feature Bento Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {FEATURES.map((feat, i) => (
            <motion.div
              key={feat.id}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={cardVariants}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="glass-card rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden group shadow-[0_16px_40px_rgba(0,0,0,0.6)]"
            >
              {/* Ambient dynamic card glow */}
              <div className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full bg-[#FF5500]/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div>
                {/* Card header */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] font-bold text-[#FF7726] bg-[#FF5500]/10 border border-[#FF5500]/20 px-2.5 py-1 rounded-lg tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] animate-pulse" />
                    {feat.tag}
                  </span>
                  <span className="font-mono text-xl font-black text-white/10 group-hover:text-[#FF5500]/30 transition-colors">
                    {feat.id}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white tracking-tight leading-snug group-hover:text-[#FF7726] transition-colors duration-300">
                  {feat.headline}
                </h3>
                <p className="mt-2.5 text-xs text-[#8E8A85] leading-relaxed">{feat.body}</p>

                {/* Dynamic Video Simulation Widget */}
                {feat.widget}
              </div>

              {/* Footer */}
              <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
                <span className="text-white/35 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {feat.footer.left}
                </span>
                <span className={`font-bold ${feat.footer.rightColor}`}>{feat.footer.right}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}