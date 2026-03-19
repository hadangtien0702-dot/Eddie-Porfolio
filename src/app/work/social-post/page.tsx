"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { socialPostHeading, socialPosts, PostType } from "@/data/social-post";

const filterLabels: Record<string, string> = {
  all: "All Content",
  video: "Viral Videos",
  static: "Static Ads",
  carousel: "Carousels",
};

export default function SocialPostPage() {
  const [activeFilter, setActiveFilter] = useState<PostType | "all">("all");

  const filteredPosts = socialPosts.filter(
    (post) => activeFilter === "all" || post.type === activeFilter
  );

  return (
    <main className="min-h-screen bg-primary text-text-primary">
      {/* ─── Hero Section ─── */}
      <section className="relative w-full min-h-[70vh] flex flex-col justify-end overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-accent/10 blur-[180px] rounded-full" />
        </div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pb-16 pt-40">
          {/* Back button */}
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
            <p className="font-body text-accent tracking-[0.2em] text-overline font-semibold uppercase mb-6">
              {socialPostHeading.overline}
            </p>
            <h1 className="font-heading text-display font-bold leading-[1.05] text-text-primary tracking-tight mb-8 max-w-5xl">
              {socialPostHeading.headline}
            </h1>
            <p className="font-body text-body-lg text-text-secondary font-light max-w-2xl leading-relaxed">
              {socialPostHeading.description}
            </p>
          </motion.div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary to-transparent pointer-events-none" />
      </section>

      {/* ─── Filterable Gallery ─── */}
      <section className="relative w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-16">
        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center gap-3 mb-14"
        >
          {(["all", "video", "static", "carousel"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`font-body text-caption px-5 py-2.5 rounded-full transition-all duration-300 border cursor-pointer ${
                activeFilter === filter
                  ? "bg-accent text-white border-accent shadow-[0_0_20px_rgba(255,64,0,0.3)]"
                  : "bg-surface text-text-secondary border-border hover:bg-elevated hover:border-border hover:text-text-primary"
              }`}
            >
              {filterLabels[filter]}
            </button>
          ))}
        </motion.div>

        {/* Grid Gallery — Fixed height cards */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                key={post.id}
                className={`relative group overflow-hidden rounded-2xl cursor-pointer ${
                  post.span === 2
                    ? "md:col-span-2 h-[500px] lg:h-[600px]"
                    : "col-span-1 h-[350px] lg:h-[400px]"
                }`}
              >
                {/* Thumbnail Background */}
                <Image
                  src={post.thumbnail}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  sizes={post.span === 2 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                />

                {/* Default Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 transition-opacity duration-500 group-hover:opacity-60" />

                {/* Hover Overlay (Darker) */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* ── Viral Badge (top-right) ── */}
                {post.highlightMetric && (
                  <div className="absolute top-4 right-4 z-20">
                    <div
                      className="font-body text-[11px] font-bold px-3.5 py-1.5 rounded-full text-white"
                      style={{
                        background: "rgba(239, 68, 68, 0.25)",
                        border: "1px solid rgba(239, 68, 68, 0.6)",
                        backdropFilter: "blur(12px)",
                        boxShadow: "0 0 20px rgba(239, 68, 68, 0.4)",
                      }}
                    >
                      {post.highlightMetric}
                    </div>
                  </div>
                )}

                {/* ── Type Badge (top-left) ── */}
                <div className="absolute top-4 left-4 z-20">
                  <div
                    className="font-body text-[11px] font-medium px-3 py-1.5 rounded-full text-white/90 capitalize"
                    style={{
                      background: "rgba(0,0,0,0.5)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      backdropFilter: "blur(12px)",
                    }}
                  >
                    {post.type === "video" ? "📹 Video" : post.type === "carousel" ? "📑 Carousel" : "🖼️ Static"}
                  </div>
                </div>

                {/* ── Play Button for Videos ── */}
                {post.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform duration-300">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                        <polygon points="8,5 20,12 8,19" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* ── Content Info (bottom) ── */}
                <div className="absolute inset-x-0 bottom-0 p-6 z-20">
                  <p className="font-body text-accent text-[11px] font-bold uppercase tracking-[0.15em] mb-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    {post.brand}
                  </p>
                  <h3 className={`font-heading font-bold text-white leading-tight mb-2 ${post.span === 2 ? "text-2xl lg:text-4xl" : "text-xl lg:text-2xl"}`}>
                    {post.title}
                  </h3>
                  <p className="font-body text-sm text-white/70 line-clamp-2 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100 translate-y-2 group-hover:translate-y-0">
                    {post.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ─── Performance Stats ─── */}
      <section className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-24 lg:py-32">
        <div
          className="relative rounded-3xl overflow-hidden p-12 md:p-20"
          style={{
            background: "linear-gradient(135deg, rgba(255,64,0,0.08) 0%, rgba(255,64,0,0.02) 50%, rgba(4,4,4,0.9) 100%)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* Decorative glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-accent/15 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-center">
            {socialPostHeading.stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="flex flex-col items-center justify-center"
              >
                <span className="font-heading text-stat font-bold text-text-primary mb-3 tracking-tighter">
                  {stat.value}
                </span>
                <span className="font-body text-overline text-text-muted font-medium uppercase tracking-[0.2em]">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
