"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";

const COLUMN_PROFILES = [
  { height: "44%", delay: 0.1, intensity: 0.6 },
  { height: "64%", delay: 0.2, intensity: 0.8 },
  { height: "78%", delay: 0.12, intensity: 0.95 },
  { height: "54%", delay: 0.28, intensity: 0.72 },
  { height: "88%", delay: 0.05, intensity: 1.0 },
  { height: "68%", delay: 0.32, intensity: 0.85 },
  { height: "50%", delay: 0.18, intensity: 0.68 },
  { height: "72%", delay: 0.24, intensity: 0.9 },
];

const FEATURES = [
  { label: "50+ canonical system design problems" },
  { label: "Dual workbench — whiteboard & code IDE" },
  { label: "Automated L6 Staff-level evaluation" },
  { label: "Diff against gold-standard solutions" },
];

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    const { error } = await authClient.signUp.email({
      email,
      password,
      name,
      callbackURL: `${window.location.origin}/problems`,
    });
    if (error) {
      setError(error.message || "Failed to sign up");
      setIsLoading(false);
    } else {
      router.push("/problems");
      router.refresh();
    }
  };

  const handleGoogleSignup = async () => {
    setIsGoogleLoading(true);
    await authClient.signIn.social({
      provider: "google",
      callbackURL: `${window.location.origin}/problems`,
    });
  };

  return (
    <div className="min-h-screen flex bg-[#070606] font-sans text-white overflow-hidden">

      {/* ── LEFT PANEL — brand + flame bg ── */}
      <div className="hidden lg:flex w-[46%] relative flex-col overflow-hidden border-r border-white/[0.06]">

        {/* Flame columns */}
        <div aria-hidden className="absolute inset-0 grid grid-cols-8 pointer-events-none z-0">
          {COLUMN_PROFILES.map((col, i) => (
            <div key={i} className="relative h-full border-r border-white/[0.03] last:border-r-0 flex flex-col justify-end overflow-hidden">
              <motion.div
                className="w-full origin-bottom"
                style={{
                  height: col.height,
                  background: `linear-gradient(to top,
                    rgba(255,72,0,${col.intensity * 0.9}) 0%,
                    rgba(255,112,0,${col.intensity * 0.65}) 30%,
                    rgba(180,30,0,${col.intensity * 0.35}) 65%,
                    transparent 100%)`,
                }}
                animate={{ opacity: [col.intensity * 0.8, col.intensity, col.intensity * 0.8], scaleY: [1, 1.03, 1] }}
                transition={{ duration: 4.5 + (i % 3), repeat: Infinity, ease: "easeInOut", delay: col.delay }}
              />
            </div>
          ))}
        </div>

        {/* Horizon bloom */}
        <div aria-hidden className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[380px] opacity-60 blur-[90px] pointer-events-none z-0"
          style={{ background: "radial-gradient(ellipse at 50% 100%, #FF4500 0%, #C82200 40%, transparent 80%)" }} />

        {/* Bottom fade */}
        <div aria-hidden className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#070606] to-transparent z-[2] pointer-events-none" />

        {/* Top vignette */}
        <div aria-hidden className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#070606]/80 to-transparent z-[2] pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full p-10">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0 w-fit">
            <div className="relative w-6 h-6 rounded-full bg-[#12100E] border border-white/20 flex items-center justify-center shadow-[0_0_12px_rgba(255,85,0,0.6)] group-hover:shadow-[0_0_20px_rgba(255,85,0,0.9)] group-hover:scale-110 transition-all duration-300">
              <div className="absolute w-3.5 h-3.5 rounded-full border border-[#FF6600] border-r-transparent -translate-x-0.5 transition-transform duration-500 group-hover:rotate-[360deg]" />
              <div className="absolute w-3.5 h-3.5 rounded-full border border-[#FFAA33] border-l-transparent translate-x-0.5 transition-transform duration-500 group-hover:-rotate-[360deg]" />
              <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#FFF]" />
            </div>
            <span className="font-bold text-[14px] tracking-tight text-white">Prep-Goat.</span>
          </Link>

          {/* Tagline block */}
          <div className="flex-1 flex flex-col justify-center max-w-sm">
            <span className="inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.2em] uppercase text-[#FF7726] bg-[#FF5500]/10 border border-[#FF5500]/25 px-3.5 py-1 rounded-full w-fit mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] animate-pulse" />
              Get early access
            </span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight leading-[1.15] line-clamp-2 mb-4">
              Start your journey. <span className="text-white/35">Build like Staff.</span>
            </h2>
            <p className="text-[#8E8A85] text-sm leading-relaxed mb-8">
              Create a free account to track your progress, save your design attempts, and receive personalized L6-calibrated evaluations.
            </p>

            <div className="flex flex-col gap-3 border-t border-white/[0.07] pt-7">
              {FEATURES.map((f, i) => (
                <div key={i} className="flex items-center gap-2.5 text-white/60 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] shrink-0" />
                  {f.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL — form ── */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 relative">

        {/* Subtle ambient glow */}
        <div aria-hidden className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-[0.06] blur-[120px] pointer-events-none"
          style={{ background: "radial-gradient(circle, #FF5500 0%, transparent 70%)" }} />

        <div className="relative z-10 w-full max-w-sm">

          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center mb-10">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative w-6 h-6 rounded-full bg-[#12100E] border border-white/20 flex items-center justify-center shadow-[0_0_12px_rgba(255,85,0,0.6)]">
                <div className="absolute w-3.5 h-3.5 rounded-full border border-[#FF6600] border-r-transparent -translate-x-0.5" />
                <div className="absolute w-3.5 h-3.5 rounded-full border border-[#FFAA33] border-l-transparent translate-x-0.5" />
                <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#FFF]" />
              </div>
              <span className="font-bold text-[14px] tracking-tight text-white">Prep-Goat.</span>
            </Link>
          </div>

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
            <h1 className="text-2xl font-extrabold text-white tracking-tight mb-1.5">Create your free account</h1>
            <p className="text-[#8E8A85] text-sm">Already have an account?{" "}
              <Link href="/login" className="text-[#FF7726] hover:text-[#FF5500] font-medium transition-colors">Sign in →</Link>
            </p>
          </motion.div>

          {/* Google button */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 }}>
            <button
              onClick={handleGoogleSignup}
              disabled={isLoading || isGoogleLoading}
              className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-full bg-white/[0.06] hover:bg-white/[0.10] border border-white/[0.12] hover:border-white/[0.22] text-white text-sm font-medium transition-all duration-200 disabled:opacity-50 mb-5"
            >
              {isGoogleLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
              )}
              Continue with Google
            </button>
          </motion.div>

          {/* Divider */}
          <div className="relative flex items-center mb-5">
            <div className="flex-grow border-t border-white/[0.08]" />
            <span className="flex-shrink-0 mx-4 text-[#5A5652] text-xs font-mono">or</span>
            <div className="flex-grow border-t border-white/[0.08]" />
          </div>

          {/* Form */}
          <motion.form
            onSubmit={handleSignup}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            {error && (
              <div className="p-3 text-sm text-[#FF7726] bg-[#FF5500]/10 border border-[#FF5500]/25 rounded-xl">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-white/50 tracking-wide uppercase">Full name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 bg-white/[0.04] rounded-xl border border-white/[0.10] focus:outline-none focus:border-[#FF5500]/50 focus:ring-1 focus:ring-[#FF5500]/30 transition-all text-white placeholder:text-white/20 text-sm"
                placeholder="Jane Doe"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-white/50 tracking-wide uppercase">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-white/[0.04] rounded-xl border border-white/[0.10] focus:outline-none focus:border-[#FF5500]/50 focus:ring-1 focus:ring-[#FF5500]/30 transition-all text-white placeholder:text-white/20 text-sm"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-white/50 tracking-wide uppercase">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 bg-white/[0.04] rounded-xl border border-white/[0.10] focus:outline-none focus:border-[#FF5500]/50 focus:ring-1 focus:ring-[#FF5500]/30 transition-all text-white placeholder:text-white/20 text-sm"
                placeholder="min. 8 characters"
                required
                minLength={8}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || isGoogleLoading}
              className="w-full mt-2 btn-luminous group inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-white tracking-tight hover:scale-[1.02] active:scale-[0.97] transition-transform disabled:opacity-60 disabled:scale-100"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              Create Account
              {!isLoading && <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />}
            </button>

            <p className="text-center text-[11px] text-white/25 leading-relaxed pt-1">
              By creating an account you agree to our{" "}
              <span className="text-white/40">Terms of Service</span> and{" "}
              <span className="text-white/40">Privacy Policy</span>.
            </p>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
