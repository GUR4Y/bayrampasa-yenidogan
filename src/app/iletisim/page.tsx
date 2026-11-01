"use client";

import React, { useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate submission or call API
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ fullName: "", email: "", phone: "", subject: "", message: "" });
    }, 700);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 space-y-16">
      <SectionHeading
        badge="İLETİŞİM & LOKASYON"
        title="Bize Ulaşın"
        subtitle="Kulübümüz, altyapı kayıtları, biletler ve sponsorluklar hakkında her türlü soru için yanınızdayız."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-brand-card border border-brand-cardBorder space-y-6 shadow-xl">
            <h3 className="text-xl font-bold uppercase text-white font-heading border-b border-zinc-800 pb-3">
              Kulüp İrtibat Bilgileri
            </h3>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-red/10 border border-brand-red/30 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-brand-red" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase text-zinc-400">Adres</span>
                <p className="text-sm font-medium text-white mt-0.5">
                  Yenidoğan Mahallesi, Bayrampaşa Belediye Stadı Yanı, Bayrampaşa / İstanbul
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-red/10 border border-brand-red/30 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-brand-red" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase text-zinc-400">Telefon</span>
                <p className="text-sm font-medium text-white mt-0.5">+90 (212) 567 20 24</p>
                <p className="text-xs text-zinc-500">Santral & İdari İşler</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-red/10 border border-brand-red/30 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-brand-red" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase text-zinc-400">E-Posta</span>
                <p className="text-sm font-medium text-white mt-0.5">
                  iletisim@bayrampasayenidogan.org.tr
                </p>
                <p className="text-xs text-zinc-500">basin@bayrampasayenidogan.org.tr</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-red/10 border border-brand-red/30 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-brand-red" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase text-zinc-400">Mesai Saatleri</span>
                <p className="text-sm font-medium text-white mt-0.5">
                  Hafta İçi: 09:00 - 18:00
                </p>
                <p className="text-xs text-zinc-500">Hafta Sonu: Maç günleri açık</p>
              </div>
            </div>
          </div>

          {/* Club Badges / Legacy graphics from original project */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex flex-col items-center justify-center">
              <img src="/image/1.png" alt="Kulüp Rozeti 1" className="h-20 object-contain filter drop-shadow-md" />
              <span className="mt-2 text-[10px] font-bold text-zinc-400 uppercase tracking-wider font-heading">
                Resmî Lisanslı Ürünler
              </span>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex flex-col items-center justify-center">
              <img src="/image/2.png" alt="Kulüp Rozeti 2" className="h-20 object-contain filter drop-shadow-md" />
              <span className="mt-2 text-[10px] font-bold text-zinc-400 uppercase tracking-wider font-heading">
                Futbol Akademisi
              </span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-8 rounded-2xl bg-brand-card border border-brand-cardBorder shadow-2xl">
            <h3 className="text-2xl font-bold uppercase text-white font-heading mb-2">
              Bize Mesaj Gönderin
            </h3>
            <p className="text-xs text-zinc-400 mb-6">
              Formu doldurarak istek, öneri veya bilgi taleplerinizi iletebilirsiniz. En kısa sürede yanıtlanacaktır.
            </p>

            {submitted ? (
              <div className="p-6 rounded-xl bg-emerald-950/40 border border-emerald-800/80 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white font-heading">Mesajınız Alındı!</h4>
                <p className="text-xs text-zinc-300">
                  Kulüp yetkililerimiz en kısa sürede sizinle e-posta veya telefon üzerinden iletişime geçecektir.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-4 py-2 rounded-lg bg-zinc-800 text-xs font-semibold text-white hover:bg-zinc-700"
                >
                  Yeni Mesaj Gönder
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5 uppercase tracking-wider">
                      Adınız Soyadınız *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Ahmet Yılmaz"
                      className="w-full px-4 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-brand-red transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5 uppercase tracking-wider">
                      E-Posta Adresiniz *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ahmet@example.com"
                      className="w-full px-4 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-brand-red transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5 uppercase tracking-wider">
                      Telefon Numaranız
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0532 000 00 00"
                      className="w-full px-4 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-brand-red transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5 uppercase tracking-wider">
                      Konu *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Altyapı Seçmeleri / Sponsorluk vb."
                      className="w-full px-4 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-brand-red transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5 uppercase tracking-wider">
                    Mesajınız *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Mesajınızı buraya yazınız..."
                    className="w-full px-4 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-brand-red transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-brand-red hover:bg-brand-redDark text-white font-bold text-sm uppercase tracking-wider shadow-lg shadow-brand-red/40 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  {loading ? "Gönderiliyor..." : "Mesajı Gönder"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Google Maps Embed with Responsive 100% width and clean border */}
      <div className="rounded-3xl overflow-hidden border border-brand-cardBorder shadow-2xl">
        <div className="p-4 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold uppercase text-white font-heading">
            <MapPin className="w-4 h-4 text-brand-red" />
            Kulüp Konumu (Google Haritalar)
          </div>
          <span className="text-xs text-zinc-400">Bayrampaşa Yenidoğan Spor Kulübü</span>
        </div>
        <div className="relative w-full h-[400px] md:h-[480px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3009.496543600939!2d28.913887611183508!3d41.03626931758196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cabbe4227d0cf7%3A0x7c4835e6da93ecad!2zQkFZUkFNUEHFnkEgWUVOxLBET8SeQU4gU1BPUiBLTMOcQsOc!5e0!3m2!1str!2str!4v1715326986024!5m2!1str!2str"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Bayrampaşa Yenidoğan Spor Kulübü Konumu"
          />
        </div>
      </div>
    </div>
  );
}
