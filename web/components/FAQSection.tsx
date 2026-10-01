"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  q: string;
  a: string;
}

const FAQS: FAQItem[] = [
  {
    q: "How does Prep-Goat evaluate system design architectures?",
    a: "Unlike generic chat interfaces that provide vague praise, our dual-engine evaluator performs structural graph analysis against your architecture topology. It stresses your design with failure-mode simulations (partition splits, cache stamps, burst spikes), audits concurrency hazards, and checks strict adherence to distributed consensus and SOLID principles.",
  },
  {
    q: "What is the difference between High-Level (HLD) and Low-Level (LLD) practice?",
    a: "HLD focuses on distributed topologies—message brokers, partitioning strategies, consistency models, and scale bottlenecks on our infinite canvas. LLD provides an in-browser TypeScript IDE where you author thread-safe classes, state machines, and concurrency primitives with compiler-grade automated tests.",
  },
  {
    q: "How is the grading calibrated for Staff (L6) vs Senior (L5)?",
    a: "Senior (L5) evaluations focus on functional correctness, sensible component choice, and baseline scaling. Staff (L6) evaluations hold you to cross-cutting trade-offs: cost analysis, blast-radius mitigation, operational telemetry, failover topologies, and multi-region data residency constraints.",
  },
  {
    q: "Can I inspect the gold-standard reference solutions?",
    a: "Yes. Every canonical problem in our bank features an interactive reference architecture and complete code implementation authored by Staff engineers from Google, Meta, and Stripe, complete with node-by-node diffing.",
  },
  {
    q: "Is there a free tier to practice without entering a card?",
    a: "Yes, you can access canonical problems, the infinite canvas workbench, and baseline evaluations entirely for free. Upgrading unlocks unlimited L6 failure-mode stress tests and custom company rubric calibrations.",
  },
];

export function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx((prev) => (prev === idx ? null : idx));
  };

  // Structured Data for SEO (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <section
      id="faq"
      className="border-t border-white/[0.06] bg-[#070606] py-24 relative overflow-hidden"
    >
      {/* Schema.org FAQ Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Background ambient flare */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] pointer-events-none opacity-[0.05] blur-[120px]"
        style={{
          background:
            "radial-gradient(ellipse, #FF5500 0%, #A51700 60%, transparent 80%)",
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-[#FF7726] bg-[#FF5500]/10 border border-[#FF5500]/25 px-4 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] animate-pulse" />
            CLEAR ANSWERS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.1]">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-[#9E9A94] text-sm sm:text-base leading-relaxed">
            Everything you need to know about our evaluation engine, workbenches,
            and curriculum.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            const contentId = `faq-answer-${idx}`;

            return (
              <motion.div
                key={idx}
                layout
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen
                    ? "bg-[#0E0C0B] border-[#FF5500]/30 shadow-[0_12px_32px_rgba(255,85,0,0.06)]"
                    : "bg-[#0A0908]/70 border-white/[0.06] hover:border-white/[0.12] hover:bg-[#0D0B0A]"
                  }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5500]/50"
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                >
                  <span className="font-semibold text-[15px] sm:text-base text-white tracking-tight">
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center border transition-all duration-300 ${isOpen
                        ? "bg-[#FF5500]/15 border-[#FF5500]/40 text-[#FF7726] rotate-180"
                        : "bg-white/[0.04] border-white/[0.1] text-white/50"
                      }`}
                  >
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      className="w-3.5 h-3.5 stroke-current"
                    >
                      <path
                        d="M4 6L8 10L12 6"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={contentId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                        opacity: { duration: 0.2 },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-1 text-sm text-[#9E9A94] leading-relaxed border-t border-white/[0.04]">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}