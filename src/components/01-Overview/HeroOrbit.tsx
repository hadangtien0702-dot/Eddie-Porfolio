"use client";

// ─── Hero phương án 1: "Orbit" ───
// Lấy cảm hứng từ các mẫu hero trên Pinterest (Mindly, Turnover):
// tiêu đề serif ở giữa, ảnh chân dung ở trung tâm với vòng thẻ 3D bao quanh,
// thẻ nổi hai bên nối bằng đường cong mảnh, huy hiệu chữ xoay ở góc.

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clapperboard, PenTool, Play, Plus, Sparkles } from "lucide-react";
import ReelModal from "./ReelModal";
import {
  overviewHeading,
  heroContent,
  heroStats,
  heroOrbit,
  type OrbitItem,
} from "@/data/overview";

const EASE = [0.22, 1, 0.36, 1] as const;

const ICONS = { clapperboard: Clapperboard, sparkles: Sparkles, pen: PenTool };

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: EASE },
});

// ─── Một thẻ trên vòng 3D ───
function OrbitCard({ item }: { item: OrbitItem }) {
  const isLabel = item.kind === "label";
  const Icon = isLabel ? ICONS[item.icon] : null;

  return (
    <div
      className={`absolute left-1/2 top-1/2 ${isLabel ? "hidden md:block" : ""}`}
      style={{
        transformStyle: "preserve-3d",
        transform: `translate(-50%, -50%) rotateY(${item.angle}deg) translateZ(var(--orbit-r))`,
        // Thẻ chữ ẩn mặt sau để không bị lật ngược chữ
        backfaceVisibility: isLabel ? "hidden" : "visible",
        WebkitBackfaceVisibility: isLabel ? "hidden" : "visible",
      }}
    >
      {isLabel ? (
        <div
          className="flex w-[clamp(150px,13vw,196px)] items-start gap-3 rounded-2xl p-3.5 backdrop-blur-xl"
          style={{ background: "var(--h-card)", boxShadow: "var(--h-shadow)" }}
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent">
            {Icon && <Icon size={16} />}
          </span>
          <span className="min-w-0">
            <span className="block font-body text-[14px] font-semibold leading-tight text-[var(--h-fg)]">
              {item.title}
            </span>
            <span className="mt-1 block font-body text-[11px] leading-snug text-[var(--h-muted)]">
              {item.text}
            </span>
          </span>
        </div>
      ) : (
        <div
          className="relative w-[clamp(64px,7.6vw,118px)] overflow-hidden rounded-2xl bg-neutral-900"
          style={{ aspectRatio: "3 / 4", boxShadow: "var(--h-shadow)" }}
        >
          {item.kind === "video" ? (
            <video
              src={item.src}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <Image src={item.src} alt="" fill sizes="120px" className="object-cover" />
          )}
        </div>
      )}
    </div>
  );
}

