import React from "react";
import { ArrowRight, Shirt } from "lucide-react";

interface PlayerItem {
  id: string;
  name: string;
  slug: string;
  number: number;
  position: string;
  photoUrl: string;
  matchesPlayed: number;
  goals: number;
  assists: number;
}

interface FeaturedPlayersProps {
  players: PlayerItem[];
}

export default function FeaturedPlayers({ players }: FeaturedPlayersProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {players.map((player) => (
        <a
          key={player.id}
          href={`/takim/${player.slug}`}
          className="group relative rounded-2xl bg-gradient-to-b from-brand-card to-zinc-950 border border-brand-cardBorder overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-brand-red/60 hover:shadow-brand-red/20"
        >
          {/* Big number watermark in background */}
          <div className="absolute top-2 right-4 text-7xl font-black text-white/5 font-heading select-none pointer-events-none group-hover:text-brand-red/10 transition">
            #{player.number}
          </div>

          {/* Player Photo */}
          <div className="relative h-64 w-full overflow-hidden bg-zinc-900/60 flex items-center justify-center">
            <img
              src={player.photoUrl}
              alt={player.name}
              className="w-full h-full object-cover object-top filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
            />
            {/* Jersey number badge */}
            <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-brand-red text-white font-black text-sm flex items-center justify-center font-heading shadow-md">
              {player.number}
            </div>
            {/* Position badge */}
            <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-black/80 backdrop-blur border border-zinc-700 text-[10px] uppercase font-bold text-zinc-300 tracking-wider">
              {player.position}
            </div>
          </div>

          {/* Details */}
          <div className="p-5">
            <h3 className="text-lg font-extrabold uppercase text-white font-heading tracking-tight group-hover:text-brand-red transition">
              {player.name}
            </h3>

            {/* Quick stats grid */}
            <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-zinc-800/80 text-center text-xs">
              <div>
                <span className="block text-zinc-500 text-[10px] uppercase font-semibold">Maç</span>
                <span className="font-bold text-white">{player.matchesPlayed}</span>
              </div>
              <div>
                <span className="block text-zinc-500 text-[10px] uppercase font-semibold">Gol</span>
                <span className="font-bold text-brand-red">{player.goals}</span>
              </div>
              <div>
                <span className="block text-zinc-500 text-[10px] uppercase font-semibold">Asist</span>
                <span className="font-bold text-white">{player.assists}</span>
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
