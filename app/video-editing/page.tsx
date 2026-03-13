"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import VideoModal from "@/components/VideoModal";

const categories = ["All", "Real Estate", "Motion Graphics", "Random Stuff", "Talking Head"];

const projects = [
    // ── Real Estate (4) ──────────────────────────────────────────
    {
        id: 1,
        title: "Luxury Villa Showcase",
        category: "Real Estate",
        thumbnail: "/assets/thumbnails/luxury-villa.png",
        videoId: "Y6kSsG--PWY",
        description: "Cinematic vertical walkthrough of a luxury villa with drone footage and color grading.",
        aspect: "portrait"
    },
    {
        id: 13,
        title: "Trump announce 50% additional tariff",
        category: "Real Estate",
        thumbnail: "/assets/thumbnails/trump-tariff.png",
        videoId: "fRzcYwCaBPM",
        description: "Detailed coverage of the recent trade policy announcement.",
        aspect: "portrait"
    },
    {
        id: 14,
        title: "today i meet someone",
        category: "Real Estate",
        thumbnail: "/assets/thumbnails/meet-someone.png",
        videoId: "VnnuDcTHJWM",
        description: "A personal encounter documented through cinematic visuals.",
        aspect: "portrait"
    },
    {
        id: 15,
        title: "what we do",
        category: "Real Estate",
        thumbnail: "/assets/thumbnails/what-we-do.png",
        videoId: "OfLKGVlSHQc",
        description: "An overview of our core services and specialized expertise.",
        aspect: "portrait"
    },

    // ── Motion Graphics (4) ───────────────────────────────────────
    {
        id: 4,
        title: "Valentine day offer",
        category: "Motion Graphics",
        thumbnail: "/assets/thumbnails/valentine-offer.jpg",
        videoId: "UhVze1KXYG0",
        description: "Special promotional animation for Valentine's Day deals.",
        aspect: "portrait"
    },
    {
        id: 5,
        title: "Social Media Promo Pack",
        category: "Motion Graphics",
        thumbnail: "/assets/thumbnails/social-promo.jpg",
        videoId: "gsm3F6JL5tc",
        description: "Animated typography and transitions designed for Instagram reels.",
        aspect: "portrait"
    },
    {
        id: 6,
        title: "holi offer",
        category: "Motion Graphics",
        thumbnail: "/assets/thumbnails/holi-offer.jpg",
        videoId: "a3RFSCjVH3g",
        description: "Vibrant and energetic animation for Holi festival promotions.",
        aspect: "portrait"
    },
    {
        id: 12,
        title: "3D Motion Graphic Short",
        category: "Motion Graphics",
        thumbnail: "/assets/thumbnails/3d-motion.jpg",
        videoId: "Wb2_mA8XF_E",
        description: "Eye-catching motion graphics animation tailored for vertical social media formats.",
        aspect: "portrait"
    },

    // ── Talking Head (5) ─────────────────────────────────────────
    {
        id: 9,
        title: "gase pipe",
        category: "Talking Head",
        thumbnail: "/assets/thumbnails/gas-pipe.jpg",
        videoId: "_ArI_GClOg0",
        description: "Informative content regarding gas pipe safety and awareness.",
        aspect: "portrait"
    },
    {
        id: 11,
        title: "dr sonyy",
        category: "Talking Head",
        thumbnail: "/assets/thumbnails/dr-sonyy.png",
        videoId: "yJ9IiQNhs_s",
        description: "Motivational insights and expert advice from Dr. Sonyy.",
        aspect: "portrait"
    },
    {
        id: 16,
        title: "Expert Tips Highlight",
        category: "Talking Head",
        thumbnail: "/assets/thumbnails/expert-tips.jpg",
        videoId: "1sAZubvxJUs",
        description: "Key insights from an expert interview formatted for social media engagement.",
        aspect: "portrait"
    },
    {
        id: 17,
        title: "Storytelling Short",
        category: "Talking Head",
        thumbnail: "https://img.youtube.com/vi/RXYpOZeW-78/maxresdefault.jpg",
        videoId: "RXYpOZeW-78",
        description: "Engaging personal story told through tight editing and visual hooks.",
        aspect: "portrait"
    },
    {
        id: 18,
        title: "Quick Advice Clip",
        category: "Talking Head",
        thumbnail: "https://img.youtube.com/vi/DI8DtFdzbX4/maxresdefault.jpg",
        videoId: "DI8DtFdzbX4",
        description: "Bite-sized advice with animated captions and high-quality audio.",
        aspect: "portrait"
    },

    // ── Random Stuff (4) ─────────────────────────────────────────
    {
        id: 7,
        title: "trasition",
        category: "Random Stuff",
        thumbnail: "https://img.youtube.com/vi/p5Wtw2qSOkE/maxresdefault.jpg",
        videoId: "p5Wtw2qSOkE",
        description: "A showcase of creative transition effects in video editing.",
        aspect: "portrait"
    },
    {
        id: 8,
        title: "Episode Short Cuts",
        category: "Random Stuff",
        thumbnail: "/assets/thumbnails/episode-shortcuts.jpg",
        videoId: "tES1jNN7tO0",
        description: "Punchy clip edits from a long-form episode optimised for social.",
        aspect: "portrait"
    },
    {
        id: 19,
        title: "Creative Workflow Short",
        category: "Random Stuff",
        thumbnail: "/assets/thumbnails/creative-workflow.jpg",
        videoId: "9dTaXGOoJeo",
        description: "A quick look into the creative process and behind-the-scenes editing.",
        aspect: "portrait"
    },
    {
        id: 20,
        title: "Landscape Showcase",
        category: "Random Stuff",
        thumbnail: "https://img.youtube.com/vi/MEPbbzZ82Kc/maxresdefault.jpg",
        videoId: "MEPbbzZ82Kc",
        description: "High-quality landscape production showing versatility in video formats.",
        aspect: "landscape"
    },
];

