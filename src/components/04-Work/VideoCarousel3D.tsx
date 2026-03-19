"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";

// ─── Mock video data — replace with real data later ───
const videos = [
  {
    id: 0,
    title: "Brand Campaign — FPT",
    category: "Brand Film",
    duration: "2:34",
    year: "2024",
    client: "FPT Corporation",
    views: "1.2M",
    tags: ["Corporate", "Brand", "Campaign"],
    thumbnail:
      "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=800&auto=format&fit=crop",
    description:
      "Full brand refresh campaign for FPT Corporation — product launches, storytelling, and multi-channel distribution across digital platforms.",
  },
  {
    id: 1,
    title: "Product Launch — VinFast EV",
    category: "Commercial",
    duration: "1:45",
    year: "2023",
    client: "VinFast",
    views: "2.8M",
    tags: ["Automotive", "TVC", "Launch"],
    thumbnail:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&auto=format&fit=crop",
    description:
      "Dynamic launch reel showcasing the VinFast electric vehicle lineup with cinematic sequences and high-energy pacing.",
  },
  {
    id: 2,
    title: "Social Series — The Coffee House",
    category: "Social Media",
    duration: "0:30 × 12",
    year: "2024",
    client: "The Coffee House",
    views: "890K",
    tags: ["F&B", "Short-form", "TikTok"],
    thumbnail:
      "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=800&auto=format&fit=crop",
    description:
      "12-piece monthly content package for Instagram & TikTok, driving 40% engagement lift over 3 months.",
  },
  {
    id: 3,
    title: "Event Recap — Tech Summit 2024",
    category: "Event Film",
    duration: "3:20",
    year: "2024",
    client: "VietnamWorks",
    views: "450K",
    tags: ["Event", "B2B", "Corporate"],
    thumbnail:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=800&auto=format&fit=crop",
    description:
      "Highlight reel capturing keynotes, networking moments, and brand activations from Tech Summit 2024.",
  },
  {
    id: 4,
    title: "Documentary — Urban Stories",
    category: "Documentary",
    duration: "5:12",
    year: "2023",
    client: "Personal Project",
    views: "320K",
    tags: ["Documentary", "Lifestyle", "Long-form"],
    thumbnail:
      "https://images.unsplash.com/photo-1574717024453-354056fadadf?q=80&w=800&auto=format&fit=crop",
    description:
      "Short-doc series exploring urban lifestyle and creative identity across Ho Chi Minh City's emerging districts.",
  },
  {
    id: 5,
    title: "Motion Design — Annual Report",
    category: "Motion Design",
    duration: "4:00",
    year: "2024",
    client: "Masan Group",
    views: "76K",
    tags: ["Motion", "Data-viz", "Corporate"],
    thumbnail:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
    description:
      "Animated annual report bringing financial milestones to life through kinetic typography and data visualization.",
  },
];

const CARD_W = 260;
const CARD_H = 360;
const OFFSET_X = 290;

