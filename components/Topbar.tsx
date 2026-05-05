"use client";
import { Search, Bell, RefreshCw } from "lucide-react";

export default function Topbar({ title, subtitle }: { title: string; subtitle?: string }) {
  const now = new Date().toLocaleDateString("fr-FR", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  return (
    <header className="flex items-center justify-between px-6 py-4 shrink-0" style={{
      borderBottom: "1px solid rgba(255,255,255,0.05)",
      background: "rgba(8,14,28,0.8)",
      backdropFilter: "blur(20px)",
    }}>
      <div>
        <h1 className="text-xl font-bold text-white">{title}</h1>
        {subtitle && <p className="text-xs mt-0.5" style={{ color: "#475569" }}>{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        {/* Date */}
        <div className="hidden md:block text-xs capitalize" style={{ color: "#475569" }}>
          {now}
        </div>

        {/* Search */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm" style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.06)",
          color: "#475569",
        }}>
          <Search size={14} />
          <span>Rechercher…</span>
          <span className="ml-2 text-xs px-1.5 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.06)", color: "#334155" }}>⌘K</span>
        </div>

        {/* Refresh */}
        <button className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-all hover:bg-white/10" style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.06)",
          color: "#475569",
        }}>
          <RefreshCw size={14} />
        </button>

        {/* Bell */}
        <div className="relative">
          <button className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-all hover:bg-white/10" style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.06)",
            color: "#475569",
          }}>
            <Bell size={14} />
          </button>
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-white flex items-center justify-center font-bold" style={{ background: "#10b981", fontSize: "9px" }}>3</span>
        </div>
      </div>
    </header>
  );
}
