"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView, useMotionValue, MotionValue } from "framer-motion";
import Image from "next/image";
import { FullscreenLightbox } from "./CaseStudyModals";

// ─── ZAxisTunnelGallery — Tunnel hiệu ứng chiều sâu ───
export function ZAxisTunnelGallery({
  images,
  color = "#ff4000",
  scrollContainer,
  onImageClick,
}: {
  images: string[];
  color?: string;
  scrollContainer?: React.RefObject<HTMLElement | null>;
  onImageClick?: (index: number) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const containerHeight = `${images.length * 80 + 100}vh`;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
    ...(scrollContainer ? { container: scrollContainer } : {}),
  });

  const smoothY = useSpring(scrollYProgress, { 
    stiffness: 40, 
    damping: 30,
    mass: 0.5,
    restDelta: 0.0005 
  });

  return (
    <div
      ref={containerRef}
      className="relative w-full mb-8 -mx-[5vw] px-[5vw] bg-black"
      style={{ height: containerHeight }}
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#ffffff15] via-transparent to-transparent" />
        <div className="absolute inset-10 border border-white/5 z-0 pointer-events-none rounded-[2rem] hidden md:block" />
        <div className="absolute bottom-[10vh] left-1/2 -translate-x-1/2 px-6 py-2 rounded-full border border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl flex items-center gap-3 z-50 pointer-events-none">
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }}
          />
          <span className="font-body text-[12px] font-bold uppercase tracking-[0.2em] text-white/40">
            Scroll to Fly Through
          </span>
        </div>

        {images.map((src, i) => {
          const peak = i / images.length;
          const end = peak + 1 / images.length;
          const checkpoints = [0, Math.max(0, peak - 0.2), peak, end];
          const scales = [0.01, 0.2, 1, 15]; 
          const opacities = [0, 0.4, 1, 0];

          return (
            <TunnelImage
              key={i}
              src={src}
              i={i}
              total={images.length}
              checkpoints={checkpoints}
              scales={scales}
              opacities={opacities}
              scrollYProgress={smoothY}
              onClick={() => onImageClick?.(i)}
              color={color}
            />
          );
        })}
      </div>
    </div>
  );
}

function TunnelImage({
  src,
  i,
  total,
  checkpoints,
  scales,
  opacities,
  scrollYProgress,
  onClick,
  color,
}: {
  src: string;
  i: number;
  total: number;
  checkpoints: number[];
  scales: number[];
  opacities: number[];
  scrollYProgress: MotionValue<number>;
  onClick: () => void;
  color: string;
}) {
  const scale = useTransform(scrollYProgress, checkpoints, scales);
  const opacity = useTransform(scrollYProgress, checkpoints, opacities);

  const rotation = i % 2 === 0 ? "3deg" : "-3deg";
  const offset = i % 2 === 0 ? "5%" : "-5%";
  
  return (
    <motion.div
      style={{
        scale,
        opacity,
        rotate: rotation,
        x: offset,
        y: offset,
        zIndex: total - i,
      }}
      className="absolute flex items-center justify-center cursor-pointer group origin-center perspective-1000"
      onClick={onClick}
    >
      <div className="relative w-[75vw] md:w-[50vw] aspect-[16/10] rounded-[2rem] overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.8)] border border-white/10 group-hover:border-white/30 transition-colors">
        <Image
          src={src}
          alt={`Tunnel Image ${i}`}
          fill
          className="object-cover transition-transform duration-[1s]"
          sizes="(max-width: 1200px) 100vw, 1200px"
          unoptimized={true}
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-500" />
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity duration-500"
          style={{ boxShadow: `inset 0 0 50px ${color}` }}
        />
      </div>
    </motion.div>
  );
}

