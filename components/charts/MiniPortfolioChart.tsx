"use client";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { portfolioHistory } from "@/lib/data";
import { TrendingUp } from "lucide-react";

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "var(--tooltip-bg)", border: "1px solid var(--tooltip-border)",
      borderRadius: "10px", padding: "8px 12px",
      boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
    }}>
      <div className="font-bold" style={{ color: "var(--text-1)" }}>{Number(payload[0].value).toLocaleString("fr-FR")} €</div>
      <div style={{ color: "var(--text-3)", fontSize: 11 }}>{payload[0].payload.date}</div>
    </div>
  );
}

export default function MiniPortfolioChart() {
  const first = portfolioHistory[0].value;
  const last  = portfolioHistory[portfolioHistory.length - 1].value;
  const pct   = (((last - first) / first) * 100).toFixed(2);

  return (
    <div className="rounded-2xl p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
      <div className="flex items-center justify-between mb-0.5">
        <div className="font-semibold" style={{ color: "var(--text-1)" }}>Évolution</div>
        <TrendingUp size={16} style={{ color: "#10b981" }} />
      </div>
      <div className="text-xs mb-2" style={{ color: "var(--text-3)" }}>Sur 6 mois</div>
      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-xl font-bold num" style={{ color: "var(--text-1)" }}>{last.toLocaleString("fr-FR")} €</span>
        <span className="badge badge-up">+{pct}%</span>
      </div>

      <ResponsiveContainer width="100%" height={100}>
        <AreaChart data={portfolioHistory} margin={{ top: 5, right: 0, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="portGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#10b981" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" hide />
          <YAxis domain={["auto", "auto"]} hide />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="value" stroke="#10b981" fill="url(#portGrad)" strokeWidth={2} dot={false} />
        </AreaChart>
      </ResponsiveContainer>

      <div className="mt-2 flex justify-between text-xs" style={{ color: "var(--text-4)" }}>
        <span>{portfolioHistory[0].date}</span>
        <span>{portfolioHistory[portfolioHistory.length - 1].date}</span>
      </div>
    </div>
  );
}
