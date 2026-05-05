"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Topbar from "@/components/Topbar";
import { transactions } from "@/lib/data";
import { ArrowUpRight, ArrowDownRight, ArrowLeftRight, Search, Download } from "lucide-react";

const typeColors: Record<string, string> = { income: "#10b981", expense: "#ef4444", transfer: "#3b82f6" };
const categories = ["Toutes", ...Array.from(new Set(transactions.map((t) => t.category)))];

export default function Transactions() {
  const [search, setSearch] = useState("");
  const [cat, setCat]       = useState("Toutes");
  const [type, setType]     = useState("all");

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
      <div className="flex-1 p-4 lg:p-6 space-y-4 lg:space-y-5">

        {/* Summary — 1 col mobile, 3 col sm+ */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { label: "Solde filtré",  value: total,   color: total >= 0 ? "#10b981" : "#ef4444", sign: true },
            { label: "Total revenus", value: income,  color: "#10b981", sign: false },
            { label: "Total dépenses",value: expense, color: "#ef4444", sign: false },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl p-4" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <div className="text-xs mb-1" style={{ color: "var(--text-3)" }}>{s.label}</div>
              <div className="text-xl font-bold num" style={{ color: s.color }}>
                {s.sign && s.value >= 0 ? "+" : ""}{s.value.toLocaleString("fr-FR")} €
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="rounded-2xl p-4 space-y-3" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          {/* Search */}
          <div className="flex items-center gap-2 w-full px-3 py-2 rounded-xl" style={{
            background: "var(--input-bg)", border: "1px solid var(--border)",
          }}>
            <Search size={14} style={{ color: "var(--text-3)" }} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher…"
              className="bg-transparent text-sm outline-none flex-1 min-w-0"
              style={{ color: "var(--text-1)" }}
            />
          </div>

          {/* Type filter */}
          <div className="flex gap-1.5 flex-wrap">
            {[
              { key: "all",      label: "Tous" },
              { key: "income",   label: "Revenus" },
              { key: "expense",  label: "Dépenses" },
              { key: "transfer", label: "Virements" },
            ].map((t) => (
              <button key={t.key} onClick={() => setType(t.key)}
                className="text-xs px-3 py-1.5 rounded-lg font-medium transition-all"
                style={{
                  background: type === t.key ? "rgba(16,185,129,0.15)" : "transparent",
                  color: type === t.key ? "#10b981" : "var(--text-3)",
                  border: type === t.key ? "1px solid rgba(16,185,129,0.3)" : "1px solid transparent",
                }}
              >{t.label}</button>
            ))}
            <button className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg ml-auto" style={{
              background: "var(--input-bg)", border: "1px solid var(--border)", color: "var(--text-3)",
            }}>
              <Download size={12} /> CSV
            </button>
          </div>
        </div>

        {/* Category chips — horizontally scrollable */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 lg:mx-0 lg:px-0 lg:flex-wrap" style={{ scrollbarWidth: "none" }}>
          {categories.map((c) => (
            <button key={c} onClick={() => setCat(c)}
              className="text-xs px-3 py-1.5 rounded-full transition-all font-medium shrink-0"
              style={{
                background: cat === c ? "rgba(16,185,129,0.15)" : "var(--input-bg)",
                color: cat === c ? "#10b981" : "var(--text-3)",
                border: cat === c ? "1px solid rgba(16,185,129,0.3)" : "1px solid var(--border)",
              }}
            >{c}</button>
          ))}
        </div>

        {/* Transactions list */}
        <div className="rounded-2xl overflow-hidden" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>

          {/* Desktop table header — hidden on mobile */}
          <div className="hidden md:grid md:grid-cols-12 px-5 py-3 text-xs font-semibold" style={{
            color: "var(--text-4)", borderBottom: "1px solid var(--border)", letterSpacing: "0.06em",
          }}>
            <span className="col-span-1">TYPE</span>
            <span className="col-span-4">LIBELLÉ</span>
            <span className="col-span-3">CATÉGORIE</span>
            <span className="col-span-2">DATE</span>
            <span className="col-span-2 text-right">MONTANT</span>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-12" style={{ color: "var(--text-4)" }}>Aucune transaction trouvée</div>
          ) : filtered.map((tx, i) => (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              style={{ borderBottom: "1px solid var(--border)" }}
            >
              {/* Mobile card layout */}
              <div className="md:hidden flex items-center gap-3 px-4 py-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-base shrink-0" style={{
                  background: "var(--input-bg)", border: "1px solid var(--border)",
                }}>
                  {tx.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate" style={{ color: "var(--text-1)" }}>{tx.label}</div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--text-3)" }}>{tx.category} · {tx.date}</div>
                </div>
                <div className="shrink-0 text-right">
                  <div className="text-sm font-bold num" style={{ color: typeColors[tx.type] }}>
                    {tx.amount > 0 ? "+" : ""}{tx.amount.toLocaleString("fr-FR")} €
                  </div>
                  <div className="flex justify-end mt-0.5">
                    {tx.type === "income"   && <ArrowDownRight size={12} style={{ color: "#10b981" }} />}
                    {tx.type === "expense"  && <ArrowUpRight   size={12} style={{ color: "#ef4444" }} />}
                    {tx.type === "transfer" && <ArrowLeftRight  size={12} style={{ color: "#3b82f6" }} />}
                  </div>
                </div>
              </div>

              {/* Desktop table row */}
              <div className="hidden md:grid md:grid-cols-12 px-5 py-3.5 items-center transition-all hover:bg-white/5 cursor-default">
                <div className="col-span-1">
                  {tx.type === "income"   && <ArrowDownRight size={16} style={{ color: "#10b981" }} />}
                  {tx.type === "expense"  && <ArrowUpRight   size={16} style={{ color: "#ef4444" }} />}
                  {tx.type === "transfer" && <ArrowLeftRight  size={16} style={{ color: "#3b82f6" }} />}
                </div>
                <div className="col-span-4 flex items-center gap-2">
                  <span className="text-base">{tx.icon}</span>
                  <span className="text-sm truncate" style={{ color: "var(--text-1)" }}>{tx.label}</span>
                </div>
                <div className="col-span-3">
                  <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: "var(--input-bg)", color: "var(--text-3)" }}>
                    {tx.category}
                  </span>
                </div>
                <div className="col-span-2 text-xs" style={{ color: "var(--text-4)" }}>{tx.date}</div>
                <div className="col-span-2 text-right">
                  <span className="text-sm font-bold num" style={{ color: typeColors[tx.type] }}>
                    {tx.amount > 0 ? "+" : ""}{tx.amount.toLocaleString("fr-FR")} €
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
