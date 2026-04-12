"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { businessStats } from "@/data/overview";
import GlowBorder from "@/components/ui/GlowBorder";

function useCountUp(target: number, isActive: boolean, duration = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) * (1 - progress);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isActive, target, duration]);

  return count;
}

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
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="flex-1 px-6 md:px-10 py-8 md:py-10 flex flex-col justify-between min-w-0"
    >
      <p
        className="font-heading font-bold leading-none text-white mb-3 tabular-nums"
        style={{ fontSize: "clamp(28px, 3.5vw, 52px)" }}
      >
        {stat.prefix}
        {count}
        {stat.suffix}
      </p>
      <p className="font-body text-[11px] text-white/30 uppercase tracking-[0.18em] leading-snug">
        {stat.label}
      </p>
    </motion.div>
  );
}

export default function ImpactNumbers() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <GlowBorder
      borderRadius="0px"
      borderWidth={1}
      glowSize={500}
      color="rgba(255,64,0,0.5)"
      className="w-full bg-primary"
    >
      <section ref={ref} id="impact" className="relative w-full">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-white/[0.05]">
            {businessStats.map((stat, i) => (
              <StatItem key={stat.label} stat={stat} index={i} isInView={isInView} />
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </section>
    </GlowBorder>
  );
}