// Accent colours per category
const categoryAccent: Record<string, string> = {
    "Real Estate": "rgba(124,58,237,0.15)",
    "Motion Graphics": "rgba(0,217,255,0.12)",
    "Random Stuff": "rgba(168,85,247,0.12)",
    "Talking Head": "rgba(56,189,248,0.12)",
};

const categoryColor: Record<string, string> = {
    "Real Estate": "#7C3AED",
    "Motion Graphics": "#00D9FF",
    "Random Stuff": "#A855F7",
    "Talking Head": "#38BDF8",
};

export default function VideoEditingPage() {
    const [fetchedProjects] = useState(projects);
    const [activeCategory, setActiveCategory] = useState("All");
    const [modal, setModal] = useState<{ videoId: string; title: string } | null>(null);

    const filtered =
        activeCategory === "All"
            ? fetchedProjects
            : fetchedProjects.filter((p: any) => p.category === activeCategory);

    const accent = activeCategory === "All" ? "#7C3AED" : (categoryColor[activeCategory] ?? "#7C3AED");
    const accentBg = activeCategory === "All" ? "rgba(124,58,237,0.15)" : (categoryAccent[activeCategory] ?? "rgba(124,58,237,0.15)");

    return (
        <div className="min-h-screen bg-bg pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-6">

                {/* ── Header ─────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 text-center"
                >
                    <p className="text-accent text-sm font-medium uppercase tracking-widest mb-4">
                        Portfolio
                    </p>
                    <h1 className="text-5xl md:text-7xl font-black text-white">
                        Video{" "}
                        <span className="gradient-text">Editing</span>
                    </h1>
                    <p className="mt-6 text-white/50 text-lg max-w-2xl mx-auto">
                        Short-form vertical content crafted for real estate, motion design, podcasts, and personal brands.
                    </p>
                </motion.div>

                {/* ── Category Filters ────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-wrap gap-3 justify-center mb-14"
                >
                    {categories.map((cat) => {
                        const isActive = activeCategory === cat;
                        const col = cat === "All" ? "#7C3AED" : (categoryColor[cat] ?? "#7C3AED");
                        const bgCol = cat === "All" ? "rgba(124,58,237,0.18)" : (categoryAccent[cat] ?? "rgba(124,58,237,0.18)");
                        return (
                            <motion.button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.97 }}
                                className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200"
                                style={{
                                    background: isActive ? bgCol : "rgba(255,255,255,0.05)",
                                    border: isActive ? `1px solid ${col}` : "1px solid rgba(255,255,255,0.08)",
                                    color: isActive ? col : "rgba(255,255,255,0.5)",
                                    boxShadow: isActive ? `0 0 20px ${col}44` : "none",
                                }}
                            >
                                {cat}
                            </motion.button>
                        );
                    })}
                </motion.div>

                {/* ── Projects Grid — adaptive cards ─────────── */}
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
                >
                    {filtered.map((project: any, i: number) => {
                        const col = categoryColor[project.category] ?? "#7C3AED";
                        const bgCol = categoryAccent[project.category] ?? "rgba(124,58,237,0.15)";
                        const isLandscape = project.aspect === "landscape";

                        return (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.45, delay: i * 0.06 }}
                                onClick={() => setModal({ videoId: project.videoId, title: project.title })}
                                className={`cursor-pointer group ${isLandscape ? 'sm:col-span-2' : ''}`}
                            >
                                <motion.div
                                    whileHover={{ scale: 1.02, boxShadow: `0 0 32px ${col}55` }}
                                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                    className="glass-card overflow-hidden h-full"
                                >
                                    <div className={`relative ${isLandscape ? 'aspect-video' : 'aspect-[9/16]'} overflow-hidden`}>
                                        <Image
                                            src={project.thumbnail}
                                            alt={project.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                                        />
                                        {/* Gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                                        {/* Play button */}
                                        <motion.div
                                            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                                        >
                                            <div
                                                className="w-14 h-14 rounded-full flex items-center justify-center"
                                                style={{
                                                    background: `${col}dd`,
                                                    backdropFilter: "blur(8px)",
                                                    border: "2px solid rgba(255,255,255,0.2)",
                                                }}
                                            >
                                                <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                            </div>
                                        </motion.div>

                                        {/* Category badge */}
                                        <div className="absolute top-2 left-2">
                                            <span
                                                className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                                                style={{
                                                    background: bgCol,
                                                    border: `1px solid ${col}55`,
                                                    color: col,
                                                }}
                                            >
                                                {project.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Card footer */}
                                    <div className="px-3 py-3 mt-auto">
                                        <h3 className="text-white font-semibold text-xs leading-snug mb-1 group-hover:text-white/90 line-clamp-1">
                                            {project.title}
                                        </h3>
                                        <p className="text-white/35 text-[11px] leading-snug line-clamp-2">
                                            {project.description}
                                        </p>
                                        <div
                                            className="mt-2 flex items-center gap-1 text-[11px] font-medium"
                                            style={{ color: col }}
                                        >
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                            Watch
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>

            {/* ── Video Modal ──────────────────────────────────── */}
            {modal && (
                <VideoModal
                    isOpen={!!modal}
                    onClose={() => setModal(null)}
                    videoId={modal.videoId}
                    title={modal.title}
                />
            )}
        </div>
    );
}
