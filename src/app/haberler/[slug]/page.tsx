import React from "react";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Calendar, Tag, ArrowLeft, Share2, Shield } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const news = await prisma.news.findUnique({
    where: { slug },
  });

  if (!news) return { title: "Haber Bulunamadı" };

  return {
    title: news.title,
    description: news.summary,
    openGraph: {
      title: `${news.title} | Bayrampaşa Yenidoğan SK`,
      description: news.summary,
      images: [{ url: news.imageUrl }],
    },
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;

  const news = await prisma.news.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!news) {
    notFound();
  }

  // Related news
  const relatedNews = await prisma.news.findMany({
    where: {
      isPublished: true,
      NOT: { id: news.id },
    },
    take: 3,
    orderBy: { publishedAt: "desc" },
    include: { category: true },
  });

  return (
    <article className="max-w-4xl mx-auto px-4 lg:px-8 py-12">
      {/* JSON-LD Schema for NewsArticle */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: news.title,
            image: [news.imageUrl],
            datePublished: news.publishedAt.toISOString(),
            dateModified: news.updatedAt.toISOString(),
            author: {
              "@type": "Organization",
              name: "Bayrampaşa Yenidoğan Spor Kulübü",
            },
            publisher: {
              "@type": "Organization",
              name: "Bayrampaşa Yenidoğan Spor Kulübü",
              logo: {
                "@type": "ImageObject",
                url: "https://bayrampasa-yenidogan.org.tr/image/bayrampaşa logo.png",
              },
            },
            description: news.summary,
          }),
        }}
      />

      {/* Back Button & Category */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <a
          href="/haberler"
          className="inline-flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-white transition uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4 text-brand-red" />
          Haberlere Dön
        </a>

        <span className="px-3 py-1 rounded bg-brand-red/20 border border-brand-red/40 text-brand-red text-xs font-bold uppercase tracking-wider font-heading">
          {news.category?.name || "Kulüp Haberi"}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-white uppercase font-heading leading-tight tracking-tight">
        {news.title}
      </h1>

      {/* Meta details */}
      <div className="flex flex-wrap items-center gap-4 py-4 my-4 border-y border-zinc-800 text-xs text-zinc-400">
        <span className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-brand-red" />
          {formatDate(news.publishedAt)}
        </span>
        <span>&bull;</span>
        <span className="flex items-center gap-1.5">
          <Shield className="w-4 h-4 text-brand-red" />
          Resmî Kulüp Bülteni
        </span>
      </div>

      {/* Hero Image */}
      <div className="relative w-full h-[320px] md:h-[480px] rounded-2xl overflow-hidden my-6 border border-zinc-800 bg-zinc-950 shadow-2xl">
        <img
          src={news.imageUrl}
          alt={news.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Summary Highlight */}
      <div className="p-6 rounded-xl bg-zinc-900/80 border-l-4 border-brand-red my-8 text-base md:text-lg text-zinc-200 font-medium leading-relaxed italic">
        {news.summary}
      </div>

      {/* Full Content */}
      <div className="text-zinc-300 leading-loose text-base space-y-6">
        <p>{news.content}</p>
      </div>

      {/* Related News Section */}
      {relatedNews.length > 0 && (
        <div className="mt-16 pt-12 border-t border-zinc-800">
          <h2 className="text-xl font-bold uppercase text-white font-heading mb-6 border-l-2 border-brand-red pl-3">
            İlgili Diğer Haberler
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedNews.map((item) => (
              <a
                key={item.id}
                href={`/haberler/${item.slug}`}
                className="group rounded-xl bg-brand-card border border-brand-cardBorder overflow-hidden shadow-lg hover:-translate-y-1 transition duration-300"
              >
                <div className="h-40 w-full overflow-hidden bg-zinc-900">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="p-4">
                  <span className="text-[10px] font-semibold text-brand-red uppercase">
                    {formatDate(item.publishedAt)}
                  </span>
                  <h3 className="mt-1 text-sm font-bold text-white uppercase font-heading group-hover:text-brand-red transition line-clamp-2">
                    {item.title}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
