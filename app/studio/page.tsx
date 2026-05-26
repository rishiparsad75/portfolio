"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Helper TypeScript Interfaces
interface VideoProject {
  id: number;
  title: string;
  category: string;
  thumbnail: string;
  videoId: string;
  description: string;
  aspect: "portrait" | "landscape";
}

interface GraphicProject {
  id: number;
  title: string;
  category: string;
  image: string;
  aspect: "portrait" | "landscape" | "square";
}

export default function StudioPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  // Database lists
  const [videos, setVideos] = useState<VideoProject[]>([]);
  const [graphics, setGraphics] = useState<GraphicProject[]>([]);
  const [activeTab, setActiveTab] = useState<"videos" | "graphics">("videos");
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Modal forms
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<VideoProject | null>(null);
  const [editingGraphic, setEditingGraphic] = useState<GraphicProject | null>(null);

  // Form states
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState("");
  const [formThumbnail, setFormThumbnail] = useState("");
  const [formVideoId, setFormVideoId] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formAspect, setFormAspect] = useState<"portrait" | "landscape" | "square">("portrait");

  // Load dynamic data on mount
    useEffect(() => {
      // Check local storage for authenticated password
      const savedPassword = localStorage.getItem("studio_auth");
      if (savedPassword) {
        verifyPasswordSilently(savedPassword);
      } else {
        setIsCheckingSession(false);
      }
      fetchCatalog();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  const fetchCatalog = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        setVideos(data.videos || []);
        setGraphics(data.graphics || []);
      }
    } catch {
      console.error("Failed to load project database");
    } finally {
      setLoading(false);
    }
  };

  const verifyPasswordSilently = async (pwd: string) => {
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pwd, data: { videos, graphics } })
      });
      // A status of 400 is fine (just validating password, not actual data update)
      // 401 is unauthorized
      if (res.status !== 401) {
        setIsAuthenticated(true);
        setPassword(pwd);
      } else {
        localStorage.removeItem("studio_auth");
      }
    } catch {
      // Offline fallback approval for local UI convenience
      setIsAuthenticated(true);
      setPassword(pwd);
    } finally {
      setIsCheckingSession(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, data: { videos, graphics } })
      });

      if (res.status === 401) {
        setLoginError("Incorrect admin password. Please try again.");
      } else {
        setIsAuthenticated(true);
        localStorage.setItem("studio_auth", password);
      }
    } catch {
      setLoginError("Failed to communicate with authentication endpoint.");
    }
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setPassword("");
    localStorage.removeItem("studio_auth");
  };

  // Push changes to JSON file
  const saveDatabase = async (updatedVideos: VideoProject[], updatedGraphics: GraphicProject[]) => {
    try {
      setSaveStatus(null);
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password,
          data: { videos: updatedVideos, graphics: updatedGraphics }
        })
      });

      if (res.ok) {
        setSaveStatus({ type: "success", message: "Database saved successfully!" });
        setVideos(updatedVideos);
        setGraphics(updatedGraphics);
        setTimeout(() => setSaveStatus(null), 3000);
      } else {
        const errorData = await res.json();
        setSaveStatus({ type: "error", message: errorData.error || "Failed to save to database." });
      }
    } catch {
      setSaveStatus({ type: "error", message: "Network error. Failed to save changes." });
    }
  };

  // CRUD Video Actions
  const openAddVideoModal = () => {
    setEditingVideo(null);
    setFormTitle("");
    setFormCategory("Real Estate");
    setFormThumbnail("");
    setFormVideoId("");
    setFormDescription("");
    setFormAspect("portrait");
    setIsModalOpen(true);
  };

  const openEditVideoModal = (video: VideoProject) => {
    setEditingVideo(video);
    setFormTitle(video.title);
    setFormCategory(video.category);
    setFormThumbnail(video.thumbnail);
    setFormVideoId(video.videoId);
    setFormDescription(video.description);
    setFormAspect(video.aspect);
    setIsModalOpen(true);
  };

  const openAddGraphicModal = () => {
    setEditingGraphic(null);
    setFormTitle("");
    setFormCategory("Social Media");
    setFormThumbnail("");
    setFormAspect("portrait");
    setIsModalOpen(true);
  };

  const openEditGraphicModal = (graphic: GraphicProject) => {
    setEditingGraphic(graphic);
    setFormTitle(graphic.title);
    setFormCategory(graphic.category);
    setFormThumbnail(graphic.image);
    setFormAspect(graphic.aspect);
    setIsModalOpen(true);
  };

  const handleDeleteVideo = (id: number) => {
    if (confirm("Are you sure you want to delete this video project?")) {
      const updated = videos.filter((v) => v.id !== id);
      saveDatabase(updated, graphics);
    }
  };

  const handleDeleteGraphic = (id: number) => {
    if (confirm("Are you sure you want to delete this graphic design project?")) {
      const updated = graphics.filter((g) => g.id !== id);
      saveDatabase(videos, updated);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formTitle || !formCategory || !formThumbnail) {
      alert("Please fill out all required fields.");
      return;
    }

    if (activeTab === "videos") {
      if (editingVideo) {
        // Edit mode
        const updated = videos.map((v) =>
          v.id === editingVideo.id
            ? {
                ...v,
                title: formTitle,
                category: formCategory,
                thumbnail: formThumbnail,
                videoId: formVideoId,
                description: formDescription,
                aspect: formAspect as "portrait" | "landscape"
              }
            : v
        );
        saveDatabase(updated, graphics);
      } else {
        // Add mode
        const newId = videos.length > 0 ? Math.max(...videos.map((v) => v.id)) + 1 : 1;
        const newVideo: VideoProject = {
          id: newId,
          title: formTitle,
          category: formCategory,
          thumbnail: formThumbnail,
          videoId: formVideoId,
          description: formDescription,
          aspect: formAspect as "portrait" | "landscape"
        };
        saveDatabase([...videos, newVideo], graphics);
      }
    } else {
      if (editingGraphic) {
        // Edit mode
        const updated = graphics.map((g) =>
          g.id === editingGraphic.id
            ? {
                ...g,
                title: formTitle,
                category: formCategory,
                image: formThumbnail,
                aspect: formAspect as "portrait" | "landscape" | "square"
              }
            : g
        );
        saveDatabase(videos, updated);
      } else {
        // Add mode
        const newId = graphics.length > 0 ? Math.max(...graphics.map((g) => g.id)) + 1 : 1;
        const newGraphic: GraphicProject = {
          id: newId,
          title: formTitle,
          category: formCategory,
          image: formThumbnail,
          aspect: formAspect as "portrait" | "landscape" | "square"
        };
        saveDatabase(videos, [...graphics, newGraphic]);
      }
    }

    setIsModalOpen(false);
  };

  if (isCheckingSession) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <motion.div
          animate={{ scale: [0.9, 1.1, 0.9] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-12 h-12 border-2 border-accent rounded-full border-t-transparent"
        />
      </div>
    );
  }

  // ─── LOGIN SCREEN ───
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center px-6 relative overflow-hidden">
        {/* Glowing backgrounds */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-secondary/10 blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full glass-card p-10 relative z-10"
        >
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-secondary flex items-center justify-center mb-4 glow-accent">
              <span className="text-white font-black text-xl">RP</span>
            </div>
            <h1 className="text-3xl font-black text-white">Rishi Studio</h1>
            <p className="text-white/40 text-sm mt-2 text-center">
              Please enter your admin credentials to access database modification layers.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-widest font-semibold text-white/50 mb-2">
                Admin Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-white/5 rounded-xl border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-accent transition-colors"
              />
            </div>

            {loginError && <p className="text-red-500 text-xs font-semibold">{loginError}</p>}

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(124, 58, 237, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-4 rounded-xl text-white font-semibold tracking-wide transition-all duration-200"
              style={{ background: "linear-gradient(135deg, #7C3AED, #5B21B6)" }}
            >
              Access Dashboard
            </motion.button>
          </form>
        </motion.div>
      </div>
    );
  }

  // ─── DASHBOARD SCREEN ───
  return (
    <div className="min-h-screen bg-bg text-white pt-28 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Dynamic Alert Banner */}
        <AnimatePresence>
          {saveStatus && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-6 right-6 z-50 px-6 py-4 rounded-xl shadow-lg border text-sm font-semibold flex items-center gap-3"
              style={{
                background: saveStatus.type === "success" ? "rgba(16,185,129,0.15)" : "rgba(239,68,68,0.15)",
                borderColor: saveStatus.type === "success" ? "#10B981" : "#EF4444",
                color: saveStatus.type === "success" ? "#10B981" : "#EF4444",
                backdropFilter: "blur(12px)"
              }}
            >
              <div className={`w-2 h-2 rounded-full ${saveStatus.type === "success" ? "bg-emerald-400" : "bg-red-400"}`} />
              {saveStatus.message}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12 border-b border-white/5 pb-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-accent/20 border border-accent/40 text-[10px] uppercase font-bold tracking-widest text-accent">
                Admin Console
              </span>
              <div className="flex items-center gap-1.5 text-xs text-white/40">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Filesystem Database
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mt-2">
              Portfolio <span className="gradient-text">Studio</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSignOut}
              className="px-5 py-2.5 rounded-full text-xs font-semibold text-white/50 border border-white/10 hover:border-white/20 hover:text-white/80 transition-all"
            >
              Sign Out
            </motion.button>
          </div>
        </div>

        {/* Statistics Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="glass-card p-6 flex flex-col justify-between">
            <p className="text-xs uppercase tracking-widest text-white/40 font-semibold mb-2">Video Editing Catalog</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-accent">{videos.length}</span>
              <span className="text-xs text-white/30">items published</span>
            </div>
          </div>
          <div className="glass-card p-6 flex flex-col justify-between">
            <p className="text-xs uppercase tracking-widest text-white/40 font-semibold mb-2">Graphic Design Catalog</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-secondary">{graphics.length}</span>
              <span className="text-xs text-white/30">items published</span>
            </div>
          </div>
          <div className="glass-card p-6 flex flex-col justify-between border-accent/20">
            <p className="text-xs uppercase tracking-widest text-white/40 font-semibold mb-2">Persistence Status</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-sm font-semibold">Active (`projects.json`)</span>
            </div>
          </div>
        </div>

        {/* Control Toolbar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
          {/* Navigation Tabs */}
          <div
            className="flex items-center gap-1 p-1 rounded-full"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)"
            }}
          >
            <button
              onClick={() => setActiveTab("videos")}
              className={`relative px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors ${
                activeTab === "videos" ? "text-white" : "text-white/45 hover:text-white/70"
              }`}
            >
              {activeTab === "videos" && (
                <motion.div
                  layoutId="activeStudioTab"
                  className="absolute inset-0 rounded-full"
                  style={{ background: "rgba(124, 58, 237, 0.25)", border: "1px solid rgba(124, 58, 237, 0.4)" }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}
              <span className="relative z-10">Video Projects</span>
            </button>
            <button
              onClick={() => setActiveTab("graphics")}
              className={`relative px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors ${
                activeTab === "graphics" ? "text-white" : "text-white/45 hover:text-white/70"
              }`}
            >
              {activeTab === "graphics" && (
                <motion.div
                  layoutId="activeStudioTab"
                  className="absolute inset-0 rounded-full"
                  style={{ background: "rgba(0, 217, 255, 0.2)", border: "1px solid rgba(0, 217, 255, 0.3)" }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}
              <span className="relative z-10">Graphic Designs</span>
            </button>
          </div>

          {/* Add Item Trigger */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={activeTab === "videos" ? openAddVideoModal : openAddGraphicModal}
            className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all"
            style={{
              background: activeTab === "videos" ? "linear-gradient(135deg, #7C3AED, #5B21B6)" : "linear-gradient(135deg, #00D9FF, #00B4D8)"
            }}
          >
            Add New {activeTab === "videos" ? "Video" : "Graphic"}
          </motion.button>
        </div>

        {/* Content Table / Card Display */}
        {loading ? (
          <div className="py-20 flex items-center justify-center">
            <span className="text-white/40 text-sm font-semibold">Synchronizing catalog...</span>
          </div>
        ) : activeTab === "videos" ? (
          <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 bg-white/[0.01] text-xs uppercase tracking-widest font-bold text-white/40">
                    <th className="px-6 py-4">Thumbnail</th>
                    <th className="px-6 py-4">Title</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">YouTube ID</th>
                    <th className="px-6 py-4">Format</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {videos.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-12 text-white/35">
                        No video projects available. Click &quot;Add New Video&quot; above to begin.
                      </td>
                    </tr>
                  ) : (
                    videos.map((v) => (
                      <tr key={v.id} className="hover:bg-white/[0.01] transition-colors">
                        <td className="px-6 py-4">
                          <div className="relative w-16 aspect-video rounded-md overflow-hidden bg-white/5">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={v.thumbnail} alt="" className="object-cover w-full h-full" />
                          </div>
                        </td>
                        <td className="px-6 py-4 font-semibold text-white/95">{v.title}</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-0.5 rounded bg-accent/15 border border-accent/25 text-[10px] font-semibold text-accent">
                            {v.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-mono text-xs text-white/60">{v.videoId}</td>
                        <td className="px-6 py-4 uppercase text-[10px] font-bold tracking-wider text-white/55">
                          {v.aspect}
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <button
                            onClick={() => openEditVideoModal(v)}
                            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteVideo(v.id)}
                            className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold transition-colors"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 bg-white/[0.01] text-xs uppercase tracking-widest font-bold text-white/40">
                    <th className="px-6 py-4">Image Preview</th>
                    <th className="px-6 py-4">Title</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Aspect Ratio</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {graphics.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-12 text-white/35">
                        No graphic designs available. Click &quot;Add New Graphic&quot; above to begin.
                      </td>
                    </tr>
                  ) : (
                    graphics.map((g) => (
                      <tr key={g.id} className="hover:bg-white/[0.01] transition-colors">
                        <td className="px-6 py-4">
                          <div className="relative w-12 h-12 rounded-md overflow-hidden bg-white/5">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={g.image} alt="" className="object-cover w-full h-full" />
                          </div>
                        </td>
                        <td className="px-6 py-4 font-semibold text-white/95">{g.title}</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-0.5 rounded bg-secondary/15 border border-secondary/25 text-[10px] font-semibold text-secondary">
                            {g.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 uppercase text-[10px] font-bold tracking-wider text-white/55">
                          {g.aspect}
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <button
                            onClick={() => openEditGraphicModal(g)}
                            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteGraphic(g.id)}
                            className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold transition-colors"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ─── DIALOG MODAL (ADD / EDIT) ─── */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsModalOpen(false)}
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              />

              {/* Form Window */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="max-w-lg w-full glass-card p-8 relative z-10 max-h-[85vh] overflow-y-auto"
                style={{
                  border: activeTab === "videos" ? "1px solid rgba(124,58,237,0.3)" : "1px solid rgba(0,217,255,0.3)"
                }}
              >
                <h3 className="text-2xl font-bold mb-6">
                  {activeTab === "videos"
                    ? editingVideo
                      ? `Edit Video: ${editingVideo.title}`
                      : "Add New Video Project"
                    : editingGraphic
                    ? `Edit Graphic: ${editingGraphic.title}`
                    : "Add New Graphic Design"}
                </h3>

                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">
                      Project Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      placeholder="e.g. Cinematic Real Estate Showcase"
                      className="w-full px-4 py-3 bg-white/5 rounded-xl border border-white/10 text-white focus:outline-none focus:border-accent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">
                        Category *
                      </label>
                      {activeTab === "videos" ? (
                        <select
                          value={formCategory}
                          onChange={(e) => setFormCategory(e.target.value)}
                          className="w-full px-4 py-3 bg-white/5 rounded-xl border border-white/10 text-white focus:outline-none focus:border-accent"
                        >
                          <option value="Real Estate" className="bg-bg text-white">Real Estate</option>
                          <option value="Motion Graphics" className="bg-bg text-white">Motion Graphics</option>
                          <option value="Talking Head" className="bg-bg text-white">Talking Head</option>
                          <option value="Random Stuff" className="bg-bg text-white">Random Stuff</option>
                        </select>
                      ) : (
                        <select
                          value={formCategory}
                          onChange={(e) => setFormCategory(e.target.value)}
                          className="w-full px-4 py-3 bg-white/5 rounded-xl border border-white/10 text-white focus:outline-none focus:border-accent"
                        >
                          <option value="Social Media" className="bg-bg text-white">Social Media</option>
                          <option value="Branding" className="bg-bg text-white">Branding</option>
                        </select>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">
                        Aspect Ratio *
                      </label>
                      {activeTab === "videos" ? (
                        <select
                          value={formAspect}
                          onChange={(e) => setFormAspect(e.target.value as "portrait" | "landscape")}
                          className="w-full px-4 py-3 bg-white/5 rounded-xl border border-white/10 text-white focus:outline-none focus:border-accent"
                        >
                          <option value="portrait" className="bg-bg text-white">Portrait (Vertical)</option>
                          <option value="landscape" className="bg-bg text-white">Landscape (Horizontal)</option>
                        </select>
                      ) : (
                        <select
                          value={formAspect}
                          onChange={(e) => setFormAspect(e.target.value as "portrait" | "landscape" | "square")}
                          className="w-full px-4 py-3 bg-white/5 rounded-xl border border-white/10 text-white focus:outline-none focus:border-accent"
                        >
                          <option value="portrait" className="bg-bg text-white">Portrait</option>
                          <option value="landscape" className="bg-bg text-white">Landscape</option>
                          <option value="square" className="bg-bg text-white">Square</option>
                        </select>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">
                      {activeTab === "videos" ? "Thumbnail URL / Path *" : "Image Asset URL / Path *"}
                    </label>
                    <input
                      type="text"
                      required
                      value={formThumbnail}
                      onChange={(e) => setFormThumbnail(e.target.value)}
                      placeholder="e.g. /assets/thumbnails/villa.png"
                      className="w-full px-4 py-3 bg-white/5 rounded-xl border border-white/10 text-white focus:outline-none focus:border-accent"
                    />
                  </div>

                  {activeTab === "videos" && (
                    <>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">
                          YouTube Video ID *
                        </label>
                        <input
                          type="text"
                          required
                          value={formVideoId}
                          onChange={(e) => setFormVideoId(e.target.value)}
                          placeholder="e.g. Y6kSsG--PWY"
                          className="w-full px-4 py-3 bg-white/5 rounded-xl border border-white/10 text-white focus:outline-none focus:border-accent font-mono"
                        />
                        {formVideoId && (
                          <p className="text-[10px] text-white/30 mt-1">
                            Live Preview: https://www.youtube.com/watch?v={formVideoId}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">
                          Description
                        </label>
                        <textarea
                          rows={3}
                          value={formDescription}
                          onChange={(e) => setFormDescription(e.target.value)}
                          placeholder="Provide a brief context of edits..."
                          className="w-full px-4 py-3 bg-white/5 rounded-xl border border-white/10 text-white focus:outline-none focus:border-accent resize-none text-xs"
                        />
                      </div>
                    </>
                  )}

                  <div className="flex gap-4 pt-4 border-t border-white/5">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 py-3.5 rounded-xl text-xs font-semibold border border-white/10 hover:bg-white/5 text-white/70 hover:text-white transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white transition-all duration-200"
                      style={{
                        background: activeTab === "videos" ? "linear-gradient(135deg, #7C3AED, #5B21B6)" : "linear-gradient(135deg, #00D9FF, #00B4D8)"
                      }}
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
