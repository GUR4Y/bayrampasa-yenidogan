import React from "react";
import { readSnapshot } from "@/lib/tff-u17/storage";
import { Calendar, MapPin, Trophy, Clock, ExternalLink } from "lucide-react";

export default async function TffU17FixturesList() {
  const data = await readSnapshot();

  if (!data || !data.fixtures || data.fixtures.length === 0) {
    return (
      <div className="p-8 rounded-2xl bg-brand-card border border-brand-cardBorder text-center text-zinc-500 text-xs">
        U17/B Ligi fikstür verileri henüz senkronize edilmedi.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {data.fixtures.map((f) => {
        const isFinished = f.status === "finished" || f.status === "forfeit";
        const isOurHome = f.homeTeam.includes("YENİDOĞAN") || f.homeTeam.includes("Yenidogan");
        const isOurAway = f.awayTeam.includes("YENİDOĞAN") || f.awayTeam.includes("Yenidogan");

        return (
          <div
            key={f.id}
            className="rounded-2xl bg-brand-card border border-brand-cardBorder p-5 shadow-lg hover:border-zinc-700 transition"
          >
            {/* Top row */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-zinc-800 text-xs text-zinc-400">
              <span className="font-bold text-white uppercase font-heading flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-brand-red" />
                {f.week}. Hafta • U17/B 9. Grup
              </span>

              <div className="flex items-center gap-3 text-[11px]">
                {f.dateText && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-brand-red" />
                    {f.dateText}
                  </span>
                )}
                {f.time && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-brand-red" />
                    {f.time}
                  </span>
                )}
              </div>
            </div>

            {/* Matchup row */}
            <div className="py-4 grid grid-cols-1 md:grid-cols-12 items-center gap-4 text-xs">
              {/* Home Team */}
              <div className="md:col-span-5 text-center md:text-right">
                <span
                  className={`font-bold uppercase font-heading text-sm ${
                    isOurHome ? "text-brand-red font-black" : "text-white"
                  }`}
                >
                  {f.homeTeam}
                </span>
              </div>

              {/* Score / Status */}
              <div className="md:col-span-2 flex flex-col items-center justify-center">
                {isFinished ? (
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-base font-black text-white font-heading">
                      {f.homeScore}
                    </span>
                    <span className="text-zinc-600 font-bold">:</span>
                    <span className="w-8 h-8 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-base font-black text-white font-heading">
                      {f.awayScore}
                    </span>
                  </div>
                ) : (
                  <span className="px-2.5 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800 text-[10px] font-semibold uppercase">
                    Planlandı
                  </span>
                )}
              </div>

              {/* Away Team */}
              <div className="md:col-span-5 text-center md:text-left">
                <span
                  className={`font-bold uppercase font-heading text-sm ${
                    isOurAway ? "text-brand-red font-black" : "text-white"
                  }`}
                >
                  {f.awayTeam}
                </span>
              </div>
            </div>

            {/* Bottom row: Venue and TFF Link */}
            <div className="pt-3 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-zinc-500">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-zinc-400" />
                {f.venue || "Saha / Stat Belirlenmedi"}
              </span>

              {f.sourceMatchUrl && (
                <a
                  href={f.sourceMatchUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-zinc-300 inline-flex items-center gap-1 transition"
                >
                  TFF Maç Sayfası <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
