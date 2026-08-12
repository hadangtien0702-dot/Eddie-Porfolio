import type { Metadata } from "next";
import HoSo from "@/components/07-Resume/HoSo";

// Title riêng cho trang hồ sơ CEO — cũng là document title khi in/lưu PDF.
// noindex: trang này gửi riêng cho lãnh đạo qua link trực tiếp, không cần lên Google.
export const metadata: Metadata = {
  title: "Hà Đăng Tiến (Eddie) — Hồ sơ năng lực | Trưởng nhóm Sản xuất Sáng tạo",
  description:
    "Hồ sơ năng lực của Hà Đăng Tiến (Eddie) — video tạo doanh thu, ứng dụng A.I vào sản xuất nội dung, và AiO Studio.",
  robots: { index: false, follow: false },
};

export default function HoSoPage() {
  return <HoSo />;
}
