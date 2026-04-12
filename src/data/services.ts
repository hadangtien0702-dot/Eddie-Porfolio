// ─── Services Data ───
// Mô tả: 5 năng lực chính — horizontal expandable cards layout
// Fields: id, title, tag, description, image (optional)

export interface Service {
  id: string;
  title: string;
  tag: string;
  description: string;
  image?: string;
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
    image: "/images/services/content-growth.jpg",
    links: [
      { label: "View Details", url: "/work/setup-and-build" },
    ],
  },
  {
    id: "web-forum-design",
    title: "Web & Forum Design",
    tag: "UI/UX & Web",
    description:
      "Designed and built User Interfaces for 2 polished websites and 1 forum, focusing on seamless user experience across the brands.",
    image: "/images/services/motion-graphics.jpg",
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
    image: "/images/services/brand-content.jpg",
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
    image: "/images/services/video-strategy.jpg",
    links: [
      { label: "Watch Best Videos", url: "#" } // User will provide links
    ]
  },
  {
    id: "ai-applications",
    title: "A.I",
    tag: "Innovation",
    description:
      "Applied generative AI models to scale production. Leveraged UGC A.I, Heygen, and ElevenLabs to create automated, high-quality published products.",
    image: "/images/services/performance-ads.jpg",
    links: [
      { label: "View A.I Works", url: "/work/ai-applications" },
    ],
  },
];
