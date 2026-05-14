"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import Image from "next/image";
import { uiSounds } from "@/utils/ui-sounds";
import Link from "next/link";

const socialImages = [
  { src: "/images/work/social-post/0324-e-bi-ka-hoc-dai-hoc-dua-nail-1080x1080.webp", views: "142K", likes: "12K", type: "Carousel" },
  { src: "/images/work/social-post/0324-e-bi-ka-thoi-bay-ganh-nang.webp", views: "89K", likes: "5K", type: "Post" },
  { src: "/images/work/social-post/0324-i-ja-ka-voi-7-day.webp", views: "250K", likes: "28K", type: "Viral" },
  { src: "/images/work/social-post/0424-ph-ka-tai-chinh-vung-vang.webp", views: "1.2M", likes: "85K", type: "Viral" },
  { src: "/images/work/social-post/0524-ro-ka20-ngan-khach-hang-2.webp", views: "45K", likes: "2K", type: "Post" },
  { src: "/images/work/social-post/0624-ph-ka--tang-cha-3.webp", views: "300K", likes: "45K", type: "Campaign" },
  { src: "/images/work/social-post/0624-ph-ka-mung-ngay-cua-cha.webp", views: "120K", likes: "14K", type: "Post" },
  { src: "/images/work/social-post/0724-ph-ka-tich-luy-tien-nho-bao-ve.webp", views: "95K", likes: "8K", type: "Carousel" },
  { src: "/images/work/social-post/1024-ph-ka-phao-cuu-sinh.webp", views: "500K", likes: "52K", type: "Viral" },
  { src: "/images/work/social-post/post-buildream.webp", views: "68K", likes: "4K", type: "Post" },
  { src: "/images/work/social-post/post-cancer.webp", views: "210K", likes: "18K", type: "Awareness" },
  { src: "/images/work/social-post/poster-trip-5-star.webp", views: "850K", likes: "90K", type: "Event" }
];

// Helper to duplicate array for a larger grid
const baseGrid = [...socialImages, ...socialImages, ...socialImages];

export default function WorkSocial() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [shuffledGrid, setShuffledGrid] = useState<typeof socialImages>([]);
  const [mounted, setMounted] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    setMounted(true);
    // Shuffle only on client to avoid hydration mismatch
    const shuffled = [...baseGrid].sort(() => Math.random() - 0.5);
    setShuffledGrid(shuffled);
    
    // Initial centering of the grid
    controls.set({ x: -800, y: -400 });
  }, [controls]);

  const handleCardClick = (index: number) => {
    uiSounds.playClick();
    setActiveCard(activeCard === index ? null : index);
  };

  // Prevent rendering random grid on server
  if (!mounted) {
    return <section id="design" className="relative w-full h-[80vh] min-h-[600px] bg-[#020202]" />;
  }

  return (
    <section 
      id="design"
      className="relative w-full h-[80vh] min-h-[600px] overflow-hidden bg-[#020202] border-t border-white/5" 
      ref={containerRef}
    >
      
      {/* ─── The Viral Grid (Draggable Area) ─── */}
      <motion.div
        drag
        dragConstraints={containerRef}
        dragElastic={0.2}
        dragMomentum={true}
        animate={controls}
        className="absolute top-1/2 left-1/2 w-[3000px] h-[2000px] -ml-[1500px] -mt-[1000px] cursor-grab active:cursor-grabbing flex flex-wrap content-start gap-4 p-12"
        style={{ perspective: 1000 }}
      >
        {shuffledGrid.map((item, i) => {
          const isActive = activeCard === i;
          
          return (
            <motion.div
              key={i}
              layout
              onClick={() => handleCardClick(i)}
              className={`relative rounded-xl overflow-hidden bg-white/5 border border-white/10 shrink-0
                ${isActive ? 'w-[400px] h-[500px] z-50 shadow-[0_0_50px_rgba(255,64,0,0.4)]' : 'w-[280px] h-[350px] z-10 hover:border-accent/40'}
              `}
              whileHover={!isActive ? { scale: 1.05, rotate: Math.random() * 4 - 2, zIndex: 30 } : {}}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <Image 
                src={item.src} 
                alt="Social Post" 
                fill 
                className={`object-cover transition-all duration-700 ${isActive ? 'opacity-100' : 'opacity-60 grayscale-[50%] hover:grayscale-0 hover:opacity-100'}`} 
              />
              
              {/* HUD Overlay when active */}
              {isActive && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute inset-0 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center"
                >
                  <div className="w-16 h-16 rounded-full border border-accent/30 flex items-center justify-center mb-6">
                    <div className="w-12 h-12 rounded-full border border-accent/60 bg-accent/10 animate-ping absolute" />
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent relative z-10">
                      <path d="M12 20v-6M6 20V10M18 20V4" />
                    </svg>
                  </div>
                  
                  <span className="font-mono text-[10px] text-accent uppercase tracking-[0.3em] font-bold mb-2 block border border-accent/20 px-3 py-1 rounded-full">
                    {item.type}
                  </span>
                  
                  <div className="flex gap-8 mt-6">
                    <div>
                      <span className="block font-heading text-4xl font-black text-white">{item.views}</span>
                      <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">Impressions</span>
                    </div>
                    <div className="w-px bg-white/10" />
                    <div>
                      <span className="block font-heading text-4xl font-black text-white">{item.likes}</span>
                      <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">Engagements</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {/* ─── Foreground Overlay & Text ─── */}
      <div className="absolute inset-0 pointer-events-none z-40 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(2,2,2,0.9)_80%)]" />
      
      <div className="absolute inset-0 pointer-events-none z-50 p-6 md:p-12 lg:p-16 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 backdrop-blur-md bg-black/40 px-4 py-2 rounded-full border border-white/10"
          >
            <div className="w-2 h-2 bg-[#ff4000] rounded-full animate-pulse" />
            <span className="font-mono text-[10px] text-white/70 uppercase tracking-[0.3em] font-bold">
              Drag Grid to Explore
            </span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Link 
              href="/work/social-post"
              className="pointer-events-auto group flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-heading font-bold text-sm uppercase tracking-widest hover:bg-accent hover:text-white transition-colors"
            >
              View Full Archive
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>

        <div className="max-w-2xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-5xl md:text-7xl font-black text-white uppercase leading-[0.9] tracking-tighter mb-4"
          >
            THE VIRAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-400">GRID</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-body text-lg text-white/60 mb-8"
          >
            Eye-catching social media graphics, carousels, and high-performing posts driving massive organic reach and conversion.
          </motion.p>
        </div>
      </div>
      
    </section>
  );
}
