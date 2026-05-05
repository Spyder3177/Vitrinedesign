"use client";
import Topbar from "@/components/Topbar";
import { budgetCategories } from "@/lib/data";
import { CheckCircle, AlertCircle, TrendingDown } from "lucide-react";

export default function Budget() {
  const totalBudget  = budgetCategories.reduce((s, c) => s + c.budget, 0);
  const totalSpent   = budgetCategories.reduce((s, c) => s + c.spent, 0);
  const totalLeft    = totalBudget - totalSpent;
  const overBudget   = budgetCategories.filter((c) => c.spent > c.budget);

  return (
    <>
      <Topbar title="Budget" subtitle="Suivi de vos enveloppes budgétaires — Mai 2026" />
      <div className="flex-1 p-6 space-y-6">

        {/* Overview cards */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Budget total",   value: totalBudget, color: "#f1f5f9", sub: "Enveloppe mensuelle" },
            { label: "Déjà dépensé",   value: totalSpent,  color: "#ef4444", sub: `${((totalSpent/totalBudget)*100).toFixed(0)}% utilisé` },
            { label: "Reste à dépenser",value: totalLeft,  color: "#10b981", sub: "Jusqu'au 31 mai" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl p-5 card-hover" style={{
              background: "#0d1526", border: "1px solid rgba(255,255,255,0.05)",
            }}>
              <div className="text-xs mb-2" style={{ color: "#475569" }}>{s.label}</div>
              <div className="text-2xl font-bold num mb-1" style={{ color: s.color }}>
                {s.value.toLocaleString("fr-FR")} €
              </div>
              <div className="text-xs" style={{ color: "#334155" }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Global progress */}
        <div className="rounded-2xl p-5" style={{
          background: "#0d1526", border: "1px solid rgba(255,255,255,0.05)",
        }}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="font-semibold text-white">Progression globale</div>
              <div className="text-xs mt-0.5" style={{ color: "#475569" }}>
                {totalSpent.toLocaleString("fr-FR")} € sur {totalBudget.toLocaleString("fr-FR")} €
              </div>
            </div>
            <div className="text-sm font-bold" style={{ color: "#10b981" }}>
              {((totalSpent / totalBudget) * 100).toFixed(1)}%
            </div>
          </div>
          <div className="progress-track" style={{ height: "8px" }}>
            <div className="progress-fill" style={{
              width: `${(totalSpent / totalBudget) * 100}%`,
              background: "linear-gradient(90deg, #10b981, #059669)",
            }} />
          </div>
          {overBudget.length > 0 && (
            <div className="flex items-center gap-2 mt-3 text-xs" style={{ color: "#f59e0b" }}>
              <AlertCircle size={13} />
              {overBudget.length} catégorie{overBudget.length > 1 ? "s" : ""} dépassent le budget
            </div>
          )}
        </div>

        {/* Category breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {budgetCategories.map((cat) => {
            const pct      = cat.budget > 0 ? (cat.spent / cat.budget) * 100 : 0;
            const over     = cat.spent > cat.budget;
            const left     = cat.budget - cat.spent;
            const barColor = over ? "#ef4444" : pct > 80 ? "#f59e0b" : cat.color;

            return (
              <div key={cat.name} className="rounded-2xl p-5 card-hover" style={{
                background: "#0d1526", border: `1px solid ${over ? "rgba(239,68,68,0.15)" : "rgba(255,255,255,0.05)"}`,
              }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{
                    background: `${cat.color}15`, border: `1px solid ${cat.color}25`,
                  }}>{cat.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-200">{cat.name}</span>
                      {over
                        ? <span className="badge badge-down"><AlertCircle size={9} /> Dépassé</span>
                        : pct >= 100
                          ? <span className="badge badge-down">Atteint</span>
                          : <span className="badge badge-up"><CheckCircle size={9} /> OK</span>
                      }
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: "#475569" }}>
                      {cat.spent.toLocaleString("fr-FR")} € / {cat.budget.toLocaleString("fr-FR")} €
                    </div>
                  </div>
                </div>

                <div className="progress-track mb-2">
                  <div className="progress-fill" style={{
                    width: `${Math.min(pct, 100)}%`,
                    background: `linear-gradient(90deg, ${barColor}99, ${barColor})`,
                  }} />
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span style={{ color: "#334155" }}>{pct.toFixed(0)}% utilisé</span>
                  <span style={{ color: left >= 0 ? "#10b981" : "#ef4444" }}>
                    {left >= 0 ? `${left.toLocaleString("fr-FR")} € restants` : `${Math.abs(left).toLocaleString("fr-FR")} € de dépassement`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tips */}
        <div className="rounded-2xl p-5" style={{
          background: "linear-gradient(135deg, #0d1f3c, #0a1221)",
          border: "1px solid rgba(16,185,129,0.12)",
        }}>
          <div className="flex items-center gap-2 mb-4">
            <TrendingDown size={17} style={{ color: "#10b981" }} />
            <span className="font-semibold text-white">Conseils pour économiser davantage</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs" style={{ color: "#475569" }}>
            <div className="flex gap-2"><span>💡</span><span>Vos dépenses restaurants représentent 31% de votre budget loisirs. Cuisiner 2 soirs de plus par semaine pourrait économiser ~60 €/mois.</span></div>
            <div className="flex gap-2"><span>📱</span><span>Vos abonnements sont bien maîtrisés à 57 € / 100 € budgétés. Pas d'action requise.</span></div>
            <div className="flex gap-2"><span>🚗</span><span>Les frais de transport sont dans l'enveloppe. Covoiturage 1x/semaine = ~20 €/mois d'économies supplémentaires.</span></div>
          </div>
        </div>
      </div>
    </>
  );
}
