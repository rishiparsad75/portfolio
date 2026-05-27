"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Video Editing", href: "/video-editing" },
    { label: "Graphic Design", href: "/graphic-design" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
];

export default function Navbar() {
    const pathname = usePathname() || "";

    if (pathname.startsWith("/studio")) return null;

    return (
        <motion.nav
            className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="group">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center gap-2"
                    >
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-secondary flex items-center justify-center">
                            <span className="text-white font-black text-sm">RP</span>
                        </div>
                        <span className="text-white font-semibold text-sm tracking-wide">
                            Rishi Prasad
                        </span>
                    </motion.div>
                </Link>

                {/* Nav links */}
                <div
                    className="hidden md:flex items-center gap-1 px-4 py-2 rounded-full"
                    style={{
                        background: "rgba(255,255,255,0.05)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid rgba(255,255,255,0.08)",
                    }}
                >
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link key={link.href} href={link.href}>
                                <motion.span
                                    whileHover={{ scale: 1.05 }}
                                    className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${isActive
                                            ? "text-white"
                                            : "text-white/50 hover:text-white/80"
                                        }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeNav"
                                            className="absolute inset-0 rounded-full bg-accent/30"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className="relative z-10">{link.label}</span>
                                </motion.span>
                            </Link>
                        );
                    })}
                </div>

                {/* Mobile menu button */}
                <Link
                    href="/contact"
                    className="md:hidden text-sm text-white/70 hover:text-white transition-colors"
                >
                    Contact
                </Link>
            </div>
        </motion.nav>
    );
}
