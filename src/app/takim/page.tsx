import React from "react";
import prisma from "@/lib/prisma";
import SectionHeading from "@/components/ui/SectionHeading";
import { Users, Shield, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Takımlarımız & Kadro",
  description:
    "Bayrampaşa Yenidoğan Spor Kulübü A Takım ve Kadın Futbol Takımı oyuncu kadrosu, teknik heyet ve sporcu profilleri.",
};

export default async function TeamPage({
  searchParams,
}: {
  searchParams: Promise<{ kategori?: string; mevki?: string }>;
}) {
  const { kategori, mevki } = await searchParams;

  const currentTeamSlug = kategori || "a-takim";

  const [teams, currentTeam, staffList] = await Promise.all([
    prisma.team.findMany(),
    prisma.team.findUnique({
      where: { slug: currentTeamSlug },
      include: {
        players: {
          where: {
            isActive: true,
            ...(mevki ? { position: mevki } : {}),
          },
          orderBy: { number: "asc" },
        },
      },
    }),
    prisma.staff.findMany(),
  ]);

  const positions = ["Tümü", "Kaleci", "Defans", "Orta Saha", "Forvet", "Kanat"];

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
      <SectionHeading
        badge="SPORCU KADROMUZ"
        title="Takımlarımız & Futbolcularımız"
        subtitle="Kırmızı-siyah formamızı gururla taşıyan oyuncularımız ve teknik ekibimiz."
      />

      {/* Team selector tabs */}
      <div className="flex items-center gap-3 mb-8 border-b border-zinc-800 pb-4">
        {teams.map((t) => (
          <a
            key={t.id}
            href={`/takim?kategori=${t.slug}`}
            className={`px-5 py-2.5 rounded-xl font-bold uppercase text-xs tracking-wider transition ${
              currentTeamSlug === t.slug
                ? "bg-brand-red text-white shadow-lg shadow-brand-red/30"
                : "bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
          >
            {t.name}
          </a>
        ))}
      </div>

      {/* Position filters */}
      <div className="flex flex-wrap items-center gap-2 mb-10">
        <span className="text-xs text-zinc-500 font-semibold uppercase mr-2">Mevki:</span>
        {positions.map((pos) => {
          const isSelected = (!mevki && pos === "Tümü") || mevki === pos;
          return (
            <a
              key={pos}
              href={`/takim?kategori=${currentTeamSlug}${pos !== "Tümü" ? `&mevki=${pos}` : ""}`}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                isSelected
                  ? "bg-zinc-700 text-white"
                  : "bg-zinc-900/60 text-zinc-400 hover:text-white hover:bg-zinc-800"
              }`}
            >
              {pos}
            </a>
          );
        })}
      </div>

      {/* Players Grid */}
      {!currentTeam || currentTeam.players.length === 0 ? (
        <div className="py-16 text-center text-zinc-500">
          Bu kriterlere uygun oyuncu bulunamadı.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentTeam.players.map((player) => (
            <a
              key={player.id}
              href={`/takim/${player.slug}`}
              className="group relative rounded-2xl bg-gradient-to-b from-brand-card to-zinc-950 border border-brand-cardBorder overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-brand-red/60 hover:shadow-brand-red/20"
            >
              {/* Jersey watermark */}
              <div className="absolute top-2 right-4 text-7xl font-black text-white/5 font-heading select-none pointer-events-none group-hover:text-brand-red/10 transition">
                #{player.number}
              </div>

              {/* Photo */}
              <div className="relative h-64 w-full overflow-hidden bg-zinc-900 flex items-center justify-center">
                <img
                  src={player.photoUrl}
                  alt={player.name}
                  className="w-full h-full object-cover object-top filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-brand-red text-white font-black text-sm flex items-center justify-center font-heading shadow-md">
                  {player.number}
                </div>
                <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-black/80 backdrop-blur border border-zinc-700 text-[10px] uppercase font-bold text-zinc-300 tracking-wider">
                  {player.position}
                </div>
              </div>

              {/* Details */}
              <div className="p-5">
                <h3 className="text-lg font-extrabold uppercase text-white font-heading tracking-tight group-hover:text-brand-red transition">
                  {player.name}
                </h3>

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
      )}

      {/* Technical Staff Section */}
      <div className="mt-20 pt-12 border-t border-zinc-800">
        <h2 className="text-2xl font-black uppercase text-white font-heading mb-6 border-l-4 border-brand-red pl-3">
          Teknik Heyet & İdare
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {staffList.map((staff) => (
            <div
              key={staff.id}
              className="p-6 rounded-2xl bg-brand-card border border-brand-cardBorder flex items-center gap-4"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 bg-zinc-900 border-2 border-brand-red/50">
                {staff.photoUrl ? (
                  <img src={staff.photoUrl} alt={staff.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-bold text-zinc-500">
                    BY
                  </div>
                )}
              </div>
              <div>
                <span className="text-xs font-bold text-brand-red uppercase tracking-wider">
                  {staff.role}
                </span>
                <h4 className="text-base font-bold text-white uppercase font-heading">
                  {staff.name}
                </h4>
                {staff.bio && (
                  <p className="text-xs text-zinc-400 mt-1 line-clamp-2">{staff.bio}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
