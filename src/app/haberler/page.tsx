import React from "react";
import prisma from "@/lib/prisma";
import SectionHeading from "@/components/ui/SectionHeading";
import { Calendar, Tag, ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Haberler & Resmî Duyurular",
  description:
    "Bayrampaşa Yenidoğan Spor Kulübü son dakika haberleri, transfer gelişmeleri, maç önü ve maç sonu açıklamaları.",
};

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ kategori?: string }>;
}) {
  const { kategori } = await searchParams;

  const [categories, newsList] = await Promise.all([
    prisma.newsCategory.findMany(),
    prisma.news.findMany({
      where: {
        isPublished: true,
        ...(kategori ? { category: { slug: kategori } } : {}),
      },
      orderBy: { publishedAt: "desc" },
      include: { category: true },
    }),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
      <SectionHeading
        badge="MEDYA MERKEZİ"
        title="Kulüp Haberleri & Resmî Açıklamalar"
        subtitle="Bayrampaşa Yenidoğan SK güncel gelişmeleri, transferler ve maç bültenleri."
      />

      {/* Category filter pills */}
      <div className="flex flex-wrap items-center gap-2 mb-10">
        <a
          href="/haberler"
          className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition ${
            !kategori
              ? "bg-brand-red text-white shadow-md shadow-brand-red/30"
              : "bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800"
          }`}
        >
          Tüm Haberler
        </a>
        {categories.map((cat) => (
          <a
            key={cat.id}
            href={`/haberler?kategori=${cat.slug}`}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition ${
              kategori === cat.slug
                ? "bg-brand-red text-white shadow-md shadow-brand-red/30"
                : "bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
          >
            {cat.name}
          </a>
        ))}
      </div>

      {/* News Grid */}
      {newsList.length === 0 ? (
        <div className="py-16 text-center text-zinc-500">
          Bu kategoride henüz yayınlanmış haber bulunamadı.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsList.map((item) => (
            <a
              key={item.id}
              href={`/haberler/${item.slug}`}
              className="group flex flex-col rounded-2xl bg-brand-card border border-brand-cardBorder overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-zinc-700"
            >
              {/* Image */}
              <div className="relative h-56 w-full overflow-hidden bg-zinc-900">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded bg-brand-red text-white text-[11px] font-bold uppercase tracking-wider font-heading shadow-md">
                  {item.category?.name || "Kulüp"}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2">
                    <Calendar className="w-3.5 h-3.5 text-brand-red" />
                    <span>{formatDate(item.publishedAt)}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white uppercase font-heading group-hover:text-brand-red transition line-clamp-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between text-xs font-bold text-brand-red group-hover:text-white transition uppercase tracking-wider">
                  <span>Haberi Oku</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
