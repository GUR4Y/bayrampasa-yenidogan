import React from "react";
import { ArrowLeft, ShieldAlert } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="w-20 h-20 rounded-3xl bg-zinc-900 border border-zinc-800 p-3 flex items-center justify-center mb-6 shadow-2xl">
        <ShieldAlert className="w-10 h-10 text-brand-red animate-bounce" />
      </div>

      <span className="text-xs font-black tracking-widest text-brand-red uppercase font-heading">
        HATA 404
      </span>

      <h1 className="text-3xl md:text-5xl font-black text-white uppercase font-heading mt-2">
        Aradığınız Sayfa Bulunamadı
      </h1>

      <p className="mt-3 text-sm text-zinc-400 max-w-md">
        Ulaşmaya çalıştığınız sayfa kaldırılmış, adı değiştirilmiş veya geçici olarak kullanım dışı kalmış olabilir.
      </p>

      <div className="mt-8">
        <a
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-red hover:bg-brand-redDark text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-brand-red/30 transition transform hover:-translate-y-0.5"
        >
          <ArrowLeft className="w-4 h-4" />
          Anasayfaya Dön
        </a>
      </div>
    </div>
  );
}
