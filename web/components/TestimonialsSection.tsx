// "use client";

// import { motion } from "framer-motion";

// interface Testimonial {
//   quote: string;
//   author: string;
//   role: string;
//   company: string;
//   companyColor: string;
//   level: string;
//   stats: string;
//   avatarSeed: string;
// }

// const TESTIMONIALS: Testimonial[] = [
//   {
//     quote:
//       "Most prep platforms let you get away with hand-wavy architecture drawings. Prep-Goat's automated race condition analysis flagged a write-skew bug in my rate limiter that would have definitely cost me my L6 interview at Stripe.",
//     author: "Alex Rivera",
//     role: "Staff Infrastructure Engineer",
//     company: "Stripe",
//     companyColor: "#635BFF",
//     level: "L6 Staff",
//     stats: "+42 pts on Concurrency Rubric",
//     avatarSeed: "AR",
//   },
//   {
//     quote:
//       "The dual workbench is a game changer. I could diagram a distributed cache topology with partition tolerance in tldraw, then immediately write the thread-safe LRU in TypeScript with fine-grained lock striping.",
//     author: "Priya Nair",
//     role: "Senior Distributed Systems SWE",
//     company: "Google",
//     companyColor: "#4285F4",
//     level: "L5 Senior",
//     stats: "Offer Accepted (MTV)",
//     avatarSeed: "PN",
//   },
//   {
//     quote:
//       "Walking into an E6 onsite at Meta knowing exactly how my fault tolerance circuit breaker scores against an automated AST rubric gave me unbelievable confidence. The postmortem diff mode is unmatched.",
//     author: "Marcus Chen",
//     role: "Principal Architect",
//     company: "Meta",
//     companyColor: "#0668E1",
//     level: "E6 Staff",
//     stats: "Cleared 4 Onsite Rounds",
//     avatarSeed: "MC",
//   },
// ];

// export function TestimonialsSection() {
//   return (
//     <section className="relative border-t border-white/[0.06] bg-[#070606] py-24 overflow-hidden">
//       {/* Background Volumetric Glows */}
//       <div
//         className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[550px] rounded-full pointer-events-none opacity-[0.09] blur-[120px]"
//         style={{ background: "radial-gradient(circle, #FF5500 0%, #A51700 60%, transparent 80%)" }}
//       />
//       <div
//         className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none opacity-[0.05] blur-[100px]"
//         style={{ background: "radial-gradient(circle, #6366f1 0%, transparent 70%)" }}
//       />

//       <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, margin: "-60px" }}
//           transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
//           className="max-w-2xl mb-16"
//         >
//           <span className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-[#FF7726] bg-[#FF5500]/10 border border-[#FF5500]/25 px-4 py-1.5 rounded-full">
//             <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] animate-pulse" />
//             VERIFIED OUTCOMES
//           </span>
//           <h2 className="mt-5 text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.1]">
//             Calibrated for Staff.
//             <br />
//             <span className="text-white/35">Validated by Offers.</span>
//           </h2>
//           <p className="mt-4 text-[#9E9A94] text-sm sm:text-base leading-relaxed max-w-xl">
//             Read how senior and staff candidates replaced vague study notes with automated structural grading
//             to clear top-tier distributed systems and LLD rounds.
//           </p>
//         </motion.div>

//         {/* 3-Column Testimonial Grid */}
//         <div className="grid md:grid-cols-3 gap-6">
//           {TESTIMONIALS.map((t, idx) => (
//             <motion.div
//               key={t.author}
//               initial={{ opacity: 0, y: 24 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, margin: "-40px" }}
//               transition={{ duration: 0.5, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
//               whileHover={{ y: -6, transition: { duration: 0.2 } }}
//               className="glass-card glass-card-hover rounded-3xl p-7 flex flex-col justify-between relative overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
//             >
//               {/* Subtle top ember beam */}
//               <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF5500]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

//               <div>
//                 {/* Meta Header */}
//                 <div className="flex items-center justify-between gap-2 mb-5">
//                   <span
//                     className="inline-flex items-center gap-1.5 text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full border"
//                     style={{
//                       backgroundColor: `${t.companyColor}12`,
//                       borderColor: `${t.companyColor}30`,
//                       color: t.companyColor === "#0668E1" ? "#60a5fa" : t.companyColor,
//                     }}
//                   >
//                     <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: t.companyColor }} />
//                     {t.company} · {t.level}
//                   </span>

//                   <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
//                     Verified
//                   </span>
//                 </div>

//                 {/* Quote */}
//                 <p className="text-sm text-[#D4D0CB] leading-relaxed relative z-10 italic">
//                   &ldquo;{t.quote}&rdquo;
//                 </p>
//               </div>

//               {/* Author Footer */}
//               <div className="mt-7 pt-5 border-t border-white/[0.06] flex items-center justify-between">
//                 <div className="flex items-center gap-3">
//                   <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1E1916] to-[#120F0D] border border-white/15 flex items-center justify-center font-mono font-bold text-xs text-[#FF7726] shadow-inner">
//                     {t.avatarSeed}
//                   </div>
//                   <div>
//                     <h4 className="text-xs font-bold text-white leading-tight">{t.author}</h4>
//                     <p className="text-[11px] text-white/40">{t.role}</p>
//                   </div>
//                 </div>

//                 <div className="text-right">
//                   <span className="text-[10px] font-mono text-white/30 block">Outcome</span>
//                   <span className="text-[11px] font-mono font-semibold text-[#FF7726]">{t.stats}</span>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
