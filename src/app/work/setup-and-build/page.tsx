"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  setupHighlights as highlights,
  setupStory,
} from "@/data/work-setup-and-build";

export default function SetupAndBuildPage() {
  return (
    <main className="min-h-screen bg-primary text-text-primary">
      {/* ─── Hero ─── */}
      <section className="relative w-full min-h-[65vh] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-accent/8 blur-[160px] rounded-full" />
        </div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pb-16 pt-40">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 font-body text-sm text-text-muted hover:text-text-primary transition-colors mb-16"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Work
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-body text-accent tracking-[0.2em] text-[11px] font-semibold uppercase mb-6">
              Studio & Operations
            </p>
            <h1
              className="font-heading font-bold leading-[1.05] tracking-tight mb-8 max-w-4xl"
              style={{ fontSize: "clamp(40px, 6vw, 80px)", color: "#FBFBFB" }}
            >
              Setup and Build
            </h1>
            <p className="font-body text-[16px] text-text-secondary font-light max-w-2xl leading-relaxed">
              From a raw house to a fully operational production system — handling the complete studio setup, equipment scaling, and workflow optimization from day one.
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary to-transparent pointer-events-none" />
      </section>

      {/* ─── Highlights ─── */}
      <section className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              className="rounded-2xl p-8"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <p className="font-body text-[11px] text-text-muted uppercase tracking-widest mb-3">
                {item.label}
              </p>
              <p className="font-heading text-[36px] font-bold text-text-primary mb-4 tracking-tight">
                {item.value}
              </p>
              <p className="font-body text-[13px] text-text-secondary leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Visual Sticky Timeline ─── */}
      <section className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-16 pb-32">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="mb-20 md:mb-32"
        >
          <h2 className="font-heading text-[32px] md:text-[48px] font-bold text-text-primary tracking-tight">
            The Build Sequence
          </h2>
          <p className="font-body text-[15px] text-text-secondary mt-3 max-w-xl">
            A chronological look at how an empty physical space was transformed into a hybrid production and broadcast facility.
          </p>
        </motion.div>

        <div className="flex flex-col gap-32 md:gap-48 relative">
          {/* Vertical central tracking line (optional, adds technical feel) */}
          <div className="absolute left-6 md:left-[calc(33.333%+1rem)] top-0 bottom-0 w-[1px] bg-white/[0.05] hidden md:block" />

          {setupStory.map((moment, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 lg:gap-24 relative">
              
              {/* ─── Sticky Text Sidebar ─── */}
              <div className="col-span-1 md:col-span-4 relative">
                <div className="md:sticky md:top-40 flex flex-col pt-4">
                  <span
                    className="font-heading font-black text-[80px] leading-none mb-4 tracking-tighter opacity-20"
                    style={{ color: "rgba(255,64,0,1)" }}
                  >
                    {moment.number}
                  </span>
                  <h3 className="font-heading font-semibold text-[28px] md:text-[36px] text-text-primary mb-4 leading-tight">
                    {moment.title}
                  </h3>
                  <p className="font-body text-[15px] text-text-secondary leading-relaxed max-w-sm">
                    {moment.description}
                  </p>
                </div>
              </div>

              {/* ─── Scrolling Image Reel ─── */}
              <div className="col-span-1 md:col-span-8 flex flex-col gap-8 md:gap-16">
                {moment.images.map((src, imgIdx) => (
                  <motion.div
                    key={imgIdx}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="relative w-full rounded-3xl overflow-hidden border border-white/[0.04] bg-white/[0.02] shadow-2xl"
                    style={{ aspectRatio: imgIdx === 0 ? "16/9" : "4/3" }} // First image wider
                  >
                    <Image
                      src={src}
                      alt={`${moment.title} detail ${imgIdx + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 66vw"
                    />
                  </motion.div>
                ))}
              </div>

            </div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-40 rounded-3xl p-12 md:p-16 text-center"
          style={{
            background: "linear-gradient(135deg, rgba(255,64,0,0.08) 0%, rgba(255,64,0,0.02) 100%)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <p className="font-body text-[11px] text-accent uppercase tracking-widest mb-4">
            System Operations
          </p>
          <h3 className="font-heading text-[24px] md:text-[32px] font-bold text-text-primary mb-6">
            Ready to scale your production?
          </h3>
          <p className="font-body text-[14px] text-text-secondary max-w-md mx-auto mb-10 leading-relaxed">
            I build studios meant to run like clockwork. Let&apos;s discuss your physical and digital structural needs.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 font-body text-[13px] font-medium px-6 py-3 rounded-full transition-all duration-300 hover:scale-105"
            style={{
              background: "rgba(255,64,0,0.12)",
              color: "#FF4000",
              border: "1px solid rgba(255,64,0,0.28)",
            }}
          >
            Get in touch
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
