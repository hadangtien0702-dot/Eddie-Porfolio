"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import GlowBorder from "@/components/ui/GlowBorder";

export default function Showreel() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section
      ref={ref}
      id="showreel"
      className="relative w-full py-16 lg:py-20 overflow-hidden bg-primary"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Header — left-aligned, editorial */}
        <div className="mb-8 lg:mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-body text-[11px] text-accent uppercase tracking-[0.2em] font-medium mb-3">
              Showreel
            </p>
            <h2
              className="font-heading font-bold text-white leading-[0.95] tracking-tight"
              style={{ fontSize: "clamp(32px, 4.5vw, 60px)" }}
            >
              See the Work
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="font-body text-[14px] text-white/40 max-w-xs leading-relaxed md:text-right"
          >
            A curated selection of creative work — from concept to final delivery.
          </motion.p>
        </div>

        {/* Video Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
        <GlowBorder
          borderRadius="16px"
          borderWidth={1.5}
          glowSize={450}
          color="rgba(255,64,0,0.6)"
          className="w-full"
          style={{ border: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div className="relative aspect-video bg-surface overflow-hidden">
            {isPlaying ? (
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0"
                className="absolute inset-0 w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="Eddie Showreel"
              />
            ) : (
              <>
                {/* Subtle grid */}
                <div
                  className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
                                     linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
                    backgroundSize: "60px 60px",
                  }}
                />

                {/* Center placeholder text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span
                    className="font-heading font-bold text-white/[0.04] tracking-widest select-none"
                    style={{ fontSize: "clamp(32px, 6vw, 72px)" }}
                  >
                    SHOWREEL
                  </span>
                </div>

                {/* Play button */}
                <button
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center cursor-pointer z-10 group"
                >
                  <div className="relative flex items-center justify-center">
                    {/* Slow breathing ring */}
                    <motion.div
                      className="absolute rounded-full border border-white/10"
                      style={{ width: 96, height: 96 }}
                      animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                    {/* Button */}
                    <div
                      className="relative w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        backdropFilter: "blur(12px)",
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="white" className="ml-1 opacity-80">
                        <polygon points="8,5 19,12 8,19" />
                      </svg>
                    </div>
                  </div>
                </button>
              </>
            )}
          </div>
        </GlowBorder>
        </motion.div>
      </div>
    </section>
  );
}
