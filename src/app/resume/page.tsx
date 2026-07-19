import type { Metadata } from "next";
import Resume from "@/components/07-Resume/Resume";

// Title riêng cho trang CV — cũng là document title khi in/lưu PDF
export const metadata: Metadata = {
  title: "Ha Dang Tien (Eddie) — Resume | Creative Production Team Lead",
  description:
    "Resume of Ha Dang Tien (Eddie) — Creative Production Team Lead. Video production, performance creative, and AI-assisted content pipelines.",
};

export default function ResumePage() {
  return <Resume />;
}
