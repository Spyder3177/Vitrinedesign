import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "FinanceOS – Gestion Financière Premium",
  description: "Application de gestion financière personnelle",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <div className="flex min-h-screen bg-grid">
          {/* Ambient blobs */}
          <div style={{
            position: "fixed", top: "-200px", right: "-200px",
            width: "600px", height: "600px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)",
            pointerEvents: "none", zIndex: 0,
          }} />
          <div style={{
            position: "fixed", bottom: "-200px", left: "100px",
            width: "500px", height: "500px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)",
            pointerEvents: "none", zIndex: 0,
          }} />
          <Sidebar />
          <main className="flex-1 flex flex-col min-h-screen relative" style={{ zIndex: 1, minWidth: 0 }}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
