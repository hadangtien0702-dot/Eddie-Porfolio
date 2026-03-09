"use client";

// ─── Case Study Section ───
// Mô tả: Section cho nhà tuyển dụng chọn case study muốn xem
// 2 card lớn: Thinksmart Insurance + Dream Talent
// Click → mở inline storytelling với Impact Hero, Timeline, Gallery, Testimonial
// Mỗi div có ID rõ ràng theo vị trí component
// Data: import từ data/casestudy.ts

import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  ContextCard,
  ContextProfileCard,
  FunnelChart,
  CPAChallengeChart,
  WorkflowDiagram,
  RevenueChart,
  SocialBars,
  OverviewChart,
  BestYearQuarterlyChart,
  useAnimatedCounter,
} from "./CaseStudyCharts";
import {
  caseStudies,
  caseStudyHeading,
  type CaseStudy as CaseStudyType,
  type CaseStudySection as CaseStudySectionType,
  type Testimonial,
  type TimelineMilestone,
  type CreativeWorkItem,
} from "@/data/casestudy";

// ─── StorySection — mỗi section trong storytelling ───
function StorySection({
  section,
  caseColor,
  isLast,
}: {
  section: CaseStudySectionType;
  caseColor: string;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const num = String(section.number).padStart(2, "0");

  return (
    <motion.div
      ref={ref}
      id={section.id}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative py-24 md:py-32"
    >
      {/* ─── Giant decorative number — massive, gradient fade ─── */}
      <motion.div
        id={`${section.id}-deco-number`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -top-4 -right-4 md:right-0 pointer-events-none select-none overflow-hidden"
      >
        <span
          className="font-heading text-[200px] md:text-[300px] lg:text-[380px] font-bold leading-none"
          style={{
            background: `linear-gradient(180deg, ${caseColor}12, transparent)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {num}
        </span>
      </motion.div>

      {/* ─── Section label — accent pill badge ─── */}
      <motion.div
        id={`${section.id}-header`}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex items-center gap-4 mb-8"
      >
        <span
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full
                   font-body text-[13px] font-semibold uppercase tracking-[0.15em]
                   border"
          style={{
            color: caseColor,
            borderColor: `${caseColor}30`,
            backgroundColor: `${caseColor}08`,
          }}
        >
          <span className="font-heading font-bold">{num}</span>
          <span className="w-1 h-1 rounded-full" style={{ backgroundColor: caseColor }} />
          <span>{section.title}</span>
        </span>
      </motion.div>

      {/* ─── Headline — MASSIVE, Clash Display ─── */}
      <div id={`${section.id}-headline`} className="relative z-10 mb-5 max-w-5xl">
        {section.headline.split("\n").map((line, i) => (
          <motion.h3
            key={i}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.9,
              delay: 0.15 + i * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="font-heading text-[clamp(36px,6vw,80px)] font-bold text-white leading-[1.05] tracking-[-0.02em]"
          >
            {line}
          </motion.h3>
        ))}
      </div>

      {/* ─── Subtitle — Inter, accent tint ─── */}
      {section.subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 font-body text-[15px] md:text-[17px] uppercase tracking-[0.1em]
                   mb-12 md:mb-16"
          style={{ color: `${caseColor}90` }}
        >
          {section.subtitle}
        </motion.p>
      )}

      {/* ─── Body text — large, readable ─── */}
      <motion.div
        id={`${section.id}-body`}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-2xl mb-14"
      >
        <p className="font-body text-[18px] md:text-[21px] text-white/60 leading-[1.9]">
          {section.body}
        </p>
      </motion.div>

      {/* ─── Interactive Chart — in glass frame ─── */}
      {section.visualType && (
        <motion.div
          id={`${section.id}-visual`}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mb-14 p-6 md:p-10 rounded-3xl
                   bg-white/[0.02] border border-white/[0.06]
                   backdrop-blur-sm"
        >
          {/* Top accent line */}
          <div
            className="absolute top-0 left-8 right-8 h-[1px]"
            style={{ background: `linear-gradient(90deg, transparent, ${caseColor}40, transparent)` }}
          />
          {section.visualType === "context" && <ContextCard color={caseColor} />}
          {section.visualType === "context-profile" && <ContextProfileCard color={caseColor} />}
          {section.visualType === "funnel" && <FunnelChart color={caseColor} />}
          {section.visualType === "cpa-challenge" && <CPAChallengeChart color={caseColor} />}
          {section.visualType === "workflow" && <WorkflowDiagram color={caseColor} />}
          {section.visualType === "revenue" && <RevenueChart color={caseColor} />}
          {section.visualType === "social" && <SocialBars color={caseColor} />}
        </motion.div>
      )}

      {/* ─── Section Image — hình minh họa bên dưới chart ─── */}
      {section.sectionImage && (
        <motion.div
          id={`${section.id}-section-image`}
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mb-14 rounded-2xl overflow-hidden
                   border border-white/[0.08] bg-white/[0.02]
                   group cursor-default"
        >
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{
              background: `radial-gradient(600px circle at 50% 50%, ${caseColor}08, transparent 70%)`,
            }}
          />
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={section.sectionImage}
              alt={section.sectionImageAlt || `${section.title} visual evidence`}
              fill
              className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-1/4"
              style={{
                background: "linear-gradient(180deg, transparent, rgba(4,4,4,0.6))",
              }}
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 z-10">
            <div className="flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: caseColor }}
              />
              <span className="font-body text-[12px] text-white/50 uppercase tracking-wider">
                {section.title} — Visual Reference
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── Image fallback ─── */}
      {!section.visualType && !section.sectionImage && section.image && (
        <motion.div
          id={`${section.id}-image`}
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mb-14 rounded-2xl overflow-hidden
                   border border-white/10 bg-surface/50"
        >
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={section.image}
              alt={section.imageAlt || section.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>
        </motion.div>
      )}

      {/* ─── Stats Cards — adaptive style per section ─── */}
      {section.stats && section.stats.length > 0 && (
        <div
          id={`${section.id}-stats`}
          className="relative z-10 max-w-4xl mb-10 grid gap-4"
          style={{
            gridTemplateColumns: `repeat(${Math.min(section.stats.length, 3)}, 1fr)`,
          }}
        >
          {section.stats.map((stat, i) => {
            const isMission = stat.label.toLowerCase().includes("mission");
            const isWarning = stat.label.toLowerCase().includes("cpa");
            const statAccent = isWarning ? "#ef4444" : isMission ? caseColor : "rgba(255,255,255,0.5)";

            return (
              <motion.div
                key={stat.label}
                id={`${section.id}-stat-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.3 + i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative p-5 md:p-6 rounded-2xl text-center overflow-hidden
                         bg-white/[0.02] border border-white/[0.06]
                         group hover:bg-white/[0.04] hover:border-white/[0.10]
                         transition-all duration-500"
              >
                {/* Top accent line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                  className="absolute top-0 left-0 right-0 h-[2px] origin-left"
                  style={{ backgroundColor: statAccent }}
                />

                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
                           transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(200px circle at 50% 50%, ${statAccent}10, transparent 70%)`,
                  }}
                />
                <span className="relative z-10 font-body text-[11px] text-white/35 uppercase tracking-[0.15em] block mb-3">
                  {stat.label}
                </span>
                <span
                  className="relative z-10 font-heading font-bold block leading-none"
                  style={{
                    fontSize: isMission ? "clamp(18px, 3vw, 24px)" : "clamp(24px, 4vw, 36px)",
                    color: isWarning ? "#ef4444" : isMission ? caseColor : "#fff",
                  }}
                >
                  {stat.value}
                </span>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* ─── Bullets — numbered glass cards ─── */}
      {section.bullets && (
        <div
          id={`${section.id}-bullets`}
          className="relative z-10 max-w-4xl mb-14 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {section.bullets.map((bullet, i) => {
            const parts = bullet.split(" — ");
            const hasTitle = parts.length > 1;
            const title = hasTitle ? parts[0] : null;
            const desc = hasTitle ? parts.slice(1).join(" — ") : bullet;

            return (
              <motion.div
                key={i}
                id={`${section.id}-bullet-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.35 + i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative p-5 md:p-6 rounded-2xl
                         bg-white/[0.02] border border-white/[0.06]
                         hover:bg-white/[0.04] hover:border-white/[0.12]
                         transition-all duration-500 cursor-default"
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
                           transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(300px circle at 50% 0%, ${caseColor}08, transparent 70%)`,
                  }}
                />

                {/* Số thứ tự — neon accent */}
                <div className="flex items-start gap-4 relative z-10">
                  <span
                    className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center
                             font-heading text-[14px] font-bold transition-all duration-300"
                    style={{
                      color: caseColor,
                      backgroundColor: `${caseColor}10`,
                      border: `1px solid ${caseColor}25`,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="flex-1 min-w-0">
                    {title && (
                      <h4 className="font-heading text-[14px] md:text-[15px] font-semibold text-white mb-2 leading-snug">
                        {title}
                      </h4>
                    )}
                    <p className="font-body text-[13px] md:text-[14px] text-white/50 leading-[1.7]">
                      {desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* ─── Closing line — accent quote box ─── */}
      {section.closingLine && (
        <motion.div
          id={`${section.id}-closing`}
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-3xl"
        >
          <div
            className="p-6 md:p-8 rounded-2xl border-l-[3px]
                     bg-white/[0.02]"
            style={{ borderColor: caseColor }}
          >
            <p className="font-body text-[17px] md:text-[20px] text-white/90 italic leading-[1.7]">
              {section.closingLine}
            </p>
          </div>
        </motion.div>
      )}

      {/* ─── Section divider with dot ornament ─── */}
      {!isLast && (
        <div className="mt-24 md:mt-32 flex items-center gap-4">
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-white/8 to-transparent" />
          <div
            className="w-2 h-2 rounded-full opacity-30"
            style={{ backgroundColor: caseColor }}
          />
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        </div>
      )}
    </motion.div>
  );
}

// ─── ImpactHero — số liệu ấn tượng dạng hero cinematic ───
function ImpactHero({
  highlights,
  color,
}: {
  highlights: CaseStudyType["highlights"];
  color: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const revenueCount = useAnimatedCounter(6000000, isInView, 2500);

  const formatRevenue = (n: number) => "$" + n.toLocaleString("en-US");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative mb-12 rounded-3xl overflow-hidden border border-white/[0.06]"
      style={{ background: "rgba(255,255,255,0.02)" }}
    >
      {/* Radial glow background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(800px circle at 50% 40%, ${color}10, transparent 70%)`,
        }}
      />

      {/* Top accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 left-0 right-0 h-[2px] origin-left"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        }}
      />

      <div className="relative z-10 px-8 md:px-12 py-14 md:py-20 text-center">
        {/* Overline */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="inline-block font-body text-[12px] text-white/35 uppercase tracking-[0.15em] mb-6"
        >
          3-Year Impact
        </motion.span>

        {/* Revenue number — MASSIVE animated counter */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading font-bold leading-none tracking-[-0.02em] mb-4"
          style={{
            fontSize: "clamp(56px, 8vw, 100px)",
            background: `linear-gradient(180deg, white 20%, ${color})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {formatRevenue(revenueCount)}
        </motion.h3>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="font-body text-[16px] text-white/50 mb-12 max-w-md mx-auto"
        >
          {highlights[0]?.description}
        </motion.p>

        {/* Secondary stats */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
          {highlights.slice(1).map((h, i) => (
            <motion.div
              key={h.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center p-5 rounded-xl
                       bg-white/[0.03] border border-white/[0.06] min-w-[160px]"
            >
              <span
                className="font-heading text-[clamp(28px,4vw,48px)] font-bold leading-none mb-2"
                style={{
                  background: `linear-gradient(180deg, white 20%, ${color})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {h.value}
              </span>
              <span className="font-body text-[12px] text-white/35 uppercase tracking-wider">
                {h.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── BeforeAfterRow — so sánh trước/sau ───
function BeforeAfterRow({ color }: { color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
      className="mb-12 flex flex-col md:flex-row gap-4 md:gap-6"
    >
      {/* BEFORE */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
      >
        <span className="font-body text-[11px] text-white/30 uppercase tracking-[0.15em] mb-5 block">
          Before
        </span>
        <div className="space-y-4">
          <div>
            <span className="font-body text-[11px] text-white/25 uppercase tracking-wider block mb-1">Revenue</span>
            <span className="font-heading text-h2 font-bold text-white/40">$2M</span>
          </div>
          <div>
            <span className="font-body text-[11px] text-white/25 uppercase tracking-wider block mb-1">CPA</span>
            <span className="font-heading text-[24px] font-bold text-white/40">$120</span>
          </div>
          <div>
            <span className="font-body text-[11px] text-white/25 uppercase tracking-wider block mb-1">Video</span>
            <span className="font-body text-[15px] text-white/30 italic">Ad-hoc content</span>
          </div>
        </div>
      </motion.div>

      {/* Arrow */}
      <div className="hidden md:flex items-center justify-center flex-shrink-0">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={color}
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </motion.div>
      </div>
      {/* Mobile arrow */}
      <div className="flex md:hidden items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color}
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <polyline points="5 12 12 19 19 12" />
          </svg>
        </motion.div>
      </div>

      {/* AFTER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 p-6 md:p-8 rounded-2xl bg-white/[0.02] border-l-[3px]
                 border border-white/[0.06]"
        style={{ borderLeftColor: color }}
      >
        <span
          className="font-body text-[11px] uppercase tracking-[0.15em] mb-5 block"
          style={{ color }}
        >
          After
        </span>
        <div className="space-y-4">
          <div>
            <span className="font-body text-[11px] text-white/25 uppercase tracking-wider block mb-1">Revenue</span>
            <span
              className="font-heading text-h2 font-bold"
              style={{
                background: `linear-gradient(180deg, white 20%, ${color})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              $6.09M
            </span>
          </div>
          <div>
            <span className="font-body text-[11px] text-white/25 uppercase tracking-wider block mb-1">CPA</span>
            <span className="font-heading text-[24px] font-bold" style={{ color }}>$67</span>
          </div>
          <div>
            <span className="font-body text-[11px] text-white/25 uppercase tracking-wider block mb-1">Video</span>
            <span className="font-body text-[15px] font-medium" style={{ color }}>Performance system</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── TimelineStrip — hành trình từ start đến present ───
function TimelineStrip({
  milestones,
  color,
}: {
  milestones: TimelineMilestone[];
  color: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="mb-16 md:mb-24">
      {/* Label */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 mb-8"
      >
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
        <span className="font-body text-[12px] text-white/35 uppercase tracking-[0.15em]">
          The Journey
        </span>
        <div className="flex-1 h-[1px] bg-white/[0.05]" />
      </motion.div>

      {/* Timeline — horizontal scroll trên mobile */}
      <div className="relative overflow-x-auto scrollbar-hide">
        <div className="flex items-stretch min-w-max md:min-w-0 gap-0 relative">
          {/* Horizontal line */}
          <div className="absolute top-[11px] left-[20px] right-[20px] h-[2px] bg-white/[0.06]" />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-[11px] left-[20px] right-[20px] h-[2px] origin-left"
            style={{ background: `linear-gradient(90deg, ${color}, ${color}40)` }}
          />

          {milestones.map((m, i) => (
            <motion.div
              key={m.date}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.2 + i * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex-1 min-w-[180px] md:min-w-0 px-3 md:px-4 flex flex-col items-center text-center"
            >
              {/* Dot */}
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.15 }}
                className="w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center mb-3"
                style={{
                  borderColor: m.type === "peak" ? color : m.type === "milestone" ? `${color}50` : "rgba(255,255,255,0.3)",
                  backgroundColor: m.type === "peak" ? color : m.type === "milestone" ? `${color}20` : "transparent",
                }}
              >
                {m.type === "peak" && (
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                )}
              </motion.div>

              {/* Date */}
              <span
                className="font-body text-[12px] uppercase tracking-wider font-medium mb-1"
                style={{ color: m.type === "peak" ? color : `${color}90` }}
              >
                {m.date}
              </span>

              {/* Title */}
              <span className="font-heading text-[14px] md:text-[15px] font-semibold text-white leading-tight mb-1">
                {m.title}
              </span>

              {/* Description */}
              <span className="font-body text-[12px] text-white/40 leading-[1.5] mb-2">
                {m.description}
              </span>

              {/* Metric badge */}
              {m.metric && (
                <span
                  className="inline-block px-3 py-1 rounded-full font-heading text-[13px] font-bold border"
                  style={{
                    color,
                    borderColor: `${color}20`,
                    backgroundColor: `${color}08`,
                  }}
                >
                  {m.metric}
                </span>
              )}
            </motion.div>
          ))}
        </div>

        {/* Fade edge phải cho mobile scroll */}
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-primary to-transparent pointer-events-none md:hidden" />
      </div>
    </div>
  );
}

// ─── CreativeGallery — grid tác phẩm thực tế ───
function CreativeGallery({
  items,
  color,
}: {
  items: CreativeWorkItem[];
  color: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);

  return (
    <div ref={ref} className="py-20 md:py-28 relative">
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-4"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
          <span className="font-body text-[12px] text-white/35 uppercase tracking-[0.15em]">
            The Creative Work
          </span>
          <div className="flex-1 h-[1px] bg-white/[0.05]" />
        </div>

        <h3 className="font-heading text-[clamp(32px,4vw,56px)] font-bold text-white mb-3">
          Show, don&apos;t tell
        </h3>
        <p className="font-body text-[17px] text-white/50 max-w-2xl mb-12">
          A selection of video creatives, ads, and content produced for this project.
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.5,
              delay: 0.1 + i * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
            onClick={() => item.videoUrl && setActiveVideoUrl(item.videoUrl)}
            className="group relative rounded-2xl overflow-hidden cursor-pointer
                     border border-white/[0.06] hover:border-white/15
                     transition-all duration-500"
          >
            <div className={item.type === "video-thumbnail" ? "aspect-[9/16]" : "aspect-[4/3]"}>
              <Image
                src={item.thumbnail}
                alt={item.caption}
                fill
                className="object-cover group-hover:scale-[1.05] transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>

            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent
                         opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Platform badge */}
            {item.platform && (
              <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full
                           bg-black/60 backdrop-blur-sm
                           font-body text-[11px] text-white/80">
                {item.platform}
              </span>
            )}

            {/* Tag badge */}
            {item.tag && (
              <span
                className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full
                         font-body text-[11px] text-white font-semibold"
                style={{ backgroundColor: `${color}E0` }}
              >
                {item.tag}
              </span>
            )}

            {/* Bottom info */}
            <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 z-10
                         opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="font-body text-[13px] text-white/90 font-medium leading-tight">
                {item.caption}
              </p>
              {item.metric && (
                <p className="font-heading text-[14px] font-bold mt-1" style={{ color }}>
                  {item.metric}
                </p>
              )}
            </div>

            {/* Play button cho video */}
            {item.videoUrl && (
              <div className="absolute inset-0 flex items-center justify-center z-10
                           opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <polygon points="8,5 19,12 8,19" />
                  </svg>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Bottom note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-6 text-center font-body text-[13px] text-white/30"
      >
        Tap to preview — All videos produced and directed by Eddie
      </motion.p>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideoUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setActiveVideoUrl(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-[400px] aspect-[9/16] rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={activeVideoUrl}
                className="absolute inset-0 w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="Creative work preview"
              />
            </motion.div>

            {/* Close button */}
            <button
              onClick={() => setActiveVideoUrl(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full
                       bg-white/10 flex items-center justify-center
                       hover:bg-white/20 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── TestimonialBlock — quote từ client ───
function TestimonialBlock({
  testimonial,
  color,
}: {
  testimonial: Testimonial;
  color: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-3xl mx-auto p-8 md:p-12 rounded-3xl
                 bg-white/[0.02] border border-white/[0.06] border-l-[4px]"
        style={{ borderLeftColor: color }}
      >
        {/* Giant quote mark */}
        <div
          className="absolute top-4 left-6 md:left-10 font-heading text-[100px] md:text-[120px] leading-none
                   pointer-events-none select-none"
          style={{ color: `${color}10` }}
        >
          &ldquo;
        </div>

        {/* Quote text */}
        <div className="relative z-10 mt-10 md:mt-8">
          <p className="font-body text-[18px] md:text-[22px] text-white/85 italic leading-[1.8]">
            &ldquo;{testimonial.quote}&rdquo;
          </p>

          {/* Attribution */}
          <div className="mt-8 flex items-center gap-4">
            {testimonial.avatar && (
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <p className="font-heading text-[16px] font-semibold text-white">
                {testimonial.author}
              </p>
              <p className="font-body text-[14px] text-white/45">
                {testimonial.role}, {testimonial.company}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── CaseCard — card chọn case study ───
function CaseCard({
  cs,
  index,
  isInView,
  onSelect,
}: {
  cs: CaseStudyType;
  index: number;
  isInView: boolean;
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.div
      id={`case-card-${cs.id}`}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: 0.3 + index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      onClick={onSelect}
      className="group relative cursor-pointer rounded-3xl overflow-hidden flex-1
                border border-white/[0.08] hover:border-white/20
                hover:shadow-[0_0_60px_rgba(239,68,68,0.08)]
                hover:scale-[1.03]
                transition-all duration-700 origin-center"
    >
      {/* ─── Animated gradient orb — follows hover ─── */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: `radial-gradient(600px circle at ${index === 0 ? "30%" : "70%"} 60%, ${cs.color}15, transparent 60%)`,
        }}
      />

      {/* ─── Background — image overlay nếu có, nếu không thì solid ─── */}
      {cs.cardImage ? (
        <div className="absolute inset-0">
          <Image
            src={cs.cardImage}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-surface/85 group-hover:bg-surface/80 transition-all duration-700" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-surface/90" />
      )}

      {/* ─── Top accent line — always visible ─── */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-40 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${cs.color}, transparent)` }}
      />

      {/* ─── Content ─── */}
      <div
        id={`case-card-${cs.id}-content`}
        className="relative z-10 p-8 md:p-10 lg:p-14 h-full flex flex-col justify-between min-h-[500px]"
      >
        {/* Top — Number + Duration */}
        <div id={`case-card-${cs.id}-top`} className="flex items-start justify-between">
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 + index * 0.15 }}
            className="font-heading text-[100px] md:text-[130px] font-bold leading-none
                     group-hover:scale-110 transition-transform duration-700 origin-top-left"
            style={{
              background: `linear-gradient(180deg, ${cs.color}30, ${cs.color}05)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </motion.span>
          <span
            className="font-body text-[12px] text-text-muted uppercase tracking-[0.15em] mt-3 px-3 py-1
                     rounded-full border border-white/[0.06]"
          >
            {cs.duration}
          </span>
        </div>

        {/* Middle — Company + Tagline + Highlights */}
        <div id={`case-card-${cs.id}-info`} className="flex-1 flex flex-col justify-end mt-6">
          <h3 className="font-heading text-[clamp(32px,4vw,56px)] font-bold text-white leading-[1.1] mb-3
                       group-hover:tracking-[-0.01em] transition-all duration-500">
            {cs.company}
          </h3>

          <p className="font-body text-[16px] md:text-[18px] text-white/50 leading-relaxed mb-8">
            {cs.tagline}
          </p>

          <div id={`case-card-${cs.id}-highlights`} className="flex gap-3 mb-8">
            {cs.highlights.map((h, i) => (
              <motion.div
                key={h.label}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.6 + index * 0.15 + i * 0.08,
                }}
                className="flex-1 p-3 md:p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]
                         group-hover:bg-white/[0.06] group-hover:border-white/10
                         transition-all duration-500"
              >
                <p
                  className="font-heading text-[20px] md:text-[24px] font-bold leading-none mb-1"
                  style={{ color: cs.color }}
                >
                  {h.value.length > 5 ? h.value.replace(/,\d{3},\d{3}$/, 'M+').replace('$6M+', '$6M+') : h.value}
                </p>
                <p className="font-body text-[11px] text-text-muted uppercase tracking-wider">
                  {h.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom — Role + CTA */}
        <div id={`case-card-${cs.id}-bottom`} className="flex items-end justify-between">
          <div>
            <p className="font-body text-[11px] text-text-muted uppercase tracking-[0.15em] mb-1.5">Role</p>
            <p className="font-body text-[14px] md:text-[15px] text-white/70">{cs.role}</p>
          </div>

          <div
            className="flex items-center gap-2 px-5 py-2.5 rounded-full
                     border border-white/15 text-white/60
                     group-hover:border-transparent group-hover:text-white
                     transition-all duration-500"
            style={{
              backgroundImage: `linear-gradient(135deg, transparent, transparent)`,
            }}
          >
            <span className="font-body text-[13px] font-medium tracking-wide hidden md:inline">
              View Case
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="group-hover:translate-x-1 transition-transform duration-300">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </div>
      </div>

      {/* ─── Bottom accent glow on hover ─── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `linear-gradient(180deg, transparent, ${cs.color}10)`,
        }}
      />
    </motion.div>
  );
}

// ─── CaseStory — storytelling view khi chọn case ───
function CaseStory({
  cs,
  onBack,
}: {
  cs: CaseStudyType;
  onBack: () => void;
}) {
  const [resultsTab, setResultsTab] = useState("overview");
  const [activeSection, setActiveSection] = useState<string>(cs.sections[0]?.id || "");

  // Build nav items from sections + results
  const navItems = [
    ...cs.sections.map((s) => ({ id: s.id, label: s.title, number: s.number })),
    ...(cs.highlights && cs.highlights.length > 0
      ? [{ id: "results-section", label: "Results", number: cs.sections.length + 1 }]
      : []),
  ];

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = navItems.map((n) => n.id);
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cs.id]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.div
      id={`case-story-${cs.id}`}
      key={cs.id}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
    >
      {/* Story Header — company name + back button */}
      <div
        id={`case-story-${cs.id}-header`}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-8 border-b border-white/10"
      >
        <div>
          <span
            className="font-body text-[13px] uppercase tracking-[0.15em] font-semibold mb-3 block"
            style={{ color: cs.color }}
          >
            {cs.role}
          </span>
          <h3 className="font-heading text-[clamp(36px,5vw,72px)] font-bold text-white leading-[1.05]">
            {cs.company}
          </h3>
        </div>

        <div className="flex items-center gap-3 self-start">
          {cs.website && (
            <a
              href={cs.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-body text-[14px] text-white/40
                       hover:text-white px-4 py-2.5 rounded-full border border-white/10
                       hover:border-white/20 transition-all duration-300"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Website
            </a>
          )}
          <button
            id={`case-story-${cs.id}-back-btn`}
            onClick={onBack}
            className="flex items-center gap-2 font-body text-[14px] text-text-secondary
                     hover:text-white px-5 py-2.5 rounded-full border border-white/10
                     hover:border-white/20 transition-all duration-300 group"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="group-hover:-translate-x-1 transition-transform duration-300">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back
          </button>
        </div>
      </div>

      {/* ─── Hero Banner — Cinematic typography ─── */}
      <motion.div
        id={`case-story-${cs.id}-hero`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.15 }}
        className="relative w-full aspect-[16/7] rounded-3xl overflow-hidden mb-10
                 border border-white/[0.04]"
        style={{ background: "#050505" }}
      >
        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(60% 80% at 50% 50%, ${cs.color}0d, transparent 70%),
              radial-gradient(30% 40% at 20% 80%, ${cs.color}08, transparent),
              radial-gradient(30% 40% at 80% 20%, ${cs.color}06, transparent)
            `,
          }}
        />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Center — Company name large */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <h2
              className="font-heading font-bold leading-[0.9] tracking-[-0.03em]"
              style={{
                fontSize: "clamp(48px, 8vw, 120px)",
                background: `linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.4) 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {cs.company}
            </h2>
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 60 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="h-[2px] mx-auto mt-4 rounded-full"
              style={{ backgroundColor: cs.color }}
            />
          </motion.div>
        </div>

        {/* Corner metadata */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="absolute top-5 left-6 font-body text-[10px] text-white/20 uppercase tracking-[0.2em]"
        >
          Case Study
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="absolute top-5 right-6 font-body text-[10px] text-white/20"
        >
          {cs.duration}
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="absolute bottom-5 left-6 font-body text-[10px] uppercase tracking-[0.15em]"
          style={{ color: `${cs.color}60` }}
        >
          {cs.role}
        </motion.span>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="absolute bottom-5 right-6 font-body text-[10px] text-white/15 max-w-[200px] text-right"
        >
          {cs.tagline}
        </motion.p>
      </motion.div>

      {/* ─── Layout: Sidebar + Content ─── */}
      <div className="flex gap-0 lg:gap-10 relative">

        {/* ─── Sidebar Nav (desktop only) ─── */}
        <nav
          id={`case-story-${cs.id}-sidebar`}
          className="hidden lg:block flex-shrink-0 w-[180px]"
        >
          <div className="sticky top-24">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="group relative flex items-center gap-3 px-3 py-2.5 rounded-xl
                             text-left transition-all duration-300"
                    style={{
                      backgroundColor: isActive ? `${cs.color}08` : "transparent",
                    }}
                  >
                    {/* Active indicator line */}
                    <motion.div
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] rounded-full"
                      animate={{
                        height: isActive ? 20 : 0,
                        opacity: isActive ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      style={{ backgroundColor: cs.color }}
                    />

                    {/* Number */}
                    <span
                      className="font-heading text-[11px] font-bold transition-colors duration-300"
                      style={{ color: isActive ? cs.color : "rgba(255,255,255,0.2)" }}
                    >
                      {String(item.number).padStart(2, "0")}
                    </span>

                    {/* Label */}
                    <span
                      className="font-body text-[12px] font-medium transition-colors duration-300 truncate"
                      style={{
                        color: isActive ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)",
                      }}
                    >
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Decorative line */}
            <div className="mt-6 w-full h-[1px] bg-white/[0.04]" />
            <p className="mt-3 font-body text-[10px] text-white/20 uppercase tracking-wider">
              {cs.company}
            </p>
          </div>
        </nav>

        {/* ─── Main Content ─── */}
        <div className="flex-1 min-w-0">
          {/* ─── 1. Story Sections ─── */}
          <div id={`case-story-${cs.id}-sections`}>
            {cs.sections.map((section, i) => (
              <React.Fragment key={section.id}>
                <StorySection
                  section={section}
                  caseColor={cs.color}
                  isLast={i === cs.sections.length - 1 && !cs.highlights}
                />

                {/* Creative Gallery sau Section 3 (System) */}
                {i === 2 && cs.creativeWork && cs.creativeWork.length > 0 && (
                  <CreativeGallery items={cs.creativeWork} color={cs.color} />
                )}
              </React.Fragment>
            ))}
          </div>

      {/* ─── 2. Kết quả sau 3 năm làm việc ─── */}
      {cs.highlights && cs.highlights.length > 0 && (
        <div id="results-section" className="mt-16 md:mt-24">
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 mb-12"
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cs.color }} />
            <span className="font-body text-[12px] text-white/35 uppercase tracking-[0.15em]">
              Results after 3 years
            </span>
            <div className="flex-1 h-[1px] bg-white/[0.05]" />
          </motion.div>

          {/* Tab switcher */}
          <div id="results-tab-switcher" className="flex items-center gap-2 mb-6">
            {[
              { key: "overview", label: "3-Year Overview" },
              { key: "quarterly", label: "Best Year 2024" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setResultsTab(tab.key)}
                className="px-5 py-2.5 rounded-full font-body text-[13px] font-medium
                         transition-all duration-300 border"
                style={{
                  backgroundColor: resultsTab === tab.key ? `${cs.color}15` : "transparent",
                  borderColor: resultsTab === tab.key ? `${cs.color}40` : "rgba(255,255,255,0.06)",
                  color: resultsTab === tab.key ? cs.color : "rgba(255,255,255,0.4)",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            {resultsTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="p-6 md:p-10 rounded-3xl bg-white/[0.02] border border-white/[0.06] mb-6"
              >
                <OverviewChart color={cs.color} />
              </motion.div>
            )}
            {resultsTab === "quarterly" && (
              <motion.div
                key="quarterly"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="p-6 md:p-10 rounded-3xl bg-white/[0.02] border border-white/[0.06] mb-6"
              >
                <BestYearQuarterlyChart color={cs.color} />
              </motion.div>
            )}
          </AnimatePresence>

          {cs.timeline && cs.timeline.length > 0 && (
            <TimelineStrip milestones={cs.timeline} color={cs.color} />
          )}
        </div>
      )}

        </div>{/* end Main Content */}
      </div>{/* end Sidebar + Content flex */}

      {/* Bottom — back to cases */}
      <div id={`case-story-${cs.id}-footer`} className="pt-12 pb-8 flex justify-center">
        <button
          onClick={onBack}
          className="flex items-center gap-3 font-body text-[14px] text-text-secondary
                   hover:text-white px-8 py-3.5 rounded-full border border-white/10
                   hover:border-accent/30 hover:bg-white/5 transition-all duration-300 group"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="group-hover:-translate-x-1 transition-transform duration-300">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          View other case studies
        </button>
      </div>
    </motion.div>
  );
}

// ─── CaseStudy Section chính ───
export default function CaseStudy() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeCase = caseStudies.find((cs) => cs.id === activeId);

  // Lock body scroll và cuộn lên đầu khi mở full-page case study
  useEffect(() => {
    if (activeId) {
      // Lock scroll trên body
      document.body.style.overflow = "hidden";
    } else {
      // Unlock scroll khi đóng
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeId]);

  return (
    <>
      <section
        ref={sectionRef}
        id="case-study"
        className="relative w-full py-section-mobile lg:py-section overflow-hidden bg-primary"
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
          {/* Section Header */}
          <div id="case-study-header" className="text-center mb-16 lg:mb-20">
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

          {/* 2 Case Cards — chooser */}
          <div id="case-study-cards" className="flex flex-col md:flex-row gap-6">
            {caseStudies.map((cs, index) => (
              <CaseCard
                key={cs.id}
                cs={cs}
                index={index}
                isInView={isInView}
                isActive={false}
                onSelect={() => setActiveId(cs.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Full-Page Case Study Overlay ─── */}
      <AnimatePresence>
        {activeCase && (
          <motion.div
            key={activeCase.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-primary overflow-y-auto"
          >
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-12 md:py-16">
              <CaseStory
                cs={activeCase}
                onBack={() => setActiveId(null)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
