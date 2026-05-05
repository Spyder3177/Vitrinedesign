"use client";
import { motion } from "framer-motion";
import { transactions } from "@/lib/data";
import { ArrowUpRight, ArrowDownRight, ArrowLeftRight } from "lucide-react";
import Link from "next/link";

export default function RecentTransactions({ limit = 8 }: { limit?: number }) {
  const items = transactions.slice(0, limit);
  return (
    <div className="rounded-2xl p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="font-semibold" style={{ color: "var(--text-1)" }}>Dernières transactions</div>
          <div className="text-xs mt-0.5" style={{ color: "var(--text-3)" }}>{items.length} opérations récentes</div>
        </div>
        <Link href="/transactions" className="text-xs px-3 py-1.5 rounded-lg font-medium transition-all hover:opacity-80" style={{
          background: "rgba(16,185,129,0.1)", color: "#10b981",
          border: "1px solid rgba(16,185,129,0.2)",
        }}>Voir tout</Link>
      </div>

      <div className="space-y-1">
        {items.map((tx, i) => (
          <motion.div
            key={tx.id}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            whileHover={{ x: 4, transition: { duration: 0.15 } }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-default"
            style={{ background: "transparent" }}
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0" style={{
              background: "var(--input-bg)", border: "1px solid var(--border)",
            }}>
              {tx.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate" style={{ color: "var(--text-1)" }}>{tx.label}</div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs" style={{ color: "var(--text-4)" }}>{tx.date}</span>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{
                  background: "var(--input-bg)", color: "var(--text-3)",
                }}>{tx.category}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              {tx.type === "income"   && <ArrowDownRight size={14} style={{ color: "#10b981" }} />}
              {tx.type === "expense"  && <ArrowUpRight   size={14} style={{ color: "#ef4444" }} />}
              {tx.type === "transfer" && <ArrowLeftRight  size={14} style={{ color: "#3b82f6" }} />}
              <span className="text-sm font-bold num" style={{
                color: tx.type === "income" ? "#10b981" : tx.type === "expense" ? "#ef4444" : "#3b82f6",
              }}>
                {tx.amount > 0 ? "+" : ""}{tx.amount.toLocaleString("fr-FR")} €
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
