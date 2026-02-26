// ─── Case Study Data ───
// Mô tả: Dữ liệu cho 2 case study chính
// Thinksmart Insurance + Dream Talent
// Nhà tuyển dụng chọn xem case nào trước

export interface CaseStudy {
  id: string;
  company: string;
  tagline: string;
  role: string;
  duration: string;
  description: string;
  highlights: {
    label: string;
    value: string;
  }[];
  color: string; // accent color cho mỗi case
}

export const caseStudies: CaseStudy[] = [
  {
    id: "thinksmart",
    company: "Thinksmart Insurance",
    tagline: "Scaling paid funnels for insurance leads",
    role: "Video Strategist & Performance Creative",
    duration: "2023 — Present",
    description:
      "Xây dựng hệ thống video ads funnel từ A-Z cho Thinksmart Insurance. Từ concept, scripting, production đến optimization — giúp giảm CPA và tăng conversion rate đáng kể.",
    highlights: [
      { label: "CPA Reduction", value: "-44%" },
      { label: "Conversion Rate", value: "+127%" },
      { label: "Revenue Growth", value: "$6M+" },
      { label: "Videos Produced", value: "120+" },
    ],
    color: "#ef4444", // accent đỏ
  },
  {
    id: "dreamtalent",
    company: "Dream Talent",
    tagline: "Building organic growth through video content",
    role: "Creative Director & Content Strategist",
    duration: "2022 — 2023",
    description:
      "Phát triển chiến lược nội dung video organic cho Dream Talent. Tập trung vào storytelling, brand awareness và xây dựng cộng đồng qua các nền tảng social media.",
    highlights: [
      { label: "Organic Views", value: "6M+" },
      { label: "Engagement Rate", value: "+340%" },
      { label: "Followers Growth", value: "50K+" },
      { label: "Content Pieces", value: "200+" },
    ],
    color: "#e8512d", // accent cam
  },
];

// ─── Section heading ───
export const caseStudyHeading = {
  overline: "CASE STUDIES",
  title: "Proven Results",
  description: "Choose a case study to explore how I drive real business impact through creative video strategy.",
};
