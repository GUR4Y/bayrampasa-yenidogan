import React from "react";
import { Calendar, ArrowRight, Tag } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface NewsItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  imageUrl: string;
  publishedAt: Date | string;
  isFeatured?: boolean;
  category?: {
    name: string;
  } | null;
}

interface LatestNewsProps {
  news: NewsItem[];
}

export default function LatestNewsSection({ news }: LatestNewsProps) {
  if (!news || news.length === 0) {
    return (
      <div className="py-8 text-center text-zinc-500 text-sm">
        Henüz yayınlanmış bir haber bulunmuyor.
      </div>
    );
  }

  const featured = news[0];
  const sideArticles = news.slice(1, 4);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Featured Headline Article */}
      <div className="lg:col-span-7">
        <a
          href={`/haberler/${featured.slug}`}
          className="group block relative h-[420px] md:h-[480px] rounded-2xl overflow-hidden border border-brand-cardBorder bg-brand-card shadow-2xl transition transform hover:-translate-y-1"
        >
          {/* Background Image */}
          <img
            src={featured.imageUrl}
            alt={featured.title}
            className="w-full h-full object-cover filter brightness-[0.7] group-hover:scale-105 group-hover:brightness-[0.8] transition-all duration-500"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

          {/* Content */}
          <div className="absolute bottom-0 inset-x-0 p-6 md:p-8 flex flex-col justify-end">
            <div className="flex items-center gap-3 mb-3">
              <span className="px-2.5 py-0.5 rounded bg-brand-red text-white text-xs font-bold uppercase tracking-wider font-heading">
                {featured.category?.name || "Kulüp"}
              </span>
              <span className="flex items-center gap-1 text-xs text-zinc-300">
                <Calendar className="w-3.5 h-3.5 text-brand-red" />
                {formatDate(featured.publishedAt)}
              </span>
            </div>

            <h3 className="text-xl md:text-2xl lg:text-3xl font-extrabold uppercase text-white font-heading leading-tight group-hover:text-brand-red transition">
              {featured.title}
            </h3>

            <p className="mt-2 text-sm text-zinc-300 line-clamp-2 leading-relaxed">
              {featured.summary}
            </p>

            <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-white uppercase tracking-wider group-hover:text-brand-red transition">
              Devamını Oku <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </a>
      </div>

      {/* Side Articles List */}
      <div className="lg:col-span-5 flex flex-col gap-4">
        {sideArticles.map((item) => (
          <a
            key={item.id}
            href={`/haberler/${item.slug}`}
            className="group flex gap-4 p-4 rounded-xl bg-brand-card border border-brand-cardBorder hover:border-zinc-700 transition shadow-md hover:-translate-y-0.5"
          >
            {/* Thumbnail */}
            <div className="w-28 h-24 md:w-32 md:h-24 rounded-lg overflow-hidden shrink-0 relative bg-zinc-900">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
            </div>

            {/* Info */}
            <div className="flex flex-col justify-between py-0.5">
              <div>
                <div className="flex items-center gap-2 text-[11px] text-zinc-400 mb-1">
                  <span className="text-brand-red font-semibold uppercase">
                    {item.category?.name || "Haber"}
                  </span>
                  <span>&bull;</span>
                  <span>{formatDate(item.publishedAt)}</span>
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-brand-red transition line-clamp-2 uppercase font-heading leading-snug">
                  {item.title}
                </h4>
              </div>

              <span className="text-[11px] font-semibold text-zinc-400 group-hover:text-white flex items-center gap-1 transition">
                Oku <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
