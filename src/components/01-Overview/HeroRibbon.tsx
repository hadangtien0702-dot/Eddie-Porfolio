"use client";

// ─── Hero phương án 2: "Ribbon" (kiểu Turnover) ───
// Chữ bên trái (tiêu đề sans đậm, dòng 2 màu cam), số liệu, thẻ "Latest case study";
// bên phải: chân dung với dải ruy băng cam quấn quanh (nửa sau nằm sau người, nửa trước đè lên),
// chữ chạy dọc ruy băng; 3 thẻ dịch vụ nổi bên phải.

import { Fragment, useId, useState } from "react";
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

// ─── Hình học của cảnh (đơn vị theo viewBox 0 0 1000 1100) ───
const IMG = { x: 190, y: 120, w: 610, h: Math.round((610 * 905) / 561) };
const RIB = { cx: 500, cy: 560, rx: 470, ry: 112, tilt: -12, width: 54 };
// Chu vi elip (công thức Ramanujan) — dùng để chữ chạy vòng liền mạch
const LOOP = Math.round(
  Math.PI * (3 * (RIB.rx + RIB.ry) - Math.sqrt((3 * RIB.rx + RIB.ry) * (RIB.rx + 3 * RIB.ry)))
);

// Elip 1 vòng: từ trái → xuống đáy (mặt trước) → phải → lên đỉnh (mặt sau) → trái
const RIBBON_PATH = `M ${RIB.cx - RIB.rx} ${RIB.cy} A ${RIB.rx} ${RIB.ry} 0 1 0 ${RIB.cx + RIB.rx} ${RIB.cy} A ${RIB.rx} ${RIB.ry} 0 1 0 ${RIB.cx - RIB.rx} ${RIB.cy}`;

