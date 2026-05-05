"use client";
import {
  RadarChart as RC, Radar, PolarGrid, PolarAngleAxis,
  ResponsiveContainer, Tooltip,
} from "recharts";
import { radarData } from "@/lib/data";

export default function HealthRadar() {
  return (
    <div className="rounded-2xl p-5 h-full" style={{
      background: "#0d1526", border: "1px solid rgba(255,255,255,0.05)",
    }}>
      <div className="font-semibold text-white mb-1">Score de Santé Financière</div>
      <div className="text-xs mb-4" style={{ color: "#475569" }}>6 dimensions analysées</div>

      <ResponsiveContainer width="100%" height={220}>
        <RC data={radarData} margin={{ top: 5, right: 30, bottom: 5, left: 30 }}>
          <PolarGrid stroke="rgba(255,255,255,0.06)" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: "#475569", fontSize: 11 }} />
          <Radar name="Score" dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.15} strokeWidth={2} />
          <Tooltip
            contentStyle={{
              background: "rgba(13,21,38,0.95)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px", color: "#f1f5f9",
            }}
            formatter={(v: any) => [`${v}/100`, "Score"]}
          />
        </RC>
      </ResponsiveContainer>

      <div className="flex justify-center mt-2">
        <div className="text-center px-4 py-2 rounded-xl" style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.15)" }}>
          <div className="text-2xl font-bold" style={{ color: "#10b981" }}>87</div>
          <div className="text-xs" style={{ color: "#475569" }}>Score global / 100</div>
        </div>
      </div>
    </div>
  );
}
