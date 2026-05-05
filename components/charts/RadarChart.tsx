"use client";
import { RadarChart as RC, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from "recharts";
import { radarData } from "@/lib/data";

export default function HealthRadar() {
  return (
    <div className="rounded-2xl p-5 h-full" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
      <div className="font-semibold mb-0.5" style={{ color: "var(--text-1)" }}>Score Financier</div>
      <div className="text-xs mb-3" style={{ color: "var(--text-3)" }}>6 dimensions analysées</div>

      <ResponsiveContainer width="100%" height={200}>
        <RC data={radarData} margin={{ top: 5, right: 24, bottom: 5, left: 24 }}>
          <PolarGrid stroke="var(--chart-grid)" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: "var(--chart-tick)", fontSize: 11 }} />
          <Radar name="Score" dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.15} strokeWidth={2} />
          <Tooltip
            contentStyle={{
              background: "var(--tooltip-bg)", border: "1px solid var(--tooltip-border)",
              borderRadius: "12px", color: "var(--text-1)",
            }}
            formatter={(v: any) => [`${v}/100`, "Score"]}
          />
        </RC>
      </ResponsiveContainer>

      <div className="flex justify-center mt-2">
        <div className="text-center px-5 py-2 rounded-xl" style={{
          background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.15)",
        }}>
          <div className="text-2xl font-bold" style={{ color: "#10b981" }}>87</div>
          <div className="text-xs" style={{ color: "var(--text-3)" }}>Score global / 100</div>
        </div>
      </div>
    </div>
  );
}
