import { LucideIcon, BookOpenCheck, ShieldCheck, Palette, Waves, Bot, PenTool, ClipboardList } from "lucide-react";

export type LearningModule = {
  id: string;
  route: string;
  title: string;
  summary: string;
  estimatedTime: string;
  icon: LucideIcon;
};

export const learningModules: LearningModule[] = [
  {
    id: "home",
    route: "/",
    title: "Welcome",
    summary: "Orient yourself and capture the challenge you're working on.",
    estimatedTime: "5 min",
    icon: ClipboardList,
  },
  {
    id: "ai-literacy",
    route: "/week1",
    title: "AI Literacy Checklist",
    summary: "Explore core concepts, critical evaluation moves, and hands-on labs.",
    estimatedTime: "35-45 min",
    icon: BookOpenCheck,
  },
  {
    id: "ai-ethics",
    route: "/week3",
    title: "AI Ethics & Bias",
    summary: "Investigate responsible AI practices and bias mitigation strategies.",
    estimatedTime: "30-40 min",
    icon: ShieldCheck,
  },
  {
    id: "storytelling",
    route: "/week4",
    title: "Storytelling with AI",
    summary: "Design narrative-driven learning experiences with generative media.",
    estimatedTime: "25-35 min",
    icon: Palette,
  },
  {
    id: "vibecoding",
    route: "/week6",
    title: "Vibecoding",
    summary: "Prototype vibe-rich interfaces that blend sound, visuals, and interaction.",
    estimatedTime: "20-30 min",
    icon: Waves,
  },
  {
    id: "custom-gpts",
    route: "/custom-gpts",
    title: "Custom GPTs",
    summary: "Build and evaluate your own assistant tailored to program needs.",
    estimatedTime: "30-45 min",
    icon: Bot,
  },
  {
    id: "prototype-planner",
    route: "/prototype-planner",
    title: "Prototype Planner",
    summary: "Turn your idea into an actionable plan backed by CPAD coaching.",
    estimatedTime: "40-60 min",
    icon: PenTool,
  },
  {
    id: "gallery",
    route: "/gallery",
    title: "Gallery",
    summary: "Browse inspiration from peers and CPAD partners.",
    estimatedTime: "10 min",
    icon: Palette,
  },
];

export const orderedLearningModules = learningModules.filter((module) => module.id !== "gallery");
