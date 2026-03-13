"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ImageModal from "@/components/ImageModal";


const projects = [
    {
        id: 1,
        title: "Marketing Agency Concept",
        category: "Social Media",
        image: "/assets/graphic-design/MAIN.jpg",
        aspect: "portrait",
    },
    {
        id: 2,
        title: "Digital Agency Showcase",
        category: "Branding",
        image: "/assets/graphic-design/MAIN 02.jpg",
        aspect: "portrait",
    },
    {
        id: 3,
        title: "SGI Brand Identity",
        category: "Branding",
        image: "/assets/graphic-design/SGI main.jpg",
        aspect: "landscape",
    },
    {
        id: 4,
        title: "Social Media Campaign",
        category: "Social Media",
        image: "/assets/graphic-design/SGI 01.jpg",
        aspect: "square",
    },
    {
        id: 5,
        title: "Brand Visuals Pack",
        category: "Social Media",
        image: "/assets/graphic-design/SGI 02.jpg",
        aspect: "square",
    },
    {
        id: 6,
        title: "Content Strategy Design",
        category: "Social Media",
        image: "/assets/graphic-design/SGI 03.jpg",
        aspect: "portrait",
    },
    {
        id: 7,
        title: "Creative Post Series",
        category: "Social Media",
        image: "/assets/graphic-design/SGI 04.jpg",
        aspect: "portrait",
    },
    {
        id: 8,
        title: "Brand Moodboard",
        category: "Branding",
        image: "/assets/graphic-design/SGI Mood.jpg",
        aspect: "landscape",
    },
    {
        id: 9,
        title: "Twitter/X Header Banner",
        category: "Branding",
        image: "/assets/graphic-design/SGI Banner.jpg",
        aspect: "landscape",
    },
    {
        id: 10,
        title: "Brand Stationary Design",
        category: "Branding",
        image: "/assets/graphic-design/SGI Back.jpg",
        aspect: "landscape",
    },
];

const aspectMap: Record<string, string> = {
    portrait: "aspect-[3/4]",
    landscape: "aspect-video",
    square: "aspect-square",
};

export default function GraphicDesignPage() {
    const [modal, setModal] = useState<{ src: string; title: string } | null>(null);

    return (
        <div className="min-h-screen bg-bg pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 text-center"
                >
                    <p className="text-secondary text-sm font-medium uppercase tracking-widest mb-4">
                        Portfolio
                    </p>
                    <h1 className="text-5xl md:text-7xl font-black text-white">
                        Graphic{" "}
                        <span
                            style={{
                                background: "linear-gradient(135deg, #00D9FF, #7C3AED)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            Design
                        </span>
                    </h1>
                    <p className="mt-6 text-white/50 text-lg max-w-2xl mx-auto">
                        Visuals that communicate. Designs that captivate. From posters to full brand systems.
                    </p>
                </motion.div>


                {/* Pinterest-style Masonry Grid */}
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {projects.map((project, i) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: i * 0.05 }}
                            onClick={() => setModal({ src: project.image, title: project.title })}
                            className="cursor-pointer group break-inside-avoid mb-6"
                        >
                            <motion.div
                                whileHover={{
                                    scale: 1.03,
                                    boxShadow: "0 0 40px rgba(0,217,255,0.2)",
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                className="glass-card overflow-hidden"
                            >
                                <div className={`relative ${aspectMap[project.aspect] || "aspect-video"} overflow-hidden`}>
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                    {/* Hover overlay */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        whileHover={{ opacity: 1 }}
                                        className="absolute inset-0 flex items-center justify-center"
                                        style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(2px)" }}
                                    >
                                        <div
                                            className="w-12 h-12 rounded-full flex items-center justify-center"
                                            style={{ background: "rgba(0,217,255,0.8)" }}
                                        >
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </div>
                                    </motion.div>

                                    {/* Category badge */}
                                    <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <span
                                            className="px-3 py-1 rounded-full text-xs font-medium text-secondary"
                                            style={{
                                                background: "rgba(0,217,255,0.1)",
                                                border: "1px solid rgba(0,217,255,0.3)",
                                            }}
                                        >
                                            {project.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="px-4 py-3">
                                    <div className="flex justify-between items-center mb-1">
                                        <h3 className="text-white font-medium text-sm group-hover:text-secondary transition-colors duration-200">
                                            {project.title}
                                        </h3>
                                        <span className="text-[10px] uppercase tracking-wider text-white/30">{project.category}</span>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {modal && (
                <ImageModal
                    isOpen={!!modal}
                    onClose={() => setModal(null)}
                    imageSrc={modal.src}
                    title={modal.title}
                />
            )}
        </div>
    );
}
