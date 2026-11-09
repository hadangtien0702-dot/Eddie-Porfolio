"use client";

// ─── Overview / Hero ───
// Có 2 phương án hero, chọn trong src/data/overview.ts (heroContent.variant):
//   "orbit"  → HeroOrbit  (tiêu đề serif giữa trang, vòng thẻ 3D quanh chân dung)
//   "ribbon" → HeroRibbon (kiểu Turnover: chữ bên trái, dải ruy băng cam quấn quanh chân dung)
// Xem nhanh phương án khác mà không sửa code: thêm ?hero=orbit hoặc ?hero=ribbon vào URL.

import { useSyncExternalStore } from "react";
import { heroContent, type HeroVariant } from "@/data/overview";
import HeroOrbit from "./HeroOrbit";
import HeroRibbon from "./HeroRibbon";

const subscribe = () => () => {};

function readVariant(): HeroVariant {
  const q = new URLSearchParams(window.location.search).get("hero");
  return q === "orbit" || q === "ribbon" ? q : heroContent.variant;
}

export default function Overview() {
  const variant = useSyncExternalStore(subscribe, readVariant, () => heroContent.variant);
  return variant === "ribbon" ? <HeroRibbon /> : <HeroOrbit />;
}
