"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { authClient } from "@/lib/auth-client";

const NAV_LINKS = [
  { href: "/problems", label: "Problems" },
  { href: "/#tracks", label: "Workbench", sectionId: "tracks" },
  { href: "/#evaluation", label: "Evaluation", sectionId: "evaluation" },
  { href: "/#problems-bank", label: "Problem Bank", sectionId: "problems-bank" },
  { href: "/#methodology", label: "Methodology", sectionId: "methodology" },
  { href: "/#faq", label: "FAQ", sectionId: "faq" },
];

export function Navbar({ session: initialSession }: { session?: any } = {}) {
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("");
  const rafId = useRef<number | null>(null);

  const { data: clientSession } = authClient.useSession();
  const session = initialSession !== undefined ? initialSession : clientSession;

  // Handle scroll & scrollspy
  useEffect(() => {
    const handleScroll = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);

      rafId.current = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;

        setScrolled(currentScrollY > 20);

        if (pathname === "/") {
          const sections = [
            "tracks",
            "evaluation",
            "problems-bank",
            "methodology",
            "faq",
          ];
          const scrollPos = currentScrollY + 250;
          let current = "";
          for (const id of sections) {
            const el = document.getElementById(id);
            if (el && el.offsetTop <= scrollPos) {
              current = id;
            }
          }
          setActiveSection(current);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [pathname, menuOpen]);

  // Lock body scroll on mobile drawer toggle
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Auto-close menu on path change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    sectionId?: string
  ) => {
    if (sectionId && pathname === "/") {
      e.preventDefault();
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", `/#${sectionId}`);
      }
      setMenuOpen(false);
    }
  };

  const handleSignOut = async () => {
    await authClient.signOut();
    setMenuOpen(false);
    router.refresh();
  };

  return (
    <div className="fixed top-0 inset-x-0 z-50 w-full px-4 sm:px-6 pt-4 sm:pt-5 pointer-events-none transition-all duration-300">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className={`pointer-events-auto max-w-5xl mx-auto flex items-center justify-between px-5 transition-all duration-300 rounded-full border ${scrolled
            ? "py-2 bg-[#090807]/90 border-white/[0.14] shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_24px_rgba(255,85,0,0.06)] backdrop-blur-2xl"
            : "py-2.5 bg-[#0e0d0c]/70 border-white/[0.10] shadow-[0_12px_36px_rgba(0,0,0,0.5)] backdrop-blur-xl"
          }`}
      >
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-full"
        >
          <div className="relative w-6 h-6 rounded-full bg-[#12100E] border border-white/20 flex items-center justify-center shadow-[0_0_12px_rgba(255,85,0,0.6)] group-hover:shadow-[0_0_20px_rgba(255,85,0,0.9)] group-hover:scale-110 transition-all duration-300">
            <div className="absolute w-3.5 h-3.5 rounded-full border border-[#FF6600] border-r-transparent -translate-x-0.5 transition-transform duration-500 group-hover:rotate-[360deg]" />
            <div className="absolute w-3.5 h-3.5 rounded-full border border-[#FFAA33] border-l-transparent translate-x-0.5 transition-transform duration-500 group-hover:-rotate-[360deg]" />
            <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#FFF]" />
          </div>
          <span className="font-bold text-[14px] tracking-tight text-white flex items-center gap-1.5">
            Prep-Goat.
          </span>
        </Link>

        {/* Center Nav */}
        <nav
          onMouseLeave={() => setHovered(null)}
          className="hidden md:flex items-center gap-0.5 text-[13px] font-medium text-white/55"
        >
          {NAV_LINKS.map((link) => {
            const isRouteActive = pathname === link.href;
            const isSectionActive =
              pathname === "/" &&
              link.sectionId &&
              activeSection === link.sectionId;
            const isActive = isRouteActive || isSectionActive;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href, link.sectionId)}
                onMouseEnter={() => setHovered(link.href)}
                aria-current={isActive ? "page" : undefined}
                className={`relative px-3.5 py-1.5 rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${isActive ? "text-white" : "hover:text-white/90"
                  }`}
              >
                {hovered === link.href && (
                  <motion.span
                    layoutId="nav-hover-pill"
                    className="absolute inset-0 rounded-full bg-white/[0.07] border border-white/[0.1]"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 32,
                    }}
                  />
                )}
                {isActive && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#FF5500]" />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-3">
            {!session ? (
              <>
                <Link
                  href="/login"
                  className="text-[13px] font-medium text-white/55 hover:text-white px-3 py-1.5 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-full"
                >
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  className="btn-luminous group inline-flex items-center gap-1.5 rounded-full px-4.5 py-1.5 text-[13px] font-semibold text-white tracking-tight hover:scale-[1.03] active:scale-[0.97] transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <span>Start free</span>
                  <span className="text-xs transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-3 text-[13px]">
                <Link
                  href="/profile"
                  className="font-medium text-white/75 hover:text-white transition-colors duration-200 px-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-full"
                >
                  Profile
                </Link>
                <button
                  onClick={handleSignOut}
                  className="btn-ghost text-[13px] font-medium rounded-full px-3 py-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            className="md:hidden relative w-8 h-8 flex items-center justify-center rounded-full text-white/80 hover:text-white hover:bg-white/[0.06] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <div className="relative w-4 h-3 flex flex-col justify-between">
              <motion.span
                animate={
                  menuOpen ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.25 }}
                className="block h-[1.5px] w-full bg-current origin-center"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.15 }}
                className="block h-[1.5px] w-full bg-current"
              />
              <motion.span
                animate={
                  menuOpen ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.25 }}
                className="block h-[1.5px] w-full bg-current origin-center"
              />
            </div>
          </button>
        </div>
      </motion.header>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto md:hidden max-w-5xl mx-auto mt-2 rounded-3xl border border-white/[0.1] bg-[#0b0a09]/95 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden"
          >
            <nav className="flex flex-col p-2">
              {NAV_LINKS.map((link, i) => {
                const isRouteActive = pathname === link.href;
                const isSectionActive =
                  pathname === "/" &&
                  link.sectionId &&
                  activeSection === link.sectionId;
                const isActive = isRouteActive || isSectionActive;

                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.04 }}
                  >
                    <Link
                      href={link.href}
                      onClick={(e) =>
                        handleNavClick(e, link.href, link.sectionId)
                      }
                      className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium transition-colors ${isActive
                          ? "bg-white/[0.08] text-white font-semibold"
                          : "text-white/70 hover:text-white hover:bg-white/[0.05]"
                        }`}
                    >
                      <span className="flex items-center gap-2">
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500]" />
                        )}
                        {link.label}
                      </span>
                      <span
                        className={
                          isActive ? "text-[#FF7726]" : "text-white/20"
                        }
                      >
                        →
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <div className="border-t border-white/[0.08] p-3 flex items-center gap-2.5">
              {!session ? (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="flex-1 text-center text-[13px] font-medium text-white/60 hover:text-white px-4 py-2.5 rounded-full border border-white/[0.1] hover:border-white/[0.2] transition-all duration-200"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMenuOpen(false)}
                    className="btn-luminous flex-1 text-center inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-[13px] font-semibold text-white tracking-tight"
                  >
                    Start free →
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="flex-1 text-center text-[13px] font-medium text-white/80 px-4 py-2.5 rounded-full border border-white/[0.1]"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="flex-1 text-center text-[13px] text-white/50 hover:text-white px-4 py-2.5"
                  >
                    Sign out
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}