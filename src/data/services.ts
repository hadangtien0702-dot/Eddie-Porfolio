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
    id: "production-media",
    title: "Production Media",
    tag: "Setup & Filming",
    description:
      "Equipment selection, studio setup, and hands-on filming for the company — producing Talking Head videos, Video Sales Letters, Podcasts, and Livestreams.",
    image: "/images/services/production-media.jpg",
  },
  {
    id: "video-production",
    title: "Video Production",
    tag: "Post-Production",
    description:
      "End-to-end video editing, motion design, and post-production — transforming raw footage into performance-driven content for ads and organic channels.",
    image: "/images/services/video-production.jpg",
  },
  {
    id: "social-design",
    title: "Social Post Design",
    tag: "Visual Content",
    description:
      "Eye-catching social media graphics, carousel designs, and branded visual content that stops the scroll and drives engagement.",
    image: "/images/services/social-design.jpg",
  },
  {
    id: "website",
    title: "Website",
    tag: "Web Development",
    description:
      "Designed and built websites for ThinkSmart Insurance and Dream Talent — creating polished digital presences that align with each brand's identity.",
    image: "/images/services/website.jpg",
    links: [
      { label: "ThinkSmart", url: "https://thinksmartinsurance.com/en/home" },
      { label: "Dream Talent", url: "https://dreamtalent.com.vn/" }
    ],
  },
];
