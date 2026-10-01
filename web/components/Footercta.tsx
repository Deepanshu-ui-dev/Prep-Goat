"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Magnetic } from "./Magnetic";

const NAVIGATION_LINKS = [
    { label: "Problems Bank", href: "/problems" },
    { label: "Interactive Workbench", href: "/#tracks" },
    { label: "Evaluation Rubric", href: "/#evaluation" },
    { label: "Category Mastery", href: "/#mastery" },
    { label: "System Patterns", href: "/resources" },
];

const COMPANY_LINKS = [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Sign in / Register", href: "/login" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
];

const SOCIALS = [
    {
        label: "X",
        href: "https://twitter.com",
        icon: (
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        ),
    },
    {
        label: "GitHub",
        href: "https://github.com",
        icon: (
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            />
        ),
    },
];

const BrandMark = ({ size = "w-7 h-7", dot = "w-1.5 h-1.5", ring = "w-4 h-4" }) => (
    <div className={`relative ${size} rounded-full bg-[#12100E] border border-white/20 flex items-center justify-center shadow-[0_0_14px_rgba(0,0,0,0.5)]`}>
        <div className={`absolute ${ring} rounded-full border border-[#FF6600] border-r-transparent -translate-x-0.5`} />
        <div className={`absolute ${ring} rounded-full border border-[#FFAA33] border-l-transparent translate-x-0.5`} />
        <div className={`${dot} rounded-full bg-white shadow-[0_0_8px_#FFF]`} />
    </div>
);

