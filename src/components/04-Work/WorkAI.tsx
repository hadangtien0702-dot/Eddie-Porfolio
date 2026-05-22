"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll, animate } from "framer-motion";
import Link from "next/link";

// --- Brand Themes for AI Nodes ---
const nodeThemes: Record<string, { color: string; glow: string; border: string; bg: string; brandColor: string }> = {
  chatgpt: {
    color: "#10a37f",
    glow: "rgba(16, 163, 127, 0.25)",
    border: "group-hover:border-[#10a37f]/50",
    bg: "rgba(16, 163, 127, 0.03)",
    brandColor: "#10a37f"
  },
  claude: {
    color: "#d97753",
    glow: "rgba(217, 119, 83, 0.25)",
    border: "group-hover:border-[#d97753]/50",
    bg: "rgba(217, 119, 83, 0.03)",
    brandColor: "#d97753"
  },
  gemini: {
    color: "#4285f4",
    glow: "rgba(66, 133, 244, 0.25)",
    border: "group-hover:border-[#4285f4]/50",
    bg: "rgba(66, 133, 244, 0.03)",
    brandColor: "#4285f4"
  },
  midjourney: {
    color: "#ac52f2",
    glow: "rgba(172, 82, 242, 0.25)",
    border: "group-hover:border-[#ac52f2]/50",
    bg: "rgba(172, 82, 242, 0.03)",
    brandColor: "#ac52f2"
  },
  heygen: {
    color: "#ff5a1f",
    glow: "rgba(255, 90, 31, 0.25)",
    border: "group-hover:border-[#ff5a1f]/50",
    bg: "rgba(255, 90, 31, 0.03)",
    brandColor: "#ff5a1f"
  },
  perplexity: {
    color: "#39a882",
    glow: "rgba(57, 168, 130, 0.25)",
    border: "group-hover:border-[#39a882]/50",
    bg: "rgba(57, 168, 130, 0.03)",
    brandColor: "#39a882"
  }
};

