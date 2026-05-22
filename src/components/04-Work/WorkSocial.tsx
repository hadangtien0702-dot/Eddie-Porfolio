"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useAnimation, useMotionValue, useScroll, useTransform, useSpring, useMotionTemplate } from "framer-motion";
import Image from "next/image";
import { uiSounds } from "@/utils/ui-sounds";
import Link from "next/link";

const socialImages = [
  { src: "/images/work/social-post/0324-e-bi-ka-hoc-dai-hoc-dua-nail-1080x1080.webp", views: "142K", likes: "12K", type: "Carousel" },
  { src: "/images/work/social-post/0324-e-bi-ka-thoi-bay-ganh-nang.webp", views: "89K", likes: "5K", type: "Post" },
  { src: "/images/work/social-post/0324-e-bl-ka-thoi-bau-ganh-nang-1080x1080-en.webp", views: "105K", likes: "9K", type: "Post" },
  { src: "/images/work/social-post/0324-i-ja-ka-voi-7-day.webp", views: "250K", likes: "28K", type: "Viral" },
  { src: "/images/work/social-post/0424-ph-ka-tai-chinh-vung-vang.webp", views: "1.2M", likes: "85K", type: "Viral" },
  { src: "/images/work/social-post/0524-ro-ka20-ngan-khach-hang-2.webp", views: "45K", likes: "2K", type: "Post" },
  { src: "/images/work/social-post/0624-ph-ka--tang-cha-3.webp", views: "300K", likes: "45K", type: "Campaign" },
  { src: "/images/work/social-post/0624-ph-ka-mung-ngay-cua-cha.webp", views: "120K", likes: "14K", type: "Post" },
  { src: "/images/work/social-post/0724-ph-ka-tich-luy-tien-nho-bao-ve.webp", views: "95K", likes: "8K", type: "Carousel" },
  { src: "/images/work/social-post/0724-ro-ka-ban-se-nhan.webp", views: "180K", likes: "15K", type: "Post" },
  { src: "/images/work/social-post/0824-ph-ka-11-nam-nhin-lai.webp", views: "62K", likes: "3K", type: "Post" },
  { src: "/images/work/social-post/0824-ph-ka-bao-ve-con-ngay-tu-khi-ra-doi.webp", views: "74K", likes: "6K", type: "Post" },
  { src: "/images/work/social-post/0824-ph-ka-nguoi-dau-tu.webp", views: "50K", likes: "4K", type: "Post" },
  { src: "/images/work/social-post/1020-ph-ka-tam-ve-giup-ban-nghi-huu.webp", views: "115K", likes: "10K", type: "Post" },
  { src: "/images/work/social-post/1024-ph-ka-phao-cuu-sinh.webp", views: "500K", likes: "52K", type: "Viral" },
  { src: "/images/work/social-post/1124-resize-thang-may-2.webp", views: "280K", likes: "32K", type: "Banner" },
  { src: "/images/work/social-post/1124-resize-thang-may.webp", views: "340K", likes: "40K", type: "Banner" },
  { src: "/images/work/social-post/banner-web.webp", views: "650K", likes: "72K", type: "Web Banner" },
  { src: "/images/work/social-post/gan-20-ngan-khach-hang-ngang.webp", views: "820K", likes: "95K", type: "Infographic" },
  { src: "/images/work/social-post/hiring-member.webp", views: "35K", likes: "1.2K", type: "Hiring" },
  { src: "/images/work/social-post/post-buildream.webp", views: "68K", likes: "4K", type: "Post" },
  { src: "/images/work/social-post/post-cancer.webp", views: "210K", likes: "18K", type: "Awareness" },
  { src: "/images/work/social-post/poster-trip-5-star.webp", views: "850K", likes: "90K", type: "Event" },
  { src: "/images/work/social-post/tho-nail-an-tam.webp", views: "140K", likes: "11K", type: "Post" },
  { src: "/images/work/social-post/thu-hu-chuyen-bao-hiem.webp", views: "190K", likes: "16K", type: "Post" },
  { src: "/images/work/social-post/importedphoto.750752294.032559.webp", views: "180K", likes: "12K", type: "Campaign" },
  { src: "/images/work/social-post/importedphoto.750752294.032559-2.webp", views: "92K", likes: "6K", type: "Post" },
  { src: "/images/work/social-post/sms-send-to-customer.webp", views: "420K", likes: "38K", type: "Viral" }
];