// ─── EditorialGallery — Bố cục Overlapping Magazine Collage ───
export function EditorialGallery({
  images,
  onImageClick,
}: {
  images: string[];
  onImageClick?: (index: number) => void;
  color?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  if (!images || images.length < 3) return null;

  return (
    <div ref={ref} className="mb-12 md:mb-16 relative z-10 w-full pt-10 px-0 md:px-12 flex justify-center">
      <div className="relative w-full max-w-[1100px] aspect-[4/3] md:aspect-[16/9] mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 md:inset-x-12 md:inset-y-0 rounded-[2rem] overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10"
        >
          <div className="relative w-full h-full cursor-pointer" onClick={() => onImageClick?.(0)}>
            <Image 
              src={images[0]} 
              alt="Feature moment" 
              fill 
              className="object-cover group-hover:scale-[1.04] transition-transform duration-[1.5s]" 
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1100px" 
              unoptimized={true}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-8 left-8 z-20 px-5 py-2.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-md">
              <span className="font-body text-[12px] font-bold tracking-[0.2em] text-white/80 uppercase drop-shadow-md">FEATURED MOMENT</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -50, y: 50, rotate: -15 }}
          animate={isInView ? { opacity: 1, x: 0, y: 0, rotate: -3 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.05, rotate: -1, zIndex: 40 }}
          className="absolute -bottom-8 md:-bottom-16 -left-2 md:-left-4 w-[55%] md:w-[45%] aspect-[4/3] rounded-[1.5rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.6)] cursor-pointer z-20 origin-bottom-left"
          onClick={() => onImageClick?.(1)}
        >
          <Image 
            src={images[1]} 
            alt="Detail 1" 
            fill 
            className="object-cover" 
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 40vw, 500px" 
            unoptimized={true}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50, y: 50, rotate: 15 }}
          animate={isInView ? { opacity: 1, x: 0, y: 0, rotate: 4 } : {}}
          transition={{ duration: 1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.05, rotate: 1, zIndex: 40 }}
          className="absolute -bottom-6 md:-bottom-10 -right-2 md:-right-8 w-[45%] md:w-[35%] aspect-[3/4] md:aspect-[4/3] rounded-[1.5rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8)] cursor-pointer z-30 origin-bottom-right"
          onClick={() => onImageClick?.(2)}
        >
          <Image 
            src={images[2]} 
            alt="Detail 2" 
            fill 
            className="object-cover" 
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 30vw, 400px" 
            unoptimized={true}
          />
        </motion.div>
      </div>
    </div>
  );
}

