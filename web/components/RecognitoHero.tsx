"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Magnetic } from "./Magnetic";

interface ColumnProfile {
  id: string;
  height: string;
  delay: number;
  intensity: number;
}

interface Ember {
  id: string;
  top: string;
  left?: string;
  right?: string;
  delay: number;
}

// Vertical column flame heights with unique identifiers
const COLUMN_PROFILES: ColumnProfile[] = [
  { id: "col-1", height: "44%", delay: 0.1, intensity: 0.65 },
  { id: "col-2", height: "60%", delay: 0.2, intensity: 0.8 },
  { id: "col-3", height: "76%", delay: 0.15, intensity: 0.95 },
  { id: "col-4", height: "56%", delay: 0.25, intensity: 0.78 },
  { id: "col-5", height: "86%", delay: 0.05, intensity: 1.0 },
  { id: "col-6", height: "66%", delay: 0.3, intensity: 0.88 },
  { id: "col-7", height: "72%", delay: 0.18, intensity: 0.95 },
  { id: "col-8", height: "52%", delay: 0.22, intensity: 0.72 },
  { id: "col-9", height: "64%", delay: 0.12, intensity: 0.85 },
  { id: "col-10", height: "44%", delay: 0.28, intensity: 0.68 },
  { id: "col-11", height: "56%", delay: 0.16, intensity: 0.78 },
  { id: "col-12", height: "36%", delay: 0.24, intensity: 0.6 },
];

const EMBERS: Ember[] = [
  { id: "ember-1", top: "22%", left: "14%", delay: 0 },
  { id: "ember-2", top: "44%", left: "27%", delay: 1.2 },
  { id: "ember-3", top: "33%", right: "19%", delay: 0.8 },
  { id: "ember-4", top: "58%", right: "11%", delay: 1.8 },
  { id: "ember-5", top: "70%", left: "44%", delay: 2.3 },
  { id: "ember-6", top: "80%", right: "37%", delay: 1.5 },
  { id: "ember-7", top: "16%", left: "48%", delay: 2.7 },
  { id: "ember-8", top: "50%", left: "8%", delay: 0.5 },
];

export function RecognitoHero() {
  return (
    <section className="relative min-h-[85vh] flex flex-col justify-center items-center overflow-hidden bg-[#070606] select-none pt-24 sm:pt-32 pb-24">
      {/* ── 0. Top vignette for depth / separation from nav ── */}
      <div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-black/60 via-black/10 to-transparent z-10 pointer-events-none"
      />

      {/* ── 1. VERTICAL FLAME SLICE COLUMNS ── */}
      <div aria-hidden="true" className="absolute inset-0 grid grid-cols-12 pointer-events-none z-0">
        {COLUMN_PROFILES.map((col, idx) => (
          <div
            key={col.id}
            className="relative h-full border-r border-white/[0.04] last:border-r-0 flex flex-col justify-end overflow-hidden"
          >
            <motion.div
              className="w-full relative origin-bottom will-change-transform"
              style={{
                height: col.height,
                background: `linear-gradient(to top,
                  rgba(255, 72, 0, ${col.intensity * 0.95}) 0%,
                  rgba(255, 112, 0, ${col.intensity * 0.72}) 28%,
                  rgba(205, 40, 0, ${col.intensity * 0.42}) 60%,
                  rgba(120, 15, 0, 0.1) 84%,
                  transparent 100%)`,
              }}
              animate={{
                opacity: [col.intensity * 0.82, col.intensity, col.intensity * 0.82],
                scaleY: [1, 1.035, 1],
              }}
              transition={{
                duration: 4.5 + (idx % 3),
                repeat: Infinity,
                ease: "easeInOut",
                delay: col.delay,
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-20 rounded-full blur-2xl pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at center, rgba(255, 130, 0, ${col.intensity * 0.55}) 0%, transparent 78%)`,
                }}
              />
            </motion.div>
          </div>
        ))}
      </div>

      {/* ── 2. AMBIENT VOLUMETRIC HORIZON BLOOM ── */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[520px] pointer-events-none opacity-75 blur-[100px] z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, #FF4500 0%, #D82800 38%, rgba(120, 10, 0, 0.4) 64%, transparent 84%)",
        }}
      />

      {/* ── 3. Fine grain texture ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[5] pointer-events-none opacity-[0.035] mix-blend-overlay bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"
      />

      {/* ── Bottom fade ── */}
      <div aria-hidden="true" className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-[#070606] via-[#070606]/85 to-transparent z-10 pointer-events-none" />

      {/* ── 4. FLOATING EMBER STARS ── */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-10">
        {EMBERS.map((star) => (
          <motion.div
            key={star.id}
            className="absolute w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#FFF,0_0_16px_#FF6600] will-change-transform"
            style={{ top: star.top, left: star.left, right: star.right }}
            animate={{ opacity: [0.15, 1, 0.15], scale: [0.75, 1.25, 0.75] }}
            transition={{ duration: 3, repeat: Infinity, delay: star.delay, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* ── 5. HERO COPY ── */}
      <div className="relative z-20 max-w-4xl mx-auto text-center px-4 sm:px-6 pt-10 sm:pt-14">
        {/* Micro-badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-[#12100E]/80 border border-white/[0.12] backdrop-blur-xl rounded-full pl-1.5 pr-4 py-1 mb-7 shadow-lg"
        >
          <span className="inline-flex items-center gap-1.5 bg-[#FF4500] text-white text-[11px] font-semibold rounded-full px-2.5 py-0.5 tracking-wide">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/80 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
            </span>
            Get early access
          </span>
          <span className="text-[12px] font-mono text-white/80 font-medium">
            system design v2.0
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.15] line-clamp-2"
        >
          Meet Prep-Goat. <span className="font-normal bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">Built for Staff-level architecture.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 text-[#F9F6EE] text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed font-normal"
        >
          Empowering software engineers with real-time architectural stress
          testing, compiler-grade SOLID grading, and canonical reference
          solutions.
        </motion.p>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4 sm:gap-6"
        >
          <Magnetic>
            <Link
              href="/problems"
              className="group inline-flex items-center justify-center gap-1.5 rounded-full bg-white text-black hover:bg-white/90 px-7 py-3 text-sm font-semibold tracking-tight shadow-[0_4px_24px_rgba(255,255,255,0.25)] hover:shadow-[0_6px_32px_rgba(255,255,255,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Start Practicing
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Magnetic>

          <Magnetic>
            <Link
              href="#tracks"
              className="inline-flex items-center justify-center rounded-full bg-[#181513]/70 hover:bg-[#201D1A]/90 text-white/90 hover:text-white border border-white/[0.14] hover:border-white/[0.24] px-7 py-3 text-sm font-medium backdrop-blur-xl transition-all"
            >
              Explore Workbench
            </Link>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}