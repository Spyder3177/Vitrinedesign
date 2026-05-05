"use client";
import Topbar from "@/components/Topbar";
import CashflowChart from "@/components/charts/CashflowChart";
import HealthRadar from "@/components/charts/RadarChart";
import BarCategoryChart from "@/components/charts/BarCategoryChart";
import AllocationPie from "@/components/charts/AllocationPie";
import { analyticsKpis, allocationData } from "@/lib/data";
import { ArrowUpRight, TrendingUp, Target, Shield, Zap } from "lucide-react";
import { motion } from "framer-motion";

const icons = [TrendingUp, Zap, Target, Shield];
const colors = ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b"];

export default function Analytics() {
  return (
    <>
      <Topbar title="Analytiques" subtitle="Analyses approfondies de votre santé financière" />
      <div className="flex-1 p-4 lg:p-6 space-y-4 lg:space-y-6">

        {/* KPI row — 2 col mobile, 4 col xl */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
          {analyticsKpis.map((kpi, i) => {
            const Icon  = icons[i];
            const color = colors[i];
            return (
              <motion.div
                key={kpi.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl p-4 lg:p-5"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-xl flex items-center justify-center shrink-0" style={{
                    background: `${color}15`, border: `1px solid ${color}25`,
                  }}>
                    <Icon size={15} style={{ color }} />
                  </div>
                  <span className="badge badge-up text-xs">
                    <ArrowUpRight size={9} /> {kpi.change}
                  </span>
                </div>
                <div className="text-lg lg:text-xl font-bold mb-1" style={{ color }}>{kpi.value}</div>
                <div className="text-xs leading-tight" style={{ color: "var(--text-3)" }}>{kpi.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="xl:col-span-2">
            <CashflowChart />
          </div>
          <HealthRadar />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="xl:col-span-2">
            <BarCategoryChart />
          </div>
          <AllocationPie data={allocationData} />
        </div>

        {/* Insights */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="rounded-2xl p-4 lg:p-5"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
        >
          <div className="font-semibold mb-4" style={{ color: "var(--text-1)" }}>Insights & Recommandations</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              {
                icon: "🚀", color: "#10b981", title: "Excellent taux d'épargne",
                body: "Votre taux de 66.3% est exceptionnel — bien au-dessus de la moyenne nationale (15%).",
                tag: "Performance",
              },
              {
                icon: "⚠️", color: "#f59e0b", title: "Concentration Crypto",
                body: "15% en crypto est élevé. Envisagez de plafonner à 10% pour équilibrer le risque.",
                tag: "Risque",
              },
              {
                icon: "💡", color: "#3b82f6", title: "Opportunité fiscale",
                body: "Votre PEA a encore 48 000 € de capacité. Maximiser avant fin d'année optimise votre fiscalité.",
                tag: "Optimisation",
              },
            ].map((ins) => (
              <div key={ins.title} className="rounded-xl p-4" style={{
                background: "var(--input-bg)", border: "1px solid var(--border)",
              }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{ins.icon}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{
                    background: `${ins.color}15`, color: ins.color,
                  }}>{ins.tag}</span>
                </div>
                <div className="text-sm font-semibold mb-1" style={{ color: "var(--text-1)" }}>{ins.title}</div>
                <div className="text-xs leading-relaxed" style={{ color: "var(--text-3)" }}>{ins.body}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
}
