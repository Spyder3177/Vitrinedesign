"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Topbar from "@/components/Topbar";
import AnimatedCard from "@/components/AnimatedCard";
import { Target, Plus, Trophy, Home, Plane, Car, GraduationCap, Heart, Wallet } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Home, Plane, Car, GraduationCap, Heart, Wallet, Trophy,
};

const initialGoals = [
  {
    id: 1, name: "Apport immobilier", icon: "Home", color: "#10b981",
    target: 60_000, saved: 38_400, deadline: "Déc. 2027",
    description: "Apport pour un appartement à Lyon",
  },
  {
    id: 2, name: "Voyage Japon", icon: "Plane", color: "#3b82f6",
    target: 5_000, saved: 3_200, deadline: "Avr. 2027",
    description: "Voyage de 3 semaines en automne",
  },
  {
    id: 3, name: "Voiture électrique", icon: "Car", color: "#8b5cf6",
    target: 15_000, saved: 4_800, deadline: "Jan. 2028",
    description: "Apport pour leasing Tesla Model 3",
  },
  {
    id: 4, name: "Fonds d'urgence", icon: "Wallet", color: "#f59e0b",
    target: 20_000, saved: 20_000, deadline: "Atteint ✓",
    description: "6 mois de dépenses de précaution",
  },
  {
    id: 5, name: "Formation MBA", icon: "GraduationCap", color: "#ec4899",
    target: 25_000, saved: 8_100, deadline: "Sep. 2028",
    description: "Executive MBA à l'ESSEC",
  },
  {
    id: 6, name: "Retraite anticipée", icon: "Trophy", color: "#f97316",
    target: 500_000, saved: 284_750, deadline: "2042",
    description: "Objectif FIRE à 50 ans",
  },
];

function GoalCard({ goal, delay }: { goal: typeof initialGoals[0]; delay: number }) {
  const Icon = iconMap[goal.icon] ?? Target;
  const pct   = Math.min((goal.saved / goal.target) * 100, 100);
  const done  = goal.saved >= goal.target;
  const left  = goal.target - goal.saved;
  const monthsLeft = done ? 0 : Math.ceil(left / 1000);

  return (
    <AnimatedCard delay={delay}>
      <div className="rounded-2xl p-5 h-full" style={{
        background: "var(--bg-card)",
        border: `1px solid ${done ? goal.color + "30" : "var(--border)"}`,
        boxShadow: done ? `0 0 30px ${goal.color}15` : "none",
      }}>
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{
              background: `${goal.color}15`, border: `1px solid ${goal.color}25`,
            }}>
              <Icon size={19} style={{ color: goal.color }} />
            </div>
            <div>
              <div className="font-semibold" style={{ color: "var(--text-1)" }}>{goal.name}</div>
              <div className="text-xs mt-0.5" style={{ color: "var(--text-3)" }}>{goal.description}</div>
            </div>
          </div>
          {done && (
            <motion.span
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-lg"
            >🎉</motion.span>
          )}
        </div>

        {/* Amounts */}
        <div className="flex items-baseline justify-between mb-3">
          <div>
            <span className="text-xl font-bold num" style={{ color: goal.color }}>
              {goal.saved.toLocaleString("fr-FR")} €
            </span>
            <span className="text-sm ml-1" style={{ color: "var(--text-3)" }}>
              / {goal.target.toLocaleString("fr-FR")} €
            </span>
          </div>
          <span className="text-sm font-bold" style={{ color: done ? goal.color : "var(--text-2)" }}>
            {pct.toFixed(0)}%
          </span>
        </div>

        {/* Progress */}
        <div className="progress-track mb-3">
          <motion.div
            className="progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 1.2, delay: delay + 0.2, ease: [0.4, 0, 0.2, 1] }}
            style={{ background: `linear-gradient(90deg, ${goal.color}80, ${goal.color})` }}
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs" style={{ color: "var(--text-3)" }}>
          <span>Échéance : {goal.deadline}</span>
          {!done && (
            <span style={{ color: "var(--text-4)" }}>
              ~{left.toLocaleString("fr-FR")} € restants
            </span>
          )}
          {done && <span style={{ color: goal.color }}>Objectif atteint !</span>}
        </div>
      </div>
    </AnimatedCard>
  );
}

export default function Objectifs() {
  const [goals] = useState(initialGoals);
  const totalSaved  = goals.reduce((s, g) => s + g.saved, 0);
  const totalTarget = goals.reduce((s, g) => s + g.target, 0);
  const completed   = goals.filter((g) => g.saved >= g.target).length;

  return (
    <>
      <Topbar title="Objectifs" subtitle="Suivi de vos projets d'épargne" />
      <div className="flex-1 p-6 space-y-6">

        {/* Overview */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total épargné",    value: `${totalSaved.toLocaleString("fr-FR")} €`,  color: "#10b981" },
            { label: "Objectif global",  value: `${totalTarget.toLocaleString("fr-FR")} €`, color: "var(--text-1)" },
            { label: "Objectifs atteints",value: `${completed} / ${goals.length}`,          color: "#f59e0b" },
          ].map((s, i) => (
            <AnimatedCard key={s.label} delay={i * 0.08}>
              <div className="rounded-2xl p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                <div className="text-xs mb-2" style={{ color: "var(--text-3)" }}>{s.label}</div>
                <div className="text-2xl font-bold num" style={{ color: s.color }}>{s.value}</div>
              </div>
            </AnimatedCard>
          ))}
        </div>

        {/* Global progress */}
        <AnimatedCard delay={0.25}>
          <div className="rounded-2xl p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <div className="flex justify-between mb-2">
              <div className="font-semibold" style={{ color: "var(--text-1)" }}>Progression globale</div>
              <span className="text-sm font-bold" style={{ color: "#10b981" }}>
                {((totalSaved / totalTarget) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="progress-track" style={{ height: "10px" }}>
              <motion.div
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${(totalSaved / totalTarget) * 100}%` }}
                transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
                style={{ background: "linear-gradient(90deg, #10b981, #059669)" }}
              />
            </div>
            <div className="mt-2 text-xs" style={{ color: "var(--text-3)" }}>
              {totalSaved.toLocaleString("fr-FR")} € sur {totalTarget.toLocaleString("fr-FR")} €
            </div>
          </div>
        </AnimatedCard>

        {/* Goals grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {goals.map((goal, i) => (
            <GoalCard key={goal.id} goal={goal} delay={0.3 + i * 0.07} />
          ))}
        </div>

        {/* Add goal CTA */}
        <AnimatedCard delay={0.7}>
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="rounded-2xl p-6 flex items-center justify-center gap-3 cursor-pointer transition-all"
            style={{
              background: "rgba(16,185,129,0.05)",
              border: "2px dashed rgba(16,185,129,0.2)",
            }}
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(16,185,129,0.1)" }}>
              <Plus size={18} style={{ color: "#10b981" }} />
            </div>
            <span className="font-medium" style={{ color: "#10b981" }}>Ajouter un nouvel objectif</span>
          </motion.div>
        </AnimatedCard>
      </div>
    </>
  );
}
