"use client";
import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface Slice { name: string; value: number; color: string; amount: number; }

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload as Slice;
  return (
    <div style={{
      background: "var(--tooltip-bg)", border: "1px solid var(--tooltip-border)",
      borderRadius: "12px", padding: "12px 16px",
      boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
    }}>
      <div className="font-semibold" style={{ color: "var(--text-1)" }}>{d.name}</div>
      <div style={{ color: "var(--text-3)" }}>{d.value}% · {d.amount.toLocaleString("fr-FR")} €</div>
    </div>
  );
}

export default function AllocationPie({ data }: { data: Slice[] }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="rounded-2xl p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
      <div className="font-semibold mb-0.5" style={{ color: "var(--text-1)" }}>Allocation</div>
      <div className="text-xs mb-3" style={{ color: "var(--text-3)" }}>Répartition par classe d'actifs</div>

      <ResponsiveContainer width="100%" height={150}>
        <PieChart>
          <Pie
            data={data} cx="50%" cy="50%" innerRadius={44} outerRadius={68}
            paddingAngle={3} dataKey="value"
            onMouseEnter={(_, i) => setActive(i)}
            onMouseLeave={() => setActive(null)}
          >
            {data.map((entry, i) => (
              <Cell key={entry.name} fill={entry.color}
                opacity={active === null || active === i ? 1 : 0.35}
                stroke="transparent" />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      <div className="space-y-1.5 mt-1">
        {data.map((item, i) => (
          <div key={item.name}
            className="flex items-center gap-2 cursor-default"
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
          >
            <div className="w-2 h-2 rounded-full shrink-0" style={{ background: item.color }} />
            <span className="text-xs flex-1" style={{ color: "var(--text-3)" }}>{item.name}</span>
            <span className="text-xs font-semibold num" style={{ color: "var(--text-2)" }}>{item.value}%</span>
            <span className="text-xs num" style={{ color: "var(--text-4)" }}>{item.amount.toLocaleString("fr-FR")} €</span>
          </div>
        ))}
      </div>
    </div>
  );
}
