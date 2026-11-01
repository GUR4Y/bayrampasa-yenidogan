import React from "react";
import prisma from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";
import { createNewsAction, deleteNewsAction } from "../actions";
import { Newspaper, Plus, Trash2, Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default async function AdminNewsPage() {
  const isAuth = await isAuthenticated();
  if (!isAuth) redirect("/admin/login");

  const [newsList, categories] = await Promise.all([
    prisma.news.findMany({
      orderBy: { publishedAt: "desc" },
      include: { category: true },
    }),
    prisma.newsCategory.findMany(),
  ]);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-black uppercase text-white font-heading">
          Haber & Duyuru Yönetimi
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Kulüp resmî haberlerini yayınlayın, güncelleyin veya yayından kaldırın.
        </p>
      </div>

      {/* Add News Form Card */}
      <div className="p-6 rounded-2xl bg-brand-card border border-brand-cardBorder shadow-xl space-y-4">
        <h3 className="text-base font-bold uppercase text-white font-heading flex items-center gap-2 border-b border-zinc-800 pb-3">
          <Plus className="w-4 h-4 text-brand-red" />
          Yeni Haber / Duyuru Ekle
        </h3>

        <form action={createNewsAction} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block font-semibold text-zinc-300 mb-1 uppercase tracking-wider">
                Haber Başlığı *
              </label>
              <input
                type="text"
                name="title"
                required
                placeholder="Örn: Yeni Sezon Kombineleri Satışa Çıktı"
                className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-brand-red"
              />
            </div>
            <div>
              <label className="block font-semibold text-zinc-300 mb-1 uppercase tracking-wider">
                Kategori
              </label>
              <select
                name="categoryId"
                className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-brand-red"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-zinc-300 mb-1 uppercase tracking-wider">
              Kapak Görseli Yolu / URL
            </label>
            <input
              type="text"
              name="imageUrl"
              defaultValue="/image/1920x700 erkek takım.jpg"
              placeholder="/image/dosya-adi.jpg veya web URL"
              className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-brand-red"
            />
          </div>

          <div>
            <label className="block font-semibold text-zinc-300 mb-1 uppercase tracking-wider">
              Kısa Özet (Spot Metin) *
            </label>
            <textarea
              name="summary"
              rows={2}
              required
              placeholder="Ana sayfada ve listelerde görünecek kısa özet..."
              className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-brand-red resize-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-zinc-300 mb-1 uppercase tracking-wider">
              Haberin Tam İçeriği *
            </label>
            <textarea
              name="content"
              rows={4}
              required
              placeholder="Haberin detaylı içeriğini giriniz..."
              className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-brand-red"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg bg-brand-red hover:bg-brand-redDark text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-brand-red/30 transition cursor-pointer"
          >
            Haberi Yayınla
          </button>
        </form>
      </div>

      {/* News List */}
      <div className="rounded-2xl bg-brand-card border border-brand-cardBorder overflow-hidden shadow-xl">
        <div className="p-4 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between">
          <span className="text-xs font-bold uppercase text-white font-heading">
            Tüm Haberler ({newsList.length})
          </span>
        </div>

        <div className="divide-y divide-zinc-800 text-xs">
          {newsList.map((item) => (
            <div key={item.id} className="p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-16 h-12 rounded-lg object-cover bg-zinc-900 shrink-0"
                />
                <div>
                  <h4 className="font-bold text-white uppercase font-heading text-sm line-clamp-1">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-3 text-zinc-400 mt-1 text-[11px]">
                    <span className="text-brand-red font-semibold">
                      {item.category?.name || "Kategori Yok"}
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(item.publishedAt)}
                    </span>
                  </div>
                </div>
              </div>

              <form action={deleteNewsAction.bind(null, item.id)}>
                <button
                  type="submit"
                  className="p-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-950/30 transition cursor-pointer"
                  title="Haberi Sil"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
