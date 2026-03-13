"use client";

import { useScroll, useTransform, motion, useSpring } from "framer-motion";

interface TextPhase {
    from: number;
    to: number;
    text: string;
    subtext?: string;
    align: "left" | "center" | "right";
}

const phases: TextPhase[] = [
    {
        from: 0,
        to: 0.28,
        text: "Rishi Prasad",
        subtext: "Creative Video Editor & Designer",
        align: "center",
    },
    {
        from: 0.32,
        to: 0.58,
        text: "I craft cinematic edits",
        subtext: "and visual stories.",
        align: "left",
    },
    {
        from: 0.62,
        to: 0.82,
        text: "Bridging creativity,",
        subtext: "motion, and design.",
        align: "right",
    },
    {
        from: 0.85,
        to: 0.92,
        text: "Scroll to explore",
        subtext: "my work ↓",
        align: "center",
    },
    {
        from: 0.94,
        to: 1.0,
        text: "Rishi Prasad",
        subtext: "Creative Video Editor & Designer",
        align: "center",
    },
];

function OverlayPhase({
    phase,
    scrollProgress,
}: {
    phase: TextPhase;
    scrollProgress: ReturnType<typeof useSpring>;
}) {
    const fadeIn = phase.from;
    const fadeOut = phase.to;

    const opacity = useTransform(
        scrollProgress,
        [fadeIn, fadeIn + 0.04, fadeOut - 0.04, fadeOut],
        [0, 1, 1, 0]
    );

    const y = useTransform(
        scrollProgress,
        [fadeIn, fadeIn + 0.05, fadeOut - 0.05, fadeOut],
        [30, 0, 0, -30]
    );

    const alignClass =
        phase.align === "center"
            ? "text-center items-center"
            : phase.align === "left"
                ? "text-left items-start pl-12 md:pl-24"
                : "text-right items-end pr-12 md:pr-24";

    return (
        <motion.div
            style={{ opacity, y }}
            className={`absolute inset-0 flex flex-col justify-center ${alignClass} pointer-events-none px-6`}
        >
            <div className="max-w-4xl w-full">
                <motion.h1
                    className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-tight sm:leading-none tracking-tight"
                    style={{ textShadow: "0 0 60px rgba(0,0,0,0.8)" }}
                >
                    <span className="gradient-text">{phase.text}</span>
                </motion.h1>
                {phase.subtext && (
                    <p
                        className="mt-4 text-lg md:text-2xl text-white/70 font-light"
                        style={{ textShadow: "0 2px 20px rgba(0,0,0,0.8)" }}
                    >
                        {phase.subtext}
                    </p>
                )}
            </div>
        </motion.div>
    );
}

export default function Overlay({
    containerRef,
}: {
    containerRef: React.RefObject<HTMLDivElement | null>;
}) {
    const { scrollYProgress } = useScroll({ target: containerRef });
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 40,
        damping: 20,
    });

    return (
        <div className="absolute inset-0 z-10" style={{ pointerEvents: "none" }}>
            {/* Dark gradient top and bottom bars */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-bg/80 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg/80 to-transparent" />

            {phases.map((phase, i) => (
                <OverlayPhase key={i} phase={phase} scrollProgress={smoothProgress} />
            ))}

            <ScrollIndicator smoothProgress={smoothProgress} />
        </div>
    );
}

function ScrollIndicator({
    smoothProgress,
}: {
    smoothProgress: ReturnType<typeof useSpring>;
}) {
    const opacity = useTransform(smoothProgress, [0, 0.05, 0.18], [1, 1, 0]);
    return (
        <motion.div
            style={{ opacity }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
            <span className="text-white/40 text-xs uppercase tracking-widest">Scroll</span>
            <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="w-0.5 h-8 bg-gradient-to-b from-accent to-transparent rounded-full"
            />
        </motion.div>
    );
}
