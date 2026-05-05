"use client";
import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function AnimatedCard({ children, delay = 0, className = "", style }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0,  scale: 1 }}
      transition={{ duration: 0.45, delay, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
