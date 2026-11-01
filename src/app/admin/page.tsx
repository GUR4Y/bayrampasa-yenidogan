import React from "react";
import prisma from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  Newspaper,
  Users,
  Trophy,
  Calendar,
  PlusCircle,
  ExternalLink,
  ShieldAlert,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

export default async function AdminDashboardPage() {
  const isAuth = await isAuthenticated();
  if (!isAuth) {
    redirect("/admin/login");
  }

  const [newsCount, playerCount, matchesCount, standingsClub, recentNews] =
    await Promise.all([
      prisma.news.count(),
      prisma.player.count(),
      prisma.match.count(),
      prisma.standings.findFirst({ where: { isClub: true } }),
      prisma.news.findMany({
        take: 5,
        orderBy: { publishedAt: "desc" },
        include: { category: true },
      }),
    ]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl md:text-3xl font-black uppercase text-white font-heading">
            Yönetim Gösterge Paneli
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Bayrampaşa Yenidoğan Spor Kulübü dijital varlık ve içerik kontrol merkezi.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/admin/haberler"
            className="px-4 py-2 rounded-xl bg-brand-red hover:bg-brand-redDark text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-brand-red/30 transition flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            Haber Ekle
          </a>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-brand-card border border-brand-cardBorder shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Yayındaki Haberler
            </span>
            <Newspaper className="w-5 h-5 text-brand-red" />
          </div>
          <span className="block text-3xl font-black text-white font-heading mt-3">
            {newsCount}
          </span>
          <span className="text-[11px] text-zinc-500 mt-1 block">Aktif kulüp duyurusu</span>
        </div>

        <div className="p-6 rounded-2xl bg-brand-card border border-brand-cardBorder shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Kayıtlı Oyuncular
            </span>
            <Users className="w-5 h-5 text-brand-red" />
          </div>
          <span className="block text-3xl font-black text-white font-heading mt-3">
            {playerCount}
          </span>
          <span className="text-[11px] text-zinc-500 mt-1 block">A Takım ve Kadın Kadrosu</span>
        </div>

        <div className="p-6 rounded-2xl bg-brand-card border border-brand-cardBorder shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Fikstürdeki Maçlar
            </span>
            <Calendar className="w-5 h-5 text-brand-red" />
          </div>
          <span className="block text-3xl font-black text-white font-heading mt-3">
            {matchesCount}
          </span>
          <span className="text-[11px] text-zinc-500 mt-1 block">Sezon müsabakaları</span>
        </div>

        <div className="p-6 rounded-2xl bg-brand-card border border-brand-cardBorder shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Lig Puanı & Sıra
            </span>
            <Trophy className="w-5 h-5 text-brand-red" />
          </div>
          <span className="block text-3xl font-black text-brand-red font-heading mt-3">
            {standingsClub ? `${standingsClub.points} Puan (#${standingsClub.position})` : "—"}
          </span>
          <span className="text-[11px] text-zinc-500 mt-1 block">İstanbul Süper Amatör Lig</span>
        </div>
      </div>

      {/* Recent News Management Quick Table */}
      <div className="rounded-2xl bg-brand-card border border-brand-cardBorder p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <h2 className="text-base font-bold uppercase text-white font-heading">
            Son Eklenen Haberler
          </h2>
          <a
            href="/admin/haberler"
            className="text-xs font-bold text-brand-red hover:text-white uppercase transition"
          >
            Tümünü Yönet &rarr;
          </a>
        </div>

        <div className="divide-y divide-zinc-800 text-xs">
          {recentNews.map((n) => (
            <div key={n.id} className="py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={n.imageUrl}
                  alt={n.title}
                  className="w-10 h-10 rounded-lg object-cover bg-zinc-900 shrink-0"
                />
                <div>
                  <h4 className="font-bold text-white uppercase font-heading line-clamp-1">
                    {n.title}
                  </h4>
                  <span className="text-[10px] text-zinc-400">
                    {n.category?.name || "Kategori Yok"} &bull; {formatDate(n.publishedAt)}
                  </span>
                </div>
              </div>

              <span className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800 text-emerald-400 text-[10px] font-bold uppercase shrink-0">
                Yayında
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
