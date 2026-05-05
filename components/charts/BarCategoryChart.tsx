"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { monthlySpendingByCategory } from "@/lib/data";

const colors    = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#f97316"];
const categories = ["Logement","Alimentation","Transport","Loisirs","Restaurants"];
const months     = ["jan","fev","mar","avr","mai"];

const data = months.map((m) => {
  const row: any = { month: m.charAt(0).toUpperCase() + m.slice(1) };
  monthlySpendingByCategory.forEach((cat) => { row[cat.category] = cat[m as keyof typeof cat]; });
  return row;
});

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "var(--tooltip-bg)", border: "1px solid var(--tooltip-border)",
      borderRadius: "12px", padding: "12px 16px",
      boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
    }}>
      <div className="font-semibold mb-2" style={{ color: "var(--text-1)" }}>{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center gap-2 mb-1 text-xs">
          <div className="w-2 h-2 rounded-full" style={{ background: p.fill }} />
          <span style={{ color: "var(--text-3)" }}>{p.name}</span>
          <span className="font-bold ml-auto" style={{ color: "var(--text-1)" }}>{Number(p.value).toLocaleString("fr-FR")} €</span>
        </div>
      ))}
    </div>
  );
}

export default function BarCategoryChart() {
  return (
    <div className="rounded-2xl p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
      <div className="font-semibold mb-0.5" style={{ color: "var(--text-1)" }}>Dépenses par catégorie</div>
      <div className="text-xs mb-4" style={{ color: "var(--text-3)" }}>Évolution mensuelle (€)</div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 5, right: 5, bottom: 0, left: 0 }} barCategoryGap="20%">
          <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
          <XAxis dataKey="month" tick={{ fill: "var(--chart-tick)", fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend iconType="circle" iconSize={8}
            formatter={(v) => <span style={{ color: "var(--text-3)", fontSize: 11 }}>{v}</span>} />
          {categories.map((cat, i) => (
            <Bar key={cat} dataKey={cat} fill={colors[i]} radius={[4,4,0,0]} maxBarSize={20} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
