"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import VideoModal from "@/components/VideoModal";
import projectsData from "../../data/projects.json";

const categories = ["All", "Real Estate", "Motion Graphics", "Random Stuff", "Talking Head"];

const projects = projectsData.videos;

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
    const [activeCategory, setActiveCategory] = useState("All");
    const [modal, setModal] = useState<{ videoId: string; title: string } | null>(null);


    const filtered =
        activeCategory === "All"
            ? projects
            : projects.filter((p) => p.category === activeCategory);

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
                    {filtered.map((project: typeof projects[0], i: number) => {
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
