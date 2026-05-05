"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";

const pageOrder = ["/", "/analytics", "/transactions", "/budget", "/portfolio", "/objectifs", "/simulateur"];

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router   = useRouter();

  const currentIndex = pageOrder.indexOf(pathname);

  function handleDragEnd(_: any, info: { offset: { x: number }; velocity: { x: number } }) {
    const swipe = Math.abs(info.offset.x) > 60 || Math.abs(info.velocity.x) > 300;
    if (!swipe) return;
    if (info.offset.x < 0 && currentIndex < pageOrder.length - 1) {
      router.push(pageOrder[currentIndex + 1]);
    } else if (info.offset.x > 0 && currentIndex > 0) {
      router.push(pageOrder[currentIndex - 1]);
    }
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { duration: 0.28, ease: "easeOut" } }}
        exit={{ opacity: 0, x: -10, transition: { duration: 0.18 } }}
        drag={currentIndex !== -1 ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.12}
        onDragEnd={handleDragEnd}
        className="flex-1 flex flex-col"
        style={{ touchAction: "pan-y" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
