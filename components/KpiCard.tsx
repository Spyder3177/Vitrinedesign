"use client";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const colorMap: Record<string, { border: string; glow: string; accent: string }> = {
  green:  { border: "rgba(16,185,129,0.15)",  glow: "rgba(16,185,129,0.06)",  accent: "#10b981" },
  blue:   { border: "rgba(59,130,246,0.15)",   glow: "rgba(59,130,246,0.06)",   accent: "#3b82f6" },
  purple: { border: "rgba(139,92,246,0.15)",   glow: "rgba(139,92,246,0.06)",   accent: "#8b5cf6" },
  amber:  { border: "rgba(245,158,11,0.15)",   glow: "rgba(245,158,11,0.06)",   accent: "#f59e0b" },
};

interface Card {
  id: string; label: string; value: number; change: number;
  trend: string; prefix: string; color: string; description: string;
}

export default function KpiCard({ card, delay = 0 }: { card: Card; delay?: number }) {
  const c  = colorMap[card.color] ?? colorMap.green;
  const up = card.trend === "up";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0,  scale: 1 }}
      transition={{ duration: 0.45, delay, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="rounded-2xl p-5"
      style={{
        background: "var(--bg-card)",
        border: `1px solid ${c.border}`,
        boxShadow: `0 0 30px ${c.glow}`,
        cursor: "default",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-medium" style={{ color: "var(--text-3)", letterSpacing: "0.05em" }}>
          {card.label.toUpperCase()}
        </span>
        <motion.span
          whileHover={{ scale: 1.1 }}
          className={`badge ${up ? "badge-up" : "badge-down"}`}
        >
          {up ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
          {Math.abs(card.change)}%
        </motion.span>
      </div>

      <div className="text-2xl font-bold num mb-1" style={{ color: "var(--text-1)" }}>
        {card.prefix}{card.value.toLocaleString("fr-FR", { minimumFractionDigits: 2 })}
      </div>

      <div className="text-xs mb-4" style={{ color: "var(--text-4)" }}>{card.description}</div>

      <div className="progress-track">
        <motion.div
          className="progress-fill"
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, Math.abs(card.change) * 8 + 40)}%` }}
          transition={{ duration: 1.2, delay: delay + 0.3, ease: [0.4, 0, 0.2, 1] }}
          style={{ background: `linear-gradient(90deg, ${c.accent}60, ${c.accent})` }}
        />
      </div>
    </motion.div>
  );
}
