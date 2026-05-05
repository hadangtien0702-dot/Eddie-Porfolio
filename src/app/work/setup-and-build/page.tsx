"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
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
import { uiSounds } from "@/utils/ui-sounds";

const BackgroundParticles = () => {
  const particles = useMemo(() => Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5
  })), []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute bg-accent rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

const CinematicHUDCard = ({ item, index, onClick }: { item: any, index: number, onClick: () => void }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  function handleMouseMove(e: React.MouseEvent) {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      className="absolute group cursor-pointer"
      style={{
        left: `calc(50% + ${item.x * 1.2}px)`,
        top: `calc(50% + ${item.y * 1.2}px)`,
        zIndex: 10 + index,
        perspective: "1000px"
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      onClick={() => { uiSounds.playClick(); onClick(); }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.1, zIndex: 100 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative"
      >
        {/* HUD Frame Decorative Elements */}
        <div className="absolute -inset-4 border border-accent/0 group-hover:border-accent/20 rounded-2xl transition-colors duration-500 pointer-events-none">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-accent/40 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-accent/40 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-accent/40 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-accent/40 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Data Scanner Line */}
        <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none z-20">
          <motion.div 
            animate={{ top: ["-10%", "110%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-[2px] bg-accent/40 blur-[2px] opacity-0 group-hover:opacity-100"
          />
        </div>

        <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-black/80 backdrop-blur-sm group-hover:border-accent/30 transition-colors duration-500">
          <Image
            src={item.src}
            alt={`Build process ${index}`}
            width={400 * (item.scale || 1)}
            height={500 * (item.scale || 1)}
            className="w-auto h-[250px] md:h-[350px] object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
          />
          
          {/* HUD Metadata Overlay */}
          <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="bg-black/60 backdrop-blur-md border border-white/10 px-2 py-1 rounded font-mono text-[8px] text-accent tracking-tighter uppercase">
              SCAN_ID: 0{index + 1}
            </div>
          </div>

          <div className="absolute bottom-4 left-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-black/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-mono text-[8px] text-accent font-bold uppercase tracking-widest">Digital Archive</span>
                <span className="font-heading text-[10px] text-white font-bold uppercase">Build Sequence #{index + 1}</span>
              </div>
              <div className="w-6 h-6 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-accent animate-pulse">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Outer Glow */}
        <div className="absolute inset-0 bg-accent/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
      </motion.div>
    </motion.div>
  );
};

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
    <section className="relative w-full pt-12 pb-32 bg-[#050505] overflow-hidden border-t border-white/5">
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 mb-12 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl"
        >
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-white tracking-tighter mb-6 whitespace-nowrap">
            Build Documentation <span className="text-accent">Archive</span>
          </h2>
        </motion.div>
      </div>

      {/* ── Draggable Canvas Area ── */}
      <div className="relative w-full h-[850px] cursor-grab active:cursor-grabbing overflow-hidden rounded-[4rem] border border-white/5 mx-auto max-w-[1550px] bg-[#050505] shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] perspective-[2000px]">
        {/* Background Layer: Particles & Grid */}
        <BackgroundParticles />
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('/grid.svg')] bg-[length:40px_40px] mix-blend-overlay" />
        
        {/* HUD Center Crosshair */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-10">
          <div className="w-40 h-40 border border-accent/40 rounded-full flex items-center justify-center">
            <div className="w-1 h-1 bg-accent rounded-full" />
            <div className="absolute w-full h-[1px] bg-accent/20" />
            <div className="absolute h-full w-[1px] bg-accent/20" />
          </div>
        </div>

        {/* HUD Instruction Overlay */}
        <div className="absolute bottom-10 left-10 z-30 pointer-events-none">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-start gap-4 bg-black/40 backdrop-blur-md border border-white/10 p-5 rounded-2xl"
          >
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-accent animate-pulse">
                <path d="M15 18-6-6 6-6"/><path d="M12 5v14M5 12h14" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-[9px] text-accent font-bold uppercase tracking-[0.2em] mb-1">Navigation Protocol</span>
              <p className="font-body text-[13px] text-white/60 leading-relaxed max-w-[280px]">
                Khám phá chi tiết quá trình thi công. <strong className="text-white">Kéo thả (Drag)</strong> để di chuyển trong không gian lưu trữ.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          drag
          dragConstraints={{ left: -1800, right: 1800, top: -1800, bottom: 1800 }}
          dragElastic={0.15}
          dragMomentum={true}
          className="absolute top-1/2 left-1/2 w-[6000px] h-[6000px] -ml-[3000px] -mt-[3000px]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {supplementaryGallery.map((item, i) => (
            <CinematicHUDCard 
              key={i} 
              item={item} 
              index={i} 
              onClick={() => setLightboxIndex(i)} 
            />
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <FullscreenLightbox
            onClose={() => setLightboxIndex(null)}
            images={supplementaryGallery.map(img => img.src)}
            initialIndex={lightboxIndex}
          />
        )}
      </AnimatePresence>
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

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pb-6 pt-24">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 font-body text-sm text-text-muted hover:text-text-primary transition-colors mb-8"
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
              className="font-heading font-bold leading-[1.05] tracking-tight mb-4 max-w-4xl"
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
      <section className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-10">
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
      <section className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pt-8 pb-0">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="mb-16"
        >
          <h2 className="font-heading text-[32px] md:text-[56px] font-bold text-text-primary tracking-tight leading-none mb-6">
            The Build Sequence
          </h2>
          <p className="font-body text-[16px] text-text-secondary max-w-xl leading-relaxed opacity-70">
            A chronological look at làm thế nào một không gian vật lý thô sơ được biến đổi thành một studio sản xuất chuyên nghiệp.
          </p>
        </motion.div>

        {/* ─── INTERACTIVE VIEWPORT ─── */}
        <div className="relative w-full aspect-video md:aspect-[21/9] rounded-[3rem] overflow-hidden border border-white/10 bg-black shadow-2xl group mb-8">
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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

      </section>

      {/* ─── INTERACTIVE CANVAS GALLERY ─── */}
      <InteractiveCanvasGallery />

      {/* ─── CTA SECTION ─── */}
      <section className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-[3rem] p-12 md:p-24 text-center overflow-hidden relative"
          style={{
            background: "linear-gradient(135deg, rgba(255,64,0,0.08) 0%, rgba(255,64,0,0.02) 100%)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {/* Subtle background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-accent/5 blur-[120px] pointer-events-none" />

          <p className="relative z-10 font-body text-[11px] text-accent uppercase tracking-[0.3em] font-bold mb-6">
            System Operations
          </p>
          <h3 className="relative z-10 font-heading text-[32px] md:text-[48px] font-bold text-text-primary mb-8 tracking-tight leading-tight">
            Ready to scale your <br className="hidden md:block" /> production?
          </h3>
          <p className="relative z-10 font-body text-[16px] text-text-secondary max-w-lg mx-auto mb-12 leading-relaxed opacity-70">
            I build studios meant to run like clockwork. Let&apos;s discuss your physical and digital structural needs.
          </p>
          <Link
            href="/#contact"
            className="relative z-10 inline-flex items-center gap-3 font-body text-[14px] font-bold px-10 py-4 rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: "#FF4000",
              color: "white",
              boxShadow: "0 10px 30px rgba(255,64,0,0.3)",
            }}
          >
            Get in touch
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
