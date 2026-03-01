"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Terminal, ArrowUpRight } from "lucide-react";
import Magnetic from "@/components/common/Magnetic";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Work", href: "/work" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
  ];

  return (
    <>
      {/* Main Header Bar — always on top */}
      <header
        className={`fixed top-0 w-full transition-all duration-700 backdrop-blur-xl ${scrolled
            ? "bg-[#020203]/90 py-3 border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "py-4 sm:py-6 bg-transparent border-b border-transparent"
          }`}
        style={{ zIndex: 70 }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <Magnetic>
            <Link
              href="/"
              className="flex items-center gap-2.5 text-xl font-bold group interactive"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#00F2FF] flex items-center justify-center transition-all group-hover:rotate-12 group-hover:scale-110 duration-500 shadow-[0_0_20px_rgba(0,242,255,0.4)]">
                <Terminal className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
              </div>
              <span className="mono text-lg sm:text-xl tracking-tighter group-hover:text-[#00F2FF] transition-colors">
                NOCTRA
                <span className="text-[#00F2FF] font-black">.TECH</span>
              </span>
            </Link>
          </Magnetic>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                prefetch={true}
                className={`text-xs mono uppercase tracking-[0.2em] font-bold transition-all relative group px-2 py-1 interactive hover:scale-105 ${pathname === item.href
                    ? "text-[#00F2FF]"
                    : "text-[#F8FAFC]/50 hover:text-[#F8FAFC]"
                  }`}
              >
                <span className="relative z-10">{item.name}</span>
                <span
                  className={`absolute -bottom-1 left-0 h-[1px] bg-[#00F2FF] transition-all group-hover:w-full ${pathname === item.href ? "w-full" : "w-0"
                    }`}
                />
              </Link>
            ))}
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 active:scale-95 transition-transform"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-5 h-5 text-[#00F2FF]" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-5 h-5 text-[#F8FAFC]" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay — separate from header, full screen */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 md:hidden"
            style={{ zIndex: 60 }}
          >
            {/* Full-screen background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#020203]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 80%, rgba(0, 242, 255, 0.06) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.04) 0%, transparent 50%)",
              }}
            />

            {/* Subtle scan line effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00F2FF]/20 to-transparent"
                initial={{ top: "-1px" }}
                animate={{ top: "100%" }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
            </div>

            {/* Menu Content */}
            <div className="relative h-full flex flex-col px-6 pt-24 pb-8">
              {/* Navigation Links */}
              <nav className="flex-1 flex flex-col justify-center -mt-10">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{
                      delay: 0.1 + i * 0.08,
                      duration: 0.4,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="border-b border-white/[0.06] last:border-b-0"
                  >
                    <Link
                      href={item.href}
                      prefetch={true}
                      className={`group flex items-center justify-between py-5 transition-colors ${pathname === item.href
                          ? "text-[#00F2FF]"
                          : "text-[#F8FAFC] active:text-[#00F2FF]"
                        }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="flex items-center gap-4">
                        {/* Active indicator dot */}
                        <span
                          className={`w-1.5 h-1.5 rounded-full transition-all ${pathname === item.href
                              ? "bg-[#00F2FF] shadow-[0_0_8px_rgba(0,242,255,0.6)]"
                              : "bg-white/10"
                            }`}
                        />
                        <span className="text-3xl font-bold tracking-tight">
                          {item.name}
                        </span>
                      </div>
                      <ArrowUpRight
                        className={`w-5 h-5 transition-all ${pathname === item.href
                            ? "text-[#00F2FF] opacity-100"
                            : "text-white/20 group-active:text-[#00F2FF] group-active:opacity-100"
                          }`}
                      />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Bottom Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="space-y-5"
              >
                {/* CTA */}
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-gradient-to-r from-[#00F2FF] to-[#8B5CF6] text-black font-bold text-sm mono uppercase tracking-wider active:scale-[0.98] transition-transform"
                >
                  Get In Touch
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                {/* Info line */}
                <div className="flex items-center justify-between text-[11px] mono text-white/25 tracking-wider uppercase">
                  <span>© 2026 Noctra.Tech</span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    System Online
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
