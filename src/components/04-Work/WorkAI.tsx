"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Cpu } from "lucide-react";

// --- Draggable Node Component ---
const DraggableNode = ({ 
  node, 
  centerX, 
  centerY 
}: { 
  node: any; 
  centerX: number; 
  centerY: number;
}) => {
  // Calculate initial position based on angle and distance
  const initialX = centerX + node.distance * Math.cos((node.angle * Math.PI) / 180);
  const initialY = centerY + node.distance * Math.sin((node.angle * Math.PI) / 180);

  // Motion values to track position
  const x = useMotionValue(initialX);
  const y = useMotionValue(initialY);

  // Add spring physics to make the connection line feel elastic
  const springX = useSpring(x, { stiffness: 100, damping: 10 });
  const springY = useSpring(y, { stiffness: 100, damping: 10 });

  return (
    <>
      {/* The connecting elastic wire */}
      <motion.line
        x1={centerX}
        y1={centerY}
        x2={springX}
        y2={springY}
        stroke="rgba(255, 64, 0, 0.4)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="4 4"
        className="pointer-events-none"
      />
      
      {/* Animated signal along the wire */}
      <motion.circle
        r="3"
        fill="#ff4000"
        className="pointer-events-none"
        style={{
          cx: useTransform(() => centerX + (springX.get() - centerX) * 0.5),
          cy: useTransform(() => centerY + (springY.get() - centerY) * 0.5),
        }}
        animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
        transition={{ duration: 1.5 + Math.random(), repeat: Infinity, delay: Math.random() }}
      />

      {/* The Draggable Node itself */}
      <motion.div
        drag
        dragSnapToOrigin
        dragElastic={0.4}
        onDrag={(e, info) => {
          x.set(initialX + info.offset.x);
          y.set(initialY + info.offset.y);
        }}
        onDragEnd={() => {
          x.set(initialX);
          y.set(initialY);
        }}
        style={{
          x: initialX, // Start at calculated position
          y: initialY,
          translateX: "-50%",
          translateY: "-50%",
          position: "absolute",
          left: 0,
          top: 0,
        }}
        className="z-30 cursor-grab active:cursor-grabbing group"
      >
        <div className="relative w-16 h-16 rounded-2xl bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-center hover:border-accent hover:shadow-[0_0_30px_rgba(255,64,0,0.5)] transition-all duration-300">
           <img 
             src={`/images/logos/${node.icon}`} 
             alt={node.label} 
             className="w-8 h-8 object-contain brightness-0 invert opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
           />
           {/* Tooltip HUD */}
           <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
             <div className="bg-accent/10 border border-accent/30 px-2 py-1 rounded backdrop-blur-md">
               <span className="font-mono text-[8px] text-accent uppercase font-bold tracking-widest whitespace-nowrap">{node.label}</span>
             </div>
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

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Background values
  const bgScale = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.85, 1, 1, 0.85]);
  const bgBlur = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], ["blur(25px)", "blur(0px)", "blur(0px)", "blur(25px)"]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const bgBorderRadius = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], ["40px", "0px", "0px", "40px"]);

  // Neural network unique scroll-driven movements
  const networkScale = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.3, 1, 1, 0.3]);
  const networkRotate = useTransform(scrollYProgress, [0, 1], [-15, 15]);
  const coreScale = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.5, 1, 1, 0.5]);
  const coreRotate = useTransform(scrollYProgress, [0, 1], [-180, 180]);

  // Foreground values
  const contentOpacity = useTransform(scrollYProgress, [0.15, 0.25, 0.75, 0.85], [0, 1, 1, 0]);

  useEffect(() => {
    setMounted(true);
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight
      });
    }

    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const centerX = dimensions.width / 2;
  const centerY = dimensions.height / 2;
  
  const isMobile = mounted && window.innerWidth < 768;

  const aiNodes = [
    { id: 1, label: "HeyGen Avatar", icon: "heygen.png", angle: -45, distance: isMobile ? 120 : 250 },
    { id: 2, label: "Midjourney v6", icon: "midjourney.svg", angle: -15, distance: isMobile ? 150 : 350 },
    { id: 3, label: "ChatGPT Logic", icon: "chatgpt.svg", angle: 25, distance: isMobile ? 120 : 220 },
    { id: 4, label: "ElevenLabs Voice", icon: "claude.svg", angle: 160, distance: isMobile ? 140 : 280 },
    { id: 5, label: "Flux.1 Render", icon: "flux.svg", angle: 195, distance: isMobile ? 160 : 320 },
  ];

  return (
    <section 
      id="ai"
      className="relative w-full h-screen min-h-[700px] overflow-hidden bg-[#000] border-t border-white/5" 
      ref={containerRef}
    >
      
      {/* ─── Animated Background Wrapper ─── */}
      <motion.div
        style={{ 
          scale: bgScale, 
          filter: bgBlur, 
          opacity: bgOpacity,
          borderRadius: bgBorderRadius 
        }}
        className="absolute inset-0 z-0 overflow-hidden origin-center will-change-transform bg-[#000] flex items-center justify-center"
      >
        {/* ─── Background Cyberpunk Grid ─── */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#000_80%)] pointer-events-none" />
        
        {/* ─── Neural Network Canvas ─── */}
        <motion.div 
          style={{ 
            scale: networkScale, 
            rotate: networkRotate 
          }}
          className="absolute inset-0 z-10 origin-center"
        >
          {mounted && (
            <svg className="w-full h-full pointer-events-none">
              {aiNodes.map(node => (
                <DraggableNode key={node.id} node={node} centerX={centerX} centerY={centerY} />
              ))}
            </svg>
          )}
        </motion.div>

        {/* ─── Central Core Hub ─── */}
        {mounted && (
          <motion.div 
            className="absolute z-20 origin-center"
            style={{ 
              left: centerX, 
              top: centerY, 
              translateX: "-50%",
              translateY: "-50%",
              scale: coreScale,
              rotate: coreRotate
            }}
          >
            <div className="relative w-32 h-32 rounded-full flex items-center justify-center group pointer-events-none">
              {/* Pulsing rings */}
              <motion.div animate={{ scale: [1, 1.5], opacity: [0.5, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 rounded-full border border-accent/40 bg-accent/10" />
              <motion.div animate={{ scale: [1, 2], opacity: [0.3, 0] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }} className="absolute inset-0 rounded-full border border-accent/20" />
              
              {/* Core sphere */}
              <div className="w-20 h-20 rounded-full bg-black border-2 border-accent flex flex-col items-center justify-center shadow-[0_0_50px_#ff4000] backdrop-blur-xl">
                <Cpu className="w-6 h-6 text-accent mb-1 animate-pulse" />
                <span className="font-mono text-[8px] text-white font-bold tracking-widest">CORE</span>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* ─── Overlay Content ─── */}
      <motion.div 
        style={{ opacity: contentOpacity }}
        className="absolute inset-0 z-30 p-6 md:p-12 lg:p-16 pointer-events-none flex flex-col justify-end lg:justify-between items-start"
      >
        <div className="hidden lg:flex items-center gap-3 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 mt-20 lg:mt-0">
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          <span className="font-mono text-[10px] text-white/70 uppercase tracking-[0.3em] font-bold">
            Interactive Node Sandbox
          </span>
        </div>

        <div className="max-w-2xl mt-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-5xl md:text-7xl font-black text-white uppercase leading-[0.9] tracking-tighter mb-4 drop-shadow-2xl"
          >
            NEURAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-400">ORCHESTRATOR</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-body text-lg text-white/80 mb-8 max-w-lg bg-black/40 backdrop-blur-sm p-4 rounded-xl border border-white/5"
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
