"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, BarChart3, ArrowLeftRight,
  PiggyBank, Briefcase, Settings, Bell, ChevronRight,
  TrendingUp, Target, X, Menu,
} from "lucide-react";
import { useState } from "react";
import NotificationsPanel from "./NotificationsPanel";

const links = [
  { href: "/",              label: "Dashboard",     icon: LayoutDashboard },
  { href: "/analytics",    label: "Analytiques",   icon: BarChart3 },
  { href: "/transactions", label: "Transactions",  icon: ArrowLeftRight },
  { href: "/budget",       label: "Budget",        icon: PiggyBank },
  { href: "/portfolio",    label: "Portefeuille",  icon: Briefcase },
  { href: "/objectifs",    label: "Objectifs",     icon: Target },
  { href: "/simulateur",   label: "Simulateur",    icon: TrendingUp },
];

const accounts = [
  { name: "Compte Courant",  bank: "BNP Paribas",      balance: "12 840 €", dot: "#10b981" },
  { name: "Livret A",        bank: "Caisse d'Épargne", balance: "22 950 €", dot: "#3b82f6" },
  { name: "CTO",             bank: "Degiro",            balance: "89 320 €", dot: "#8b5cf6" },
  { name: "PEA",             bank: "Boursorama",        balance: "68 140 €", dot: "#f59e0b" },
];

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-3 px-6 py-6">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{
          background: "linear-gradient(135deg, #10b981, #059669)",
          boxShadow: "0 0 20px rgba(16,185,129,0.4)",
        }}>
          <TrendingUp size={18} color="white" />
        </div>
        <div>
          <div className="text-sm font-bold text-white tracking-wide">FinanceOS</div>
          <div className="text-xs" style={{ color: "#475569" }}>Pro Edition</div>
        </div>
        {onClose && (
          <button onClick={onClose} className="ml-auto p-1 rounded-lg hover:bg-white/10 transition-colors" style={{ color: "#475569" }}>
            <X size={18} />
          </button>
        )}
      </div>

      <nav className="flex-1 px-3 mt-2 overflow-y-auto">
        <div className="text-xs font-semibold px-3 mb-2" style={{ color: "#334155", letterSpacing: "0.08em" }}>
          MENU PRINCIPAL
        </div>
        {links.map(({ href, label, icon: Icon }, i) => {
          const active = pathname === href;
          return (
            <motion.div
              key={href}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
            >
              <Link
                href={href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm font-medium transition-all duration-200 group ${
                  active ? "nav-active" : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                }`}
                style={active ? { borderLeft: "2px solid #10b981", paddingLeft: "10px" } : { paddingLeft: "12px" }}
              >
                <Icon size={17} />
                <span className="flex-1">{label}</span>
                {active && <ChevronRight size={14} />}
              </Link>
            </motion.div>
          );
        })}

        <div className="mt-6 mb-2 text-xs font-semibold px-3" style={{ color: "#334155", letterSpacing: "0.08em" }}>
          MES COMPTES
        </div>
        {accounts.map((acc, i) => (
          <motion.div
            key={acc.name}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 + i * 0.05 }}
            className="flex items-center gap-3 px-3 py-2 rounded-lg mb-0.5 cursor-pointer transition-all hover:bg-white/5"
          >
            <div className="w-2 h-2 rounded-full shrink-0 pulse-dot" style={{ background: acc.dot }} />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-slate-300 truncate">{acc.name}</div>
              <div className="text-xs truncate" style={{ color: "#475569" }}>{acc.bank}</div>
            </div>
            <div className="text-xs font-semibold num" style={{ color: "#94a3b8" }}>{acc.balance}</div>
          </motion.div>
        ))}
      </nav>

      <div className="p-3 space-y-1">
        <button
          onClick={() => setNotifOpen(true)}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-slate-400 hover:bg-white/5 hover:text-slate-200 transition-all text-sm"
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
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-slate-400 hover:bg-white/5 hover:text-slate-200 transition-all text-sm">
          <Settings size={17} />
          <span>Paramètres</span>
        </div>

        <div className="mt-3 flex items-center gap-3 px-3 py-3 rounded-xl" style={{
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
        }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
            style={{ background: "linear-gradient(135deg, #8b5cf6, #6d28d9)" }}>A</div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-slate-200 truncate">Alexandre M.</div>
            <div className="text-xs truncate" style={{ color: "#475569" }}>Plan Premium</div>
          </div>
        </div>
      </div>

      <NotificationsPanel open={notifOpen} onClose={() => setNotifOpen(false)} />
    </>
  );
}

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop */}
      <aside className="hidden lg:flex flex-col w-64 min-h-screen shrink-0" style={{
        background: "linear-gradient(180deg, #0d1526 0%, #080e1c 100%)",
        borderRight: "1px solid rgba(255,255,255,0.05)",
      }}>
        <SidebarContent />
      </aside>

      {/* Mobile trigger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ background: "#0d1526", border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8" }}
      >
        <Menu size={20} />
      </button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 z-40"
              style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
            />
            <motion.aside
              key="drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 z-50 flex flex-col w-72"
              style={{
                background: "linear-gradient(180deg, #0d1526 0%, #080e1c 100%)",
                borderRight: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <SidebarContent onClose={() => setMobileOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
