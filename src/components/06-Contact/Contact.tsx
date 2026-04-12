"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { contactData } from "@/data/contact";
import GlowBorder from "@/components/ui/GlowBorder";

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <GlowBorder
      borderRadius="0px"
      borderWidth={1}
      glowSize={600}
      color="rgba(255,64,0,0.45)"
      className="w-full bg-primary"
    >
    <section
      ref={ref}
      id="contact"
      className="relative w-full py-16 lg:py-24 overflow-hidden"
    >
      {/* Very subtle ambient glow — not centered, shifted right */}
      <div
        className="absolute bottom-0 right-0 w-[700px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at bottom right, rgba(255,64,0,0.07) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">

        {/* Top row — overline + availability */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-between mb-6 lg:mb-8"
        >
          <span className="font-body text-[11px] text-white/25 uppercase tracking-[0.2em]">
            Contact
          </span>

          {/* Availability — right side */}
          <div className="inline-flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-50" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="font-body text-[12px] text-white/40 tracking-wide">
              {contactData.availability}
            </span>
          </div>
        </motion.div>

        {/* Headline — large, left-aligned, no max-width cap */}
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading font-bold text-white leading-[0.92] tracking-tight mb-10 lg:mb-12"
          style={{ fontSize: "clamp(36px, 6vw, 80px)" }}
        >
          {contactData.headline}
        </motion.h2>

        {/* Bottom row — subtitle left, CTAs right */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-10"
        >
          {/* Subtitle */}
          <p className="font-body text-[15px] text-white/40 max-w-sm leading-relaxed">
            {contactData.subtitle}
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Primary — Email */}
            <a
              href={`mailto:${contactData.email}`}
              className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full font-body text-[14px] font-medium text-white transition-colors duration-300"
              style={{
                background: "#FF4000",
              }}
            >
              Get in Touch
              <svg
                width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>

            {/* Secondary — LinkedIn */}
            <a
              href={contactData.socials[0]?.href || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 font-body text-[14px] text-white/40 hover:text-white/70 transition-colors duration-300 py-3.5"
            >
              <span className="relative overflow-hidden">
                <span className="block">LinkedIn</span>
                <span
                  className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500"
                  style={{ background: "rgba(255,255,255,0.3)" }}
                />
              </span>
              <svg
                width="13" height="13" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="opacity-40 group-hover:opacity-70 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          </div>
        </motion.div>

        {/* Social links — minimal row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 pt-6 border-t border-white/[0.05] flex items-center gap-6"
        >
          {contactData.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group font-body text-[12px] text-white/25 hover:text-white/60 uppercase tracking-[0.12em] transition-colors duration-300 flex items-center gap-1.5"
            >
              {social.label}
              <svg
                width="10" height="10" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
    </GlowBorder>
  );
}
