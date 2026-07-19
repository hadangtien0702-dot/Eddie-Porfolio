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
import { motion, useInView, AnimatePresence, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";

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
          <span className="font-body text-[12px] text-white/40 font-bold uppercase tracking-[0.2em]">
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

  const formatRevenue = (n: number) => "$" + (n / 1000000).toFixed(1) + "M";

  return (
    <div ref={ref} id="chart-context" className="w-full relative py-8">
      {/* ─── HUD BENTO GRID ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* ─── MAIN MODULE: THE STAGNATION (Spans 8 cols) ─── */}
        <div className="lg:col-span-8 group relative">
          <div className="relative p-10 md:p-12 h-full bg-[#080808]/60 backdrop-blur-3xl border border-white/5 overflow-hidden transition-all duration-500 group-hover:border-red-500/20">
            {/* HUD Elements */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-white/10 group-hover:border-red-500/30 transition-colors" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-white/10 group-hover:border-red-500/30 transition-colors" />
            
            {/* Metadata */}
            <div className="flex items-center justify-between mb-12 relative z-10">
              <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                 <span className="font-mono text-[10px] text-red-500 font-black uppercase tracking-[0.3em]">Module: Challenge_Report</span>
              </div>
              <div className="px-3 py-1 bg-white/[0.03] border border-white/5 rounded-sm font-mono text-[9px] text-white/30 uppercase tracking-widest">
                 REF: JS-2022-STAG
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-12 relative z-10">
              <div className="flex-1">
                 <p className="font-mono text-[10px] text-white/20 uppercase tracking-[0.2em] mb-3">Baseline_Annual_Revenue</p>
                 <h3 className="font-heading text-[clamp(48px,8vw,80px)] font-black text-white leading-none tracking-tighter mb-4 italic">
                   {formatRevenue(revenueCount)}
                 </h3>
                 <div className="flex items-center gap-4">
                    <div className="flex gap-1">
                       {[1,2,3,4,5,6].map(j => <div key={j} className="w-4 h-1 bg-white/10" />)}
                    </div>
                    <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">Status: Frozen</span>
                 </div>
              </div>

              <div className="w-full md:w-64 flex flex-col justify-end">
                 <div className="h-20 w-full relative mb-4">
                    {/* Sparkline: Flat/Stagnant */}
                    <svg viewBox="0 0 200 60" className="w-full h-full">
                       <motion.path 
                         d="M 0 30 L 40 32 L 80 28 L 120 31 L 160 29 L 200 30"
                         fill="none" stroke="white" strokeWidth="2" strokeOpacity="0.2"
                         initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}}
                         transition={{ duration: 2, delay: 1 }}
                       />
                       <motion.circle 
                         cx="200" cy="30" r="3" fill="white" fillOpacity="0.4"
                         initial={{ scale: 0 }} animate={isInView ? { scale: 1 } : {}}
                         transition={{ delay: 3 }}
                       />
                    </svg>
                 </div>
                 <p className="font-body text-sm text-white/30 leading-relaxed italic">
                   "Marketing lacked a unified acquisition system. Video was just content—not revenue."
                 </p>
              </div>
            </div>

            <div className="absolute top-0 right-0 p-8 opacity-[0.03] font-mono text-[8px] text-white leading-tight pointer-events-none uppercase">
               DATA_STREAM_01: STAGNANT<br/>
               REVENUE_LOCK: ENABLED<br/>
               TRAFFIC_SOURCE: ADHOC
            </div>
          </div>
        </div>

        {/* ─── SIDE MODULE: THE CPA SURGE (Spans 4 cols) ─── */}
        <div className="lg:col-span-4 group relative">
          <div className="relative p-10 h-full bg-[#080808]/60 backdrop-blur-3xl border border-white/5 overflow-hidden transition-all duration-500 group-hover:border-red-500/40">
            {/* Brackets */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/5 group-hover:border-red-500/20 transition-colors" />
            
            <div className="relative z-10 flex flex-col h-full justify-between">
               <div>
                  <div className="flex items-center gap-2 mb-8">
                     <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]" />
                     <span className="font-mono text-[10px] text-white/40 uppercase tracking-[0.2em]">CPA_INFLATION</span>
                  </div>
                  
                  <div className="relative">
                     <span className="font-mono text-[11px] text-red-500/50 uppercase block mb-1">Surging_To</span>
                     <h4 className="font-heading text-6xl font-black text-red-500 leading-none tracking-tighter mb-4">
                       ${cpaCount}
                     </h4>
                     
                     {/* Surge Line */}
                     <div className="h-16 w-full relative">
                        <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
                           <motion.path 
                             d="M 0 35 Q 30 35 50 20 T 100 5"
                             fill="none" stroke="#ef4444" strokeWidth="3"
                             initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}}
                             transition={{ duration: 1.5, delay: 0.5 }}
                           />
                           <motion.circle 
                             cx="100" cy="5" r="4" fill="#ef4444"
                             initial={{ scale: 0 }} animate={isInView ? { scale: 1 } : {}}
                             transition={{ delay: 2 }}
                             className="shadow-[0_0_12px_#ef4444]"
                           />
                        </svg>
                     </div>
                  </div>
               </div>

               <div className="mt-8">
                  <div className="flex items-center justify-between font-mono text-[9px] text-white/20 uppercase tracking-widest mb-2">
                     <span>Efficiency_Lost</span>
                     <span>92%</span>
                  </div>
                  <div className="w-full h-[1px] bg-white/5 relative">
                     <motion.div 
                        initial={{ width: 0 }} animate={isInView ? { width: "92%" } : {}}
                        transition={{ duration: 1.5, delay: 1 }}
                        className="absolute inset-0 bg-red-500/40"
                     />
                  </div>
                  <p className="font-body text-xs text-white/20 mt-4 leading-relaxed">
                    Target was $67. The gap was unsustainable.
                  </p>
               </div>
            </div>
          </div>
        </div>

        {/* ─── BOTTOM STRIP: SYSTEM STATUS ─── */}
        <div className="lg:col-span-12 group relative">
           <div className="relative p-6 bg-white/[0.02] border border-white/5 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-500 group-hover:bg-white/[0.04]">
              <div className="flex items-center gap-6">
                 <div className="flex flex-col">
                    <span className="font-mono text-[8px] text-white/20 uppercase tracking-[0.4em]">Current_Status</span>
                    <span className="font-mono text-[10px] text-white font-black uppercase tracking-[0.2em]">Ready_For_Architectural_Overhaul</span>
                 </div>
                 <div className="hidden md:flex gap-1">
                    {[1,2,3,4,5,6,7,8].map(j => <div key={j} className="w-1 h-1 rounded-full bg-orange-500/20" />)}
                 </div>
              </div>
              
              <div className="flex items-center gap-4">
                 <span className="font-body text-[13px] text-white/40 italic">
                    "A team with immense potential, restricted by an incomplete architecture."
                 </span>
                 <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-white/20" />
                 </div>
              </div>

              {/* Scanning Glow */}
              <motion.div 
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-orange-500/5 to-transparent pointer-events-none"
              />
           </div>
        </div>
      </div>
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
export function CPAChallengeChart({ caseColor = "#ff4000" }: { caseColor?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const color = caseColor;

  const data = [
    { period: "2022", cpa: 220, revenue: 1.8, label: "Baseline" },
    { period: "2023", cpa: 140, revenue: 3.5, label: "System Expansion" },
    { period: "2024", cpa: 85, revenue: 6.2, label: "Peak Optimization" },
    { period: "2025", cpa: 75, revenue: 4.4, label: "Efficiency Gain" },
    { period: "2026", cpa: 0, revenue: 0, label: "Coming up" },
  ];

  const maxCpa = Math.max(...data.map(d => d.cpa));
  const maxRev = Math.max(...data.map(d => d.revenue));

  return (
    <div ref={containerRef} id="chart-cpa-challenge" className="w-full py-12">
      {/* ─── ENHANCED MAIN CONTAINER (Glassmorphism & HUD Style) ─── */}
      <div className="relative p-6 md:p-10 rounded-[2.5rem] bg-[#050505]/60 border border-white/10 backdrop-blur-3xl shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden">
        
        {/* Ambient Background Glows */}
        <div className="absolute -top-20 -right-20 w-64 h-64 blur-[120px] rounded-full opacity-20 pointer-events-none" style={{ backgroundColor: color }} />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 blur-[150px] rounded-full opacity-10 pointer-events-none" style={{ backgroundColor: color }} />
        
        {/* Technical Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" 
             style={{ backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`, backgroundSize: "32px 32px" }} />
        
        {/* Section Header with Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-3">
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: color }} />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">Data Analytics Feed</span>
            </div>
            <h3 className="font-heading text-2xl md:text-4xl font-bold text-white tracking-tight leading-tight">
              CPA VS REVENUE <br/><span className="text-white/40">EFFICIENCY METRICS</span>
            </h3>
          </div>
          
          <div className="flex items-center gap-6 p-4 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-sm rotate-45" style={{ backgroundColor: "#404040", border: "1px solid rgba(255,255,255,0.1)" }} />
              <span className="font-body text-[11px] font-bold text-white/40 uppercase tracking-[0.15em]">CPA Reduction</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-sm rotate-45" style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}60` }} />
              <span className="font-body text-[11px] font-bold text-white/40 uppercase tracking-[0.15em]">Revenue Expansion</span>
            </div>
          </div>
        </div>

        {/* ─── THE CHART AREA ─── */}
        <div className="relative min-h-[350px] flex items-end justify-between gap-4 md:gap-10 pb-12 pt-8 z-10">
          {/* Vertical Grid Lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-[0.05]">
             {[...Array(5)].map((_, i) => <div key={i} className="w-full h-[1px] bg-white" />)}
          </div>

          {data.map((d, i) => {
            const cpaPercent = (d.cpa / maxCpa) * 100;
            const revPercent = (d.revenue / maxRev) * 100;
            const isHovered = hoveredIndex === i;
            const isLast = i === data.length - 1;

            return (
              <motion.div
                key={d.period}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1 flex flex-col items-center gap-6 relative group"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Tooltip Overlay */}
                <AnimatePresence>
                  {isHovered && d.cpa > 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 1.1, y: -10 }}
                      className="absolute -top-20 left-1/2 -translate-x-1/2 z-30 px-4 py-3 rounded-xl bg-black/80 border border-white/20 backdrop-blur-xl shadow-2xl min-w-[140px]"
                    >
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center gap-4">
                          <span className="text-[10px] text-white/40 uppercase font-bold">CPA</span>
                          <span className="text-[14px] text-white font-bold">${d.cpa}</span>
                        </div>
                        <div className="flex justify-between items-center gap-4">
                          <span className="text-[10px] text-white/40 uppercase font-bold">Revenue</span>
                          <span className="text-[14px] font-bold" style={{ color }}>${d.revenue}M</span>
                        </div>
                      </div>
                      <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-black/80 rotate-45 border-r border-b border-white/20" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Bars Area */}
                <div className="flex items-end gap-2 md:gap-4 w-full h-[240px] relative">
                  {/* CPA Bar */}
                  <div className="flex-1 h-full relative flex items-end">
                    {d.cpa > 0 ? (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={isInView ? { height: `${cpaPercent}%` } : {}}
                        transition={{ duration: 1.2, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full rounded-t-xl relative group-hover:brightness-125 transition-all"
                        style={{
                          background: isHovered 
                            ? "linear-gradient(to top, #202020, #606060)" 
                            : "linear-gradient(to top, #101010, #303030)",
                          border: "1px solid rgba(255,255,255,0.05)"
                        }}
                      >
                         <div className="absolute inset-0 bg-gradient-to-r from-white/[0.03] to-transparent" />
                      </motion.div>
                    ) : (
                      <div className="w-full h-12 border border-dashed border-white/10 rounded-t-xl opacity-30 flex items-center justify-center">
                        <div className="w-1 h-1 bg-white/20 rounded-full animate-ping" />
                      </div>
                    )}
                  </div>

                  {/* Revenue Bar */}
                  <div className="flex-1 h-full relative flex items-end">
                    {d.revenue > 0 ? (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={isInView ? { height: `${revPercent}%` } : {}}
                        transition={{ duration: 1.2, delay: 0.4 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full rounded-t-xl relative overflow-hidden"
                        style={{
                          background: isHovered 
                            ? `linear-gradient(to top, ${color}90, ${color})` 
                            : `linear-gradient(to top, ${color}40, ${color}80)`,
                          boxShadow: isHovered ? `0 0 40px ${color}30` : `0 0 20px ${color}10`,
                          border: `1px solid ${color}30`
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-40" />
                        <motion.div 
                          animate={{ y: ["0%", "-100%"] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-transparent h-1/2 opacity-20"
                        />
                      </motion.div>
                    ) : (
                      <div className="w-full h-12 border border-dashed border-white/10 rounded-t-xl opacity-30 flex items-center justify-center overflow-hidden">
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                          className="w-20 h-[1px] bg-white/10"
                        />
                        <span className="absolute font-mono text-[9px] text-white/20 uppercase tracking-tighter">TBA</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* X-Axis Label */}
                <div className="flex flex-col items-center gap-2">
                  <span 
                    className={`font-heading text-[16px] font-bold tracking-tight transition-all duration-500 ${isHovered || isLast ? 'text-white scale-110' : 'text-white/20'}`}
                    style={{ color: isHovered || isLast ? color : undefined }}
                  >
                    {d.period}
                  </span>
                  <div className={`h-1 rounded-full transition-all duration-500 ${isHovered || isLast ? 'w-8' : 'w-0'}`} style={{ backgroundColor: color }} />
                </div>
              </motion.div>
            );
          })}
        </div>
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
    { year: "2025", value: 4.63, label: "$4.63M" },
    { year: "2026", value: 0, label: "Coming Up", isPlaceholder: true },
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
        <div className="relative h-[320px] flex items-end justify-around gap-2 md:gap-4 lg:gap-8">
          {/* Y-axis labels - Fixed left side */}
          <div className="absolute left-0 top-10 bottom-[30px] flex flex-col justify-between pointer-events-none hidden md:flex">
            {["$7M", "$5M", "$3M", "$1M"].map((label) => (
              <span key={label} className="font-body text-[11px] text-white/20 -translate-y-1">
                {label}
              </span>
            ))}
          </div>

          {/* Grid lines - Aligned with Y-axis */}
          <div className="absolute left-0 md:left-10 right-0 top-10 bottom-[30px] flex flex-col justify-between pointer-events-none z-0">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-[1px] bg-white/[0.03] border-dashed" />
            ))}
          </div>

          {/* Bars Container */}
          <div id="chart-revenue-bars" className="relative z-10 flex-1 flex items-end justify-around gap-2 md:gap-4 lg:gap-8 md:ml-10">
            {data.map((d, i) => {
              // Adjust percentage to fit within the new 250px working area height
              const heightPercent = d.isPlaceholder ? 15 : (d.value / maxVal) * 100;
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
                      className={`font-heading ${d.isPlaceholder ? 'text-[12px] md:text-[16px] text-white/40 uppercase tracking-widest' : 'text-[20px] md:text-[28px] lg:text-[40px]'} font-bold mb-4 transition-all duration-300 group-hover/bar:scale-110 leading-none text-center`}
                      style={!d.isPlaceholder ? { 
                        color, 
                        textShadow: `0 0 20px ${color}50`,
                      } : {}}
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
                        className={`w-full h-full rounded-t-xl relative transition-all duration-500 group-hover/bar:brightness-125 ${d.isPlaceholder ? 'border border-dashed border-white/20 bg-transparent' : ''}`}
                        style={!d.isPlaceholder ? {
                          background: `linear-gradient(180deg, ${color}, ${color}20)`,
                          boxShadow: `0 0 30px -5px ${color}40`,
                        } : {}}
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
