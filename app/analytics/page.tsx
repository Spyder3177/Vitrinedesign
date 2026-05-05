"use client";
import Topbar from "@/components/Topbar";
import CashflowChart from "@/components/charts/CashflowChart";
import HealthRadar from "@/components/charts/RadarChart";
import BarCategoryChart from "@/components/charts/BarCategoryChart";
import AllocationPie from "@/components/charts/AllocationPie";
import { analyticsKpis, allocationData } from "@/lib/data";
import { ArrowUpRight, TrendingUp, Target, Shield, Zap } from "lucide-react";

const icons = [TrendingUp, Zap, Target, Shield];
const colors = ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b"];

export default function Analytics() {
  return (
    <>
      <Topbar title="Analytiques" subtitle="Analyses approfondies de votre santé financière" />
      <div className="flex-1 p-6 space-y-6">

        {/* KPI summary row */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {analyticsKpis.map((kpi, i) => {
            const Icon = icons[i];
            const color = colors[i];
            return (
              <div key={kpi.label} className="rounded-2xl p-5 card-hover" style={{
                background: "#0d1526", border: "1px solid rgba(255,255,255,0.05)",
              }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{
                    background: `${color}15`, border: `1px solid ${color}25`,
                  }}>
                    <Icon size={17} style={{ color }} />
                  </div>
                  <span className="badge badge-up">
                    <ArrowUpRight size={10} /> {kpi.change}
                  </span>
                </div>
                <div className="text-xl font-bold text-white mb-1" style={{ color }}>{kpi.value}</div>
                <div className="text-xs" style={{ color: "#475569" }}>{kpi.label}</div>
              </div>
            );
          })}
        </div>

        {/* Main charts */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="xl:col-span-2">
            <CashflowChart />
          </div>
          <HealthRadar />
        </div>

        {/* Bottom */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="xl:col-span-2">
            <BarCategoryChart />
          </div>
          <AllocationPie data={allocationData} />
        </div>

        {/* Insights */}
        <div className="rounded-2xl p-5" style={{
          background: "#0d1526", border: "1px solid rgba(255,255,255,0.05)",
        }}>
          <div className="font-semibold text-white mb-4">Insights & Recommandations</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: "🚀", color: "#10b981", title: "Excellent taux d'épargne",
                body: "Votre taux d'épargne de 66.3% est exceptionnel — bien au-dessus de la moyenne nationale de 15%. Continuez sur cette lancée.",
                tag: "Performance",
              },
              {
                icon: "⚠️", color: "#f59e0b", title: "Concentration Crypto",
                body: "15% en crypto représente un risque élevé. Envisagez de plafonner à 10% pour équilibrer risque/rendement.",
                tag: "Risque",
              },
              {
                icon: "💡", color: "#3b82f6", title: "Opportunité fiscale",
                body: "Votre PEA dispose encore de 48 000 € de capacité. Maximiser le versement avant la fin d'année optimiserait votre fiscalité.",
                tag: "Optimisation",
              },
            ].map((ins) => (
              <div key={ins.title} className="rounded-xl p-4" style={{
                background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)",
              }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{ins.icon}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{
                    background: `${ins.color}15`, color: ins.color,
                  }}>{ins.tag}</span>
                </div>
                <div className="text-sm font-semibold text-white mb-1">{ins.title}</div>
                <div className="text-xs leading-relaxed" style={{ color: "#475569" }}>{ins.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