export function FooterCTA() {
    return (
        <section className="relative px-4 sm:px-6 pt-16 pb-16 sm:pb-20 overflow-hidden">
            <div className="relative max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 28, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-10 flex flex-col lg:flex-row items-stretch rounded-2xl border border-white/[0.1] shadow-[0_30px_80px_rgba(0,0,0,0.85)] overflow-visible"
                >
                    {/* Floating brand tile — bleeds out of the card, magnetic on hover */}
                    <Magnetic>
                        <div className="hidden sm:flex absolute -top-6 right-6 sm:right-8 z-20 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1a1512] to-[#0c0a09] border border-white/15 items-center justify-center shadow-[0_16px_36px_rgba(0,0,0,0.8),0_0_32px_rgba(255,85,0,0.3)] rotate-[-6deg] hover:rotate-0 transition-transform duration-300 cursor-default">
                            <BrandMark size="w-7 h-7" dot="w-1.5 h-1.5" ring="w-4 h-4" />
                        </div>
                    </Magnetic>
                    <p className="hidden lg:block absolute -top-8 right-24 z-20 text-[11px] font-serif italic text-white/25 rotate-[-4deg] whitespace-nowrap">
                        System design, sharpened.
                    </p>

                    {/* Left panel — ember gradient brand + primary CTA */}
                    <div
                        className="relative flex flex-col lg:basis-[38%] lg:shrink-0 rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none p-6 sm:p-8 overflow-hidden"
                        style={{ background: "linear-gradient(165deg, #4a1200 0%, #A51700 45%, #FF5500 100%)" }}
                    >
                        <div
                            className="absolute inset-0 opacity-[0.07] pointer-events-none"
                            style={{
                                backgroundImage:
                                    "linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)",
                                backgroundSize: "36px 36px",
                            }}
                        />
                        <div
                            className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full pointer-events-none opacity-40 blur-[80px]"
                            style={{ background: "radial-gradient(circle, #FF8844 0%, transparent 70%)" }}
                        />

                        <Link href="/" className="relative z-10 flex items-center gap-2.5 w-fit group">
                            <BrandMark />
                            <span className="font-bold text-[15px] tracking-tight text-white">Prep-Goat.</span>
                        </Link>

                        <div className="relative z-10 mt-8 lg:mt-10">
                            <span className="inline-block text-[10px] font-mono uppercase tracking-[0.2em] text-white/80 bg-black/25 border border-white/20 px-3 py-1 rounded-full mb-3">
                                Get onsite ready
                            </span>
                            <p className="text-xl sm:text-2xl font-extrabold text-white leading-[1.2] tracking-tight">
                                Smarter interview prep, powered by structural feedback.
                            </p>
                            <p className="mt-2.5 text-sm text-white/70 leading-relaxed max-w-sm">
                                Join engineers from Google, Meta, and Stripe preparing for L5/L6 rounds with deterministic structural feedback.
                            </p>

                            <Magnetic>
                                <Link
                                    href="/problems"
                                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-white text-black hover:bg-white/90 px-5 py-2.5 text-sm font-bold tracking-tight shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
                                >
                                    Start Practicing for Free
                                    <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 stroke-current">
                                        <path d="M4 12L12 4M12 4H6M12 4V10" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </Link>
                            </Magnetic>
                            <p className="mt-2.5 text-[11px] font-mono text-white/50">No credit card · Free tier always available</p>
                        </div>

                        <div className="relative z-10 mt-8 lg:mt-auto lg:pt-8">
                            <p className="text-xs font-serif italic text-white/50">Stay in touch!</p>
                            <div className="flex items-center gap-2 mt-2.5">
                                {SOCIALS.map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="p-2.5 rounded-full bg-black/25 hover:bg-black/40 text-white/70 hover:text-white border border-white/[0.15] hover:border-white/30 transition-all duration-200"
                                        aria-label={social.label}
                                    >
                                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                            {social.icon}
                                        </svg>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right panel — two nav columns + status + newsletter, Kresna-style grid */}
                    <div className="relative flex flex-col flex-1 rounded-b-2xl lg:rounded-r-2xl lg:rounded-bl-none bg-[#0D0B0A] p-6 sm:p-8 pt-10 sm:pt-12">
                        {/*
                          NOTE: this grid previously had `self-start`, which — inside a flex-col
                          parent — overrides the default stretch and makes the grid shrink-to-fit
                          its own content instead of filling the panel's width. That's what was
                          squeezing the 1fr newsletter column down to almost nothing. Using
                          `w-full` (and dropping self-start) fixes it.
                        */}
                        <div className="grid grid-cols-2 sm:grid-cols-[auto_auto_minmax(200px,1fr)] gap-6 sm:gap-10 w-full">
                            <div>
                                <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-white/35 mb-3">Navigation</p>
                                <ul className="space-y-2 text-sm">
                                    {NAVIGATION_LINKS.map((item) => (
                                        <li key={item.label}>
                                            <Link
                                                href={item.href}
                                                className="text-white/55 hover:text-white transition-colors duration-200 inline-flex items-center gap-1.5 group"
                                            >
                                                <span className="w-0 group-hover:w-2 h-px bg-[#FF5500] transition-all duration-300" />
                                                {item.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-white/35 mb-3">Company</p>
                                <ul className="space-y-2 text-sm">
                                    {COMPANY_LINKS.map((item) => (
                                        <li key={item.label}>
                                            <Link
                                                href={item.href}
                                                className="text-white/55 hover:text-white transition-colors duration-200 inline-flex items-center gap-1.5 group"
                                            >
                                                <span className="w-0 group-hover:w-2 h-px bg-[#FF5500] transition-all duration-300" />
                                                {item.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>

                            </div>

                            {/* Newsletter — its own column on desktop; min-w-0 lets the input shrink/grow correctly */}
                            <div className="col-span-2 sm:col-span-1 sm:text-right mt-2 sm:mt-0 min-w-0">
                                <p className="text-[13px] text-white/40">System design moves fast.</p>
                                <p className="text-[15px] font-bold text-white mb-3">Stay ahead with Prep-Goat.</p>
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        const input = e.currentTarget.elements.namedItem("email") as HTMLInputElement;
                                        if (input?.value) {
                                            alert("Subscribed to weekly architecture teardowns!");
                                            input.value = "";
                                        }
                                    }}
                                    className="flex items-center gap-2 w-full sm:max-w-[280px] sm:ml-auto"
                                >
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        placeholder="engineer@company.com"
                                        className="bg-white/[0.04] border border-white/[0.1] rounded-xl px-3 py-2 text-xs text-white placeholder-white/25 focus:outline-none focus:border-[#FF5500]/60 flex-1 min-w-0 font-mono transition-colors"
                                    />
                                    <Magnetic>
                                        <button
                                            type="submit"
                                            className="btn-luminous px-4 py-2 rounded-xl text-xs font-mono font-bold text-white shrink-0 whitespace-nowrap"
                                        >
                                            Subscribe
                                        </button>
                                    </Magnetic>
                                </form>
                            </div>
                        </div>

                        {/* Bottom row: copyright, pinned to the very bottom of the panel */}
                        <div className="mt-auto pt-6 border-t border-white/[0.07] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <p className="text-[11px] font-mono text-white/25">
                                &copy; {new Date().getFullYear()} PREP-GOAT. All rights reserved.
                            </p>
                            <p className="text-[11px] font-mono text-white/20">
                                Built for engineers. Calibrated by staff interviewers.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Faint watermark wordmark — anchored to the card's own bottom edge and
                    pulled up by half its height, so the card slices it exactly in half */}
                <div
                    aria-hidden
                    className="pointer-events-none select-none absolute inset-x-0 bottom-0 translate-y-1/2 z-0 text-center overflow-hidden"
                >
                    <span className="font-extrabold tracking-tighter text-white/[0.14] text-[11vw] sm:text-[13vw] leading-none whitespace-nowrap">
                        PREP-GOAT
                    </span>
                </div>
            </div>
        </section>
    );
}