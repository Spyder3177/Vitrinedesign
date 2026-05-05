"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  LayoutDashboard, ArrowLeftRight, PiggyBank,
  Briefcase, MoreHorizontal, BarChart3, Target, TrendingUp, X,
} from "lucide-react";

const mainTabs = [
  { href: "/",              label: "Accueil",      icon: LayoutDashboard },
  { href: "/transactions", label: "Transactions", icon: ArrowLeftRight },
  { href: "/budget",       label: "Budget",       icon: PiggyBank },
  { href: "/portfolio",    label: "Portefeuille", icon: Briefcase },
];

const moreTabs = [
  { href: "/analytics",   label: "Analytiques", icon: BarChart3 },
  { href: "/objectifs",   label: "Objectifs",   icon: Target },
  { href: "/simulateur",  label: "Simulateur",  icon: TrendingUp },
];

export default function BottomNav() {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);
  const isMore = moreTabs.some((t) => t.href === pathname);

  return (
    <>
      {/* "More" sheet */}
      <AnimatePresence>
        {moreOpen && (
          <>
            <motion.div
              key="sheet-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMoreOpen(false)}
              className="lg:hidden fixed inset-0 z-40"
              style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" }}
            />
            <motion.div
              key="sheet"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 36 }}
              className="lg:hidden fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl p-6 pb-10"
              style={{
                background: "var(--bg-sidebar)",
                border: "1px solid var(--border)",
                boxShadow: "0 -20px 60px rgba(0,0,0,0.4)",
              }}
            >
              {/* Handle */}
              <div className="w-10 h-1 rounded-full mx-auto mb-6" style={{ background: "var(--border)" }} />
              <div className="flex items-center justify-between mb-5">
                <span className="font-semibold" style={{ color: "var(--text-1)" }}>Plus de sections</span>
                <button onClick={() => setMoreOpen(false)} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "var(--input-bg)", color: "var(--text-3)" }}>
                  <X size={16} />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {moreTabs.map(({ href, label, icon: Icon }) => {
                  const active = pathname === href;
                  return (
                    <Link key={href} href={href} onClick={() => setMoreOpen(false)}>
                      <motion.div
                        whileTap={{ scale: 0.95 }}
                        className="flex flex-col items-center gap-2 p-4 rounded-2xl"
                        style={{
                          background: active ? "rgba(16,185,129,0.12)" : "var(--input-bg)",
                          border: `1px solid ${active ? "rgba(16,185,129,0.25)" : "var(--border)"}`,
                        }}
                      >
                        <Icon size={22} style={{ color: active ? "#10b981" : "var(--text-3)" }} />
                        <span className="text-xs font-medium" style={{ color: active ? "#10b981" : "var(--text-2)" }}>{label}</span>
                      </motion.div>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Bottom tab bar */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-30 flex items-center justify-around px-2"
        style={{
          height: "72px",
          background: "var(--bg-sidebar)",
          borderTop: "1px solid var(--border)",
          backdropFilter: "blur(20px)",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        {mainTabs.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href} className="flex-1 flex flex-col items-center justify-center gap-1 py-2 relative">
              <motion.div
                whileTap={{ scale: 0.85 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="flex flex-col items-center gap-1"
              >
                {active && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute -top-0.5 w-8 h-0.5 rounded-full"
                    style={{ background: "#10b981" }}
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
                <div className="w-6 h-6 flex items-center justify-center">
                  <Icon size={22} style={{ color: active ? "#10b981" : "var(--text-3)" }} strokeWidth={active ? 2.2 : 1.8} />
                </div>
                <span className="text-xs font-medium" style={{ color: active ? "#10b981" : "var(--text-3)", fontSize: "10px" }}>
                  {label}
                </span>
              </motion.div>
            </Link>
          );
        })}

        {/* More button */}
        <button className="flex-1 flex flex-col items-center justify-center gap-1 py-2 relative" onClick={() => setMoreOpen(true)}>
          <motion.div whileTap={{ scale: 0.85 }} className="flex flex-col items-center gap-1">
            {isMore && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute -top-0.5 w-8 h-0.5 rounded-full"
                style={{ background: "#10b981" }}
              />
            )}
            <div className="w-6 h-6 flex items-center justify-center">
              <MoreHorizontal size={22} style={{ color: isMore ? "#10b981" : "var(--text-3)" }} strokeWidth={isMore ? 2.2 : 1.8} />
            </div>
            <span className="text-xs font-medium" style={{ color: isMore ? "#10b981" : "var(--text-3)", fontSize: "10px" }}>
              Plus
            </span>
          </motion.div>
        </button>
      </nav>
    </>
  );
}
