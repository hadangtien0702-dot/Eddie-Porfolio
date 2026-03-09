"use client";

// ─── Contact CTA Section ───
// Mô tả: Call to action cuối — kêu gọi liên hệ

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { contactData } from "@/data/contact";

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="contact"
      className="relative w-full py-section-mobile lg:py-section overflow-hidden bg-primary"
    >
      {/* Accent glow bg */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    w-[800px] h-[500px] bg-accent/8 rounded-full blur-[180px] pointer-events-none" />

      <div className="relative z-10 max-w-[900px] mx-auto px-6 md:px-12 lg:px-16 text-center">
        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full
                   border border-accent/20 bg-accent/5"
        >
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="font-body text-[12px] text-white/70 uppercase tracking-wider">
            {contactData.availability}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading text-[clamp(36px,6vw,72px)] font-bold text-white leading-[1.1]
                   tracking-tight mb-6"
        >
          {contactData.headline}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-body text-body-lg text-text-secondary mb-12 max-w-lg mx-auto"
        >
          {contactData.subtitle}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Primary — Email */}
          <a
            href={`mailto:${contactData.email}`}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full
                     bg-accent hover:bg-accent-warm
                     font-body text-[15px] font-medium text-white
                     shadow-[0_0_30px_rgba(239,68,68,0.3)]
                     hover:shadow-[0_0_50px_rgba(239,68,68,0.4)]
                     hover:scale-105
                     transition-all duration-500"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 4L12 13L2 4" />
            </svg>
            Get in Touch
          </a>

          {/* Secondary — LinkedIn */}
          <a
            href={contactData.socials[0]?.href || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full
                     border border-white/15 hover:border-white/30
                     hover:bg-white/5
                     font-body text-[15px] font-medium text-white/80 hover:text-white
                     transition-all duration-500"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 flex items-center justify-center gap-4"
        >
          {contactData.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-white/[0.08]
                       flex items-center justify-center
                       hover:border-accent/30 hover:bg-accent/5
                       transition-all duration-300
                       font-body text-[14px] text-white/40 hover:text-white/80"
            >
              {social.icon}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
