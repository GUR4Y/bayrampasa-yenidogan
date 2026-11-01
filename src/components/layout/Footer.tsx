import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Shield,
  ArrowRight,
  Heart,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0a0a0c] border-t border-zinc-800 text-zinc-400">
      {/* Top red accent stripe */}
      <div className="h-1.5 w-full bg-gradient-to-r from-brand-red via-brand-redDark to-zinc-900" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Club Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/image/bayrampaşa logo.png"
                alt="Bayrampaşa Yenidoğan SK"
                className="w-14 h-16 object-contain filter drop-shadow-[0_0_10px_rgba(220,38,38,0.4)]"
              />
              <div>
                <h3 className="text-white text-lg font-bold tracking-tight uppercase font-heading">
                  BAYRAMPAŞA YENİDOĞAN
                </h3>
                <p className="text-xs text-brand-red font-semibold uppercase tracking-wider">
                  Spor Kulübü &bull; 1985
                </p>
              </div>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Bayrampaşa gençliğine ve Türk futboluna ahlaklı, disiplinli ve yetenekli sporcular
              kazandırmak amacıyla kırmızı-siyah renklerimizle 1985 yılından bu yana gururla
              mücadele ediyoruz.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-800/80 hover:bg-brand-red hover:text-white flex items-center justify-center transition text-xs font-semibold"
                aria-label="Instagram"
              >
                IG
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-800/80 hover:bg-brand-red hover:text-white flex items-center justify-center transition text-xs font-semibold"
                aria-label="Facebook"
              >
                FB
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-800/80 hover:bg-brand-red hover:text-white flex items-center justify-center transition text-xs font-semibold"
                aria-label="Twitter"
              >
                X
              </a>
            </div>
          </div>

          {/* Column 2: Kurumsal Sayfalar */}
          <div>
            <h4 className="text-white font-bold text-base tracking-wide uppercase font-heading mb-4 border-l-2 border-brand-red pl-2.5">
              Kurumsal
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="/kulup#tarihce"
                  className="hover:text-white flex items-center gap-1.5 transition"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-brand-red" />
                  Kulüp Tarihçesi
                </a>
              </li>
              <li>
                <a
                  href="/kulup#yonetim"
                  className="hover:text-white flex items-center gap-1.5 transition"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-brand-red" />
                  Yönetim Kurulu
                </a>
              </li>
              <li>
                <a
                  href="/kulup#tesisler"
                  className="hover:text-white flex items-center gap-1.5 transition"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-brand-red" />
                  Tesislerimiz
                </a>
              </li>
              <li>
                <a
                  href="/sponsorlar"
                  className="hover:text-white flex items-center gap-1.5 transition"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-brand-red" />
                  Sponsorluk ve İş Ortakları
                </a>
              </li>
              <li>
                <a
                  href="/medya"
                  className="hover:text-white flex items-center gap-1.5 transition"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-brand-red" />
                  Fotoğraf & Video Medya
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Futbol & Branşlar */}
          <div>
            <h4 className="text-white font-bold text-base tracking-wide uppercase font-heading mb-4 border-l-2 border-brand-red pl-2.5">
              Futbol & Takımlar
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="/takim?kategori=a-takim"
                  className="hover:text-white flex items-center gap-1.5 transition"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-brand-red" />
                  A Takım Kadrosu
                </a>
              </li>
              <li>
                <a
                  href="/takim?kategori=kadin-takim"
                  className="hover:text-white flex items-center gap-1.5 transition"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-brand-red" />
                  Kadın Futbol Takımımız
                </a>
              </li>
              <li>
                <a
                  href="/fikstur"
                  className="hover:text-white flex items-center gap-1.5 transition"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-brand-red" />
                  Haftalık Fikstür & Skorlar
                </a>
              </li>
              <li>
                <a
                  href="/puan-durumu"
                  className="hover:text-white flex items-center gap-1.5 transition"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-brand-red" />
                  Lig Puan Durumu
                </a>
              </li>
              <li>
                <a
                  href="/haberler"
                  className="hover:text-white flex items-center gap-1.5 transition"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-brand-red" />
                  Resmî Duyurular & Transferler
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: İletişim & Lokasyon */}
          <div>
            <h4 className="text-white font-bold text-base tracking-wide uppercase font-heading mb-4 border-l-2 border-brand-red pl-2.5">
              Kulüp İletişim
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                <span>Yenidoğan Mah., Bayrampaşa, İstanbul / Türkiye</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-red shrink-0" />
                <span>+90 (212) 567 20 24</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-red shrink-0" />
                <span>iletisim@bayrampasayenidogan.org.tr</span>
              </div>
              <div className="pt-2">
                <a
                  href="/iletisim"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-brand-red hover:text-white text-xs font-semibold transition"
                >
                  Harita ve İletişim Formu &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-zinc-900 bg-black/60 py-5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-zinc-500 text-center md:text-left">
          <p>
            &copy; 2026 Bayrampaşa Yenidoğan Spor Kulübü. Tüm Hakları Saklıdır.
          </p>
          <div className="flex items-center gap-6">
            <a href="/kulup#hukuki" className="hover:text-zinc-300 transition">
              KVKK Aydınlatma Metni
            </a>
            <a href="/kulup#hukuki" className="hover:text-zinc-300 transition">
              Gizlilik Politikası
            </a>
            <a href="/kulup#hukuki" className="hover:text-zinc-300 transition">
              Çerez Politikası
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
