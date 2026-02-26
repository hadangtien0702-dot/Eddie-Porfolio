"use client";

// ─── Case Study Section ───
// Mô tả: Section cho nhà tuyển dụng chọn case study muốn xem
// 2 card lớn: Thinksmart Insurance + Dream Talent
// Hover effect reveal, click để mở chi tiết
// Scroll reveal animation
// Data: import từ data/casestudy.ts

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { caseStudies, caseStudyHeading, type CaseStudy } from "@/data/casestudy";

// ─── Case Card — card lớn cho mỗi case study ───
function CaseCard({
  cs,
  index,
  isInView,
  isSelected,
  onSelect,
}: {
  cs: CaseStudy;
  index: number;
  isInView: boolean;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: 0.3 + index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      onClick={onSelect}
      className={`group relative cursor-pointer rounded-3xl overflow-hidden
                  border transition-all duration-500 ${
        isSelected
          ? "border-accent/50 shadow-[0_0_40px_rgba(239,68,68,0.15)] flex-[1.4]"
          : "border-white/10 hover:border-white/20 flex-1"
      }`}
    >
      {/* Background gradient — accent color của mỗi case */}
      <div
        className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at ${index === 0 ? "30% 50%" : "70% 50%"}, ${cs.color}40, transparent 70%)`,
        }}
      />

      {/* Nền tối */}
      <div className="absolute inset-0 bg-surface/80 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10 p-8 md:p-10 lg:p-12 h-full flex flex-col justify-between min-h-[400px]">
        {/* Top: Số thứ tự + Duration */}
        <div className="flex items-start justify-between mb-8">
          <span
            className="font-heading text-[80px] md:text-[100px] font-bold leading-none opacity-10"
            style={{ color: cs.color }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-body text-caption text-text-muted uppercase tracking-wider mt-2">
            {cs.duration}
          </span>
        </div>

        {/* Middle: Company name + Tagline */}
        <div className="flex-1 flex flex-col justify-center">
          <h3 className="font-heading text-h1 font-bold text-white leading-tight mb-3
                       group-hover:drop-shadow-[0_0_20px_rgba(239,68,68,0.2)] transition-all duration-500">
            {cs.company}
          </h3>
          <p className="font-body text-body-lg text-text-secondary leading-relaxed">
            {cs.tagline}
          </p>
        </div>

        {/* Bottom: Role + Arrow */}
        <div className="flex items-end justify-between mt-8">
          <div>
            <p className="font-body text-caption text-text-muted uppercase tracking-wider mb-1">Role</p>
            <p className="font-body text-body text-white/80">{cs.role}</p>
          </div>

          {/* Arrow — chỉ thị click để xem */}
          <motion.div
            animate={{ x: isSelected ? 5 : 0 }}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center
                     group-hover:border-accent/50 group-hover:bg-accent/10 transition-all duration-300"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="text-white/60 group-hover:text-accent transition-colors duration-300">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </motion.div>
        </div>
      </div>

      {/* Hover accent line bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${cs.color}, transparent)` }}
      />
    </motion.div>
  );
}

// ─── Case Detail Panel — chi tiết khi chọn ───
function CaseDetail({ cs }: { cs: CaseStudy }) {
  return (
    <motion.div
      key={cs.id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-3xl bg-surface/60 border border-white/10 backdrop-blur-sm p-8 md:p-10 lg:p-12"
    >
      {/* Top: Company + Description */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 mb-10">
        <div className="flex-1">
          <span className="font-body text-overline text-accent uppercase tracking-[0.15em] font-medium mb-3 block">
            {cs.role}
          </span>
          <h4 className="font-heading text-h2 font-bold text-white mb-4">
            {cs.company}
          </h4>
          <p className="font-body text-body text-text-secondary leading-relaxed">
            {cs.description}
          </p>
        </div>
      </div>

      {/* Highlights Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cs.highlights.map((h, i) => (
          <motion.div
            key={h.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="p-4 rounded-2xl bg-white/5 border border-white/10"
          >
            <p
              className="font-heading text-h2 font-bold leading-none mb-2"
              style={{ color: cs.color }}
            >
              {h.value}
            </p>
            <p className="font-body text-caption text-text-secondary">
              {h.label}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── CaseStudy Section chính ───
export default function CaseStudy() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedCase = caseStudies.find((cs) => cs.id === selectedId);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-section-mobile lg:py-section overflow-hidden bg-primary"
      id="case-study"
    >
      {/* ─── Decorative background glow ─── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    w-[800px] h-[600px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        {/* ─── Section Header ─── */}
        <div className="text-center mb-16 lg:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block font-body text-overline text-accent uppercase tracking-[0.15em] font-medium mb-4"
          >
            {caseStudyHeading.overline}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-display font-bold text-white mb-4"
          >
            {caseStudyHeading.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-body text-body-lg text-text-secondary max-w-xl mx-auto"
          >
            {caseStudyHeading.description}
          </motion.p>
        </div>

        {/* ─── Case Study Cards — 2 cột chọn ─── */}
        <div className="flex flex-col md:flex-row gap-6 mb-10">
          {caseStudies.map((cs, index) => (
            <CaseCard
              key={cs.id}
              cs={cs}
              index={index}
              isInView={isInView}
              isSelected={selectedId === cs.id}
              onSelect={() => setSelectedId(selectedId === cs.id ? null : cs.id)}
            />
          ))}
        </div>

        {/* ─── Detail Panel — hiện khi chọn case ─── */}
        <AnimatePresence mode="wait">
          {selectedCase && <CaseDetail cs={selectedCase} />}
        </AnimatePresence>
      </div>
    </section>
  );
}
