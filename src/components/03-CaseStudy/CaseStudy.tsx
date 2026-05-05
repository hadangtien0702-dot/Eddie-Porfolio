"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  caseStudies,
  caseStudyHeading,
} from "@/data/casestudy";
import VerticalCutReveal from "@/components/ui/VerticalCutReveal";
import { CaseCard } from "./CaseStudyLayouts";
import { useRouter } from "next/navigation";

export default function CaseStudy() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const router = useRouter();

  return (
    <section
      ref={sectionRef}
      id="case-study"
      className="relative w-full py-24 lg:py-40 overflow-hidden bg-primary"
    >
      {/* ─── Decorative background glow ─── */}
      <div
        id="case-study-bg-glow"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                  w-[800px] h-[600px] bg-accent/5 rounded-full blur-[150px] pointer-events-none"
      />

      <div
        id="case-study-container"
        className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16"
      >
        {/* Background Ghost Text - Huge & Layered */}
        <div className="absolute -top-32 -left-20 pointer-events-none select-none opacity-[0.02] z-0">
          <span className="font-heading text-[380px] font-bold leading-none tracking-tighter">WORKS</span>
        </div>

        {/* Unified Asymmetric Grid ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 lg:gap-x-24 gap-y-6 lg:gap-y-10 items-start">
          
          {/* ─── ROW 1 LEFT: The Main Title ─── */}
          <div className="col-span-12 lg:col-span-7 relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-4"
            >
              <span className="font-mono text-[11px] text-accent font-bold tracking-[0.4em] uppercase py-1 px-3 border border-accent/20 rounded-sm bg-accent/5">
                STRATEGIC_LOG
              </span>
              <div className="h-[1px] w-24 bg-white/10" />
            </motion.div>

            <div className="relative mb-2 lg:mb-4">
              <h2 className="font-heading text-white tracking-[-0.05em] leading-[0.8] flex flex-col">
                <span className="text-[clamp(64px,12vw,140px)] font-bold">Selected</span>
                <span className="text-[clamp(64px,12vw,140px)] font-light text-white/20 italic -mt-4 lg:-mt-8 ml-[0.5em]">
                  Stories
                </span>
              </h2>
            </div>
          </div>

          {/* ─── ROW 1 RIGHT: Tech Spec Box ─── */}
          <div className="col-span-12 lg:col-span-5 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative p-8 border border-white/5 bg-white/[0.01] backdrop-blur-md rounded-2xl"
            >
              <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-accent/30 rounded-tr-2xl" />
              
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="font-mono text-[10px] text-white/30 tracking-[0.3em] uppercase">System_Overview</span>
              </div>

              <p className="font-body text-[16px] text-white/50 leading-relaxed italic mb-8">
                {caseStudyHeading.description}
              </p>

              <div className="grid grid-cols-2 gap-6 border-t border-white/5 pt-6">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[10px] text-accent/60 uppercase tracking-widest">Efficiency</span>
                  <span className="font-heading text-[16px] text-white font-bold">SYSTEMATIC_ROI</span>
                </div>
                <div className="flex flex-col gap-1 text-right">
                  <span className="font-mono text-[10px] text-accent/60 uppercase tracking-widest">Output</span>
                  <span className="font-heading text-[16px] text-white font-bold">HIGH_CONVERSION</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ─── ROW 2 LEFT: Case 01 ─── */}
          <div className="col-span-12 lg:col-span-7 relative">
            <CaseCard
              cs={caseStudies[0]}
              index={0}
              isInView={isInView}
              onSelect={() => router.push(`/casestudy/${caseStudies[0].id}`)}
            />
          </div>

          {/* ─── ROW 2 RIGHT: Case 02 ─── */}
          <div className="col-span-12 lg:col-span-5 relative">
             <CaseCard
              cs={caseStudies[1]}
              index={1}
              isInView={isInView}
              onSelect={() => router.push(`/casestudy/${caseStudies[1].id}`)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
