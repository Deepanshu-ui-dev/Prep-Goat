"use client";

import { motion, Variants } from "framer-motion";

import { authClient } from "@/lib/auth-client";
import { EvaluationSection } from "@/components/EvaluationSection";
import { FAQSection } from "@/components/FAQSection";
import { FooterCTA } from "@/components/Footercta";
import { Navbar } from "@/components/Navbar";
import { ProblemBankSection } from "@/components/ProblemBankSection";
import { ProofBentoGrid } from "@/components/ProofBentoGrid";
import { RecognitoHero } from "@/components/RecognitoHero";
import { TrackDemo } from "@/components/TrackDemo";
import { TrustMarquee } from "@/components/TrustMarquee";

interface WorkflowStep {
  step: string;
  title: string;
  description: string;
  tag: string;
}

const WORKFLOW_STEPS: ReadonlyArray<WorkflowStep> = [
  {
    step: "01",
    title: "Select a Canonical Problem",
    description:
      "From sliding-window rate limiters to multi-region video transcoding, pick a problem filtered by target company and tier.",
    tag: "CURATED SPEC",
  },
  {
    step: "02",
    title: "Whiteboard or Code",
    description:
      "Construct architecture topologies on an infinite canvas with tldraw, or author thread-safe classes in our TypeScript IDE.",
    tag: "DUAL WORKBENCH",
  },
  {
    step: "03",
    title: "Automated L6 Evaluation",
    description:
      "Our evaluation engine executes failure-mode simulations, audits thread-safety race hazards, and flags SOLID violations.",
    tag: "STRESS TEST",
  },
  {
    step: "04",
    title: "Diff Against Gold Standard",
    description:
      "Inspect the canonical Staff-engineer solution. Conduct an interactive node-by-node diff to eliminate conceptual gaps.",
    tag: "GAP RESOLUTION",
  },
];

// Motion Variants defined outside render loop to prevent recalculations
const headerVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const stepVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Home() {
  const { data: session } = authClient.useSession();

  return (
    <div className="bg-[#070606] text-[#F3F3F3] font-sans overflow-x-hidden min-h-screen film-grain">
      {/* Sticky Navigation */}
      <Navbar session={session} />

      {/* Hero Section */}
      <RecognitoHero />

      {/* Brand Trust Ticker */}
      <TrustMarquee />

      {/* Bento Grid Proof */}
      <ProofBentoGrid />

      {/* Live Product Track Demos */}
      <TrackDemo />

      {/* AI Evaluation Section */}
      <EvaluationSection />

      {/* Curated Problem Bank */}
      <ProblemBankSection />

      {/* Interview Lifecycle Workflow */}
      <section
        id="methodology"
        className="border-t border-white/[0.06] bg-[#060505]/70 py-24 relative overflow-hidden"
      >
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none opacity-[0.08] blur-[110px]"
          style={{
            background:
              "radial-gradient(circle, #FF5500 0%, #A51700 60%, transparent 80%)",
          }}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={headerVariants}
            className="max-w-2xl mx-auto mb-16 text-center"
          >
            <span className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-[#FF7726] bg-[#FF5500]/10 border border-[#FF5500]/25 px-4 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] animate-pulse" />
              METHODOLOGY
            </span>
            <h2 className="mt-5 text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-[1.15] line-clamp-2">
              From problem to postmortem <span className="text-white/30">in four steps.</span>
            </h2>
            <p className="mt-4 text-[#9E9A94] text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
              A structured loop that mirrors how senior engineers approach
              production incidents — not how candidates blindly memorize answers.
            </p>
          </motion.div>

          <motion.ol
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={containerVariants}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 list-none p-0 m-0"
          >
            {WORKFLOW_STEPS.map((s, idx) => (
              <motion.li
                key={s.step}
                variants={stepVariants}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col justify-between group relative overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.5)]"
              >
                {/* CSS Hover Beam Effect (Performant off-thread CSS transition) */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF5500] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Corner Glow */}
                <div className="absolute -bottom-12 -right-12 w-36 h-36 rounded-full bg-[#FF5500]/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-xl bg-[#FF5500]/15 border border-[#FF5500]/25 flex items-center justify-center font-mono text-sm font-extrabold text-[#FF7726] group-hover:scale-110 group-hover:shadow-[0_0_12px_rgba(255,85,0,0.4)] transition-all">
                        {s.step}
                      </span>
                    </div>
                    <span className="text-[9px] font-mono text-white/25 uppercase tracking-[0.15em] bg-white/[0.04] px-2 py-0.5 rounded-md flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-[#FF5500] opacity-0 group-hover:opacity-100 transition-opacity animate-ping" />
                      {s.tag}
                    </span>
                  </div>

                  <h3 className="text-[15px] font-bold text-white group-hover:text-[#FF7726] transition-colors duration-300 leading-snug mb-3">
                    {s.title}
                  </h3>
                  <p className="text-[13px] text-[#8E8A85] leading-relaxed">
                    {s.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.05] flex items-center justify-between text-[10px] font-mono">
                  <span className="text-white/25">
                    Step {idx + 1} of {WORKFLOW_STEPS.length}
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-[#FF5500]/50 group-hover:text-[#FF7726] group-hover:translate-x-1 transition-all"
                  >
                    →
                  </span>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Final CTA & Footer */}
      <FooterCTA />
    </div>
  );
}