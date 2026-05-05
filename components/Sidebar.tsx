"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard, BarChart3, ArrowLeftRight,
  PiggyBank, Briefcase, Settings, Bell, ChevronRight,
  TrendingUp, Target,
} from "lucide-react";
import { useState } from "react";
import NotificationsPanel from "./NotificationsPanel";

const links = [
  { href: "/",              label: "Dashboard",    icon: LayoutDashboard },
  { href: "/analytics",    label: "Analytiques",  icon: BarChart3 },
  { href: "/transactions", label: "Transactions", icon: ArrowLeftRight },
  { href: "/budget",       label: "Budget",       icon: PiggyBank },
  { href: "/portfolio",    label: "Portefeuille", icon: Briefcase },
  { href: "/objectifs",    label: "Objectifs",    icon: Target },
  { href: "/simulateur",   label: "Simulateur",   icon: TrendingUp },
];

const accounts = [
  { name: "Compte Courant",  bank: "BNP Paribas",      balance: "12 840 €", dot: "#10b981" },
  { name: "Livret A",        bank: "Caisse d'Épargne", balance: "22 950 €", dot: "#3b82f6" },
  { name: "CTO",             bank: "Degiro",            balance: "89 320 €", dot: "#8b5cf6" },
  { name: "PEA",             bank: "Boursorama",        balance: "68 140 €", dot: "#f59e0b" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <>
      {/* Desktop only */}
      <aside className="hidden lg:flex flex-col w-64 min-h-screen shrink-0" style={{
        background: "var(--bg-sidebar)",
        borderRight: "1px solid var(--border)",
      }}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-6">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{
            background: "linear-gradient(135deg, #10b981, #059669)",
            boxShadow: "0 0 20px rgba(16,185,129,0.35)",
          }}>
            <TrendingUp size={18} color="white" />
          </div>
          <div>
            <div className="text-sm font-bold tracking-wide" style={{ color: "var(--text-1)" }}>FinanceOS</div>
            <div className="text-xs" style={{ color: "var(--text-4)" }}>Pro Edition</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 mt-2 overflow-y-auto">
          <div className="text-xs font-semibold px-3 mb-2" style={{ color: "var(--text-4)", letterSpacing: "0.08em" }}>
            MENU PRINCIPAL
          </div>
          {links.map(({ href, label, icon: Icon }, i) => {
            const active = pathname === href;
            return (
              <motion.div
                key={href}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
              >
                <Link
                  href={href}
                  className={`flex items-center gap-3 py-2.5 rounded-lg mb-1 text-sm font-medium transition-all duration-200 ${
                    active ? "nav-active" : "hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                  style={{
                    paddingLeft: active ? "10px" : "12px",
                    paddingRight: "12px",
                    color: active ? "#10b981" : "var(--text-3)",
                    borderLeft: active ? "2px solid #10b981" : "2px solid transparent",
                  }}
                >
                  <Icon size={17} />
                  <span className="flex-1">{label}</span>
                  {active && <ChevronRight size={14} />}
                </Link>
              </motion.div>
            );
          })}

          <div className="mt-6 mb-2 text-xs font-semibold px-3" style={{ color: "var(--text-4)", letterSpacing: "0.08em" }}>
            MES COMPTES
          </div>
          {accounts.map((acc, i) => (
            <motion.div
              key={acc.name}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.04 }}
              className="flex items-center gap-3 px-3 py-2 rounded-lg mb-0.5 cursor-pointer transition-all hover:bg-black/5"
              style={{ "--tw-hover-bg": "var(--input-bg)" } as React.CSSProperties}
            >
              <div className="w-2 h-2 rounded-full shrink-0 pulse-dot" style={{ background: acc.dot }} />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium truncate" style={{ color: "var(--text-1)" }}>{acc.name}</div>
                <div className="text-xs truncate" style={{ color: "var(--text-4)" }}>{acc.bank}</div>
              </div>
              <div className="text-xs font-semibold num shrink-0" style={{ color: "var(--text-3)" }}>{acc.balance}</div>
            </motion.div>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-3 space-y-1">
          <button
            onClick={() => setNotifOpen(true)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm"
            style={{ color: "var(--text-3)" }}
          >
            <Bell size={17} />
            <span>Alertes</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="ml-auto text-xs px-2 py-0.5 rounded-full font-bold"
              style={{ background: "#10b981", color: "#fff" }}
            >3</motion.span>
          </button>
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all text-sm" style={{ color: "var(--text-3)" }}>
            <Settings size={17} />
            <span>Paramètres</span>
          </div>

          <div className="mt-3 flex items-center gap-3 px-3 py-3 rounded-xl" style={{
            background: "var(--input-bg)", border: "1px solid var(--border)",
          }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm text-white shrink-0"
              style={{ background: "linear-gradient(135deg, #8b5cf6, #6d28d9)" }}>A</div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold truncate" style={{ color: "var(--text-1)" }}>Alexandre M.</div>
              <div className="text-xs truncate" style={{ color: "var(--text-4)" }}>Plan Premium</div>
            </div>
          </div>
        </div>

        <NotificationsPanel open={notifOpen} onClose={() => setNotifOpen(false)} />
      </aside>
    </>
  );
}