// --- Draggable Node Component ---
const DraggableNode = ({ 
  node, 
  centerX, 
  centerY 
}: { 
  node: any; 
  centerX: any; // motion value
  centerY: any; // motion value
}) => {
  const theme = nodeThemes[node.themeKey] || {
    color: "#ffffff",
    glow: "rgba(255, 255, 255, 0.1)",
    border: "group-hover:border-white/30",
    bg: "rgba(255, 255, 255, 0.02)",
    brandColor: "#ffffff"
  };

  // Calculate base position coordinates as motion values
  const initialX = useTransform(
    [centerX],
    ([cx]) => (cx as number) + node.distance * Math.cos((node.angle * Math.PI) / 180)
  );
  const initialY = useTransform(
    [centerY],
    ([cy]) => (cy as number) + node.distance * Math.sin((node.angle * Math.PI) / 180)
  );

  // Pixel format styles for CSS left/top binding
  const leftStyle = useTransform(initialX, (val) => `${val}px`);
  const topStyle = useTransform(initialY, (val) => `${val}px`);

  // Motion values to track relative dragging offset
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  // Springs for connection line damping
  const springDragX = useSpring(dragX, { stiffness: 80, damping: 15 });
  const springDragY = useSpring(dragY, { stiffness: 80, damping: 15 });

  // Absolute positions for connection path math
  const nodeX = useTransform(
    [initialX, springDragX],
    ([initX, dx]) => (initX as number) + (dx as number)
  );
  const nodeY = useTransform(
    [initialY, springDragY],
    ([initY, dy]) => (initY as number) + (dy as number)
  );

  // Connection path d attribute
  const pathD = useTransform(
    [centerX, centerY, nodeX, nodeY],
    ([cx, cy, x, y]) => {
      const midX = ((cx as number) + (x as number)) / 2;
      const midY = ((cy as number) + (y as number)) / 2;
      const cpY = midY - ((y as number) > (cy as number) ? 50 : -50); 
      return `M ${cx} ${cy} Q ${midX} ${cpY} ${x} ${y}`;
    }
  );

  // Animate a photon traveling along the connection path
  const signalProgress = useMotionValue(0);
  useEffect(() => {
    const controls = animate(signalProgress, 1, {
      duration: 2.5 + Math.random() * 1.5,
      repeat: Infinity,
      ease: "easeInOut",
      delay: Math.random() * 2
    });
    return () => controls.stop();
  }, [signalProgress]);

  // Compute photon coordinate along the bezier curve
  const signalX = useTransform(
    [centerX, nodeX, signalProgress],
    ([cx, nX, t]) => {
      const p0 = cx as number;
      const p2 = nX as number;
      const p1 = (p0 + p2) / 2;
      const progress = t as number;
      return (1 - progress) * (1 - progress) * p0 + 2 * (1 - progress) * progress * p1 + progress * progress * p2;
    }
  );

  const signalY = useTransform(
    [centerY, nodeY, signalProgress],
    ([cy, nY, t]) => {
      const p0 = cy as number;
      const p2 = nY as number;
      const midY = (p0 + p2) / 2;
      const p1 = midY - (p2 > p0 ? 50 : -50);
      const progress = t as number;
      return (1 - progress) * (1 - progress) * p0 + 2 * (1 - progress) * progress * p1 + progress * progress * p2;
    }
  );

  // Fade photon in/out at path boundaries
  const signalOpacity = useTransform(
    signalProgress,
    [0, 0.15, 0.85, 1],
    [0, 1, 1, 0]
  );

  const gradientId = `line-gradient-${node.id}`;

  return (
    <>
      {/* ─── Connection Path Layer ─── */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        style={{
          transform: "translateZ(35px)",
          transformStyle: "preserve-3d"
        }}
      >
        <defs>
          <motion.linearGradient
            id={gradientId}
            gradientUnits="userSpaceOnUse"
            x1={centerX}
            y1={centerY}
            x2={nodeX}
            y2={nodeY}
          >
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.05)" />
            <stop offset="55%" stopColor="rgba(255, 90, 31, 0.25)" />
            <stop offset="100%" stopColor={theme.color} stopOpacity={0.8} />
          </motion.linearGradient>
        </defs>

        <motion.path
          d={pathD}
          fill="transparent"
          stroke={`url(#${gradientId})`}
          strokeWidth="1.2"
          className="opacity-60"
        />

        <motion.circle
          r="2.5"
          style={{
            cx: signalX,
            cy: signalY,
            fill: theme.color,
            opacity: signalOpacity,
            filter: `drop-shadow(0 0 6px ${theme.color})`,
          }}
        />
      </svg>

      {/* ─── Draggable Card Node ─── */}
      <motion.div
        drag
        dragSnapToOrigin
        dragElastic={0.6}
        whileHover={{ scale: 1.12, z: 120 }}
        whileTap={{ scale: 0.96, z: 80 }}
        style={{
          x: dragX,
          y: dragY,
          left: leftStyle,
          top: topStyle,
          position: "absolute",
          translateX: "-50%",
          translateY: "-50%",
          z: 70, // Base floating depth
          transformStyle: "preserve-3d"
        } as any}
        className="z-30 cursor-grab active:cursor-grabbing group pointer-events-auto"
      >
        <div className="relative w-16 h-16 rounded-2xl bg-black/45 backdrop-blur-xl border border-white/10 flex items-center justify-center hover:border-white/30 transition-all duration-300">
          
          {/* Subtle branding color glow backdrop */}
          <div 
            className="absolute inset-0 rounded-2xl blur-lg opacity-25 group-hover:opacity-75 transition-all duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${theme.glow} 0%, transparent 70%)`
            }}
          />

          {/* Connected Indicator LED */}
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full flex">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: theme.color }} />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ backgroundColor: theme.color }} />
          </span>

          {/* Logo representation */}
          <img 
            src={`/images/logos/${node.icon}`} 
            alt={node.label} 
            className="w-8 h-8 object-contain opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
          />

          {/* Label HUD */}
          <div className="absolute top-[72px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5 pointer-events-none">
            <span className="font-mono text-[9px] text-white/50 group-hover:text-white transition-colors duration-300 whitespace-nowrap tracking-wider uppercase">
              {node.label}
            </span>
            <span className="font-mono text-[6px] text-white/30 group-hover:text-accent transition-colors duration-300 tracking-widest uppercase">
              [ ACTIVE ]
            </span>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default function WorkAI() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [mounted, setMounted] = useState(false);
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; z: number; size: number; color: string; opacity: number; pulseSpeed: number }>>([]);

  // Mouse tilt tracking values
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);

  // Smooth springs for tilt physics
  const rotateX = useSpring(rawRotateX, { stiffness: 85, damping: 20 });
  const rotateY = useSpring(rawRotateY, { stiffness: 85, damping: 20 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Background smooth scrolling transformations
  const bgScale = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.95, 1, 1, 0.95]);
  const bgBlur = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], ["blur(12px)", "blur(0px)", "blur(0px)", "blur(12px)"]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const bgBorderRadius = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], ["30px", "0px", "0px", "30px"]);

  // Scroll animations for central visual components
  const networkScale = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.8, 1, 1, 0.8]);
  const networkRotate = useTransform(scrollYProgress, [0, 1], [-6, 6]);
  
  const coreScale = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.85, 1, 1, 0.85]);
  const coreRotate = useTransform(scrollYProgress, [0, 1], [-4, 4]);

  const contentOpacity = useTransform(scrollYProgress, [0.15, 0.25, 0.75, 0.85], [0, 1, 1, 0]);

  useEffect(() => {
    setMounted(true);
    
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };

    updateDimensions();
    const timer = setTimeout(updateDimensions, 100);

    window.addEventListener("resize", updateDimensions);
    return () => {
      window.removeEventListener("resize", updateDimensions);
      clearTimeout(timer);
    };
  }, []);

  const centerX = dimensions.width / 2;
  const centerY = dimensions.height / 2;
  
  const motionCenterX = useMotionValue(centerX);
  const motionCenterY = useMotionValue(centerY);

  useEffect(() => {
    motionCenterX.set(centerX);
    motionCenterY.set(centerY);
  }, [centerX, centerY, motionCenterX, motionCenterY]);

  // Generate cosmic background stars/dust with physical 3D depths
  useEffect(() => {
    if (!mounted) return;
    const colors = ["#ffffff", "#ff5a1f", "#ff9f43", "#a29bfe", "#74b9ff"];
    const generated = Array.from({ length: 65 }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const radius = 60 + Math.random() * 650;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      return {
        id: i,
        x,
        y,
        z: -60 - Math.random() * 400, // Z depth mapping from -60px to -460px
        size: 1 + Math.random() * 2.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: 0.15 + Math.random() * 0.75,
        pulseSpeed: 1.8 + Math.random() * 2.5
      };
    });
    setStars(generated);
  }, [centerX, centerY, mounted]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = x / rect.width - 0.5;
    const normY = y / rect.height - 0.5;

    // Set rotation bounds (max 10 degrees rotation for refined tech control)
    rawRotateX.set(-normY * 10);
    rawRotateY.set(normX * 10);
  };

  const handleMouseLeave = () => {
    rawRotateX.set(0);
    rawRotateY.set(0);
  };

  const isMobile = mounted && window.innerWidth < 768;

  const aiNodes = [
    { id: 1, label: "ChatGPT Logic", icon: "chatgpt.svg", angle: -65, distance: isMobile ? 130 : 260, themeKey: "chatgpt" },
    { id: 2, label: "Claude 3.5 Sonnet", icon: "claude.svg", angle: -20, distance: isMobile ? 140 : 330, themeKey: "claude" },
    { id: 3, label: "Gemini 1.5 Pro", icon: "gemini.svg", angle: 25, distance: isMobile ? 130 : 240, themeKey: "gemini" },
    { id: 4, label: "Midjourney v6", icon: "midjourney.svg", angle: 155, distance: isMobile ? 135 : 290, themeKey: "midjourney" },
    { id: 5, label: "HeyGen Avatar", icon: "heygen.png", angle: 200, distance: isMobile ? 145 : 320, themeKey: "heygen" },
    { id: 6, label: "Perplexity Search", icon: "perplexity.svg", angle: 245, distance: isMobile ? 130 : 250, themeKey: "perplexity" },
  ];

  const brainLeft = useTransform(motionCenterX, (val) => `${val}px`);
  const brainTop = useTransform(motionCenterY, (val) => `${val}px`);

  return (
    <section 
      id="ai"
      className="relative w-full h-screen min-h-[700px] overflow-hidden bg-[#000] border-t border-white/5 [perspective:1200px]" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      
      {/* ─── 3D Master Parallax Stage ─── */}
      <motion.div
        style={{ 
          scale: bgScale, 
          filter: bgBlur, 
          opacity: bgOpacity,
          borderRadius: bgBorderRadius,
          transformStyle: "preserve-3d"
        }}
        className="absolute inset-0 z-0 overflow-hidden origin-center will-change-transform bg-[#000] flex items-center justify-center pointer-events-none"
      >
        {/* Modern Dot Grid Background (Pushed Deep Back) */}
        <div 
          className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px] opacity-40 pointer-events-none"
          style={{
            transform: "translateZ(-480px) scale(2.2)",
          }}
        />
        <div 
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#000_85%)] pointer-events-none" 
          style={{ transform: "translateZ(-470px) scale(2.2)" }} 
        />
        
        {/* ─── Floating Nebula Clouds (Mid-Back Layer) ─── */}
        <div className="absolute inset-0 pointer-events-none" style={{ transformStyle: "preserve-3d" }}>
          {/* Deep Purple Nebula */}
          <motion.div
            style={{
              position: "absolute",
              width: "650px",
              height: "650px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(162, 155, 254, 0.1) 0%, rgba(162, 155, 254, 0) 70%)",
              left: "5%",
              top: "15%",
              z: -380,
            }}
            animate={{
              x: [-35, 35, -35],
              y: [-25, 25, -25],
              scale: [0.92, 1.08, 0.92]
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          {/* Vibrant Orange Nebula */}
          <motion.div
            style={{
              position: "absolute",
              width: "750px",
              height: "750px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255, 90, 31, 0.08) 0%, rgba(255, 90, 31, 0) 70%)",
              right: "8%",
              bottom: "5%",
              z: -320,
            }}
            animate={{
              x: [45, -45, 45],
              y: [25, -25, 25],
              scale: [1.08, 0.92, 1.08]
            }}
            transition={{
              duration: 26,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          {/* Blue Cosmic Dust */}
          <motion.div
            style={{
              position: "absolute",
              width: "550px",
              height: "550px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(66, 133, 244, 0.08) 0%, rgba(66, 133, 244, 0) 70%)",
              left: "38%",
              top: "5%",
              z: -350,
            }}
            animate={{
              x: [-20, 20, -20],
              y: [30, -30, 30],
              scale: [0.9, 1.1, 0.9]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* ─── 3D Cosmic Space Particles (Starfield Parallax) ─── */}
        {mounted && (
          <div 
            className="absolute inset-0 pointer-events-none" 
            style={{ transformStyle: "preserve-3d" }}
          >
            {stars.map((star) => (
              <motion.div
                key={star.id}
                style={{
                  position: "absolute",
                  left: `${star.x}px`,
                  top: `${star.y}px`,
                  x: "-50%",
                  y: "-50%",
                  z: star.z,
                  width: star.size,
                  height: star.size,
                  borderRadius: "50%",
                  backgroundColor: star.color,
                  boxShadow: star.size > 1.8 ? `0 0 10px ${star.color}` : "none",
                }}
                animate={{
                  opacity: [star.opacity * 0.3, star.opacity, star.opacity * 0.3],
                  scale: [0.85, 1.15, 0.85],
                }}
                transition={{
                  duration: star.pulseSpeed,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        )}

        {/* ─── 3D Dynamic Tilt Wrapper (Reacts to Mouse Physics) ─── */}
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
            width: "100%",
            height: "100%",
            position: "absolute",
          }}
          className="flex items-center justify-center pointer-events-none"
        >
          
          {/* ─── Interactive Draggable Node Network Layer ─── */}
          <motion.div 
            style={{ 
              scale: networkScale, 
              rotate: networkRotate,
              transformStyle: "preserve-3d"
            }}
            className="absolute inset-0 z-10 origin-center pointer-events-auto"
          >
            {mounted && (
              <div className="absolute inset-0 pointer-events-none" style={{ transformStyle: "preserve-3d" }}>
                {aiNodes.map(node => (
                  <DraggableNode key={node.id} node={node} centerX={motionCenterX} centerY={motionCenterY} />
                ))}
              </div>
            )}
          </motion.div>

          {/* ─── Premium SVG Brain Core Hub (Layered Hologram) ─── */}
          {mounted && (
            <motion.div 
              className="absolute z-20 origin-center pointer-events-none"
              style={{ 
                left: brainLeft, 
                top: brainTop, 
                translateX: "-50%",
                translateY: "-50%",
                scale: coreScale,
                rotate: coreRotate,
                transformStyle: "preserve-3d"
              }}
            >
              <div className="relative w-[340px] h-[340px] md:w-[420px] md:h-[420px] flex items-center justify-center pointer-events-none" style={{ transformStyle: "preserve-3d" }}>
                
                {/* --- Layer 1: Concentric Telemetry rings and center radial glow (z: 10px) --- */}
                <div className="absolute inset-0 pointer-events-none" style={{ transform: "translateZ(10px)", transformStyle: "preserve-3d" }}>
                  <svg viewBox="0 0 400 400" className="w-full h-full">
                    <defs>
                      <radialGradient id="centerRadial" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#ff5a1f" stopOpacity="0.22" />
                        <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                    <circle cx="200" cy="200" r="110" fill="url(#centerRadial)" />
                    <circle cx="200" cy="200" r="165" stroke="rgba(255,255,255,0.02)" strokeWidth="1" fill="none" />
                    
                    <motion.circle 
                      cx="200" cy="200" r="150" 
                      stroke="rgba(255,90,31,0.06)" 
                      strokeWidth="1" 
                      strokeDasharray="4 12" 
                      fill="none"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.circle 
                      cx="200" cy="200" r="135" 
                      stroke="rgba(255,255,255,0.03)" 
                      strokeWidth="1" 
                      strokeDasharray="60 15 15 15" 
                      fill="none"
                      animate={{ rotate: -360 }}
                      transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                    />
                  </svg>
                </div>

                {/* --- Layer 2: Brain Cortex Circuits Outline (z: 45px) --- */}
                <div className="absolute inset-0 pointer-events-none" style={{ transform: "translateZ(45px)", transformStyle: "preserve-3d" }}>
                  <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-[0_0_20px_rgba(255,90,31,0.1)]">
                    <defs>
                      <linearGradient id="brainGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                        <stop offset="50%" stopColor="#ff5a1f" stopOpacity="0.55" />
                        <stop offset="100%" stopColor="#ff8a5c" stopOpacity="0.15" />
                      </linearGradient>
                    </defs>

                    {/* Left Hemisphere Lobe Circuits */}
                    <g stroke="url(#brainGlow)" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.85">
                      <motion.path 
                        d="M 200,60 C 130,60 80,100 80,160 C 80,210 105,235 115,260 C 125,285 155,300 200,300"
                        initial={{ pathLength: 0.1, pathOffset: 0 }}
                        animate={{ pathLength: [0.25, 0.55, 0.25], pathOffset: [0, 0.45, 0.75] }}
                        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <path 
                        d="M 200,60 C 130,60 80,100 80,160 C 80,210 105,235 115,260 C 125,285 155,300 200,300"
                        stroke="rgba(255,255,255,0.06)"
                        strokeWidth="0.75"
                      />

                      <motion.path 
                        d="M 200,100 C 155,100 115,130 115,170 C 115,210 135,225 145,245 C 155,265 170,270 200,270"
                        initial={{ pathLength: 0.15, pathOffset: 0.1 }}
                        animate={{ pathLength: [0.2, 0.5, 0.2], pathOffset: [0.1, 0.5, 0.85] }}
                        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <path 
                        d="M 200,100 C 155,100 115,130 115,170 C 115,210 135,225 145,245 C 155,265 170,270 200,270"
                        stroke="rgba(255,255,255,0.06)"
                        strokeWidth="0.75"
                      />

                      <motion.path 
                        d="M 200,140 C 175,140 150,155 150,180 C 150,205 175,220 200,240"
                        initial={{ pathLength: 0.3, pathOffset: 0.2 }}
                        animate={{ pathLength: [0.15, 0.45, 0.15], pathOffset: [0.2, 0.55, 0.8] }}
                        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <path 
                        d="M 200,140 C 175,140 150,155 150,180 C 150,205 175,220 200,240"
                        stroke="rgba(255,255,255,0.06)"
                        strokeWidth="0.75"
                      />

                      <path d="M 200,80 L 160,80 C 140,80 130,95 130,110 L 95,110" strokeWidth="1" strokeDasharray="3 3" />
                      <path d="M 200,120 L 150,120 C 130,120 110,140 110,165 L 85,165" strokeWidth="1" />
                      <path d="M 200,190 L 175,190 C 155,190 140,205 140,220 L 115,220" strokeWidth="1" strokeDasharray="5 2" />
                      <path d="M 200,230 L 180,230 C 170,230 160,240 160,250 L 135,250" strokeWidth="1" />
                    </g>

                    {/* Right Hemisphere Lobe Circuits */}
                    <g stroke="url(#brainGlow)" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.85">
                      <motion.path 
                        d="M 200,60 C 270,60 320,100 320,160 C 320,210 295,235 285,260 C 275,285 245,300 200,300"
                        initial={{ pathLength: 0.1, pathOffset: 0.75 }}
                        animate={{ pathLength: [0.25, 0.55, 0.25], pathOffset: [0.75, 0.45, 0] }}
                        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <path 
                        d="M 200,60 C 270,60 320,100 320,160 C 320,210 295,235 285,260 C 275,285 245,300 200,300"
                        stroke="rgba(255,255,255,0.06)"
                        strokeWidth="0.75"
                      />

                      <motion.path 
                        d="M 200,100 C 245,100 285,130 285,170 C 285,210 265,225 255,245 C 245,265 230,270 200,270"
                        initial={{ pathLength: 0.15, pathOffset: 0.85 }}
                        animate={{ pathLength: [0.2, 0.5, 0.2], pathOffset: [0.85, 0.5, 0.1] }}
                        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <path 
                        d="M 200,100 C 245,100 285,130 285,170 C 285,210 265,225 255,245 C 245,265 230,270 200,270"
                        stroke="rgba(255,255,255,0.06)"
                        strokeWidth="0.75"
                      />

                      <motion.path 
                        d="M 200,140 C 225,140 250,155 250,180 C 250,205 225,220 200,240"
                        initial={{ pathLength: 0.3, pathOffset: 0.8 }}
                        animate={{ pathLength: [0.15, 0.45, 0.15], pathOffset: [0.8, 0.55, 0.2] }}
                        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <path 
                        d="M 200,140 C 225,140 250,155 250,180 C 250,205 225,220 200,240"
                        stroke="rgba(255,255,255,0.06)"
                        strokeWidth="0.75"
                      />

                      <path d="M 200,80 L 240,80 C 260,80 270,95 270,110 L 305,110" strokeWidth="1" strokeDasharray="3 3" />
                      <path d="M 200,120 L 250,120 C 270,120 290,140 290,165 L 315,165" strokeWidth="1" />
                      <path d="M 200,190 L 225,190 C 245,190 260,205 260,220 L 285,220" strokeWidth="1" strokeDasharray="5 2" />
                      <path d="M 200,230 L 220,230 C 230,230 240,240 240,250 L 265,250" strokeWidth="1" />
                    </g>
                  </svg>
                </div>

                {/* --- Layer 3: Central Spine & Central glowing processor chip core (z: 80px) --- */}
                <div className="absolute inset-0 pointer-events-none" style={{ transform: "translateZ(80px)", transformStyle: "preserve-3d" }}>
                  <svg viewBox="0 0 400 400" className="w-full h-full">
                    <defs>
                      <linearGradient id="coreGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ff5a1f" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#ff9f43" stopOpacity="0.3" />
                      </linearGradient>
                    </defs>

                    {/* Central Spine */}
                    <line x1="200" y1="50" x2="200" y2="345" stroke="url(#coreGlow)" strokeWidth="2" strokeDasharray="6 6" />
                    <line x1="200" y1="50" x2="200" y2="345" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
                    
                    {/* Central glowing processor chip core */}
                    <g transform="translate(181, 181)">
                      <rect 
                        width="38" 
                        height="38" 
                        rx="7" 
                        fill="rgba(5, 5, 5, 0.95)" 
                        stroke="url(#coreGlow)" 
                        strokeWidth="1.5" 
                        className="filter drop-shadow-[0_0_15px_rgba(255,90,31,0.65)]" 
                      />
                      <rect width="28" height="28" x="5" y="5" rx="4" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.75" />
                      <motion.circle 
                        cx="19" 
                        cy="19" 
                        r="5.5" 
                        fill="#ff5a1f" 
                        animate={{ scale: [1, 1.35, 1], opacity: [0.65, 1, 0.65] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </g>

                    {/* Symmetrical circuit node terminals */}
                    <g fill="#ffffff">
                      <circle cx="95" cy="110" r="2.5" fill="#ff9f43" className="animate-pulse" />
                      <circle cx="85" cy="165" r="2" fill="#ff5a1f" />
                      <circle cx="115" cy="220" r="3" fill="#ffffff" />
                      <circle cx="135" cy="250" r="2" fill="#ff9f43" />
                      
                      <circle cx="305" cy="110" r="2.5" fill="#ff9f43" className="animate-pulse" />
                      <circle cx="315" cy="165" r="2" fill="#ff5a1f" />
                      <circle cx="285" cy="220" r="3" fill="#ffffff" />
                      <circle cx="265" cy="250" r="2" fill="#ff9f43" />
                      
                      <circle cx="200" cy="60" r="3" fill="#ff5a1f" />
                      <circle cx="200" cy="100" r="2" fill="#ffffff" />
                      <circle cx="200" cy="140" r="2" fill="#ffffff" />
                      <circle cx="200" cy="270" r="2" fill="#ffffff" />
                      <circle cx="200" cy="300" r="3" fill="#ff5a1f" />
                    </g>
                  </svg>
                </div>

                {/* --- Layer 4: Decorative diagnostics readouts (z: 110px) --- */}
                <div className="absolute inset-0 pointer-events-none flex flex-col justify-between items-center py-[10%] text-center" style={{ transform: "translateZ(110px)" }}>
                  <div className="font-mono text-[8px] tracking-[0.25em] text-white/40 uppercase">
                    Neural Core Active
                  </div>
                  <div className="font-mono text-[8px] tracking-[0.25em] text-accent/70 uppercase font-bold drop-shadow-[0_0_8px_#ff5a1f]">
                    [ Synced ]
                  </div>
                </div>

                {/* Glass boundary border ring */}
                <div 
                  className="absolute inset-0 border border-white/5 rounded-full pointer-events-none" 
                  style={{ transform: "translateZ(25px)" }} 
                />

              </div>
            </motion.div>
          )}

        </motion.div>

      </motion.div>

      {/* ─── Foreground Text Overlay Content (Remains Flat at Foreground) ─── */}
      <motion.div 
        style={{ opacity: contentOpacity }}
        className="absolute inset-0 z-30 p-6 md:p-12 lg:p-16 pointer-events-none flex flex-col justify-end lg:justify-between items-start"
      >
        <div className="hidden lg:flex items-center gap-3 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 mt-20 lg:mt-0 pointer-events-auto">
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          <span className="font-mono text-[10px] text-white/70 uppercase tracking-[0.3em] font-bold">
            Interactive Node Sandbox
          </span>
        </div>

        <div className="max-w-2xl mt-auto pointer-events-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-4xl sm:text-6xl lg:text-7xl font-black text-white uppercase leading-[0.9] tracking-tighter mb-4 drop-shadow-2xl"
          >
            NEURAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-400">ORCHESTRATOR</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-body text-base md:text-lg text-white/80 mb-8 max-w-lg bg-black/40 backdrop-blur-sm p-4 rounded-xl border border-white/5"
          >
            Applied generative AI models to scale production. Try dragging the satellite nodes to feel the physical network connection.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="pointer-events-auto"
          >
            <Link 
              href="/ai"
              className="inline-flex items-center gap-2 bg-accent/10 border border-accent/40 text-accent px-6 py-3 rounded-full font-heading font-bold text-sm uppercase tracking-widest hover:bg-accent hover:text-white transition-all duration-300 backdrop-blur-md"
            >
              Enter AI Dashboard
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </motion.div>
      
    </section>
  );
}
