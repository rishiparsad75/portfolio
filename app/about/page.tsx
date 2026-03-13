"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const skills = [
    { name: "Video Editing", level: 95, color: "#7C3AED" },
    { name: "Motion Graphics", level: 85, color: "#9B5DE5" },
    { name: "Graphic Design", level: 92, color: "#00D9FF" },
    { name: "UI/UX Design", level: 78, color: "#22D3EE" },
    { name: "Color Grading", level: 90, color: "#A855F7" },
    { name: "Brand Identity", level: 82, color: "#38BDF8" },
];

const tools = [
    "Adobe Premiere Pro",
    "After Effects",
    "Photoshop",
    "Illustrator",
    "Figma",
    "DaVinci Resolve",
    "Lightroom",
    "Canva Pro",
];

function SkillBar({ skill }: { skill: (typeof skills)[0] }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <div ref={ref} className="mb-6">
            <div className="flex justify-between items-center mb-2">
                <span className="text-white/80 font-medium text-sm">{skill.name}</span>
                <span className="text-white/40 text-xs font-mono">{skill.level}%</span>
            </div>
            <div
                className="h-1.5 rounded-full overflow-hidden"
                style={{ background: "rgba(255,255,255,0.06)" }}
            >
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: inView ? `${skill.level}%` : 0 }}
                    transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
                    className="h-full rounded-full"
                    style={{
                        background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)`,
                        boxShadow: `0 0 8px ${skill.color}66`,
                    }}
                />
            </div>
        </div>
    );
}

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-bg pt-24 pb-20">
            <div className="max-w-6xl mx-auto px-6">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <p className="text-accent text-sm font-medium uppercase tracking-widest mb-4">
                        About Me
                    </p>
                    <h1 className="text-5xl md:text-6xl font-black text-white">
                        The{" "}
                        <span className="gradient-text">Creator</span>{" "}
                        Behind the Work
                    </h1>
                </motion.div>

                {/* Bio section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                    {/* Portrait */}
                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.9, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative">
                            {/* Glow behind image */}
                            <div
                                className="absolute -inset-4 rounded-3xl opacity-30 blur-2xl"
                                style={{ background: "linear-gradient(135deg, #7C3AED, #00D9FF)" }}
                            />
                            <div
                                className="relative rounded-2xl overflow-hidden"
                                style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                            >
                                <Image
                                    src="/assets/thumbnails/my-pic.png"
                                    alt="Rishi Prasad"
                                    width={600}
                                    height={700}
                                    className="w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-bg/40 to-transparent" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Bio text */}
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.9, delay: 0.3 }}
                    >
                        <h2 className="text-4xl font-black text-white mb-6">
                            Hi, I&apos;m{" "}
                            <span className="gradient-text">Rishi Prasad</span>
                        </h2>
                        <div className="space-y-4 text-white/60 leading-relaxed">
                            <p>
                                I&apos;m a passionate Video Editor and Graphic Designer with over 1.5 years of professional experience crafting visual narratives that connect, engage, and inspire.
                            </p>
                            <p>
                                My work spans across cinematic real estate tours, high-energy social media reels, brand identities, and motion graphics — each project approached with the same obsessive attention to detail.
                            </p>
                            <p>
                                When I&apos;m not editing, you&apos;ll find me exploring new visual trends, experimenting with motion design, or storyboarding the next big creative idea.
                            </p>
                        </div>

                        <div className="mt-8 flex flex-wrap gap-3">
                            {["Creative", "Detail-Oriented", "Fast Turnaround", "Client-Focused"].map((tag) => (
                                <span
                                    key={tag}
                                    className="px-4 py-2 rounded-full text-sm font-medium text-accent"
                                    style={{
                                        background: "rgba(124,58,237,0.1)",
                                        border: "1px solid rgba(124,58,237,0.25)",
                                    }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="mt-10 flex gap-4">
                            <Link href="/contact">
                                <motion.button
                                    whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(124,58,237,0.4)" }}
                                    whileTap={{ scale: 0.97 }}
                                    className="px-6 py-3 rounded-full font-semibold text-white text-sm"
                                    style={{ background: "linear-gradient(135deg, #7C3AED, #5B21B6)" }}
                                >
                                    Get in Touch
                                </motion.button>
                            </Link>
                            <Link href="/video-editing">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="px-6 py-3 rounded-full font-semibold text-white/60 text-sm hover:text-white transition-colors"
                                    style={{
                                        background: "rgba(255,255,255,0.05)",
                                        border: "1px solid rgba(255,255,255,0.08)",
                                    }}
                                >
                                    View Work
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Skills section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h3 className="text-2xl font-bold text-white mb-8">
                            Core{" "}
                            <span className="gradient-text">Skills</span>
                        </h3>
                        {skills.map((skill) => (
                            <SkillBar key={skill.name} skill={skill} />
                        ))}
                    </motion.div>

                    {/* Tools */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                    >
                        <h3 className="text-2xl font-bold text-white mb-8">
                            Tools &{" "}
                            <span className="gradient-text">Software</span>
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            {tools.map((tool, i) => (
                                <motion.div
                                    key={tool}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    whileHover={{ scale: 1.03, borderColor: "rgba(124,58,237,0.5)" }}
                                    className="glass-card px-4 py-3 text-sm text-white/70 font-medium flex items-center gap-2"
                                >
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                    {tool}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
