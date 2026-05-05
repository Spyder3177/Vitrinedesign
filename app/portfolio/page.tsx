"use client";
import { useState } from "react";
import Topbar from "@/components/Topbar";
import MiniPortfolioChart from "@/components/charts/MiniPortfolioChart";
import AllocationPie from "@/components/charts/AllocationPie";
import { stocks, allocationData } from "@/lib/data";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

const tabs = ["Vue d'ensemble","Actions","Crypto","Immobilier"];

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
      <div className="flex-1 p-6 space-y-6">

        {/* Hero row */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          {/* Total value */}
          <div className="xl:col-span-2 rounded-2xl p-6" style={{
            background: "linear-gradient(135deg, #0d1f3c, #0a1628)",
            border: "1px solid rgba(16,185,129,0.15)",
          }}>
            <div className="text-xs mb-1" style={{ color: "#475569" }}>VALEUR DU PORTEFEUILLE</div>
            <div className="text-4xl font-bold text-white num mb-2">
              {totalValue.toLocaleString("fr-FR")} €
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <span className={`badge ${totalPnL >= 0 ? "badge-up" : "badge-down"}`}>
                {totalPnL >= 0 ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                {totalPnL >= 0 ? "+" : ""}{totalPnL.toLocaleString("fr-FR", { maximumFractionDigits: 0 })} € aujourd'hui
              </span>
              <span className={`badge ${pnlPct >= 0 ? "badge-up" : "badge-down"}`}>
                {pnlPct >= 0 ? "+" : ""}{pnlPct.toFixed(2)}%
              </span>
              <span className="text-xs" style={{ color: "#334155" }}>Dernière MAJ: 05/05/2026 09:41</span>
            </div>

            {/* Stat mini-grid */}
            <div className="grid grid-cols-3 gap-4 mt-5 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
              {[
                { label: "Positions ouvertes", value: `${stocks.length}` },
                { label: "Plus-values latentes", value: "+18 420 €", colored: true },
                { label: "Rendement annualisé", value: "+14.8%", colored: true },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-xs mb-1" style={{ color: "#475569" }}>{s.label}</div>
                  <div className="text-sm font-bold" style={{ color: s.colored ? "#10b981" : "#f1f5f9" }}>{s.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Charts */}
          <div className="flex flex-col gap-4">
            <AllocationPie data={allocationData} />
          </div>
        </div>

        {/* Mini chart */}
        <MiniPortfolioChart />

        {/* Tabs + Table */}
        <div className="rounded-2xl" style={{
          background: "#0d1526", border: "1px solid rgba(255,255,255,0.05)",
        }}>
          {/* Tabs */}
          <div className="flex gap-1 p-4 pb-0">
            {tabs.map((tab, i) => (
              <button key={tab} onClick={() => setActiveTab(i)}
                className="text-sm px-4 py-2 rounded-lg font-medium transition-all"
                style={{
                  background: activeTab === i ? "rgba(16,185,129,0.12)" : "transparent",
                  color: activeTab === i ? "#10b981" : "#475569",
                  border: activeTab === i ? "1px solid rgba(16,185,129,0.25)" : "1px solid transparent",
                }}
              >{tab}</button>
            ))}
          </div>

          {/* Table header */}
          <div className="grid grid-cols-12 px-5 py-3 text-xs font-semibold mt-2" style={{
            color: "#334155", borderBottom: "1px solid rgba(255,255,255,0.04)", letterSpacing: "0.06em",
          }}>
            <span className="col-span-3">ACTIF</span>
            <span className="col-span-2 text-right">PRIX</span>
            <span className="col-span-2 text-right">VARIATION</span>
            <span className="col-span-2 text-right">QUANTITÉ</span>
            <span className="col-span-2 text-right">VALEUR</span>
            <span className="col-span-1 text-right">ALLOC</span>
          </div>

          {/* Rows */}
          {filtered.map((s) => {
            const up    = s.pct > 0;
            const flat  = s.pct === 0;
            const color = flat ? "#94a3b8" : up ? "#10b981" : "#ef4444";

            return (
              <div key={s.ticker}
                className="grid grid-cols-12 px-5 py-4 items-center transition-all hover:bg-white/5 cursor-default"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}
              >
                <div className="col-span-3 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs" style={{
                    background: `${color}15`, color,
                  }}>{s.ticker.slice(0,2)}</div>
                  <div>
                    <div className="text-sm font-semibold text-slate-200">{s.ticker}</div>
                    <div className="text-xs truncate max-w-32" style={{ color: "#475569" }}>{s.name}</div>
                  </div>
                </div>

                <div className="col-span-2 text-right text-sm font-medium text-slate-300 num">
                  {s.price < 1000
                    ? s.price.toLocaleString("fr-FR", { minimumFractionDigits: 2 })
                    : s.price.toLocaleString("fr-FR", { maximumFractionDigits: 0 })} €
                </div>

                <div className="col-span-2 text-right">
                  <div className="flex items-center justify-end gap-1">
                    {flat ? <Minus size={12} style={{ color }} /> : up ? <ArrowUpRight size={12} style={{ color }} /> : <ArrowDownRight size={12} style={{ color }} />}
                    <span className="text-sm font-bold num" style={{ color }}>
                      {up ? "+" : ""}{s.pct.toFixed(2)}%
                    </span>
                  </div>
                  <div className="text-xs num" style={{ color }}>
                    {s.change >= 0 ? "+" : ""}{s.change.toLocaleString("fr-FR", { maximumFractionDigits: 2 })} €
                  </div>
                </div>

                <div className="col-span-2 text-right text-sm text-slate-400 num">{s.shares}</div>

                <div className="col-span-2 text-right">
                  <div className="text-sm font-bold text-slate-200 num">{s.value.toLocaleString("fr-FR")} €</div>
                </div>

                <div className="col-span-1 text-right">
                  <div className="text-xs font-semibold num" style={{ color: "#94a3b8" }}>{s.alloc.toFixed(1)}%</div>
                  <div className="progress-track mt-1" style={{ height: "3px" }}>
                    <div className="progress-fill" style={{ width: `${s.alloc}%`, background: color }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
