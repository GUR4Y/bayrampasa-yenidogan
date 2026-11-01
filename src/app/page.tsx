import React from "react";
import prisma from "@/lib/prisma";
import HeroSlider from "@/components/home/HeroSlider";
import NextMatchCard from "@/components/home/NextMatchCard";
import LatestNewsSection from "@/components/home/LatestNewsSection";
import StandingsWidget from "@/components/home/StandingsWidget";
import FeaturedPlayers from "@/components/home/FeaturedPlayers";
import SponsorsSection from "@/components/home/SponsorsSection";
import SectionHeading from "@/components/ui/SectionHeading";
import { Trophy, Calendar, Users, Shield, ArrowRight } from "lucide-react";
import { formatDayMonth } from "@/lib/utils";

export const revalidate = 60; // revalidate every 60s

export default async function HomePage() {
  // Fetch real data from Prisma
  const [nextMatch, recentMatches, latestNews, standings, featuredPlayers, sponsors] =
    await Promise.all([
      prisma.match.findFirst({
        where: { status: "UPCOMING" },
        orderBy: { matchDate: "asc" },
      }),
      prisma.match.findMany({
        where: { status: "FINISHED" },
        orderBy: { matchDate: "desc" },
        take: 2,
      }),
      prisma.news.findMany({
        where: { isPublished: true },
        orderBy: { publishedAt: "desc" },
        take: 4,
        include: { category: true },
      }),
      prisma.standings.findMany({
        orderBy: { position: "asc" },
      }),
      prisma.player.findMany({
        where: { isActive: true },
        take: 4,
        orderBy: { matchesPlayed: "desc" },
      }),
      prisma.sponsor.findMany({
        orderBy: { order: "asc" },
      }),
    ]);

  return (
    <div className="w-full flex flex-col space-y-16 pb-16">
      {/* 1. HERO SLIDER */}
      <HeroSlider />

      {/* 2. MATCH CENTER: NEXT MATCH + RECENT RESULTS */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 w-full -mt-20 md:-mt-24 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Upcoming Match Card */}
          <div className="lg:col-span-8">
            <NextMatchCard match={nextMatch} />
          </div>

          {/* Recent Match Results Strip */}
          <div className="lg:col-span-4 rounded-2xl bg-brand-card border border-brand-cardBorder p-6 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <span className="text-xs font-bold uppercase tracking-wider text-white font-heading flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 text-brand-red" />
                  Son Maç Sonuçları
                </span>
                <span className="text-[10px] text-zinc-500 uppercase font-bold">Lig</span>
              </div>

              <div className="divide-y divide-zinc-800/80 mt-2">
                {recentMatches.map((match) => (
                  <div key={match.id} className="py-3.5 flex items-center justify-between gap-3 text-xs">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className={`font-semibold ${match.homeTeam.includes("Yenidoğan") ? "text-brand-red font-bold" : "text-zinc-200"}`}>
                          {match.homeTeam}
                        </span>
                        <span className="font-extrabold text-sm text-white px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">
                          {match.homeScore ?? "-"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`font-semibold ${match.awayTeam.includes("Yenidoğan") ? "text-brand-red font-bold" : "text-zinc-200"}`}>
                          {match.awayTeam}
                        </span>
                        <span className="font-extrabold text-sm text-white px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">
                          {match.awayScore ?? "-"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800/80 mt-2">
              <a
                href="/fikstur"
                className="text-xs font-bold text-brand-red hover:text-white uppercase tracking-wider flex items-center justify-between transition group"
              >
                Tüm Fikstür & Skorlar
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LATEST NEWS */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 w-full">
        <SectionHeading
          badge="KULÜPTEN HABERLER"
          title="Son Gelişmeler & Duyurular"
          subtitle="Bayrampaşa Yenidoğan Spor Kulübü'ne dair en güncel haberler ve transfer gelişmeleri."
          actionText="Tüm Haberler"
          actionHref="/haberler"
        />
        <LatestNewsSection news={latestNews} />
      </section>

      {/* 4. LEAGUE STANDINGS & SQUAD PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* League Table */}
          <div className="lg:col-span-5">
            <StandingsWidget standings={standings} />
          </div>

          {/* Club Mission & Identity Banner */}
          <div className="lg:col-span-7 rounded-2xl bg-gradient-to-br from-brand-card via-zinc-900 to-black border border-brand-cardBorder p-8 relative overflow-hidden shadow-xl flex flex-col justify-between h-full">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/10 rounded-full blur-3xl pointer-events-none" />
            
            <div>
              <span className="px-3 py-1 rounded bg-brand-red/20 border border-brand-red/40 text-brand-red text-xs font-bold tracking-widest uppercase font-heading">
                1985'TEN BUGÜNE
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-white uppercase font-heading mt-3 leading-tight">
                Bayrampaşa'nın Gururu, Gençliğin Hizmetinde
              </h3>
              <p className="mt-3 text-sm text-zinc-300 leading-relaxed">
                Kulübümüz; A Takım düzeyinde İstanbul amatör liglerinde şampiyonluk yarışını sürdürürken,
                Kadın Futbol Takımımızla Türkiye finallerinde semtimizi gururla temsil ediyor.
                Altyapı kategorilerimizde yüzlerce Bayrampaşalı çocuğa spor ahlakı ve takım ruhu aşılıyoruz.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 my-6 py-6 border-y border-zinc-800 text-center">
              <div>
                <span className="block text-2xl md:text-3xl font-black text-brand-red font-heading">40+</span>
                <span className="text-xs text-zinc-400 font-semibold uppercase">Yıllık Tarih</span>
              </div>
              <div>
                <span className="block text-2xl md:text-3xl font-black text-white font-heading">300+</span>
                <span className="text-xs text-zinc-400 font-semibold uppercase">Lisanslı Sporcu</span>
              </div>
              <div>
                <span className="block text-2xl md:text-3xl font-black text-brand-red font-heading">2</span>
                <span className="text-xs text-zinc-400 font-semibold uppercase">Aktif Lig Takımı</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="/kulup"
                className="px-5 py-2.5 rounded-lg bg-brand-red hover:bg-brand-redDark text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-brand-red/30 transition"
              >
                Kulüp Tarihçesi ve Tesisler
              </a>
              <a
                href="/iletisim"
                className="px-5 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold uppercase tracking-wider transition"
              >
                Kulüp İletişim & Konum
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SQUAD SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 w-full">
        <SectionHeading
          badge="KADROMUZ"
          title="Öne Çıkan Futbolcularımız"
          subtitle="A Takımımızın tecrübeli ve dinamik yıldızları."
          actionText="Tüm Kadroyu Gör"
          actionHref="/takim"
        />
        <FeaturedPlayers players={featuredPlayers} />
      </section>

      {/* 6. SPONSORS */}
      <SponsorsSection sponsors={sponsors} />
    </div>
  );
}
