"use client";

import { useRef } from "react";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import FeaturedProjects from "@/components/FeaturedProjects";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HomePage() {
  const scrollyRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {/* ── Hero scrollytelling section ── */}
      <div ref={scrollyRef} className="relative">
        <ScrollyCanvas />
        <div className="absolute inset-0 pointer-events-none">
          <Overlay containerRef={scrollyRef} />
        </div>
      </div>

      {/* ── Transition divider ── */}
      <div className="relative h-32 bg-gradient-to-b from-transparent to-bg" />

      {/* ── Intro blurb ── */}
      <section className="py-20 px-6 bg-bg">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-accent text-sm font-medium uppercase tracking-widest mb-6">
              About the Creator
            </p>
            <p className="text-3xl md:text-4xl font-light text-white/80 leading-relaxed">
              I&apos;m{" "}
              <span className="gradient-text font-bold">Rishi Prasad</span>
              — a creative visual storyteller blending cinematic video editing with precision graphic design.
            </p>
            <p className="mt-8 text-white/40 text-lg max-w-2xl mx-auto leading-relaxed">
              With an eye for detail and a passion for motion, I craft experiences that resonate — from real estate tours to brand identities.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/video-editing">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(124,58,237,0.5)" }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 rounded-full font-semibold text-white transition-all duration-200"
                style={{ background: "linear-gradient(135deg, #7C3AED, #5B21B6)" }}
              >
                Explore Cinematic Edits
              </motion.button>
            </Link>
            <Link href="/graphic-design">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0,217,255,0.4)" }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 rounded-full font-semibold text-white transition-all duration-200"
                style={{
                  background: "transparent",
                  border: "1px solid rgba(0,217,255,0.5)",
                  color: "#00D9FF",
                }}
              >
                Discover Brand Identities
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Featured Projects ── */}
      <FeaturedProjects />

      {/* ── Stats Section ── */}
      <section className="py-24 px-6 bg-bg border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { num: "50+", label: "Projects Completed" },
              { num: "30+", label: "Happy Clients" },
              { num: "1.5+", label: "Years Experience" },
              { num: "∞", label: "Creative Ideas" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <p
                  className="text-4xl sm:text-5xl font-black mb-2"
                  style={{
                    background: "linear-gradient(135deg, #7C3AED, #00D9FF)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {stat.num}
                </p>
                <p className="text-white/40 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
