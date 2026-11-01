import React from "react";
import { readSnapshot } from "@/lib/tff-u17/storage";
import { Trophy, ExternalLink, RefreshCw, Shield } from "lucide-react";

export default async function TffU17StandingsTable() {
  const data = await readSnapshot();

  if (!data || !data.standings || data.standings.length === 0) {
    return (
      <div className="p-8 rounded-2xl bg-brand-card border border-brand-cardBorder text-center space-y-3">
        <Trophy className="w-8 h-8 text-zinc-600 mx-auto" />
        <h4 className="text-base font-bold text-white uppercase font-heading">
          U17/B Ligi 9. Grup Puan Durumu
        </h4>
        <p className="text-xs text-zinc-400 max-w-md mx-auto">
          TFF İstanbul U17 verileri henüz senkronize edilmedi veya ilk veri çekimi bekleniyor.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl bg-brand-card border border-brand-cardBorder overflow-hidden shadow-xl p-5 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-brand-red" />
          <h3 className="text-base font-bold uppercase text-white font-heading">
            TFF U17/B Ligi 9. Grup Puan Tablosu
          </h3>
        </div>
        <span className="text-[11px] text-zinc-400 font-semibold uppercase bg-zinc-900 px-2.5 py-1 rounded border border-zinc-800">
          2026–2027 Sezonu
        </span>
      </div>

      <div className="overflow-x-auto mt-4">
        <table className="w-full text-left text-xs text-zinc-200">
          <thead>
            <tr className="border-b border-zinc-800 text-[10px] text-zinc-500 uppercase font-semibold tracking-wider">
              <th className="py-2.5 px-2 text-center w-8">#</th>
              <th className="py-2.5 px-3">Takım</th>
              <th className="py-2.5 px-2 text-center w-10">O</th>
              <th className="py-2.5 px-2 text-center w-10">G</th>
              <th className="py-2.5 px-2 text-center w-10">B</th>
              <th className="py-2.5 px-2 text-center w-10">M</th>
              <th className="py-2.5 px-3 text-center w-12 font-bold text-white text-sm">P</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60 font-medium">
            {data.standings.map((team) => {
              const isOurTeam =
                team.team.toLocaleUpperCase("tr-TR") === "BAYRAMPAŞA YENİDOĞAN SPOR";

              return (
                <tr
                  key={team.team}
                  className={`transition ${
                    isOurTeam
                      ? "bg-brand-red/25 font-bold text-white border-l-4 border-brand-red"
                      : "hover:bg-zinc-800/40"
                  }`}
                >
                  <td className="py-2.5 px-2 text-center font-bold">
                    <span
                      className={`inline-flex items-center justify-center w-6 h-6 rounded text-xs font-heading ${
                        isOurTeam
                          ? "bg-brand-red text-white"
                          : "text-zinc-400"
                      }`}
                    >
                      {team.position}
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-2">
                      {isOurTeam && (
                        <span className="w-2 h-2 rounded-full bg-brand-red animate-ping shrink-0" />
                      )}
                      <span className={isOurTeam ? "text-brand-red font-black" : "text-zinc-200"}>
                        {team.team}
                      </span>
                    </div>
                  </td>
                  <td className="py-2.5 px-2 text-center text-zinc-400">{team.played}</td>
                  <td className="py-2.5 px-2 text-center text-zinc-300 font-semibold">{team.won}</td>
                  <td className="py-2.5 px-2 text-center text-zinc-400">{team.drawn}</td>
                  <td className="py-2.5 px-2 text-center text-zinc-400">{team.lost}</td>
                  <td className="py-2.5 px-3 text-center font-black text-white text-sm">
                    {team.points}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 pt-3 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-3 text-[11px] text-zinc-400">
        <span className="flex items-center gap-1.5">
          <RefreshCw className="w-3 h-3 text-brand-red" />
          Son Başarılı Kontrol:{" "}
          <strong className="text-zinc-300">
            {new Date(data.checkedAt).toLocaleString("tr-TR", { timeZone: "Europe/Istanbul" })}
          </strong>
        </span>

        <a
          href={data.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="text-brand-red hover:text-white font-bold inline-flex items-center gap-1 transition uppercase tracking-wider"
        >
          TFF Resmî Sayfası <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
