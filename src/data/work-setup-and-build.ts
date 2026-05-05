// ─── Work: Setup and Build ───
// Data cho trang /work/setup-and-build

export const setupAndBuildMeta = {
  overline: "Studio & Operations",
  title: "Setup and Build",
  description:
    "From a raw house to a fully operational production system — handling the complete studio setup, equipment scaling, and workflow optimization from day one.",
};

export interface SetupHighlight {
  label: string;
  value: string;
  description: string;
}

export const setupHighlights: SetupHighlight[] = [
  {
    label: "Studio Space",
    value: "Full Build",
    description:
      "Converted raw space into a professional production studio with acoustic treatment, lighting rigs, and equipment mounting.",
  },
  {
    label: "Equipment Scaled",
    value: "12+ Pieces",
    description:
      "Camera systems, audio gear, lighting, editing workstations — sourced, configured, and integrated end-to-end.",
  },
  {
    label: "Workflow Optimized",
    value: "3× Faster",
    description:
      "Standardized production pipelines reduced turnaround time by 3× compared to ad-hoc processes.",
  },
];

export interface SetupStoryMoment {
  number: string;
  title: string;
  description: string;
  images: string[];
  type?: "raw" | "blueprint" | "hardware" | "operation";
}

export interface GearItem {
  id: string;
  category: "camera" | "lighting" | "audio" | "other";
  name: string;
  model: string;
  specs: string[];
  image: string;
  position: { x: number; y: number };
}

export const gearDetails: GearItem[] = [
  {
    id: "gear-cam",
    category: "camera",
    name: "Main Cinema Camera",
    model: "Sony FX3 / FX6",
    specs: ["4K 120fps", "Dual Base ISO", "Full-frame Sensor"],
    image: "/images/services/setup-build/IMG_7521.webp",
    position: { x: 15, y: 55 }
  },
  {
    id: "gear-lens",
    category: "camera",
    name: "Prime Lens Set",
    model: "Sony G-Master 35mm & 50mm",
    specs: ["F/1.2 & F/1.4", "Extreme Sharpness", "Beautiful Bokeh"],
    image: "/images/services/setup-build/IMG_7523.webp",
    position: { x: 20, y: 65 }
  },
  {
    id: "gear-light",
    category: "lighting",
    name: "Lighting System",
    model: "Aputure 600d & Amaran Tubes",
    specs: ["Sidus Link Control", "Softbox Modifiers", "Cinematic Mood"],
    image: "/images/services/setup-build/IMG_7550.webp",
    position: { x: 45, y: 30 }
  },
  {
    id: "gear-audio",
    category: "audio",
    name: "Professional Audio System",
    model: "Shure SM7B + RodeCaster Pro II",
    specs: ["Broadcast Mic", "Phantom Power Mixer", "Noise Cancellation"],
    image: "/images/services/setup-build/IMG_7525.webp",
    position: { x: 67, y: 78 }
  }
];

export const setupStory: SetupStoryMoment[] = [
  {
    number: "01",
    title: "The Raw Canvas",
    description: "Evaluating the bare room dynamics—acoustics, light leaks, and power capacity—at Firstroom before transformation.",
    images: [
      "/images/services/setup-build/Firstroom.webp", 
    ],
    type: "raw"
  },
  {
    number: "02",
    title: "Structural Build",
    description: "Installing the infrastructure. Framing, power distribution, and foundational acoustic elements.",
    images: [
      "/images/services/setup-build/IMG_0025.webp",
    ],
    type: "blueprint"
  },
  {
    number: "03",
    title: "Gear Integration",
    description: "Deploying the technological core: multi-cam systems, dynamic lighting rigs, and professional audio chains.",
    images: [
      "/images/services/setup-build/IMG_7525.webp",
    ],
    type: "hardware"
  },
  {
    number: "04",
    title: "Live Production",
    description: "Direct application of the newly built environment. Actively recording high-tier content and interviews in the fully optimized studio.",
    images: [
      "/images/services/setup-build/Main.webp",
    ],
    type: "operation"
  }
];

export interface GalleryItem {
  src: string;
  x: number;
  y: number;
  rotation: number;
  scale?: number;
}

export const supplementaryGallery: GalleryItem[] = [
  { src: "/images/services/setup-build/IMG_0025.webp", x: -400, y: -300, rotation: -4 },
  { src: "/images/services/setup-build/IMG_0026.webp", x: 100, y: -450, rotation: 3 },
  { src: "/images/services/setup-build/IMG_0027.webp", x: 500, y: -350, rotation: -2 },
  { src: "/images/services/setup-build/IMG_0028.webp", x: 850, y: -500, rotation: 5 },
  { src: "/images/services/setup-build/IMG_0029.webp", x: 1200, y: -300, rotation: -3 },
  { src: "/images/services/setup-build/IMG_5163.webp", x: -750, y: -100, rotation: 2, scale: 1.2 },
  { src: "/images/services/setup-build/IMG_7521.webp", x: -200, y: -50, rotation: -5 },
  { src: "/images/services/setup-build/IMG_7522.webp", x: 300, y: -80, rotation: 4 },
  { src: "/images/services/setup-build/IMG_7523.webp", x: 700, y: -120, rotation: -1 },
  { src: "/images/services/setup-build/IMG_7525.webp", x: 1050, y: -50, rotation: 6 },
  { src: "/images/services/setup-build/IMG_7545.webp", x: -500, y: 300, rotation: -3 },
  { src: "/images/services/setup-build/IMG_7549.webp", x: -100, y: 350, rotation: 2 },
  { src: "/images/services/setup-build/IMG_7550.webp", x: 400, y: 400, rotation: -4 },
  { src: "/images/services/setup-build/IMG_7677.webp", x: 800, y: 320, rotation: 5 },
  { src: "/images/services/setup-build/IMG_7934.webp", x: 1250, y: 250, rotation: -2 },
  { src: "/images/services/setup-build/IMG_7949.webp", x: -800, y: 600, rotation: 4 },
  { src: "/images/services/setup-build/IMG_9340.webp", x: -350, y: 650, rotation: -5 },
  { src: "/images/services/setup-build/IMG_9341.webp", x: 150, y: 700, rotation: 3 },
  { src: "/images/services/setup-build/IMG_9342.webp", x: 600, y: 750, rotation: -2 },
  { src: "/images/services/setup-build/IMG_9498.webp", x: 1000, y: 680, rotation: 1 },
  { src: "/images/services/setup-build/IMG_9499.webp", x: 1400, y: 550, rotation: -4 },
  { src: "/images/services/setup-build/IMG_9500.webp", x: -600, y: 950, rotation: 2 },
  { src: "/images/services/setup-build/IMG_9507.webp", x: -150, y: 1000, rotation: -3 },
  { src: "/images/services/setup-build/IMG_9510.webp", x: 350, y: 1050, rotation: 5 },
  { src: "/images/services/setup-build/IMG_9513.webp", x: 850, y: 980, rotation: -1 },
  { src: "/images/services/setup-build/IMG_9896.webp", x: 1300, y: 900, rotation: 4 },
  { src: "/images/services/setup-build/IMG_9897.webp", x: -950, y: 250, rotation: -6 },
  { src: "/images/services/setup-build/IMG_9898.webp", x: -1100, y: -200, rotation: 3 },
  { src: "/images/services/setup-build/IMG_9902.webp", x: -1250, y: 600, rotation: -2 },
  { src: "/images/services/setup-build/Firstroom.webp", x: -150, y: -650, rotation: 1, scale: 1.5 },
];
