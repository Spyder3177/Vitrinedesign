"use client";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { monthlySpendingByCategory } from "@/lib/data";

const colors = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#f97316"];

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "rgba(13,21,38,0.95)", border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "12px", padding: "12px 16px",
    }}>
      <div className="font-semibold text-white mb-2">{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center gap-2 mb-1 text-xs">
          <div className="w-2 h-2 rounded-full" style={{ background: p.fill }} />
          <span style={{ color: "#94a3b8" }}>{p.name}</span>
          <span className="font-bold text-white ml-auto">{Number(p.value).toLocaleString("fr-FR")} €</span>
        </div>
      ))}
    </div>
  );
}

const months = ["jan","fev","mar","avr","mai"];
const categories = ["Logement","Alimentation","Transport","Loisirs","Restaurants"];

const data = months.map((m) => {
  const row: any = { month: m.charAt(0).toUpperCase() + m.slice(1) };
  monthlySpendingByCategory.forEach((cat) => { row[cat.category] = cat[m as keyof typeof cat]; });
  return row;
});

export default function BarCategoryChart() {
  return (
    <div className="rounded-2xl p-5" style={{
      background: "#0d1526", border: "1px solid rgba(255,255,255,0.05)",
    }}>
      <div className="font-semibold text-white mb-1">Dépenses par catégorie</div>
      <div className="text-xs mb-4" style={{ color: "#475569" }}>Évolution mensuelle (€)</div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 5, right: 5, bottom: 0, left: 0 }} barCategoryGap="20%">
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
          <XAxis dataKey="month" tick={{ fill: "#475569", fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false}
            tickFormatter={(v) => `${v}`} />
          <Tooltip content={<CustomTooltip />} />
          <Legend iconType="circle" iconSize={8}
            formatter={(v) => <span style={{ color: "#94a3b8", fontSize: 11 }}>{v}</span>} />
          {categories.map((cat, i) => (
            <Bar key={cat} dataKey={cat} fill={colors[i]} radius={[4,4,0,0]} maxBarSize={24} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
