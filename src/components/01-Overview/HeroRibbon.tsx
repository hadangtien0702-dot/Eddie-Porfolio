"use client";

// ─── Hero phương án 2: "Ribbon" (kiểu Turnover) ───
// Chữ bên trái (tiêu đề sans đậm, dòng 2 màu cam), số liệu, thẻ "Latest case study";
// bên phải: chân dung với dải ruy băng cam 3D (render từ Blender) quấn quanh người;
// 3 thẻ dịch vụ nổi bên phải.

import { Fragment, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BarChart3, Clapperboard, Play, Sparkles } from "lucide-react";
import { heroContent, heroRibbon, overviewHeading } from "@/data/overview";
import ReelModal from "./ReelModal";

const EASE = [0.22, 1, 0.36, 1] as const;
const ICONS = { clapperboard: Clapperboard, sparkles: Sparkles, chart: BarChart3 };

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: EASE },
});

// ─── Cảnh bên phải (khung chung 1400 × 1100) ───
// Chọn trong src/data/overview.ts → heroRibbon.character:
//   "3d"    → nhân vật 3D dựng & render bằng Blender (đầu xẻ lát, kính cam "VIDEO STRATEGIST",
//             ruy băng quấn quanh) — 1 ảnh trong suốt ribbon-character.webp, chữ đã in sẵn trong ảnh.
//   "photo" → ảnh chân dung thật (hero.png) kẹp giữa 2 lớp ruy băng 3D:
//             ribbon-back.webp (sau người) và ribbon-front.webp (đè lên người).
const SCENE = { w: 1400, h: 1100 };
const IMG = { x: 60, y: 40, w: 820, h: Math.round((820 * 905) / 561) };
const FLOAT = { animate: { y: [0, -10, 0] }, transition: { duration: 7, repeat: Infinity, ease: "easeInOut" as const } };

function RibbonScene() {
  const full = { x: 0, y: 0, width: SCENE.w, height: SCENE.h };
  return (
    <svg viewBox={`0 0 ${SCENE.w} ${SCENE.h}`} className="h-full w-full overflow-visible" aria-hidden="true">
      {heroRibbon.character === "3d" ? (
        <motion.image {...FLOAT} href="/images/01-Overview/ribbon-character.webp" {...full} />
      ) : (
        <>
          <motion.image {...FLOAT} href="/images/01-Overview/ribbon-back.webp" {...full} />
          <image href="/images/01-Overview/hero.png" x={IMG.x} y={IMG.y} width={IMG.w} height={IMG.h} />
          <motion.image {...FLOAT} href="/images/01-Overview/ribbon-front.webp" {...full} />
        </>
      )}
    </svg>
  );
}

