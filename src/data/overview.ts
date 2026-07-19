// ─── Overview Data ───
// Mô tả: Dữ liệu hiển thị trong section Overview
// Gồm: thông tin giới thiệu + 4 số liệu business stats nổi bật

// ─── Heading & mô tả cho Overview section ───
export const overviewHeading = {
  // Overline label phía trên heading
  overline: "HEY, I'M EDDIE",
  // Heading chính
  title: "Creative Production Team Lead",
  // Mô tả ngắn
  description:
    "I lead a production team focused on building high-quality video content — from concept to final delivery — that drives results across paid and organic channels.",
};

// ─── 4 số liệu business nổi bật ───
// Mỗi stat sẽ có hiệu ứng count-up khi scroll tới
export const businessStats = [
  {
    number: "$6.2M",
    label: "Peak Revenue",
    countValue: 6.2,
    prefix: "$",
    suffix: "M",
  },
  {
    number: "-66%",
    label: "CPA Reduction",
    countValue: 66,
    prefix: "-",
    suffix: "%",
  },
  {
    number: "100%",
    label: "Video-Sourced Leads",
    countValue: 100,
    prefix: "",
    suffix: "%",
  },
  {
    number: "-90%",
    label: "Overhead / +10x Velocity",
    countValue: 90,
    prefix: "-",
    suffix: "%",
  },
];
