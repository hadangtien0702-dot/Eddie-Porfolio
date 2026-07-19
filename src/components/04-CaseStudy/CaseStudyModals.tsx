"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// ─── Universal Lightbox Modal (Creative HUD Redesign) ───
export function FullscreenLightbox({
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
          sizes="(max-width: 1200px) 100vw, 1200px" 
          quality={90} 
          unoptimized={images[currentIndex]?.includes("unsplash.com") || images[currentIndex]?.includes("supabase.co")}
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
              <span className="font-body text-[12px] font-bold text-white/40 uppercase tracking-[0.2em]">
                CULTURAL VISUALS
              </span>
              <div className="h-4 w-[1px] bg-white/10" />
              <span className="font-body text-[12px] font-bold text-white/60 uppercase tracking-[0.1em]">
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
