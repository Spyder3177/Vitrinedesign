"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceLine,
} from "recharts";
import Topbar from "@/components/Topbar";
import AnimatedCard from "@/components/AnimatedCard";
import { TrendingUp, Calculator, Target, Zap } from "lucide-react";

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "rgba(13,21,38,0.97)", border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "14px", padding: "14px 18px",
    }}>
      <div className="font-bold text-white mb-2">{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center gap-2 mb-1 text-sm">
          <div className="w-2 h-2 rounded-full" style={{ background: p.stroke }} />
          <span style={{ color: "#94a3b8" }}>{p.name}</span>
          <span className="font-bold text-white ml-2">{Number(p.value).toLocaleString("fr-FR")} €</span>
        </div>
      ))}
    </div>
  );
}

function Slider({
  label, value, min, max, step, unit, onChange, color = "#10b981", format,
}: {
  label: string; value: number; min: number; max: number;
  step: number; unit: string; onChange: (v: number) => void;
  color?: string; format?: (v: number) => string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm" style={{ color: "var(--text-2)" }}>{label}</span>
        <motion.span
          key={value}
          initial={{ scale: 1.3, color }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
          className="text-sm font-bold num"
          style={{ color }}
        >
          {format ? format(value) : `${value.toLocaleString("fr-FR")} ${unit}`}
        </motion.span>
      </div>
      <div className="relative h-5 flex items-center">
        <div className="w-full h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
          <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}60, ${color})` }} />
        </div>
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
        />
        <motion.div
          className="absolute w-4 h-4 rounded-full border-2 pointer-events-none"
          style={{
            left: `calc(${pct}% - 8px)`,
            background: color, borderColor: "rgba(255,255,255,0.3)",
            boxShadow: `0 0 12px ${color}80`,
          }}
        />
      </div>
    </div>
  );
}

export default function Simulateur() {
  const [capital,    setCapital]    = useState(50_000);
  const [monthly,    setMonthly]    = useState(1_000);
  const [rate,       setRate]       = useState(7);
  const [years,      setYears]      = useState(20);
  const [inflation,  setInflation]  = useState(2);

  const data = useMemo(() => {
    const rows = [];
    let value = capital;
    let nominalOnly = capital;
    const monthlyRate = rate / 100 / 12;
    const inflationFactor = Math.pow(1 + inflation / 100, 1 / 12);

    for (let y = 0; y <= years; y++) {
      rows.push({
        year: `${2026 + y}`,
        "Portefeuille réel": Math.round(value),
        "Sans investissement": Math.round(capital + monthly * 12 * y),
        "Apports cumulés": Math.round(capital + monthly * 12 * y),
      });
      if (y < years) {
        for (let m = 0; m < 12; m++) {
          value = (value + monthly) * (1 + monthlyRate);
          nominalOnly += monthly;
        }
      }
    }
    return rows;
  }, [capital, monthly, rate, years, inflation]);

  const finalValue    = data[data.length - 1]["Portefeuille réel"];
  const totalContrib  = data[data.length - 1]["Apports cumulés"];
  const gains         = finalValue - totalContrib;
  const gainsPct      = ((gains / totalContrib) * 100).toFixed(0);
  const realValue     = Math.round(finalValue / Math.pow(1 + inflation / 100, years));

  const presets = [
    { label: "Prudent",    rate: 4,  monthly: 500,   color: "#3b82f6"  },
    { label: "Équilibré",  rate: 7,  monthly: 1_000, color: "#10b981"  },
    { label: "Dynamique",  rate: 10, monthly: 1_500, color: "#8b5cf6"  },
    { label: "FIRE",       rate: 8,  monthly: 3_000, color: "#f59e0b"  },
  ];

  return (
    <>
      <Topbar title="Simulateur" subtitle="Projection de l'évolution de votre patrimoine" />
      <div className="flex-1 p-6 space-y-6">

        {/* Presets */}
        <AnimatedCard delay={0}>
          <div className="flex gap-3 flex-wrap">
            {presets.map((p) => (
              <motion.button
                key={p.label}
                whileTap={{ scale: 0.95 }}
                onClick={() => { setRate(p.rate); setMonthly(p.monthly); }}
                className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
                style={{
                  background: rate === p.rate && monthly === p.monthly ? `${p.color}15` : "var(--bg-card)",
                  color: rate === p.rate && monthly === p.monthly ? p.color : "var(--text-3)",
                  border: `1px solid ${rate === p.rate && monthly === p.monthly ? p.color + "30" : "var(--border)"}`,
                }}
              >
                {p.label}
              </motion.button>
            ))}
            <div className="ml-auto flex items-center gap-2 text-xs" style={{ color: "var(--text-3)" }}>
              <Zap size={13} /> Choisissez un profil ou ajustez les curseurs
            </div>
          </div>
        </AnimatedCard>

        {/* Results + Controls */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

          {/* Controls */}
          <AnimatedCard delay={0.1}>
            <div className="rounded-2xl p-5 space-y-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <div className="flex items-center gap-2">
                <Calculator size={17} style={{ color: "#10b981" }} />
                <span className="font-semibold" style={{ color: "var(--text-1)" }}>Paramètres</span>
              </div>

              <Slider label="Capital de départ" value={capital} min={0} max={300_000} step={1_000}
                unit="€" onChange={setCapital} color="#3b82f6" />
              <Slider label="Épargne mensuelle" value={monthly} min={0} max={5_000} step={50}
                unit="€/mois" onChange={setMonthly} color="#10b981" />
              <Slider label="Rendement annuel" value={rate} min={1} max={15} step={0.5}
                unit="%" onChange={setRate} color="#8b5cf6"
                format={(v) => `${v.toFixed(1)} %/an`} />
              <Slider label="Horizon de placement" value={years} min={1} max={40} step={1}
                unit="ans" onChange={setYears} color="#f59e0b"
                format={(v) => `${v} an${v > 1 ? "s" : ""}`} />
              <Slider label="Inflation estimée" value={inflation} min={0} max={5} step={0.5}
                unit="%" onChange={setInflation} color="#ef4444"
                format={(v) => `${v.toFixed(1)} %/an`} />
            </div>
          </AnimatedCard>

          {/* Result cards */}
          <div className="xl:col-span-2 grid grid-cols-2 gap-4 content-start">
            {[
              { label: "Valeur finale",    value: `${finalValue.toLocaleString("fr-FR")} €`,  color: "#10b981", icon: TrendingUp, sub: `Dans ${years} ans` },
              { label: "Plus-values",      value: `+${gains.toLocaleString("fr-FR")} €`,       color: "#8b5cf6", icon: Zap,        sub: `+${gainsPct}% de gain` },
              { label: "Apports totaux",   value: `${totalContrib.toLocaleString("fr-FR")} €`, color: "#3b82f6", icon: Calculator,  sub: "Capital + versements" },
              { label: "Valeur réelle",    value: `${realValue.toLocaleString("fr-FR")} €`,    color: "#f59e0b", icon: Target,      sub: `Après inflation (${inflation}%)` },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <AnimatedCard key={s.label} delay={0.15 + i * 0.07}>
                  <div className="rounded-2xl p-4 h-full" style={{ background: "var(--bg-card)", border: `1px solid ${s.color}20`, boxShadow: `0 0 20px ${s.color}08` }}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${s.color}15` }}>
                        <Icon size={15} style={{ color: s.color }} />
                      </div>
                      <span className="text-xs" style={{ color: "var(--text-3)" }}>{s.label}</span>
                    </div>
                    <motion.div
                      key={s.value}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xl font-bold num"
                      style={{ color: s.color }}
                    >
                      {s.value}
                    </motion.div>
                    <div className="text-xs mt-1" style={{ color: "var(--text-4)" }}>{s.sub}</div>
                  </div>
                </AnimatedCard>
              );
            })}
          </div>
        </div>

        {/* Chart */}
        <AnimatedCard delay={0.5}>
          <div className="rounded-2xl p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="font-semibold" style={{ color: "var(--text-1)" }}>Projection patrimoniale</div>
                <div className="text-xs mt-0.5" style={{ color: "var(--text-3)" }}>
                  2026 → {2026 + years} · taux {rate}% · versement {monthly.toLocaleString("fr-FR")} €/mois
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="simGreen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#10b981" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="simBlue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="year" tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false}
                  interval={Math.floor(years / 5)} />
                <YAxis tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false}
                  tickFormatter={(v) => v >= 1_000_000 ? `${(v/1_000_000).toFixed(1)}M` : `${(v/1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" iconSize={8}
                  formatter={(v) => <span style={{ color: "#94a3b8", fontSize: 12 }}>{v}</span>} />
                <Area type="monotone" dataKey="Apports cumulés"    stroke="#3b82f6" fill="url(#simBlue)"  strokeWidth={1.5} dot={false} strokeDasharray="5 3" />
                <Area type="monotone" dataKey="Portefeuille réel"  stroke="#10b981" fill="url(#simGreen)" strokeWidth={2.5} dot={false} />
                <ReferenceLine y={finalValue} stroke="rgba(16,185,129,0.2)" strokeDasharray="4 4" />
              </AreaChart>
            </ResponsiveContainer>

            {/* Insight */}
            <div className="mt-4 p-4 rounded-xl flex items-start gap-3" style={{
              background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.12)",
            }}>
              <span className="text-xl">💡</span>
              <div className="text-sm" style={{ color: "var(--text-2)" }}>
                Les intérêts composés génèrent{" "}
                <strong style={{ color: "#10b981" }}>{gains.toLocaleString("fr-FR")} €</strong>{" "}
                de gains, soit{" "}
                <strong style={{ color: "#10b981" }}>{gainsPct}%</strong> de plus que vos apports cumulés.
                {gains > totalContrib && " L'effet boule de neige dépasse vos versements — félicitations !"}
              </div>
            </div>
          </div>
        </AnimatedCard>
      </div>
    </>
  );
}
