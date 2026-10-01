"use client";

import React from "react";
import { ArrowUpRight, Sparkles, CheckCircle2 } from "lucide-react";

export default function AiOStudioBanner() {
  return (
    <section className="relative w-full py-16 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden border-y border-zinc-200">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="relative rounded-2xl border border-zinc-200 bg-white p-8 sm:p-12 lg:p-14 shadow-lg shadow-zinc-200/50 overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#F86820] text-xs font-mono font-bold tracking-wider uppercase mb-4">
                <span className="w-2 h-2 rounded-full bg-[#F86820] animate-pulse" />
                <span>Currently Building · Production Pipeline Tool</span>
              </div>

              {/* Title */}
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-zinc-950 tracking-tight leading-tight">
                AiO Studio <span className="text-[#F86820] font-normal text-2xl sm:text-3xl font-mono">for Premiere Pro</span>
              </h2>

              {/* Description */}
              <p className="mt-4 text-base sm:text-lg text-zinc-700 leading-relaxed font-body">
                Bộ 11 công cụ tự động hóa tích hợp sâu vào Adobe Premiere Pro: cắt khoảng lặng AI, tự bám camera diễn giả, tạo phụ đề tự động, và quản lý hơn 28,800+ assets — giúp tối ưu tốc độ hậu kỳ gấp 3 lần và giảm 90% thao tác lặp lại.
              </p>

              {/* Feature pills */}
              <div className="flex flex-wrap gap-2.5 mt-6">
                {[
                  "11 Modular Tools",
                  "Auto Silent Cut",
                  "Auto Transcripts",
                  "Auto Podcast Multicam",
                  "100% On-Device",
                ].map((feat) => (
                  <span
                    key={feat}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-white border border-zinc-200 text-zinc-800 shadow-sm"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#F86820]" />
                    {feat}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3.5 shrink-0">
              <a
                href="https://aio-shotsave.vercel.app/premiere/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#F86820] hover:bg-[#e0560f] text-white font-heading font-bold text-sm sm:text-base tracking-wide shadow-lg shadow-orange-500/20 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <span>Trải Nghiệm Live Showcase</span>
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>

              <a
                href="https://aio-shotsave.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-zinc-50 border border-zinc-300 text-zinc-800 hover:text-black font-body text-xs sm:text-sm font-bold shadow-sm transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <span>Xem Trang Chủ Shot & Save</span>
                <ArrowUpRight className="w-4 h-4 opacity-60" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
