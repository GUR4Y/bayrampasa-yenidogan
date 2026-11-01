"use client";

import React, { useState, useEffect } from "react";
import { Calendar, MapPin, Trophy, Clock, ArrowRight } from "lucide-react";
import { formatDateTime } from "@/lib/utils";

interface MatchProps {
  match?: {
    competition: string;
    week?: number | null;
    homeTeam: string;
    homeLogo?: string | null;
    awayTeam: string;
    awayLogo?: string | null;
    matchDate: Date | string;
    stadium: string;
    status: string;
  } | null;
}

export default function NextMatchCard({ match }: MatchProps) {
  const targetDate = match ? new Date(match.matchDate) : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const difference = +targetDate - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const homeName = match?.homeTeam || "Bayrampaşa Yenidoğan SK";
  const awayName = match?.awayTeam || "Gaziosmanpaşaspor";
  const competition = match?.competition || "İstanbul Süper Amatör Ligi";
  const stadium = match?.stadium || "Bayrampaşa Belediye Stadı";

  return (
    <div className="relative w-full rounded-2xl bg-gradient-to-b from-brand-card to-zinc-950 border border-brand-cardBorder overflow-hidden shadow-2xl p-6 lg:p-8">
      {/* Background stadium glow effect */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-brand-red/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-brand-red/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-zinc-800/80">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-brand-red" />
          <span className="text-xs font-bold uppercase tracking-wider text-white font-heading">
            {competition} {match?.week ? `• ${match.week}. Hafta` : ""}
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs text-zinc-400">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-brand-red" />
            {formatDateTime(targetDate)}
          </span>
          <span>&bull;</span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-brand-red" />
            {stadium}
          </span>
        </div>
      </div>

      {/* Teams Matchup Display */}
      <div className="py-8 grid grid-cols-1 md:grid-cols-3 items-center gap-6">
        {/* Home Team */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right space-y-2">
          <div className="w-20 h-20 relative p-2 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-lg">
            <img
              src="/image/bayrampaşa logo.png"
              alt={homeName}
              className="w-16 h-16 object-contain"
            />
          </div>
          <span className="text-lg md:text-xl font-bold uppercase text-white font-heading tracking-tight">
            {homeName}
          </span>
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
            Ev Sahibi
          </span>
        </div>

        {/* Center Versus & Countdown */}
        <div className="flex flex-col items-center justify-center space-y-3">
          <span className="px-3 py-1 rounded-full bg-brand-red text-white text-xs font-black tracking-widest uppercase font-heading shadow-md shadow-brand-red/40">
            VS
          </span>

          {/* Countdown display */}
          <div className="grid grid-cols-4 gap-2 text-center pt-2">
            <div className="px-2.5 py-1.5 rounded-lg bg-zinc-900/90 border border-zinc-800">
              <span className="block text-lg font-bold text-white font-heading">{timeLeft.days}</span>
              <span className="block text-[10px] text-zinc-500 uppercase tracking-wider">Gün</span>
            </div>
            <div className="px-2.5 py-1.5 rounded-lg bg-zinc-900/90 border border-zinc-800">
              <span className="block text-lg font-bold text-white font-heading">{timeLeft.hours}</span>
              <span className="block text-[10px] text-zinc-500 uppercase tracking-wider">Saat</span>
            </div>
            <div className="px-2.5 py-1.5 rounded-lg bg-zinc-900/90 border border-zinc-800">
              <span className="block text-lg font-bold text-white font-heading">{timeLeft.minutes}</span>
              <span className="block text-[10px] text-zinc-500 uppercase tracking-wider">Dakika</span>
            </div>
            <div className="px-2.5 py-1.5 rounded-lg bg-zinc-900/90 border border-zinc-800">
              <span className="block text-lg font-bold text-white font-heading">{timeLeft.seconds}</span>
              <span className="block text-[10px] text-zinc-500 uppercase tracking-wider">Saniye</span>
            </div>
          </div>
        </div>

        {/* Away Team */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
          <div className="w-20 h-20 relative p-2 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-lg">
            <img
              src="/image/Adsız.png"
              alt={awayName}
              className="w-14 h-14 object-contain"
            />
          </div>
          <span className="text-lg md:text-xl font-bold uppercase text-white font-heading tracking-tight">
            {awayName}
          </span>
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
            Deplasman
          </span>
        </div>
      </div>

      {/* Footer CTAs */}
      <div className="pt-4 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-4">
        <span className="text-xs text-zinc-400 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-brand-red" />
          Tribün biletleri ve detaylı maç bilgileri için takipte kalın.
        </span>

        <a
          href="/fikstur"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-red hover:text-white uppercase tracking-wider transition group"
        >
          Tüm Fikstür ve Sonuçlar
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  );
}
