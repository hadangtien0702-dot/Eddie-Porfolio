"use client";

// ─── Case Study Section ───
// Mô tả: Section cho nhà tuyển dụng chọn case study muốn xem
// 2 card lớn: Thinksmart Insurance + Dream Talent
// Click → mở inline storytelling với Impact Hero, Timeline, Gallery, Testimonial
// Mỗi div có ID rõ ràng theo vị trí component
// Data: import từ data/casestudy.ts

import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence, useTransform, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import {
  ContextCard,
  ContextProfileCard,
  FunnelChart,
  CPAChallengeChart,
  SystemDashboard,
  RevenueChart,
  SocialBars,
} from "./CaseStudyCharts";
import {
  caseStudies,
  caseStudyHeading,
  type CaseStudy as CaseStudyType,
  type CaseStudySection as CaseStudySectionType,
  type CreativeWorkItem,
} from "@/data/casestudy";

// ─── Universal Lightbox Modal ───
// ─── Universal Lightbox Modal (Creative HUD Redesign) ───
function FullscreenLightbox({
  images,
  initialIndex,
  onClose,
}: {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [showUI, setShowUI] = useState(true);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setCurrentIndex((p) => (p + 1) % images.length);
      if (e.key === "ArrowLeft") setCurrentIndex((p) => (p - 1 + images.length) % images.length);
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images.length, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] bg-black/98 flex items-center justify-center overflow-hidden"
      onClick={onClose}
    >
      {/* ─── Ambient Backdrop ─── */}
      <div className="absolute inset-0 pointer-events-none opacity-20 transition-opacity duration-1000"
        style={{ background: `radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)` }} />
      
      {/* ─── TECHNICAL VIEWPORT ACCENTS (Corners) ─── */}
      <div className="absolute inset-4 md:inset-10 border border-white/[0.03] pointer-events-none z-10 transition-opacity duration-500"
           style={{ opacity: showUI ? 1 : 0 }}>
        {/* Top-Left */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/20" />
        {/* Top-Right */}
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/20" />
        {/* Bottom-Left */}
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/20" />
        {/* Bottom-Right */}
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/20" />
        
        {/* Scanning Line Effect */}
        <motion.div 
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-[1px] bg-white/5 z-0"
        />
      </div>

      {/* ─── NAVIGATION BUTTONS ─── */}
      <AnimatePresence>
        {showUI && (
          <>
            <motion.button 
              initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}
              onClick={(e) => { e.stopPropagation(); setCurrentIndex((p) => (p - 1 + images.length) % images.length); }} 
              className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 w-16 h-16 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white border border-white/5 transition-all z-[110]"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </motion.button>

            <motion.button 
              initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 20, opacity: 0 }}
              onClick={(e) => { e.stopPropagation(); setCurrentIndex((p) => (p + 1) % images.length); }} 
              className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 w-16 h-16 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white border border-white/5 transition-all z-[110]"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </motion.button>
            
            <motion.button 
              initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/20 text-white border border-white/10 transition-colors z-[110]"
              onClick={onClose}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </motion.button>
          </>
        )}
      </AnimatePresence>

      {/* ─── MAIN IMAGE DISPLAY ─── */}
      <motion.div
         key={currentIndex}
         initial={{ opacity: 0, scale: 0.9, y: 10 }}
         animate={{ opacity: 1, scale: 1, y: 0 }}
         exit={{ opacity: 0, scale: 1.1 }}
         transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
         className="relative w-full h-[65vh] md:h-[75vh] max-w-6xl z-0 pointer-events-none px-4"
         onClick={(e) => e.stopPropagation()}
      >
        <Image 
          src={images[currentIndex]} 
          alt={`Visual ${currentIndex + 1}`} 
          fill 
          className="object-contain" 
          sizes="90vw" 
          quality={100} 
          priority 
        />
      </motion.div>

      {/* ─── BOTTOM HUD (Thumbnails + Index) ─── */}
      <AnimatePresence>
        {showUI && (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="absolute bottom-6 md:bottom-12 left-0 right-0 z-[110] flex flex-col items-center gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Filmstrip Thumbnails */}
            <div className="flex gap-3 px-6 py-4 rounded-3xl bg-black/40 border border-white/10 backdrop-blur-xl max-w-[90vw] overflow-x-auto no-scrollbar scroll-smooth shadow-2xl">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative flex-shrink-0 w-16 h-10 md:w-24 md:h-14 rounded-lg overflow-hidden border-2 transition-all duration-300 ${currentIndex === idx ? 'border-accent scale-110 shadow-[0_0_15px_rgba(255,87,51,0.5)]' : 'border-transparent opacity-40 hover:opacity-100'}`}
                >
                  <Image src={img} alt="" fill className="object-cover" sizes="100px" />
                </button>
              ))}
            </div>

            {/* Information Badge */}
            <div className="flex items-center gap-4 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
              <span className="font-heading font-bold text-[13px] text-accent tracking-tighter">
                {String(currentIndex + 1).padStart(2, "0")}
              </span>
              <div className="h-4 w-[1px] bg-white/10" />
              <span className="font-body text-[10px] text-white/40 uppercase tracking-[0.2em]">
                CULTURAL VISUALS
              </span>
              <div className="h-4 w-[1px] bg-white/10" />
              <span className="font-body text-[10px] text-white/60 tracking-wider">
                {images.length} TOTAL
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* ─── TOGGLE UI VISIBILITY BUTTON ─── */}
      <button 
        onClick={(e) => { e.stopPropagation(); setShowUI(!showUI); }}
        className="absolute bottom-4 right-4 w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-white/20 transition-colors z-[120]"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
      </button>

    </motion.div>
  );
}

// ─── EditorialGallery — Bố cục Overlapping Magazine Collage ───
function EditorialGallery({
  images,
  onImageClick,
  videoUrl,
  videoPoster,
  color = "rgba(255,255,255,0.1)",
}: {
  images: string[];
  onImageClick?: (index: number) => void;
  videoUrl?: string;
  videoPoster?: string;
  color?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  if (!images || images.length < 3) return null;

  return (
    <div ref={ref} className="mb-32 md:mb-48 relative z-10 w-full pt-10 px-0 md:px-12 flex justify-center">
      <div className="relative w-full max-w-[1100px] aspect-[4/3] md:aspect-[16/9] mx-auto">
        
        {/* Main Base Layer — Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 md:inset-x-12 md:inset-y-0 rounded-[2rem] overflow-hidden group border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10"
        >
          <div className="relative w-full h-full cursor-pointer" onClick={() => onImageClick?.(0)}>
            <Image src={images[0]} alt="Feature event coverage" fill className="object-cover group-hover:scale-[1.04] transition-transform duration-[1.5s]" sizes="(max-width: 768px) 100vw, 80vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-8 left-8 z-20 px-5 py-2.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-md">
              <span className="font-body text-[12px] font-semibold tracking-widest text-white uppercase drop-shadow-md">FEATURED MOMENT</span>
            </div>
          </div>
        </motion.div>

        {/* Floating Polaroid 1 (Bottom Left) */}
        <motion.div
          initial={{ opacity: 0, x: -50, y: 50, rotate: -15 }}
          animate={isInView ? { opacity: 1, x: 0, y: 0, rotate: -3 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.05, rotate: -1, zIndex: 40 }}
          className="absolute -bottom-8 md:-bottom-16 -left-2 md:-left-4 w-[55%] md:w-[45%] aspect-[4/3] rounded-[1.5rem] overflow-hidden border-[6px] md:border-[8px] border-[#FBFBFB] shadow-[0_30px_60px_rgba(0,0,0,0.6)] cursor-pointer z-20 origin-bottom-left"
          onClick={() => onImageClick?.(1)}
        >
          <Image src={images[1]} alt="Detail 1" fill className="object-cover" sizes="(max-width: 768px) 50vw, 30vw" />
        </motion.div>

        {/* Floating Polaroid 2 (Bottom Right) */}
        <motion.div
          initial={{ opacity: 0, x: 50, y: 50, rotate: 15 }}
          animate={isInView ? { opacity: 1, x: 0, y: 0, rotate: 4 } : {}}
          transition={{ duration: 1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.05, rotate: 1, zIndex: 40 }}
          className="absolute -bottom-6 md:-bottom-10 -right-2 md:-right-8 w-[45%] md:w-[35%] aspect-[3/4] md:aspect-[4/3] rounded-[1.5rem] overflow-hidden border-[6px] md:border-[8px] border-[#111] shadow-[0_30px_60px_rgba(0,0,0,0.8)] cursor-pointer z-30 origin-bottom-right"
          onClick={() => onImageClick?.(2)}
        >
          <Image src={images[2]} alt="Detail 2" fill className="object-cover" sizes="(max-width: 768px) 50vw, 30vw" />
        </motion.div>
      </div>
    </div>
  );
}

// ─── HorizontalFilmstrip — Thanh trượt ngang điện ảnh ───
function HorizontalFilmstrip({ images, onImageClick }: { images: string[]; onImageClick?: (index: number) => void }) {
  if (!images || images.length === 0) return null;
  return (
    <div className="relative w-full mb-16 md:mb-24">
      {/* Scrollable Container with Hidden Scrollbars */}
      <div className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-12 pt-6 px-1 md:px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
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
            {/* Cinematic Gradient Hover */}
            <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            
            <Image
              src={src}
              alt={`Filmstrip image ${idx + 1}`}
              fill
              className="object-cover group-hover:scale-[1.03] transition-transform duration-[1.5s] ease-[0.22,1,0.36,1]"
              sizes="(max-width: 768px) 100vw, 80vw"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── BentoMasonry — Lưới đa dạng cho sự kiện sôi động ───
// ─── BentoMasonry — Dải ảnh hàng ngang tập trung (Linear Focus Strip) ───
function BentoMasonry({ images, onImageClick }: { images: string[]; onImageClick?: (index: number) => void }) {
  if (!images || images.length === 0) return null;
  
  // Chúng ta có 9 ảnh: 1 Master (Tập thể) + 8 ảnh vệ tinh
  const masterIdx = images.length - 1; // Giả định tấm cuối là tấm tập thể
  const masterImage = images[masterIdx];
  const sideImages = images.slice(0, masterIdx);
  
  // Chia 8 ảnh vệ tinh thành 2 bên: 4 trái - 4 phải
  const leftSide = sideImages.slice(0, 4);
  const rightSide = sideImages.slice(4, 8);

  return (
    <div className="mb-24 md:mb-44 w-full pt-12 overflow-hidden">
      <div className="relative w-full overflow-x-auto no-scrollbar pb-8">
        <div className="flex items-center gap-4 md:gap-6 px-[5vw] min-w-max">
          {/* ── Left Satellites (4 images) ── */}
          {leftSide.map((src, idx) => (
            <motion.div
              key={`left-${idx}`}
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * idx }}
              className="relative w-32 h-20 md:w-56 md:h-36 rounded-2xl overflow-hidden group cursor-pointer shadow-lg opacity-40 hover:opacity-100 transition-opacity"
              onClick={() => onImageClick?.(idx)}
            >
              <Image src={src} alt="" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-black/20" />
            </motion.div>
          ))}

          {/* ── THE CENTER MASTERPIECE ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="relative w-[70vw] md:w-[60vw] aspect-video md:aspect-[16/8] rounded-[3rem] overflow-hidden group cursor-pointer shadow-[0_40px_120px_rgba(0,0,0,0.6)] z-10 border border-white/[0.05]"
            onClick={() => onImageClick?.(masterIdx)}
          >
            <Image src={masterImage} alt="Master Group" fill className="object-cover transition-transform duration-[3s] group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-8 left-10">
               <span className="font-heading text-[10px] text-accent tracking-[0.4em] uppercase mb-1 block">Full_Team_Capture</span>
               <h4 className="font-heading text-xl md:text-3xl text-white font-bold">Dream Talent Celebration</h4>
            </div>
          </motion.div>

          {/* ── Right Satellites (4 images) ── */}
          {rightSide.map((src, idx) => (
            <motion.div
              key={`right-${idx}`}
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * idx }}
              className="relative w-32 h-20 md:w-56 md:h-36 rounded-2xl overflow-hidden group cursor-pointer shadow-lg opacity-40 hover:opacity-100 transition-opacity"
              onClick={() => onImageClick?.(idx + 4)}
            >
              <Image src={src} alt="" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-black/20" />
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Visual Indicator */}
      <div className="mt-4 flex justify-center">
         <div className="w-24 h-[1px] bg-white/10 relative overflow-hidden">
            <motion.div 
               animate={{ x: ["-100%", "100%"] }}
               transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
               className="absolute top-0 left-0 w-1/3 h-full bg-accent"
            />
         </div>
      </div>
    </div>
  );
}

// ─── StackedScrollingGallery — Background scroll (Layer 1) & Masterpiece (Layer 3) ───
function StackedScrollingGallery({
  images,
  onImageClick,
  caseColor
}: {
  images: string[];
  onImageClick?: (index: number) => void;
  caseColor: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isHoveredCenter, setIsHoveredCenter] = useState(false);
  
  // ── Physics for 3D Tilt & Parallax ──
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  if (!images || images.length === 0) return null;

  // Split images: 1 main centerpiece, others are satellites
  const mainImageIdx = images.length - 1; 
  const mainImage = images[mainImageIdx];
  const satelliteImages = images.slice(0, mainImageIdx);

  // Define static positions for satellites
  // Added 'pullX/pullY' for the gravity effect towards center
  const satellites = satelliteImages.map((img, i) => {
    const positions = [
      { top: "0%", left: "10%", size: "w-24 md:w-48", depth: 30, delay: 0.1, rotate: -5, pullX: "10%", pullY: "15%" },
      { top: "15%", left: "-5%", size: "w-20 md:w-36", depth: -20, delay: 0.2, rotate: 8, blur: "blur-[1px]", pullX: "15%", pullY: "10%" },
      { top: "60%", left: "0%", size: "w-28 md:w-52", depth: 40, delay: 0.3, rotate: -3, pullX: "12%", pullY: "-15%" },
      { top: "5%", right: "12%", size: "w-28 md:w-44", depth: 15, delay: 0.4, rotate: 6, pullX: "-10%", pullY: "15%" },
      { top: "25%", right: "0%", size: "w-20 md:w-32", depth: -40, delay: 0.5, rotate: -10, blur: "blur-[2px]", pullX: "-20%", pullY: "5%" },
      { top: "65%", right: "5%", size: "w-32 md:w-48", depth: 60, delay: 0.6, rotate: 4, pullX: "-15%", pullY: "-20%" },
      { bottom: "0%", left: "20%", size: "w-24 md:w-40", depth: 10, delay: 0.7, rotate: -12, pullX: "5%", pullY: "-20%" },
      { bottom: "5%", right: "15%", size: "w-28 md:w-44", depth: -15, delay: 0.8, rotate: 7, blur: "blur-[1px]", pullX: "-10%", pullY: "-25%" },
    ];
    return { 
      img, 
      ...positions[i % positions.length], 
      key: `sat-${i}`
    };
  });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;
    x.set(mouseX);
    y.set(mouseY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    setIsHoveredCenter(false);
  }

  return (
    <div 
      ref={ref} 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[60vh] md:min-h-[80vh] py-12 md:py-20 overflow-visible flex items-center justify-center transition-all duration-1000"
    >
      {/* ─── THE COSMIC ORBIT (Satellite Images - Tightened) ─── */}
      <div className="absolute inset-0 pointer-events-none overflow-visible">
        {satellites.map((sat, i) => (
          <motion.div
            key={sat.key}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { 
              opacity: isHoveredCenter ? 0.9 : 0.4, 
              scale: isHoveredCenter ? 1.05 : 0.85,
              x: isHoveredCenter ? sat.pullX : 0, 
              y: isHoveredCenter ? sat.pullY : 0,
              filter: isHoveredCenter ? 'grayscale(0%)' : 'grayscale(100%)'
            } : {}}
            transition={{ 
              type: "spring", 
              stiffness: isHoveredCenter ? 60 : 40, 
              damping: 20,
              delay: isInView && !isHoveredCenter ? sat.delay : 0,
              duration: 0.8
            }}
            className={`absolute ${sat.size} aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl z-0 ${!isHoveredCenter ? sat.blur : ""}`}
            style={{
              top: sat.top,
              left: sat.left,
              right: sat.right,
              bottom: sat.bottom,
              rotate: sat.rotate,
              // Parallax movement (additive)
              translateX: useTransform(mouseXSpring, [-0.5, 0.5], [-sat.depth, sat.depth]),
              translateY: useTransform(mouseYSpring, [-0.5, 0.5], [-sat.depth, sat.depth]),
            }}
          >
            <Image 
              src={sat.img} 
              alt="" 
              fill 
              className="object-cover transition-all duration-1000" 
            />
            {/* Soft Overlay that fades on hover */}
            <div className={`absolute inset-0 bg-black/40 transition-opacity duration-700 ${isHoveredCenter ? 'opacity-0' : 'opacity-40'}`} />
          </motion.div>
        ))}
      </div>

      {/* ─── THE CENTER MASTERPIECE (3D Tilt & Scanline) ─── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 30 }}
        animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        onMouseEnter={() => setIsHoveredCenter(true)}
        className="relative w-[85vw] md:w-[50vw] aspect-video md:aspect-[16/9] z-20 cursor-pointer group"
        onClick={() => onImageClick?.(mainImageIdx)}
        style={{ perspective: "1500px" }}
      >
        <motion.div
           className="relative w-full h-full"
           style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        >
          {/* Main Image Container */}
          <div className="relative w-full h-full rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/30 shadow-[0_50px_100px_rgba(0,0,0,0.9)] bg-black/40" style={{ transform: "translateZ(50px)" }}>
             <Image 
               src={mainImage} 
               alt="Main celebration" 
               fill 
               className="object-cover transition-transform duration-[6s] group-hover:scale-110" 
               priority 
               sizes="60vw" 
             />
             
             {/* HUD Overlays & Cinematic Gradients */}
             <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/20 opacity-90 transition-opacity duration-700 group-hover:opacity-70" />
             
             {/* Scanning Line Effect (Interactive) */}
             <motion.div 
                animate={{ top: ["-10%", "110%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-[2px] bg-white/20 blur-[1px] z-10 opacity-0 group-hover:opacity-100"
             />

             {/* Bottom Content */}
             <div className="absolute bottom-10 left-10 md:bottom-14 md:left-14 max-w-lg" style={{ transform: "translateZ(60px)" }}>
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 1.2 }}
                  className="flex items-center gap-2 mb-4"
                >
                  <div className="w-4 h-[1px] bg-accent" />
                  <span className="font-heading text-[10px] md:text-[12px] text-accent tracking-[0.4em] uppercase font-bold">
                    CULTURAL_HERITAGE_01
                  </span>
                </motion.div>
                <h4 className="font-heading text-3xl md:text-5xl text-white font-bold leading-[1.1] tracking-tighter mb-4">
                  Dream Talent <br className="hidden md:block"/>Celebration
                </h4>
                <div className="flex items-center gap-3 text-white/40 font-body text-[11px] uppercase tracking-widest">
                   <span className="px-2 py-0.5 rounded border border-white/10">YEP_2024</span>
                   <span className="w-1 h-1 rounded-full bg-white/20" />
                   <span>4K CINEMATIC</span>
                </div>
             </div>

             {/* HUD Viewport Markers */}
             <div className="absolute top-10 left-10 w-16 h-16 border-t-[1px] border-l-[1px] border-white/20" style={{ transform: "translateZ(40px)" }} />
             <div className="absolute top-10 right-10 w-16 h-16 border-t-[1px] border-r-[1px] border-white/20" style={{ transform: "translateZ(40px)" }} />
             
             {/* Metadata Reveal on Hover */}
             <div className="absolute top-10 right-14 text-right opacity-0 group-hover:opacity-100 transition-opacity duration-700 hidden md:block" style={{ transform: "translateZ(50px)" }}>
                <p className="font-mono text-[10px] text-white/40 uppercase tracking-tighter mb-1">OPTICS: 35MM PREMIUM PRIME</p>
                <p className="font-mono text-[10px] text-accent font-bold uppercase tracking-tighter">DATA: ENC_4K_LOG_01</p>
             </div>
          </div>
        </motion.div>

        {/* Dynamic Ambient Glow (Stronger on Hover) */}
        <motion.div 
          className="absolute -inset-24 bg-accent/20 blur-[150px] -z-10" 
          animate={{ scale: isHoveredCenter ? 1.4 : 1, opacity: isHoveredCenter ? 0.8 : 0.4 }}
          style={{ 
            x: useTransform(mouseXSpring, [-0.5, 0.5], [-40, 40]), 
            y: useTransform(mouseYSpring, [-0.5, 0.5], [-40, 40]),
          }}
        />
      </motion.div>

      {/* Decorative Spatial Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0" 
           style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: "40px 40px" }} />
    </div>
  );
}







// ─── IncentivesBlock — Hiển thị bộ sưu tập phần thưởng dạng Marquee (Cuộn vô tận) ───
function IncentivesBlock({ 
  rewards, 
  color 
}: { 
  rewards: { title: string; image: string }[]; 
  color: string 
}) {
  // Split rewards into two rows for variety
  const midPoint = Math.ceil(rewards.length / 2);
  const row1 = rewards.slice(0, midPoint);
  const row2 = rewards.slice(midPoint);

  return (
    <div className="relative z-10 mb-24 overflow-hidden -mx-4 md:-mx-12">
      <div className="flex items-center gap-3 mb-10 px-4 md:px-12">
        <div className="w-12 h-[1px]" style={{ backgroundColor: color }} />
        <span className="font-body text-[12px] font-bold uppercase tracking-[0.25em] text-white/40">
          Executive Rewards Repository
        </span>
      </div>

      <div className="space-y-6 md:space-y-8">
        {/* Row 1: Left to Right */}
        <div className="relative flex overflow-hidden">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex gap-4 md:gap-6 whitespace-nowrap"
          >
            {[...row1, ...row1].map((reward, idx) => (
              <RewardCard key={idx} reward={reward} color={color} />
            ))}
          </motion.div>
        </div>

        {/* Row 2: Right to Left */}
        <div className="relative flex overflow-hidden">
          <motion.div 
            animate={{ x: ["-50%", "0%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="flex gap-4 md:gap-6 whitespace-nowrap"
          >
            {[...row2, ...row2].map((reward, idx) => (
              <RewardCard key={idx} reward={reward} color={color} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Side Fades for depth */}
      <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-[#030303] to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-[#030303] to-transparent z-20 pointer-events-none" />
    </div>
  );
}

// Sub-component for individual reward cards in the marquee
function RewardCard({ reward, color }: { reward: any, color: string }) {
  return (
    <div className="relative group w-[220px] md:w-[320px] aspect-[16/8] rounded-xl md:rounded-2xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-md transition-all duration-500 hover:border-white/30">
      <Image 
        src={reward.image} 
        alt={reward.title} 
        fill 
        className="object-cover grayscale-50 group-hover:grayscale-0 transition-all duration-700" 
        sizes="320px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40" />
      
      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 z-30">
        <h4 className="font-heading font-bold text-white text-[10px] md:text-[12px] truncate">
          {reward.title}
        </h4>
      </div>
      
      {/* HUD Accents */}
      <div className="absolute top-2 right-2 border-[0.5px] border-white/20 px-1.5 py-0.5 rounded text-[8px] text-white/30 uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
        Value_Asset
      </div>
    </div>
  );
}

// ─── FeaturedVideo — Khung phát video điện ảnh ───
function FeaturedVideo({ 
  src, 
  poster, 
  color,
  isEmbedded = false
}: { 
  src: string; 
  poster?: string; 
  color: string;
  isEmbedded?: boolean;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className={isEmbedded ? "w-full h-full" : "relative z-10 mb-16 md:mb-24 group"}>
      <div 
        className={`relative w-full h-full overflow-hidden cursor-pointer ${!isEmbedded ? 'aspect-[16/9] rounded-[2rem] border border-white/10 bg-black/40 shadow-2xl backdrop-blur-sm' : ''}`}
        onClick={togglePlay}
      >
        <video
          ref={videoRef}
          src={src}
          className="w-full h-full object-cover"
          loop
          muted={!isPlaying}
          playsInline
        />

        {/* Optimized Poster Overlay */}
        {poster && !isPlaying && (
          <div className="absolute inset-0 z-10">
            <Image
              src={poster}
              alt="Video Thumbnail"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
              quality={90}
            />
          </div>
        )}

        {/* Overlay — visible when paused or on hover */}
        <AnimatePresence>
          {!isPlaying && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 flex items-center justify-center z-20"
            >
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                style={{ 
                  backgroundColor: "rgba(255,255,255,0.15)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  backdropFilter: "blur(12px)"
                }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white" className="ml-1">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ambient Glow */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-30 transition-opacity duration-1000"
          style={{ 
            boxShadow: `inset 0 0 100px ${color}`
          }}
        />
        
        {/* Label Bottom */}
        <div className="absolute bottom-6 left-6 z-30">
          <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-black/40 backdrop-blur-md">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: color }} />
            <span className="font-body text-[11px] font-bold uppercase tracking-widest text-white/70">Featured Project Film</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── StorySection — mỗi section trong storytelling ───
function StorySection({
  section,
  caseColor,
  isLast,
  onImageClick,
}: {
  section: CaseStudySectionType;
  caseColor: string;
  isLast: boolean;
  onImageClick?: (index: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const num = String(section.number).padStart(2, "0");

  return (
    <motion.div
      ref={ref}
      id={section.id}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative py-24 md:py-32"
    >
      {/* ─── Giant decorative number — massive, gradient fade ─── */}
      <motion.div
        id={`${section.id}-deco-number`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -top-4 -right-4 md:right-0 pointer-events-none select-none overflow-hidden"
      >
        <span
          className="font-heading text-[200px] md:text-[300px] lg:text-[380px] font-bold leading-none"
          style={{
            background: `linear-gradient(180deg, ${caseColor}12, transparent)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {num}
        </span>
      </motion.div>

      {/* ─── Section label — accent pill badge ─── */}
      <motion.div
        id={`${section.id}-header`}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex items-center gap-4 mb-8"
      >
        <span
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full
                   font-body text-[13px] font-semibold uppercase tracking-[0.15em]
                   border"
          style={{
            color: caseColor,
            borderColor: `${caseColor}30`,
            backgroundColor: `${caseColor}08`,
          }}
        >
          <span className="font-heading font-bold">{num}</span>
          <span className="w-1 h-1 rounded-full" style={{ backgroundColor: caseColor }} />
          <span>{section.title}</span>
        </span>
      </motion.div>

      {/* ─── Headline — MASSIVE, Clash Display ─── */}
      <div id={`${section.id}-headline`} className="relative z-10 mb-5 max-w-5xl">
        {section.headline.split("\n").map((line, i) => (
          <motion.h3
            key={i}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.9,
              delay: 0.15 + i * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="font-heading text-[clamp(36px,6vw,80px)] font-bold text-white leading-[1.05] tracking-[-0.02em]"
          >
            {line}
          </motion.h3>
        ))}
      </div>

      {/* ─── Subtitle — Inter, accent tint ─── */}
      {section.subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 font-body text-[15px] md:text-[17px] uppercase tracking-[0.1em]
                   mb-12 md:mb-16"
          style={{ color: `${caseColor}90` }}
        >
          {section.subtitle}
        </motion.p>
      )}

      {/* ─── Body text — large, readable ─── */}
      <motion.div
        id={`${section.id}-body`}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-4xl lg:max-w-5xl mb-14 group cursor-default"
        style={{ '--case-color': caseColor } as React.CSSProperties}
      >
        <p className="font-body text-[18px] md:text-[21px] text-white/60 transition-colors duration-500 group-hover:text-white/75 leading-[1.9]">
          {section.body.split(/(\$[0-9.,]+M?(?:\s*[-–]\s*\$[0-9.,]+M?)?)/g).map((part, i) => {
            if (part && part.startsWith("$")) {
              return (
                <span 
                  key={i} 
                  className="font-semibold text-white/80 px-0.5 transition-all duration-700 group-hover:text-white group-hover:drop-shadow-[0_0_12px_var(--case-color)]" 
                >
                  {part}
                </span>
              );
            }
            return part;
          })}
        </p>
      </motion.div>

      {/* ─── Stats Cards — Borderless Typographic Style ─── */}
      {section.stats && section.stats.length > 0 && (
        <div
          id={`${section.id}-stats`}
          className="relative z-10 max-w-5xl mb-16 flex flex-col sm:flex-row gap-y-10 sm:gap-y-0 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.08]"
        >
          {section.stats.map((stat, i) => {
            const isMission = stat.label.toLowerCase().includes("mission");
            const isWarning = stat.label.toLowerCase().includes("cpa");
            const statAccent = isWarning ? "#ef4444" : isMission ? caseColor : "rgba(255,255,255,0.4)";

            return (
              <motion.div
                key={stat.label}
                id={`${section.id}-stat-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.3 + i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative flex-1 sm:px-8 py-4 sm:py-0 first:pl-0 last:pr-0 flex flex-col justify-center group"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full opacity-60" style={{ backgroundColor: statAccent }} />
                  <span className="font-body text-[11px] uppercase tracking-[0.15em]" style={{ color: statAccent }}>
                    {stat.label}
                  </span>
                </div>
                <span
                  className="font-heading font-bold block leading-none"
                  style={{
                    fontSize: isMission ? "clamp(24px, 3.5vw, 32px)" : "clamp(32px, 5vw, 48px)",
                    background: isWarning
                      ? "linear-gradient(160deg, #FF8080 0%, #FF4000 55%, #CC2200 100%)"
                      : isMission
                      ? `linear-gradient(160deg, #ffffff 0%, ${caseColor} 100%)`
                      : "linear-gradient(160deg, #FFFFFF 0%, rgba(255,255,255,0.5) 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    color: "transparent",
                  }}
                >
                  {stat.value}
                </span>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* ─── Interactive Chart — in glass frame ─── */}
      {section.visualType && (
        <motion.div
          id={`${section.id}-visual`}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className={
            section.visualType === "context" || section.visualType === "workflow"
              ? "relative z-10 mb-14"
              : "relative z-10 mb-14 p-6 md:p-10 rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm"
          }
        >
          {/* Top accent line */}
          {(section.visualType !== "context" && section.visualType !== "workflow") && (
            <div
              className="absolute top-0 left-8 right-8 h-[1px]"
              style={{ background: `linear-gradient(90deg, transparent, ${caseColor}40, transparent)` }}
            />
          )}
          {section.visualType === "context" && <ContextCard color={caseColor} />}
          {section.visualType === "context-profile" && <ContextProfileCard color={caseColor} />}
          {section.visualType === "funnel" && <FunnelChart color={caseColor} />}
          {section.visualType === "cpa-challenge" && <CPAChallengeChart color={caseColor} />}
          {section.visualType === "workflow" && <SystemDashboard color={caseColor} />}
          {section.visualType === "revenue" && <RevenueChart color={caseColor} />}
          {section.visualType === "social" && <SocialBars color={caseColor} />}
        </motion.div>
      )}

      {/* ─── Section Image — hình minh họa bên dưới chart ─── */}
      {section.sectionImage && (
        <motion.div
          id={`${section.id}-section-image`}
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mb-14 rounded-2xl overflow-hidden
                   border border-white/[0.08] bg-white/[0.02]
                   group cursor-default"
        >
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{
              background: `radial-gradient(600px circle at 50% 50%, ${caseColor}08, transparent 70%)`,
            }}
          />
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={section.sectionImage}
              alt={section.sectionImageAlt || `${section.title} visual evidence`}
              fill
              className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-1/4"
              style={{
                background: "linear-gradient(180deg, transparent, rgba(4,4,4,0.6))",
              }}
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 z-10">
            <div className="flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: caseColor }}
              />
              <span className="font-body text-[12px] text-white/50 uppercase tracking-wider">
                {section.title} — Visual Reference
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── Featured Video — cinematic player ─── */}
      {section.videoUrl && (
        <FeaturedVideo 
          src={section.videoUrl} 
          poster={section.videoPoster} 
          color={caseColor} 
        />
      )}

      {/* ─── Editorial Gallery ─── */}
      {section.galleryImages && section.galleryImages.length >= 3 && (
        <EditorialGallery 
          images={section.galleryImages} 
          onImageClick={onImageClick}
        />
      )}

      {/* ─── Rewards/Incentives ─── */}
      {section.rewards && <IncentivesBlock rewards={section.rewards} color={caseColor} />}

      {/* ─── Image fallback ─── */}
      {!section.visualType && !section.sectionImage && section.image && (
        <motion.div
          id={`${section.id}-image`}
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mb-14 rounded-2xl overflow-hidden
                   border border-white/10 bg-surface/50"
        >
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={section.image}
              alt={section.imageAlt || section.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>
        </motion.div>
      )}


      {/* ─── Bullets — clean numbered list ─── */}
      {section.bullets && section.visualType !== "workflow" && (
        <div
          id={`${section.id}-bullets`}
          className="relative z-10 max-w-3xl mb-14 flex flex-col"
        >
          {section.bullets.map((bullet, i) => {
            const parts = bullet.split(" — ");
            const hasTitle = parts.length > 1;
            const title = hasTitle ? parts[0] : null;
            const desc = hasTitle ? parts.slice(1).join(" — ") : bullet;

            return (
              <motion.div
                key={i}
                id={`${section.id}-bullet-${i}`}
                initial={{ opacity: 0, x: -16 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.35 + i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex items-start gap-5 py-5 border-b border-white/[0.06] last:border-b-0"
              >
                {/* Accent dot + number */}
                <span
                  className="flex-shrink-0 font-heading text-[13px] font-bold w-6 pt-0.5 leading-none"
                  style={{ color: `${caseColor}80` }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="flex-1 min-w-0">
                  {title && (
                    <h4 className="font-heading text-[15px] md:text-[16px] font-semibold text-white mb-1 leading-snug">
                      {title}
                    </h4>
                  )}
                  <p className="font-body text-[14px] md:text-[15px] text-white/45 leading-[1.7]">
                    {desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* ─── Closing line — Creative HUD Quote Box ─── */}
      {section.closingLine && (
        <motion.div
          id={`${section.id}-closing`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-4xl mt-12 group"
        >
          {/* Background Glass Plate */}
          <div className="relative p-8 md:p-12 overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-xl">
            
            {/* HUD Corner Accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l opacity-40 transition-all duration-700 group-hover:w-12 group-hover:h-12 group-hover:opacity-100" style={{ borderColor: caseColor }} />
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r opacity-20" style={{ borderColor: 'rgba(255,255,255,0.2)' }} />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l opacity-20" style={{ borderColor: 'rgba(255,255,255,0.2)' }} />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r opacity-40 transition-all duration-700 group-hover:w-12 group-hover:h-12 group-hover:opacity-100" style={{ borderColor: caseColor }} />

            {/* Micro Tracer Line (Bottom) */}
            <div 
              className="absolute bottom-0 left-12 right-12 h-[1px] opacity-10"
              style={{ background: `linear-gradient(90deg, transparent, ${caseColor}, transparent)` }}
            />

            {/* Strategic Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: caseColor }} />
              <span className="font-body text-[10px] uppercase tracking-[0.2em] text-white/50 font-bold">
                Strategic Insight / Ownership
              </span>
            </div>

            {/* Background Quotes Ornament */}
            <div className="absolute -top-6 -left-2 font-heading text-[120px] select-none pointer-events-none opacity-[0.03] italic" style={{ color: caseColor }}>
              &ldquo;
            </div>
            <div className="absolute -bottom-16 -right-2 font-heading text-[120px] select-none pointer-events-none opacity-[0.03] italic" style={{ color: caseColor }}>
              &rdquo;
            </div>

            {/* Quote Text */}
            <p className="relative z-10 font-body text-[18px] md:text-[23px] text-white/90 italic leading-[1.7] tracking-tight">
              &ldquo;{section.closingLine}&rdquo;
            </p>

            {/* Scanning Light Effect */}
            <motion.div 
              animate={{ 
                x: ['-100%', '200%'],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "linear",
                repeatDelay: 2
              }}
              className="absolute inset-0 z-0 pointer-events-none"
              style={{
                background: `linear-gradient(90deg, transparent, ${caseColor}05, transparent)`,
                transform: 'skewX(-20deg)'
              }}
            />
          </div>
        </motion.div>
      )}

      {/* ─── Section divider with dot ornament ─── */}
      {!isLast && (
        <div className="mt-24 md:mt-32 flex items-center gap-4">
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-white/8 to-transparent" />
          <div
            className="w-2 h-2 rounded-full opacity-30"
            style={{ backgroundColor: caseColor }}
          />
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        </div>
      )}
    </motion.div>
  );
}

// Code previously containing ImpactHero, BeforeAfterRow, TimelineStrip has been cleaned up to resolve linter warnings and reduce file size.

// ─── CreativeGallery — grid tác phẩm thực tế ───
function CreativeGallery({
  items,
  color,
}: {
  items: CreativeWorkItem[];
  color: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);

  return (
    <div ref={ref} className="py-20 md:py-28 relative">
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-4"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
          <span className="font-body text-[12px] text-white/35 uppercase tracking-[0.15em]">
            The Creative Work
          </span>
          <div className="flex-1 h-[1px] bg-white/[0.05]" />
        </div>

        <h3 className="font-heading text-[clamp(32px,4vw,56px)] font-bold text-white mb-3">
          Show, don&apos;t tell
        </h3>
        <p className="font-body text-[17px] text-white/50 max-w-2xl mb-12">
          A selection of video creatives, ads, and content produced for this project.
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.5,
              delay: 0.1 + i * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
            onClick={() => item.videoUrl && setActiveVideoUrl(item.videoUrl)}
            className="group relative rounded-2xl overflow-hidden cursor-pointer
                     border border-white/[0.06] hover:border-white/15
                     transition-all duration-500"
          >
            <div className={item.type === "video-thumbnail" ? "aspect-[9/16]" : "aspect-[4/3]"}>
              <Image
                src={item.thumbnail}
                alt={item.caption}
                fill
                className="object-cover group-hover:scale-[1.05] transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>

            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent
                         opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Platform badge */}
            {item.platform && (
              <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full
                           bg-black/60 backdrop-blur-sm
                           font-body text-[11px] text-white/80">
                {item.platform}
              </span>
            )}

            {/* Tag badge */}
            {item.tag && (
              <span
                className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full
                         font-body text-[11px] text-white font-semibold"
                style={{ backgroundColor: `${color}E0` }}
              >
                {item.tag}
              </span>
            )}

            {/* Bottom info */}
            <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 z-10
                         opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="font-body text-[13px] text-white/90 font-medium leading-tight">
                {item.caption}
              </p>
              {item.metric && (
                <p className="font-heading text-[14px] font-bold mt-1" style={{ color }}>
                  {item.metric}
                </p>
              )}
            </div>

            {/* Play button cho video */}
            {item.videoUrl && (
              <div className="absolute inset-0 flex items-center justify-center z-10
                           opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <polygon points="8,5 19,12 8,19" />
                  </svg>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Bottom note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-6 text-center font-body text-[13px] text-white/30"
      >
        Tap to preview — All videos produced and directed by Eddie
      </motion.p>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideoUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setActiveVideoUrl(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-[400px] aspect-[9/16] rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={activeVideoUrl}
                className="absolute inset-0 w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="Creative work preview"
              />
            </motion.div>

            {/* Close button */}
            <button
              onClick={() => setActiveVideoUrl(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full
                       bg-white/10 flex items-center justify-center
                       hover:bg-white/20 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// TestimonialBlock has been cleaned up as it is no longer used in the current layout.

// ─── CaseCard — card chọn case study (3D Interactive Tilt) ───
function CaseCard({
  cs,
  index,
  isInView,
  onSelect,
}: {
  cs: CaseStudyType;
  index: number;
  isInView: boolean;
  onSelect: () => void;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const borderGlowRef = useRef<HTMLDivElement>(null);
  const innerGlowRef = useRef<HTMLDivElement>(null);

  // ── Physics for 3D Tilt ──
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);

    // Dynamic glow follows cursor
    if (borderGlowRef.current) {
      borderGlowRef.current.style.background = `radial-gradient(220px circle at ${mouseX}px ${mouseY}px, ${cs.color}70, transparent 65%)`;
    }
    if (innerGlowRef.current) {
      innerGlowRef.current.style.background = `radial-gradient(500px circle at ${mouseX}px ${mouseY}px, ${cs.color}20, transparent 60%)`;
    }
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    if (borderGlowRef.current) borderGlowRef.current.style.background = "none";
    if (innerGlowRef.current) innerGlowRef.current.style.background = "none";
  }

  function formatValue(v: string) {
    return v.replace("$6,000,000", "$6M+");
  }

  return (
    <motion.div
      ref={wrapperRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.3 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      onClick={onSelect}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative cursor-pointer flex-1 flex flex-col"
      style={{ perspective: "1200px", padding: "1px" }}
    >
      <motion.div
        className="relative flex-1 w-full rounded-[24px] pointer-events-none transition-shadow duration-500 group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        <div ref={borderGlowRef} className="absolute inset-[0px] rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
        <div className="absolute inset-0 rounded-[24px] border border-white/[0.08] group-hover:border-transparent transition-colors duration-500 z-0" />
        <div className="absolute inset-[1px] bg-[#0a0a0a] rounded-[23px] overflow-hidden z-0">
          <div ref={innerGlowRef} className="absolute inset-0 pointer-events-none mix-blend-screen z-10" />
          <div className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20" style={{ background: `linear-gradient(90deg, transparent, ${cs.color}80, transparent)` }} />
          {cs.cardImage && (
            <div className="absolute inset-0">
              <Image src={cs.cardImage} alt="" fill className="object-cover opacity-[0.10] scale-110 grayscale group-hover:grayscale-0 group-hover:opacity-[0.25] group-hover:scale-100 transition-all duration-700 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/90 to-[#0a0a0a]/20" />
            </div>
          )}
        </div>
        <div className="relative z-10 p-8 md:p-10 lg:p-12 flex flex-col h-full min-h-[480px] pointer-events-none" style={{ transform: "translateZ(40px)" }}>
          <div className="flex items-start justify-between">
            <span className="font-heading font-bold leading-none select-none drop-shadow-lg" style={{ fontSize: "clamp(80px, 10vw, 116px)", background: `linear-gradient(180deg, ${cs.color}28, ${cs.color}05)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="font-body text-[11px] uppercase tracking-[0.15em] mt-3 px-3 py-1.5 rounded-full border border-white/[0.06] backdrop-blur-md shadow-md text-white/50">
              {cs.duration}
            </span>
          </div>
          <div className="mt-4 flex-1 mb-6 md:mb-8 flex flex-col">
            <h3 className="font-heading text-[clamp(28px,3.5vw,48px)] font-bold text-white leading-[1.1] mb-2.5 drop-shadow-md">
              {cs.company}
            </h3>
            <p className="font-body text-[15px] md:text-[16px] text-white/40 leading-relaxed font-light drop-shadow-sm">
              {cs.tagline}
            </p>
          </div>
          <div className="border-t border-white/[0.06] pt-6 mb-8">
            <div className="grid grid-cols-3 gap-x-5">
              {cs.highlights.map((h, i) => (
                <div key={h.label} className="flex flex-col gap-2">
                  <span className="font-heading font-bold leading-none transition-all duration-700 opacity-0 scale-95 origin-left group-hover:opacity-100 group-hover:scale-100" style={{ fontSize: "clamp(26px, 3.2vw, 40px)", color: cs.color, filter: `drop-shadow(0 0 14px ${cs.color}60)`, transitionDelay: `${i * 100}ms` }}>
                    {formatValue(h.value)}
                  </span>
                  <span className="font-body text-[10px] md:text-[11px] text-white/40 uppercase tracking-[0.12em] leading-tight">
                    {h.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-auto flex items-end justify-between">
            <div>
              <p className="font-body text-[10px] text-white/40 uppercase tracking-[0.15em] mb-1.5">Role</p>
              <p className="font-body text-[13px] md:text-[14px] text-white/55">{cs.role}</p>
            </div>
            <div className="flex items-center gap-2 text-white/30 group-hover:text-white/100 transition-colors duration-300">
              <span className="font-body text-[12px] uppercase tracking-[0.08em] hidden md:inline">View Case</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1.5 transition-transform duration-300"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── CaseStory — storytelling view khi chọn case ───
function CaseStory({
  cs,
  onBack,
}: {
  cs: CaseStudyType;
  onBack: () => void;
}) {
  const [activeSection, setActiveSection] = useState<string>(cs.sections[0]?.id || "");
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);


  // Build nav items from sections
  const navItems = [
    ...cs.sections.map((s) => ({ id: s.id, label: s.title, number: s.number })),
  ];

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = navItems.map((n) => n.id);
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cs.id]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.div
      id={`case-story-${cs.id}`}
      key={cs.id}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
    >
      {/* Story Header — company name + back button */}
      <div
        id={`case-story-${cs.id}-header`}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-8 border-b border-white/10"
      >
        <div>
          <span
            className="font-body text-[13px] uppercase tracking-[0.15em] font-semibold mb-3 block"
            style={{ color: cs.color }}
          >
            {cs.role}
          </span>
          <h3 className="font-heading text-[clamp(36px,5vw,72px)] font-bold text-white leading-[1.05]">
            {cs.company}
          </h3>
        </div>

        <div className="flex items-center gap-3 self-start">
          {cs.website && (
            <a
              href={cs.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-body text-[14px] text-white/40
                       hover:text-white px-4 py-2.5 rounded-full border border-white/10
                       hover:border-white/20 transition-all duration-300"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Website
            </a>
          )}
          <button
            id={`case-story-${cs.id}-back-btn`}
            onClick={onBack}
            className="flex items-center gap-2 font-body text-[14px] text-text-secondary
                     hover:text-white px-5 py-2.5 rounded-full border border-white/10
                     hover:border-white/20 transition-all duration-300 group"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="group-hover:-translate-x-1 transition-transform duration-300">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back
          </button>
        </div>
      </div>

      {/* ─── Hero Banner — Cinematic typography / Custom Hero Image ─── */}
      <motion.div
        id={`case-story-${cs.id}-hero`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.15 }}
        className="relative w-full aspect-[16/8] md:aspect-[16/7] rounded-3xl overflow-hidden mb-10
                 border border-white/[0.04]"
        style={{ background: "#050505" }}
      >
        {cs.heroImage ? (
          <>
            <Image
              src={cs.heroImage}
              alt={`${cs.company} Hero`}
              fill
              className="object-cover object-center"
              priority
            />
            {/* Cinematic Shadow overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 pointer-events-none" />
          </>
        ) : (
          <>
            {/* Ambient glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `
                  radial-gradient(60% 80% at 50% 50%, ${cs.color}0d, transparent 70%),
                  radial-gradient(30% 40% at 20% 80%, ${cs.color}08, transparent),
                  radial-gradient(30% 40% at 80% 20%, ${cs.color}06, transparent)
                `,
              }}
            />

            {/* Grid pattern overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.03]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
                `,
                backgroundSize: "60px 60px",
              }}
            />
          </>
        )}

        {/* Center — Company name large (Now renders on top of heroImage too if requested) */}
        {!cs.heroImage || cs.id === "dreamtalent" ? (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              {cs.heroImage && (
                <span
                  className="inline-block font-body text-[11px] uppercase tracking-[0.2em] mb-4"
                  style={{ color: cs.color }}
                >
                  Event Media Coverage
                </span>
              )}
              <h2
                className="font-heading font-bold leading-[0.9] tracking-[-0.03em] drop-shadow-2xl"
                style={{
                  fontSize: "clamp(48px, 8vw, 120px)",
                  background: `linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.4) 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {cs.company}
              </h2>
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 60 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="h-[2px] mx-auto mt-4 rounded-full"
                style={{ backgroundColor: cs.color }}
              />
            </motion.div>
          </div>
        ) : null}

        {/* Corner metadata */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="absolute top-5 left-6 font-body text-[10px] text-white/20 uppercase tracking-[0.2em]"
        >
          Case Study
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="absolute top-5 right-6 font-body text-[10px] text-white/20"
        >
          {cs.duration}
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="absolute bottom-5 left-6 font-body text-[10px] uppercase tracking-[0.15em]"
          style={{ color: `${cs.color}60` }}
        >
          {cs.role}
        </motion.span>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="absolute bottom-5 right-6 font-body text-[10px] text-white/15 max-w-[200px] text-right"
        >
          {cs.tagline}
        </motion.p>
      </motion.div>

      {/* ─── Layout: Sidebar + Content ─── */}
      <div className="flex gap-0 lg:gap-10 relative">

        {/* ─── Sidebar Nav (desktop only) ─── */}
        <nav
          id={`case-story-${cs.id}-sidebar`}
          className="hidden lg:block flex-shrink-0 w-[180px]"
        >
          <div className="sticky top-24">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="group relative flex items-center gap-3 px-3 py-2.5 rounded-xl
                             text-left transition-all duration-300"
                    style={{
                      backgroundColor: isActive ? `${cs.color}08` : "transparent",
                    }}
                  >
                    {/* Active indicator line */}
                    <motion.div
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] rounded-full"
                      animate={{
                        height: isActive ? 20 : 0,
                        opacity: isActive ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      style={{ backgroundColor: cs.color }}
                    />

                    {/* Number */}
                    <span
                      className="font-heading text-[11px] font-bold transition-colors duration-300"
                      style={{ color: isActive ? cs.color : "rgba(255,255,255,0.2)" }}
                    >
                      {String(item.number).padStart(2, "0")}
                    </span>

                    {/* Label */}
                    <span
                      className="font-body text-[12px] font-medium transition-colors duration-300 truncate"
                      style={{
                        color: isActive ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)",
                      }}
                    >
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Decorative line */}
            <div className="mt-6 w-full h-[1px] bg-white/[0.04]" />
            <p className="mt-3 font-body text-[10px] text-white/20 uppercase tracking-wider">
              {cs.company}
            </p>
          </div>
        </nav>

        {/* ─── Main Content ─── */}
        <div className="flex-1 min-w-0">
          {/* ─── 1. Story Sections ─── */}
          <div id={`case-story-${cs.id}-sections`}>
            {cs.sections.map((section, i) => (
              <React.Fragment key={section.id}>
                <StorySection
                  section={section}
                  caseColor={cs.color}
                  isLast={i === cs.sections.length - 1 && !cs.highlights}
                  onImageClick={(idx) => setLightbox({ images: section.galleryImages || [], index: idx })}
                />

                {/* Creative Gallery sau Section 3 (System) */}
                {i === 2 && cs.creativeWork && cs.creativeWork.length > 0 && (
                  <CreativeGallery items={cs.creativeWork} color={cs.color} />
                )}
              </React.Fragment>
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




        </div>{/* end Main Content */}
      </div>{/* end Sidebar + Content flex */}

      {/* Bottom — back to cases */}
      <div id={`case-story-${cs.id}-footer`} className="pt-12 pb-8 flex justify-center">
        <button
          onClick={onBack}
          className="flex items-center gap-3 font-body text-[14px] text-text-secondary
                   hover:text-white px-8 py-3.5 rounded-full border border-white/10
                   hover:border-accent/30 hover:bg-white/5 transition-all duration-300 group"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="group-hover:-translate-x-1 transition-transform duration-300">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          View other case studies
        </button>
      </div>
    </motion.div>
  );
}

// ─── EventGallery Removed (Replaced by EditorialGallery globally) ───

// ─── MarqueeStrip — auto-scroll separator between sections ───
function MarqueeStrip({ color }: { color: string }) {
  const items = ["Year End Party", "Team Building", "Event Media", "On-site Direction", "Highlight Reel", "Post Production"];
  return (
    <div className="relative w-full overflow-hidden py-6 my-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      <motion.div
        className="flex gap-10 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 18, ease: "linear", repeat: Infinity }}
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center gap-3 font-heading font-bold text-[13px] uppercase tracking-widest"
            style={{ color: i % 2 === 0 ? "rgba(255,255,255,0.12)" : color + "50" }}>
            {item}
            <span className="w-1 h-1 rounded-full" style={{ backgroundColor: color + "60" }} />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─── DreamTalentStory — Editorial event showcase ───
function DreamTalentStory({
  cs,
  onBack,
}: {
  cs: CaseStudyType;
  onBack: () => void;
}) {
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);

  return (
    <motion.div
      key={cs.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      {/* ── Header ── */}
      <div className="relative flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 mt-6 z-10">
        <div className="relative">
          {/* Stage Light glowing behind text */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute -top-20 -left-20 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none z-[-1]"
            style={{ background: `radial-gradient(circle, ${cs.color}40 0%, transparent 70%)` }}
          />

          <span className="inline-block font-body text-[11px] uppercase tracking-[0.25em] font-semibold mb-4 px-4 py-1.5 rounded-full border shadow-lg backdrop-blur-sm" 
            style={{ color: cs.color, borderColor: `${cs.color}40`, backgroundColor: `${cs.color}10` }}>
            {cs.role} · {cs.duration}
          </span>
          <h2 className="font-heading font-bold leading-none tracking-tight mb-4"
            style={{ fontSize: "clamp(48px, 8vw, 110px)", color: "#FBFBFB" }}>
            {cs.company}
          </h2>
          <p className="font-body text-[16px] md:text-[18px] text-white/40 leading-relaxed max-w-2xl font-light">
            {cs.description}
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          {cs.website && (
            <a href={cs.website} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 font-body text-[13px] text-white/40 hover:text-white px-4 py-2.5 rounded-full border border-white/10 hover:border-white/20 transition-all duration-300">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Website
            </a>
          )}
          <button onClick={onBack}
            className="flex items-center gap-2 font-body text-[13px] text-white/40 hover:text-white px-4 py-2.5 rounded-full border border-white/10 hover:border-white/20 transition-all duration-300 group">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="group-hover:-translate-x-1 transition-transform duration-300">
              <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
            </svg>
            Back
          </button>
        </div>
      </div>

      {/* ── Custom Cinematic Hero Image ── */}
      {cs.heroImage && (
        <motion.div
           initial={{ opacity: 0, scale: 1.08, y: 30 }}
           animate={{ opacity: 1, scale: 1, y: 0 }}
           transition={{ duration: 1.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
           className="relative w-full aspect-[16/8] md:aspect-[16/7] rounded-[2rem] overflow-hidden mb-20 border border-white/[0.06] shadow-2xl"
        >
          <Image
            src={cs.heroImage}
            alt="Event Coverage Hero"
            fill
            className="object-cover"
            priority
          />
          {/* Subtle bottom fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/10 to-transparent pointer-events-none" />
           {/* Drifting Glassmorphic Badge */}
          <motion.div 
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-10 right-10 z-20 px-5 py-2.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-md shadow-2xl hidden md:block"
          >
            <span className="font-body text-[12px] font-semibold tracking-[0.2em] text-white/90 uppercase">Cinematic Grading</span>
          </motion.div>
        </motion.div>
      )}

      {/* ── Sections ── */}
      {cs.sections.map((section, i) => (
        <div key={section.id}>
          {i > 0 && <MarqueeStrip color={cs.color} />}

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full mb-6"
          >
            {/* Section title — large editorial */}
            <div className="flex items-end justify-between gap-6 mb-8">
              <div>
                <span className="font-body text-[11px] uppercase tracking-[0.2em] mb-3 block" style={{ color: cs.color + "80" }}>
                  {String(section.number).padStart(2, "0")}
                </span>
                <h3 className="font-heading font-bold leading-none tracking-tight"
                  style={{ fontSize: "clamp(40px, 6vw, 80px)", color: "#FBFBFB" }}>
                  {section.headline.replace("\n", " ")}
                </h3>
              </div>
              <p className="hidden md:block font-body text-[14px] text-white/35 leading-relaxed max-w-xs shrink-0 pb-2">
                {section.body}
              </p>
            </div>
            <p className="md:hidden font-body text-[14px] text-white/35 leading-relaxed mb-8">
              {section.body}
            </p>

            {/* Featured Video — cinematic player */}
            {section.videoUrl && (
              <FeaturedVideo 
                src={section.videoUrl} 
                poster={section.videoPoster} 
                color={cs.color} 
              />
            )}

            {/* Dynamic Gallery Logic */}
            {section.galleryImages && (
              <div className="mt-8">
                {section.id === "dt-yep" && (
                  <StackedScrollingGallery 
                    images={section.galleryImages} 
                    caseColor={cs.color}
                    onImageClick={(idx) => setLightbox({ images: section.galleryImages || [], index: idx })} 
                  />
                )}
                {section.id === "dt-teambuilding" && <HorizontalFilmstrip images={section.galleryImages} onImageClick={(idx) => setLightbox({ images: section.galleryImages || [], index: idx })} />}
                {section.id === "dt-sportsday" && <BentoMasonry images={section.galleryImages} onImageClick={(idx) => setLightbox({ images: section.galleryImages || [], index: idx })} />}
                
                {/* Rewards in DreamTalentStory */}
                {section.rewards && <div className="mt-12"><IncentivesBlock rewards={section.rewards} color={cs.color} /></div>}

                {/* Fallback for safety */}
                {(!["dt-yep", "dt-teambuilding", "dt-sportsday"].includes(section.id)) && (
                  <EditorialGallery images={section.galleryImages} onImageClick={(idx) => setLightbox({ images: section.galleryImages || [], index: idx })} />
                )}
              </div>
            )}
          </motion.div>
        </div>
      ))}

      {/* ── Footer ── */}
      <div className="pt-20 pb-8 flex justify-center">
        <button onClick={onBack}
          className="flex items-center gap-3 font-body text-[14px] text-white/30 hover:text-white px-8 py-3.5 rounded-full border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all duration-300 group">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="group-hover:-translate-x-1 transition-transform duration-300">
            <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
          </svg>
          View other case studies
        </button>
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
    </motion.div>
  );
}

// ─── CaseStudy Section chính ───
export default function CaseStudy() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeCase = caseStudies.find((cs) => cs.id === activeId);

  // Lock body scroll và cuộn lên đầu khi mở full-page case study
  useEffect(() => {
    if (activeId) {
      // Lock scroll trên body
      document.body.style.overflow = "hidden";
    } else {
      // Unlock scroll khi đóng
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeId]);

  return (
    <>
      <section
        ref={sectionRef}
        id="case-study"
        className="relative w-full py-section-mobile lg:py-section overflow-hidden bg-primary"
      >
        {/* ─── Decorative background glow ─── */}
        <div
          id="case-study-bg-glow"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    w-[800px] h-[600px] bg-accent/5 rounded-full blur-[150px] pointer-events-none"
        />

        <div
          id="case-study-container"
          className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16"
        >
          {/* Section Header */}
          <div id="case-study-header" className="text-center mb-16 lg:mb-20">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block font-body text-overline text-accent uppercase tracking-[0.15em] font-medium mb-4"
            >
              {caseStudyHeading.overline}
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading text-display font-bold text-white mb-4"
            >
              {caseStudyHeading.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-body text-body-lg text-text-secondary max-w-xl mx-auto"
            >
              {caseStudyHeading.description}
            </motion.p>
          </div>

          {/* 2 Case Cards — chooser */}
          <div id="case-study-cards" className="flex flex-col md:flex-row gap-6">
            {caseStudies.map((cs, index) => (
              <CaseCard
                key={cs.id}
                cs={cs}
                index={index}
                isInView={isInView}
                onSelect={() => setActiveId(cs.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Full-Page Case Study Overlay ─── */}
      <AnimatePresence>
        {activeCase && (
          <motion.div
            key={activeCase.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-primary overflow-y-auto"
          >
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-12 md:py-16">
              {activeCase.id === "dreamtalent" ? (
                <DreamTalentStory
                  cs={activeCase}
                  onBack={() => setActiveId(null)}
                />
              ) : (
                <CaseStory
                  cs={activeCase}
                  onBack={() => setActiveId(null)}
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