// ─── ProductLineShowcase — Premium Bento Spotlight Grid ───
export function ProductLineShowcase({
  images,
  color,
  onImageClick,
}: {
  images: string[];
  color: string;
  onImageClick?: (index: number) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(800px circle at ${x}px ${y}px, ${color}15, transparent 40%)`;
    }
    
    const cards = containerRef.current.querySelectorAll('.bento-card-glow');
    cards.forEach((card) => {
      const cardRect = (card.parentElement as HTMLElement).getBoundingClientRect();
      const cardX = e.clientX - cardRect.left;
      const cardY = e.clientY - cardRect.top;
      (card as HTMLElement).style.background = `radial-gradient(400px circle at ${cardX}px ${cardY}px, ${color}20, transparent 50%)`;
    });
  }

  function handleMouseLeave() {
    if (glowRef.current) glowRef.current.style.background = "none";
    const cards = containerRef.current?.querySelectorAll('.bento-card-glow');
    cards?.forEach((card) => {
      (card as HTMLElement).style.background = "none";
    });
  }

  if (!images || images.length === 0) return null;

  const gridSpans = [
    "col-span-12 md:col-span-7",
    "col-span-12 md:col-span-5",
    "col-span-12 md:col-span-4",
    "col-span-12 md:col-span-4",
    "col-span-12 md:col-span-4",
  ];

  const heights = [
    "h-[380px] md:h-[500px]", 
    "h-[380px] md:h-[500px]", 
    "h-[320px] md:h-[380px]", 
    "h-[320px] md:h-[380px]", 
    "h-[320px] md:h-[380px]"
  ];

  const labels = [
    "INDEXED UNIVERSAL LIFE (IUL)", 
    "IUL MAX-FUNDED PLAN", 
    "EXECUTIVE BONUS TAX PLAN", 
    "KAIZEN STRATEGY", 
    "TERM LIFE INSURANCE"
  ];

  return (
    <div className="w-full max-w-[1400px] mx-auto mb-12 md:mb-16 relative z-10 px-0 md:px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4 mb-8 px-4 md:px-0"
      >
        <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: color }} />
        <h4 className="font-heading text-xl md:text-2xl font-bold text-white tracking-tight">The Production Arsenal</h4>
        <div className="flex-1 h-[1px] bg-white/[0.05]" />
      </motion.div>

      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative grid grid-cols-12 gap-3 md:gap-5 group/container overflow-hidden p-3 md:p-5 rounded-[2.5rem] bg-white/[0.01] border border-white/[0.03]"
      >
        <div ref={glowRef} className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover/container:opacity-100 transition-opacity duration-500" />
        {images.slice(0, 5).map((src, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => onImageClick?.(idx)}
            className={`relative z-10 flex flex-col rounded-[1.8rem] overflow-hidden bg-[#070707]/80 border border-white/[0.06] backdrop-blur-xl cursor-pointer group/card transition-all duration-500 hover:border-white/[0.15] hover:bg-[#0a0a0a]/90 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] ${gridSpans[idx % gridSpans.length]}`}
          >
            <div className="bento-card-glow absolute inset-0 z-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-screen" />
            <div className="absolute top-6 left-6 right-6 flex items-start justify-between z-20 pointer-events-none">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full opacity-60" style={{ backgroundColor: color }} />
                  <span className="font-mono text-[12px] uppercase tracking-[0.2em] font-bold" style={{ color }}>SEC_0{idx + 1}</span>
                </div>
                <span className="font-heading text-[12px] font-bold text-white/40 tracking-[0.2em] uppercase">{labels[idx % labels.length]}</span>
              </div>
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-all duration-500 bg-white/5 scale-75 group-hover/card:scale-100">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </div>
            </div>
            <div className={`absolute inset-0 z-0 flex items-center justify-center overflow-hidden ${heights[idx % heights.length]}`}>
              <motion.div 
                className="relative w-full h-full"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                <Image 
                  src={src} 
                  alt="" 
                  fill 
                  className="object-cover md:object-contain opacity-20 group-hover/card:opacity-100 transition-all duration-700 blur-[4px] group-hover/card:blur-0 scale-110 group-hover/card:scale-100 mix-blend-screen" 
                  sizes="(max-width: 768px) 100vw, 50vw" 
                  unoptimized={true} 
                />
              </motion.div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-[#070707]/60 z-0 pointer-events-none opacity-80 group-hover/card:opacity-40 transition-opacity duration-700" />
            
            <div className={`relative w-full flex-1 flex items-center justify-center p-12 md:p-16 z-10 pointer-events-none ${heights[idx % heights.length]}`}>
            </div>
            <div className="absolute inset-0 pointer-events-none opacity-[0.02] mix-blend-overlay z-0" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: "24px 24px" }} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── HorizontalFilmstrip — Thanh trượt ngang điện ảnh ───
export function HorizontalFilmstrip({ images, onImageClick }: { images: string[]; onImageClick?: (index: number) => void }) {
  if (!images || images.length === 0) return null;
  return (
    <div className="relative w-full mb-8 md:mb-12">
      <div className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-12 pt-6 px-1 md:px-4 no-scrollbar">
        {images.map((src, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "0px -100px" }}
            transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative shrink-0 snap-center rounded-[2rem] overflow-hidden border border-white/[0.04] bg-white/[0.02] shadow-2xl group cursor-pointer"
            style={{ width: "clamp(300px, 85vw, 900px)", aspectRatio: "16/9" }}
            onClick={() => onImageClick?.(idx)}
          >
            <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <Image src={src} alt="" fill className="object-cover group-hover:scale-[1.03] transition-transform duration-[1.5s]" sizes="(max-width: 768px) 100vw, 900px" unoptimized={true} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── SatelliteImage — Thành phần con để fix lỗi React Hook trong map ───
function SatelliteImage({ 
  img, 
  i, 
  isHoveredCenter, 
  scrollSmooth,
  resolvedSceneWidth
}: { 
  img: string; 
  i: number; 
  isHoveredCenter: boolean; 
  scrollSmooth: MotionValue<number>;
  resolvedSceneWidth: number;
}) {
  const half = resolvedSceneWidth * 0.35;
  const mw = resolvedSceneWidth * 0.22;
  const mh = mw * (9 / 16);

  const idlePositions = [
    { x: -half - 40, y: -160, rotate: -8, opacity: 0.82, floatAmp: 12, floatDur: 4.2 },
    { x: -half + 20, y: 150, rotate: 12, opacity: 0.68, floatAmp: 15, floatDur: 4.8 },
    { x: -half - 80, y: 30, rotate: -4, opacity: 0.74, floatAmp: 10, floatDur: 5.2 },
    { x: -half + 10, y: -280, rotate: 7, opacity: 0.58, floatAmp: 14, floatDur: 4.5 },
    { x: half + 40, y: -140, rotate: 6, opacity: 0.85, floatAmp: 11, floatDur: 3.8 },
    { x: half - 20, y: 170, rotate: -10, opacity: 0.65, floatAmp: 16, floatDur: 5.0 },
    { x: half + 70, y: 50, rotate: 5, opacity: 0.72, floatAmp: 13, floatDur: 5.5 },
    { x: half - 10, y: -260, rotate: -5, opacity: 0.55, floatAmp: 9, floatDur: 4.1 },
  ];

  const collagePositions = [
    { x: -mw * 0.70, y: -mh * 0.75, rotate: -12, scale: 0.60 },
    { x: mw * 0.65, y: -mh * 0.68, rotate: 8, scale: 0.56 },
    { x: -mw * 0.72, y: mh * 0.70, rotate: 13, scale: 0.58 },
    { x: mw * 0.68, y: mh * 0.72, rotate: -7, scale: 0.60 },
    { x: -mw * 0.22, y: -mh * 0.92, rotate: -5, scale: 0.50 },
    { x: mw * 0.28, y: mh * 0.90, rotate: 6, scale: 0.50 },
    { x: -mw * 0.50, y: mh * 0.22, rotate: -14, scale: 0.46 },
    { x: mw * 0.45, y: -mh * 0.30, rotate: 9, scale: 0.48 },
  ];

  const idle = idlePositions[i % idlePositions.length];
  const col = collagePositions[i % collagePositions.length];
  const parallaxOffset = (i % 3 + 1) * 60;
  
  // Gọi useTransform đúng quy tắc Hook
  const scrollY = useTransform(scrollSmooth, [0, 1], [parallaxOffset, -parallaxOffset]);

  return (
    <motion.div 
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" 
      style={{ y: scrollY }}
    >
      <motion.div
        initial={{ 
          opacity: 0, 
          x: idle.x * 1.2, 
          y: idle.y * 1.2,
          scale: 0.8
        }}
        animate={{
          opacity: isHoveredCenter ? 0.92 : idle.opacity,
          x: isHoveredCenter ? col.x : idle.x,
          y: isHoveredCenter ? col.y : idle.y - idle.floatAmp,
          rotate: isHoveredCenter ? col.rotate : idle.rotate,
          scale: isHoveredCenter ? col.scale : 1,
        }} 
        transition={{ 
          duration: isHoveredCenter ? 0.8 : idle.floatDur,
          ease: [0.22, 1, 0.36, 1],
          repeat: isHoveredCenter ? 0 : Infinity,
          repeatType: "mirror"
        }}
      >
        <div className="relative w-[12rem] md:w-[18rem] aspect-video rounded-[1.4rem] overflow-hidden border border-white/15 shadow-2xl bg-[#0a0a0a]">
          <Image src={img} alt="" fill className="object-cover opacity-80" sizes="320px" unoptimized={true} />
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── StackedScrollingGallery — Background scroll (Layer 1) & Masterpiece (Layer 3) ───
export function StackedScrollingGallery({
  images,
  onImageClick,
}: {
  images: string[];
  onImageClick?: (index: number) => void;
  caseColor: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHoveredCenter, setIsHoveredCenter] = useState(false);
  const [sceneWidth, setSceneWidth] = useState(0);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);
  const ambientX = useTransform(mouseXSpring, [-0.5, 0.5], [-40, 40]);
  const ambientY = useTransform(mouseYSpring, [-0.5, 0.5], [-40, 40]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const scrollSmooth = useSpring(scrollYProgress, { stiffness: 60, damping: 25 });

  useEffect(() => {
    if (!ref.current || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry) setSceneWidth(entry.contentRect.width);
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  if (!images || images.length === 0) return null;

  const mainImageIdx = images.length - 1; 
  const mainImage = images[mainImageIdx];
  const satelliteImages = images.slice(0, mainImageIdx);
  
  const resolvedSceneWidth = sceneWidth || (typeof window !== 'undefined' ? window.innerWidth : 1400);

  return (
    <div ref={ref} onMouseMove={(e) => {
      const rect = ref.current!.getBoundingClientRect();
      x.set((e.clientX - rect.left) / rect.width - 0.5);
      y.set((e.clientY - rect.top) / rect.height - 0.5);
    }} onMouseLeave={() => { x.set(0); y.set(0); setIsHoveredCenter(false); }} onMouseEnter={() => setIsHoveredCenter(true)} className="relative w-full min-h-[60vh] md:min-h-[75vh] py-8 md:py-12 overflow-visible flex items-center justify-center">
      <div className="absolute inset-0 pointer-events-none">
        {satelliteImages.map((img, i) => (
          <SatelliteImage 
            key={i}
            img={img}
            i={i}
            isHoveredCenter={isHoveredCenter}
            scrollSmooth={scrollSmooth}
            resolvedSceneWidth={resolvedSceneWidth}
          />
        ))}
      </div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }} 
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} 
        className="relative w-[86vw] md:w-[52vw] lg:w-[50vw] aspect-video z-20 cursor-pointer group" 
        onClick={() => onImageClick?.(mainImageIdx)}
      >
        <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative w-full h-full">
          <div className="relative w-full h-full rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/30 shadow-2xl bg-black/40" style={{ transform: "translateZ(50px)" }}>
            <Image src={mainImage} alt="" fill className="object-cover transition-transform duration-[6s] group-hover:scale-110" unoptimized={true} priority />
            <div className="absolute bottom-10 left-10 md:bottom-14 md:left-14 max-w-lg" style={{ transform: "translateZ(60px)" }}>
              <h4 className="font-heading text-3xl md:text-5xl text-white font-bold leading-[1.1] mb-4">Dream Talent <br className="hidden md:block"/>Celebration</h4>
            </div>
          </div>
        </motion.div>
        <motion.div className="absolute -inset-24 bg-accent/20 blur-[150px] -z-10" animate={{ scale: isHoveredCenter ? 1.4 : 1, opacity: isHoveredCenter ? 0.8 : 0.4 }} style={{ x: ambientX, y: ambientY }} />
      </motion.div>
    </div>
  );
}

export function CreativeGallery({ 
  items, 
  color = "#ff4000" 
}: { 
  items: any[]; 
  color?: string;
}) {
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  if (!items || items.length === 0) return null;

  return (
    <div ref={containerRef} className="mt-24 md:mt-32">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        className="flex items-center gap-4 mb-12"
      >
        <div className="w-12 h-[1px]" style={{ backgroundColor: color }} />
        <h3 className="font-heading text-2xl md:text-3xl font-bold text-white uppercase tracking-tight">Creative Production Log</h3>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {items.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: idx * 0.05 }}
            className="group relative aspect-square rounded-2xl overflow-hidden bg-white/[0.02] border border-white/5 cursor-pointer"
            onClick={() => setLightbox({ images: items.map(i => i.thumbnail), index: idx })}
          >
            <Image 
              src={item.thumbnail} 
              alt={item.caption} 
              fill 
              className="object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" 
              sizes="(max-width: 768px) 50vw, 300px"
              unoptimized={true}
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
              <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest block mb-1">{item.platform}</span>
              <p className="font-body text-[11px] font-bold text-white leading-tight truncate">{item.caption}</p>
            </div>

            {item.type === "video-thumbnail" && (
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {lightbox && (
          <FullscreenLightbox 
            images={lightbox.images} 
            initialIndex={lightbox.index} 
            onClose={() => setLightbox(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
