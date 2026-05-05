export interface VideoPostItem {
  id: string;
  title: string;
  brand: string;
  thumbnail: string;
  previewVideo?: string; // Optional: for hover-to-play
  fullVideoUrl?: string; // For the actual video player
  role: string;
  stats: {
    views?: string;
    leads?: string;
    retention?: string;
  };
  tags: string[];
}

export const videoPortfolioHeading = {
  headline: "Crafting the Final Cut",
  description: "Từ những đoạn phim thô đến các chiến dịch triệu view. Đây là những video có Performance tốt nhất tôi từng thực hiện.",
};

// Dummy data for the video portfolio
export const videoPosts: VideoPostItem[] = [
  {
    id: "vp-1",
    title: "Campaign Tài Chính 2024",
    brand: "ThinkSmart",
    thumbnail: "/images/02-CaseStudy/thinksmart/01-Hero/banner-01.webp",
    previewVideo: "", 
    role: "Lead Editor & Colorist",
    stats: {
      views: "3.2M+",
      leads: "100%",
    },
    tags: ["Commercial", "High-Performance"],
  },
  {
    id: "vp-2",
    title: "Year End Party Recap",
    brand: "Dream Talent",
    thumbnail: "/images/02-CaseStudy/dreamtalent/thumbnail.jpg", // TBD
    role: "Director & Editor",
    stats: {
      views: "500K+",
      retention: "85%",
    },
    tags: ["Event", "Cinematic"],
  },
  {
    id: "vp-3",
    title: "Tuyển Dụng Nhanh",
    brand: "ThinkSmart",
    thumbnail: "/images/services/setup-build/Main.webp", // Placeholder
    role: "Offline Editor",
    stats: {
      views: "1.1M+",
      leads: "450+",
    },
    tags: ["Shorts", "Recruitment"],
  },
  {
    id: "vp-4",
    title: "Brand Story 2023",
    brand: "ThinkSmart",
    thumbnail: "/images/services/web-design/Main.webp", // Placeholder
    role: "Lead Editor",
    stats: {
      views: "2M+",
    },
    tags: ["Documentary", "Brand"],
  }
];
