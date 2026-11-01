import React from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { Shield, Trophy, Users, MapPin, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kulübümüz • Tarihçe, Yönetim ve Tesisler",
  description:
    "Bayrampaşa Yenidoğan Spor Kulübü kurumsal bilgileri, kulüp tarihi, yönetim kurulu listesi ve spor tesislerimiz.",
};

export default function ClubPage() {
  const boardMembers = [
    { name: "Mustafa Demir", role: "Kulüp Başkanı", term: "2022 - Günümüz" },
    { name: "Hasan Çelik", role: "Başkan Vekili", term: "2022 - Günümüz" },
    { name: "Serkan Aydın", role: "Futbol Şube Sorumlusu", term: "2023 - Günümüz" },
    { name: "Emre Kurt", role: "Altyapı Koordinatörü", term: "2021 - Günümüz" },
    { name: "Ali Yılmaz", role: "Mali İşler & Muhasebe", term: "2022 - Günümüz" },
    { name: "Mehmet Öztürk", role: "Basın Sözcüsü & Medya", term: "2024 - Günümüz" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 space-y-16">
      {/* 1. HERO HEADER */}
      <div>
        <SectionHeading
          badge="KURUMSAL KİMLİK"
          title="Bayrampaşa Yenidoğan Spor Kulübü"
          subtitle="1985 yılından günümüze uzanan asırlık semt kültürü ve futbol tutkusu."
        />

        <div className="relative rounded-3xl overflow-hidden h-[340px] md:h-[420px] bg-zinc-900 border border-zinc-800 shadow-2xl">
          <img
            src="/image/1920x700 erkek takım.jpg"
            alt="Kulüp Tarihçesi"
            className="w-full h-full object-cover filter brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 max-w-3xl">
            <span className="px-3 py-1 rounded bg-brand-red text-white text-xs font-bold uppercase tracking-wider font-heading">
              KURULUŞ: 1985
            </span>
            <h1 className="text-2xl md:text-4xl font-black text-white uppercase font-heading mt-3">
              Semtimizin Kalbinde, Gençlerimizin Yanında
            </h1>
            <p className="text-zinc-300 text-sm md:text-base mt-2">
              Kırmızı ve siyahın asaletiyle donatılmış armamız, Bayrampaşa Yenidoğan sokaklarında
              başlayan bir hayalin nesilden nesile aktarılan sembolüdür.
            </p>
          </div>
        </div>
      </div>

      {/* 2. TARİHÇE (HISTORY) */}
      <section id="tarihce" className="scroll-mt-24">
        <h2 className="text-2xl font-black uppercase text-white font-heading mb-6 border-l-4 border-brand-red pl-3">
          Kulüp Tarihçesi
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-zinc-300 leading-relaxed text-sm md:text-base">
          <div className="space-y-4">
            <p>
              Bayrampaşa Yenidoğan Spor Kulübü, 1985 yılında mahalle gençlerinin spor yapabileceği,
              kötü alışkanlıklardan uzak durarak ahlaklı ve sağlıklı bireyler olarak yetişebileceği
              bir çatı oluşturmak amacıyla semt büyükleri tarafından kurulmuştur.
            </p>
            <p>
              Kuruluşundan itibaren amatör liglerde sergilediği centilmence ve mücadeleci futbolla
              kısa sürede İstanbul futbol kamuoyunun saygısını kazanmıştır. Kulübümüz sadece erkek
              futbolunda değil, Kadın Futbol Takımımızla da ülke çapında ses getirmiş ve Türkiye
              Şampiyonası Play-off'larına kadar yükselmiştir.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-brand-card border border-brand-cardBorder space-y-4">
            <h3 className="text-white font-bold text-base uppercase font-heading border-b border-zinc-800 pb-3 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-brand-red" />
              Temel İlkelerimiz & Misyonumuz
            </h3>
            <ul className="space-y-3 text-xs md:text-sm text-zinc-300">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                <span>Spor ahlakı ve Fair-play ruhunu her türlü sportif başarının üzerinde tutmak.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                <span>Bayrampaşa ve çevre semtlerdeki yetenekli gençleri keşfedip Türk futboluna kazandırmak.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                <span>Kadın futbolunun gelişimine öncülük ederek kız çocuklarının spora katılımını teşvik etmek.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                <span>Modern tesis ve antrenman metotlarıyla sürdürülebilir bir kulüp yapısı inşa etmek.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. YÖNETİM KURULU */}
      <section id="yonetim" className="scroll-mt-24">
        <h2 className="text-2xl font-black uppercase text-white font-heading mb-6 border-l-4 border-brand-red pl-3">
          Yönetim Kurulu
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {boardMembers.map((member, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-brand-card border border-brand-cardBorder shadow-md hover:border-zinc-700 transition"
            >
              <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center font-bold text-brand-red text-base mb-4 font-heading">
                BY
              </div>
              <span className="text-xs font-bold text-brand-red uppercase tracking-wider">
                {member.role}
              </span>
              <h3 className="text-lg font-bold text-white uppercase font-heading mt-1">
                {member.name}
              </h3>
              <span className="text-xs text-zinc-500 block mt-1">{member.term}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. TESİSLERİMİZ */}
      <section id="tesisler" className="scroll-mt-24">
        <h2 className="text-2xl font-black uppercase text-white font-heading mb-6 border-l-4 border-brand-red pl-3">
          Tesislerimiz
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-xl h-72">
            <img
              src="/image/yenidogan.jpg"
              alt="Bayrampaşa Belediye Stadı"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold uppercase text-white font-heading">
              Bayrampaşa Belediye Stadı & Kulüp Lokali
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed">
              A Takım ve Kadın Takımımız, lig müsabakalarını ve resmi antrenmanlarını modern
              standartlara sahip Bayrampaşa Belediye Stadı'nda gerçekleştirmektedir. Tesisimiz; UEFA
              standartlarında sentetik çim zemin, aydınlatma sistemi, modern soyunma odaları ve
              sağlık merkezine sahiptir.
            </p>
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <MapPin className="w-4 h-4 text-brand-red" />
              <span>Yenidoğan Mah., Bayrampaşa / İstanbul</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HUKUKİ VE YASAL BİLGİLENDİRME */}
      <section id="hukuki" className="scroll-mt-24 pt-8 border-t border-zinc-800">
        <h2 className="text-xl font-bold uppercase text-white font-heading mb-4">
          Hukuki ve Yasal Bilgilendirme
        </h2>
        <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-400 space-y-3 leading-relaxed">
          <p>
            <strong>KVKK ve Gizlilik Politikası:</strong> Bayrampaşa Yenidoğan Spor Kulübü Derneği, 6698 sayılı Kişisel Verilerin Korunması Kanunu uyarınca, üyelerinin, sporcularının ve site ziyaretçilerinin kişisel verilerini gizlilik ve güvenlik esaslarına tam riayet ederek muhafaza etmektedir.
          </p>
          <p>
            <strong>Çerez Politikası:</strong> Resmî internet sitemizde yalnızca temel kullanım ve oturum fonksiyonlarının sürdürülebilmesi için teknik çerezler kullanılmaktadır. Üçüncü taraf takip ve hedefli reklam çerezleri bulunmamaktadır.
          </p>
        </div>
      </section>
    </div>
  );
}
