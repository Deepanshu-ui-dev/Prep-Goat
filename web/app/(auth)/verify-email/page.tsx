"use client";

import { authClient } from "@/lib/auth-client";
import { useState, useEffect } from "react";
import { Loader2, MailCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { motion } from "framer-motion";

function VerifyEmailContent() {
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [emailInput, setEmailInput] = useState(searchParams.get("email") || "");

  useEffect(() => {
    // Check if they are already verified
    authClient.getSession().then(({ data }) => {
      if (data?.user?.emailVerified) {
        router.push("/problems");
      }
    });
  }, [router]);

  const handleResend = async () => {
    setIsSending(true);
    setMessage("");
    setError("");

    if (!emailInput) {
      setError("Please enter your email address.");
      setIsSending(false);
      return;
    }

    const { error } = await authClient.sendVerificationEmail({
      email: emailInput,
      callbackURL: `${window.location.origin}/problems`,
    });

    if (error) {
      setError(error.message || "Failed to send verification email");
    } else {
      setMessage("Verification email sent! Please check your inbox.");
    }
    setIsSending(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#070606] font-sans text-white p-4 relative overflow-hidden">
      {/* Subtle ambient glow */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.08] blur-[140px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #FF5500 0%, transparent 70%)" }}
      />

      <div className="relative z-10 w-full max-w-md">
        {/* Brand Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-6 h-6 rounded-full bg-[#12100E] border border-white/20 flex items-center justify-center shadow-[0_0_12px_rgba(255,85,0,0.6)] group-hover:shadow-[0_0_20px_rgba(255,85,0,0.9)] group-hover:scale-110 transition-all duration-300">
              <div className="absolute w-3.5 h-3.5 rounded-full border border-[#FF6600] border-r-transparent -translate-x-0.5 transition-transform duration-500 group-hover:rotate-[360deg]" />
              <div className="absolute w-3.5 h-3.5 rounded-full border border-[#FFAA33] border-l-transparent translate-x-0.5 transition-transform duration-500 group-hover:-rotate-[360deg]" />
              <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#FFF]" />
            </div>
            <span className="font-bold text-[14px] tracking-tight text-white">Prep-Goat.</span>
          </Link>
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#0e0d0c]/85 border border-white/[0.10] shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(255,85,0,0.05)] backdrop-blur-2xl rounded-3xl p-8 text-center space-y-6"
        >
          <div className="w-14 h-14 bg-[#FF5500]/10 border border-[#FF5500]/25 text-[#FF7726] rounded-2xl flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(255,85,0,0.15)]">
            <MailCheck className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <span className="inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.2em] uppercase text-[#FF7726] bg-[#FF5500]/10 border border-[#FF5500]/25 px-3.5 py-1 rounded-full w-fit mx-auto">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] animate-pulse" />
              Email Verification
            </span>
            <h1 className="text-2xl font-extrabold text-white tracking-tight pt-1">
              Verify your email
            </h1>
            <p className="text-[#8E8A85] leading-relaxed text-sm max-w-sm mx-auto">
              We&apos;ve sent a verification link to your email address. Please click the link to verify your account and start practicing.
            </p>
          </div>

          {message && (
            <div className="p-3 text-sm text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 rounded-xl text-left">
              {message}
            </div>
          )}

          {error && (
            <div className="p-3 text-sm text-[#FF7726] bg-[#FF5500]/10 border border-[#FF5500]/25 rounded-xl text-left">
              {error}
            </div>
          )}

          <div className="space-y-3 pt-1">
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="Confirm your email"
              className="w-full px-4 py-2.5 bg-white/[0.04] rounded-xl border border-white/[0.10] focus:outline-none focus:border-[#FF5500]/50 focus:ring-1 focus:ring-[#FF5500]/30 transition-all text-white placeholder:text-white/20 text-sm"
            />
            <button
              onClick={handleResend}
              disabled={isSending || !emailInput}
              className="w-full btn-luminous group inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-white tracking-tight hover:scale-[1.02] active:scale-[0.97] transition-transform disabled:opacity-60 disabled:scale-100"
            >
              {isSending ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              Resend Verification Link
              {!isSending && <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />}
            </button>
          </div>

          <div className="pt-4 border-t border-white/[0.08]">
            <button
              onClick={async () => {
                await authClient.signOut();
                window.location.href = "/login";
              }}
              className="text-xs text-white/40 hover:text-white transition-colors"
            >
              Sign out and use a different account →
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#070606]">
          <Loader2 className="w-8 h-8 text-[#FF5500] animate-spin" />
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}

