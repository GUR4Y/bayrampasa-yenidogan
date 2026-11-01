import React from "react";
import prisma from "@/lib/prisma";
import SectionHeading from "@/components/ui/SectionHeading";
import TffU17FixturesList from "@/components/u17/TffU17FixturesList";
import { Calendar, MapPin, Trophy, Clock } from "lucide-react";
import { formatDateTime } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fikstür & Maç Sonuçları",
  description:
    "Bayrampaşa Yenidoğan Spor Kulübü sezon fikstürü, maç tarihleri, stadyum bilgileri ve canlı maç skorları.",
};

export default async function FixturesPage({
  searchParams,
}: {
  searchParams: Promise<{ durum?: string; lig?: string }>;
}) {
  const { durum, lig } = await searchParams;
  const isU17 = lig === "u17";

  const matches = await prisma.match.findMany({
    where: {
      ...(durum === "oynanan"
        ? { status: "FINISHED" }
        : durum === "gelecek"
        ? { status: "UPCOMING" }
        : {}),
    },
    orderBy: { matchDate: "desc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
      <SectionHeading
        badge="MAÇ MERKEZİ"
        title={isU17 ? "TFF U17/B Ligi 9. Grup Fikstürü" : "Fikstür & Maç Sonuçları"}
        subtitle="2025-2026 / 2026-2027 Sezonu haftalık maç takvimi, skorlar ve stadyum bilgileri."
      />

      {/* League Selection */}
      <div className="flex items-center gap-3 mb-6 border-b border-zinc-800 pb-4">
        <a
          href="/fikstur"
          className={`px-5 py-2.5 rounded-xl font-bold uppercase text-xs tracking-wider transition ${
            !isU17
              ? "bg-brand-red text-white shadow-lg shadow-brand-red/30"
              : "bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800"
          }`}
        >
          A Takım Fikstürü
        </a>
        <a
          href="/fikstur?lig=u17"
          className={`px-5 py-2.5 rounded-xl font-bold uppercase text-xs tracking-wider transition ${
            isU17
              ? "bg-brand-red text-white shadow-lg shadow-brand-red/30"
              : "bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800"
          }`}
        >
          U17/B Ligi (TFF Resmî 14 Hafta)
        </a>
      </div>

      {isU17 ? (
        <TffU17FixturesList />
      ) : (
        <>
          {/* Status Filters for A Takım */}
          <div className="flex items-center gap-3 mb-8">
            <a
              href="/fikstur"
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition ${
                !durum
                  ? "bg-zinc-700 text-white"
                  : "bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800"
              }`}
            >
              Tüm Maçlar
            </a>
            <a
              href="/fikstur?durum=gelecek"
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition ${
                durum === "gelecek"
                  ? "bg-zinc-700 text-white"
                  : "bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800"
              }`}
            >
              Gelecek Maçlar
            </a>
            <a
              href="/fikstur?durum=oynanan"
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition ${
                durum === "oynanan"
                  ? "bg-zinc-700 text-white"
                  : "bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800"
              }`}
            >
              Sonuçlanan Maçlar
            </a>
          </div>

          {/* Match Cards List */}
          {matches.length === 0 ? (
            <div className="py-16 text-center text-zinc-500">
              Seçilen kriterde maç kaydı bulunamadı.
            </div>
          ) : (
            <div className="space-y-4">
              {matches.map((m) => {
                const isFinished = m.status === "FINISHED";
                const isHomeClub = m.homeTeam.includes("Yenidoğan");
                const isAwayClub = m.awayTeam.includes("Yenidoğan");

                return (
                  <div
                    key={m.id}
                    className="rounded-2xl bg-brand-card border border-brand-cardBorder p-6 shadow-xl hover:border-zinc-700 transition"
                  >
                    {/* Top Meta info */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-800 text-xs text-zinc-400">
                      <div className="flex items-center gap-2">
                        <Trophy className="w-3.5 h-3.5 text-brand-red" />
                        <span className="font-bold text-white uppercase font-heading">
                          {m.competition} {m.week ? `• ${m.week}. Hafta` : ""}
                        </span>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-brand-red" />
                          {formatDateTime(m.matchDate)}
                        </span>
                        <span className="hidden sm:inline">&bull;</span>
                        <span className="hidden sm:flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-brand-red" />
                          {m.stadium}
                        </span>
                      </div>
                    </div>

                    {/* Matchup */}
                    <div className="py-6 grid grid-cols-1 md:grid-cols-12 items-center gap-6">
                      {/* Home Team */}
                      <div className="md:col-span-5 flex items-center justify-center md:justify-end gap-4 text-center md:text-right">
                        <span
                          className={`text-base md:text-lg font-bold uppercase font-heading ${
                            isHomeClub ? "text-brand-red font-black" : "text-white"
                          }`}
                        >
                          {m.homeTeam}
                        </span>
                        <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 p-1.5 shrink-0 flex items-center justify-center">
                          <img
                            src={m.homeLogo || "/image/bayrampasa-logo.png"}
                            alt={m.homeTeam}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>

                      {/* Score / Status */}
                      <div className="md:col-span-2 flex flex-col items-center justify-center">
                        {isFinished ? (
                          <div className="flex items-center gap-2">
                            <span className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xl font-black text-white font-heading">
                              {m.homeScore}
                            </span>
                            <span className="text-zinc-600 font-bold">:</span>
                            <span className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xl font-black text-white font-heading">
                              {m.awayScore}
                            </span>
                          </div>
                        ) : (
                          <span className="px-3 py-1 rounded bg-brand-red/20 border border-brand-red/40 text-brand-red text-xs font-bold uppercase tracking-wider font-heading">
                            YAKLAŞAN MAÇ
                          </span>
                        )}
                      </div>

                      {/* Away Team */}
                      <div className="md:col-span-5 flex items-center justify-center md:justify-start gap-4 text-center md:text-left">
                        <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 p-1.5 shrink-0 flex items-center justify-center order-2 md:order-1">
                          <img
                            src={m.awayLogo || "/image/Adsız.png"}
                            alt={m.awayTeam}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <span
                          className={`text-base md:text-lg font-bold uppercase font-heading order-1 md:order-2 ${
                            isAwayClub ? "text-brand-red font-black" : "text-white"
                          }`}
                        >
                          {m.awayTeam}
                        </span>
                      </div>
                    </div>

                    {/* Footer notes */}
                    {m.details && (
                      <div className="pt-3 border-t border-zinc-800/80 text-xs text-zinc-400 text-center md:text-left">
                        {m.details}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
