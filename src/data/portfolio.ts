export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  year: string;
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface SkillCategory {
  category: string;
  skills: {
    name: string;
    level?: string;
    description?: string;
  }[];
}

export interface ExperienceItem {
  year: string;
  role: string;
  organization: string;
  location?: string;
  description: string;
  highlights?: string[];
}

export interface PortfolioData {
  personal: {
    name: string;
    firstName: string;
    lastName: string;
    monogram: string;
    role: string;
    status: string;
    headline: string;
    subheadline: string;
    bio: string[];
    location: string;
    email: string;
    portrait: string;
  };
  socialLinks: {
    name: string;
    url: string;
    label: string;
  }[];
  projects: Project[];
  skillCategories: SkillCategory[];
  experience: ExperienceItem[];
  stats: {
    value: string;
    label: string;
  }[];
}

export const portfolioData: PortfolioData = {
  personal: {
    name: "M. Sakib Sadman Arian",
    firstName: "M. Sakib",
    lastName: "Sadman Arian",
    monogram: "ARIAN",
    role: "Creative Developer",
    status: "Available for high-impact roles & collaborations",
    headline: "I build intelligent systems, interactive experiences, and thoughtful digital products.",
    subheadline: "Blending creative computation, modern web engineering, and machine learning into tactile, fluid user interfaces.",
    bio: [
      "I am a Creative Developer & Software Engineer passionate about the intersection of interactive computer graphics, modern web architecture, and applied machine intelligence.",
      "My work focuses on crafting digital experiences that feel alive, responsive, and thoughtfully engineered—from real-time WebGL shaders and tactile user interfaces to explainable machine learning systems."
    ],
    location: "Global / Remote",
    email: "sakib.arian.dev@gmail.com",
    portrait: "/images/portrait.jpg",
  },
  socialLinks: [
    {
      name: "GitHub",
      url: "https://github.com/arian",
      label: "View repositories",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/sakib-sadman-arian",
      label: "Connect on LinkedIn",
    },
    {
      name: "Twitter / X",
      url: "https://twitter.com",
      label: "Follow updates",
    },
  ],
  stats: [
    { value: "5+", label: "Years of Craft" },
    { value: "20+", label: "Shipped Projects" },
    { value: "60 FPS", label: "WebGL Graphics Target" },
    { value: "99%", label: "Lighthouse Performance" },
  ],
  projects: [
    {
      id: "demand-forecasting",
      number: "01",
      title: "Seasonality-Aware Demand Forecasting",
      category: "Machine Learning & Systems",
      description: "Explainable predictive forecasting engine leveraging gradient-boosted trees and SHAP values for real-time demand modeling and inventory risk optimization.",
      technologies: ["Python", "XGBoost", "SHAP", "FastAPI", "React", "TypeScript"],
      year: "2025",
      liveUrl: "#",
      githubUrl: "https://github.com",
      featured: true,
    },
    {
      id: "liquid-canvas",
      number: "02",
      title: "Tactile Neural Shaders & Liquid Interaction Engine",
      category: "Creative Computation",
      description: "High-performance GPU shader pipeline implementing procedural Navier-Stokes inspired fluid mechanics and chromatic dispersion in WebGL/GLSL.",
      technologies: ["WebGL", "GLSL Shaders", "Three.js", "React", "TypeScript"],
      year: "2024",
      liveUrl: "#",
      githubUrl: "https://github.com",
      featured: true,
    },
    {
      id: "distributed-workflow",
      number: "03",
      title: "Resilient Distributed Pipeline Engine",
      category: "Systems Architecture",
      description: "Fault-tolerant microservice orchestration framework with sub-millisecond event streaming, telemetry tracing, and distributed state consistency.",
      technologies: ["TypeScript", "Node.js", "Go", "Docker", "Redis", "Next.js"],
      year: "2024",
      liveUrl: "#",
      githubUrl: "https://github.com",
      featured: true,
    },
    {
      id: "editorial-design-system",
      number: "04",
      title: "Editorial Design System & Typography Engine",
      category: "Design Engineering",
      description: "A comprehensive design system featuring micro-interactions, responsive fluid typography scales, and accessible component architectures.",
      technologies: ["React", "Tailwind CSS", "Storybook", "Figma", "CSS Architecture"],
      year: "2023",
      liveUrl: "#",
      githubUrl: "https://github.com",
      featured: false,
    },
  ],
  skillCategories: [
    {
      category: "Core Languages",
      skills: [
        { name: "TypeScript / JavaScript", level: "Expert" },
        { name: "Python", level: "Advanced" },
        { name: "C# / .NET", level: "Proficient" },
        { name: "C++", level: "Intermediate" },
        { name: "Java", level: "Proficient" },
      ],
    },
    {
      category: "Frontend & Graphics",
      skills: [
        { name: "React / Next.js", level: "Expert" },
        { name: "WebGL / GLSL Shaders", level: "Advanced" },
        { name: "Three.js", level: "Advanced" },
        { name: "Tailwind CSS & Vanilla CSS", level: "Expert" },
        { name: "HTML5 Canvas & SVG", level: "Advanced" },
      ],
    },
    {
      category: "AI, ML & Data",
      skills: [
        { name: "Machine Learning & Deep Learning", level: "Advanced" },
        { name: "Predictive Analytics & Forecasting", level: "Advanced" },
        { name: "Explainable AI (SHAP / LIME)", level: "Advanced" },
        { name: "PyTorch & Scikit-Learn", level: "Proficient" },
      ],
    },
    {
      category: "Architecture & Tools",
      skills: [
        { name: "Git & GitHub CI/CD", level: "Expert" },
        { name: "Docker & Containerization", level: "Proficient" },
        { name: "REST & GraphQL APIs", level: "Expert" },
        { name: "Figma & UI Prototyping", level: "Advanced" },
      ],
    },
  ],
  experience: [
    {
      year: "2024 — Present",
      role: "Creative Developer & Software Engineer",
      organization: "Autonomous / Labs",
      description: "Architecting interactive web graphics, AI-integrated user interfaces, and modular web platforms for global clients and experimental projects.",
      highlights: [
        "Developed custom GLSL fluid simulation shaders rendering at continuous 60fps across desktop and mobile.",
        "Engineered end-to-end fullstack TypeScript and machine learning solutions.",
      ],
    },
    {
      year: "2023 — 2024",
      role: "Frontend Engineer & Interaction Designer",
      organization: "Digital Innovations",
      description: "Led frontend architecture, performance optimization, and design systems for enterprise web applications.",
      highlights: [
        "Increased Lighthouse performance scores from 72 to 98 through asset budgeting and shader optimizations.",
        "Implemented accessible component libraries serving thousands of daily active users.",
      ],
    },
    {
      year: "2022 — 2023",
      role: "Software Developer & Researcher",
      organization: "Computational Lab",
      description: "Conducted research on predictive machine learning models and visual analytics dashboards.",
      highlights: [
        "Authored model explainability pipelines and automated data ingestion pipelines.",
      ],
    },
  ],
};
