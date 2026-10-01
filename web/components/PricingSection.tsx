// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { motion } from "framer-motion";

// interface Plan {
//   id: string;
//   name: string;
//   badge?: string;
//   popular?: boolean;
//   priceMonthly: number;
//   priceAnnual: number;
//   description: string;
//   features: string[];
//   ctaText: string;
//   ctaHref: string;
// }

// const PLANS: Plan[] = [
//   {
//     id: "starter",
//     name: "Canonical Free",
//     priceMonthly: 0,
//     priceAnnual: 0,
//     description: "Essential foundation for senior engineers beginning their system design prep.",
//     features: [
//       "Access to 12 canonical HLD & LLD problems",
//       "Interactive tldraw infinite canvas",
//       "TypeScript in-browser code editor",
//       "Basic automated SOLID principle audit",
//       "Standard community discussions",
//     ],
//     ctaText: "Start Practicing Free",
//     ctaHref: "/problems",
//   },
//   {
//     id: "pro",
//     name: "Staff Onsite Pass",
//     badge: "MOST POPULAR",
//     popular: true,
//     priceMonthly: 39,
//     priceAnnual: 29,
//     description: "Complete failure-mode simulation, race hazard detection, and Staff-calibrated grading.",
//     features: [
//       "All 50+ Canonical Staff-tier problems",
//       "Automated 5-axis L6 structural rubric",
//       "500k QPS live stress & fault simulations",
//       "Node-by-node canonical solution diffing",
//       "Multi-region topology stress benchmarks",
//       "Thread-safety & memory leak AST analysis",
//       "Priority candidate discord community",
//     ],
//     ctaText: "Get Onsite Ready",
//     ctaHref: "/signup",
//   },
//   {
//     id: "lifetime",
//     name: "Staff Lifetime",
//     badge: "ONE-TIME",
//     priceMonthly: 199,
//     priceAnnual: 199,
//     description: "Permanent access to all current and future system patterns, rubrics, and workbenches.",
//     features: [
//       "Lifetime access to all future problem banks",
//       "All Staff Onsite Pass capabilities included",
//       "Downloadable high-res architectural PDFs",
//       "Custom company interview track filters",
//       "Direct Discord channel with staff reviewers",
//       "Early beta access to new workbench tools",
//     ],
//     ctaText: "Unlock Lifetime Access",
//     ctaHref: "/signup",
//   },
// ];

// export function PricingSection() {
//   const [annual, setAnnual] = useState(true);

//   return (
//     <section id="pricing" className="relative border-t border-white/[0.06] bg-[#060505]/80 py-24 overflow-hidden">
//       {/* Background Glow */}
//       <div
//         className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full pointer-events-none opacity-[0.08] blur-[140px]"
//         style={{ background: "radial-gradient(circle, #FF5500 0%, #A51700 50%, transparent 75%)" }}
//       />

//       <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, margin: "-60px" }}
//           transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
//           className="text-center max-w-2xl mx-auto mb-12"
//         >
//           <span className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-[#FF7726] bg-[#FF5500]/10 border border-[#FF5500]/25 px-4 py-1.5 rounded-full">
//             <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] animate-pulse" />
//             INVESTMENT IN LEVERAGE
//           </span>
//           <h2 className="mt-5 text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.1]">
//             Transparent Pricing.
//             <br />
//             <span className="text-white/35">Priced below a single mock interview.</span>
//           </h2>
//           <p className="mt-4 text-[#9E9A94] text-sm sm:text-base leading-relaxed">
//             One staff offer negotiation yields a $40k–$80k differential. Master the rubric once, benefit for your entire career.
//           </p>

