"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface Problem {
  id: string;
  title: string;
  slug: string;
  track: "HLD" | "LLD";
  difficulty: "Easy" | "Medium" | "Hard";
  companies: string[];
  category: string;
  attempts: number;
  passRate: number;
  description: string;
  tags: string[];
}

const PROBLEMS: Problem[] = [
  {
    id: "p1",
    title: "Design a Distributed Rate Limiter",
    slug: "distributed-rate-limiter",
    track: "HLD",
    difficulty: "Medium",
    companies: ["Stripe", "Meta", "Google"],
    category: "Traffic & Gateways",
    attempts: 1420,
    passRate: 48,
    description: "Design a high-throughput multi-region limiter handling 500k req/sec with sliding window logs.",
    tags: ["Redis", "Lua", "Sharding"],
  },
  {
    id: "p2",
    title: "Design a Thread-Safe In-Memory Cache (LRU)",
    slug: "lru-cache-implementation",
    track: "LLD",
    difficulty: "Medium",
    companies: ["Google", "Amazon", "Microsoft"],
    category: "Data Structures",
    attempts: 2150,
    passRate: 54,
    description: "Implement an O(1) read/write LRU cache with fine-grained lock striping and TTL expiration.",
    tags: ["Concurrency", "HashMap", "SOLID"],
  },
  {
    id: "p3",
    title: "Global Video Streaming & Transcoding Pipeline",
    slug: "video-streaming-architecture",
    track: "HLD",
    difficulty: "Hard",
    companies: ["Netflix", "Meta"],
    category: "Content Delivery",
    attempts: 980,
    passRate: 36,
    description: "Architect multi-bitrate HLS chunking, distributed CDN routing, and low-latency manifest delivery.",
    tags: ["CDN", "HLS", "Transcoding"],
  },
  {
    id: "p4",
    title: "Automated Parking Lot Management System",
    slug: "parking-lot-system",
    track: "LLD",
    difficulty: "Easy",
    companies: ["Amazon", "Uber"],
    category: "Object-Oriented Design",
    attempts: 3200,
    passRate: 72,
    description: "Write SOLID-compliant classes for multi-tier parking spot allocation, ticketing, and fee calculators.",
    tags: ["Strategy", "Factory", "OOP"],
  },
  {
    id: "p5",
    title: "Ride-Sharing Real-Time Geospatial Dispatcher",
    slug: "uber-ride-matching",
    track: "HLD",
    difficulty: "Hard",
    companies: ["Uber", "Google"],
    category: "Spatial Indexing",
    attempts: 1140,
    passRate: 39,
    description: "Match riders with drivers within 200ms using H3 hexagonal grids, WebSockets, and distributed pub/sub.",
    tags: ["H3", "WebSockets", "Pub/Sub"],
  },
  {
    id: "p6",
    title: "Pluggable Notification Service Engine",
    slug: "notification-service",
    track: "LLD",
    difficulty: "Medium",
    companies: ["Meta", "Stripe", "Netflix"],
    category: "Behavioral Patterns",
    attempts: 1780,
    passRate: 61,
    description: "Apply Observer and Strategy patterns to deliver SMS, Email, and Push with fallback channels.",
    tags: ["Observer", "Strategy", "Fallback"],
  },
  {
    id: "p7",
    title: "Blob Storage Engine (S3-compatible)",
    slug: "s3-blob-storage",
    track: "HLD",
    difficulty: "Hard",
    companies: ["Amazon", "Microsoft"],
    category: "Distributed Storage",
    attempts: 830,
    passRate: 31,
    description: "Partition metadata across consistent hashing rings with erasure coding and async replication.",
    tags: ["Erasure Coding", "Consistent Hash", "Replication"],
  },
  {
    id: "p8",
    title: "Snake and Ladder Board Game Engine",
    slug: "snake-and-ladder",
    track: "LLD",
    difficulty: "Easy",
    companies: ["Microsoft", "Google"],
    category: "Game Loop & OOP",
    attempts: 2890,
    passRate: 78,
    description: "Model modular dice rolling, customizable board hazards, and multi-player turn orchestrator.",
    tags: ["Game Loop", "OOP", "State"],
  },
];

