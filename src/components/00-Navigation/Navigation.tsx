"use client";

// ─── Navigation ───
// Mô tả: Thanh menu floating — logo bên trái, nav links + CTA bên phải
// Thiết kế: Glassmorphism, rounded, nổi bật trên nền tối
// Desktop: logo + menu items + CTA button
// Mobile: logo + hamburger → fullscreen overlay
// Data: import từ data/navigation.ts

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navItems, brand } from "@/data/navigation";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // ─── Detect scroll ───
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = () => setIsMenuOpen(false);

  return (
    <>
      {/* ─── Navigation Bar — floating, rounded ─── */}
      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 pt-4"
      >
        <nav
          className={`max-w-7xl mx-auto flex items-center justify-between
                      px-6 md:px-8 h-16 rounded-full transition-all duration-500 ${
            isScrolled
              ? "bg-surface/80 backdrop-blur-xl border border-border-subtle shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
              : "bg-white/5 backdrop-blur-md border border-white/10"
          }`}
        >
          {/* ─── Logo — Clash Display, italic style ─── */}
          <a href="#" className="group flex items-center">
            <span className="font-heading text-[22px] font-bold text-white italic tracking-tight
                           group-hover:text-accent transition-colors duration-300">
              {brand.name}
            </span>
            {/* Chấm đỏ accent sau logo */}
            <span className="w-1.5 h-1.5 rounded-full bg-accent ml-0.5 mb-3
                           group-hover:scale-150 transition-transform duration-300" />
          </a>

          {/* ─── Desktop Menu Items — mixed case, elegant ─── */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.2 + index * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="font-body text-[13px] text-white/60 px-4 py-2 rounded-full
                         hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                {item.label}
              </motion.a>
            ))}

            {/* CTA Button — pill shape, accent fill */}
            <motion.a
              href="#contact"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="ml-2 font-body text-[13px] font-medium text-white
                       px-5 py-2 rounded-full bg-accent/90
                       hover:bg-accent hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]
                       transition-all duration-300 flex items-center gap-2"
            >
              Get in touch
              {/* Arrow icon */}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </motion.a>
          </div>

          {/* ─── Mobile Hamburger ─── */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-full
                     hover:bg-white/10 transition-colors duration-300"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-[5px]">
              <span
                className={`block w-5 h-[1.5px] bg-white transition-all duration-300 origin-center ${
                  isMenuOpen ? "rotate-45 translate-y-[3.25px]" : ""
                }`}
              />
              <span
                className={`block w-5 h-[1.5px] bg-white transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block w-5 h-[1.5px] bg-white transition-all duration-300 origin-center ${
                  isMenuOpen ? "-rotate-45 -translate-y-[3.25px]" : ""
                }`}
              />
            </div>
          </button>
        </nav>
      </motion.header>

      {/* ─── Mobile Fullscreen Menu ─── */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-primary/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={handleNavClick}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="font-heading text-h2 font-semibold text-white
                           hover:text-accent transition-colors duration-300"
                >
                  {item.label}
                </motion.a>
              ))}

              <motion.a
                href="#contact"
                onClick={handleNavClick}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.4,
                  delay: navItems.length * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-4 font-body text-body font-medium text-white
                         px-8 py-3 rounded-full bg-accent hover:bg-accent-warm transition-colors duration-300"
              >
                Get in touch
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
