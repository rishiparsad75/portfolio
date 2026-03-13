"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const socials = [
    {
        label: "Instagram",
        href: "https://instagram.com",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
        ),
        color: "#E1306C",
    },
    {
        label: "LinkedIn",
        href: "https://linkedin.com",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
        color: "#0A66C2",
    },
    {
        label: "YouTube",
        href: "https://youtube.com",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
        ),
        color: "#FF0000",
    },
];

export default function ContactPage() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");

        try {
            // Formspree endpoint — replace YOUR_FORM_ID with actual Formspree form ID
            const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                setStatus("sent");
                setForm({ name: "", email: "", message: "" });
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    return (
        <div className="min-h-screen bg-bg pt-24 pb-20 relative overflow-hidden">
            {/* Animated gradient background blobs */}
            <motion.div
                animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.15, 0.25, 0.15],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
                style={{ background: "radial-gradient(circle, #7C3AED, transparent)" }}
            />
            <motion.div
                animate={{
                    scale: [1.1, 1, 1.1],
                    opacity: [0.1, 0.2, 0.1],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none"
                style={{ background: "radial-gradient(circle, #00D9FF, transparent)" }}
            />

            <div className="max-w-5xl mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <p className="text-accent text-sm font-medium uppercase tracking-widest mb-4">
                        Get in Touch
                    </p>
                    <h1 className="text-5xl md:text-6xl font-black text-white">
                        Let&apos;s{" "}
                        <span className="gradient-text">Collaborate</span>
                    </h1>
                    <p className="mt-6 text-white/50 text-lg max-w-xl mx-auto">
                        Have a project in mind? I&apos;d love to hear about it. Send me a message and let&apos;s create something amazing together.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                    {/* Contact form */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:col-span-3"
                    >
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Name */}
                            <div>
                                <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="John Doe"
                                    className="w-full px-5 py-4 rounded-xl text-white placeholder-white/25 outline-none transition-all duration-200 focus:ring-1"
                                    style={{
                                        background: "rgba(255,255,255,0.04)",
                                        border: "1px solid rgba(255,255,255,0.08)",
                                    }}
                                    onFocus={(e) => { e.target.style.borderColor = "rgba(124,58,237,0.5)"; e.target.style.boxShadow = "0 0 0 1px rgba(124,58,237,0.3)"; }}
                                    onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; e.target.style.boxShadow = "none"; }}
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="john@example.com"
                                    className="w-full px-5 py-4 rounded-xl text-white placeholder-white/25 outline-none transition-all duration-200"
                                    style={{
                                        background: "rgba(255,255,255,0.04)",
                                        border: "1px solid rgba(255,255,255,0.08)",
                                    }}
                                    onFocus={(e) => { e.target.style.borderColor = "rgba(124,58,237,0.5)"; e.target.style.boxShadow = "0 0 0 1px rgba(124,58,237,0.3)"; }}
                                    onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; e.target.style.boxShadow = "none"; }}
                                />
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">
                                    Your Message
                                </label>
                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    required
                                    rows={6}
                                    placeholder="Tell me about your project..."
                                    className="w-full px-5 py-4 rounded-xl text-white placeholder-white/25 outline-none transition-all duration-200 resize-none"
                                    style={{
                                        background: "rgba(255,255,255,0.04)",
                                        border: "1px solid rgba(255,255,255,0.08)",
                                    }}
                                    onFocus={(e) => { e.target.style.borderColor = "rgba(124,58,237,0.5)"; e.target.style.boxShadow = "0 0 0 1px rgba(124,58,237,0.3)"; }}
                                    onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; e.target.style.boxShadow = "none"; }}
                                />
                            </div>

                            {/* Submit */}
                            <motion.button
                                type="submit"
                                disabled={status === "sending" || status === "sent"}
                                whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(124,58,237,0.5)" }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-4 rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2"
                                style={{
                                    background:
                                        status === "sent"
                                            ? "linear-gradient(135deg, #10B981, #059669)"
                                            : "linear-gradient(135deg, #7C3AED, #5B21B6)",
                                    opacity: status === "sending" ? 0.7 : 1,
                                }}
                            >
                                {status === "idle" && (
                                    <>
                                        Send Message
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </>
                                )}
                                {status === "sending" && "Sending..."}
                                {status === "sent" && "✓ Message Sent!"}
                                {status === "error" && "Error — Try Again"}
                            </motion.button>
                        </form>
                    </motion.div>

                    {/* Contact info sidebar */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="lg:col-span-2 space-y-8"
                    >
                        {/* Email */}
                        <div className="glass-card p-6">
                            <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Email</p>
                            <a
                                href="mailto:rishiparsad74@gmail.com"
                                className="text-white font-medium hover:text-accent transition-colors text-sm"
                            >
                                rishiparsad74@gmail.com
                            </a>
                        </div>

                        {/* Phone */}
                        <div className="glass-card p-6">
                            <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Phone</p>
                            <a
                                href="tel:+918949809567"
                                className="text-white font-medium hover:text-accent transition-colors text-sm"
                            >
                                +91 8949809567
                            </a>
                        </div>

                        {/* Response time */}
                        <div className="glass-card p-6">
                            <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Response Time</p>
                            <p className="text-white font-medium text-sm">Within 24 hours</p>
                            <p className="text-white/30 text-xs mt-1">Available for freelance &amp; collaborations</p>
                        </div>

                        {/* Social */}
                        <div className="glass-card p-6">
                            <p className="text-white/40 text-xs uppercase tracking-wider mb-4">Follow Me</p>
                            <div className="flex flex-col gap-3">
                                {socials.map((s) => (
                                    <motion.a
                                        key={s.label}
                                        href={s.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ x: 4 }}
                                        className="flex items-center gap-3 text-white/60 hover:text-white transition-colors text-sm"
                                    >
                                        <div
                                            className="w-9 h-9 rounded-lg flex items-center justify-center"
                                            style={{ background: `${s.color}22`, color: s.color }}
                                        >
                                            {s.icon}
                                        </div>
                                        <span>{s.label}</span>
                                        <svg className="w-3 h-3 ml-auto opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
