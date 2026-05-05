"use client";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/theme";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const dark = theme === "dark";

  return (
    <motion.button
      onClick={toggle}
      whileTap={{ scale: 0.9 }}
      className="relative w-14 h-7 rounded-full flex items-center px-1 cursor-pointer transition-colors"
      style={{
        background: dark ? "rgba(16,185,129,0.2)" : "rgba(251,191,36,0.2)",
        border: dark ? "1px solid rgba(16,185,129,0.3)" : "1px solid rgba(251,191,36,0.3)",
      }}
      title={dark ? "Passer en mode clair" : "Passer en mode sombre"}
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className="absolute w-5 h-5 rounded-full flex items-center justify-center"
        style={{
          background: dark ? "#10b981" : "#f59e0b",
          left: dark ? "4px" : "calc(100% - 24px)",
          boxShadow: dark ? "0 0 10px rgba(16,185,129,0.5)" : "0 0 10px rgba(245,158,11,0.5)",
        }}
      >
        {dark ? <Moon size={11} color="white" /> : <Sun size={11} color="white" />}
      </motion.div>
    </motion.button>
  );
}
