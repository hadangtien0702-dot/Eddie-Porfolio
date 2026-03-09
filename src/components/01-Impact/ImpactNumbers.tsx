"use client";

// ─── Impact Numbers Section ───
// Mô tả: Strip full-width ngay dưới hero — 4 con số business nổi bật
// Count-up animation khi scroll vào + accent glow
// Data: import từ data/overview.ts (businessStats)

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { businessStats } from "@/data/overview";

// ─── Count-up hook ───
function useCountUp(target: number, isActive: boolean, duration = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    let start = 0;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      const current = Math.floor(eased * target);
      setCount(current);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
    return () => { start = target; };
  }, [isActive, target, duration]);

  return count;
}

// ─── Single stat with count-up ───
function StatItem({
  stat,
  index,
  isInView,
}: {
  stat: (typeof businessStats)[0];
  index: number;
  isInView: boolean;
}) {
  const count = useCountUp(stat.countValue, isInView, 2200);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: 0.15 + index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative flex flex-col items-center text-center py-8 md:py-10"
    >
      {/* Accent glow — behind number */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    w-24 h-24 bg-accent/10 rounded-full blur-[40px]
                    group-hover:bg-accent/20 group-hover:w-32 group-hover:h-32
                    transition-all duration-700" />

      {/* Number — huge, accent color */}
      <p className="relative font-heading text-stat font-bold leading-none mb-3
                  group-hover:scale-105 transition-transform duration-500"
        style={{
          background: "linear-gradient(180deg, #ffffff, #ef4444)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {stat.prefix}{count}{stat.suffix}
      </p>

      {/* Label */}
      <p className="relative font-body text-[13px] md:text-[14px] text-white/40 uppercase tracking-[0.12em]">
        {stat.label}
      </p>
    </motion.div>
  );
}

// ─── Main Section ───
export default function ImpactNumbers() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      id="impact"
      className="relative w-full py-6 md:py-10 overflow-hidden bg-primary
               border-y border-white/[0.04]"
    >
      {/* Subtle accent line top */}
      <div className="absolute top-0 left-0 right-0 h-[1px]
                    bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0
                      divide-x divide-white/[0.04]">
          {businessStats.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} index={i} isInView={isInView} />
          ))}
        </div>
      </div>

      {/* Subtle accent line bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px]
                    bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
    </section>
  );
}
