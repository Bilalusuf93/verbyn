import type { LucideIcon } from "lucide-react";
import { Compass, PenTool, CodeXml, Sparkles } from "lucide-react";

/**
 * Central brand + content configuration.
 *
 * Anything not yet confirmed is left empty on purpose and the UI hides
 * it, so a placeholder never ships looking like real company details.
 */
export const siteConfig = {
  /** Studio name — taken from the repository name. Change it here only. */
  name: "Verbyn",
  tagline: "Digital product studio",
  description:
    "We design and build modern digital experiences, high-performance websites, and AI-powered products for ambitious businesses.",
  /**
   * Production URL. Set NEXT_PUBLIC_SITE_URL in Vercel once the domain is
   * known; canonical URLs, sitemap and robots use it when it is present.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "",
  /** Public contact email. Leave empty until a real inbox exists. */
  email: "",
  /** Verified social profiles only, e.g. { label: "LinkedIn", href: "https://…" } */
  socials: [] as ReadonlyArray<{ label: string; href: string }>,
} as const;

export type NavItem = { label: string; href: `#${string}` };

export const navigation: readonly NavItem[] = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export const capabilities = [
  "Strategy",
  "UI/UX Design",
  "Web Development",
  "Design Systems",
  "AI-Powered Products",
  "Digital Experiences",
] as const;

export type Service = {
  title: string;
  description: string;
  points: readonly string[];
  icon: LucideIcon;
};

export const services: readonly Service[] = [
  {
    title: "Digital Strategy & Product Thinking",
    description:
      "We get clear on what to build and why before anyone opens a design tool.",
    points: ["Product direction", "Discovery & planning", "Digital roadmaps"],
    icon: Compass,
  },
  {
    title: "UI/UX & Interface Design",
    description:
      "Interfaces that feel obvious to use, built on systems that scale with the product.",
    points: ["User-centred experiences", "Design systems", "Interactive prototypes"],
    icon: PenTool,
  },
  {
    title: "Web Development",
    description:
      "Fast, accessible frontends engineered with the same care as the design.",
    points: ["Modern Next.js websites", "High-performance web apps", "Responsive frontend engineering"],
    icon: CodeXml,
  },
  {
    title: "AI & Digital Products",
    description:
      "Useful AI features with interfaces people trust, not demos that stay demos.",
    points: ["AI-enabled experiences", "Product interfaces & integrations", "Custom digital solutions"],
    icon: Sparkles,
  },
];

export type Project = {
  name: string;
  category: string;
  description: string;
  /** Short, verifiable facts about the product (not results or metrics). */
  facts: readonly string[];
  href: string;
  external: boolean;
};

/**
 * Projects. Add more entries here; the Work section adapts automatically.
 * Intalk AI copy was checked against https://intalk.ai/ — it describes the
 * product only and makes no claim about who built it.
 */
export const projects: readonly Project[] = [
  {
    name: "Intalk AI",
    category: "AI / Digital Product",
    description:
      "Intalk AI builds AI voice bots that hold phone conversations for call centres and telemarketing teams, so businesses can handle high call volumes without scaling headcount at the same pace.",
    facts: ["AI voice agents", "Call centres & telemarketing", "Works with Vicidial & PBX systems"],
    href: "https://intalk.ai/",
    external: true,
  },
];

export const processSteps = [
  {
    title: "Discover",
    description: "Understand the goals, audience, constraints, and opportunities.",
  },
  {
    title: "Define",
    description: "Establish priorities, direction, requirements, and a clear plan.",
  },
  {
    title: "Design & Build",
    description: "Create the experience, develop the product, and refine the details.",
  },
  {
    title: "Launch & Improve",
    description: "Test, launch, learn, and improve based on real feedback.",
  },
] as const;