export default function HeroRibbon() {
  const [reelOpen, setReelOpen] = useState(false);
  const d = heroRibbon;

  return (
    <section id="overview" className="relative w-full bg-primary p-2 md:p-3">
      <div
        data-theme={heroContent.theme}
        className="hero-shell relative flex w-full flex-col overflow-hidden rounded-[24px] md:rounded-[32px]
                   lg:block lg:h-[calc(100svh-24px)] lg:min-h-[720px]"
        style={{ background: "var(--h-bg)" }}
      >
        {/* Quầng cam mềm phía sau chân dung */}
        <div
          className="pointer-events-none absolute right-[8%] top-[18%] h-[80vh] w-[80vh] rounded-full opacity-70 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(255,110,40,0.28) 0%, rgba(255,64,0,0.08) 45%, transparent 70%)" }}
        />

        {/* ════════ TEXT (trái) ════════ */}
        <div className="relative z-30 px-6 pt-28 md:px-12 lg:absolute lg:left-[5%] lg:top-0 lg:w-[46%] lg:px-0 lg:pt-[150px]">
          <motion.span
            {...fadeUp(0.05)}
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-body text-[12px] font-medium text-[var(--h-fg)]"
            style={{ background: "var(--h-card)", boxShadow: "var(--h-shadow)" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {d.badge}
          </motion.span>

          <motion.h1
            {...fadeUp(0.15)}
            className="mt-6 font-heading font-bold tracking-[-0.035em] text-[var(--h-fg)]
                       text-[clamp(40px,5vw,80px)] leading-[1.02]"
          >
            {d.titleLine1}
            <br />
            <span className="text-accent">{d.titleLine2}</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.28)}
            className="mt-5 max-w-[460px] font-body text-[14px] leading-[1.7] text-[var(--h-muted)] md:text-[16px]"
          >
            {overviewHeading.description}
          </motion.p>

          <motion.div {...fadeUp(0.4)} className="mt-8 flex items-center gap-3 md:gap-6">
            <Link
              href={d.primaryCta.href}
              className="group inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-accent px-5 py-3.5 font-body text-[13px] md:px-6 md:text-[14px] font-semibold text-white
                         shadow-[0_12px_30px_-10px_rgba(255,64,0,0.7)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              {d.primaryCta.label}
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
            <button onClick={() => setReelOpen(true)} className="group inline-flex items-center gap-3 text-left">
              <span
                className="flex h-11 w-11 shrink-0 items-center md:h-12 md:w-12 justify-center rounded-full transition-transform duration-300 group-hover:scale-105"
                style={{ background: "var(--h-card)", boxShadow: "var(--h-shadow)" }}
              >
                <Play size={15} className="ml-0.5 fill-accent text-accent" />
              </span>
              <span>
                <span className="block whitespace-nowrap font-body text-[13px] font-semibold text-[var(--h-fg)] md:text-[14px]">{d.reel.label}</span>
                <span className="hidden font-body text-[12px] text-[var(--h-muted)] sm:block">{d.reel.sub}</span>
              </span>
            </button>
          </motion.div>

          {/* Số liệu */}
          <motion.dl {...fadeUp(0.52)} className="mt-10 grid grid-cols-2 gap-y-6 sm:flex sm:gap-0 lg:mt-10 lg:grid lg:max-w-[340px] lg:gap-y-6 xl:mt-12 xl:flex xl:max-w-none xl:gap-0">
            {d.stats.map((s, i) => (
              <Fragment key={s.label}>
                {i > 0 && <span className="mx-6 hidden w-px self-stretch sm:block lg:hidden xl:block" style={{ background: "var(--h-faint)" }} />}
                <div>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-heading text-[24px] font-bold leading-none tracking-tight text-[var(--h-fg)] md:text-[28px]">
                    {s.value}
                  </dd>
                  <dd className="mt-2 font-body text-[12px] text-[var(--h-muted)]">{s.label}</dd>
                </div>
              </Fragment>
            ))}
          </motion.dl>
        </div>

        {/* ════════ Thẻ case study mới nhất (dưới trái) ════════ */}
        <motion.div {...fadeUp(0.7)} className="absolute bottom-[5%] left-[5%] z-30 hidden xl:[@media(min-height:860px)]:block">
          <Link
            href={d.latestWork.href}
            className="group flex w-[380px] items-center gap-4 rounded-[20px] p-3 pr-4 backdrop-blur-xl"
            style={{ background: "var(--h-card)", boxShadow: "var(--h-shadow)" }}
          >
            <span className="relative h-[76px] w-[104px] shrink-0 overflow-hidden rounded-xl">
              <Image src={d.latestWork.image} alt="" fill sizes="104px" className="object-cover" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-body text-[14px] font-semibold text-[var(--h-fg)]">{d.latestWork.label}</span>
              <span className="mt-1 block font-body text-[12px] leading-snug text-[var(--h-muted)]">{d.latestWork.text}</span>
            </span>
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[var(--h-fg)] transition-colors duration-300 group-hover:bg-accent group-hover:text-white"
              style={{ boxShadow: "inset 0 0 0 1px var(--h-faint)" }}
            >
              <ArrowRight size={16} />
            </span>
          </Link>
        </motion.div>

        {/* ════════ SCENE: chân dung + ruy băng ════════ */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.25, ease: EASE }}
          className="relative z-10 mt-4 h-[60vh] w-full
                     lg:absolute lg:bottom-0 lg:left-[40%] lg:mt-0 lg:h-[80%] lg:w-auto lg:aspect-[1400/1100]
                     xl:left-[30%] xl:h-[88%]"
        >
          {/* Mobile: khung rộng hơn màn hình, canh giữa theo thân người */}
          <div className="absolute bottom-0 left-1/2 aspect-[1400/1100] h-full -translate-x-[38%] lg:static lg:translate-x-0">
            <RibbonScene />
          </div>
        </motion.div>

        {/* ════════ 3 thẻ dịch vụ (phải) ════════ */}
        <div className="absolute right-[2%] top-[19%] z-30 hidden flex-col gap-[3.5vh] lg:flex xl:right-[3.5%] xl:top-[17%] xl:gap-[4.5vh]">
          {d.services.map((s, i) => {
            const Icon = ICONS[s.icon];
            return (
              <motion.div key={s.title} {...fadeUp(0.55 + i * 0.1)} className={i === 1 ? "xl:translate-x-8" : ""}>
                <Link
                  href={s.href}
                  className="group relative flex w-[196px] items-center gap-3 rounded-[18px] p-2.5 pr-4 backdrop-blur-xl xl:w-[270px] xl:items-start xl:gap-3.5 xl:p-4"
                  style={{ background: "var(--h-card)", boxShadow: "var(--h-shadow)" }}
                >
                  {/* Đường nối + chấm (kiểu Turnover) */}
                  <span className="pointer-events-none absolute -left-16 top-1/2 hidden w-16 items-center xl:flex">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-white shadow-[0_0_0_3px_rgba(255,64,0,0.25)]" />
                    <span className="h-px flex-1" style={{ background: "var(--h-faint)" }} />
                  </span>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/12 text-accent">
                    <Icon size={18} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-body text-[14px] font-semibold text-[var(--h-fg)]">{s.title}</span>
                    <span className="mt-1 hidden font-body text-[12px] leading-snug text-[var(--h-muted)] xl:block">{s.text}</span>
                  </span>
                  <span
                    className="mt-1 hidden h-7 w-7 shrink-0 items-center justify-center rounded-full text-[var(--h-fg)] transition-colors duration-300 group-hover:bg-accent group-hover:text-white xl:flex"
                    style={{ boxShadow: "inset 0 0 0 1px var(--h-faint)" }}
                  >
                    <ArrowRight size={13} />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* ════════ Scroll down (dưới phải) ════════ */}
        <motion.div {...fadeUp(0.9)} className="absolute bottom-[5%] right-[4%] z-30 hidden flex-col items-center gap-2 xl:flex">
          <span className="font-body text-[11px] font-medium text-[var(--h-fg)]">Scroll Down</span>
          <span className="flex h-7 w-[18px] justify-center rounded-full pt-1.5" style={{ boxShadow: "inset 0 0 0 1.5px var(--h-fg)" }}>
            <motion.span
              className="h-1.5 w-[2px] rounded-full bg-[var(--h-fg)]"
              animate={{ y: [0, 6, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
          <span className="h-8 w-px" style={{ background: "var(--h-fg)" }} />
        </motion.div>
      </div>

      <ReelModal open={reelOpen} onClose={() => setReelOpen(false)} src={heroContent.reel.src} label={d.reel.label} />
    </section>
  );
}
