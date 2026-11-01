import React from "react";
import prisma from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";
import { updateMatchScoreAction, syncTffU17Action, syncTffU17FromHtmlAction } from "../actions";
import { readSnapshot } from "@/lib/tff-u17/storage";
import { Trophy, Calendar, Check, RefreshCw, ExternalLink, Shield, Code2 } from "lucide-react";
import { formatDateTime } from "@/lib/utils";

export default async function AdminMatchesPage({
  searchParams,
}: {
  searchParams: Promise<{ tffSuccess?: string; tffError?: string }>;
}) {
  const isAuth = await isAuthenticated();
  if (!isAuth) redirect("/admin/login");

  const { tffSuccess, tffError } = (await searchParams) || {};

  const [matches, u17Snapshot] = await Promise.all([
    prisma.match.findMany({
      orderBy: { matchDate: "desc" },
    }),
    readSnapshot(),
  ]);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-black uppercase text-white font-heading">
          Maç & Skor Yönetimi
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          A Takım fikstür skorlarını manuel düzenleyin ve TFF U17/B Ligi otomatik entegrasyonunu yönetin.
        </p>
      </div>

      {tffSuccess && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
          <Check className="w-4 h-4 shrink-0" />
          <span>TFF U17 verileri başarıyla senkronize edildi! Puan tablosu ve fikstür güncellendi.</span>
        </div>
      )}

      {tffError && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs flex items-start gap-2">
          <Shield className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-semibold">TFF Güvenlik Uyarısı / Engeli:</strong>
            <span>{tffError}</span>
            <span className="block mt-1 text-zinc-400">
              Aşağıdaki &quot;TFF Sayfa Kaynağı (HTML) ile Anında Güncelle&quot; alanına sayfa kaynağını yapıştırarak her zaman anında güncelleyebilirsiniz.
            </span>
          </div>
        </div>
      )}

      {/* TFF U17 SYNC CONTROL CARD */}
      <div className="p-6 rounded-2xl bg-brand-card border border-brand-red/30 shadow-2xl relative overflow-hidden space-y-6">
        <div className="absolute top-0 right-0 w-48 h-48 bg-brand-red/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-brand-red/20 border border-brand-red/40 text-brand-red text-xs font-bold uppercase tracking-wider font-heading">
                TFF Otomasyonu
              </span>
              <span className="text-xs text-zinc-400">
                2026–2027 U17/B Ligi 9. Grup
              </span>
            </div>
            <h3 className="text-lg font-bold text-white uppercase font-heading">
              TFF İstanbul U17 Fikstür & Puan Durumu Senkronizasyonu
            </h3>
            <p className="text-xs text-zinc-400 max-w-xl">
              TFF İstanbul resmî sayfasından 14 haftalık maç takvimi, skorlar, sahalar ve 8 takımlı 9. Grup puan durumu tek tıkla veya zamanlanmış cron ile otomatik çekilir.
            </p>
            <div className="pt-1 flex flex-wrap items-center gap-4 text-xs text-zinc-500">
              <span>
                Durum:{" "}
                <strong className={u17Snapshot ? "text-emerald-400" : "text-amber-400"}>
                  {u17Snapshot ? "Senkronize Edildi" : "Henüz Veri Çekilmedi"}
                </strong>
              </span>
              {u17Snapshot && (
                <span>
                  Son Kontrol:{" "}
                  <strong className="text-zinc-300">
                    {new Date(u17Snapshot.checkedAt).toLocaleString("tr-TR", { timeZone: "Europe/Istanbul" })}
                  </strong>
                </span>
              )}
              {u17Snapshot && (
                <span>
                  Maç Sayısı: <strong className="text-zinc-300">{u17Snapshot.fixtures.length} Maç</strong>
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href="https://tffistanbul.org/kulup/bayrampasa-yenidogan-spor/1477/2026-2027/30/u17-b-ligi/178"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white text-xs font-semibold transition flex items-center gap-1.5"
            >
              TFF Kaynağını Aç <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <form action={syncTffU17Action}>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-brand-red hover:bg-brand-redDark text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-brand-red/30 transition flex items-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                Şimdi Senkronize Et
              </button>
            </form>
          </div>
        </div>

        {/* Fallback Manual HTML Paste in case Cloud Hosting is blocked by TFF WAF */}
        <details className="pt-4 border-t border-zinc-800/80 group">
          <summary className="text-xs text-zinc-400 hover:text-zinc-200 cursor-pointer flex items-center gap-2 select-none font-medium">
            <Code2 className="w-4 h-4 text-brand-red" />
            <span>Yedek Yöntem: TFF Sayfa Kaynağı (HTML) ile Anında Güncelle</span>
            <span className="text-[10px] text-zinc-500 group-open:hidden">(TFF sunucuları yurt dışı IP engeli koyarsa tıklayın)</span>
          </summary>
          <div className="mt-4 p-4 rounded-xl bg-zinc-950/60 border border-zinc-800 text-xs space-y-3">
            <p className="text-zinc-400">
              TFF İstanbul sitesi yurt dışı sunucularını (Vercel/Netlify vb.) güvenlik duvarıyla engelleyebilir. Bu durumda bilgisayarınızdan{" "}
              <a
                href="https://tffistanbul.org/kulup/bayrampasa-yenidogan-spor/1477/2026-2027/30/u17-b-ligi/178"
                target="_blank"
                rel="noreferrer"
                className="text-brand-red underline font-medium"
              >
                TFF U17 Sayfasını
              </a>{" "}
              açıp, sayfaya sağ tıklayıp <strong>Sayfa Kaynağını Görüntüle (Ctrl+U)</strong> diyerek tüm kodu kopyalayıp aşağıdaki alana yapıştırabilirsiniz:
            </p>
            <form action={syncTffU17FromHtmlAction} className="space-y-3">
              <textarea
                name="html"
                rows={3}
                placeholder="TFF sayfasının kaynak kodunu (HTML) buraya yapıştırın..."
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-[11px] focus:outline-none focus:border-brand-red resize-y"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer"
              >
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                HTML Verisini İşle ve Kaydet
              </button>
            </form>
          </div>
        </details>
      </div>

      {/* A TAKIM MANUAL MATCHES */}
      <div>
        <h2 className="text-lg font-bold uppercase text-white font-heading mb-4 border-l-2 border-brand-red pl-2.5">
          A Takım Fikstür ve Skorları
        </h2>
        <div className="space-y-4">
          {matches.map((m) => (
            <div
              key={m.id}
              className="p-6 rounded-2xl bg-brand-card border border-brand-cardBorder shadow-xl space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-zinc-800 text-xs text-zinc-400">
                <span className="font-bold text-white uppercase font-heading">
                  {m.competition} {m.week ? `• ${m.week}. Hafta` : ""}
                </span>
                <span>{formatDateTime(m.matchDate)}</span>
              </div>

              <form action={updateMatchScoreAction} className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <input type="hidden" name="id" value={m.id} />

                {/* Matchup */}
                <div className="flex-1 flex items-center justify-center gap-4 text-sm font-bold text-white uppercase font-heading">
                  <span className={m.homeTeam.includes("Yenidoğan") ? "text-brand-red font-black" : ""}>
                    {m.homeTeam}
                  </span>

                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      name="homeScore"
                      defaultValue={m.homeScore ?? ""}
                      placeholder="—"
                      className="w-12 h-10 text-center rounded-lg bg-zinc-900 border border-zinc-800 text-white font-black text-lg focus:outline-none focus:border-brand-red"
                    />
                    <span className="text-zinc-600">:</span>
                    <input
                      type="number"
                      name="awayScore"
                      defaultValue={m.awayScore ?? ""}
                      placeholder="—"
                      className="w-12 h-10 text-center rounded-lg bg-zinc-900 border border-zinc-800 text-white font-black text-lg focus:outline-none focus:border-brand-red"
                    />
                  </div>

                  <span className={m.awayTeam.includes("Yenidoğan") ? "text-brand-red font-black" : ""}>
                    {m.awayTeam}
                  </span>
                </div>

                {/* Status and Action */}
                <div className="flex items-center gap-3">
                  <select
                    name="status"
                    defaultValue={m.status}
                    className="px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-brand-red"
                  >
                    <option value="UPCOMING">Gelecek Maç (UPCOMING)</option>
                    <option value="FINISHED">Tamamlandı (FINISHED)</option>
                    <option value="LIVE">Canlı (LIVE)</option>
                    <option value="POSTPONED">Ertelendi (POSTPONED)</option>
                  </select>

                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-brand-red hover:bg-brand-redDark text-white font-bold text-xs uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    Kaydet
                  </button>
                </div>
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
