"use client";

// ─── Overview / Hero (Pinterest style) ───
// Bố cục: chữ gọn bên trái, lưới masonry (ảnh + video sản phẩm) bên phải.
// Các cột cuộn dọc vô hạn, cột chẵn/lẻ ngược chiều nhau; rê chuột vào lưới thì dừng.

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
  overviewHeading,
  heroContent,
  heroStats,
  heroColumns,
  type HeroTile,
} from "@/data/overview";

const EASE = [0.22, 1, 0.36, 1] as const;

// Tốc độ (giây cho 1 vòng) và chiều cuộn cho từng cột
const COLUMN_MOTION = [
  { speed: "70s", reverse: false },
  { speed: "85s", reverse: true },
  { speed: "65s", reverse: false },
  { speed: "80s", reverse: true },
];

// Cột 3 ẩn trên mobile, cột 4 chỉ hiện từ xl
const COLUMN_VISIBILITY = ["flex", "flex", "hidden md:flex", "hidden xl:flex"];

function Tile({ tile, hidden }: { tile: HeroTile; hidden?: boolean }) {
  return (
    <div
      className="group relative w-full overflow-hidden rounded-2xl bg-surface"
      style={{ aspectRatio: tile.ratio }}
      aria-hidden={hidden || undefined}
    >
      {tile.type === "video" ? (
        <video
          src={tile.src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      ) : (
        <Image
          src={tile.src}
          alt={hidden ? "" : tile.tag}
          fill
          sizes="(min-width: 1280px) 14vw, (min-width: 768px) 20vw, 45vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      )}
      {/* Nhãn hiện khi hover */}
      <span
        className="pointer-events-none absolute bottom-2.5 left-2.5 rounded-full bg-black/60 px-2.5 py-1
                   font-body text-[11px] font-medium text-white/90 backdrop-blur-md
                   opacity-0 translate-y-1 transition-all duration-300
                   group-hover:opacity-100 group-hover:translate-y-0"
      >
        {tile.tag}
      </span>
    </div>
  );
}

function MasonryColumn({ tiles, index }: { tiles: HeroTile[]; index: number }) {
  const { speed, reverse } = COLUMN_MOTION[index % COLUMN_MOTION.length];
  return (
    <div className={`${COLUMN_VISIBILITY[index]} min-w-0 flex-1 flex-col`}>
      <div
        className="hero-col flex flex-col"
        data-reverse={reverse}
        style={{ "--hero-speed": speed } as React.CSSProperties}
      >
        {/* Nhân đôi nội dung để vòng lặp liền mạch (translateY -50%) */}
        {[0, 1].map((copy) => (
          <div key={copy} className="flex flex-col gap-3 pb-3 md:gap-4 md:pb-4">
            {tiles.map((tile) => (
              <Tile key={`${copy}-${tile.src}`} tile={tile} hidden={copy === 1} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Overview() {
  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: EASE },
  });

  return (
    <section
      id="overview"
      className="relative flex w-full flex-col overflow-hidden bg-primary lg:block lg:h-screen lg:min-h-[680px]"
    >
      {/* ════════ MASONRY ════════ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.2, ease: EASE }}
        className="hero-masonry relative order-2 h-[62vh] w-full overflow-hidden px-3
                   lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-[56%] lg:px-0 lg:pr-4"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)",
        }}
      >
        <div className="flex h-full gap-3 md:gap-4">
          {heroColumns.map((tiles, i) => (
            <MasonryColumn key={i} tiles={tiles} index={i} />
          ))}
        </div>
        {/* Mép trái hoà vào nền (desktop) */}
        <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-24 bg-gradient-to-r from-primary to-transparent lg:block" />
      </motion.div>

      {/* ════════ TEXT ════════ */}
      <div
        className="relative z-10 order-1 mx-auto flex w-full max-w-[1400px] flex-col justify-center
                   px-6 pb-10 pt-28 md:px-12 lg:h-full lg:px-16 lg:pb-0 lg:pt-20"
      >
        <div className="max-w-[560px] lg:max-w-[44%]">
          {/* Overline + avatar */}
          <motion.div {...fadeUp(0.1)} className="mb-6 flex items-center gap-3">
            <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-elevated">
              <Image
                src="/images/01-Overview/hero.png"
                alt="Eddie"
                fill
                sizes="36px"
                className="object-cover"
                style={{ objectPosition: "50% 8%", transform: "scale(1.9)", transformOrigin: "50% 12%" }}
                priority
              />
            </span>
            <span className="font-body text-[13px] font-medium tracking-wide text-white/60">
              {heroContent.overline}
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            {...fadeUp(0.2)}
            className="font-heading font-bold tracking-tight text-white
                       text-[clamp(40px,4.4vw,76px)] leading-[0.98]"
          >
            {heroContent.titleLine1}
            <br />
            <span className="text-white/45">{heroContent.titleLine2.replace(/\.$/, "")}</span>
            <span className="text-accent">.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            {...fadeUp(0.32)}
            className="mt-6 max-w-[460px] font-body text-[15px] leading-[1.7] md:text-[17px] text-white/60"
          >
            {overviewHeading.description}
          </motion.p>

          {/* CTAs */}
          <motion.div {...fadeUp(0.44)} className="mt-8 flex flex-wrap md:mt-9 items-center gap-x-7 gap-y-4">
            <Link
              href={heroContent.primaryCta.href}
              className="group inline-flex items-center gap-2.5 rounded-full bg-white px-6 py-3.5
                         font-body text-[15px] font-semibold text-black
                         transition-colors duration-300 hover:bg-accent hover:text-white"
            >
              {heroContent.primaryCta.label}
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href={heroContent.secondaryCta.href}
              className="group inline-flex items-center gap-1.5 font-body text-[15px] font-medium text-white/70
                         transition-colors hover:text-white"
            >
              {heroContent.secondaryCta.label}
              <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.dl {...fadeUp(0.56)} className="mt-10 flex gap-8 md:mt-12 md:gap-10">
            {heroStats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-heading text-[clamp(22px,2vw,30px)] font-bold leading-none text-white">
                  {s.value}
                </dd>
                <dd className="mt-2 font-body text-[12px] text-white/40">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  );
}
