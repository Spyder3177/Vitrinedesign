"use client";
import { Search, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

export default function Topbar({ title, subtitle }: { title: string; subtitle?: string }) {
  const now = new Date().toLocaleDateString("fr-FR", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-between px-4 lg:px-6 py-3 lg:py-4 shrink-0"
      style={{
        borderBottom: "1px solid var(--border)",
        background: "rgba(8,14,28,0.5)",
        backdropFilter: "blur(20px)",
      }}
    >
      <div className="min-w-0 flex-1 mr-3">
        <h1 className="text-lg lg:text-xl font-bold truncate" style={{ color: "var(--text-1)" }}>{title}</h1>
        {subtitle && <p className="text-xs mt-0.5 truncate" style={{ color: "var(--text-3)" }}>{subtitle}</p>}
      </div>

      <div className="flex items-center gap-2">
        {/* Date — visible only on lg+ */}
        <div className="hidden lg:block text-xs capitalize" style={{ color: "var(--text-4)" }}>
          {now}
        </div>

        {/* Search — visible only on md+ */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm" style={{
          background: "var(--input-bg)", border: "1px solid var(--border)", color: "var(--text-3)",
        }}>
          <Search size={13} />
          <span className="text-xs">Rechercher…</span>
          <span className="ml-1 text-xs px-1.5 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.06)", color: "var(--text-4)" }}>⌘K</span>
        </div>

        {/* Refresh */}
        <motion.button
          whileTap={{ scale: 0.9, rotate: 180 }}
          transition={{ duration: 0.4 }}
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: "var(--input-bg)", border: "1px solid var(--border)", color: "var(--text-3)" }}
        >
          <RefreshCw size={13} />
        </motion.button>
      </div>
    </motion.header>
  );
}
