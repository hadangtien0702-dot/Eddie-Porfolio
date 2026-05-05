"use client";

import React, { useRef, useMemo } from "react";
import { motion, useInView, useSpring, useTransform, useMotionValue, AnimatePresence, Variants } from "framer-motion";
import { Users, Zap, Target, ArrowRight, Activity, Cpu, ShieldCheck } from "lucide-react";

export function MyRole() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // ─── 3D Mouse Parallax Logic ───
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { damping: 25, stiffness: 150 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { damping: 25, stiffness: 150 });

  function handleMouseMove(event: React.MouseEvent) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((event.clientX - centerX) / rect.width);
    y.set((event.clientY - centerY) / rect.height);
  }

  // Pure data for background fragments to fix Math.random error
  const fragments = useMemo(() => {
    return [...Array(12)].map((_, i) => ({
      id: i,
      x: (i * 8.33) + "%",
      duration: 15 + (i % 5) * 2,
      delay: i * 2,
      hex: `0x${(i * 123456).toString(16).padEnd(8, '0').toUpperCase().slice(0, 8)}`
    }));
  }, []);

  const cards = [
    {
      id: "01",
      title: "Media Team",
      icon: <Users className="w-5 h-5 text-orange-500" />,
      text: "Assigned by category and video type to act as a unified machine.",
      accent: "#ff5a00",
      tag: "CREATIVE_HUB"
    },
    {
      id: "02",
      title: "Hook Strategy",
      icon: <Zap className="w-5 h-5 text-amber-500" />,
      text: "A/B testing first 3–5 seconds to secure initial retention.",
      accent: "#f59e0b",
      tag: "RETENTION_LAB"
    },
    {
      id: "03",
      title: "Ad Optimization",
      icon: <Target className="w-5 h-5 text-white" />,
      text: "Shifted delivery focus entirely onto high-intent customers.",
      accent: "#ffffff",
      tag: "PERFORMANCE_ENGINE"
    },
  ];

  // Fix easing type issue by using a string for bezier
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full py-20 md:py-32 overflow-hidden bg-[#020202] cursor-crosshair"
    >
      {/* ─── Cinematic Atmosphere ─── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
        
        <motion.div 
          animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-orange-950/10 blur-[180px] rounded-full" 
        />
        
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{ 
            backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(255,255,255,0.05) 1.5px, transparent 1.5px)`,
            backgroundSize: '100px 100px',
            transform: 'perspective(1000px) rotateX(20deg)',
          }}
        />

        {/* Fixed Fragments using useMemo */}
        <AnimatePresence>
          {isInView && fragments.map((f) => (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, x: f.x, y: "100%" }}
              animate={{ opacity: [0, 0.2, 0], y: "-10%" }}
              transition={{ duration: f.duration, repeat: Infinity, delay: f.delay }}
              className="absolute font-mono text-[8px] text-orange-500/30 whitespace-nowrap hidden md:block"
            >
              {`${f.hex} >> EXECUTE_OPTIMIZATION`}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-center z-20">
        
        {/* ─── Epic Animated Header ─── */}
        <motion.div 
          className="text-center mb-16 md:mb-20 relative"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8">
            <ShieldCheck className="w-4 h-4 text-orange-500" />
            <span className="text-orange-500 font-heading text-[10px] tracking-[0.5em] uppercase">Security Level: Enterprise</span>
          </motion.div>

          <motion.h2 
            variants={itemVariants}
            className="font-heading text-[clamp(44px,8vw,100px)] font-bold text-white mb-6 tracking-tighter leading-[0.92]"
          >
            <span className="text-white/20 italic">Data.</span> Test. <br className="md:hidden"/>
            Optimize. <span className="text-orange-500 relative inline-block drop-shadow-[0_0_50px_rgba(255,80,0,0.5)]">Repeat.
              <motion.span 
                initial={{ width: 0 }}
                animate={isInView ? { width: "110%" } : {}}
                transition={{ duration: 1, delay: 1 }}
                className="absolute -bottom-2 -left-[5%] h-[4px] bg-gradient-to-r from-orange-600 to-transparent"
              />
            </span>
          </motion.h2>
        </motion.div>

        {/* ─── THE 3D PARALLAX HUD ─── */}
        <motion.div 
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative w-full max-w-[1100px] aspect-[16/7.5] mb-12 md:mb-16 group"
        >
          {/* Technical Corner Brackets */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div 
              style={{ translateZ: 50 }}
              className="absolute top-0 left-0 w-64 p-6 border-l-2 border-t-2 border-white/10 backdrop-blur-md bg-white/[0.01]"
            >
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-3 h-3 text-orange-500 animate-pulse" />
                <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">Media_Team_Lead</span>
              </div>
              <div className="flex gap-1 items-end h-8">
                {[...Array(12)].map((_, i) => (
                  <motion.div 
                    key={i} 
                    animate={{ height: [4, 16, 6] }} 
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                    className="w-1 bg-orange-500/30" 
                  />
                ))}
              </div>
              <div className="mt-4 font-mono text-[10px] text-orange-500">HOOK_RETENTION: 92%</div>
            </motion.div>

            <motion.div 
              style={{ translateZ: 50 }}
              className="absolute bottom-0 right-0 w-64 p-6 border-r-2 border-b-2 border-white/10 text-right backdrop-blur-md bg-white/[0.01]"
            >
              <div className="flex items-center justify-end gap-2 mb-2">
                <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">Ads_Performance_Hub</span>
                <Cpu className="w-3 h-3 text-white/40" />
              </div>
              <div className="text-[32px] font-heading font-bold text-white/80 leading-none">98.4<span className="text-[14px] ml-1 opacity-40">%</span></div>
              <div className="mt-4 flex justify-end gap-2">
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div animate={{ width: ["20%", "85%"] }} transition={{ duration: 4, repeat: Infinity }} className="h-full bg-white/40" />
                </div>
              </div>
              <div className="mt-2 font-mono text-[9px] text-white/30 tracking-widest">CONVERSION_STABLE</div>
            </motion.div>
          </div>

          <svg viewBox="0 0 800 400" className="w-full h-full overflow-visible drop-shadow-[0_0_60px_rgba(255,80,0,0.15)]">
            <defs>
              <filter id="ultra-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <radialGradient id="glass-3d" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="white" stopOpacity="0.4" />
                <stop offset="100%" stopColor="black" stopOpacity="0.6" />
              </radialGradient>
            </defs>

            <g opacity="0.03" stroke="white" strokeWidth="0.5" strokeDasharray="5 10">
              <line x1="0" y1="0" x2="400" y2="200" />
              <line x1="800" y1="0" x2="400" y2="200" />
              <line x1="0" y1="400" x2="400" y2="200" />
              <line x1="800" y1="400" x2="400" y2="200" />
            </g>

            <g filter="url(#ultra-glow)">
              <motion.path
                d="M 400 200 C 250 50, 100 50, 100 200 C 100 350, 250 350, 400 200"
                fill="none" stroke="#ff5a00" strokeWidth="2.5" strokeDasharray="120 480"
                animate={{ strokeDashoffset: [600, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <motion.path
                d="M 400 200 C 550 50, 700 50, 700 200 C 700 350, 550 350, 400 200"
                fill="none" stroke="white" strokeWidth="2.5" strokeDasharray="120 480"
                animate={{ strokeDashoffset: [-600, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </g>

            {/* Nodes */}
            <circle cx="100" cy="200" r="4" fill="#ff5a00" filter="url(#ultra-glow)" />
            <circle cx="700" cy="200" r="4" fill="white" filter="url(#ultra-glow)" />

            {/* ─── NEW PREMIUM PLATINUM ENERGY CORE ─── */}
            <g transform="translate(400, 200)">
              <defs>
                <radialGradient id="energy-plasma" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="white" stopOpacity="0.9" />
                  <stop offset="40%" stopColor="#d1d5db" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#4b5563" stopOpacity="0.2" />
                </radialGradient>
              </defs>

              {/* Outer Scanning Rings */}
              <motion.circle 
                r="48" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.05"
                animate={{ scale: [0.95, 1.05, 0.95] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.circle 
                r="45" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.1" strokeDasharray="5 15"
                animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Internal Glass Sphere Shell */}
              <circle r="36" fill="#080808" stroke="white" strokeWidth="0.5" strokeOpacity="0.15" />
              
              {/* Mouse Reactive Energy Core */}
              <motion.g style={{ 
                x: useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { damping: 40, stiffness: 200 }),
                y: useSpring(useTransform(y, [-0.5, 0.5], [-10, 10]), { damping: 40, stiffness: 200 })
              }}>
                {/* Plasma Aura */}
                <motion.circle 
                  r="28" fill="url(#energy-plasma)" 
                  animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  filter="url(#ultra-glow)"
                />
                
                {/* Main Silver Orb */}
                <circle r="20" fill="url(#energy-plasma)" filter="url(#ultra-glow)" />
                
                {/* High-Brightness Core */}
                <circle r="6" fill="white" filter="url(#ultra-glow)" />
                <motion.circle 
                  r="12" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.4"
                  animate={{ scale: [0.8, 1.5], opacity: [0.5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                />
              </motion.g>

              {/* Internal HUD Markers (Small) */}
              {[...Array(8)].map((_, i) => (
                <motion.rect
                  key={i}
                  width="1" height="4" fill="white" fillOpacity="0.2"
                  x={Math.cos((i * 45 * Math.PI) / 180) * 32 - 0.5}
                  y={Math.sin((i * 45 * Math.PI) / 180) * 32 - 2}
                  animate={{ opacity: [0.1, 0.4, 0.1] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}

              {/* Final Glass Reflection */}
              <circle r="36" fill="url(#glass-3d)" pointerEvents="none" opacity="0.7" />
            </g>
          </svg>
        </motion.div>

        {/* ─── Ultra-Premium Scanning Cards ─── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full relative z-30">
          {cards.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 + i * 0.2, duration: 1 }}
              whileHover={{ y: -20 }}
              className="group relative"
            >
              <div 
                className="relative p-12 bg-white/[0.01] backdrop-blur-3xl border border-white/[0.05] transition-all duration-700 group-hover:bg-white/[0.03] group-hover:border-orange-500/20 h-full overflow-hidden"
                style={{ clipPath: "polygon(0 0, 92% 0, 100% 12%, 100% 100%, 0 100%)" }}
              >
                <motion.div 
                  animate={{ y: ["-100%", "400%"] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: i * 2 }}
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent w-full h-40 pointer-events-none"
                />

                <div className="flex flex-col gap-6 mb-12">
                  <div className="flex items-center justify-between">
                    <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-orange-500/10 group-hover:border-orange-500/40">
                      {card.icon}
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="font-mono text-[9px] text-white/30 tracking-[0.2em] mb-1 uppercase bg-white/[0.05] px-2 py-0.5 rounded-sm">
                        {card.tag}
                      </span>
                      <div className="w-12 h-[1px] bg-white/10 group-hover:bg-orange-500/40 transition-colors" />
                    </div>
                  </div>
                </div>

                <h3 className="font-heading text-h3 font-bold mb-5 text-white group-hover:text-orange-500 transition-colors tracking-tight">
                  {card.title}
                </h3>
                <p className="font-body text-[16px] text-white/30 leading-relaxed transition-colors group-hover:text-white/60">
                  {card.text}
                </p>

                <div className="mt-10 flex items-center gap-3 text-white/20 text-[10px] font-bold tracking-[0.5em] uppercase transition-all duration-500 group-hover:text-orange-500 group-hover:translate-x-4">
                  Access_Core <ArrowRight className="w-3 h-3" />
                </div>
                
                <div 
                  className="absolute bottom-0 right-0 w-24 h-24 opacity-0 transition-opacity duration-700 group-hover:opacity-10 blur-3xl"
                  style={{ background: card.accent }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div 
        style={{ 
          x: useSpring(useTransform(x, [-0.5, 0.5], [-500, 500]), { damping: 40, stiffness: 300 }), 
          y: useSpring(useTransform(y, [-0.5, 0.5], [-400, 400]), { damping: 40, stiffness: 300 }) 
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border border-orange-500/20 rounded-full pointer-events-none z-[99] hidden md:flex items-center justify-center mix-blend-screen"
      >
        <div className="w-1 h-1 bg-orange-500 rounded-full animate-ping" />
        <div className="absolute inset-0 border-t-2 border-orange-500/40 rounded-full animate-spin" style={{ animationDuration: '3s' }} />
      </motion.div>
    </section>
  );
}
