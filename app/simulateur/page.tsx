"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, ReferenceLine,
} from "recharts";
import Topbar from "@/components/Topbar";
import AnimatedCard from "@/components/AnimatedCard";
import { TrendingUp, Calculator, Target, Zap } from "lucide-react";

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "rgba(13,21,38,0.97)", border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "14px", padding: "12px 14px",
    }}>
      <div className="font-bold text-white mb-2 text-sm">{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center gap-2 mb-1 text-xs">
          <div className="w-2 h-2 rounded-full shrink-0" style={{ background: p.stroke }} />
          <span style={{ color: "#94a3b8" }}>{p.name}</span>
          <span className="font-bold text-white ml-1">{Number(p.value).toLocaleString("fr-FR")} €</span>
        </div>
      ))}
    </div>
  );
}

function Slider({ label, value, min, max, step, onChange, color = "#10b981", format }: {
  label: string; value: number; min: number; max: number; step: number;
  onChange: (v: number) => void; color?: string; format: (v: number) => string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm" style={{ color: "var(--text-2)" }}>{label}</span>
        <motion.span key={value} initial={{ scale: 1.2 }} animate={{ scale: 1 }}
          transition={{ duration: 0.15 }} className="text-sm font-bold num" style={{ color }}>
          {format(value)}
        </motion.span>
      </div>
      <div className="relative h-6 flex items-center">
        <div className="w-full h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
          <div className="h-full rounded-full" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}50, ${color})` }} />
        </div>
        <input type="range" min={min} max={max} step={step} value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer" />
        <div className="absolute w-4 h-4 rounded-full border-2 pointer-events-none"
          style={{ left: `calc(${pct}% - 8px)`, background: color, borderColor: "rgba(255,255,255,0.4)", boxShadow: `0 0 10px ${color}80` }} />
      </div>
    </div>
  );
}

export default function Simulateur() {
  const [capital,   setCapital]   = useState(50_000);
  const [monthly,   setMonthly]   = useState(1_000);
  const [rate,      setRate]      = useState(7);
  const [years,     setYears]     = useState(20);
  const [inflation, setInflation] = useState(2);

  const data = useMemo(() => {
    const rows = [];
    let value = capital;
    const monthlyRate = rate / 100 / 12;
    for (let y = 0; y <= years; y++) {
      rows.push({
        year: `${2026 + y}`,
        "Portefeuille": Math.round(value),
        "Apports":      Math.round(capital + monthly * 12 * y),
      });
      if (y < years) {
        for (let m = 0; m < 12; m++) {
          value = (value + monthly) * (1 + monthlyRate);
        }
      }
    }
    return rows;
  }, [capital, monthly, rate, years]);

  const finalValue   = data[data.length - 1]["Portefeuille"];
  const totalContrib = data[data.length - 1]["Apports"];
  const gains        = finalValue - totalContrib;
  const gainsPct     = ((gains / totalContrib) * 100).toFixed(0);
  const realValue    = Math.round(finalValue / Math.pow(1 + inflation / 100, years));

  const presets = [
    { label: "Prudent",   rate: 4,  monthly: 500,   color: "#3b82f6" },
    { label: "Équilibré", rate: 7,  monthly: 1_000, color: "#10b981" },
    { label: "Dynamique", rate: 10, monthly: 1_500, color: "#8b5cf6" },
    { label: "FIRE",      rate: 8,  monthly: 3_000, color: "#f59e0b" },
  ];

  return (
    <>
      <Topbar title="Simulateur" subtitle="Projection patrimoniale interactive" />
      <div className="flex-1 p-4 lg:p-6 space-y-4 lg:space-y-6">

        {/* Presets */}
        <AnimatedCard delay={0}>
          <div className="flex gap-2 flex-wrap items-center">
            {presets.map((p) => (
              <motion.button key={p.label} whileTap={{ scale: 0.95 }}
                onClick={() => { setRate(p.rate); setMonthly(p.monthly); }}
                className="px-3 py-2 rounded-xl text-sm font-medium transition-all"
                style={{
                  background: rate === p.rate && monthly === p.monthly ? `${p.color}15` : "var(--bg-card)",
                  color: rate === p.rate && monthly === p.monthly ? p.color : "var(--text-3)",
                  border: `1px solid ${rate === p.rate && monthly === p.monthly ? p.color + "30" : "var(--border)"}`,
                }}
              >{p.label}</motion.button>
            ))}
          </div>
        </AnimatedCard>

        {/* Result KPIs — 2 col on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: "Valeur finale",  value: `${finalValue.toLocaleString("fr-FR")} €`,  color: "#10b981", icon: TrendingUp },
            { label: "Plus-values",    value: `+${gains.toLocaleString("fr-FR")} €`,       color: "#8b5cf6", icon: Zap },
            { label: "Apports totaux", value: `${totalContrib.toLocaleString("fr-FR")} €`, color: "#3b82f6", icon: Calculator },
            { label: "Valeur réelle",  value: `${realValue.toLocaleString("fr-FR")} €`,    color: "#f59e0b", icon: Target },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <AnimatedCard key={s.label} delay={0.08 + i * 0.06}>
                <div className="rounded-2xl p-4" style={{ background: "var(--bg-card)", border: `1px solid ${s.color}20` }}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${s.color}15` }}>
                      <Icon size={14} style={{ color: s.color }} />
                    </div>
                    <span className="text-xs truncate" style={{ color: "var(--text-3)" }}>{s.label}</span>
                  </div>
                  <motion.div key={s.value} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="text-sm lg:text-base font-bold num" style={{ color: s.color }}>
                    {s.value}
                  </motion.div>
                </div>
              </AnimatedCard>
            );
          })}
        </div>

        {/* Controls + Chart — stacked on mobile, side-by-side on xl */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <AnimatedCard delay={0.3}>
            <div className="rounded-2xl p-4 lg:p-5 space-y-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <div className="flex items-center gap-2">
                <Calculator size={16} style={{ color: "#10b981" }} />
                <span className="font-semibold" style={{ color: "var(--text-1)" }}>Paramètres</span>
              </div>
              <Slider label="Capital de départ" value={capital} min={0} max={300_000} step={1_000}
                onChange={setCapital} color="#3b82f6" format={(v) => `${v.toLocaleString("fr-FR")} €`} />
              <Slider label="Versement mensuel" value={monthly} min={0} max={5_000} step={50}
                onChange={setMonthly} color="#10b981" format={(v) => `${v.toLocaleString("fr-FR")} €/mois`} />
              <Slider label="Rendement annuel" value={rate} min={1} max={15} step={0.5}
                onChange={setRate} color="#8b5cf6" format={(v) => `${v.toFixed(1)} %/an`} />
              <Slider label="Horizon" value={years} min={1} max={40} step={1}
                onChange={setYears} color="#f59e0b" format={(v) => `${v} an${v > 1 ? "s" : ""}`} />
              <Slider label="Inflation" value={inflation} min={0} max={5} step={0.5}
                onChange={setInflation} color="#ef4444" format={(v) => `${v.toFixed(1)} %/an`} />
            </div>
          </AnimatedCard>

          <AnimatedCard delay={0.4} className="xl:col-span-2">
            <div className="rounded-2xl p-4 lg:p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <div className="font-semibold mb-1" style={{ color: "var(--text-1)" }}>Projection</div>
              <div className="text-xs mb-4" style={{ color: "var(--text-3)" }}>
                2026 → {2026 + years} · {rate}%/an · {monthly.toLocaleString("fr-FR")} €/mois
              </div>
              <ResponsiveContainer width="100%" height={230}>
                <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
                  <defs>
                    <linearGradient id="simG" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="simB" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="year" tick={{ fill: "#475569", fontSize: 10 }} axisLine={false} tickLine={false}
                    interval={Math.max(1, Math.floor(years / 4))} />
                  <YAxis tick={{ fill: "#475569", fontSize: 10 }} axisLine={false} tickLine={false}
                    tickFormatter={(v) => v >= 1_000_000 ? `${(v/1_000_000).toFixed(1)}M` : `${(v/1000).toFixed(0)}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend iconType="circle" iconSize={8}
                    formatter={(v) => <span style={{ color: "#94a3b8", fontSize: 11 }}>{v}</span>} />
                  <Area type="monotone" dataKey="Apports"     stroke="#3b82f6" fill="url(#simB)" strokeWidth={1.5} dot={false} strokeDasharray="5 3" />
                  <Area type="monotone" dataKey="Portefeuille" stroke="#10b981" fill="url(#simG)" strokeWidth={2.5} dot={false} />
                  <ReferenceLine y={finalValue} stroke="rgba(16,185,129,0.2)" strokeDasharray="4 4" />
                </AreaChart>
              </ResponsiveContainer>

              <div className="mt-4 p-3 rounded-xl flex items-start gap-2" style={{
                background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.12)",
              }}>
                <span>💡</span>
                <p className="text-xs" style={{ color: "var(--text-2)" }}>
                  Les intérêts composés génèrent{" "}
                  <strong style={{ color: "#10b981" }}>{gains.toLocaleString("fr-FR")} €</strong>{" "}
                  de gains — {gainsPct}% de plus que vos apports.
                  {gains > totalContrib && " L'effet boule de neige dépasse vos versements !"}
                </p>
              </div>
            </div>
          </AnimatedCard>
        </div>
      </div>
    </>
  );
}
