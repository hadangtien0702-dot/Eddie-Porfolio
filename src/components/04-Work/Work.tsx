"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { services, servicesHeading, Service } from "@/data/services";
import VideoCarousel3D from "./VideoCarousel3D";

// ─── ServiceCard — Advanced Expanding Accordion Card ───
function ServiceCard({
  svc,
  isActive,
  index,
  isInView,
  onHover,
  onOpenCarousel,
}: {
  svc: Service;
  isActive: boolean;
  index: number;
  isInView: boolean;
  onHover: (id: string | null) => void;
  onOpenCarousel: () => void;
}) {
  return (
    <motion.div
      layout
      onMouseEnter={() => onHover(svc.id)}
      onClick={() => onHover(svc.id)}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{
        opacity: { duration: 0.6, delay: 0.3 + index * 0.1 },
        layout: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
      }}
      className="relative rounded-3xl overflow-hidden group cursor-none"
      style={{
        background: "#0a0a0a",
        flex: isActive ? 6 : 1,
        // The flex proportion changes how much space it takes in the flex container
        // Smooth layout transition transforms width on desktop, height on mobile.
      }}
    >
      {/* ─── Background Parallax Image ─── */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        animate={{ scale: isActive ? 1.05 : 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <Image
          src={svc.image || ""}
          alt={svc.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 40vw"
        />
      </motion.div>

      {/* ─── Adaptive Overlay ─── */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: isActive
            ? "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%)"
            : "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 100%)",
        }}
        transition={{ duration: 0.5 }}
      />

      {/* ─── Collapsed State (Vertical Text) ─── */}
      <AnimatePresence>
        {!isActive && (
           <motion.div 
             key="vertical"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             transition={{ duration: 0.2 }}
             className="absolute inset-0 flex flex-col items-center justify-end pb-8 pointer-events-none"
           >
              {/* Display writing vertical for desktop, normal horizontal for mobile */}
              <h3 
                className="font-heading font-bold text-[#aaa] text-[clamp(14px,2vw,18px)] tracking-[0.2em] uppercase whitespace-nowrap md:writing-vertical md:rotate-180" 
                style={{ WebkitWritingMode: "vertical-rl", writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                {svc.title}
              </h3>
           </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Expanded State (Horizontal Typography & CTA) ─── */}
      <AnimatePresence>
        {isActive && (
           <motion.div 
             key="horizontal"
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: 30 }}
             transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
             className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6 pointer-events-none"
           >
              <div className="flex flex-col gap-3 pointer-events-auto">
                 <span className="font-body font-bold text-[10px] px-3 py-1 rounded border border-white/20 bg-white/10 backdrop-blur-md text-white w-fit uppercase tracking-widest">
                    {svc.tag}
                 </span>
                 <h3 className="font-heading font-black text-white text-3xl md:text-5xl lg:text-6xl tracking-tight leading-none drop-shadow-[0_10px_20px_rgba(0,0,0,1)]">
                    {svc.title}
                 </h3>
              </div>

              {/* Action buttons */}
              <div className="pointer-events-auto shrink-0 flex flex-wrap gap-3">
                 {svc.links && svc.links.length > 0 ? (
                   svc.links.map((link, idx) => {
                     if (svc.id === "video-editor") {
                       return (
                         <button
                           key={idx}
                           onClick={(e) => { e.stopPropagation(); onOpenCarousel(); }}
                           className="font-body text-[11px] font-bold px-5 py-3 md:py-4 rounded bg-white text-black hover:bg-[#ff3300] hover:text-white transition-colors duration-300 flex items-center gap-2 uppercase tracking-widest"
                         >
                           3D Showcase
                           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                             <polygon points="5 3 19 12 5 21 5 3" />
                           </svg>
                         </button>
                       );
                     }
                     const isExternal = link.url.startsWith("http");
                     const cls = "font-body text-[11px] font-bold px-5 py-3 md:py-4 rounded bg-[#ff3300] text-white hover:bg-white hover:text-black transition-colors duration-300 flex items-center gap-2 uppercase tracking-widest";
                     
                     return isExternal ? (
                       <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" className={cls}>
                         {link.label}
                       </a>
                     ) : (
                       <Link key={idx} href={link.url} className={cls}>
                         {link.label}
                       </Link>
                     );
                   })
                 ) : (
                   <button
                     className="font-body text-[11px] font-bold px-5 py-3 md:py-4 rounded border-2 border-white text-white hover:bg-white hover:text-black transition-colors duration-300 flex items-center uppercase tracking-widest"
                     onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                   >
                     Deploy Now
                   </button>
                 )}
              </div>
           </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main Work Section ───
export default function Work() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  // Default to the first service so one is always expanded!
  const [activeId, setActiveId] = useState<string | null>(services[0].id);

  return (
    <section
      ref={ref}
      id="work"
      className="relative w-full overflow-hidden"
      style={{ background: "#FBFBFB" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pt-16 pb-10 lg:pt-24 lg:pb-14">
        {/* ─── Heading ─── */}
        <div className="relative mb-10 lg:mb-14">
          <div className="flex items-start justify-between gap-8 mb-5">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="font-body text-[11px] uppercase tracking-[0.2em]"
              style={{ color: "#aaaaaa" }}
            >
              Services
            </motion.span>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="font-body text-[13px] leading-[1.7] max-w-[260px] text-right hidden md:block"
              style={{ color: "#9b9b9b" }}
            >
              {servicesHeading.descriptionRight}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2
              className="font-heading font-bold leading-[0.88] tracking-[-0.03em]"
              style={{ fontSize: "clamp(34px, 5.5vw, 72px)", color: "#040404" }}
            >
              {servicesHeading.titleBold}
              <br />
              <span style={{ color: "#CCCCCC" }}>{servicesHeading.titleFaded}</span>
            </h2>
          </motion.div>
        </div>

        {/* ─── Cinematic Expanding Accordion Container ─── */}
        <motion.div
          onMouseLeave={() => window.innerWidth > 1024 && setActiveId(services[0].id)}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row gap-3 lg:gap-4 w-full h-[650px] lg:h-[600px] xl:h-[700px]"
        >
          {services.map((svc, i) => (
            <ServiceCard
              key={svc.id}
              svc={svc}
              isActive={activeId === svc.id}
              index={i}
              isInView={isInView}
              onHover={setActiveId}
              onOpenCarousel={() => setIsCarouselOpen(true)}
            />
          ))}
        </motion.div>
      </div>

      <VideoCarousel3D isOpen={isCarouselOpen} onClose={() => setIsCarouselOpen(false)} />
    </section>
  );
}
