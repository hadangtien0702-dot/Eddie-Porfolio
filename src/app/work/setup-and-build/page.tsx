"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  setupHighlights as highlights,
  setupStory,
  gearDetails,
  GearItem,
  supplementaryGallery,
} from "@/data/work-setup-and-build";
import { FullscreenLightbox } from "@/components/03-CaseStudy/CaseStudyModals";

const Hotspot = ({ item, active }: { item: GearItem; active: boolean }) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0 }}
      className="absolute z-20"
      style={{ left: `${item.position.x}%`, top: `${item.position.y}%` }}
    >
      <div 
        className="relative group cursor-pointer"
        onMouseEnter={() => setShowInfo(true)}
        onMouseLeave={() => setShowInfo(false)}
      >
        <div className="w-4 h-4 bg-accent rounded-full animate-ping absolute" />
        <div className="w-4 h-4 bg-accent rounded-full border-2 border-white relative z-10 shadow-[0_0_15px_rgba(255,64,0,0.5)]" />
        
        <AnimatePresence>
          {showInfo && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 w-56 bg-black/80 backdrop-blur-xl p-4 rounded-2xl border border-white/20 shadow-2xl pointer-events-none z-30"
            >
              <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-3">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              <p className="text-sm font-bold text-white mb-1 leading-tight">{item.name}</p>
              <p className="text-[10px] text-accent font-mono mb-2">{item.model}</p>
              <ul className="space-y-1">
                {item.specs.map((s, i) => (
                  <li key={i} className="text-[9px] text-white/50 flex items-center gap-1.5">
                    <span className="w-1 h-1 bg-accent rounded-full" />
                    {s}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const InteractiveCanvasGallery = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section className="relative w-full py-32 bg-[#080808] overflow-hidden border-t border-white/5">
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 mb-20 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-white tracking-tighter mb-6">
            Build Documentation <span className="text-accent">Archive</span>
          </h2>
          <p className="font-body text-base text-white/50 leading-relaxed">
            Khám phá chi tiết quá trình thi công và lắp đặt thiết bị. <strong className="text-white">Kéo thả (Drag)</strong> để khám phá không gian lưu trữ hình ảnh thực tế từ dự án.
          </p>
        </motion.div>
      </div>

      {/* ── Draggable Canvas Area ── */}
      <div className="relative w-full h-[800px] cursor-grab active:cursor-grabbing overflow-hidden rounded-[3rem] border border-white/5 mx-auto max-w-[1550px] bg-black/40 shadow-inner">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/grid.svg')] bg-center" />

        <motion.div
          drag
          dragConstraints={{ left: -1500, right: 1500, top: -1500, bottom: 1500 }}
          dragElastic={0.1}
          dragMomentum={true}
          className="absolute top-1/2 left-1/2 w-[6000px] h-[6000px] -ml-[3000px] -mt-[3000px]"
        >
          {supplementaryGallery.map((item, i) => (
            <motion.div
              key={i}
              className="absolute group cursor-pointer"
              style={{
                left: `calc(50% + ${item.x}px)`,
                top: `calc(50% + ${item.y}px)`,
                rotate: item.rotation,
                zIndex: 10 + i,
              }}
              whileHover={{ 
                scale: 1.05, 
                zIndex: 100, 
                rotate: 0,
                transition: { duration: 0.3 }
              }}
              onClick={() => setLightboxIndex(i)}
            >
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-40 group-hover:opacity-0 transition-opacity duration-500 z-10" />
                <Image
                  src={item.src}
                  alt={`Build process ${i}`}
                  width={item.scale ? 400 * item.scale : 400}
                  height={item.scale ? 500 * item.scale : 500}
                  className="w-auto h-[250px] md:h-[350px] object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700"
                />
                
                <div className="absolute bottom-4 left-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-black/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full flex items-center justify-between">
                    <span className="font-mono text-[9px] text-white/60 uppercase tracking-widest">Build Log #{i + 1}</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-accent">
                      <line x1="15" y1="3" x2="21" y2="3" /><path d="M18 3l3 3-3 3" /><line x1="9" y1="21" x2="3" y2="21" /><path d="M6 21l-3-3 3-3" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <FullscreenLightbox
        isOpen={lightboxIndex !== null}
        onClose={() => setLightboxIndex(null)}
        images={supplementaryGallery.map(img => img.src)}
        currentIndex={lightboxIndex || 0}
      />
    </section>
  );
};

export default function SetupAndBuildPage() {
  const [activeStep, setActiveStep] = useState(0);

  const nextStep = () => setActiveStep((prev) => (prev + 1) % setupStory.length);
  const prevStep = () => setActiveStep((prev) => (prev - 1 + setupStory.length) % setupStory.length);

  return (
    <main className="min-h-screen bg-primary text-text-primary">
      {/* ─── Hero ─── */}
      <section className="relative w-full min-h-[85vh] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0">
          <Image 
            src="/images/services/setup-build/Firstroom.webp" 
            alt="Firstroom Raw Canvas" 
            fill 
            className="object-cover opacity-40 mix-blend-luminosity scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/50 to-transparent" />
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

      {/* ─── Visual Timeline Section ─── */}
      <section className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-16 pb-32">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="mb-12"
        >
          <h2 className="font-heading text-[32px] md:text-[48px] font-bold text-text-primary tracking-tight leading-none mb-4">
            The Build Sequence
          </h2>
          <p className="font-body text-[15px] text-text-secondary max-w-xl leading-relaxed">
            A chronological look at làm thế nào một không gian vật lý thô sơ được biến đổi thành một studio sản xuất chuyên nghiệp.
          </p>
        </motion.div>

        {/* ─── INTERACTIVE VIEWPORT ─── */}
        <div className="relative w-full aspect-video md:aspect-[21/9] rounded-[2.5rem] overflow-hidden border border-white/10 bg-black shadow-2xl group mb-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={setupStory[activeStep].images[0]}
                alt={setupStory[activeStep].title}
                fill
                className={`object-cover transition-all duration-1000 ${
                  setupStory[activeStep].type === 'raw' ? 'grayscale brightness-75' : 
                  setupStory[activeStep].type === 'blueprint' ? 'grayscale sepia-[0.2] opacity-40' : 
                  'grayscale-0'
                }`}
                priority
              />

              {/* Blueprint Grid Overlay */}
              {setupStory[activeStep].type === 'blueprint' && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  className="absolute inset-0 bg-blue-900/10 mix-blend-overlay pointer-events-none"
                >
                  <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                </motion.div>
              )}

              {/* Gear Hotspots */}
              {(setupStory[activeStep].type === 'hardware' || setupStory[activeStep].type === 'operation') && (
                <div className="absolute inset-0 z-20">
                  {gearDetails.map((item) => (
                    <Hotspot key={item.id} item={item} active={setupStory[activeStep].type === 'operation'} />
                  ))}
                </div>
              )}

              {/* Scanning Lines */}
              {setupStory[activeStep].type === 'operation' && (
                <div className="absolute inset-0 z-10 pointer-events-none">
                  <motion.div 
                    animate={{ top: ["-10%", "110%"] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-[2px] bg-accent/30 blur-[2px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* HUD Info Overlay */}
          <div className="absolute bottom-6 left-6 right-6 z-30 flex flex-col md:flex-row items-end justify-between gap-6 pointer-events-none">
            <div className="pointer-events-auto bg-black/60 backdrop-blur-xl border border-white/10 px-6 py-5 rounded-3xl max-w-sm">
              <motion.span 
                key={`phase-${activeStep}`}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="font-mono text-[9px] text-accent font-bold tracking-[0.3em] block mb-2"
              >
                SYSTEM_PHASE_0{activeStep + 1}
              </motion.span>
              <motion.h3 
                key={`title-${activeStep}`}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="font-heading text-2xl font-bold text-white mb-2 tracking-tight"
              >
                {setupStory[activeStep].title}
              </motion.h3>
              <motion.p 
                key={`desc-${activeStep}`}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="font-body text-[13px] text-white/50 leading-relaxed"
              >
                {setupStory[activeStep].description}
              </motion.p>
            </div>

            {/* Navigation */}
            <div className="pointer-events-auto flex items-center gap-4 bg-white/5 backdrop-blur-2xl border border-white/10 p-2 rounded-full">
              <button onClick={prevStep} className="w-12 h-12 rounded-full flex items-center justify-center bg-black/40 hover:bg-accent text-white transition-all active:scale-90 shadow-xl">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
              </button>
              <div className="flex gap-2.5 px-2">
                {setupStory.map((_, idx) => (
                  <button key={idx} onClick={() => setActiveStep(idx)} className={`h-1.5 rounded-full transition-all duration-500 ${activeStep === idx ? 'w-8 bg-accent' : 'w-1.5 bg-white/20'}`} />
                ))}
              </div>
              <button onClick={nextStep} className="w-12 h-12 rounded-full flex items-center justify-center bg-black/40 hover:bg-accent text-white transition-all active:scale-90 shadow-xl">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            </div>
          </div>
        </div>

        {/* ─── Timeline Steps indicator ─── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-32">
          {setupStory.map((step, idx) => (
            <button
              key={step.number}
              onClick={() => setActiveStep(idx)}
              className={`p-6 rounded-2xl border transition-all duration-500 text-left ${
                activeStep === idx 
                  ? 'bg-accent/5 border-accent/30 shadow-[0_10px_30px_rgba(255,64,0,0.05)]' 
                  : 'bg-white/[0.02] border-white/[0.05] hover:border-white/20'
              }`}
            >
              <span className={`font-heading font-black text-3xl mb-3 block transition-colors ${activeStep === idx ? 'text-accent' : 'text-white/10'}`}>
                {step.number}
              </span>
              <h4 className={`font-heading font-bold text-sm mb-2 ${activeStep === idx ? 'text-white' : 'text-white/40'}`}>
                {step.title}
              </h4>
              <div className={`h-0.5 w-full bg-white/5 rounded-full overflow-hidden`}>
                <motion.div 
                  initial={false}
                  animate={{ width: activeStep === idx ? "100%" : "0%" }}
                  className="h-full bg-accent"
                />
              </div>
            </button>
          ))}
        </div>

        {/* ─── INTERACTIVE CANVAS GALLERY ─── */}
        <InteractiveCanvasGallery />

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
