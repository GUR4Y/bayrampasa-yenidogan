import React from "react";

interface SponsorItem {
  id: string;
  name: string;
  tier: string;
  logoUrl: string;
  website?: string | null;
}

interface SponsorsProps {
  sponsors: SponsorItem[];
}

export default function SponsorsSection({ sponsors }: SponsorsProps) {
  return (
    <div className="w-full py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-red font-heading">
            İŞ BİRLİKLERİMİZ
          </span>
          <h2 className="text-2xl font-extrabold uppercase text-white font-heading mt-1">
            Resmî Sponsorlarımız
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-center">
          {sponsors.map((sponsor) => (
            <a
              key={sponsor.id}
              href={sponsor.website || "#"}
              target={sponsor.website && sponsor.website !== "#" ? "_blank" : "_self"}
              rel="noreferrer"
              className="group p-6 rounded-xl bg-brand-card/50 border border-brand-cardBorder/60 hover:border-brand-red/40 flex flex-col items-center justify-center transition shadow-sm hover:-translate-y-1"
            >
              <div className="h-16 w-32 flex items-center justify-center">
                <img
                  src={sponsor.logoUrl}
                  alt={sponsor.name}
                  className="max-h-14 max-w-full object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition duration-300"
                />
              </div>
              <span className="mt-3 text-xs font-semibold text-zinc-400 group-hover:text-white transition uppercase font-heading text-center">
                {sponsor.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
