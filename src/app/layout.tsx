import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://bayrampasa-yenidogan.org.tr"),
  title: {
    default: "Bayrampaşa Yenidoğan Spor Kulübü • Resmî Web Sitesi",
    template: "%s | Bayrampaşa Yenidoğan SK",
  },
  description:
    "Bayrampaşa Yenidoğan Spor Kulübü resmî internet sitesi. A Takım, Kadın Futbol Takımı, maç fikstürü, güncel haberler, puan durumu ve kulüp bilgileri.",
  keywords: [
    "Bayrampaşa Yenidoğan",
    "Yenidoğan Spor Kulübü",
    "Bayrampaşa Futbol",
    "İstanbul Süper Amatör",
    "Kadın Futbolu",
    "Fikstür",
    "Puan Durumu",
  ],
  authors: [{ name: "Bayrampaşa Yenidoğan Spor Kulübü" }],
  creator: "Bayrampaşa Yenidoğan Spor Kulübü",
  icons: {
    icon: "/image/bayrampasa-logo.png",
    apple: "/image/bayrampasa-logo.png",
  },
  openGraph: {
    title: "Bayrampaşa Yenidoğan Spor Kulübü • Resmî Web Sitesi",
    description:
      "A Takım, Kadın Futbolu, Fikstür, Puan Durumu ve Bayrampaşa Yenidoğan SK'ya dair tüm resmî gelişmeler.",
    url: "https://bayrampasa-yenidogan.org.tr",
    siteName: "Bayrampaşa Yenidoğan Spor Kulübü",
    images: [
      {
        url: "/image/1920x700 erkek takım.jpg",
        width: 1920,
        height: 700,
        alt: "Bayrampaşa Yenidoğan SK Takım Fotoğrafı",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto+Condensed:ital,wght@0,400;0,700;0,900;1,700&display=swap"
          rel="stylesheet"
        />
        {/* SportsTeam JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SportsTeam",
              name: "Bayrampaşa Yenidoğan Spor Kulübü",
              sport: "Football",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Yenidoğan Mahallesi",
                addressLocality: "Bayrampaşa",
                addressRegion: "İstanbul",
                addressCountry: "TR",
              },
              logo: "https://bayrampasa-yenidogan.org.tr/image/bayrampaşa logo.png",
              url: "https://bayrampasa-yenidogan.org.tr",
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#0a0a0c] text-zinc-100 antialiased selection:bg-brand-red selection:text-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
