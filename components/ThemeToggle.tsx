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
      whileTap={{ scale: 0.88 }}
      className="relative flex items-center rounded-full cursor-pointer"
      style={{
        width: "52px", height: "28px",
        background: dark
          ? "linear-gradient(135deg, #0d1526, #1a2438)"
          : "linear-gradient(135deg, #fef9c3, #fde68a)",
        border: dark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(251,191,36,0.4)",
        boxShadow: dark
          ? "inset 0 2px 4px rgba(0,0,0,0.4), 0 0 12px rgba(16,185,129,0.15)"
          : "inset 0 2px 4px rgba(0,0,0,0.06), 0 0 12px rgba(251,191,36,0.3)",
        padding: "3px",
      }}
      title={dark ? "Mode clair" : "Mode sombre"}
    >
      {/* Stars (dark) or Sun rays (light) */}
      <span className="absolute text-xs pointer-events-none" style={{
        right: "7px", opacity: dark ? 0.6 : 0, transition: "opacity 0.3s",
      }}>✦</span>
      <span className="absolute text-xs pointer-events-none" style={{
        left: "7px", opacity: !dark ? 0.7 : 0, transition: "opacity 0.3s", fontSize: "8px",
      }}>✦</span>

      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        className="w-5 h-5 rounded-full flex items-center justify-center"
        style={{
          background: dark
            ? "linear-gradient(135deg, #1e3a5f, #2d4f8a)"
            : "linear-gradient(135deg, #f59e0b, #f97316)",
          marginLeft: dark ? "0px" : "24px",
          boxShadow: dark
            ? "0 0 8px rgba(59,130,246,0.5), 0 2px 4px rgba(0,0,0,0.4)"
            : "0 0 8px rgba(245,158,11,0.6), 0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        {dark
          ? <Moon size={11} color="#93c5fd" />
          : <Sun size={11} color="white" />
        }
      </motion.div>
    </motion.button>
  );
}
