"use client";

import { useEffect, useRef, useCallback } from "react";
import { useScroll, useSpring } from "framer-motion";

const FRAME_COUNT = 75;
const FRAME_BASE = "/sequence/frame_";

function getFrameSrc(index: number): string {
    return `${FRAME_BASE}${String(index).padStart(2, "0")}.webp`;
}

export default function ScrollyCanvas() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const images = useRef<HTMLImageElement[]>([]);
    const currentFrame = useRef(0);
    const isLoaded = useRef(false);
    const mouseX = useRef(0);
    const mouseY = useRef(0);
    const rafId = useRef<number | null>(null);

    const { scrollYProgress } = useScroll({ target: containerRef });

    // Buttery smooth spring — stiffness/damping tuned per user spec
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    // ─── Preload all images with Image.decode() ─────────────────────────────────
    useEffect(() => {
        const preloadImages = async () => {
            // Pre-initialize array to avoid out-of-bounds indexing errors
            for (let i = 0; i < FRAME_COUNT; i++) {
                images.current[i] = new Image(); 
            }

            // Immediately load and decode ONLY the first frame
            const firstImg = images.current[0];
            firstImg.src = getFrameSrc(0);
            
            try {
                await firstImg.decode();
                isLoaded.current = true;
                renderFrame(0);
            } catch (err) {
                console.error("Failed to load first frame", err);
            }

            // Load the remaining 74 frames silently in the background
            for (let i = 1; i < FRAME_COUNT; i++) {
                const img = new Image();
                img.src = getFrameSrc(i);
                img.decode().then(() => {
                    images.current[i] = img;
                }).catch(() => {
                    // Ignore background load errors
                });
            }
        };

        preloadImages();

        return () => {
            if (rafId.current) cancelAnimationFrame(rafId.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ─── Canvas resize with devicePixelRatio ───────────────────────────────────
    const resizeCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const ratio = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * ratio;
        canvas.height = window.innerHeight * ratio;
        ctx.scale(ratio, ratio);

        // Re-render current frame after resize
        if (isLoaded.current) {
            renderFrame(currentFrame.current);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);
        return () => window.removeEventListener("resize", resizeCanvas);
    }, [resizeCanvas]);

    // ─── Mouse move → parallax lighting ───────────────────────────────────────
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.current = (e.clientX / window.innerWidth - 0.5) * 2;
            mouseY.current = (e.clientY / window.innerHeight - 0.5) * 2;
        };
        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // ─── Object-fit cover draw with parallax ──────────────────────────────────
    const renderFrame = useCallback((frameIdx: number) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;

        const img = images.current[frameIdx];
        if (!img || !img.complete) return;

        const ratio = window.devicePixelRatio || 1;
        const cw = canvas.width / ratio;
        const ch = canvas.height / ratio;

        ctx.clearRect(0, 0, cw, ch);

        // Object-fit: cover logic
        const imgAspect = img.naturalWidth / img.naturalHeight;
        const canvasAspect = cw / ch;

        let drawW: number, drawH: number, drawX: number, drawY: number;

        if (imgAspect > canvasAspect) {
            drawH = ch;
            drawW = ch * imgAspect;
            drawX = (cw - drawW) / 2;
            drawY = 0;
        } else {
            drawW = cw;
            drawH = cw / imgAspect;
            drawX = 0;
            drawY = (ch - drawH) / 2;
        }

        // Subtle parallax offset from mouse
        const parallaxStrength = 8;
        const offsetX = mouseX.current * parallaxStrength;
        const offsetY = mouseY.current * parallaxStrength;

        ctx.drawImage(img, drawX + offsetX, drawY + offsetY, drawW, drawH);

        // Subtle vignette overlay
        const gradient = ctx.createRadialGradient(
            cw / 2,
            ch / 2,
            ch * 0.3,
            cw / 2,
            ch / 2,
            ch * 0.9
        );
        gradient.addColorStop(0, "rgba(18, 18, 18, 0)");
        gradient.addColorStop(1, "rgba(18, 18, 18, 0.6)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, cw, ch);

        // Mouse-reactive color wash (parallax lighting)
        const lightX = (mouseX.current * 0.5 + 0.5) * cw;
        const lightY = (mouseY.current * 0.5 + 0.5) * ch;
        const lightGrad = ctx.createRadialGradient(lightX, lightY, 0, lightX, lightY, ch * 0.7);
        lightGrad.addColorStop(0, "rgba(124, 58, 237, 0.12)");
        lightGrad.addColorStop(0.5, "rgba(0, 217, 255, 0.04)");
        lightGrad.addColorStop(1, "rgba(18, 18, 18, 0)");
        ctx.fillStyle = lightGrad;
        ctx.fillRect(0, 0, cw, ch);

        // ── Bottom fade: hides watermark in lower-right corner ──
        const bottomFade = ctx.createLinearGradient(0, ch * 0.82, 0, ch);
        bottomFade.addColorStop(0, "rgba(18, 18, 18, 0)");
        bottomFade.addColorStop(1, "rgba(18, 18, 18, 1)");
        ctx.fillStyle = bottomFade;
        ctx.fillRect(0, ch * 0.82, cw, ch * 0.18);
    }, []);

    // ─── Scroll → frame mapping ────────────────────────────────────────────────
    useEffect(() => {
        const unsubscribe = smoothProgress.on("change", (v) => {
            if (!isLoaded.current) return;
            const idx = Math.min(
                Math.floor(v * (FRAME_COUNT - 1)),
                FRAME_COUNT - 1
            );
            if (idx !== currentFrame.current) {
                currentFrame.current = idx;
                if (rafId.current) cancelAnimationFrame(rafId.current);
                rafId.current = requestAnimationFrame(() => renderFrame(idx));
            }
        });
        return () => unsubscribe();
    }, [smoothProgress, renderFrame]);

    // ─── Continuous mouse parallax render loop ─────────────────────────────────
    useEffect(() => {
        let lastX = 0;
        let lastY = 0;

        const loop = () => {
            const moved =
                Math.abs(mouseX.current - lastX) > 0.001 ||
                Math.abs(mouseY.current - lastY) > 0.001;

            if (moved && isLoaded.current) {
                renderFrame(currentFrame.current);
                lastX = mouseX.current;
                lastY = mouseY.current;
            }
            requestAnimationFrame(loop);
        };
        const id = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(id);
    }, [renderFrame]);

    return (
        <div ref={containerRef} className="relative" style={{ height: "500vh" }}>
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full"
                    style={{ display: "block" }}
                />
            </div>
        </div>
    );
}
