import React from "react";
import prisma from "@/lib/prisma";
import SectionHeading from "@/components/ui/SectionHeading";
import TffU17StandingsTable from "@/components/u17/TffU17StandingsTable";
import { Trophy, Info } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Puan Durumu",
  description:
    "İstanbul Süper Amatör Ligi ve TFF U17/B Ligi 9. Grup puan durumu, haftalık sıralama, averaj ve takım istatistikleri.",
};

export default async function StandingsPage({
  searchParams,
}: {
  searchParams: Promise<{ lig?: string }>;
}) {
  const { lig } = await searchParams;
  const isU17 = lig === "u17";

  const standings = await prisma.standings.findMany({
    orderBy: { position: "asc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
      <SectionHeading
        badge="LİG TABLOSU"
        title={isU17 ? "TFF U17/B Ligi 9. Grup Puan Durumu" : "İstanbul Süper Amatör Ligi Puan Durumu"}
        subtitle="2025-2026 / 2026-2027 Sezonu güncel puan durumu ve lig sıralaması."
      />

      {/* League Selection Tabs */}
      <div className="flex items-center gap-3 mb-8 border-b border-zinc-800 pb-4">
        <a
          href="/puan-durumu"
          className={`px-5 py-2.5 rounded-xl font-bold uppercase text-xs tracking-wider transition ${
            !isU17
              ? "bg-brand-red text-white shadow-lg shadow-brand-red/30"
              : "bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800"
          }`}
        >
          A Takım (İstanbul SAL)
        </a>
        <a
          href="/puan-durumu?lig=u17"
          className={`px-5 py-2.5 rounded-xl font-bold uppercase text-xs tracking-wider transition ${
            isU17
              ? "bg-brand-red text-white shadow-lg shadow-brand-red/30"
              : "bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800"
          }`}
        >
          U17/B Ligi 9. Grup (TFF Resmî)
        </a>
      </div>

      {isU17 ? (
        <TffU17StandingsTable />
      ) : (
        <div className="rounded-2xl bg-brand-card border border-brand-cardBorder overflow-hidden shadow-2xl p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-zinc-200">
              <thead>
                <tr className="border-b border-zinc-800 text-xs text-zinc-500 uppercase font-semibold tracking-wider">
                  <th className="py-3 px-2 text-center w-12">Sıra</th>
                  <th className="py-3 px-4">Kulüp / Takım</th>
                  <th className="py-3 px-3 text-center">O</th>
                  <th className="py-3 px-3 text-center">G</th>
                  <th className="py-3 px-3 text-center">B</th>
                  <th className="py-3 px-3 text-center">M</th>
                  <th className="py-3 px-3 text-center">AG</th>
                  <th className="py-3 px-3 text-center">YG</th>
                  <th className="py-3 px-3 text-center">AV</th>
                  <th className="py-3 px-4 text-center font-bold text-white text-base">PUAN</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 font-medium">
                {standings.map((team) => {
                  const diff = team.goalsFor - team.goalsAgainst;
                  const isClub = team.isClub;

                  return (
                    <tr
                      key={team.id}
                      className={`transition ${
                        isClub
                          ? "bg-brand-red/25 font-bold text-white border-l-4 border-brand-red"
                          : "hover:bg-zinc-800/40"
                      }`}
                    >
                      <td className="py-3.5 px-2 text-center font-bold">
                        <span
                          className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-heading ${
                            team.position <= 2
                              ? "bg-brand-red text-white"
                              : "bg-zinc-800 text-zinc-400"
                          }`}
                        >
                          {team.position}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 flex items-center gap-3">
                        {isClub && (
                          <img
                            src="/image/bayrampasa-logo.png"
                            alt="Logo"
                            className="w-6 h-6 object-contain shrink-0"
                          />
                        )}
                        <span className={isClub ? "text-brand-red font-black text-base" : "text-zinc-100"}>
                          {team.teamName}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-center text-zinc-400">{team.played}</td>
                      <td className="py-3.5 px-3 text-center text-zinc-300 font-semibold">{team.won}</td>
                      <td className="py-3.5 px-3 text-center text-zinc-400">{team.drawn}</td>
                      <td className="py-3.5 px-3 text-center text-zinc-400">{team.lost}</td>
                      <td className="py-3.5 px-3 text-center text-zinc-400">{team.goalsFor}</td>
                      <td className="py-3.5 px-3 text-center text-zinc-400">{team.goalsAgainst}</td>
                      <td className="py-3.5 px-3 text-center font-semibold text-zinc-300">
                        {diff > 0 ? `+${diff}` : diff}
                      </td>
                      <td className="py-3.5 px-4 text-center font-black text-white text-lg">
                        {team.points}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-8 pt-4 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-brand-red inline-block" />
                1. ve 2. Sıra: BAL Play-off Yükselme Grubu
              </span>
            </div>
            <span className="flex items-center gap-1 text-zinc-500">
              <Info className="w-3.5 h-3.5" />
              Puan eşitliği durumunda ikili averaj ve genel averaj kuralları geçerlidir.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
