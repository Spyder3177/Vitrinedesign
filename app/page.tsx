"use client";
import Topbar from "@/components/Topbar";
import KpiCard from "@/components/KpiCard";
import CashflowChart from "@/components/charts/CashflowChart";
import MiniPortfolioChart from "@/components/charts/MiniPortfolioChart";
import AllocationPie from "@/components/charts/AllocationPie";
import RecentTransactions from "@/components/RecentTransactions";
import { kpiCards, portfolioBalance, allocationData } from "@/lib/data";
import { ArrowUpRight, Wallet } from "lucide-react";

export default function Dashboard() {
  return (
    <>
      <Topbar title="Dashboard" subtitle="Vue d'ensemble de votre patrimoine" />
      <div className="flex-1 p-6 space-y-6">

        {/* Hero balance */}
        <div className="rounded-2xl p-6 relative overflow-hidden" style={{
          background: "linear-gradient(135deg, #0d1f3c 0%, #0a1628 50%, #0d1526 100%)",
          border: "1px solid rgba(16,185,129,0.15)",
          boxShadow: "0 0 60px rgba(16,185,129,0.06)",
        }}>
          <div style={{
            position: "absolute", top: "-40px", right: "-40px",
            width: "200px", height: "200px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)",
          }} />
          <div className="relative z-10 flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full pulse-dot" style={{ background: "#10b981" }} />
                <span className="text-xs font-medium" style={{ color: "#64748b" }}>PATRIMOINE TOTAL</span>
              </div>
              <div className="text-4xl font-bold text-white num mb-2">
                {portfolioBalance.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} €
              </div>
              <div className="flex items-center gap-2">
                <span className="badge badge-up">
                  <ArrowUpRight size={10} /> +3.24% ce mois
                </span>
                <span className="text-xs" style={{ color: "#475569" }}>soit +8 941 € vs avril</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{
              background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)",
            }}>
              <Wallet size={22} style={{ color: "#10b981" }} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            {[
              { label: "Performance YTD", value: "+14.8%", colored: true },
              { label: "Actifs totaux",    value: "8 comptes", colored: false },
              { label: "Prochain objectif",value: "300 000 €",  colored: false },
            ].map((item) => (
              <div key={item.label}>
                <div className="text-xs mb-1" style={{ color: "#475569" }}>{item.label}</div>
                <div className="text-sm font-bold" style={{ color: item.colored ? "#10b981" : "#f1f5f9" }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {kpiCards.map((card) => (
            <KpiCard key={card.id} card={card} />
          ))}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="xl:col-span-2">
            <CashflowChart />
          </div>
          <AllocationPie data={allocationData} />
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="xl:col-span-2">
            <RecentTransactions limit={6} />
          </div>
          <MiniPortfolioChart />
        </div>
      </div>
    </>
  );
}
