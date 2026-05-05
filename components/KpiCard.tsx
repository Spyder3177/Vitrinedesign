"use client";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const colorMap: Record<string, { border: string; glow: string; icon: string; badge: string }> = {
  green:  { border: "rgba(16,185,129,0.15)",  glow: "rgba(16,185,129,0.06)",  icon: "#10b981", badge: "#10b981" },
  blue:   { border: "rgba(59,130,246,0.15)",   glow: "rgba(59,130,246,0.06)",   icon: "#3b82f6", badge: "#3b82f6" },
  purple: { border: "rgba(139,92,246,0.15)",   glow: "rgba(139,92,246,0.06)",   icon: "#8b5cf6", badge: "#8b5cf6" },
  amber:  { border: "rgba(245,158,11,0.15)",   glow: "rgba(245,158,11,0.06)",   icon: "#f59e0b", badge: "#f59e0b" },
};

interface Card {
  id: string; label: string; value: number; change: number;
  trend: string; prefix: string; color: string; description: string;
}

export default function KpiCard({ card }: { card: Card }) {
  const c = colorMap[card.color] ?? colorMap.green;
  const up = card.trend === "up";

  return (
    <div className="rounded-2xl p-5 card-hover" style={{
      background: "linear-gradient(135deg, #0d1526 0%, #0a1221 100%)",
      border: `1px solid ${c.border}`,
      boxShadow: `0 0 30px ${c.glow}`,
    }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-medium" style={{ color: "#475569" }}>{card.label.toUpperCase()}</span>
        <span className={`badge ${up ? "badge-up" : "badge-down"}`}>
          {up ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
          {Math.abs(card.change)}%
        </span>
      </div>

      {/* Value */}
      <div className="text-2xl font-bold text-white num mb-1">
        {card.prefix}{card.value.toLocaleString("fr-FR", { minimumFractionDigits: 2 })}
      </div>

      {/* Description */}
      <div className="text-xs" style={{ color: "#334155" }}>{card.description}</div>

      {/* Sparkline bar */}
      <div className="mt-4 progress-track">
        <div
          className="progress-fill"
          style={{
            width: `${Math.min(100, Math.abs(card.change) * 8 + 40)}%`,
            background: `linear-gradient(90deg, ${c.icon}66, ${c.icon})`,
          }}
        />
      </div>
    </div>
  );
}