export default function VideoCarousel3D({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const total = videos.length;
  const selected = videos[activeIndex];

  // ─── Auto-rotate every 4s ───
  const resetAutoPlay = useCallback(() => {
    clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 4000);
  }, [total]);

  useEffect(() => {
    if (!isOpen) return;
    resetAutoPlay();
    return () => clearInterval(autoPlayRef.current);
  }, [isOpen, resetAutoPlay]);

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(((index % total) + total) % total);
      resetAutoPlay();
    },
    [total, resetAutoPlay]
  );

  // ─── Keyboard navigation ───
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goTo(activeIndex + 1);
      if (e.key === "ArrowLeft") goTo(activeIndex - 1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, activeIndex, goTo, onClose]);

  // ─── Swipe/drag to navigate ───
  const handlePanEnd = (_: unknown, info: PanInfo) => {
    setIsDragging(false);
    if (info.offset.x < -60) goTo(activeIndex + 1);
    else if (info.offset.x > 60) goTo(activeIndex - 1);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[100] bg-[#080808] flex flex-col overflow-hidden"
        >
          {/* ─── Ambient glow ─── */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 45% at 50% 42%, rgba(239,68,68,0.07), transparent)",
            }}
          />

          {/* ─── Header ─── */}
          <div className="relative z-20 flex items-center justify-between px-8 pt-7 pb-2">
            <div>
              <p className="font-body text-[10px] text-white/25 uppercase tracking-widest mb-1">
                Video Portfolio
              </p>
              <h2 className="font-heading text-[20px] font-bold text-white tracking-tight">
                Showreel & Works
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/8 hover:bg-white/15 flex items-center justify-center text-white/60 hover:text-white transition-all duration-300"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* ─── Coverflow Carousel ─── */}
          <div
            className="relative flex-1 flex items-center justify-center"
            style={{ perspective: "1100px" }}
          >
            {/* Pan surface — behind cards ─── */}
            <motion.div
              className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing"
              onPanStart={() => setIsDragging(true)}
              onPanEnd={handlePanEnd}
            />

            {/* Cards */}
            <div
              className="relative flex items-center justify-center"
              style={{ width: "100%", height: CARD_H + 80, transformStyle: "preserve-3d" }}
            >
              {videos.map((video, i) => {
                let offset = i - activeIndex;
                if (offset > total / 2) offset -= total;
                if (offset < -total / 2) offset += total;

                const absOffset = Math.abs(offset);
                const isCenter = offset === 0;
                const visible = absOffset <= 2;

                return (
                  <motion.div
                    key={video.id}
                    onClick={() => {
                      if (!isDragging && !isCenter) goTo(i);
                    }}
                    animate={{
                      x: offset * OFFSET_X,
                      rotateY: Math.max(-75, Math.min(75, offset * -42)),
                      scale: isCenter ? 1 : Math.max(0.72, 1 - absOffset * 0.14),
                      opacity: !visible ? 0 : isCenter ? 1 : Math.max(0.15, 1 - absOffset * 0.38),
                    }}
                    transition={{ type: "spring", stiffness: 260, damping: 32 }}
                    style={{
                      position: "absolute",
                      width: CARD_W,
                      height: CARD_H,
                      zIndex: isCenter ? 10 : 10 - absOffset,
                      cursor: isCenter ? "default" : visible ? "pointer" : "default",
                      transformStyle: "preserve-3d",
                      borderRadius: 16,
                      overflow: "hidden",
                    }}
                  >
                    {/* Thumbnail */}
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      loading="lazy"
                    />

                    {/* Gradient overlay */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: isCenter
                          ? "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)"
                          : "rgba(0,0,0,0.5)",
                        transition: "background 0.4s",
                      }}
                    />

                    {/* Center card — play button */}
                    {isCenter && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1, duration: 0.3 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <div
                          className="w-14 h-14 rounded-full flex items-center justify-center cursor-pointer
                                     hover:scale-110 transition-transform duration-300"
                          style={{
                            background: "rgba(255,255,255,0.15)",
                            border: "1px solid rgba(255,255,255,0.35)",
                            backdropFilter: "blur(8px)",
                          }}
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="white"
                            className="ml-1"
                          >
                            <polygon points="5 3 19 12 5 21 5 3" />
                          </svg>
                        </div>
                      </motion.div>
                    )}

                    {/* Center card — bottom info */}
                    {isCenter && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.12, duration: 0.35 }}
                        className="absolute bottom-5 left-5 right-5"
                      >
                        <span className="font-body text-[10px] uppercase tracking-widest text-accent block mb-1">
                          {video.category}
                        </span>
                        <h3 className="font-heading text-[16px] font-bold text-white leading-tight">
                          {video.title}
                        </h3>
                      </motion.div>
                    )}

                    {/* Center card — accent glow border */}
                    {isCenter && (
                      <div
                        className="absolute inset-0 rounded-2xl pointer-events-none"
                        style={{
                          boxShadow:
                            "inset 0 0 0 1.5px rgba(239,68,68,0.55), 0 0 50px rgba(239,68,68,0.15)",
                        }}
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* ─── Arrow navigation ─── */}
            <button
              onClick={() => goTo(activeIndex - 1)}
              className="absolute left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full
                         bg-white/8 hover:bg-white/18 flex items-center justify-center
                         text-white/50 hover:text-white transition-all duration-300"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={() => goTo(activeIndex + 1)}
              className="absolute right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full
                         bg-white/8 hover:bg-white/18 flex items-center justify-center
                         text-white/50 hover:text-white transition-all duration-300"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          {/* ─── Detail Panel ─── */}
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-20 px-8 pb-7"
          >
            <div className="max-w-2xl mx-auto">
              <div className="w-full h-px bg-white/8 mb-5" />

              <div className="flex items-start justify-between gap-6">
                {/* Left — description & tags */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="font-body text-[10px] text-accent uppercase tracking-widest">
                      {selected.category}
                    </span>
                    <span className="text-white/20">·</span>
                    <span className="font-body text-[11px] text-white/35">{selected.year}</span>
                    <span className="text-white/20">·</span>
                    <span className="font-body text-[11px] text-white/35">{selected.duration}</span>
                  </div>

                  <p className="font-body text-[13px] text-white/50 leading-relaxed max-w-[440px]">
                    {selected.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {selected.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-body text-[10px] text-white/30 px-2.5 py-1 rounded-full"
                        style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right — stats & CTA */}
                <div className="flex flex-col items-end gap-3 flex-shrink-0">
                  <div className="flex gap-5">
                    <div className="text-right">
                      <p className="font-body text-[9px] text-white/20 uppercase tracking-widest">Client</p>
                      <p className="font-body text-[12px] text-white/60 mt-0.5">{selected.client}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-body text-[9px] text-white/20 uppercase tracking-widest">Views</p>
                      <p className="font-body text-[12px] text-white/60 mt-0.5">{selected.views}</p>
                    </div>
                  </div>

                  <button
                    className="font-body text-[12px] font-medium px-5 py-2.5 rounded-full flex items-center gap-2
                               transition-all duration-300 hover:scale-105"
                    style={{
                      background: "rgba(239,68,68,0.12)",
                      color: "#ef4444",
                      border: "1px solid rgba(239,68,68,0.28)",
                    }}
                  >
                    Watch Full Video
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* ─── Dot navigation ─── */}
              <div className="flex items-center justify-center gap-1.5 mt-5">
                {videos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === activeIndex ? 20 : 6,
                      height: 6,
                      background:
                        i === activeIndex ? "#ef4444" : "rgba(255,255,255,0.18)",
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