export default function WorkSocial() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Background values
  const bgScale = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.85, 1, 1, 0.85]);
  const bgBlur = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], ["blur(25px)", "blur(0px)", "blur(0px)", "blur(25px)"]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const bgBorderRadius = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], ["40px", "0px", "0px", "40px"]);

  // Grid unique 3D entry/exit tilt values
  const gridRotateX = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [15, 0, 0, -15]);
  const gridRotateY = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [-15, 0, 0, 15]);
  const gridTranslateZ = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [-250, 0, 0, -250]);

  // Individual cards scroll parallax values with custom spring inertia
  const rawY0 = useTransform(scrollYProgress, [0, 1], [500, -500]);
  const rawY1 = useTransform(scrollYProgress, [0, 1], [200, -200]);
  const rawY2 = useTransform(scrollYProgress, [0, 1], [700, -700]);
  const rawY3 = useTransform(scrollYProgress, [0, 1], [350, -350]);
  const rawY4 = useTransform(scrollYProgress, [0, 1], [600, -600]);

  const yOffset0 = useSpring(rawY0, { stiffness: 45, damping: 14 });
  const yOffset1 = useSpring(rawY1, { stiffness: 45, damping: 14 });
  const yOffset2 = useSpring(rawY2, { stiffness: 45, damping: 14 });
  const yOffset3 = useSpring(rawY3, { stiffness: 45, damping: 14 });
  const yOffset4 = useSpring(rawY4, { stiffness: 45, damping: 14 });

  const yOffsets = [yOffset0, yOffset1, yOffset2, yOffset3, yOffset4];

  // Foreground values
  const contentOpacity = useTransform(scrollYProgress, [0.15, 0.25, 0.75, 0.85], [0, 1, 1, 0]);

  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [shuffledGrid, setShuffledGrid] = useState<typeof socialImages>([]);
  const [mounted, setMounted] = useState(false);
  const controls = useAnimation();

  // Mouse Tracking Spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  useEffect(() => {
    setMounted(true);

    // Smart shuffle with distance constraints to prevent identical images from appearing near each other
    const shuffleWithDistance = (uniques: typeof socialImages, minDistance = 16) => {
      const rawList = [...uniques, ...uniques];
      let result: typeof socialImages = [];
      let pool = [...rawList];
      
      let attempts = 0;
      while (pool.length > 0 && attempts < 2000) {
        attempts++;
        const index = Math.floor(Math.random() * pool.length);
        const candidate = pool[index];
        
        // Ensure this image is not in the last 'minDistance' items of the result list
        const recentItems = result.slice(-minDistance);
        const isDuplicateRecent = recentItems.some(item => item.src === candidate.src);
        
        if (!isDuplicateRecent || pool.length <= minDistance) {
          result.push(candidate);
          pool.splice(index, 1);
          attempts = 0;
        }
      }
      
      // Fallback
      if (pool.length > 0) {
        result = [...result, ...pool];
      }
      return result;
    };

    const shuffled = shuffleWithDistance(socialImages, 16);
    setShuffledGrid(shuffled);
    
    // Initial centering of the grid
    controls.set({ x: -800, y: -400 });
  }, [controls]);

  const handleCardClick = (index: number) => {
    uiSounds.playClick();
    setActiveCard(activeCard === index ? null : index);
  };

  const spotlightBackground = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.06), transparent 40%)`;

  // Prevent rendering random grid on server
  if (!mounted) {
    return <section id="design" ref={containerRef} className="relative w-full h-screen min-h-[700px] bg-[#020202]" />;
  }

  // Group shuffled grid into columns to apply column-level parallax scroll and prevent overlaps
  const columnsCount = 8;
  const columns: (typeof socialImages)[] = Array.from({ length: columnsCount }, () => []);
  shuffledGrid.forEach((item, i) => {
    columns[i % columnsCount].push(item);
  });

  return (
    <section 
      id="design"
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen min-h-[700px] overflow-hidden bg-[#020202] border-t border-white/5" 
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
        className="absolute inset-0 z-0 overflow-hidden origin-center will-change-transform bg-[#020202] flex items-center justify-center"
      >
        {/* ─── Ambient Glow Orbs ─── */}
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-accent/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none animate-[pulse_4s_ease-in-out_infinite]" />
        <div className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] bg-cyan-500/15 rounded-full blur-[150px] mix-blend-screen pointer-events-none animate-[pulse_6s_ease-in-out_infinite]" />
        
        {/* ─── The Viral Grid (Draggable Area) ─── */}
        <motion.div
          drag
          dragConstraints={containerRef}
          dragElastic={0.2}
          dragMomentum={true}
          animate={controls}
          className="absolute top-1/2 left-1/2 w-[3000px] h-[2200px] -ml-[1500px] -mt-[1100px] cursor-grab active:cursor-grabbing flex flex-row gap-6 p-12 overflow-visible"
          style={{ 
            perspective: 1000,
            rotateX: gridRotateX,
            rotateY: gridRotateY,
            z: gridTranslateZ
          }}
        >
          {columns.map((columnItems, colIndex) => {
            const hasActiveCard = columnItems.some((_, itemIndex) => (itemIndex * columnsCount + colIndex) === activeCard);
            return (
              <motion.div
                key={colIndex}
                className={`flex flex-col gap-6 w-[280px] shrink-0 overflow-visible relative ${hasActiveCard ? 'z-50' : 'z-10'}`}
                style={{ y: yOffsets[colIndex % yOffsets.length] }}
              >
                {columnItems.map((item, itemIndex) => {
                  const absoluteIndex = itemIndex * columnsCount + colIndex;
                  const isActive = activeCard === absoluteIndex;
                  
                  // Masonry Rhythm Heights
                  const heights = ["h-[350px]", "h-[420px]", "h-[300px]", "h-[480px]", "h-[380px]"];
                  const defaultHeight = heights[(itemIndex + colIndex * 2) % 5];
                  
                  return (
                    <motion.div
                      key={itemIndex}
                      layout
                      onClick={() => handleCardClick(absoluteIndex)}
                      className={`relative rounded-xl overflow-hidden bg-white/5 border shrink-0 transition-all duration-500
                        ${isActive ? 'w-[340px] h-[480px] z-50 border-accent shadow-[0_0_60px_rgba(255,64,0,0.5)]' : `w-[280px] ${defaultHeight} z-10 border-white/10 shadow-[0_15px_30px_rgba(0,0,0,0.6)] hover:border-accent/50 hover:shadow-[0_0_40px_rgba(255,64,0,0.25)]`}
                      `}
                    whileHover={!isActive ? { scale: 1.05, rotate: Math.random() * 3 - 1.5, zIndex: 30 } : {}}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <Image 
                      src={item.src} 
                      alt="Social Post" 
                      fill 
                      className={`object-cover transition-all duration-700 ${isActive ? 'opacity-100 brightness-110' : 'opacity-[0.85] brightness-[0.75] hover:brightness-110 hover:opacity-100'}`} 
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
          );
        })}
        </motion.div>

        {/* ─── Vignette Overlay ─── */}
        <div className="absolute inset-0 pointer-events-none z-40 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,2,2,0.5)_100%)]" />
        
        {/* ─── Mouse Spotlight Overlay ─── */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-50 transition-opacity duration-300"
          style={{
            background: spotlightBackground
          }}
        />
      </motion.div>
      
      {/* ─── Foreground Overlay & Text ─── */}
      <motion.div 
        style={{ opacity: contentOpacity }}
        className="absolute inset-0 pointer-events-none z-50 p-6 md:p-12 lg:p-16 flex flex-col justify-between"
      >
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
      </motion.div>
      
    </section>
  );
}
