import React from "react";
import prisma from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";
import { createPlayerAction, deletePlayerAction } from "../actions";
import { Users, Plus, Trash2 } from "lucide-react";

export default async function AdminPlayersPage() {
  const isAuth = await isAuthenticated();
  if (!isAuth) redirect("/admin/login");

  const [players, teams] = await Promise.all([
    prisma.player.findMany({
      orderBy: { number: "asc" },
      include: { team: true },
    }),
    prisma.team.findMany(),
  ]);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-black uppercase text-white font-heading">
          Oyuncu Kadrosu Yönetimi
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Futbolcuları ekleyin, mevkilerini ve forma numaralarını belirleyin.
        </p>
      </div>

      {/* Add Player Form */}
      <div className="p-6 rounded-2xl bg-brand-card border border-brand-cardBorder shadow-xl space-y-4">
        <h3 className="text-base font-bold uppercase text-white font-heading flex items-center gap-2 border-b border-zinc-800 pb-3">
          <Plus className="w-4 h-4 text-brand-red" />
          Yeni Futbolcu Ekle
        </h3>

        <form action={createPlayerAction} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="block font-semibold text-zinc-300 mb-1 uppercase tracking-wider">
                Oyuncu Adı Soyadı *
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="Örn: Yusuf Yılmaz"
                className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-brand-red"
              />
            </div>
            <div>
              <label className="block font-semibold text-zinc-300 mb-1 uppercase tracking-wider">
                Forma Numarası *
              </label>
              <input
                type="number"
                name="number"
                required
                defaultValue="10"
                className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-brand-red"
              />
            </div>
            <div>
              <label className="block font-semibold text-zinc-300 mb-1 uppercase tracking-wider">
                Mevki *
              </label>
              <select
                name="position"
                className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-brand-red"
              >
                <option value="Kaleci">Kaleci</option>
                <option value="Defans">Defans</option>
                <option value="Orta Saha">Orta Saha</option>
                <option value="Forvet">Forvet</option>
                <option value="Kanat">Kanat</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-zinc-300 mb-1 uppercase tracking-wider">
                Bağlı Olduğu Takım *
              </label>
              <select
                name="teamId"
                className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-brand-red"
              >
                {teams.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold text-zinc-300 mb-1 uppercase tracking-wider">
                Fotoğraf Yolu / URL
              </label>
              <input
                type="text"
                name="photoUrl"
                defaultValue="/image/MEHMET BARAN.jpeg"
                className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-brand-red"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-zinc-300 mb-1 uppercase tracking-wider">
              Kısa Biyografi / Not
            </label>
            <textarea
              name="bio"
              rows={2}
              placeholder="Oyuncunun yetenekleri, özellikleri ve futbol geçmişi..."
              className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-brand-red resize-none"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg bg-brand-red hover:bg-brand-redDark text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-brand-red/30 transition cursor-pointer"
          >
            Futbolcuyu Kaydet
          </button>
        </form>
      </div>

      {/* Players List Table */}
      <div className="rounded-2xl bg-brand-card border border-brand-cardBorder overflow-hidden shadow-xl">
        <div className="p-4 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between">
          <span className="text-xs font-bold uppercase text-white font-heading">
            Kadro Listesi ({players.length})
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-500 uppercase font-semibold">
                <th className="p-4">Fotoğraf & Adı</th>
                <th className="p-4 text-center">No</th>
                <th className="p-4">Mevki</th>
                <th className="p-4">Takım</th>
                <th className="p-4 text-center">Maç / Gol / Asist</th>
                <th className="p-4 text-right">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 font-medium">
              {players.map((p) => (
                <tr key={p.id} className="hover:bg-zinc-800/40">
                  <td className="p-4 flex items-center gap-3">
                    <img
                      src={p.photoUrl}
                      alt={p.name}
                      className="w-10 h-10 rounded-full object-cover bg-zinc-900 shrink-0"
                    />
                    <span className="font-bold text-white uppercase font-heading">{p.name}</span>
                  </td>
                  <td className="p-4 text-center font-bold text-brand-red font-heading text-sm">
                    #{p.number}
                  </td>
                  <td className="p-4 text-zinc-300">{p.position}</td>
                  <td className="p-4 text-zinc-400">{p.team.name}</td>
                  <td className="p-4 text-center text-zinc-400">
                    {p.matchesPlayed} / {p.goals} / {p.assists}
                  </td>
                  <td className="p-4 text-right">
                    <form action={deletePlayerAction.bind(null, p.id)}>
                      <button
                        type="submit"
                        className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-950/30 transition cursor-pointer"
                        title="Oyuncuyu Sil"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
