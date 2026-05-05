"use client";
import { motion } from "framer-motion";

export function SkeletonBlock({ w = "100%", h = "16px", rounded = "8px" }: { w?: string; h?: string; rounded?: string }) {
  return (
    <motion.div
      animate={{ opacity: [0.4, 0.8, 0.4] }}
      transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      style={{ width: w, height: h, borderRadius: rounded, background: "linear-gradient(90deg, #111827, #1a2438, #111827)", backgroundSize: "400% 100%" }}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="rounded-2xl p-5 space-y-3" style={{ background: "#0d1526", border: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="flex justify-between items-start">
        <SkeletonBlock w="40%" h="12px" />
        <SkeletonBlock w="48px" h="20px" rounded="99px" />
      </div>
      <SkeletonBlock w="60%" h="28px" rounded="6px" />
      <SkeletonBlock w="35%" h="10px" />
      <SkeletonBlock w="100%" h="4px" rounded="99px" />
    </div>
  );
}

export function SkeletonChart() {
  return (
    <div className="rounded-2xl p-5" style={{ background: "#0d1526", border: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="flex justify-between mb-5">
        <div className="space-y-2">
          <SkeletonBlock w="140px" h="14px" />
          <SkeletonBlock w="100px" h="10px" />
        </div>
        <div className="flex gap-2">
          {[0,1,2,3].map(i => <SkeletonBlock key={i} w="32px" h="28px" rounded="8px" />)}
        </div>
      </div>
      <SkeletonBlock w="100%" h="220px" rounded="12px" />
    </div>
  );
}
