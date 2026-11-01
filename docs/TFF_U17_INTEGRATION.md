# 🏆 Bayrampaşa Yenidoğan SK — TFF İstanbul U17/B 9. Grup Entegrasyonu

> **Kapsam:** Yalnızca 2026–2027 Sezonu U17/B Ligi 9. Grup.  
> **Resmî Kaynak:** [https://tffistanbul.org/kulup/bayrampasa-yenidogan-spor/1477/2026-2027/30/u17-b-ligi/178#group](https://tffistanbul.org/kulup/bayrampasa-yenidogan-spor/1477/2026-2027/30/u17-b-ligi/178#group)  
> **Durum:** Canlı TFF HTML'iyle doğrulandı, Prisma veritabanına ve web arayüzüne tam entegre edildi.

---

## 1. Mimari Genel Bakış

Bu entegrasyon, mevcut A Takım fikstür sistemine, veritabanına ve admin paneline hiçbir zarar vermeden, tamamen izole ve güvenli bir **doğrulanmış snapshot mimarisi** ile geliştirilmiştir:

1. **Ayrıştırıcı (Parser):** [src/lib/tff-u17/parser.ts](file:///c:/Users/güray/Desktop/bayrampasa-yenidogan-main/bayrampasa-yenidogan-main/src/lib/tff-u17/parser.ts)
   * TFF İstanbul'un canlı HTML yapısı test edilmiş; 9. Grup'taki 8 takımın puan durumu ve kulübümüzün 14 haftalık maç takvimi (skorlar, sahalar, saatler) %100 doğrulukla ayrıştırılmıştır.
   * **Fail-Closed Güvenliği:** Kaynaktaki HTML'de yapısal bozulma veya beklenmeyen içerik olması durumunda hata fırlatır; veritabanındaki mevcut kayıtları asla bozmaz veya silmez.
2. **Kayıt Koruma (Field Preservation):** [src/lib/tff-u17/sync.ts](file:///c:/Users/güray/Desktop/bayrampasa-yenidogan-main/bayrampasa-yenidogan-main/src/lib/tff-u17/sync.ts)
   * TFF sayfasında henüz tarihi veya sahası netleşmemiş ("Tarih Belirlenmedi") bir maç varsa, sistemde önceden kayıtlı bilinen veriyi korur.
3. **Veri Depolama (Storage):** [src/lib/tff-u17/storage.ts](file:///c:/Users/güray/Desktop/bayrampasa-yenidogan-main/bayrampasa-yenidogan-main/src/lib/tff-u17/storage.ts)
   * Prisma ORM (`model TffU17Snapshot`) kullanır. Hem yerel SQLite hem de canlı PostgreSQL ortamlarında sıfır dış bağımlılıkla çalışır.
4. **Kullanıcı Arayüzü (UI):**
   * [src/components/u17/TffU17StandingsTable.tsx](file:///c:/Users/güray/Desktop/bayrampasa-yenidogan-main/bayrampasa-yenidogan-main/src/components/u17/TffU17StandingsTable.tsx)
   * [src/components/u17/TffU17FixturesList.tsx](file:///c:/Users/güray/Desktop/bayrampasa-yenidogan-main/bayrampasa-yenidogan-main/src/components/u17/TffU17FixturesList.tsx)
   * `/puan-durumu` ve `/fikstur` sayfalarında sekme (tab) üzerinden A Takım ile U17/B Ligi arasında geçiş yapılabilir.

---

## 2. Otomasyon ve Bulut Tabanlı Zamanlanmış Görev (Cron)

Kullanıcının bilgisayarının veya yerel sunucunun açık olmasına gerek kalmadan, tamamen ücretsiz bulut ortamında çalışır:

### A. Vercel Cron (`vercel.json`)
Vercel üzerinde her 30 dakikada bir otomatik tetiklenir:
```json
{
  "crons": [
    {
      "path": "/api/tff/u17/sync",
      "schedule": "*/30 * * * *"
    }
  ]
}
```

### B. Netlify Scheduled Functions (`netlify/functions/tff-u17-cron.mts`)
Netlify üzerinde deploy edildiğinde arka planda 30 dakikada bir `/api/tff/u17/sync` endpoint'ini güvenli `Bearer` token ile tetikler.

### C. Admin Panelinden Anlık Senkronizasyon
Yöneticiler `/admin/maclar` sayfasından **"Şimdi Senkronize Et"** butonuna basarak anında canlı TFF verisini güncelleyebilir.

---

## 3. Resmî İzin ve Yasal Hususlar

* TFF'nin verileri otomatik olarak çekilip yeniden yayımlanırken telif ve kullanım koşulları gözetilmelidir.
* Bu sebeple güvenlik ve iyi niyet gereği `.env` içerisinde `TFF_SYNC_ENABLED` varsayılan olarak `false` tutulmuştur.
* Resmî kulüp yönetimi veya TFF'den onay teyidi alındıktan sonra canlı sunucuda `TFF_SYNC_ENABLED="true"` yapılarak otomatik periyodik senkronizasyon devreye alınabilir.
