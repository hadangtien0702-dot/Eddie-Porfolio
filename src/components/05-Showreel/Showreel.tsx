"use client";

// ─── Video Showreel Section ───
// Mô tả: Embed video demo reel — centered, cinematic frame
// Placeholder: YouTube thumbnail, user thay link sau

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export default function Showreel() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section
      ref={ref}
      id="showreel"
      className="relative w-full py-section-mobile lg:py-section overflow-hidden bg-primary"
    >
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    w-[600px] h-[400px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block font-body text-overline text-accent uppercase tracking-[0.15em] font-medium mb-4"
          >
            SHOWREEL
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-heading text-display font-bold text-white mb-4"
          >
            See the Work
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-body text-body-lg text-text-secondary max-w-lg mx-auto"
          >
            A curated selection of creative work — from concept to final delivery.
          </motion.p>
        </div>

        {/* Video Container */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative group rounded-3xl overflow-hidden
                   border border-white/[0.08] hover:border-white/15
                   transition-all duration-700"
        >
          {/* Accent border glow */}
          <div className="absolute -inset-[1px] rounded-3xl opacity-0 group-hover:opacity-100
                       transition-opacity duration-700 -z-10"
            style={{
              background: "linear-gradient(135deg, #ef4444, transparent, #e8512d)",
              filter: "blur(1px)",
            }}
          />

          {/* Video area */}
          <div className="relative aspect-video bg-surface rounded-3xl overflow-hidden">
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
                {/* Placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-surface via-elevated to-surface" />

                {/* Grid pattern */}
                <div className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                     linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: "40px 40px",
                  }}
                />

                {/* Center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-heading text-h2 font-bold text-white/10 mb-2">
                    SHOWREEL
                  </span>
                  <span className="font-body text-[13px] text-white/20">
                    Replace with your video
                  </span>
                </div>

                {/* Play button */}
                <button
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center cursor-pointer z-10"
                >
                  <div className="relative">
                    {/* Pulse ring */}
                    <div className="absolute inset-0 w-20 h-20 md:w-24 md:h-24 rounded-full
                                 bg-accent/20 animate-ping" />

                    {/* Button */}
                    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full
                                 bg-accent/90 backdrop-blur-sm flex items-center justify-center
                                 hover:bg-accent hover:scale-110
                                 transition-all duration-300 shadow-[0_0_40px_rgba(239,68,68,0.3)]">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                        <polygon points="8,5 19,12 8,19" />
                      </svg>
                    </div>
                  </div>
                </button>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
