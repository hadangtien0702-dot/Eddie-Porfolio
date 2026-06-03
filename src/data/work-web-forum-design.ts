// ─── Work: Web & Forum Design ───
// Data cho trang /work/web-forum-design

export const webForumMeta = {
  overline: "UI/UX & Web",
  title: "Digital Platforms & Web Design",
  description:
    "Designed and built polished digital experiences for brands — from corporate websites to community-driven platforms.",
};

export interface WebProject {
  name: string;
  type: string;
  url: string;
  description: string;
  tags: string[];
  status: string;
  image: string;
}

export const webProjects: WebProject[] = [
  {
    name: "ThinkSmart Insurance",
    type: "Corporate Website",
    url: "https://thinksmartinsurance.com/en/home",
    description:
      "Full UI/UX design and build for an insurance brand — bilingual (EN/VI), responsive, conversion-focused layout with a modern design system.",
    tags: ["Next.js", "UI Design", "Bilingual", "Corporate"],
    status: "Live",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Dream Talent",
    type: "Talent Agency Website",
    url: "https://dreamtalent.com.vn/",
    description:
      "Designed the digital presence for a talent and entertainment agency, including artist profiles, booking flow, and brand identity integration.",
    tags: ["Web Design", "UI/UX", "Entertainment", "Brand"],
    status: "Live",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
  },
];