//           {/* Monthly / Annual Toggle */}
//           <div className="mt-8 inline-flex items-center gap-3 p-1.5 rounded-full tactile-card">
//             <button
//               onClick={() => setAnnual(false)}
//               className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
//                 !annual ? "bg-white/[0.1] text-white shadow-sm" : "text-white/45 hover:text-white"
//               }`}
//             >
//               Monthly
//             </button>
//             <button
//               onClick={() => setAnnual(true)}
//               className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
//                 annual ? "bg-gradient-to-r from-[#FF5500] to-[#E04400] text-white shadow-[0_0_12px_rgba(255,85,0,0.4)]" : "text-white/45 hover:text-white"
//               }`}
//             >
//               <span>Annual</span>
//               <span className="text-[10px] font-mono bg-black/30 px-1.5 py-0.2 rounded-full text-white/90">SAVE 25%</span>
//             </button>
//           </div>
//         </motion.div>

//         {/* Pricing Cards Grid */}
//         <div className="grid lg:grid-cols-3 gap-6 items-stretch">
//           {PLANS.map((plan, idx) => {
//             const price = plan.priceMonthly === 0 ? 0 : annual ? plan.priceAnnual : plan.priceMonthly;
//             const isLifetime = plan.id === "lifetime";

//             return (
//               <motion.div
//                 key={plan.id}
//                 initial={{ opacity: 0, y: 24 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, margin: "-40px" }}
//                 transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
//                 className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
//                   plan.popular
//                     ? "bg-[#0E0B09] border-2 border-[#FF5500]/60 shadow-[0_24px_70px_rgba(255,85,0,0.18)]"
//                     : "glass-card border border-white/[0.08]"
//                 }`}
//               >
//                 {/* Popular Flame Badge */}
//                 {plan.badge && (
//                   <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
//                     <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase text-white bg-gradient-to-r from-[#FF5500] to-[#FF7726] shadow-[0_0_12px_rgba(255,85,0,0.6)]">
//                       <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
//                       {plan.badge}
//                     </span>
//                   </div>
//                 )}

//                 <div>
//                   {/* Plan Name & Desc */}
//                   <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
//                   <p className="text-xs text-[#8E8A85] leading-relaxed mb-6 min-h-[36px]">{plan.description}</p>

//                   {/* Price Row */}
//                   <div className="flex items-baseline gap-1.5 mb-8 pb-6 border-b border-white/[0.06]">
//                     <span className="text-4xl sm:text-5xl font-extrabold text-white font-mono tracking-tight">
//                       ${price}
//                     </span>
//                     <span className="text-xs font-mono text-white/35">
//                       {price === 0 ? "free tier" : isLifetime ? "one-time payment" : "/ month"}
//                     </span>
//                   </div>

//                   {/* Features List */}
//                   <ul className="space-y-3 mb-8">
//                     {plan.features.map((f) => (
//                       <li key={f} className="flex items-start gap-2.5 text-xs text-[#C8C4BE] leading-snug">
//                         <span className="text-[#FF7726] mt-0.5 shrink-0 text-sm font-bold">✓</span>
//                         <span>{f}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>

//                 {/* Plan CTA Button */}
//                 <Link
//                   href={plan.ctaHref}
//                   className={`w-full py-3.5 px-6 rounded-full text-xs font-mono font-bold tracking-wider uppercase text-center transition-all ${
//                     plan.popular
//                       ? "btn-luminous text-white shadow-xl hover:scale-[1.02] active:scale-[0.98]"
//                       : "btn-ghost text-white hover:text-white"
//                   }`}
//                 >
//                   {plan.ctaText} →
//                 </Link>
//               </motion.div>
//             );
//           })}
//         </div>

//         {/* Security & Guarantee Note */}
//         <div className="mt-12 text-center text-xs font-mono text-white/30 flex items-center justify-center gap-6 flex-wrap">
//           <span className="inline-flex items-center gap-1.5">
//             <span className="text-emerald-400">✓</span> 14-day money-back guarantee
//           </span>
//           <span className="inline-flex items-center gap-1.5">
//             <span className="text-emerald-400">✓</span> Cancel subscription anytime
//           </span>
//           <span className="inline-flex items-center gap-1.5">
//             <span className="text-emerald-400">✓</span> Encrypted Stripe checkout
//           </span>
//         </div>
//       </div>
//     </section>
//   );
// }
