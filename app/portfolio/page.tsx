"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Topbar from "@/components/Topbar";
import MiniPortfolioChart from "@/components/charts/MiniPortfolioChart";
import AllocationPie from "@/components/charts/AllocationPie";
import { stocks, allocationData } from "@/lib/data";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

const tabs = ["Tout", "Actions", "Crypto", "Immobilier"];

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState(0);

  const totalValue = stocks.reduce((s, st) => s + st.value, 0);
  const totalPnL   = stocks.reduce((s, st) => s + (st.change * st.shares), 0);
  const pnlPct     = ((totalPnL / (totalValue - totalPnL)) * 100);

  const filtered = activeTab === 0 ? stocks
    : activeTab === 1 ? stocks.filter((s) => !["BTC","ETH","IMMO"].includes(s.ticker))
    : activeTab === 2 ? stocks.filter((s) => ["BTC","ETH"].includes(s.ticker))
    : stocks.filter((s) => s.ticker === "IMMO");

  return (
    <>
      <Topbar title="Portefeuille" subtitle="Vos actifs financiers consolidés" />
      <div className="flex-1 p-4 lg:p-6 space-y-4 lg:space-y-6">

        {/* Hero */}
        <div className="rounded-2xl p-5 lg:p-6" style={{
          background: "linear-gradient(135deg, #0d1f3c, #0a1628)",
          border: "1px solid rgba(16,185,129,0.15)",
        }}>
          <div className="text-xs mb-1" style={{ color: "#475569" }}>VALEUR DU PORTEFEUILLE</div>
          <div className="text-3xl lg:text-4xl font-bold text-white num mb-2">
            {totalValue.toLocaleString("fr-FR")} €
          </div>
          <div className="flex items-center gap-2 flex-wrap mb-5">
            <span className={`badge ${totalPnL >= 0 ? "badge-up" : "badge-down"}`}>
              {totalPnL >= 0 ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
              {totalPnL >= 0 ? "+" : ""}{totalPnL.toLocaleString("fr-FR", { maximumFractionDigits: 0 })} € aujourd'hui
            </span>
            <span className={`badge ${pnlPct >= 0 ? "badge-up" : "badge-down"}`}>
              {pnlPct >= 0 ? "+" : ""}{pnlPct.toFixed(2)}%
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            {[
              { label: "Positions",  value: `${stocks.length}` },
              { label: "+/- latentes", value: "+18 420 €", colored: true },
              { label: "Rendement",  value: "+14.8%", colored: true },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-xs mb-1 truncate" style={{ color: "#475569" }}>{s.label}</div>
                <div className="text-sm font-bold" style={{ color: s.colored ? "#10b981" : "#f1f5f9" }}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Charts — stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MiniPortfolioChart />
          <AllocationPie data={allocationData} />
        </div>

        {/* Tabs + List */}
        <div className="rounded-2xl overflow-hidden" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          {/* Tabs */}
          <div className="flex gap-1 p-3 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            {tabs.map((tab, i) => (
              <button key={tab} onClick={() => setActiveTab(i)}
                className="text-sm px-4 py-2 rounded-lg font-medium transition-all shrink-0"
                style={{
                  background: activeTab === i ? "rgba(16,185,129,0.12)" : "transparent",
                  color: activeTab === i ? "#10b981" : "var(--text-3)",
                  border: activeTab === i ? "1px solid rgba(16,185,129,0.25)" : "1px solid transparent",
                }}
              >{tab}</button>
            ))}
          </div>

          {/* Desktop table header */}
          <div className="hidden md:grid md:grid-cols-12 px-5 py-3 text-xs font-semibold" style={{
            color: "var(--text-4)", borderBottom: "1px solid var(--border)", letterSpacing: "0.06em",
          }}>
            <span className="col-span-4">ACTIF</span>
            <span className="col-span-2 text-right">PRIX</span>
            <span className="col-span-2 text-right">VAR.</span>
            <span className="col-span-2 text-right">QTÉ</span>
            <span className="col-span-2 text-right">VALEUR</span>
          </div>

          {/* Rows */}
          {filtered.map((s, i) => {
            const up    = s.pct > 0;
            const flat  = s.pct === 0;
            const color = flat ? "#94a3b8" : up ? "#10b981" : "#ef4444";

            return (
              <motion.div
                key={s.ticker}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                {/* Mobile card */}
                <div className="md:hidden flex items-center gap-3 px-4 py-3.5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs shrink-0" style={{
                    background: `${color}15`, color,
                  }}>{s.ticker.slice(0, 2)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold truncate" style={{ color: "var(--text-1)" }}>{s.ticker}</span>
                      <span className="text-sm font-bold num shrink-0" style={{ color: "var(--text-1)" }}>
                        {s.value.toLocaleString("fr-FR")} €
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-0.5">
                      <span className="text-xs truncate" style={{ color: "var(--text-3)" }}>{s.name}</span>
                      <div className="flex items-center gap-1 shrink-0">
                        {flat ? <Minus size={11} style={{ color }} /> : up ? <ArrowUpRight size={11} style={{ color }} /> : <ArrowDownRight size={11} style={{ color }} />}
                        <span className="text-xs font-bold num" style={{ color }}>{up ? "+" : ""}{s.pct.toFixed(2)}%</span>
                      </div>
                    </div>
                    <div className="mt-1.5 progress-track" style={{ height: "3px" }}>
                      <div className="progress-fill" style={{ width: `${s.alloc}%`, background: color }} />
                    </div>
                  </div>
                </div>

                {/* Desktop row */}
                <div className="hidden md:grid md:grid-cols-12 px-5 py-4 items-center hover:bg-white/5 cursor-default transition-all">
                  <div className="col-span-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0" style={{
                      background: `${color}15`, color,
                    }}>{s.ticker.slice(0, 2)}</div>
                    <div>
                      <div className="text-sm font-semibold" style={{ color: "var(--text-1)" }}>{s.ticker}</div>
                      <div className="text-xs truncate max-w-28" style={{ color: "var(--text-3)" }}>{s.name}</div>
                    </div>
                  </div>
                  <div className="col-span-2 text-right text-sm font-medium num" style={{ color: "var(--text-2)" }}>
                    {s.price < 1000
                      ? s.price.toLocaleString("fr-FR", { minimumFractionDigits: 2 })
                      : s.price.toLocaleString("fr-FR", { maximumFractionDigits: 0 })} €
                  </div>
                  <div className="col-span-2 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {flat ? <Minus size={12} style={{ color }} /> : up ? <ArrowUpRight size={12} style={{ color }} /> : <ArrowDownRight size={12} style={{ color }} />}
                      <span className="text-sm font-bold num" style={{ color }}>{up ? "+" : ""}{s.pct.toFixed(2)}%</span>
                    </div>
                  </div>
                  <div className="col-span-2 text-right text-sm num" style={{ color: "var(--text-3)" }}>{s.shares}</div>
                  <div className="col-span-2 text-right text-sm font-bold num" style={{ color: "var(--text-1)" }}>
                    {s.value.toLocaleString("fr-FR")} €
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </>
  );
}
