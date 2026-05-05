"use client";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { cashflowData } from "@/lib/data";

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "rgba(13,21,38,0.95)", border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "12px", padding: "12px 16px", fontSize: "13px",
    }}>
      <div className="font-semibold text-white mb-2">{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span style={{ color: "#94a3b8" }}>{p.name}</span>
          <span className="font-bold text-white ml-auto">
            {Number(p.value).toLocaleString("fr-FR")} €
          </span>
        </div>
      ))}
    </div>
  );
}

export default function CashflowChart() {
  return (
    <div className="rounded-2xl p-5 h-full" style={{
      background: "#0d1526", border: "1px solid rgba(255,255,255,0.05)",
    }}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="font-semibold text-white">Flux de Trésorerie</div>
          <div className="text-xs mt-0.5" style={{ color: "#475569" }}>Revenus, dépenses et épargne / 7 mois</div>
        </div>
        <div className="flex gap-2">
          {["1M", "3M", "6M", "1A"].map((p, i) => (
            <button key={p} className="text-xs px-2.5 py-1 rounded-lg font-medium transition-all" style={{
              background: i === 2 ? "rgba(16,185,129,0.15)" : "transparent",
              color: i === 2 ? "#10b981" : "#475569",
              border: i === 2 ? "1px solid rgba(16,185,129,0.3)" : "1px solid transparent",
            }}>{p}</button>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={cashflowData} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="gIncome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#10b981" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gExpenses" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#ef4444" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gSavings" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis dataKey="month" tick={{ fill: "#475569", fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false}
            tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            iconType="circle" iconSize={8}
            formatter={(v) => <span style={{ color: "#94a3b8", fontSize: 12 }}>{v}</span>}
          />
          <Area type="monotone" dataKey="income"   name="Revenus"  stroke="#10b981" fill="url(#gIncome)"   strokeWidth={2} dot={false} />
          <Area type="monotone" dataKey="expenses" name="Dépenses" stroke="#ef4444" fill="url(#gExpenses)" strokeWidth={2} dot={false} />
          <Area type="monotone" dataKey="savings"  name="Épargne"  stroke="#3b82f6" fill="url(#gSavings)"  strokeWidth={2} dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
