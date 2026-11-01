import React from "react";
import prisma from "@/lib/prisma";
import SectionHeading from "@/components/ui/SectionHeading";
import { Handshake, Mail, Phone, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sponsorlarımız & İş Ortaklarımız",
  description:
    "Bayrampaşa Yenidoğan Spor Kulübü resmî sponsorları, kurumsal destekçileri ve sponsorluk başvuru bilgileri.",
};

export default async function SponsorsPage() {
  const sponsors = await prisma.sponsor.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 space-y-16">
      <div>
        <SectionHeading
          badge="İŞ ORTAKLIKLARI"
          title="Resmî Sponsorlarımız & Destekçilerimiz"
          subtitle="Kulübümüzün sportif başarısına ve genç sporcularımızın geleceğine güç katan kurumlar."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sponsors.map((s) => (
            <div
              key={s.id}
              className="p-8 rounded-2xl bg-brand-card border border-brand-cardBorder flex flex-col items-center justify-between text-center shadow-lg hover:border-zinc-700 transition"
            >
              <div className="h-28 w-44 flex items-center justify-center p-2">
                <img
                  src={s.logoUrl}
                  alt={s.name}
                  className="max-h-24 max-w-full object-contain filter drop-shadow-md"
                />
              </div>

              <div className="mt-6 w-full pt-4 border-t border-zinc-800">
                <span className="text-[11px] font-bold text-brand-red uppercase tracking-wider block font-heading">
                  {s.tier === "MAIN" ? "Ana Sponsor" : s.tier === "SHIRT" ? "Forma Sponsoru" : "Resmî Destekçi"}
                </span>
                <h3 className="text-lg font-bold text-white uppercase font-heading mt-1">
                  {s.name}
                </h3>
                {s.website && s.website !== "#" && (
                  <a
                    href={s.website}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-zinc-400 hover:text-white transition mt-3"
                  >
                    Web Sitesini Ziyaret Et &rarr;
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sponsor Application CTA Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-brand-card via-zinc-900 to-black border border-brand-cardBorder p-8 md:p-12 relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-2xl space-y-3">
          <span className="px-3 py-1 rounded bg-brand-red/20 border border-brand-red/40 text-brand-red text-xs font-bold uppercase tracking-wider font-heading">
            KULÜBÜMÜZE DESTEK OLUN
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-white uppercase font-heading">
            Bayrampaşa Yenidoğan Ailesine Katılın
          </h2>
          <p className="text-sm text-zinc-300 leading-relaxed">
            Forma göğüs reklamı, stadyum içi panolar, dijital medya sponsorlukları ve gençlik akademisi destek paketlerimiz hakkında detaylı bilgi almak için kurumsal iletişim departmanımızla irtibata geçebilirsiniz.
          </p>
        </div>

        <div className="shrink-0">
          <a
            href="/iletisim"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-red hover:bg-brand-redDark text-white font-bold text-sm uppercase tracking-wider shadow-lg shadow-brand-red/40 transition transform hover:-translate-y-0.5"
          >
            <Handshake className="w-5 h-5" />
            Sponsorluk Başvurusu
          </a>
        </div>
      </div>
    </div>
  );
}