export default function HeroOrbit() {
  const sectionRef = useRef<HTMLElement>(null);
  const [reelOpen, setReelOpen] = useState(false);

  // Rê chuột → vòng thẻ xoay theo
  const mx = useMotionValue(0);
  const tiltY = useSpring(mx, { damping: 30, stiffness: 60 });

  const onMove = useCallback(
    (e: MouseEvent) => {
      const el = sectionRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      mx.set(((e.clientX - r.left) / r.width - 0.5) * 16);
    },
    [mx]
  );

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    el.addEventListener("mousemove", onMove, { passive: true });
    return () => el.removeEventListener("mousemove", onMove);
  }, [onMove]);

  return (
    <section ref={sectionRef} id="overview" className="relative w-full bg-primary p-2 md:p-3">
      <div
        data-theme={heroContent.theme}
        className="hero-shell relative h-[calc(100svh-16px)] min-h-[700px] w-full overflow-hidden rounded-[24px] md:h-[calc(100svh-24px)] md:min-h-[720px] md:rounded-[32px]"
        style={{ background: "var(--h-bg)" }}
      >
        {/* Ánh cam rất nhẹ sau chân dung */}
        <div
          className="pointer-events-none absolute left-1/2 top-[52%] h-[70vh] w-[70vh] -translate-x-1/2 rounded-full opacity-60"
          style={{ background: "radial-gradient(circle, rgba(255,64,0,0.16) 0%, transparent 62%)" }}
        />

        {/* ════════ TEXT (giữa, phía trên) ════════ */}
        <div className="relative z-30 mx-auto flex max-w-[980px] flex-col items-center px-6 pt-[100px] text-center md:pt-[112px]">
          <motion.span
            {...fadeUp(0.05)}
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-body text-[12px] font-medium text-[var(--h-fg)]"
            style={{ background: "var(--h-card)", boxShadow: "var(--h-shadow)" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {heroContent.badge}
          </motion.span>

          <motion.h1
            {...fadeUp(0.15)}
            className="mt-5 font-display font-normal tracking-[-0.02em] text-[var(--h-fg)]
                       text-[clamp(44px,6vw,96px)] leading-[0.95]"
          >
            {heroContent.titleLine1}
            <br />
            <em className="italic">{heroContent.titleLine2}</em>
            <span className="text-accent">.</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.28)}
            className="mt-5 max-w-[520px] font-body text-[14px] leading-[1.65] text-[var(--h-muted)] md:text-[16px]"
          >
            {overviewHeading.description}
          </motion.p>

          <motion.div {...fadeUp(0.4)} className="mt-7 flex items-center justify-center gap-2.5 md:gap-3">
            <Link
              href={heroContent.primaryCta.href}
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--h-btn-bg)] px-4 py-3 font-body text-[13px] md:px-5 md:text-[14px] font-semibold
                         text-[var(--h-btn-fg)] transition-colors duration-300 hover:bg-accent hover:text-white"
            >
              {heroContent.primaryCta.label}
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
            <button
              onClick={() => setReelOpen(true)}
              className="group inline-flex items-center gap-2.5 rounded-full py-2 pl-2 pr-4 font-body text-[13px] md:pr-5 md:text-[14px] font-semibold text-[var(--h-fg)]"
              style={{ background: "var(--h-card)", boxShadow: "var(--h-shadow)" }}
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-white transition-transform duration-300 group-hover:scale-110">
                <Play size={11} className="ml-0.5 fill-white" />
              </span>
              {heroContent.reel.label}
            </button>
          </motion.div>
        </div>

        {/* ════════ SCENE: chân dung + vòng thẻ 3D ════════ */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
          className="absolute left-0 right-0 top-[66%] z-10 mx-auto h-[70vh] md:top-[61%] md:h-[82vh]"
          style={{
            aspectRatio: "561 / 905",
            perspective: "1200px",
            ["--orbit-r" as string]: "clamp(120px, 22vw, 330px)",
          }}
        >
          <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
            <Image
              src="/images/01-Overview/hero.png"
              alt="Eddie — Creative Video Strategist"
              fill
              sizes="(min-width: 768px) 32vw, 70vw"
              className="object-contain object-top"
              style={{ transform: "translateZ(0px)" }}
              priority
            />

            {/* Vòng thẻ: nghiêng nhẹ, lắc qua lại chậm + theo chuột */}
            <motion.div
              className="absolute left-1/2 top-[15%] h-0 w-0"
              style={{ transformStyle: "preserve-3d", rotateY: tiltY }}
            >
              <motion.div
                style={{ transformStyle: "preserve-3d", rotateX: -10, rotateZ: -5 }}
                animate={{ rotateY: [-14, 14, -14] }}
                transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
              >
                {heroOrbit.map((item, i) => (
                  <OrbitCard key={i} item={item} />
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* ════════ Đường cong nối thẻ nổi (desktop) ════════ */}
        <svg
          className="pointer-events-none absolute inset-0 z-[5] hidden h-full w-full lg:block"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
          fill="none"
        >
          <path d="M 175 560 C 190 700, 300 760, 420 745" stroke="var(--h-faint)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          <path d="M 840 590 C 830 720, 720 770, 590 755" stroke="var(--h-faint)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        </svg>

        {/* ════════ Thẻ nổi trái ════════ */}
        <motion.div {...fadeUp(0.6)} className="absolute left-[7%] top-[38%] z-20 hidden lg:block">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="w-[236px] -rotate-[4deg] rounded-[22px] p-5"
            style={{ background: "var(--h-card)", boxShadow: "var(--h-shadow)" }}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/15 text-accent">
              <Clapperboard size={17} />
            </span>
            <p className="mt-4 font-body text-[17px] font-semibold leading-snug text-[var(--h-fg)]">
              {heroContent.leftCard.title}
            </p>
            <p className="mt-1.5 font-body text-[12px] text-[var(--h-muted)]">{heroContent.leftCard.text}</p>
          </motion.div>
        </motion.div>

        {/* ════════ Thẻ nổi phải ════════ */}
        <motion.div {...fadeUp(0.7)} className="absolute right-[7%] top-[42%] z-20 hidden lg:block">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="w-[220px] rotate-[4deg] rounded-[22px] p-5"
            style={{ background: "var(--h-card)", boxShadow: "var(--h-shadow)" }}
          >
            <div className="flex items-center">
              {heroContent.rightCard.thumbs.map((src, i) => (
                <span
                  key={src}
                  className="relative -ml-2 h-8 w-8 overflow-hidden rounded-full first:ml-0"
                  style={{ boxShadow: "0 0 0 2px var(--h-bg)", zIndex: 3 - i }}
                >
                  <Image src={src} alt="" fill sizes="32px" className="object-cover" />
                </span>
              ))}
              <span
                className="-ml-2 flex h-8 w-8 items-center justify-center rounded-full text-[var(--h-fg)]"
                style={{ background: "var(--h-bg)", boxShadow: "0 0 0 2px var(--h-bg)" }}
              >
                <Plus size={14} />
              </span>
            </div>
            <p className="mt-4 font-display text-[40px] leading-none text-[var(--h-fg)]">{heroContent.rightCard.value}</p>
            <p className="mt-2 font-body text-[12px] text-[var(--h-muted)]">{heroContent.rightCard.text}</p>
          </motion.div>
        </motion.div>

        {/* ════════ Huy hiệu chữ xoay (góc trên phải) ════════ */}
        <motion.div {...fadeUp(0.5)} className="absolute right-[6%] top-[18%] z-20 hidden h-[104px] w-[104px] lg:block">
          <svg viewBox="0 0 100 100" className="hero-spin h-full w-full" aria-hidden="true">
            <defs>
              <path id="hero-circle" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
            </defs>
            <text fill="var(--h-fg)" style={{ fontSize: "7.6px" }} className="font-body font-medium">
              <textPath href="#hero-circle" textLength="236" lengthAdjust="spacing">{heroContent.circleText}</textPath>
            </text>
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-accent">
            <Sparkles size={20} className="fill-accent" />
          </span>
        </motion.div>

        {/* ════════ Số liệu (góc dưới trái) ════════ */}
        <motion.div {...fadeUp(0.8)} className="absolute bottom-8 left-[5%] z-20 hidden md:block">
          <span className="mb-4 block h-px w-10" style={{ background: "var(--h-faint)" }} />
          <dl className="flex gap-7">
            {heroStats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-[30px] leading-none text-[var(--h-fg)]">{s.value}</dd>
                <dd className="mt-1.5 font-body text-[11px] text-[var(--h-muted)]">{s.label}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        {/* ════════ Ghi chú (góc dưới phải) ════════ */}
        <motion.div {...fadeUp(0.9)} className="absolute bottom-8 right-[5%] z-20 hidden items-end gap-3 md:flex">
          <span className="mb-2 block h-px w-8" style={{ background: "var(--h-faint)" }} />
          <div className="text-right">
            <Sparkles size={14} className="mb-2 ml-auto fill-accent text-accent" />
            {heroContent.footnote.map((line) => (
              <p key={line} className="font-body text-[12px] leading-snug text-[var(--h-muted)]">
                {line}
              </p>
            ))}
          </div>
        </motion.div>
      </div>

      <ReelModal
        open={reelOpen}
        onClose={() => setReelOpen(false)}
        src={heroContent.reel.src}
        label={heroContent.reel.label}
      />
    </section>
  );
}
