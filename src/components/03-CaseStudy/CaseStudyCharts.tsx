"use client";

// ─── Interactive Charts cho Case Study ───
// Mô tả: Các chart component tương tác cho từng section
// Dùng Framer Motion + CSS thuần — KHÔNG cần thư viện chart ngoài
// 1. ContextCard — interactive dashboard showing starting revenue
// 2. FunnelChart — visualization funnel marketing
// 3. WorkflowDiagram — 4 modules hệ thống
// 4. RevenueChart — biểu đồ tăng trưởng doanh thu
// 5. SocialBars — thanh bar TikTok/YouTube views

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";

// ─── Reusable Physics-based 3D Premium Card ───
export interface PremiumHoverCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  accentColor?: string;
  disableTilt?: boolean;
  initial?: React.ComponentProps<typeof motion.div>["initial"];
  animate?: React.ComponentProps<typeof motion.div>["animate"];
  transition?: React.ComponentProps<typeof motion.div>["transition"];
}
export function PremiumHoverCard({
  children, className = "", style, accentColor = "rgba(255,255,255,0.1)", disableTilt = false, initial, animate, transition
}: PremiumHoverCardProps) {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [4, -4]), { damping: 40, stiffness: 200 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-4, 4]), { damping: 40, stiffness: 200 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    mouseX.set(x / rect.width);
    mouseY.set(y / rect.height);
    
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  }
  function handleMouseLeave() {
    mouseX.set(0.5); mouseY.set(0.5);
  }

  return (
    <motion.div
      initial={initial} animate={animate} transition={transition}
      onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      style={{
        rotateX: disableTilt ? 0 : rotateX, rotateY: disableTilt ? 0 : rotateY,
        transformPerspective: 1200, ...style,
      }}
      className={`relative group overflow-hidden bg-white/[0.015] backdrop-blur-md rounded-[20px] isolate ${className}`}
    >
      {/* 1. Flashlight Border Effect */}
      <div className="absolute inset-0 z-0 pointer-events-none rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${accentColor}, transparent 40%)` }} />
      <div className="absolute inset-[1px] bg-[#0A0A0A]/95 backdrop-blur-3xl z-0 rounded-[inherit] pointer-events-none" />
      {/* 2. Inner Reflective Glass Sheen */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 mix-blend-overlay transition-opacity duration-700"
        style={{ background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06), transparent 40%)` }} />

      <div className="relative z-20 h-full w-full">
        {children}
      </div>
    </motion.div>
  );
}

// ─── Animated Counter Hook ───
export function useAnimatedCounter(target: number, isInView: boolean, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, target, duration]);

  return count;
}

// ─── 1A. ContextProfileCard — Creative Portfolio Cards + Text Carousel ───
export function ContextProfileCard({ color }: { color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [activeSlide, setActiveSlide] = useState(0);

  const companyCards = [
    {
      label: "Industry",
      value: "Insurance",
      emoji: "🛡️",
      gradientFrom: "#1a1a2e",
      gradientTo: "#16213e",
      accentGlow: "#4a6fa540",
    },
    {
      label: "Role",
      value: "Video Editor → Media Lead",
      emoji: "🎬",
      gradientFrom: "#1a1a1a",
      gradientTo: "#2d1810",
      accentGlow: `${color}35`,
    },
    {
      label: "Duration",
      value: "2022 – Present (3+ yrs)",
      emoji: "⏳",
      gradientFrom: "#1a1a1a",
      gradientTo: "#1a2010",
      accentGlow: "#8ba55535",
    },
  ];

  const carouselItems = [
    "ThinkSmart Insurance had strong sales capacity, but marketing lacked a unified acquisition system. Video was used as content — not as a structured revenue driver.",
    "Strong sales but marketing lacked a proactive customer acquisition system.",
    "Video was only used as content — not as a revenue-driving tool.",
    "No optimized production workflow — each video was a standalone project.",
  ];

  const issueColors = ["transparent", "#f59e0b", "#ef4444", "#6b7280"];

  // Auto-slide carousel
  useEffect(() => {
    if (!isInView) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % carouselItems.length);
    }, 4500);
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  return (
    <div ref={ref} id="chart-context-profile" className="w-full">
      {/* ─── 3 Creative Cards ─── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-3 gap-3 md:gap-5 mb-6"
      >
        {companyCards.map((card, i) => (
          <PremiumHoverCard
            key={card.label}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.08 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            accentColor={card.accentGlow.replace("35", "90")}
            className="flex flex-col cursor-default"
            style={{
              border: "1px solid rgba(255,255,255,0.02)",
            }}
          >
            {/* Card label — top */}
            <div className="flex items-center justify-between px-4 pt-3.5 pb-1.5">
              <span className="font-body text-[11px] md:text-[12px] text-white/45 font-medium">
                {card.label}
              </span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="group-hover:stroke-white/80 transition-colors duration-300"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>

            {/* Image placeholder — warm gradient with emoji */}
            <div className="relative mx-3 mb-3 rounded-[14px] overflow-hidden aspect-[4/3]">
              {/* Warm gradient background */}
              <motion.div
                className="absolute inset-0"
                animate={isInView ? { opacity: [0, 1] } : {}}
                transition={{ duration: 1, delay: 0.2 + i * 0.12 }}
                style={{
                  background: `
                    linear-gradient(145deg, ${card.gradientFrom} 0%, ${card.gradientTo} 100%)
                  `,
                }}
              />

              {/* Soft accent glow */}
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(circle at 50% 60%, ${card.accentGlow}, transparent 70%)`,
                }}
              />

              {/* Film grain texture */}
              <div
                className="absolute inset-0 opacity-[0.15] mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
                }}
              />

              {/* Center emoji — large, soft */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.span
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.35 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="text-[36px] md:text-[44px] select-none
                           group-hover:scale-[1.15] transition-transform duration-500
                           drop-shadow-lg"
                  style={{ filter: "saturate(0.85)" }}
                >
                  {card.emoji}
                </motion.span>
              </div>

              {/* Soft inner shadow — top + bottom */}
              <div className="absolute inset-0 pointer-events-none rounded-[14px]"
                style={{
                  boxShadow: "inset 0 2px 20px rgba(0,0,0,0.3), inset 0 -4px 16px rgba(0,0,0,0.2)",
                }}
              />
            </div>

            {/* Card value — bottom */}
            <div className="px-4 pb-3.5 pt-0.5">
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.45 + i * 0.1 }}
                className="font-heading text-[12px] md:text-[13px] font-semibold text-white/75 leading-snug"
              >
                {card.value}
              </motion.p>
            </div>
          </PremiumHoverCard>
        ))}
      </motion.div>

      {/* ─── Text Carousel — sliding body text + issues ─── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative p-5 md:p-7 rounded-[18px] overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Subtle top glow */}
        <div
          className="absolute top-0 left-0 right-0 h-[1px]"
          style={{ background: `linear-gradient(90deg, transparent 10%, ${color}30, transparent 90%)` }}
        />

        {/* Label */}
        <div className="flex items-center gap-2 mb-4">
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
          <span className="font-body text-[11px] text-white/30 uppercase tracking-[0.15em]">
            Situation before I started
          </span>
        </div>

        {/* Carousel content */}
        <div className="relative min-h-[56px] md:min-h-[44px]">
          <AnimatePresence mode="wait">
            <motion.p
              key={activeSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="font-body text-[14px] md:text-[16px] leading-[1.75] text-white/50"
            >
              {activeSlide > 0 && (
                <span
                  className="inline-block w-[6px] h-[6px] rounded-full mr-2.5 relative -top-[1px]"
                  style={{ backgroundColor: issueColors[activeSlide] }}
                />
              )}
              {carouselItems[activeSlide]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Progress dots */}
        <div className="flex items-center gap-1.5 mt-5">
          {carouselItems.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveSlide(i)}
              className="h-[5px] rounded-full transition-all duration-500 cursor-pointer"
              style={{
                width: activeSlide === i ? 28 : 5,
                backgroundColor: activeSlide === i ? color : "rgba(255,255,255,0.10)",
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// ─── 1. ContextCard — Interactive Dashboard Starting Point (Premium Bento Redesign) ───
export function ContextCard({ color }: { color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const revenueCount = useAnimatedCounter(2000000, isInView, 2500);
  const cpaCount = useAnimatedCounter(180, isInView, 1800);

  const formatRevenue = (n: number) => "$" + n.toLocaleString("en-US");

  return (
    <div ref={ref} id="chart-context" className="w-full relative py-4">
      {/* Dynamic Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5">
        
        {/* ─── CARD 1: THE CRISIS (Spans 2 columns) ─── */}
        <PremiumHoverCard
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          accentColor={`${color}30`}
          className="lg:col-span-2 flex flex-col justify-between !rounded-3xl"
          style={{ borderColor: "rgba(255,255,255,0.06)", border: "1px solid" }}
        >

          {/* Abstract Ambient Glow */}
          <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-[#ef4444]/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/[0.02] rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 p-6 md:p-10 h-full flex flex-col justify-between min-h-[300px] md:min-h-[380px]">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#ef4444" }} />
                <span className="font-body text-[12px] text-[#ef4444] uppercase tracking-[0.2em] font-semibold flex items-center gap-2">
                   The Challenge
                </span>
              </div>
              <div className="px-4 py-1.5 rounded-full border border-white/5 bg-white/[0.03] font-body text-[11px] text-white/40 uppercase tracking-widest backdrop-blur-sm">
                June 2022
              </div>
            </div>

            {/* Content Flex */}
            <div className="flex flex-col gap-8 mt-4">
              {/* Frozen Revenue Box */}
              <div>
                <p className="font-body text-[12px] text-white/40 uppercase tracking-[0.1em] mb-1">Annual Revenue Stagnated</p>
                <div className="relative inline-block">
                  <h3 className="font-heading font-bold leading-none tracking-[-0.03em] text-[clamp(42px,6vw,72px)] text-white/90">
                    {formatRevenue(revenueCount)}
                  </h3>
                  {/* Subtle texture overlay */}
                  <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/diagonal-striped-brick.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
                </div>
              </div>

              {/* Skyrocketing CPA Arrow & Chart */}
              <div className="relative w-full border-t border-white/10 pt-6 flex flex-col">
                <p className="font-body text-[12px] text-[#ef4444]/60 uppercase tracking-[0.1em] mb-4">
                  While Acquisition Costs Surged
                </p>
                <div className="flex flex-col sm:flex-row sm:items-end gap-6">
                  {/* Fake Line Chart SVG */}
                  <div className="relative flex-1 h-[60px] w-full min-w-[150px]">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 200 60" preserveAspectRatio="none">
                      <motion.path
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                        transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                        d="M0,50 Q40,45 80,30 T150,15 T200,5"
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth="3"
                        strokeLinecap="round"
                        className="drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col items-start sm:items-end flex-shrink-0">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={isInView ? { scale: 1, opacity: 1 } : {}}
                      transition={{ duration: 0.6, delay: 1 }}
                      className="inline-flex flex-col items-start sm:items-end"
                    >
                      <span className="font-heading text-[42px] md:text-[56px] font-bold text-[#ef4444] leading-none mb-1 shadow-[#ef4444]/20 drop-shadow-lg pt-2 sm:pt-0">
                        ${cpaCount}
                      </span>
                      <span className="font-body text-[10px] text-white/40 uppercase tracking-widest pl-1 sm:pl-0">
                        Target: $67
                      </span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Gradient border bottom accent */}
            <div className="absolute bottom-0 left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-[#ef4444]/40 to-transparent opacity-50" />
          </div>
        </PremiumHoverCard>

        {/* ─── COLUMN RIGHT: The Funnel & Strategy ─── */}
        <div className="lg:col-span-1 flex flex-col gap-4 md:gap-5">
          
          {/* Card 2: Functional Leaks */}
          <PremiumHoverCard
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            accentColor={`${color}30`}
            className="flex-1 p-6 h-full min-h-[180px] flex flex-col justify-between !rounded-3xl"
            style={{ borderColor: "rgba(255,255,255,0.06)", border: "1px solid" }}
          >
            {/* Visual background abstraction */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 select-none pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-700">
               <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white/50">
                 <path d="M3 3h18l-6 8v8l-6-4v-4L3 3z" strokeDasharray="3 3"/>
               </svg>
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-1">
                 <span className="text-[14px]">⊘</span>
                 <p className="font-body text-[11px] text-white/40 uppercase tracking-widest">System Architecture</p>
              </div>
              <h4 className="font-heading text-[24px] font-bold text-white/90">0% Funnel</h4>
            </div>
            
            <p className="font-body text-[13px] text-white/50 leading-relaxed mt-4">
              Marketing operated without a conversion bridge. Video generated views, but <strong className="text-white/80">no system</strong> existed to capture leads or attribute sales.
            </p>
          </PremiumHoverCard>

          {/* Card 3: Chaotic Video Strategy */}
          <PremiumHoverCard
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            accentColor={`${color}30`}
            className="flex-1 p-6 h-full min-h-[180px] flex flex-col justify-between !rounded-3xl"
            style={{ borderColor: "rgba(255,255,255,0.06)", border: "1px solid" }}
          >
            <div className="absolute right-0 bottom-0 opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none flex flex-col gap-1 p-4">
               {[
                 { i: 1, delay: 2.4, width: 35 },
                 { i: 2, delay: 1.8, width: 48 },
                 { i: 3, delay: 3.2, width: 24 },
                 { i: 4, delay: 1.1, width: 52 },
                 { i: 5, delay: 2.9, width: 30 }
               ].map(({ i, delay, width }) => (
                 <motion.div key={i} 
                   animate={{ x: [0, (i%2===0 ? -5 : 5), 0] }}
                   transition={{ duration: 0.2, repeat: Infinity, repeatDelay: delay }}
                   className="h-[2px] bg-white rounded-full"
                   style={{ width: `${width}px` }} 
                 />
               ))}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                 <span className="text-[14px]">◇</span>
                 <p className="font-body text-[11px] text-white/40 uppercase tracking-widest">Creative Approach</p>
              </div>
              <h4 className="font-heading text-[24px] font-bold text-white/90">Ad-hoc Video</h4>
            </div>
            
            <p className="font-body text-[13px] text-white/50 leading-relaxed mt-4">
              Content was produced blindly. <strong className="text-white/80 border-b border-white/20">No scripting</strong>, <strong className="text-white/80 border-b border-white/20 border-dashed">no hook A/B testing</strong>, <strong className="text-white/80 border-b border-white/20 border-dotted">no iteration</strong> based on ad performance data.
            </p>
          </PremiumHoverCard>

        </div>
      </div>
      
      {/* ─── Bottom Quote Strip ─── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mt-4 p-5 md:px-8 rounded-2xl border flex items-center gap-6"
        style={{ 
          borderColor: `${color}20`,
          background: `linear-gradient(90deg, ${color}05, transparent)`
        }}
      >
        <span className="font-heading text-[48px] text-white/10 leading-[0] pt-4 select-none">&ldquo;</span>
        <p className="font-body text-[14px] text-white/60 italic leading-relaxed">
          That was the reality when I joined as an Editor and Media Leader<span className="opacity-40"> — a team with immense potential, restricted by an incomplete architecture.</span>
        </p>
      </motion.div>

    </div>
  );
}

// ─── 2. FunnelChart — Funnel marketing bị đứt ───
export function FunnelChart({ color }: { color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const stages = [
    { label: "Awareness", width: "100%", issue: "Leaks" },
    { label: "Engagement", width: "70%", issue: "Disconnected" },
    { label: "Consideration", width: "45%", issue: "No strategy" },
    { label: "Conversion", width: "15%", issue: "Low" },
  ];

  return (
    <div ref={ref} id="chart-funnel" className="w-full max-w-2xl mx-auto">
      <div className="space-y-3">
        {stages.map((stage, i) => (
          <motion.div
            key={stage.label}
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="flex items-center gap-4">
              {/* Label */}
              <span className="font-body text-caption text-text-secondary w-28 text-right flex-shrink-0">
                {stage.label}
              </span>

              {/* Bar */}
              <div className="flex-1 relative">
                <div className="h-12 rounded-lg bg-white/[0.03] border border-white/[0.06] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: stage.width } : {}}
                    transition={{
                      duration: 1.2,
                      delay: 0.3 + 0.2 * i,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="h-full rounded-lg relative overflow-hidden"
                    style={{
                      background: `linear-gradient(90deg, ${color}${i === 3 ? "30" : "60"}, ${color}${i === 3 ? "10" : "25"})`,
                    }}
                  >
                    {/* Broken crack effect for last stages */}
                    {i >= 2 && (
                      <div className="absolute right-0 top-0 bottom-0 w-8
                                    bg-gradient-to-l from-[#0A0A0A] to-transparent" />
                    )}
                  </motion.div>
                </div>
              </div>

              {/* Issue tag */}
              <motion.span
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.8 + 0.15 * i }}
                className="font-body text-caption text-accent/80 w-24 flex-shrink-0"
              >
                ⚠ {stage.issue}
              </motion.span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Drop-off indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="mt-6 text-center"
      >
        <span className="font-body text-caption text-accent/60">
          85% drop-off rate — no system to capture and convert
        </span>
      </motion.div>
    </div>
  );
}

// ─── 2b. CPAChallengeChart — CPA giảm ↔ Doanh số tăng ───
// Dùng div-based bar chart để tránh lỗi méo SVG
export function CPAChallengeChart({ color }: { color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const data = [
    { period: "Q2 2022", cpa: 120, revenue: 2.0, label: "Starting point" },
    { period: "Q4 2022", cpa: 105, revenue: 3.2, label: "System begins" },
    { period: "Q2 2023", cpa: 85, revenue: 4.5, label: "Creative optimization" },
    { period: "Q4 2023", cpa: 72, revenue: 5.39, label: "System running" },
    { period: "2024", cpa: 67, revenue: 6.09, label: "Present" },
  ];

  const maxCpa = 140;
  const maxRev = 7;

  return (
    <div ref={ref} id="chart-cpa-challenge" className="w-full">
      {/* Tiêu đề + Legend */}
      <div id="chart-cpa-header" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <p className="font-heading text-body font-semibold text-white/60 uppercase tracking-wider mb-1">
            CPA vs Revenue
          </p>
          <p className="font-body text-[13px] text-white/35">
            Inverse relationship: CPA decreases → Revenue increases
          </p>
        </div>
        <div id="chart-cpa-legend" className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <span className="w-3 h-[3px] rounded-full" style={{ backgroundColor: "#ef4444" }} />
            <span className="font-body text-[12px] text-white/40">CPA ($)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-[3px] rounded-full" style={{ backgroundColor: color }} />
            <span className="font-body text-[12px] text-white/40">Revenue ($M)</span>
          </div>
        </div>
      </div>

      {/* Bar Chart — div-based */}
      <div id="chart-cpa-bars" className="relative p-4 md:p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
        {/* Chart area */}
        <div className="flex items-end justify-around gap-3 md:gap-6" style={{ height: 240 }}>
          {data.map((d, i) => {
            const cpaPercent = (d.cpa / maxCpa) * 100;
            const revPercent = (d.revenue / maxRev) * 100;
            const isHovered = hoveredIndex === i;
            const isLast = i === data.length - 1;

            return (
              <motion.div
                key={d.period}
                id={`chart-cpa-bar-group-${i}`}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1 flex flex-col items-center gap-3 cursor-pointer relative"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Hover tooltip trên bar */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.15 }}
                      className="absolute -top-16 left-1/2 -translate-x-1/2 z-20
                               px-3 py-2 rounded-lg bg-elevated border border-white/10
                               whitespace-nowrap pointer-events-none"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-heading text-[14px] font-bold text-red-400">${d.cpa}</span>
                        <span className="w-[1px] h-4 bg-white/10" />
                        <span className="font-heading text-[14px] font-bold" style={{ color }}>${d.revenue}M</span>
                      </div>
                      <p className="font-body text-[10px] text-white/40 text-center mt-1">{d.label}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Dual bars */}
                <div className="flex items-end gap-1.5 w-full" style={{ height: 180 }}>
                  {/* CPA bar — đỏ, giảm dần */}
                  <div className="flex-1 h-full relative flex items-end justify-center">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={isInView ? { height: `${cpaPercent}%` } : {}}
                      transition={{ duration: 1, delay: 0.3 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                      className="w-full rounded-t-md relative overflow-hidden transition-all duration-300"
                      style={{
                        background: isHovered
                          ? "linear-gradient(180deg, #ef4444, #ef444440)"
                          : "linear-gradient(180deg, #ef444480, #ef444420)",
                        boxShadow: isHovered ? "0 0 20px rgba(239,68,68,0.2)" : "none",
                      }}
                    >
                      {/* Glow top */}
                      {isHovered && (
                        <div className="absolute top-0 left-0 right-0 h-1 blur-sm" style={{ backgroundColor: "#ef4444" }} />
                      )}
                    </motion.div>
                  </div>

                  {/* Revenue bar — accent, tăng dần */}
                  <div className="flex-1 h-full relative flex items-end justify-center">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={isInView ? { height: `${revPercent}%` } : {}}
                      transition={{ duration: 1, delay: 0.5 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                      className="w-full rounded-t-md relative overflow-hidden transition-all duration-300"
                      style={{
                        background: isHovered
                          ? `linear-gradient(180deg, ${color}, ${color}40)`
                          : `linear-gradient(180deg, ${color}80, ${color}20)`,
                        boxShadow: isHovered ? `0 0 20px ${color}30` : "none",
                      }}
                    >
                      {/* Glow top */}
                      {isHovered && (
                        <div className="absolute top-0 left-0 right-0 h-1 blur-sm" style={{ backgroundColor: color }} />
                      )}
                    </motion.div>
                  </div>
                </div>

                {/* Period label */}
                <span
                  className="font-body text-[11px] uppercase tracking-wider font-medium transition-colors duration-200"
                  style={{ color: isHovered || isLast ? color : "rgba(255,255,255,0.35)" }}
                >
                  {d.period}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Kết quả tổng kết */}
      <div id="chart-cpa-summary" className="mt-6 grid grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center"
        >
          <span className="font-body text-[11px] text-red-400/60 uppercase tracking-wider block mb-2">
            CPA Reduction
          </span>
          <span className="font-heading text-[clamp(28px,4vw,40px)] font-bold text-red-400 block leading-none">
            -44%
          </span>
          <span className="font-body text-[12px] text-white/30 mt-1 block">
            $120 → $67
          </span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center"
        >
          <span
            className="font-body text-[11px] uppercase tracking-wider block mb-2"
            style={{ color: `${color}60` }}
          >
            Revenue Growth
          </span>
          <span
            className="font-heading text-[clamp(28px,4vw,40px)] font-bold block leading-none"
            style={{ color }}
          >
            +204%
          </span>
          <span className="font-body text-[12px] text-white/30 mt-1 block">
            $2M → $6.09M
          </span>
        </motion.div>
      </div>
    </div>
  );
}

// ─── 3. SystemDashboard — Borderless Freeform Canvas ───
export function SystemDashboard({ color }: { color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y3 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const yTransforms = [y1, y2, y3];

  const steps = [
    {
      id: "media",
      icon: "👥",
      title: "Media Team",
      desc: "Assigned by category and video type to act as a unified machine.",
      image: "/images/casestudy/thinksmart/team.jpg",
    },
    {
      id: "hook",
      icon: "⚡",
      title: "Hook Strategy",
      desc: "A/B testing first 3–5 seconds to secure initial retention.",
    },
    {
      id: "ads",
      icon: "🎯",
      title: "Ad Optimization",
      desc: "Shifted delivery focus entirely onto high-intent customers.",
    }
  ];

  return (
    <div ref={ref} id="chart-system" className="w-full relative py-16 md:py-24 flex flex-col items-center">

      {/* ─── Lightbox ─── */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setLightboxOpen(false)}
            onMouseLeave={() => setLightboxOpen(false)}
            className="fixed inset-0 z-[9999] flex items-center justify-center cursor-zoom-out"
            style={{ backdropFilter: "blur(20px)", backgroundColor: "rgba(0,0,0,0.85)" }}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-[90vw] rounded-2xl overflow-hidden"
              style={{ boxShadow: "0 40px 120px rgba(0,0,0,0.8)" }}
            >
              <Image
                src="/images/casestudy/thinksmart/team.jpg"
                alt="Media Team"
                fill
                className="object-cover"
                sizes="(max-width: 1400px) 90vw, 1200px"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <p className="font-heading font-bold text-white text-[18px]">Media Team</p>
                <p className="font-body text-white/60 text-[13px] mt-1">Assigned by category and video type to act as a unified machine.</p>
              </div>
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* ─── The Centered Infinity Loop ─── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="w-full flex flex-col items-center justify-center relative mb-20"
      >
        <div className="flex items-center gap-3 mb-10 z-10">
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: color }} />
          <span className="font-body text-[12px] uppercase tracking-[0.2em] font-semibold" style={{ color }}>
            The Performance Loop
          </span>
        </div>

        {/* Massive Infinity SVG without any bounding box */}
        <div className="relative w-full max-w-lg flex justify-center">
          {/* Ambient Glow behind SVG */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[150px] rounded-[100%] blur-[80px] pointer-events-none" style={{ backgroundColor: `${color}15` }} />

          <svg width="100%" height="auto" viewBox="0 0 300 120" className="overflow-visible">
            <defs>
              <linearGradient id="infinity-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={color} />
                <stop offset="45%" stopColor={color} />
                <stop offset="55%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#ffffff" />
              </linearGradient>
            </defs>

            {/* Base Continuous Track */}
            <path 
              d="M150,60 C90,0 10,40 10,80 C10,120 90,120 150,60 C210,0 290,40 290,80 C290,120 210,120 150,60"
              fill="none" 
              stroke="url(#infinity-gradient)" 
              strokeWidth="2" 
              strokeOpacity="0.1"
            />

            {/* Traveling Comet (Seamless Continuous Line) */}
            <motion.path
              d="M150,60 C90,0 10,40 10,80 C10,120 90,120 150,60 C210,0 290,40 290,80 C290,120 210,120 150,60"
              fill="none"
              stroke="url(#infinity-gradient)"
              strokeWidth="3"
              strokeLinecap="round"
              className="drop-shadow-[0_0_12px_var(--case-color)]"
              style={{ '--case-color': color } as React.CSSProperties}
              initial={{ pathLength: 0, pathOffset: 0 }}
              animate={isInView ? { 
                pathLength: 0.35, 
                pathOffset: [0, 1] 
              } : {}}
              transition={{ 
                duration: 3.5, 
                ease: "linear", 
                repeat: Infinity 
              }}
            />
            
            {/* Anchors / Nodes - Synchronized with the 3.5s comet cycle */}
            {/* Left Node (Comet hits at ~15% = 0.5s) */}
            <motion.circle cx="10" cy="60" r="5" fill={color} className="drop-shadow-[0_0_10px_currentColor]" 
              animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }} 
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} 
            />
            
            {/* Right Node (Comet hits at ~65% = 2.25s) */}
            <motion.circle cx="290" cy="60" r="5" fill="white" className="opacity-80 drop-shadow-[0_0_10px_white]" 
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }} 
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 2.25 }} 
            />
            
            {/* Center Node (Comet crosses at 0s and 1.75s) */}
            <motion.circle cx="150" cy="60" r="7" fill="url(#infinity-gradient)" className="drop-shadow-[0_0_15px_white]" 
              animate={{ scale: [1, 1.3, 1] }} 
              transition={{ duration: 1.75, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>
        </div>
      </motion.div>

      {/* ─── Creative Parallax Cards ─── */}
      <div className="w-full max-w-5xl mx-auto px-4 flex flex-col md:grid md:grid-cols-3 gap-6 md:gap-10 relative z-10 pt-4 md:pt-10">
        {steps.map((step, i) => (
          <motion.div
            key={step.id}
            style={{ y: yTransforms[i], zIndex: i === 1 ? 5 : 1 }}
            className={`flex flex-col relative w-full min-w-0 transition-transform duration-500 hover:z-50 ${step.image ? "cursor-zoom-in" : ""}`}
            onMouseEnter={() => step.image && setLightboxOpen(true)}
          >
            <PremiumHoverCard
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              accentColor={i === 0 ? `${color}40` : "rgba(255,255,255,0.15)"}
              className="flex-1 flex flex-col p-6 md:p-8 !rounded-3xl hover:-translate-y-2 min-w-0"
              style={{ borderColor: "rgba(255,255,255,0.06)", border: "1px solid", boxShadow: "0 10px 40px -10px rgba(0,0,0,0.5)" }}
            >

              {/* Giant background faded icon */}
              {!step.image && (
                <div className="absolute -bottom-24 -right-24 text-[80px] opacity-[0.025] group-hover:opacity-[0.08] transition-all duration-700 group-hover:scale-105 group-hover:-rotate-12 pointer-events-none select-none">
                  {step.icon}
                </div>
              )}

              <div className="relative z-10 flex flex-col h-full w-full">
                <div className="flex flex-col gap-4 mb-5">
                  <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-2xl bg-white/[0.03] border border-white/[0.08] group-hover:scale-110 group-hover:border-white/[0.15] transition-all duration-500 shadow-[inset_0_2px_10px_rgba(255,255,255,0.05)]">
                    <span className="text-[18px] md:text-[20px] drop-shadow-md brightness-90 group-hover:brightness-110 transition-all duration-500">{step.icon}</span>
                  </div>
                  <h3 className="font-heading text-[18px] md:text-[22px] font-bold text-white/90 group-hover:text-white transition-colors duration-500 text-left leading-tight">
                    {step.title}
                  </h3>
                </div>

                <p className="font-body text-[13px] md:text-[15px] text-white/50 leading-[1.6] group-hover:text-white/75 transition-colors duration-500 drop-shadow-sm text-left min-w-0 break-words flex-1">
                  {step.desc}
                </p>
              </div>
            </PremiumHoverCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── 4. RevenueChart — Biểu đồ tăng trưởng doanh thu ───
export function RevenueChart({ color }: { color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const data = [
    { year: "2022", value: 2, label: "$2M" },
    { year: "2023", value: 5.39, label: "$5.39M" },
    { year: "2024", value: 6.09, label: "$6.09M" },
  ];
  const maxVal = 7;

  return (
    <div ref={ref} id="chart-revenue" className="w-full">
      <div className="relative p-2 md:p-4">
        {/* Title */}
        <p className="font-heading text-[14px] font-semibold text-white/50 mb-12 uppercase tracking-[0.15em] border-l-2 pl-4" style={{ borderColor: color }}>
          Revenue Growth Strategy
        </p>

        {/* Chart area */}
        <div className="relative h-[320px] flex items-end justify-around gap-4 md:gap-8">
          {/* Y-axis labels - Fixed left side */}
          <div className="absolute left-0 top-10 bottom-[30px] flex flex-col justify-between pointer-events-none">
            {["$7M", "$5M", "$3M", "$1M"].map((label) => (
              <span key={label} className="font-body text-[11px] text-white/20 -translate-y-1">
                {label}
              </span>
            ))}
          </div>

          {/* Grid lines - Aligned with Y-axis */}
          <div className="absolute left-10 right-0 top-10 bottom-[30px] flex flex-col justify-between pointer-events-none z-0">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-[1px] bg-white/[0.03] border-dashed" />
            ))}
          </div>

          {/* Bars Container */}
          <div id="chart-revenue-bars" className="relative z-10 flex-1 flex items-end justify-around gap-4 md:gap-8 ml-10">
            {data.map((d, i) => {
              // Adjust percentage to fit within the new 250px working area height
              const heightPercent = (d.value / maxVal) * 100;
              const barHeight = (heightPercent / 100) * 230; // Max bar height ~230px
              
              return (
                <motion.div
                  key={d.year}
                  id={`chart-revenue-bar-group-${i}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.2 * i, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  // Ensure strict column layout that grows from bottom up
                  className="flex flex-col items-center justify-end flex-1 max-w-[140px] group/bar cursor-default h-full"
                >
                  {/* Dynamic Height Spacer + Bar Wrapper */}
                  <div className="flex flex-col items-center justify-end w-full" style={{ height: "260px" }}>
                    
                    {/* Value label - Moves up dynamically with bar height */}
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.6 + i * 0.2 }}
                      // Massive font size requested by user
                      className="font-heading text-[28px] md:text-[40px] font-bold mb-4 transition-all duration-300 group-hover/bar:scale-110 leading-none"
                      style={{ 
                        color, 
                        textShadow: `0 0 20px ${color}50`,
                      }}
                    >
                      {d.label}
                    </motion.span>

                    {/* Bar visual - Exact height applied here */}
                    <div className="w-full relative rounded-t-xl overflow-visible" style={{ height: `${barHeight}px` }}>
                      <motion.div
                        initial={{ height: 0 }}
                        animate={isInView ? { height: "100%" } : {}}
                        transition={{
                          duration: 1.4,
                          delay: 0.3 + i * 0.2,
                          type: "spring",
                          damping: 15,
                          stiffness: 100,
                        }}
                        className="w-full h-full rounded-t-xl relative transition-all duration-500 group-hover/bar:brightness-125"
                        style={{
                          background: `linear-gradient(180deg, ${color}, ${color}20)`,
                          boxShadow: `0 0 30px -5px ${color}40`,
                        }}
                      >
                        {/* Glass edge sheen */}
                        <div className="absolute inset-0 rounded-t-[inherit] border-t-2 border-x border-white/30 opacity-40 group-hover/bar:opacity-60 transition-opacity" />
                        
                        {/* Internal shadow for depth */}
                        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

                        {/* Glow top edge */}
                        <div
                          className="absolute top-0 left-0 right-0 h-2 blur-[5px] rounded-t-full"
                          style={{ backgroundColor: color }}
                        />

                        {/* Animated Shimmer on Hover */}
                        <motion.div 
                          className="absolute inset-0 w-full h-full opacity-0 group-hover/bar:opacity-100 overflow-hidden rounded-t-[inherit]"
                          initial={false}
                        >
                          <motion.div 
                            animate={{ x: ["-100%", "200%"] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12"
                          />
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Fixed Year label baseline */}
                  <div className="mt-4 flex flex-col items-center">
                    <div className="w-[1px] h-[10px] bg-white/10 mb-2 group-hover/bar:bg-white/30 transition-colors" />
                    <span 
                      className="font-body text-[14px] md:text-[16px] text-white/50 tracking-[0.15em] font-semibold group-hover/bar:text-white transition-colors"
                      style={{ color: d.year === "2024" ? color : undefined }}
                    >
                      {d.year}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Growth indicator */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-6 flex items-center gap-3 justify-center"
        >
          <span className="font-heading text-body-lg font-bold" style={{ color }}>
            +204%
          </span>
          <span className="font-body text-caption text-text-secondary">
            revenue growth in 2 years
          </span>
        </motion.div>
      </div>
    </div>
  );
}

// ─── 5. SocialBars — TikTok + YouTube views ───
export function SocialBars({ color }: { color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const platforms = [
    {
      name: "TikTok",
      views: "3.8M+",
      percent: 62,
      icon: "♪",
      gradient: `linear-gradient(90deg, ${color}, #E8512D)`,
    },
    {
      name: "YouTube",
      views: "2.3M+",
      percent: 38,
      icon: "▶",
      gradient: `linear-gradient(90deg, #E8512D, ${color})`,
    },
  ];

  return (
    <div ref={ref} id="chart-social" className="w-full max-w-3xl">
      <div className="space-y-8">
        {platforms.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 * i, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Platform header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-xl w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center">
                  {p.icon}
                </span>
                <span className="font-heading text-body-lg font-semibold text-white">
                  {p.name}
                </span>
              </div>
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + 0.2 * i }}
                className="font-heading text-h2 font-bold"
                style={{ color }}
              >
                {p.views}
              </motion.span>
            </div>

            {/* Progress bar */}
            <div className="h-4 rounded-full bg-white/[0.04] border border-white/[0.06] overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: `${p.percent}%` } : {}}
                transition={{
                  duration: 1.5,
                  delay: 0.3 + 0.2 * i,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="h-full rounded-full relative"
                style={{ background: p.gradient }}
              >
                {/* Shimmer effect */}
                <motion.div
                  animate={isInView ? { x: ["-100%", "200%"] } : {}}
                  transition={{
                    duration: 2,
                    delay: 1 + 0.2 * i,
                    ease: "linear",
                  }}
                  className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                />
              </motion.div>
            </div>

            {/* Sub label */}
            <p className="font-body text-caption text-text-muted mt-2">
              {i === 0 ? "Since 2024 · 100% organic" : "Since 2024 · No paid promotion"}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Total */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 1 }}
        className="mt-8 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-center"
      >
        <p className="font-body text-caption text-text-muted mb-1">Total Organic Views</p>
        <p className="font-heading text-h1 font-bold" style={{ color }}>
          6.1M+
        </p>
        <p className="font-body text-caption text-text-secondary mt-1">
          Without any paid social amplification
        </p>
      </motion.div>
    </div>
  );
}

// ─── 6. OverviewChart — Tổng quan 3 năm làm việc ───
export function OverviewChart({ color }: { color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const metrics = [
    {
      label: "CPA Reduction",
      from: "$180",
      to: "$67",
      change: "-63%",
      isPositive: true,
      desc: "Cost per acquisition dropped significantly",
      accentColor: "#ef4444",
    },
    {
      label: "Revenue Growth",
      from: "$2M",
      to: "$6.09M",
      change: "+204%",
      isPositive: true,
      desc: "Revenue tripled over 3 years",
      accentColor: color,
    },
    {
      label: "Videos Tested",
      from: "0",
      to: "120+",
      change: "∞",
      isPositive: true,
      desc: "Continuous creative testing system",
      accentColor: "#a855f7",
    },
  ];

  return (
    <div ref={ref} id="chart-overview" className="w-full">
      <div id="chart-overview-header" className="mb-6">
        <p className="font-heading text-body font-semibold text-white/60 uppercase tracking-wider mb-1">
          Results Overview
        </p>
        <p className="font-body text-[13px] text-white/35">
          3 years building the system — from $180 CPA down to $67
        </p>
      </div>

      <div id="chart-overview-cards" className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            id={`chart-overview-card-${i}`}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] }}
            className="group relative p-6 md:p-8 rounded-2xl
                     bg-white/[0.02] border border-white/[0.06]
                     hover:bg-white/[0.05] hover:border-white/[0.12]
                     transition-all duration-500 overflow-hidden"
          >
            {/* Background glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
              style={{
                background: `radial-gradient(200px circle at 50% 100%, ${m.accentColor}12, transparent 70%)`,
              }}
            />

            {/* Top accent line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.15 }}
              className="absolute top-0 left-0 right-0 h-[2px] origin-left"
              style={{ backgroundColor: m.accentColor }}
            />

            {/* Label */}
            <span className="relative z-10 font-body text-[11px] text-white/35 uppercase tracking-[0.15em] block mb-4">
              {m.label}
            </span>

            {/* Change badge */}
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.15 }}
              className="relative z-10 font-heading text-[clamp(32px,5vw,48px)] font-bold block leading-none mb-3"
              style={{ color: m.accentColor }}
            >
              {m.change}
            </motion.span>

            {/* From → To */}
            <div className="relative z-10 flex items-center gap-2 mb-3">
              <span className="font-body text-[13px] text-white/30">{m.from}</span>
              <svg width="16" height="8" viewBox="0 0 16 8" className="text-white/20">
                <path d="M0 4h12M10 1l3 3-3 3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              </svg>
              <span className="font-heading text-[14px] font-semibold text-white/80">{m.to}</span>
            </div>

            {/* Description */}
            <p className="relative z-10 font-body text-[12px] text-white/30">{m.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── 7. BestYearQuarterlyChart — Năm tốt nhất theo quý ───
export function BestYearQuarterlyChart({ color }: { color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const quarters = [
    { quarter: "Q1 2024", cpa: 78, revenue: 1.2 },
    { quarter: "Q2 2024", cpa: 72, revenue: 1.65 },
    { quarter: "Q3 2024", cpa: 69, revenue: 1.74 },
    { quarter: "Q4 2024", cpa: 67, revenue: 1.5 },
  ];

  const maxCpa = 100;
  const maxRev = 2;
  const totalRevenue = quarters.reduce((sum, q) => sum + q.revenue, 0);
  const avgCpa = Math.round(quarters.reduce((sum, q) => sum + q.cpa, 0) / quarters.length);

  return (
    <div ref={ref} id="chart-best-year" className="w-full">
      {/* Header */}
      <div id="chart-best-year-header" className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <p className="font-heading text-body font-semibold text-white/60 uppercase tracking-wider mb-1">
            Best Year — 2024
          </p>
          <p className="font-body text-[13px] text-white/35">
            Performance by quarter
          </p>
        </div>
        <div id="chart-best-year-legend" className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <span className="w-3 h-[3px] rounded-full" style={{ backgroundColor: "#ef4444" }} />
            <span className="font-body text-[11px] text-white/40">CPA ($)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-[3px] rounded-full" style={{ backgroundColor: color }} />
            <span className="font-body text-[11px] text-white/40">Revenue ($M)</span>
          </div>
        </div>
      </div>

      {/* Quarterly bars */}
      <div id="chart-best-year-bars" className="grid grid-cols-4 gap-3 md:gap-4">
        {quarters.map((q, i) => {
          const cpaPercent = (q.cpa / maxCpa) * 100;
          const revPercent = (q.revenue / maxRev) * 100;
          const isHovered = hoveredIndex === i;

          return (
            <motion.div
              key={q.quarter}
              id={`chart-best-year-q${i + 1}`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] }}
              className="relative p-4 md:p-5 rounded-2xl
                       bg-white/[0.02] border border-white/[0.06]
                       hover:bg-white/[0.04] hover:border-white/[0.12]
                       transition-all duration-500 cursor-default"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Quarter label */}
              <span
                className="font-body text-[11px] uppercase tracking-wider font-medium block mb-4 transition-colors duration-300"
                style={{ color: isHovered ? color : "rgba(255,255,255,0.35)" }}
              >
                {q.quarter}
              </span>

              {/* Dual bars */}
              <div className="flex items-end gap-2" style={{ height: 120 }}>
                {/* CPA bar */}
                <div className="flex-1 h-full relative flex items-end">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={isInView ? { height: `${cpaPercent}%` } : {}}
                    transition={{ duration: 1, delay: 0.3 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full rounded-t-md transition-all duration-300"
                    style={{
                      background: isHovered
                        ? "linear-gradient(180deg, #ef4444, #ef444430)"
                        : "linear-gradient(180deg, #ef444470, #ef444415)",
                      boxShadow: isHovered ? "0 -4px 16px rgba(239,68,68,0.2)" : "none",
                    }}
                  />
                </div>

                {/* Revenue bar */}
                <div className="flex-1 h-full relative flex items-end">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={isInView ? { height: `${revPercent}%` } : {}}
                    transition={{ duration: 1, delay: 0.5 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full rounded-t-md transition-all duration-300"
                    style={{
                      background: isHovered
                        ? `linear-gradient(180deg, ${color}, ${color}30)`
                        : `linear-gradient(180deg, ${color}70, ${color}15)`,
                      boxShadow: isHovered ? `0 -4px 16px ${color}25` : "none",
                    }}
                  />
                </div>
              </div>

              {/* Values */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="mt-3 space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-body text-[10px] text-red-400/60">CPA</span>
                      <span className="font-heading text-[13px] font-bold text-red-400">${q.cpa}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-body text-[10px]" style={{ color: `${color}60` }}>Rev</span>
                      <span className="font-heading text-[13px] font-bold" style={{ color }}>${q.revenue}M</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Year summary */}
      <div id="chart-best-year-summary" className="mt-4 grid grid-cols-2 gap-3">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center"
        >
          <span className="font-body text-[10px] text-red-400/50 uppercase tracking-wider block mb-1">
            Average CPA
          </span>
          <span className="font-heading text-[clamp(20px,3vw,28px)] font-bold text-red-400 block leading-none">
            ${avgCpa}
          </span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center"
        >
          <span
            className="font-body text-[10px] uppercase tracking-wider block mb-1"
            style={{ color: `${color}50` }}
          >
            Total Revenue 2024
          </span>
          <span
            className="font-heading text-[clamp(20px,3vw,28px)] font-bold block leading-none"
            style={{ color }}
          >
            ${totalRevenue.toFixed(2)}M
          </span>
        </motion.div>
      </div>
    </div>
  );
}
