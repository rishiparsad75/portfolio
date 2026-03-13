"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const features = [
    {
        href: "/video-editing",
        label: "Video Editing",
        accent: "#7C3AED",
        accentSoft: "rgba(124,58,237,0.15)",
        desc: "Transforming raw footage into scroll-stopping cinematic experiences. High-retention edits designed to capture attention and drive engagement.",
        tags: ["Cinematic", "High-Retention", "Visual Effects", "Storytelling"],
        image: "/assets/thumbnails/video-editing-thumbnail.png",
        cta: "Watch the Reels",
        icon: (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
            </svg>
        ),
    },
    {
        href: "/graphic-design",
        label: "Graphic Design",
        accent: "#00D9FF",
        accentSoft: "rgba(0,217,255,0.12)",
        desc: "Striking visual identities and thumb-stopping creatives. Designing brand experiences that dominate feeds and convert viewers into loyal clients.",
        tags: ["Brand Identity", "UI/UX", "Social Media", "Conversion-Driven"],
        image: "/assets/thumbnails/graphic-design-thumbnail.png",
        cta: "Explore Portfolio",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M14 8h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        ),
    },
];

const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 60 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

export default function FeaturedProjects() {
    return (
        <section className="relative py-32 px-6 bg-bg overflow-hidden">
            {/* Background decoration */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-10 blur-3xl pointer-events-none"
                style={{ background: "radial-gradient(circle, #7C3AED, transparent)" }}
            />

            <div className="max-w-7xl mx-auto">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <p className="text-accent text-sm font-medium uppercase tracking-widest mb-4">
                        Featured Work
                    </p>
                    <h2 className="text-4xl md:text-6xl font-black text-white">
                        Two Worlds,{" "}
                        <span className="gradient-text">One Vision</span>
                    </h2>
                    <p className="mt-6 text-white/50 text-lg max-w-2xl mx-auto">
                        From cinematic video edits to bold graphic designs — explore the full breadth of creative work.
                    </p>
                </motion.div>

                {/* Feature cards */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-80px" }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    {features.map((f) => (
                        <motion.div key={f.href} variants={cardVariants}>
                            <Link href={f.href}>
                                <motion.div
                                    whileHover={{
                                        scale: 1.02,
                                        boxShadow: `0 0 50px ${f.accentSoft}`,
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                    className="glass-card overflow-hidden cursor-pointer group relative"
                                >
                                    {/* Image */}
                                    <div className="relative aspect-video overflow-hidden">
                                        <Image
                                            src={f.image}
                                            alt={f.label}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                        <div
                                            className="absolute inset-0"
                                            style={{
                                                background: `linear-gradient(to bottom, transparent 40%, ${f.accentSoft} 70%, rgba(18,18,18,0.95) 100%)`,
                                            }}
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="p-8">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div
                                                className="w-10 h-10 rounded-xl flex items-center justify-center"
                                                style={{ background: f.accentSoft, color: f.accent }}
                                            >
                                                {f.icon}
                                            </div>
                                            <h3 className="text-2xl font-bold text-white">{f.label}</h3>
                                        </div>

                                        <p className="text-white/50 mb-6 leading-relaxed">{f.desc}</p>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {f.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-3 py-1 rounded-full text-xs font-medium"
                                                    style={{
                                                        background: "rgba(255,255,255,0.06)",
                                                        border: "1px solid rgba(255,255,255,0.1)",
                                                        color: f.accent,
                                                    }}
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* CTA */}
                                        <div
                                            className="flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all duration-300"
                                            style={{ color: f.accent }}
                                        >
                                            <span>{f.cta}</span>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
