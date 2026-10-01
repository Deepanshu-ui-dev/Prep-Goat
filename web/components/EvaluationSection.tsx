"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface RubricAxis {
  key: string;
  name: string;
  shortName: string;
  category: string;
  initialScore: number;
  refinedScore: number;
  critique: string;
  status: "Pass" | "Refined" | "Optimized";
  icon: string;
  ruleTag: string;
}

const RUBRIC_AXES: RubricAxis[] = [
  {
    key: "solid",
    name: "SOLID Principles",
    shortName: "SOLID",
    category: "Object-Oriented Design",
    initialScore: 58,
    refinedScore: 96,
    critique:
      "Decoupled storage backend via IRateLimiter interface; satisfies Single Responsibility and Dependency Inversion.",
    status: "Pass",
    icon: "🧱",
    ruleTag: "AST Validated",
  },
  {
    key: "scaling",
    name: "Throughput & Scaling",
    shortName: "Scaling",
    category: "Distributed Systems",
    initialScore: 42,
    refinedScore: 91,
    critique:
      "Consistent hashing ring prevents hotspotting across 16 Redis nodes. Validated for 450,000 requests/second.",
    status: "Optimized",
    icon: "⚡",
    ruleTag: "500k QPS Burst",
  },
  {
    key: "fault",
    name: "Fault Tolerance",
    shortName: "Fault",
    category: "Resilience Engineering",
    initialScore: 48,
    refinedScore: 88,
    critique:
      "Fallback circuit breaker degrades gracefully to local memory window if Redis cluster becomes unreachable.",
    status: "Refined",
    icon: "🛡️",
    ruleTag: "Zero Downtime",
  },
  {
    key: "concurrency",
    name: "Concurrency & CAS",
    shortName: "Concurrency",
    category: "Thread Safety",
    initialScore: 36,
    refinedScore: 94,
    critique:
      "Atomic Lua script evaluation eliminates write-skew race conditions under concurrent client bursts.",
    status: "Pass",
    icon: "⏱️",
    ruleTag: "Race Safe",
  },
  {
    key: "memory",
    name: "Memory Safety",
    shortName: "Memory",
    category: "Resource Management",
    initialScore: 50,
    refinedScore: 89,
    critique:
      "TTL auto-expiry on inactive client sliding windows prevents memory exhaustion over prolonged uptime.",
    status: "Refined",
    icon: "💾",
    ruleTag: "Zero Leak",
  },
];

const STATUS_COLORS = {
  Pass: {
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    dot: "bg-emerald-400",
  },
  Refined: {
    badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    dot: "bg-blue-400",
  },
  Optimized: {
    badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    dot: "bg-amber-400",
  },
};