function RibbonScene({ uid }: { uid: string }) {
  const pathId = `${uid}-path`;
  // \u00a0 = khoảng trắng không bị SVG gộp lại
  const sep = "\u00a0\u00a0•\u00a0\u00a0";
  const unit = heroRibbon.ribbonWords.join(sep) + sep;
  // 4 cụm chữ mỗi vòng; textLength ép đúng 1 vòng.
  // 2 bản chữ nối đuôi nhau (offset 0 và -LOOP) cùng trượt → phủ kín vòng, không chồng chữ.
  const text = unit.repeat(4);
  const DUR = "40s";

  const ribbonText = [0, -LOOP].map((start) => (
    <text
      key={start}
      fill="#fff"
      fontSize="19"
      fontWeight={600}
      letterSpacing="1"
      dominantBaseline="central"
      textLength={LOOP}
      lengthAdjust="spacing"
      className="font-body"
    >
      <textPath href={`#${pathId}`} startOffset={start}>
        {text}
        <animate attributeName="startOffset" from={start} to={start + LOOP} dur={DUR} repeatCount="indefinite" />
      </textPath>
    </text>
  ));

  // Một nửa ruy băng (back = nửa trên/phía sau, front = nửa dưới/phía trước)
  const half = (side: "back" | "front") => (
    <g transform={`rotate(${RIB.tilt} ${RIB.cx} ${RIB.cy})`} clipPath={`url(#${uid}-clip-${side})`}>
      <use
        href={`#${pathId}`}
        stroke={`url(#${uid}-grad-${side})`}
        strokeWidth={RIB.width}
        fill="none"
        filter={side === "front" ? `url(#${uid}-shadow)` : undefined}
      />
      {/* Viền sáng mảnh phía trên dải */}
      <use
        href={`#${pathId}`}
        stroke="rgba(255,255,255,0.35)"
        strokeWidth={RIB.width - 4}
        fill="none"
        style={{ mixBlendMode: "soft-light" }}
      />
      <g opacity={side === "back" ? 0.75 : 1}>{ribbonText}</g>
    </g>
  );

  return (
    <svg viewBox="0 0 1000 1100" className="h-full w-full overflow-visible" aria-hidden="true">
      <defs>
        <path id={pathId} d={RIBBON_PATH} />
        <linearGradient id={`${uid}-grad-front`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#ff8a4c" />
          <stop offset="0.5" stopColor="#ff4000" />
          <stop offset="1" stopColor="#ff7a36" />
        </linearGradient>
        <linearGradient id={`${uid}-grad-back`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#d63a06" />
          <stop offset="0.5" stopColor="#b52d00" />
          <stop offset="1" stopColor="#e24a10" />
        </linearGradient>
        <filter id={`${uid}-shadow`} x="-20%" y="-50%" width="140%" height="200%">
          <feDropShadow dx="0" dy="14" stdDeviation="14" floodColor="#ff4000" floodOpacity="0.35" />
        </filter>
        {/* Cắt đôi elip theo trục ngang (trong hệ toạ độ đã xoay) */}
        <clipPath id={`${uid}-clip-back`}>
          <rect x={-200} y={RIB.cy - 400} width={1400} height={400} />
        </clipPath>
        <clipPath id={`${uid}-clip-front`}>
          <rect x={-200} y={RIB.cy} width={1400} height={400} />
        </clipPath>
      </defs>

      {half("back")}
      <image href="/images/01-Overview/hero.png" x={IMG.x} y={IMG.y} width={IMG.w} height={IMG.h} />
      {half("front")}
    </svg>
  );
}

export default function HeroRibbon() {
  const uid = useId().replace(/:/g, "");
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
          <motion.dl {...fadeUp(0.52)} className="mt-10 grid grid-cols-2 gap-y-6 sm:flex sm:gap-0 lg:mt-12">
            {d.stats.map((s, i) => (
              <Fragment key={s.label}>
                {i > 0 && <span className="mx-6 hidden w-px self-stretch sm:block" style={{ background: "var(--h-faint)" }} />}
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
        <motion.div {...fadeUp(0.7)} className="absolute bottom-[5%] left-[5%] z-30 hidden lg:block">
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
          className="relative z-10 mx-auto -mt-2 h-[64vh] max-w-full
                     lg:absolute lg:bottom-0 lg:left-[43%] lg:mt-0 lg:h-[96%]"
          style={{ aspectRatio: "1000 / 1100" }}
        >
          <RibbonScene uid={uid} />
        </motion.div>

        {/* ════════ 3 thẻ dịch vụ (phải) ════════ */}
        <div className="absolute right-[3.5%] top-[17%] z-30 hidden flex-col gap-[4.5vh] lg:flex">
          {d.services.map((s, i) => {
            const Icon = ICONS[s.icon];
            return (
              <motion.div key={s.title} {...fadeUp(0.55 + i * 0.1)} className={i === 1 ? "translate-x-8" : ""}>
                <Link
                  href={s.href}
                  className="group relative flex w-[270px] items-start gap-3.5 rounded-[18px] p-4 backdrop-blur-xl"
                  style={{ background: "var(--h-card)", boxShadow: "var(--h-shadow)" }}
                >
                  {/* Đường nối + chấm (kiểu Turnover) */}
                  <span className="pointer-events-none absolute -left-16 top-1/2 flex w-16 items-center">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-white shadow-[0_0_0_3px_rgba(255,64,0,0.25)]" />
                    <span className="h-px flex-1" style={{ background: "var(--h-faint)" }} />
                  </span>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/12 text-accent">
                    <Icon size={18} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-body text-[14px] font-semibold text-[var(--h-fg)]">{s.title}</span>
                    <span className="mt-1 block font-body text-[12px] leading-snug text-[var(--h-muted)]">{s.text}</span>
                  </span>
                  <span
                    className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[var(--h-fg)] transition-colors duration-300 group-hover:bg-accent group-hover:text-white"
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
        <motion.div {...fadeUp(0.9)} className="absolute bottom-[5%] right-[4%] z-30 hidden flex-col items-center gap-2 lg:flex">
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
