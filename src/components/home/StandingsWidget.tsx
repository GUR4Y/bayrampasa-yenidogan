import React from "react";
import { Trophy, ArrowRight } from "lucide-react";

interface StandingsItem {
  id: string;
  position: number;
  teamName: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
  isClub: boolean;
}

interface StandingsWidgetProps {
  standings: StandingsItem[];
}

export default function StandingsWidget({ standings }: StandingsWidgetProps) {
  return (
    <div className="w-full rounded-2xl bg-brand-card border border-brand-cardBorder overflow-hidden shadow-xl p-5 md:p-6">
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-brand-red" />
          <h3 className="text-base font-bold uppercase text-white font-heading">
            Puan Durumu
          </h3>
        </div>
        <span className="text-[11px] text-zinc-400 uppercase font-semibold">
          İstanbul SAL • 2025-26
        </span>
      </div>

      <div className="overflow-x-auto mt-4">
        <table className="w-full text-left text-xs text-zinc-300">
          <thead>
            <tr className="border-b border-zinc-800 text-[10px] text-zinc-500 uppercase font-semibold tracking-wider">
              <th className="py-2 px-1 text-center w-8">#</th>
              <th className="py-2 px-2">Takım</th>
              <th className="py-2 px-2 text-center w-8">O</th>
              <th className="py-2 px-2 text-center w-8">G</th>
              <th className="py-2 px-2 text-center w-8">B</th>
              <th className="py-2 px-2 text-center w-8">M</th>
              <th className="py-2 px-2 text-center w-10">AV</th>
              <th className="py-2 px-2 text-center w-10 font-bold text-white">P</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60 font-medium">
            {standings.map((team) => {
              const diff = team.goalsFor - team.goalsAgainst;
              const isOurClub = team.isClub;

              return (
                <tr
                  key={team.id}
                  className={`transition ${
                    isOurClub
                      ? "bg-brand-red/20 font-bold text-white border-l-4 border-brand-red"
                      : "hover:bg-zinc-800/40"
                  }`}
                >
                  <td className="py-2.5 px-1 text-center font-bold text-zinc-400">
                    {team.position}
                  </td>
                  <td className="py-2.5 px-2 flex items-center gap-2">
                    {isOurClub && (
                      <span className="w-2 h-2 rounded-full bg-brand-red animate-ping shrink-0" />
                    )}
                    <span className={isOurClub ? "text-brand-red font-bold" : "text-zinc-200"}>
                      {team.teamName}
                    </span>
                  </td>
                  <td className="py-2.5 px-2 text-center text-zinc-400">{team.played}</td>
                  <td className="py-2.5 px-2 text-center text-zinc-400">{team.won}</td>
                  <td className="py-2.5 px-2 text-center text-zinc-400">{team.drawn}</td>
                  <td className="py-2.5 px-2 text-center text-zinc-400">{team.lost}</td>
                  <td className="py-2.5 px-2 text-center text-zinc-400">
                    {diff > 0 ? `+${diff}` : diff}
                  </td>
                  <td className="py-2.5 px-2 text-center font-bold text-white text-sm">
                    {team.points}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 pt-3 border-t border-zinc-800 flex justify-end">
        <a
          href="/puan-durumu"
          className="text-xs font-bold text-brand-red hover:text-white uppercase tracking-wider flex items-center gap-1 transition"
        >
          Detaylı Tablo <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
