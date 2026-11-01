"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Shield, Calendar, ArrowRight } from "lucide-react";

interface Slide {
  id: number;
  image: string;
  badge: string;
  title: string;
  subtitle: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: "/image/1920x700 erkek takım.jpg",
    badge: "2025-2026 SEZONU • A TAKIM",
    title: "KIRMIZI-SİYAH RUHLA ŞAMPİYONLUK HEDEFİNE!",
    subtitle: "Bayrampaşa Yenidoğan Spor Kulübü, güçlü teknik kadrosu ve inançlı oyuncularıyla sahada fırtına gibi esiyor.",
    primaryCtaText: "A Takım Kadrosu",
    primaryCtaLink: "/takim",
    secondaryCtaText: "Fikstür & Maçlar",
    secondaryCtaLink: "/fikstur",
  },
  {
    id: 2,
    image: "/image/1920x700 kadın takım .jpg",
    badge: "KADIN FUTBOL TAKIMI • TÜRKİYE ŞAMPİYONASI",
    title: "KIZLARIMIZLA TÜRKİYE PLAY-OFF YOLUNDAYIZ!",
    subtitle: "Tüm Bayrampaşalıları tribünleri doldurmaya ve kızlarımızın zafer yürüyüşüne ortak olmaya davet ediyoruz.",
    primaryCtaText: "Haber Detayı",
    primaryCtaLink: "/haberler/son-90-dakika-turkiye-playoff",
    secondaryCtaText: "Kadın Takımı Kadrosu",
    secondaryCtaLink: "/takim?kategori=kadin-takim",
  },
  {
    id: 3,
    image: "/image/1920x700 kadın 2.jpg",
    badge: "1985'TEN GÜNÜMÜZE • BAYRAMPAŞA GURURU",
    title: "GENÇLİK, SPOR VE MAHALLE KÜLTÜRÜ",
    subtitle: "Altyapımızdan yetişen onlarca genç yetenekle geleceği inşa ediyor, semtimizin adını gururla taşıyoruz.",
    primaryCtaText: "Kulüp Tarihçesi",
    primaryCtaLink: "/kulup#tarihce",
    secondaryCtaText: "Tesislerimiz",
    secondaryCtaLink: "/kulup#tesisler",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative w-full h-[520px] md:h-[620px] lg:h-[700px] overflow-hidden bg-black select-none">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          {/* Background Image with optimized sports overlays */}
          <div className="absolute inset-0">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center filter brightness-[0.6] contrast-[1.1] scale-105 transform duration-700"
            />
            {/* Multiple gradients for high contrast and readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
          </div>

          {/* Slide Text Content */}
          <div className="relative z-20 h-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col justify-center items-start">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded bg-brand-red text-white text-xs font-bold tracking-widest uppercase font-heading mb-4 shadow-lg shadow-brand-red/40 animate-pulse">
              <Shield className="w-3.5 h-3.5" />
              {slide.badge}
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase font-heading max-w-3xl leading-[1.08] drop-shadow-md">
              {slide.title}
            </h1>

            <p className="mt-4 text-base md:text-lg text-zinc-300 max-w-2xl font-normal leading-relaxed drop-shadow">
              {slide.subtitle}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={slide.primaryCtaLink}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-brand-red hover:bg-brand-redDark text-white font-bold text-sm uppercase tracking-wider shadow-xl shadow-brand-red/40 transition transform hover:-translate-y-0.5 active:translate-y-0"
              >
                {slide.primaryCtaText}
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={slide.secondaryCtaLink}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 hover:text-white font-bold text-sm uppercase tracking-wider border border-zinc-700/60 backdrop-blur transition"
              >
                {slide.secondaryCtaText}
              </a>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/60 hover:bg-brand-red text-white border border-zinc-700/50 backdrop-blur transition"
        aria-label="Önceki Slayt"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/60 hover:bg-brand-red text-white border border-zinc-700/50 backdrop-blur transition"
        aria-label="Sonraki Slayt"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-1.5 transition-all rounded-full ${
              index === current ? "w-8 bg-brand-red" : "w-2 bg-zinc-600 hover:bg-zinc-400"
            }`}
            aria-label={`Slayt ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
