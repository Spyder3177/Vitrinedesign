"use client";
import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface Slice { name: string; value: number; color: string; amount: number; }

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload as Slice;
  return (
    <div style={{
      background: "rgba(13,21,38,0.95)", border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "12px", padding: "12px 16px", fontSize: "13px",
    }}>
      <div className="font-semibold text-white">{d.name}</div>
      <div style={{ color: "#94a3b8" }}>{d.value}% · {d.amount.toLocaleString("fr-FR")} €</div>
    </div>
  );
}

export default function AllocationPie({ data }: { data: Slice[] }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="rounded-2xl p-5" style={{
      background: "#0d1526", border: "1px solid rgba(255,255,255,0.05)",
    }}>
      <div className="font-semibold text-white mb-1">Allocation</div>
      <div className="text-xs mb-4" style={{ color: "#475569" }}>Répartition par classe d'actifs</div>

      <ResponsiveContainer width="100%" height={160}>
        <PieChart>
          <Pie
            data={data} cx="50%" cy="50%" innerRadius={48} outerRadius={72}
            paddingAngle={3} dataKey="value"
            onMouseEnter={(_, i) => setActive(i)}
            onMouseLeave={() => setActive(null)}
          >
            {data.map((entry, i) => (
              <Cell
                key={entry.name} fill={entry.color}
                opacity={active === null || active === i ? 1 : 0.4}
                stroke="transparent"
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      <div className="space-y-2 mt-2">
        {data.map((item, i) => (
          <div key={item.name}
            className="flex items-center gap-2 cursor-default"
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
          >
            <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: item.color }} />
            <span className="text-xs text-slate-400 flex-1">{item.name}</span>
            <span className="text-xs font-semibold text-slate-300 num">{item.value}%</span>
            <span className="text-xs num" style={{ color: "#334155" }}>{item.amount.toLocaleString("fr-FR")} €</span>
          </div>
        ))}
      </div>
    </div>
  );
}
