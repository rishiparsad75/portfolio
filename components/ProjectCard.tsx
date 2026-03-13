"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface ProjectCardProps {
    title: string;
    category: string;
    image: string;
    href: string;
    tags?: string[];
    accent?: "purple" | "cyan";
}

export default function ProjectCard({
    title,
    category,
    image,
    href,
    tags = [],
    accent = "purple",
}: ProjectCardProps) {
    const glowColor =
        accent === "purple"
            ? "rgba(124, 58, 237, 0.4)"
            : "rgba(0, 217, 255, 0.3)";

    return (
        <Link href={href}>
            <motion.div
                whileHover={{
                    scale: 1.02,
                    boxShadow: `0 0 40px ${glowColor}, 0 0 80px ${glowColor}33`,
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="glass-card overflow-hidden cursor-pointer group"
                style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                }}
            >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Tags */}
                    {tags.length > 0 && (
                        <div className="absolute top-3 left-3 flex gap-2">
                            {tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-2 py-1 rounded-md text-xs font-medium text-white/80"
                                    style={{
                                        background: "rgba(0,0,0,0.6)",
                                        backdropFilter: "blur(8px)",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                    }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Arrow reveal on hover */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        className="absolute bottom-3 right-3 w-10 h-10 rounded-full flex items-center justify-center"
                        style={{
                            background: accent === "purple" ? "#7C3AED" : "#00D9FF",
                        }}
                    >
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </motion.div>
                </div>

                {/* Info */}
                <div className="p-5">
                    <p className="text-xs font-medium uppercase tracking-widest text-accent mb-1">
                        {category}
                    </p>
                    <h3 className="text-white font-semibold text-lg leading-snug group-hover:text-white/90 transition-colors">
                        {title}
                    </h3>
                </div>
            </motion.div>
        </Link>
    );
}
