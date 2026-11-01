import React from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { Camera, Video, Image as ImageIcon } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medya Merkezi & Fotoğraf Galerisi",
  description:
    "Bayrampaşa Yenidoğan Spor Kulübü maç fotoğrafları, antrenman galerisi, kulüp etkinlikleri ve video içerikleri.",
};

export default function MediaPage() {
  const galleryItems = [
    {
      title: "A Takım Sezon Hazırlıkları ve Taktik İdmanı",
      category: "Antrenman",
      image: "/image/1920x700 erkek takım.jpg",
      date: "Ekim 2026",
    },
    {
      title: "Kadın Futbol Takımımızın Tarihî Zaferi",
      category: "Maç Fotoğrafları",
      image: "/image/1920x700 kadın takım .jpg",
      date: "Mayıs 2024",
    },
    {
      title: "Kadınlar Türkiye Şampiyonası Play-off Coşkusu",
      category: "Kutlama",
      image: "/image/1920x700 kadın 2.jpg",
      date: "Nisan 2024",
    },
    {
      title: "A Takım Maç Seremonisi ve Taraftar Desteği",
      category: "Maç Fotoğrafları",
      image: "/image/A TAKIM.png",
      date: "Eylül 2024",
    },
    {
      title: "Bayrampaşa Belediye Stadı Zemin ve Tesisleri",
      category: "Tesis",
      image: "/image/yenidogan.jpg",
      date: "2024",
    },
    {
      title: "Sezon Başı Toplu Kadro ve Forma Tanıtımı",
      category: "Tanıtım",
      image: "/image/bp1.jpg",
      date: "2024",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
      <SectionHeading
        badge="GÖRSEL ARŞİV"
        title="Medya Merkezi & Galeriler"
        subtitle="Müsabakalardan, antrenmanlardan ve kulüp hayatından unutulmaz anlar."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {galleryItems.map((item, idx) => (
          <div
            key={idx}
            className="group rounded-2xl bg-brand-card border border-brand-cardBorder overflow-hidden shadow-xl hover:border-zinc-700 transition duration-300"
          >
            <div className="relative h-64 w-full overflow-hidden bg-zinc-900">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded bg-black/80 backdrop-blur border border-zinc-700 text-brand-red text-[10px] font-bold uppercase tracking-wider font-heading">
                {item.category}
              </span>
            </div>
            <div className="p-5">
              <span className="text-[10px] text-zinc-500 font-semibold uppercase">{item.date}</span>
              <h3 className="text-base font-bold text-white uppercase font-heading mt-1 group-hover:text-brand-red transition">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
