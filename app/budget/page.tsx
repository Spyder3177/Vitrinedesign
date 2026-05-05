"use client";
import { motion } from "framer-motion";
import Topbar from "@/components/Topbar";
import { budgetCategories } from "@/lib/data";
import { CheckCircle, AlertCircle, TrendingDown } from "lucide-react";

export default function Budget() {
  const totalBudget = budgetCategories.reduce((s, c) => s + c.budget, 0);
  const totalSpent  = budgetCategories.reduce((s, c) => s + c.spent, 0);
  const totalLeft   = totalBudget - totalSpent;
  const overBudget  = budgetCategories.filter((c) => c.spent > c.budget);

  return (
    <>
      <Topbar title="Budget" subtitle="Enveloppes budgétaires — Mai 2026" />
      <div className="flex-1 p-4 lg:p-6 space-y-4 lg:space-y-6">

        {/* Overview — 1 col on xs, 3 col on sm+ */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { label: "Budget total",    value: totalBudget, color: "var(--text-1)", sub: "Enveloppe mensuelle" },
            { label: "Déjà dépensé",    value: totalSpent,  color: "#ef4444",       sub: `${((totalSpent/totalBudget)*100).toFixed(0)}% utilisé` },
            { label: "Reste à dépenser",value: totalLeft,   color: "#10b981",       sub: "Jusqu'au 31 mai" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl p-4 lg:p-5"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
            >
              <div className="text-xs mb-1" style={{ color: "var(--text-3)" }}>{s.label}</div>
              <div className="text-xl lg:text-2xl font-bold num" style={{ color: s.color }}>
                {s.value.toLocaleString("fr-FR")} €
              </div>
              <div className="text-xs mt-1" style={{ color: "var(--text-4)" }}>{s.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Global progress */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="rounded-2xl p-4 lg:p-5"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="font-semibold" style={{ color: "var(--text-1)" }}>Progression globale</div>
              <div className="text-xs mt-0.5" style={{ color: "var(--text-3)" }}>
                {totalSpent.toLocaleString("fr-FR")} € / {totalBudget.toLocaleString("fr-FR")} €
              </div>
            </div>
            <div className="text-sm font-bold" style={{ color: "#10b981" }}>
              {((totalSpent / totalBudget) * 100).toFixed(1)}%
            </div>
          </div>
          <div className="progress-track" style={{ height: "8px" }}>
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${(totalSpent / totalBudget) * 100}%` }}
              transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
              style={{ background: "linear-gradient(90deg, #10b981, #059669)" }}
            />
          </div>
          {overBudget.length > 0 && (
            <div className="flex items-center gap-2 mt-3 text-xs" style={{ color: "#f59e0b" }}>
              <AlertCircle size={13} />
              {overBudget.length} catégorie{overBudget.length > 1 ? "s dépassent" : " dépasse"} le budget
            </div>
          )}
        </motion.div>

        {/* Category cards — 1 col mobile, 2 col md+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
          {budgetCategories.map((cat, i) => {
            const pct      = cat.budget > 0 ? (cat.spent / cat.budget) * 100 : 0;
            const over     = cat.spent > cat.budget;
            const left     = cat.budget - cat.spent;
            const barColor = over ? "#ef4444" : pct > 80 ? "#f59e0b" : cat.color;

            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.06 }}
                className="rounded-2xl p-4 lg:p-5"
                style={{
                  background: "var(--bg-card)",
                  border: `1px solid ${over ? "rgba(239,68,68,0.2)" : "var(--border)"}`,
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0" style={{
                    background: `${cat.color}15`, border: `1px solid ${cat.color}25`,
                  }}>{cat.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold truncate" style={{ color: "var(--text-1)" }}>{cat.name}</span>
                      {over
                        ? <span className="badge badge-down shrink-0"><AlertCircle size={9} /> Dépassé</span>
                        : <span className="badge badge-up shrink-0"><CheckCircle size={9} /> OK</span>
                      }
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: "var(--text-3)" }}>
                      {cat.spent.toLocaleString("fr-FR")} € / {cat.budget.toLocaleString("fr-FR")} €
                    </div>
                  </div>
                </div>

                <div className="progress-track mb-2">
                  <motion.div
                    className="progress-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(pct, 100)}%` }}
                    transition={{ duration: 1, delay: 0.4 + i * 0.06, ease: "easeOut" }}
                    style={{ background: `linear-gradient(90deg, ${barColor}80, ${barColor})` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span style={{ color: "var(--text-4)" }}>{pct.toFixed(0)}% utilisé</span>
                  <span style={{ color: left >= 0 ? "#10b981" : "#ef4444" }}>
                    {left >= 0 ? `${left.toLocaleString("fr-FR")} € restants` : `−${Math.abs(left).toLocaleString("fr-FR")} €`}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="rounded-2xl p-4 lg:p-5"
          style={{
            background: "linear-gradient(135deg, #0d1f3c, #0a1221)",
            border: "1px solid rgba(16,185,129,0.12)",
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingDown size={17} style={{ color: "#10b981" }} />
            <span className="font-semibold text-white">Conseils d'optimisation</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs" style={{ color: "#475569" }}>
            <div className="flex gap-2"><span>💡</span><span>Cuisiner 2 soirs de plus par semaine = ~60 €/mois d'économies sur les restaurants.</span></div>
            <div className="flex gap-2"><span>📱</span><span>Abonnements bien maîtrisés à 57 €. Pas d'action requise.</span></div>
            <div className="flex gap-2"><span>🚗</span><span>Covoiturage 1x/semaine = ~20 €/mois supplémentaires.</span></div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
