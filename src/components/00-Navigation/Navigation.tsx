"use client";

// ─── Navigation ───
// Mô tả: Thanh menu floating — logo bên trái, nav links + CTA bên phải
// Thiết kế: Glassmorphism, rounded, nổi bật trên nền tối
// Scroll effects: nền đặc dần, logo thu nhỏ, shadow tăng, glow line chạy quanh border
// Desktop: logo + menu items + CTA button
// Mobile: logo + hamburger → fullscreen overlay
// Data: import từ data/navigation.ts

import { useState, useRef, useEffect, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { navItems, brand } from "@/data/navigation";

// Approximate nav perimeter (max-w-7xl pill shape ~1280px wide, 64px tall)
const PERIMETER = 2640;
const GLOW_SPEED = 10; // px per frame

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  // ─── Glow border animation ───
  const dashOffsetMV = useMotionValue(0);
  const dashProgressRef = useRef(0);
  const isScrollingRef = useRef(false);
  const rafRef = useRef<number | undefined>(undefined);
  const scrollStopTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const startGlow = useCallback(() => {
    if (rafRef.current) return; // already running
    const tick = () => {
      dashProgressRef.current = (dashProgressRef.current + GLOW_SPEED) % PERIMETER;
      dashOffsetMV.set(-dashProgressRef.current);
      if (isScrollingRef.current) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = undefined; // stop, hold current position
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [dashOffsetMV]);

  // ─── Track active section via IntersectionObserver ───
  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [navItems]);

  // ─── Scroll-linked animations ───
  const { scrollY } = useScroll();

  const rawBgOpacity = useTransform(scrollY, [0, 150], [0, 0.85]);
  const bgOpacity = useSpring(rawBgOpacity, { damping: 30, stiffness: 200 });

  const rawNavScale = useTransform(scrollY, [0, 100], [1, 0.98]);
  const navScale = useSpring(rawNavScale, { damping: 30, stiffness: 200 });

  const rawLogoScale = useTransform(scrollY, [0, 120], [1, 0.92]);
  const logoScale = useSpring(rawLogoScale, { damping: 25, stiffness: 180 });

  const rawShadowOpacity = useTransform(scrollY, [0, 150], [0, 0.3]);
  const smoothShadowOpacity = useSpring(rawShadowOpacity, {
    damping: 30,
    stiffness: 200,
  });
  const boxShadowValue = useTransform(
    smoothShadowOpacity,
    (v: number) => `0 4px 30px rgba(0, 0, 0, ${v})`
  );

  useMotionValueEvent(scrollY, "change", () => {
    // Trigger glow on scroll
    isScrollingRef.current = true;
    clearTimeout(scrollStopTimer.current);
    scrollStopTimer.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 200);
    startGlow();
  });

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleNavClick = () => setIsMenuOpen(false);

  return (
    <>
      {/* ─── Navigation Bar — fixed, always visible ─── */}
      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          opacity: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
          y: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
        }}
        className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 pt-4"
      >
        <motion.nav
          style={{ scale: navScale }}
          className="relative max-w-7xl mx-auto flex items-center justify-between
                     px-6 md:px-8 h-16 rounded-full will-change-transform"
        >
          {/* ─── Layer 1: Glass base ─── */}
          <div
            className="absolute inset-0 rounded-full bg-white/5 backdrop-blur-md
                       border border-white/10 pointer-events-none"
            aria-hidden="true"
          />

          {/* ─── Layer 2: Solid overlay — đậm dần khi scroll ─── */}
          <motion.div
            className="absolute inset-0 rounded-full bg-surface backdrop-blur-xl
                       border border-border-subtle pointer-events-none"
            style={{
              opacity: bgOpacity,
              boxShadow: boxShadowValue,
            }}
            aria-hidden="true"
          />

          {/* ─── Layer 3: Glow border — chạy khi scroll, dừng giữ vị trí ─── */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ overflow: "visible" }}
            aria-hidden="true"
          >
            <motion.rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              rx="32"
              fill="none"
              stroke="rgba(239, 68, 68, 0.9)"
              strokeWidth="1.5"
              style={{
                strokeDasharray: "160 9999",
                strokeDashoffset: dashOffsetMV,
                filter:
                  "drop-shadow(0 0 8px rgba(239, 68, 68, 0.9)) drop-shadow(0 0 3px rgba(239, 68, 68, 1))",
              }}
            />
          </svg>

          {/* ─── Nội dung nav ─── */}
          <div className="relative z-10 flex items-center justify-between w-full">
            {/* ─── Logo ─── */}
            <motion.a
              href="#"
              className="group flex items-center"
              style={{ scale: logoScale }}
            >
              <span
                className="font-heading text-[22px] font-bold text-white italic tracking-tight
                           group-hover:text-accent transition-colors duration-300"
              >
                {brand.name}
              </span>
              <span
                className="w-1.5 h-1.5 rounded-full bg-accent ml-0.5 mb-3
                           group-hover:scale-150 transition-transform duration-300"
              />
            </motion.a>

            {/* ─── Desktop Menu ─── */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item, index) => {
                const isActive =
                  activeSection === item.href.replace("#", "");
                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => { e.preventDefault(); scrollTo(item.href); }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.2 + index * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative font-body text-[13px] px-4 py-2 rounded-full
                             transition-all duration-300 cursor-pointer"
                    style={{
                      color: isActive ? "white" : "rgba(255,255,255,0.55)",
                      backgroundColor: isActive
                        ? "rgba(255,255,255,0.08)"
                        : "transparent",
                    }}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-dot"
                        className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </motion.a>
                );
              })}

              {/* CTA Button */}
              <motion.a
                href="#contact"
                onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="ml-2 font-body text-[13px] font-medium text-white
                         px-5 py-2 rounded-full bg-accent/90
                         hover:bg-accent hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]
                         transition-all duration-300 flex items-center gap-2"
              >
                Get in touch
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
          </div>
        </motion.nav>
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
                  onClick={(e) => { e.preventDefault(); scrollTo(item.href); handleNavClick(); }}
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
                onClick={(e) => { e.preventDefault(); scrollTo("#contact"); handleNavClick(); }}
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
