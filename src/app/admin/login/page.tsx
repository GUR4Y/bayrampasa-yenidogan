"use client";

import React, { useState } from "react";
import { loginAdminAction } from "../actions";
import { Lock, Shield, ArrowLeft } from "lucide-react";

export default function AdminLoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const res = await loginAdminAction(formData);
    if (res?.error) {
      setError(res.error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-md p-8 rounded-3xl bg-brand-card border border-brand-cardBorder shadow-2xl relative">
        <a
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition mb-6"
        >
          <ArrowLeft className="w-4 h-4 text-brand-red" />
          Siteye Geri Dön
        </a>

        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 p-2 mx-auto flex items-center justify-center shadow-lg">
            <img
              src="/image/bayrampaşa logo.png"
              alt="Arma"
              className="w-12 h-12 object-contain"
            />
          </div>
          <h1 className="text-2xl font-black uppercase text-white font-heading mt-4">
            Kulüp Yönetim Paneli
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Bayrampaşa Yenidoğan SK Yönetici ve Editör Girişi
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-950/60 border border-red-800 text-xs text-red-200 text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
              E-Posta Adresi
            </label>
            <input
              type="email"
              name="email"
              required
              defaultValue="admin@yenidogansk.org.tr"
              className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-brand-red transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
              Şifre
            </label>
            <input
              type="password"
              name="password"
              required
              defaultValue="admin"
              className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-brand-red transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-brand-red hover:bg-brand-redDark text-white font-bold text-sm uppercase tracking-wider shadow-lg shadow-brand-red/40 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Lock className="w-4 h-4" />
            {loading ? "Giriş Yapılıyor..." : "Güvenli Giriş"}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-zinc-800/80 text-center">
          <span className="text-[11px] text-zinc-500">
            Varsayılan Demo Girişi: <span className="text-zinc-300 font-mono">admin@yenidogansk.org.tr</span> / <span className="text-zinc-300 font-mono">admin</span>
          </span>
        </div>
      </div>
    </div>
  );
}