const TRACK_FILTERS = ["All", "HLD", "LLD"] as const;
const DIFFICULTY_FILTERS = ["All", "Easy", "Medium", "Hard"] as const;
const COMPANY_FILTERS = ["All", "Google", "Meta", "Netflix", "Amazon", "Uber", "Stripe"] as const;

const DIFFICULTY_CONFIG = {
  Easy: { bg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25", dot: "bg-emerald-400", barColor: "#34d399" },
  Medium: { bg: "bg-[#FF7726]/10 text-[#FF7726] border-[#FF5500]/25", dot: "bg-[#FF7726]", barColor: "#FF7726" },
  Hard: { bg: "bg-rose-500/10 text-rose-400 border-rose-500/25", dot: "bg-rose-400", barColor: "#f87171" },
};

const TRACK_CONFIG = {
  HLD: { bg: "bg-blue-500/10 text-blue-400 border-blue-500/20", label: "HLD" },
  LLD: { bg: "bg-purple-500/10 text-purple-400 border-purple-500/20", label: "LLD" },
};

export function ProblemBankSection() {
  const [selectedTrack, setSelectedTrack] = useState<string>("All");
  const [selectedCompany, setSelectedCompany] = useState<string>("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");

  const filteredProblems = PROBLEMS.filter((problem) => {
    const matchesTrack = selectedTrack === "All" || problem.track === selectedTrack;
    const matchesCompany = selectedCompany === "All" || problem.companies.includes(selectedCompany);
    const matchesDifficulty = selectedDifficulty === "All" || problem.difficulty === selectedDifficulty;
    return matchesTrack && matchesCompany && matchesDifficulty;
  });

  const resetFilters = () => {
    setSelectedTrack("All");
    setSelectedCompany("All");
    setSelectedDifficulty("All");
  };

  return (
    <section id="problems-bank" className="border-t border-white/[0.06] bg-[#050404] py-24 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[400px] pointer-events-none opacity-[0.07] blur-[100px]"
        style={{ background: "radial-gradient(circle, #FF5500 0%, transparent 70%)" }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-6 mb-12 text-center"
        >
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-[#FF7726] bg-[#FF5500]/10 border border-[#FF5500]/25 px-4 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] animate-pulse" />
              CURATED PROBLEM BANK
            </span>
            <h2 className="mt-5 text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-[1.15] line-clamp-2">
              The Canonical Questions. <span className="text-white/35">Ready to build.</span>
            </h2>
            <p className="mt-3 text-[#8E8A85] max-w-xl mx-auto text-sm leading-relaxed">
              No toy examples. Every problem tests realistic production constraints with automated architectural validation.
            </p>
          </div>

          <Link
            href="/problems"
            className="inline-flex items-center gap-2.5 text-xs font-mono font-semibold text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] hover:border-white/[0.2] px-5 py-2.5 rounded-full transition-all group shrink-0"
          >
            Browse all 50+ problems
            <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 stroke-current group-hover:translate-x-1 transition-transform">
              <path d="M4 12L12 4M12 4H6M12 4V10" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>

        {/* Filter Toolbar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="flex flex-wrap items-center gap-2.5 mb-8 p-3 tactile-card rounded-2xl"
        >
          {/* Track Filter */}
          <div className="flex items-center gap-1.5 pr-3 border-r border-white/[0.07]">
            <span className="text-[10px] font-mono text-white/25 mr-1">TRACK</span>
            {TRACK_FILTERS.map((track) => (
              <button
                key={track}
                type="button"
                aria-pressed={selectedTrack === track}
                onClick={() => setSelectedTrack(track)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${selectedTrack === track
                    ? "bg-[#FF5500] text-white shadow-[0_2px_12px_rgba(255,85,0,0.35)]"
                    : "text-white/40 hover:text-white hover:bg-white/[0.05]"
                  }`}
              >
                {track}
              </button>
            ))}
          </div>

          {/* Difficulty Filter */}
          <div className="flex items-center gap-1.5 pr-3 border-r border-white/[0.07]">
            <span className="text-[10px] font-mono text-white/25 mr-1">DIFF</span>
            {DIFFICULTY_FILTERS.map((diff) => (
              <button
                key={diff}
                type="button"
                aria-pressed={selectedDifficulty === diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${selectedDifficulty === diff
                    ? "bg-white/15 text-white"
                    : "text-white/40 hover:text-white hover:bg-white/[0.05]"
                  }`}
              >
                {diff}
              </button>
            ))}
          </div>

          {/* Company Filter */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] font-mono text-white/25 mr-1">COMPANY</span>
            {COMPANY_FILTERS.map((comp) => (
              <button
                key={comp}
                type="button"
                aria-pressed={selectedCompany === comp}
                onClick={() => setSelectedCompany(comp)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all ${selectedCompany === comp
                    ? "bg-white text-black font-bold"
                    : "bg-white/[0.04] text-white/35 hover:text-white/75 border border-white/[0.06] hover:border-white/[0.14]"
                  }`}
              >
                {comp}
              </button>
            ))}
          </div>

          {/* Count Badge */}
          <div className="ml-auto flex items-center gap-2 text-[11px] font-mono text-white/30 shrink-0">
            <span>{filteredProblems.length}</span>
            <span>{filteredProblems.length === 1 ? "problem" : "problems"}</span>
          </div>
        </motion.div>

        {/* Problem Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredProblems.map((problem, i) => {
              const diff = DIFFICULTY_CONFIG[problem.difficulty];
              const track = TRACK_CONFIG[problem.track];

              return (
                <motion.div
                  key={problem.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.28, delay: i * 0.04 }}
                  className="group relative tactile-card hover:border-[#FF5500]/40 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 overflow-hidden cursor-default shadow-lg"
                >
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: "radial-gradient(circle at 50% 0%, rgba(255,85,0,0.1) 0%, transparent 60%)" }}
                  />

                  <div className="relative z-10">
                    {/* Badges Row */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-md border ${track.bg}`}>
                        {track.label}
                      </span>
                      <span className={`inline-flex items-center gap-1.5 text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border ${diff.bg}`}>
                        <span className={`w-1 h-1 rounded-full ${diff.dot}`} />
                        {problem.difficulty}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-sm font-bold text-white group-hover:text-[#FF7726] transition-colors leading-snug mb-2">
                      {problem.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[11px] text-white/40 line-clamp-2 leading-relaxed mb-3">
                      {problem.description}
                    </p>

                    {/* Tags */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {problem.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-[9px] font-mono text-white/25 bg-white/[0.04] border border-white/[0.06] px-1.5 py-0.5 rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom */}
                  <div className="relative z-10 mt-4 pt-4 border-t border-white/[0.06]">
                    {/* Pass Rate Bar */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-[10px] font-mono mb-1.5">
                        <span className="text-white/30">Pass rate</span>
                        <span className="text-white/50 font-semibold">{problem.passRate}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/[0.05] rounded-full overflow-hidden relative">
                        <motion.div
                          className="h-full rounded-full relative overflow-hidden"
                          style={{ background: `linear-gradient(90deg, ${diff.barColor}90, ${diff.barColor})` }}
                          initial={{ width: 0 }}
                          animate={{ width: `${problem.passRate}%` }}
                          transition={{ duration: 0.6, delay: i * 0.05, ease: "easeOut" }}
                        >
                          {/* Animated Shimmer beam */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none"
                            animate={{ x: ["-100%", "200%"] }}
                            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.2, ease: "linear" }}
                          />
                        </motion.div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Companies */}
                      <div className="flex items-center gap-1">
                        {problem.companies.slice(0, 2).map((c) => (
                          <span key={c} className="text-[9px] font-mono text-white/30 bg-white/[0.03] border border-white/[0.05] px-1.5 py-0.5 rounded">
                            {c}
                          </span>
                        ))}
                      </div>

                      {/* CTA */}
                      <Link
                        href={`/problems/${problem.slug}`}
                        className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[#FF7726] hover:text-white group-hover:translate-x-0.5 transition-all duration-200"
                      >
                        Solve
                        <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3 stroke-current">
                          <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProblems.length === 0 && (
          <div className="text-center py-20 bg-[#0C0A09] border border-white/[0.06] rounded-2xl">
            <div className="text-4xl mb-4">🔍</div>
            <p className="text-sm text-white/40 font-medium">No problems match the selected filters.</p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-4 text-xs font-mono font-semibold text-[#FF7726] hover:text-white border border-[#FF5500]/30 hover:border-[#FF5500]/60 px-4 py-2 rounded-full transition-all"
            >
              Reset all filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}