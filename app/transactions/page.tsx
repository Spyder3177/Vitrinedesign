"use client";
import { useState } from "react";
import Topbar from "@/components/Topbar";
import { transactions } from "@/lib/data";
import { ArrowUpRight, ArrowDownRight, ArrowLeftRight, Search, Filter, Download } from "lucide-react";

const typeLabels: Record<string, string> = { income: "Revenu", expense: "Dépense", transfer: "Virement" };
const typeColors: Record<string, string> = { income: "#10b981", expense: "#ef4444", transfer: "#3b82f6" };

const categories = ["Toutes", ...Array.from(new Set(transactions.map((t) => t.category)))];

export default function Transactions() {
  const [search, setSearch]   = useState("");
  const [cat, setCat]         = useState("Toutes");
  const [type, setType]       = useState("all");

  const filtered = transactions.filter((tx) => {
    const matchSearch = tx.label.toLowerCase().includes(search.toLowerCase()) || tx.category.toLowerCase().includes(search.toLowerCase());
    const matchCat    = cat === "Toutes" || tx.category === cat;
    const matchType   = type === "all" || tx.type === type;
    return matchSearch && matchCat && matchType;
  });

  const total   = filtered.reduce((s, t) => s + t.amount, 0);
  const income  = filtered.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const expense = filtered.filter((t) => t.type === "expense").reduce((s, t) => s + Math.abs(t.amount), 0);

  return (
    <>
      <Topbar title="Transactions" subtitle={`${filtered.length} opération${filtered.length > 1 ? "s" : ""}`} />
      <div className="flex-1 p-6 space-y-5">

        {/* Summary */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Solde filtré", value: total,   color: total >= 0 ? "#10b981" : "#ef4444", prefix: true },
            { label: "Total revenus",value: income,  color: "#10b981", prefix: true },
            { label: "Total dépenses",value: expense,color: "#ef4444", prefix: true },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl p-4" style={{
              background: "#0d1526", border: "1px solid rgba(255,255,255,0.05)",
            }}>
              <div className="text-xs mb-2" style={{ color: "#475569" }}>{s.label}</div>
              <div className="text-xl font-bold num" style={{ color: s.color }}>
                {s.value >= 0 ? "+" : ""}{s.value.toLocaleString("fr-FR")} €
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="rounded-2xl p-4 flex flex-wrap items-center gap-3" style={{
          background: "#0d1526", border: "1px solid rgba(255,255,255,0.05)",
        }}>
          {/* Search */}
          <div className="flex items-center gap-2 flex-1 min-w-48 px-3 py-2 rounded-xl" style={{
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)",
          }}>
            <Search size={14} style={{ color: "#475569" }} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher une transaction…"
              className="bg-transparent text-sm text-slate-200 outline-none flex-1 placeholder:text-slate-600"
            />
          </div>

          {/* Type filter */}
          <div className="flex gap-1">
            {[
              { key: "all",      label: "Tous" },
              { key: "income",   label: "Revenus" },
              { key: "expense",  label: "Dépenses" },
              { key: "transfer", label: "Virements" },
            ].map((t) => (
              <button key={t.key}
                onClick={() => setType(t.key)}
                className="text-xs px-3 py-1.5 rounded-lg font-medium transition-all"
                style={{
                  background: type === t.key ? "rgba(16,185,129,0.15)" : "transparent",
                  color: type === t.key ? "#10b981" : "#475569",
                  border: type === t.key ? "1px solid rgba(16,185,129,0.3)" : "1px solid transparent",
                }}
              >{t.label}</button>
            ))}
          </div>

          <button className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg ml-auto" style={{
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", color: "#475569",
          }}>
            <Download size={13} /> Exporter CSV
          </button>
        </div>

        {/* Category chips */}
        <div className="flex gap-2 flex-wrap">
          {categories.map((c) => (
            <button key={c} onClick={() => setCat(c)}
              className="text-xs px-3 py-1.5 rounded-full transition-all font-medium"
              style={{
                background: cat === c ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.04)",
                color: cat === c ? "#10b981" : "#475569",
                border: cat === c ? "1px solid rgba(16,185,129,0.3)" : "1px solid rgba(255,255,255,0.06)",
              }}
            >{c}</button>
          ))}
        </div>

        {/* Table */}
        <div className="rounded-2xl overflow-hidden" style={{
          background: "#0d1526", border: "1px solid rgba(255,255,255,0.05)",
        }}>
          <div className="grid gap-0">
            {/* Header */}
            <div className="grid grid-cols-12 px-5 py-3 text-xs font-semibold" style={{
              color: "#334155", borderBottom: "1px solid rgba(255,255,255,0.04)",
              letterSpacing: "0.06em",
            }}>
              <span className="col-span-1">TYPE</span>
              <span className="col-span-4">LIBELLÉ</span>
              <span className="col-span-3">CATÉGORIE</span>
              <span className="col-span-2">DATE</span>
              <span className="col-span-2 text-right">MONTANT</span>
            </div>

            {/* Rows */}
            {filtered.length === 0 ? (
              <div className="text-center py-12" style={{ color: "#334155" }}>
                Aucune transaction trouvée
              </div>
            ) : filtered.map((tx) => (
              <div key={tx.id}
                className="grid grid-cols-12 px-5 py-3.5 items-center transition-all hover:bg-white/5 cursor-default"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}
              >
                <div className="col-span-1">
                  {tx.type === "income"   && <ArrowDownRight size={16} style={{ color: "#10b981" }} />}
                  {tx.type === "expense"  && <ArrowUpRight   size={16} style={{ color: "#ef4444" }} />}
                  {tx.type === "transfer" && <ArrowLeftRight  size={16} style={{ color: "#3b82f6" }} />}
                </div>
                <div className="col-span-4 flex items-center gap-2">
                  <span className="text-base">{tx.icon}</span>
                  <span className="text-sm text-slate-300 truncate">{tx.label}</span>
                </div>
                <div className="col-span-3">
                  <span className="text-xs px-2.5 py-1 rounded-full" style={{
                    background: "rgba(255,255,255,0.04)", color: "#475569",
                  }}>{tx.category}</span>
                </div>
                <div className="col-span-2 text-xs" style={{ color: "#334155" }}>{tx.date}</div>
                <div className="col-span-2 text-right">
                  <span className="text-sm font-bold num" style={{ color: typeColors[tx.type] }}>
                    {tx.amount > 0 ? "+" : ""}{tx.amount.toLocaleString("fr-FR")} €
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
