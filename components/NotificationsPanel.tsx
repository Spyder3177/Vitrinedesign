"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, Bell, TrendingUp, AlertTriangle, CheckCircle, Info } from "lucide-react";

const notifications = [
  {
    id: 1, icon: TrendingUp, color: "#10b981", bg: "rgba(16,185,129,0.1)",
    title: "NVDA en hausse de +2.63%",
    body: "Votre position NVIDIA vaut maintenant 13 128 €. Plus-value latente : +1 842 €.",
    time: "Il y a 12 min", unread: true,
  },
  {
    id: 2, icon: AlertTriangle, color: "#f59e0b", bg: "rgba(245,158,11,0.1)",
    title: "Budget Restaurants à 31%",
    body: "Vous avez utilisé 94 € sur 300 € ce mois. Encore 206 € disponibles.",
    time: "Il y a 1h", unread: true,
  },
  {
    id: 3, icon: CheckCircle, color: "#3b82f6", bg: "rgba(59,130,246,0.1)",
    title: "Virement Livret A confirmé",
    body: "2 000 € virés avec succès vers votre Livret A. Solde : 22 950 €.",
    time: "Il y a 3h", unread: true,
  },
  {
    id: 4, icon: Info, color: "#8b5cf6", bg: "rgba(139,92,246,0.1)",
    title: "Rapport mensuel disponible",
    body: "Votre bilan d'avril 2026 est prêt. Taux d'épargne : 62.1%.",
    time: "Hier", unread: false,
  },
  {
    id: 5, icon: TrendingUp, color: "#10b981", bg: "rgba(16,185,129,0.1)",
    title: "Dividende Apple reçu",
    body: "198 € de dividendes Apple crédités sur votre CTO.",
    time: "Il y a 2 jours", unread: false,
  },
];

interface Props { open: boolean; onClose: () => void; }

export default function NotificationsPanel({ open, onClose }: Props) {
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50"
            style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
          />
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed right-4 top-4 bottom-4 z-50 flex flex-col rounded-2xl overflow-hidden"
            style={{
              width: "340px",
              background: "linear-gradient(180deg, #0d1526 0%, #080e1c 100%)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center gap-2">
                <Bell size={18} style={{ color: "#10b981" }} />
                <span className="font-semibold text-white">Notifications</span>
                {unreadCount > 0 && (
                  <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: "#10b981", color: "#fff" }}>
                    {unreadCount}
                  </span>
                )}
              </div>
              <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors" style={{ color: "#475569" }}>
                <X size={16} />
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between px-5 py-2">
              <button className="text-xs" style={{ color: "#475569" }}>Tout marquer comme lu</button>
              <button className="text-xs" style={{ color: "#475569" }}>Tout effacer</button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-1">
              {notifications.map((n, i) => {
                const Icon = n.icon;
                return (
                  <motion.div
                    key={n.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex gap-3 p-3 rounded-xl cursor-pointer transition-all hover:bg-white/5 relative"
                    style={{ background: n.unread ? "rgba(255,255,255,0.02)" : "transparent" }}
                  >
                    {n.unread && (
                      <div className="absolute top-3 right-3 w-2 h-2 rounded-full" style={{ background: "#10b981" }} />
                    )}
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: n.bg }}>
                      <Icon size={16} style={{ color: n.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-slate-200 mb-0.5">{n.title}</div>
                      <div className="text-xs leading-relaxed" style={{ color: "#475569" }}>{n.body}</div>
                      <div className="text-xs mt-1.5" style={{ color: "#334155" }}>{n.time}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="px-5 py-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <button className="w-full text-sm py-2 rounded-xl font-medium transition-all hover:opacity-80" style={{
                background: "rgba(16,185,129,0.1)", color: "#10b981",
                border: "1px solid rgba(16,185,129,0.2)",
              }}>
                Gérer les alertes
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
