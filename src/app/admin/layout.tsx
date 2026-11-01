import React from "react";
import { isAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  LayoutDashboard,
  Newspaper,
  Users,
  Trophy,
  LogOut,
  ExternalLink,
  Shield,
} from "lucide-react";
import { logoutAdminAction } from "./actions";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuth = await isAuthenticated();

  // If viewing login page, render children directly without admin layout chrome
  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col md:flex-row">
      {isAuth && (
        <aside className="w-full md:w-64 bg-brand-card border-r border-brand-cardBorder p-6 flex flex-col justify-between shrink-0">
          <div className="space-y-6">
            {/* Club Brand */}
            <div className="flex items-center gap-3 pb-6 border-b border-zinc-800">
              <img
                src="/image/bayrampaşa logo.png"
                alt="Logo"
                className="w-10 h-10 object-contain"
              />
              <div>
                <span className="block text-sm font-bold text-white uppercase font-heading">
                  YÖNETİM PANELİ
                </span>
                <span className="block text-[10px] text-brand-red font-semibold uppercase">
                  Bayrampaşa Yenidoğan SK
                </span>
              </div>
            </div>

            {/* Navigation links */}
            <nav className="space-y-1.5 text-xs font-semibold">
              <a
                href="/admin"
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-850 hover:bg-zinc-800 transition"
              >
                <LayoutDashboard className="w-4 h-4 text-brand-red" />
                Genel Bakış
              </a>
              <a
                href="/admin/haberler"
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-800 transition"
              >
                <Newspaper className="w-4 h-4 text-brand-red" />
                Haber Yönetimi
              </a>
              <a
                href="/admin/oyuncular"
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-800 transition"
              >
                <Users className="w-4 h-4 text-brand-red" />
                Oyuncu Kadrosu
              </a>
              <a
                href="/admin/maclar"
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-800 transition"
              >
                <Trophy className="w-4 h-4 text-brand-red" />
                Maç & Skor Yönetimi
              </a>
            </nav>
          </div>

          <div className="pt-6 border-t border-zinc-800 space-y-2">
            <a
              href="/"
              target="_blank"
              className="flex items-center justify-between px-3.5 py-2 rounded-lg text-xs font-semibold text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
            >
              <span>Siteyi Görüntüle</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <form action={logoutAdminAction}>
              <button
                type="submit"
                className="w-full flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-950/40 transition cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                Oturumu Kapat
              </button>
            </form>
          </div>
        </aside>
      )}

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">{children}</main>
    </div>
  );
}
