"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { 
  type CaseStudy, 
  type CaseStudySection 
} from "@/data/casestudy";
import { cn } from "@/lib/utils";
import VerticalCutReveal from "@/components/ui/VerticalCutReveal";
import { FullscreenLightbox } from "./CaseStudyModals";
import { 
  EditorialGallery, 
  ProductLineShowcase, 
  StackedScrollingGallery, 
  HorizontalFilmstrip, 
  ZAxisTunnelGallery
} from "./CaseStudyGalleries";
import { 
  ContextCard, 
  ContextProfileCard, 
  FunnelChart, 
  CPAChallengeChart, 
  RevenueChart, 
  SocialBars 
} from "./CaseStudyCharts";
import { MyRole } from "./MyRole";

// ─── RewardCard sub-component ───
export function RewardCard({ reward }: { reward: { title: string; image: string }, color: string }) {
  return (
    <div className="relative group w-[220px] md:w-[320px] aspect-[16/8] rounded-xl md:rounded-2xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-md transition-all duration-500 hover:border-white/30">
      <Image 
        src={reward.image} 
        alt={reward.title} 
        fill 
        className="object-cover grayscale-50 group-hover:grayscale-0 transition-all duration-700" 
        sizes="320px"
        unoptimized={true}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40" />
      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 z-30">
        <h4 className="font-heading font-bold text-white text-[10px] md:text-[12px] truncate">{reward.title}</h4>
      </div>
      <div className="absolute top-2 right-2 border-[0.5px] border-white/20 px-1.5 py-0.5 rounded text-[10px] md:text-[12px] text-white/40 font-bold uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity">Value_Asset</div>
    </div>
  );
}

