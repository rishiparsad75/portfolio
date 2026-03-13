import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rishi Prasad | Video Editor & Graphic Designer",
  description:
    "Portfolio of Rishi Prasad — Cinematic Video Editing, Motion Graphics, and Graphic Design. Creating visual stories that captivate.",
  keywords: [
    "video editor",
    "graphic designer",
    "motion graphics",
    "portfolio",
    "Rishi Prasad",
  ],
  authors: [{ name: "Rishi Prasad" }],
  openGraph: {
    title: "Rishi Prasad | Video Editor & Graphic Designer",
    description:
      "Portfolio of Rishi Prasad — Cinematic Video Editing, Motion Graphics, and Graphic Design.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-bg text-white font-sans antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
