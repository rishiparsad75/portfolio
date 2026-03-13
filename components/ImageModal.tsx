"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface ImageModalProps {
    isOpen: boolean;
    onClose: () => void;
    imageSrc: string;
    title: string;
}

export default function ImageModal({
    isOpen,
    onClose,
    imageSrc,
    title,
}: ImageModalProps) {
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) {
            window.addEventListener("keydown", handler);
            document.body.style.overflow = "hidden";
        }
        return () => {
            window.removeEventListener("keydown", handler);
            document.body.style.overflow = "";
        };
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    ref={overlayRef}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={(e) => {
                        if (e.target === overlayRef.current) onClose();
                    }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12"
                    style={{ background: "rgba(0,0,0,0.95)", backdropFilter: "blur(16px)" }}
                >
                    <motion.div
                        initial={{ scale: 0.85, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.85, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 280, damping: 28 }}
                        className="relative max-w-5xl max-h-[85vh] w-full"
                    >
                        {/* Close */}
                        <button
                            onClick={onClose}
                            className="absolute -top-12 right-0 text-white/60 hover:text-white transition-colors flex items-center gap-2 text-sm z-10"
                        >
                            <span>Close</span>
                            <div className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                        </button>

                        {/* Title */}
                        <p className="absolute -top-8 left-0 text-white/50 text-sm">{title}</p>

                        {/* Image */}
                        <div
                            className="relative w-full h-full rounded-xl overflow-hidden"
                            style={{ maxHeight: "80vh", border: "1px solid rgba(255,255,255,0.1)" }}
                        >
                            <Image
                                src={imageSrc}
                                alt={title}
                                width={1200}
                                height={800}
                                className="w-full h-full object-contain"
                                style={{ maxHeight: "80vh" }}
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
