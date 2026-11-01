"use client";

import React, { useState } from "react";
import Link from "next/navigation";
import Image from "next/image";
import {
  Menu,
  X,
  Phone,
  Mail,
  ChevronDown,
  Trophy,
  Shield,
  Calendar,
  Lock,
} from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [clubDropdown, setClubDropdown] = useState(false);
  const [teamsDropdown, setTeamsDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-brand-black/95 backdrop-blur-md border-b border-brand-cardBorder">
      {/* Top micro bar */}
      <div className="hidden md:flex justify-between items-center px-4 lg:px-12 py-1.5 bg-neutral-950 text-xs text-zinc-400 border-b border-zinc-800/60">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5 text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse"></span>
            Resmî Kulüp Portalı
          </span>
          <span className="flex items-center gap-1.5 hover:text-white transition">
            <Phone className="w-3.5 h-3.5 text-brand-red" />
            +90 (212) 567 20 24
          </span>
          <span className="flex items-center gap-1.5 hover:text-white transition">
            <Mail className="w-3.5 h-3.5 text-brand-red" />
            iletisim@bayrampasayenidogan.org.tr
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-brand-red transition"
          >
            Instagram
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-brand-red transition"
          >
            Facebook
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-brand-red transition"
          >
            Twitter / X
          </a>
          <span className="text-zinc-700">|</span>
          <a
            href="/admin"
            className="flex items-center gap-1 text-zinc-400 hover:text-brand-red transition font-medium"
          >
            <Lock className="w-3 h-3" />
            Yönetim
          </a>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="flex items-center justify-between px-4 lg:px-12 py-3">
        {/* Logo and Brand Title */}
        <a href="/" className="flex items-center gap-3.5 group">
          <div className="relative w-14 h-16 transition-transform duration-300 group-hover:scale-105">
            <img
              src="/image/bayrampaşa logo.png"
              alt="Bayrampaşa Yenidoğan SK Arması"
              className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(220,38,38,0.5)]"
            />
          </div>
          <div>
            <span className="block text-lg lg:text-xl font-bold tracking-tight text-white uppercase font-heading group-hover:text-brand-red transition">
              BAYRAMPAŞA YENİDOĞAN
            </span>
            <span className="block text-xs font-semibold tracking-widest text-zinc-400 uppercase">
              Spor Kulübü &bull; Est. 1985
            </span>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-semibold text-zinc-200">
          <a
            href="/"
            className="px-3.5 py-2 rounded-lg hover:text-white hover:bg-zinc-800/50 transition"
          >
            Anasayfa
          </a>

          {/* Kulüp Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setClubDropdown(true)}
            onMouseLeave={() => setClubDropdown(false)}
          >
            <a
              href="/kulup"
              className="flex items-center gap-1 px-3.5 py-2 rounded-lg hover:text-white hover:bg-zinc-800/50 transition"
            >
              Kulübümüz <ChevronDown className="w-4 h-4 text-zinc-400" />
            </a>
            {clubDropdown && (
              <div className="absolute top-full left-0 w-48 py-2 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl animate-in fade-in zoom-in-95">
                <a
                  href="/kulup#tarihce"
                  className="block px-4 py-2 text-zinc-300 hover:text-white hover:bg-brand-red/20 hover:border-l-2 hover:border-brand-red transition"
                >
                  Tarihçe
                </a>
                <a
                  href="/kulup#yonetim"
                  className="block px-4 py-2 text-zinc-300 hover:text-white hover:bg-brand-red/20 hover:border-l-2 hover:border-brand-red transition"
                >
                  Yönetim Kurulu
                </a>
                <a
                  href="/kulup#tesisler"
                  className="block px-4 py-2 text-zinc-300 hover:text-white hover:bg-brand-red/20 hover:border-l-2 hover:border-brand-red transition"
                >
                  Tesislerimiz
                </a>
              </div>
            )}
          </div>

          {/* Takımlar Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setTeamsDropdown(true)}
            onMouseLeave={() => setTeamsDropdown(false)}
          >
            <a
              href="/takim"
              className="flex items-center gap-1 px-3.5 py-2 rounded-lg hover:text-white hover:bg-zinc-800/50 transition"
            >
              Takımlarımız <ChevronDown className="w-4 h-4 text-zinc-400" />
            </a>
            {teamsDropdown && (
              <div className="absolute top-full left-0 w-48 py-2 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl animate-in fade-in zoom-in-95">
                <a
                  href="/takim?kategori=a-takim"
                  className="block px-4 py-2 text-zinc-300 hover:text-white hover:bg-brand-red/20 hover:border-l-2 hover:border-brand-red transition"
                >
                  A Takım
                </a>
                <a
                  href="/takim?kategori=kadin-takim"
                  className="block px-4 py-2 text-zinc-300 hover:text-white hover:bg-brand-red/20 hover:border-l-2 hover:border-brand-red transition"
                >
                  Kadın Takımı
                </a>
              </div>
            )}
          </div>

          <a
            href="/fikstur"
            className="px-3.5 py-2 rounded-lg hover:text-white hover:bg-zinc-800/50 transition"
          >
            Fikstür & Sonuçlar
          </a>

          <a
            href="/puan-durumu"
            className="px-3.5 py-2 rounded-lg hover:text-white hover:bg-zinc-800/50 transition"
          >
            Puan Durumu
          </a>

          <a
            href="/haberler"
            className="px-3.5 py-2 rounded-lg hover:text-white hover:bg-zinc-800/50 transition"
          >
            Haberler
          </a>

          <a
            href="/medya"
            className="px-3.5 py-2 rounded-lg hover:text-white hover:bg-zinc-800/50 transition"
          >
            Medya
          </a>

          <a
            href="/sponsorlar"
            className="px-3.5 py-2 rounded-lg hover:text-white hover:bg-zinc-800/50 transition"
          >
            Sponsorlar
          </a>

          <a
            href="/iletisim"
            className="px-3.5 py-2 rounded-lg hover:text-white hover:bg-zinc-800/50 transition"
          >
            İletişim
          </a>
        </nav>

        {/* Action Button */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="/fikstur"
            className="flex items-center gap-2 px-4 py-2 bg-brand-red hover:bg-brand-redDark text-white font-semibold text-xs tracking-wider uppercase rounded-lg shadow-lg shadow-brand-red/30 transition transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Calendar className="w-4 h-4" />
            Maç Merkezi
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg bg-zinc-800 text-zinc-200 hover:text-white hover:bg-zinc-700 transition"
          aria-label="Menüyü aç/kapat"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-zinc-800 bg-brand-black px-5 py-6 space-y-3">
          <a
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-zinc-200 hover:text-brand-red transition"
          >
            Anasayfa
          </a>
          <a
            href="/kulup"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-zinc-200 hover:text-brand-red transition"
          >
            Kulübümüz (Tarihçe & Yönetim)
          </a>
          <a
            href="/takim"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-zinc-200 hover:text-brand-red transition"
          >
            Takımlarımız (A Takım & Kadın)
          </a>
          <a
            href="/fikstur"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-zinc-200 hover:text-brand-red transition"
          >
            Fikstür & Sonuçlar
          </a>
          <a
            href="/puan-durumu"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-zinc-200 hover:text-brand-red transition"
          >
            Puan Durumu
          </a>
          <a
            href="/haberler"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-zinc-200 hover:text-brand-red transition"
          >
            Haberler
          </a>
          <a
            href="/medya"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-zinc-200 hover:text-brand-red transition"
          >
            Medya Galerisi
          </a>
          <a
            href="/sponsorlar"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-zinc-200 hover:text-brand-red transition"
          >
            Sponsorlarımız
          </a>
          <a
            href="/iletisim"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-zinc-200 hover:text-brand-red transition"
          >
            İletişim
          </a>
          <div className="pt-4 border-t border-zinc-800 flex flex-col gap-2">
            <a
              href="/admin"
              className="text-center py-2 bg-zinc-800 text-zinc-300 rounded-lg text-sm font-medium"
            >
              Yönetici Girişi
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
