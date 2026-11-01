import React from "react";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ArrowLeft, Shield, Trophy, Award, Calendar, Flag } from "lucide-react";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const player = await prisma.player.findUnique({
    where: { slug },
    include: { team: true },
  });

  if (!player) return { title: "Futbolcu Bulunamadı" };

  return {
    title: `${player.name} (#${player.number}) - ${player.position}`,
    description: `${player.name}, Bayrampaşa Yenidoğan Spor Kulübü ${player.team.name} kadrosunda ${player.position} mevkiinde forma giymektedir.`,
    openGraph: {
      images: [{ url: player.photoUrl }],
    },
  };
}

export default async function PlayerDetailPage({ params }: Props) {
  const { slug } = await params;

  const player = await prisma.player.findUnique({
    where: { slug },
    include: { team: true },
  });

  if (!player) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-8 py-12">
      <div className="mb-6">
        <a
          href="/takim"
          className="inline-flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-white transition uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4 text-brand-red" />
          Kadrolara Dön
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left: Player Photo Card */}
        <div className="md:col-span-5 rounded-3xl bg-brand-card border border-brand-cardBorder overflow-hidden shadow-2xl relative">
          <div className="h-[420px] w-full overflow-hidden bg-zinc-900 relative">
            <img
              src={player.photoUrl}
              alt={player.name}
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-brand-red text-white font-black text-xl flex items-center justify-center font-heading shadow-xl">
              #{player.number}
            </div>
            <div className="absolute bottom-4 left-4 px-3 py-1 rounded bg-black/80 backdrop-blur border border-zinc-700 text-xs uppercase font-bold text-white tracking-wider">
              {player.position}
            </div>
          </div>
        </div>

        {/* Right: Info & Stats */}
        <div className="md:col-span-7 space-y-6">
          <div>
            <span className="px-3 py-1 rounded bg-brand-red/20 border border-brand-red/40 text-brand-red text-xs font-bold tracking-widest uppercase font-heading">
              {player.team.name}
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-white uppercase font-heading mt-2">
              {player.name}
            </h1>
            <p className="text-sm text-zinc-400 font-semibold uppercase tracking-wider mt-1">
              Forma No: #{player.number} &bull; {player.position}
            </p>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 gap-4 p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-xs">
            <div>
              <span className="text-zinc-500 uppercase font-semibold">Doğum Yılı</span>
              <p className="text-base font-bold text-white mt-0.5">{player.birthYear || "—"}</p>
            </div>
            <div>
              <span className="text-zinc-500 uppercase font-semibold">Uyruk</span>
              <p className="text-base font-bold text-white mt-0.5">{player.nationality}</p>
            </div>
            <div>
              <span className="text-zinc-500 uppercase font-semibold">Takım</span>
              <p className="text-base font-bold text-brand-red mt-0.5">{player.team.name}</p>
            </div>
            <div>
              <span className="text-zinc-500 uppercase font-semibold">Durum</span>
              <p className="text-base font-bold text-emerald-400 mt-0.5">Aktif Sporcu</p>
            </div>
          </div>

          {/* Season Statistics */}
          <div>
            <h3 className="text-base font-bold uppercase text-white font-heading mb-3 border-l-2 border-brand-red pl-2.5">
              2025-2026 Sezon İstatistikleri
            </h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-xl bg-brand-card border border-brand-cardBorder">
                <span className="text-xs text-zinc-400 font-semibold uppercase">Oynanan Maç</span>
                <span className="block text-2xl font-black text-white font-heading mt-1">
                  {player.matchesPlayed}
                </span>
              </div>
              <div className="p-4 rounded-xl bg-brand-card border border-brand-cardBorder">
                <span className="text-xs text-zinc-400 font-semibold uppercase">Gol</span>
                <span className="block text-2xl font-black text-brand-red font-heading mt-1">
                  {player.goals}
                </span>
              </div>
              <div className="p-4 rounded-xl bg-brand-card border border-brand-cardBorder">
                <span className="text-xs text-zinc-400 font-semibold uppercase">Asist</span>
                <span className="block text-2xl font-black text-white font-heading mt-1">
                  {player.assists}
                </span>
              </div>
            </div>
          </div>

          {/* Bio */}
          {player.bio && (
            <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/80">
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                Oyuncu Hakkında
              </h4>
              <p className="text-sm text-zinc-300 leading-relaxed">{player.bio}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
