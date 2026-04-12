// ─── Overview Data ───
// Mô tả: Dữ liệu hiển thị trong section Overview
// Gồm: thông tin giới thiệu + 4 số liệu business stats nổi bật

// ─── Heading & mô tả cho Overview section ───
export const overviewHeading = {
  // Overline label phía trên heading
  overline: "ABOUT ME",
  // Heading chính
  title: "Performance Media Manager",
  // Mô tả ngắn
  description:
    "I bridge the gap between creative visual production and aggressive performance marketing. Leading a dedicated media team, I engineer video assets that directly supply 100% of marketing leads for Sales. I proactively A/B test, scale content adaptation, and optimize pipelines to drive record-breaking corporate revenue peaks.",
};

// ─── 4 số liệu business nổi bật ───
// Mỗi stat sẽ có hiệu ứng count-up khi scroll tới
export const businessStats = [
  {
    number: "$6M",
    label: "2024 Revenue Peak",
    // Giá trị số để count-up animation
    countValue: 6,
    prefix: "$",
    suffix: "M",
  },
  {
    number: "100%",
    label: "Leads Sourced by Team",
    countValue: 100,
    prefix: "",
    suffix: "%",
  },
  {
    number: "Proactive",
    label: "A/B Testing & Optimization",
    countValue: 1, // dummy for string
    prefix: "",
    suffix: "",
  },
  {
    number: "Mass",
    label: "Video Volume Adaptation",
    countValue: 1, // dummy
    prefix: "",
    suffix: "",
  },
];