export function EvaluationSection() {
  const [activeStep, setActiveStep] = useState(3);
  const [selectedAxis, setSelectedAxis] = useState(3);
  const [isPaused, setIsPaused] = useState(false);

  // SVG Radar calculations
  const size = 320;
  const center = size / 2;
  const radius = 105;
  const n = RUBRIC_AXES.length;

  const getCoordinates = useCallback(
    (index: number, score: number) => {
      const angle = (Math.PI * 2 * index) / n - Math.PI / 2;
      const distance = (score / 100) * radius;
      return [
        center + distance * Math.cos(angle),
        center + distance * Math.sin(angle),
      ];
    },
    [center, radius, n]
  );

  // User-selection handler with auto-play pause
  const handleSelect = (index: number) => {
    setActiveStep(index);
    setSelectedAxis(index);
    setIsPaused(true);
  };

  // Auto-play radar cycle (pauses when user interacts)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % RUBRIC_AXES.length);
      setSelectedAxis((prev) => (prev + 1) % RUBRIC_AXES.length);
    }, 3600);
    return () => clearInterval(timer);
  }, [isPaused]);

  const currentScores = RUBRIC_AXES.map((axis, idx) =>
    idx <= activeStep ? axis.refinedScore : axis.initialScore
  );

  const radarPoints = currentScores
    .map((score, i) => getCoordinates(i, score).join(","))
    .join(" ");

  const initialPoints = RUBRIC_AXES.map((axis, i) =>
    getCoordinates(i, axis.initialScore).join(",")
  ).join(" ");

  const compositeScore = Math.round(
    currentScores.reduce((acc, curr) => acc + curr, 0) / currentScores.length
  );

  const initialComposite = Math.round(
    RUBRIC_AXES.reduce((acc, a) => acc + a.initialScore, 0) / RUBRIC_AXES.length
  );

  const improvement = compositeScore - initialComposite;
  const currentActiveAxis = RUBRIC_AXES[selectedAxis] || RUBRIC_AXES[0];

  return (
    <section
      id="evaluation"
      className="relative border-t border-white/[0.06] bg-[#070606]/70 py-24 overflow-hidden"
    >
      {/* Ambient Volumetric Glows */}
      <div
        className="absolute top-1/3 left-0 w-[600px] h-[600px] rounded-full pointer-events-none opacity-[0.12] blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, #FF5500 0%, #A51700 60%, transparent 80%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-[0.07] blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, #6366f1 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto mb-12 text-center"
        >
          <span className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-[#FF7726] bg-[#FF5500]/10 border border-[#FF5500]/25 px-4 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] animate-pulse" />
            EVALUATION ENGINE
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-[1.15] line-clamp-2">
            Graded on Structural Judgment. <span className="text-white/35">Not keyword matching.</span>
          </h2>
          <p className="mt-4 text-[#8E8A85] text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
            Our rubric evaluates single-points-of-failure, scalability limits,
            and interface coupling just as an L6 Staff Bar-Raiser would. Step
            through the automated postmortem.
          </p>
        </motion.div>

        {/* Phase Scrubber Toolbar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 glass-card rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg"
        >
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs font-mono uppercase text-white/40 tracking-wider shrink-0">
              Phase:
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              {RUBRIC_AXES.map((axis, step) => (
                <button
                  key={step}
                  onClick={() => handleSelect(step)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all duration-250 ${activeStep >= step
                      ? "btn-luminous text-white shadow-[0_0_14px_rgba(255,85,0,0.4)]"
                      : "bg-white/[0.04] text-white/35 hover:bg-white/[0.07] hover:text-white/70"
                    }`}
                >
                  {axis.shortName}
                </button>
              ))}
              <button
                onClick={() => handleSelect(4)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${activeStep === 4
                    ? "btn-luminous text-white shadow-[0_0_14px_rgba(255,85,0,0.4)]"
                    : "bg-white/[0.04] text-white/35 hover:bg-white/[0.07] hover:text-white/70"
                  }`}
              >
                All
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 font-mono shrink-0">
            <div className="text-center">
              <div className="text-[10px] text-white/30 mb-0.5">COMPOSITE</div>
              <div className="text-lg font-bold text-[#FF7726]">
                {compositeScore}
                <span className="text-xs text-white/30">/100</span>
              </div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center">
              <div className="text-[10px] text-white/30 mb-0.5">IMPROVEMENT</div>
              <div className="text-lg font-bold text-emerald-400">
                +{improvement}pts
              </div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="flex items-center gap-1.5 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 font-semibold">
                {activeStep === 4
                  ? "Staff Certified"
                  : `Axis ${activeStep + 1}/5`}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Studio Grid */}
        <div className="grid lg:grid-cols-[1.05fr_1.2fr] gap-6 items-start">
          {/* Left Column: Sticky Radar & Telemetry */}
          <div className="lg:sticky lg:top-24 space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card rounded-2xl p-6 sm:p-7 flex flex-col items-center shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
            >
              <div className="w-full flex items-center justify-between border-b border-white/[0.07] pb-3 mb-5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-sm bg-[#FF5500]" />
                  <span className="font-mono text-xs text-white/70 uppercase tracking-wider font-semibold">
                    5-Axis Radar Matrix
                  </span>
                </div>
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="text-white/35">Score:</span>
                  <span className="text-lg font-bold text-[#FF7726]">
                    {compositeScore}
                    <span className="text-white/30 text-xs">/100</span>
                  </span>
                </div>
              </div>

              {/* SVG Radar */}
              <div className="relative w-full max-w-[320px] aspect-square flex items-center justify-center">
                <svg
                  viewBox={`0 0 ${size} ${size}`}
                  className="w-full h-full overflow-visible"
                >
                  <defs>
                    <linearGradient
                      id="radarSweep"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#FF5500"
                        stopOpacity="0.5"
                      />
                      <stop
                        offset="100%"
                        stopColor="#FF5500"
                        stopOpacity="0"
                      />
                    </linearGradient>
                  </defs>

                  {/* Radar grid rings */}
                  {[25, 50, 75, 100].map((ring) => (
                    <polygon
                      key={ring}
                      points={RUBRIC_AXES.map((_, i) =>
                        getCoordinates(i, ring).join(",")
                      ).join(" ")}
                      fill="none"
                      stroke={
                        ring === 100
                          ? "rgba(255,255,255,0.14)"
                          : "rgba(255,255,255,0.06)"
                      }
                      strokeWidth={ring === 100 ? 1 : 0.8}
                      strokeDasharray={ring === 100 ? "none" : "2 3"}
                    />
                  ))}

                  {/* Spokes */}
                  {RUBRIC_AXES.map((_, i) => {
                    const [x, y] = getCoordinates(i, 100);
                    return (
                      <line
                        key={i}
                        x1={center}
                        y1={center}
                        x2={x}
                        y2={y}
                        stroke="rgba(255,255,255,0.08)"
                        strokeWidth="1"
                      />
                    );
                  })}

                  {/* Initial ghost polygon */}
                  <polygon
                    points={initialPoints}
                    fill="rgba(255,255,255,0.02)"
                    stroke="rgba(255,255,255,0.18)"
                    strokeWidth="1.2"
                    strokeDasharray="3 3"
                  />

                  {/* Active area */}
                  <motion.polygon
                    points={radarPoints}
                    fill="rgba(255, 85, 0, 0.22)"
                    stroke="#FF5500"
                    strokeWidth="2.5"
                    className="filter drop-shadow-[0_0_16px_rgba(255,85,0,0.6)]"
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />

                  {/* Vertex dots */}
                  {currentScores.map((score, i) => {
                    const [x, y] = getCoordinates(i, score);
                    const isSelected = selectedAxis === i;
                    return (
                      <g
                        key={i}
                        onClick={() => handleSelect(i)}
                        className="cursor-pointer"
                      >
                        <circle
                          cx={x}
                          cy={y}
                          r={isSelected ? 6 : 4}
                          fill={isSelected ? "#FFF" : "#FF5500"}
                          stroke="#070606"
                          strokeWidth="2"
                          className="transition-all duration-200"
                        />
                      </g>
                    );
                  })}

                  {/* Axis Labels */}
                  {RUBRIC_AXES.map((axis, i) => {
                    const [x, y] = getCoordinates(i, 126);
                    const isSelected = selectedAxis === i;
                    return (
                      <text
                        key={axis.key}
                        x={x}
                        y={y + 4}
                        textAnchor="middle"
                        fontSize="10"
                        fontFamily="monospace"
                        fill={
                          isSelected ? "#FF7726" : "rgba(255,255,255,0.55)"
                        }
                        fontWeight={isSelected ? "bold" : "normal"}
                        className="cursor-pointer transition-all hover:fill-[#FF7726]"
                        onClick={() => handleSelect(i)}
                      >
                        {axis.shortName}
                      </text>
                    );
                  })}
                </svg>
              </div>

              <div className="w-full flex items-center justify-center gap-6 pt-4 border-t border-white/[0.06] text-xs font-mono mt-3">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-px border-b border-dashed border-white/35" />
                  <span className="text-white/40">Initial Spec</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-0.5 bg-[#FF5500] rounded-full" />
                  <span className="text-[#FF7726] font-semibold">
                    Staff Calibrated
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Assessment Telemetry */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="tactile-card rounded-2xl p-5 border border-white/[0.08] shadow-md"
            >
              <div className="flex items-center justify-between mb-3 text-xs font-mono">
                <span className="text-white/40">BAR-RAISER ASSESSMENT</span>
                <span className="text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                  STRONG HIRE (L6)
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono mb-3">
                <div className="bg-white/[0.03] border border-white/[0.05] p-2.5 rounded-xl">
                  <div className="text-white/30 text-[9px]">ACTIVE FOCUS</div>
                  <div className="text-white font-semibold truncate mt-0.5">
                    {currentActiveAxis.name}
                  </div>
                </div>
                <div className="bg-white/[0.03] border border-white/[0.05] p-2.5 rounded-xl">
                  <div className="text-white/30 text-[9px]">TAG</div>
                  <div className="text-[#FF7726] font-semibold mt-0.5">
                    {currentActiveAxis.ruleTag}
                  </div>
                </div>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentActiveAxis.key}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="text-[11px] text-white/50 leading-relaxed font-sans border-t border-white/[0.06] pt-3"
                >
                  Current selection:{" "}
                  <span className="text-white font-medium">
                    {currentActiveAxis.category}
                  </span>
                  . {currentActiveAxis.critique}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Right Column: Cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="space-y-3.5"
          >
            {RUBRIC_AXES.map((axis, idx) => {
              const isSelected = selectedAxis === idx;
              const isPassed = idx <= activeStep;
              const currentScore = isPassed
                ? axis.refinedScore
                : axis.initialScore;
              const statusColors = STATUS_COLORS[axis.status];
              const delta = axis.refinedScore - axis.initialScore;

              return (
                <motion.div
                  key={axis.key}
                  onClick={() => handleSelect(idx)}
                  whileHover={{ x: isSelected ? 0 : 4 }}
                  transition={{ duration: 0.15 }}
                  className={`cursor-pointer rounded-2xl p-5 border transition-all duration-300 relative overflow-hidden ${isSelected
                      ? "tactile-card border-[#FF5500]/70 shadow-[0_4px_24px_rgba(255,85,0,0.2)] ring-1 ring-[#FF5500]/40"
                      : "tactile-card hover:border-white/[0.18] shadow-md"
                    }`}
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`w-2 h-2 rounded-full transition-colors ${isPassed ? statusColors.dot : "bg-white/15"
                          }`}
                      />
                      <h4 className="text-sm font-bold text-white transition-colors">
                        {axis.name}
                      </h4>
                      <span
                        className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border ${statusColors.badge}`}
                      >
                        {axis.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 font-mono text-xs shrink-0">
                      {isPassed && (
                        <span className="text-emerald-400 text-[10px] font-bold">
                          +{delta}↑
                        </span>
                      )}
                      <span
                        className={`font-bold text-sm ${currentScore >= 90
                            ? "text-emerald-400"
                            : currentScore >= 75
                              ? "text-[#FF7726]"
                              : "text-amber-400"
                          }`}
                      >
                        {currentScore}
                        <span className="text-white/25 text-xs">/100</span>
                      </span>
                    </div>
                  </div>

                  {/* Animated Progress Bar */}
                  <div className="w-full bg-white/[0.05] h-1.5 rounded-full overflow-hidden mb-3 relative">
                    <motion.div
                      className="h-full rounded-full relative overflow-hidden"
                      style={{
                        background:
                          "linear-gradient(90deg, #FF7726, #D83B00)",
                      }}
                      initial={{ width: `${axis.initialScore}%` }}
                      animate={{ width: `${currentScore}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </div>

                  <div className="flex items-start gap-2">
                    <span className="text-[#FF5500]/60 text-xs mt-0.5 shrink-0">
                      ›
                    </span>
                    <p className="text-xs text-[#9E9A95] leading-relaxed">
                      {axis.critique}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* CTA Strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 p-5 sm:p-6 rounded-2xl border border-white/[0.08] bg-[#0C0A09]/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#FF5500]/15 border border-[#FF5500]/30 flex items-center justify-center text-sm text-[#FF7726] shrink-0">
              ⚡
            </div>
            <div>
              <p className="text-sm font-semibold text-white">
                Want to benchmark your own architecture?
              </p>
              <p className="text-xs text-[#8E8A85]">
                Submit any whiteboard diagram or code implementation to trigger
                a full 5-axis rubric audit.
              </p>
            </div>
          </div>
          <Link
            href="/problems"
            className="btn-luminous inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-xs font-mono font-bold text-white shrink-0 hover:scale-[1.03] active:scale-[0.97] transition-all"
          >
            <span>Solve and Audit Now</span>
            <span>→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}