// ─── IncentivesBlock — Hiển thị bộ sưu tập phần thưởng dạng Marquee ───
export function IncentivesBlock({ 
  rewards, 
  color 
}: { 
  rewards: { title: string; image: string }[]; 
  color: string 
}) {
  const midPoint = Math.ceil(rewards.length / 2);
  const row1 = rewards.slice(0, midPoint);
  const row2 = rewards.slice(midPoint);

  return (
    <div className="relative z-10 mb-24 overflow-hidden -mx-4 md:-mx-12">
      <div className="flex items-center gap-3 mb-10 px-4 md:px-12">
        <div className="w-12 h-[1px]" style={{ backgroundColor: color }} />
        <span className="font-body text-[12px] font-bold uppercase tracking-[0.2em] text-white/40">Executive Rewards Repository</span>
      </div>
      <div className="space-y-6 md:space-y-8">
        <div className="relative flex overflow-hidden">
          <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="flex gap-4 md:gap-6 whitespace-nowrap">
            {[...row1, ...row1].map((reward, idx) => <RewardCard key={idx} reward={reward} color={color} />)}
          </motion.div>
        </div>
        <div className="relative flex overflow-hidden">
          <motion.div animate={{ x: ["-50%", "0%"] }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="flex gap-4 md:gap-6 whitespace-nowrap">
            {[...row2, ...row2].map((reward, idx) => <RewardCard key={idx} reward={reward} color={color} />)}
          </motion.div>
        </div>
      </div>
      <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-[#030303] to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-[#030303] to-transparent z-20 pointer-events-none" />
    </div>
  );
}

// ─── FeaturedVideo — Khung phát video điện ảnh ───
export function FeaturedVideo({ 
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
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className={isEmbedded ? "w-full h-full" : "relative z-10 mb-16 md:mb-24 group"}>
      <div className={`relative w-full h-full overflow-hidden cursor-pointer ${!isEmbedded ? 'aspect-[16/9] rounded-[2rem] border border-white/10 bg-black/40 shadow-2xl backdrop-blur-sm' : ''}`} onClick={togglePlay}>
        <video ref={videoRef} src={src} className="w-full h-full object-cover" loop muted={!isPlaying} playsInline />
        {poster && !isPlaying && (
          <div className="absolute inset-0 z-10">
            <Image src={poster} alt="" fill className="object-cover" priority sizes="1100px" unoptimized={true} />
          </div>
        )}
        <AnimatePresence>
          {!isPlaying && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/40 flex items-center justify-center z-20">
              <div className="w-20 h-20 rounded-full flex items-center justify-center bg-white/10 border border-white/30 backdrop-blur-xl group-hover:scale-110 transition-transform"><svg width="28" height="28" viewBox="0 0 24 24" fill="white" className="ml-1"><polygon points="5 3 19 12 5 21 5 3" /></svg></div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-30 transition-opacity duration-1000" style={{ boxShadow: `inset 0 0 100px ${color}` }} />
      </div>
    </div>
  );
}

// ─── StorySection — mỗi section trong storytelling ───
export function StorySection({
  section,
  caseColor,
  isLast,
  onImageClick,
  scrollContainer,
}: {
  section: CaseStudySection;
  caseColor: string;
  isLast: boolean;
  onImageClick?: (index: number) => void;
  scrollContainer?: React.RefObject<HTMLDivElement | null>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const num = String(section.number).padStart(2, "0");

  return (
    <motion.div ref={ref} id={section.id} initial={{ opacity: 0, y: 60 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="relative py-8 md:py-12">
      <motion.div className="absolute -top-4 -right-4 md:right-0 pointer-events-none select-none opacity-10">
        <span className="font-heading text-[200px] md:text-[380px] font-bold leading-none" style={{ color: `${caseColor}12` }}>{num}</span>
      </motion.div>
      <div className="relative z-10 flex items-center gap-4 mb-10">
        <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full font-body text-[11px] font-bold uppercase tracking-[0.3em] border" style={{ color: caseColor, borderColor: `${caseColor}40`, backgroundColor: `${caseColor}10` }}>
          <span>{section.label ? section.label.split('.')[0] : num}</span>
          <span className="w-1 h-1 rounded-full" style={{ backgroundColor: caseColor }} />
          <span>{section.label ? section.label.split('.')[1]?.trim() : section.title}</span>
        </span>
      </div>
      {section.headline && (
        <div className="relative z-10 mb-4 max-w-5xl">
          {section.headline.split("\n").map((line: string, i: number) => (
            <h3 key={i} className="font-heading text-[clamp(36px,6vw,80px)] font-bold text-white leading-[1.05] tracking-tight">
              {isInView && <VerticalCutReveal splitBy="characters" staggerDuration={0.02} transition={{ type: "spring", stiffness: 150, damping: 20, delay: 0.1 + i * 0.08 }}>{line}</VerticalCutReveal>}
            </h3>
          ))}
        </div>
      )}
      
      {section.body && (
        <motion.div className="relative z-10 max-w-5xl mb-6">
          <p className="font-body text-[17px] md:text-[19px] text-white/60 leading-[1.8]">{section.body}</p>
        </motion.div>
      )}

      {/* Video section nếu có */}
      {section.videoUrl && (
        <div className="relative z-10 mb-10 max-w-5xl">
          <FeaturedVideo src={section.videoUrl} poster={section.videoPoster} color={caseColor} />
        </div>
      )}

      {/* ─── ENHANCED STATS/HIGHLIGHTS GRID ─── */}
      {section.stats && section.stats.length > 0 && (
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 mb-16">
          {section.stats.map((stat: { label: string; value: string }, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative"
            >
              <div className="relative p-8 rounded-[2rem] bg-white/[0.03] border border-white/10 backdrop-blur-md overflow-hidden transition-all duration-500 hover:bg-white/[0.06] hover:border-white/20 hover:-translate-y-2">
                {/* Abstract background shape */}
                <div className="absolute -right-4 -top-4 w-24 h-24 blur-3xl rounded-full opacity-10 group-hover:opacity-20 transition-opacity" style={{ backgroundColor: caseColor }} />
                
                <span className="font-mono text-[10px] text-white/40 uppercase tracking-[0.3em] block mb-6">
                  {stat.label}
                </span>
                
                <h4 className="font-heading text-[clamp(32px,5vw,56px)] font-bold text-white leading-none tracking-tighter">
                  {stat.value}
                </h4>
                
                {/* Technical accent corner */}
                <div className="absolute bottom-0 right-0 p-3 opacity-20">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                     <path d="M20 4v16H4" stroke="currentColor" strokeWidth="0.5" />
                   </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Visual Content based on visualType or section.id */}
      <div className="relative z-10 mb-4">
        {section.visualType === "context" && <ContextCard color={caseColor} />}
        {section.visualType === "context-profile" && <ContextProfileCard color={caseColor} />}
        {section.visualType === "funnel" && <FunnelChart color={caseColor} />}
        {section.visualType === "cpa-challenge" && <CPAChallengeChart caseColor={caseColor} />}
        {section.visualType === "workflow" && <MyRole />}
        {section.visualType === "revenue" && <RevenueChart color={caseColor} />}
        {section.visualType === "social" && <SocialBars color={caseColor} />}
        {section.visualType === "product-line" && section.galleryImages && <ProductLineShowcase images={section.galleryImages} color={caseColor} onImageClick={onImageClick} />}
        
        {/* Dream Talent Specific Galleries */}
        {section.galleryImages && !section.visualType && (
          <div className="mt-4">
            {section.id === "dt-yep" && <StackedScrollingGallery images={section.galleryImages} onImageClick={onImageClick} caseColor={caseColor} />}
            {section.id === "dt-teambuilding" && <HorizontalFilmstrip images={section.galleryImages} onImageClick={onImageClick} />}
            {section.id === "dt-sportsday" && <ZAxisTunnelGallery images={section.galleryImages} color={caseColor} scrollContainer={scrollContainer} onImageClick={onImageClick} />}
            {!["dt-yep", "dt-teambuilding", "dt-sportsday"].includes(section.id) && <EditorialGallery images={section.galleryImages} onImageClick={onImageClick} />}
          </div>
        )}
      </div>

      {section.rewards && <IncentivesBlock rewards={section.rewards} color={caseColor} />}
      {!isLast && <div className="mt-8 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />}
    </motion.div>
  );
}

// ─── CaseCard — card chọn case study ───
export function CaseCard({
  cs,
  index,
  isInView,
  onSelect,
}: {
  cs: CaseStudy;
  index: number;
  isInView: boolean;
  onSelect: () => void;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  return (
    <motion.div ref={wrapperRef} initial={{ opacity: 0, y: 60 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: index * 0.15 }} onClick={onSelect} onMouseMove={(e) => {
      const rect = wrapperRef.current!.getBoundingClientRect();
      x.set((e.clientX - rect.left) / rect.width - 0.5);
      y.set((e.clientY - rect.top) / rect.height - 0.5);
    }} onMouseLeave={() => { x.set(0); y.set(0); }} className="group relative cursor-pointer flex-1 flex flex-col" style={{ perspective: "1200px" }}>
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative flex-1 w-full rounded-[24px] bg-[#0a0a0a] border border-white/10 overflow-hidden p-10 min-h-[480px]">
        {cs.cardImage && <Image src={cs.cardImage} alt="" fill className="object-cover opacity-10 grayscale group-hover:opacity-25 group-hover:grayscale-0 transition-all duration-700" unoptimized={true} />}
        <div className="relative z-10 h-full flex flex-col justify-between">
          <span className="font-heading font-bold text-8xl md:text-9xl opacity-10" style={{ color: cs.color }}>{String(index + 1).padStart(2, "0")}</span>
          <div>
            <h3 className="font-heading text-3xl md:text-5xl font-bold text-white mb-3 tracking-tight leading-[1.1] min-h-[2.2em] flex items-end">
              {isInView && (
                <VerticalCutReveal
                  splitBy="characters"
                  staggerDuration={0.02}
                  transition={{ type: "spring", stiffness: 150, damping: 20, delay: 0.1 }}
                >
                  {cs.company}
                </VerticalCutReveal>
              )}
            </h3>
            <p className="font-body text-[17px] md:text-[19px] text-white/40 min-h-[3em]">{cs.tagline}</p>
          </div>
          <div className="flex justify-between items-end border-t border-white/10 pt-6">
            <div>
              <p className="font-body text-[12px] text-white/40 font-bold uppercase tracking-[0.2em] leading-snug mb-1">Role</p>
              <p className="font-body text-[14px] md:text-[16px] text-white/60">{cs.role}</p>
            </div>
            <div className="text-white/30 group-hover:text-white transition-colors">View Case</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ThinksmartStory({
  cs,
  onBack,
}: {
  cs: CaseStudy;
  onBack: () => void;
}) {
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);
  const [activeSection, setActiveSection] = useState<string>(cs.sections[0]?.id || "");

  // Update Lenis when content changes
  useEffect(() => {
    // @ts-expect-error: window.lenis might not be typed globally
    if (window.lenis && typeof window.lenis.update === 'function') {
      // @ts-expect-error: window.lenis might not be typed globally
      window.lenis.update();
    }
    // Scroll to top on enter
    window.scrollTo(0, 0);
  }, [cs.sections]);

  // Intersection Observer for Sidebar Scroll Spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.1, rootMargin: "-30% 0px -30% 0px" }
    );

    cs.sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [cs.sections]);

  return (
    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-[1400px] mx-auto px-4 md:px-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center justify-between mb-16 pb-10 border-b border-white/10"
      >
        <div>
          <span className="font-body text-[12px] font-bold uppercase tracking-[0.3em] mb-4 block" style={{ color: cs.color }}>{cs.role}</span>
          <h3 className="font-heading text-5xl md:text-8xl font-bold text-white tracking-tighter">
            <VerticalCutReveal splitBy="characters" staggerDuration={0.02} transition={{ type: "spring", stiffness: 150, damping: 20, delay: 0.1 }}>
              {cs.company}
            </VerticalCutReveal>
          </h3>
        </div>
        <button onClick={onBack} className="group relative px-8 py-3 rounded-full border border-white/10 overflow-hidden transition-all">
          <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          <span className="relative z-10 text-[12px] font-bold uppercase tracking-[0.2em] text-white/60 group-hover:text-white transition-colors">Back to Archive</span>
        </button>
      </motion.div>

      {cs.videoUrl ? (
        <div className="mb-24">
          <FeaturedVideo src={cs.videoUrl} poster={cs.videoPoster || cs.heroImage} color={cs.color} />
        </div>
      ) : cs.heroImage ? (
        <div className="relative w-full aspect-[16/8] rounded-[2.5rem] overflow-hidden mb-24 border border-white/10 shadow-2xl">
          <Image src={cs.heroImage} alt="" fill className="object-cover" priority unoptimized={cs.heroImage?.includes("supabase.co")} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent opacity-80" />
        </div>
      ) : null}

      <div className="grid lg:grid-cols-[240px_1fr] gap-12 md:gap-24">
        {/* SIDEBAR */}
        <aside className="hidden lg:block">
          <div className="sticky top-32">
            <div className="relative flex flex-col gap-2 pl-6 border-l border-white/5">
              {cs.sections.map((s: CaseStudySection) => {
                const isActive = activeSection === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => {
                      const el = document.getElementById(s.id);
                      if (el) {
                        // @ts-expect-error: window.lenis might not be typed globally
                        if (window.lenis && typeof window.lenis.scrollTo === 'function') {
                          // @ts-expect-error: window.lenis might not be typed globally
                          window.lenis.scrollTo(el, { offset: -120, duration: 1.5 });
                        } else {
                          el.scrollIntoView({ behavior: "smooth" });
                        }
                      }
                    }}
                    className="group relative w-full text-left py-2 outline-none"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-nav"
                        className="absolute -left-[25px] top-1/2 -translate-y-1/2 w-[2px] h-6"
                        style={{ backgroundColor: cs.color, boxShadow: `0 0 15px ${cs.color}` }}
                      />
                    )}
                    <span className={cn(
                      "font-body text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300",
                      isActive ? "text-white scale-105" : "text-white/20 group-hover:text-white/50"
                    )}>
                      {s.label || s.title}
                    </span>
                  </button>
                );
              })}
            </div>
            
            <div className="mt-20 p-6 rounded-2xl bg-white/[0.02] border border-white/5">
               <span className="font-body text-[10px] text-white/30 uppercase tracking-widest block mb-4">Project Meta</span>
               <div className="space-y-4">
                  <div>
                    <span className="text-[10px] text-white/20 block mb-1">Duration</span>
                    <span className="text-[13px] text-white/60 font-bold">{cs.duration}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-white/20 block mb-1">Direct URL</span>
                    <a href={cs.website} target="_blank" rel="noopener" className="text-[13px] text-white/60 hover:text-white transition-colors underline decoration-white/20 underline-offset-4 font-bold">Visit Live Site</a>
                  </div>
               </div>
            </div>
          </div>
        </aside>

        {/* CONTENT */}
        <main className="pb-32">
          {cs.sections.map((s: CaseStudySection, i: number) => (
            <div key={s.id} className="mb-32 md:mb-56 last:mb-0">
              <StorySection section={s} caseColor={cs.color} isLast={i === cs.sections.length - 1} onImageClick={(idx) => setLightbox({ images: s.galleryImages || [], index: idx })} />
            </div>
          ))}
        </main>
      </div>
      <AnimatePresence>{lightbox && <FullscreenLightbox images={lightbox.images} initialIndex={lightbox.index} onClose={() => setLightbox(null)} />}</AnimatePresence>
    </motion.div>
  );
}

export function MarqueeStrip({ color }: { color: string }) {
  const items = ["Year End Party", "Team Building", "Event Media", "On-site Direction", "Highlight Reel", "Post Production"];
  return (
    <div className="relative w-full overflow-hidden py-6 border-y border-white/5">
      <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 18, ease: "linear", repeat: Infinity }} className="flex gap-10 whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="font-body text-[12px] font-bold uppercase tracking-[0.2em] text-white/40 flex items-center gap-3">
            {item}<span className="w-1 h-1 rounded-full" style={{ backgroundColor: color }} />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─── DreamTalentStory ───
export function DreamTalentStory({
  cs,
  scrollContainer,
  onBack,
}: {
  cs: CaseStudy;
  scrollContainer?: React.RefObject<HTMLDivElement | null>;
  onBack: () => void;
}) {
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <span className="px-4 py-1.5 rounded-full border border-white/20 text-[12px] font-bold uppercase tracking-[0.2em] mb-4 inline-block" style={{ color: cs.color }}>{cs.role}</span>
          <h2 className="font-heading text-6xl md:text-9xl font-bold text-white mb-4">
            <VerticalCutReveal splitBy="characters" staggerDuration={0.02} transition={{ type: "spring", stiffness: 150, damping: 20, delay: 0.1 }}>
              {cs.company}
            </VerticalCutReveal>
          </h2>
          <p className="font-body text-[17px] md:text-[19px] leading-[1.8] text-white/40 max-w-2xl">{cs.description}</p>
        </div>
        <button onClick={onBack} className="px-6 py-2.5 rounded-full border border-white/10 hover:bg-white/5 transition-all text-[12px] font-bold uppercase tracking-[0.2em] text-white/60">Back</button>
      </div>
      {cs.videoUrl ? (
        <div className="mb-20">
          <FeaturedVideo src={cs.videoUrl} poster={cs.videoPoster || cs.heroImage} color={cs.color} />
        </div>
      ) : cs.heroImage ? (
        <div className="relative w-full aspect-[16/7] rounded-3xl overflow-hidden mb-20 border border-white/5">
          <Image src={cs.heroImage} alt="" fill className="object-cover" priority unoptimized={cs.heroImage?.includes("supabase.co")} />
        </div>
      ) : null}
      {cs.sections.map((s: CaseStudySection, i: number) => (
        <div key={s.id}>
          {i > 0 && <MarqueeStrip color={cs.color} />}
          <StorySection 
            section={s} 
            caseColor={cs.color} 
            isLast={i === cs.sections.length - 1} 
            scrollContainer={scrollContainer}
            onImageClick={(idx) => setLightbox({ images: s.galleryImages || [], index: idx })} 
          />
        </div>
      ))}
      <AnimatePresence>{lightbox && <FullscreenLightbox images={lightbox.images} initialIndex={lightbox.index} onClose={() => setLightbox(null)} />}</AnimatePresence>
    </motion.div>
  );
}
