// ─── Services Data ───
// Mô tả: 5 năng lực chính — horizontal expandable cards layout
// Fields: id, title, tag, description, image (optional)

export interface Service {
  id: string;
  title: string;
  tag: string;
  description: string;
  image?: string;
  gallery?: string[];
  links?: { label: string; url: string }[];
}

export const servicesHeading = {
  titleBold: "Built to perform",
  titleFaded: "from concept to conversion",
  descriptionLeft:
    "I own the full pipeline — studio setup, filming, editing, and delivery.",
  descriptionRight:
    "Every output is crafted to drive results, not just look good.",
};

export const services: Service[] = [
  {
    id: "setup-and-build",
    title: "Setup and Build",
    tag: "Studio & Operations",
    description:
      "From a raw house to a fully operational production system. Handled the complete studio setup, equipment scaling, and workflow optimization.",
    image: "/images/services/setup-build/Main.webp",
    gallery: [
      "/images/services/setup-build/Firstroom.webp",
      "/images/services/setup-build/IMG_0025.webp",
      "/images/services/setup-build/IMG_0026.webp",
      "/images/services/setup-build/IMG_0027.webp",
      "/images/services/setup-build/IMG_0028.webp",
      "/images/services/setup-build/IMG_0029.webp",
      "/images/services/setup-build/IMG_5163.webp",
      "/images/services/setup-build/IMG_7521.webp",
      "/images/services/setup-build/IMG_7522.webp",
      "/images/services/setup-build/IMG_7523.webp",
      "/images/services/setup-build/IMG_7525.webp",
      "/images/services/setup-build/IMG_7545.webp",
      "/images/services/setup-build/IMG_7549.webp",
      "/images/services/setup-build/IMG_7550.webp",
      "/images/services/setup-build/IMG_7677.webp",
      "/images/services/setup-build/IMG_7934.webp",
      "/images/services/setup-build/IMG_7949.webp",
      "/images/services/setup-build/IMG_9340.webp",
      "/images/services/setup-build/IMG_9341.webp",
      "/images/services/setup-build/IMG_9342.webp",
      "/images/services/setup-build/IMG_9498.webp",
      "/images/services/setup-build/IMG_9499.webp",
      "/images/services/setup-build/IMG_9500.webp",
      "/images/services/setup-build/IMG_9507.webp",
      "/images/services/setup-build/IMG_9510.webp",
      "/images/services/setup-build/Main.webp",
      "/images/services/setup-build/IMG_9896.webp",
      "/images/services/setup-build/IMG_9897.webp",
      "/images/services/setup-build/IMG_9898.webp",
      "/images/services/setup-build/IMG_9902.webp"
    ],
    links: [
      { label: "View Details", url: "/work/setup-and-build" },
    ],
  },
  {
    id: "web-forum-design",
    title: "Digital Platforms & Web Design",
    tag: "UI/UX & Web",
    description:
      "Designed and built User Interfaces for 2 polished websites and 1 forum, focusing on seamless user experience across the brands.",
    image: "/images/services/web-design/Main.webp",
    links: [
      { label: "View Projects", url: "/work/web-forum-design" },
    ],
  },
  {
    id: "social-design",
    title: "Social",
    tag: "Graphic Design",
    description:
      "Eye-catching social media graphics, carousels, and high-performing posts designed and actively used during my time at ThinkSmart Insurance.",
    image: "/images/work/social-post/0424-ph-ka-tai-chinh-vung-vang.webp",
    links: [
      { label: "View Social Designs", url: "/work/social-post" } // If applicable
    ],
  },
  {
    id: "video-editor",
    title: "Video Editor",
    tag: "Post-Production",
    description:
      "Showcasing the highest-performing and most creative videos cut, edited, and published during my time at ThinkSmart Insurance.",
    image: "/images/04-Services/video-strategy.jpg",
    links: [
      { label: "Watch Best Videos", url: "/work/video-editor" }
    ]
  },
  {
    id: "ai-applications",
    title: "A.I",
    tag: "Innovation",
    description:
      "Applied generative AI models to scale production. Leveraged UGC A.I, Heygen, and ElevenLabs to create automated, high-quality published products.",
    image: "/images/05-AI/ai_dashboard_card.png",
    links: [
      { label: "View A.I Works", url: "/ai" },
    ],
  },
];
