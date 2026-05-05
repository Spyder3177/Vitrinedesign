"use client";
import Topbar from "@/components/Topbar";
import KpiCard from "@/components/KpiCard";
import CashflowChart from "@/components/charts/CashflowChart";
import MiniPortfolioChart from "@/components/charts/MiniPortfolioChart";
import AllocationPie from "@/components/charts/AllocationPie";
import RecentTransactions from "@/components/RecentTransactions";
import { kpiCards, portfolioBalance, allocationData } from "@/lib/data";
import { ArrowUpRight, Wallet } from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
  return (
    <>
      <Topbar title="Dashboard" subtitle="Vue d'ensemble de votre patrimoine" />
      <div className="flex-1 p-4 lg:p-6 space-y-4 lg:space-y-6">

        {/* Hero balance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl p-5 lg:p-6 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #0d1f3c 0%, #0a1628 50%, #0d1526 100%)",
            border: "1px solid rgba(16,185,129,0.15)",
            boxShadow: "0 0 60px rgba(16,185,129,0.06)",
          }}
        >
          <div style={{
            position: "absolute", top: "-40px", right: "-40px",
            width: "180px", height: "180px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)",
          }} />
          <div className="relative z-10 flex items-start justify-between flex-wrap gap-3">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full pulse-dot" style={{ background: "#10b981" }} />
                <span className="text-xs font-medium" style={{ color: "#64748b" }}>PATRIMOINE TOTAL</span>
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-white num mb-2">
                {portfolioBalance.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} €
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="badge badge-up">
                  <ArrowUpRight size={10} /> +3.24% ce mois
                </span>
                <span className="text-xs" style={{ color: "#475569" }}>+8 941 € vs avril</span>
              </div>
            </div>
            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center" style={{
              background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)",
            }}>
              <Wallet size={20} style={{ color: "#10b981" }} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 lg:gap-4 mt-5 pt-4 lg:pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            {[
              { label: "Perf. YTD",    value: "+14.8%",    colored: true },
              { label: "Actifs",        value: "8 comptes", colored: false },
              { label: "Objectif",      value: "300K €",    colored: false },
            ].map((item) => (
              <div key={item.label}>
                <div className="text-xs mb-1" style={{ color: "#475569" }}>{item.label}</div>
                <div className="text-sm font-bold" style={{ color: item.colored ? "#10b981" : "#f1f5f9" }}>{item.value}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* KPI Cards — 1 col mobile, 2 col sm, 4 col xl */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 lg:gap-4">
          {kpiCards.map((card, i) => (
            <KpiCard key={card.id} card={card} delay={i * 0.08} />
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
