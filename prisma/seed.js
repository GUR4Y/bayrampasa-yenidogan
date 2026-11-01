const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // 1. Club Settings
  await prisma.clubSettings.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      clubName: 'Bayrampaşa Yenidoğan Spor Kulübü',
      shortName: 'Bayrampaşa Yenidoğan SK',
      establishedYear: 1985,
      stadiumName: 'Bayrampaşa Belediye Stadı',
      address: 'Yenidoğan Mahallesi, Bayrampaşa, İstanbul',
      phone: '+90 (212) 567 20 24',
      email: 'iletisim@bayrampasayenidogan.org.tr',
      instagram: 'https://instagram.com/bayrampasa_yenidogan_sk',
      facebook: 'https://facebook.com/bayrampasayenidogan',
      twitter: 'https://twitter.com/yenidogansk',
      youtube: 'https://youtube.com',
    },
  });

  // 2. Admin User
  await prisma.user.upsert({
    where: { email: 'admin@yenidogansk.org.tr' },
    update: {},
    create: {
      email: 'admin@yenidogansk.org.tr',
      name: 'Kulüp Yöneticisi',
      password: 'admin', // plain or hash; verified in auth logic
      role: 'ADMIN',
    },
  });

  // 3. News Categories
  const catFutbol = await prisma.newsCategory.upsert({
    where: { slug: 'futbol' },
    update: {},
    create: { name: 'A Takım', slug: 'futbol' },
  });

  const catKadin = await prisma.newsCategory.upsert({
    where: { slug: 'kadin-futbol' },
    update: {},
    create: { name: 'Kadın Futbolu', slug: 'kadin-futbol' },
  });

  const catKulup = await prisma.newsCategory.upsert({
    where: { slug: 'kulup-haberleri' },
    update: {},
    create: { name: 'Kulüp Haberleri', slug: 'kulup-haberleri' },
  });

  // 4. News (Orijinal siteden korunan ve zenginleştirilen haberler)
  await prisma.news.deleteMany(); // clean for fresh seed
  await prisma.news.createMany({
    data: [
      {
        title: "Bayram Terzi Kırmızı-Siyahlı Renklerimize Bağlandı",
        slug: "bayram-terzi-imza-atti",
        summary: "Kırmızı-siyahlı ekibimiz 1993 doğumlu tecrübeli futbolcu Bayram Terzi ile sözleşme imzaladı.",
        content: `Bayrampaşa Yenidoğan Spor Kulübümüz, yeni sezon transfer çalışmaları kapsamında tecrübeli hücum oyuncusu Bayram Terzi'yi kadrosuna kattı. 1993 doğumlu başarılı futbolcu, daha önce Bayrampaşa Sinopspor ve Gürzaferspor formalarını başarıyla terletmişti. Kulüp binamızda düzenlenen imza töreninde konuşan Terzi: 'Yenidoğan ailesine katıldığım için son derece gururluyum. Şampiyonluk için terimin son damlasına kadar savaşacağım' ifadelerini kullandı.`,
        imageUrl: "/image/bayram-terzi-bayrampasa-yenido_1676614538_nwXM8e (1).png",
        isFeatured: true,
        isPublished: true,
        publishedAt: new Date("2024-05-10T10:00:00Z"),
        categoryId: catFutbol.id,
      },
      {
        title: "SON 90 DAKİKA: Kızlarımızı Yalnız Bırakmayalım!",
        slug: "son-90-dakika-turkiye-playoff",
        summary: "Bayrampaşa'mızı Türkiye Play-offlarında temsil edebilmek için son maçımıza tüm Bayrampaşalılar davetlidir.",
        content: `Kadın Futbol Takımımız muhteşem bir sezonun ardından Türkiye Şampiyonası Play-off biletini kapmak için sahaya çıkıyor. Kulüp Başkanımız ve teknik heyetimiz tüm semt halkını ve taraftarlarımızı tribünleri doldurmaya çağırdı. Bayrampaşa'mızı en iyi şekilde temsil etmek için var güçleriyle mücadele eden sporcularımıza tribün desteği şart!`,
        imageUrl: "/image/WhatsApp Image 2024-04-30 at 11.21.11.jpeg",
        isFeatured: true,
        isPublished: true,
        publishedAt: new Date("2024-05-01T14:30:00Z"),
        categoryId: catKadin.id,
      },
      {
        title: "A Takımımız Yeni Sezona Parolası Şampiyonluk Olarak Başladı",
        slug: "yeni-sezon-hazirliklari-basladi",
        summary: "Kırmızı-siyahlılarımız Bayrampaşa Belediye Stadı'nda gerçekleştirdiği antrenmanla sezon hazırlıklarını sürdürüyor.",
        content: `İstanbul Süper Amatör Ligi'nde mücadele eden A Takımımız, teknik heyet eşliğinde haftalık taktik ve kondisyon yükleme çalışmalarını tamamladı. Futbolcularımızın hırslı ve moralli halleri camiamıza büyük güven veriyor.`,
        imageUrl: "/image/1920x700 erkek takım.jpg",
        isFeatured: false,
        isPublished: true,
        publishedAt: new Date("2024-06-15T09:00:00Z"),
        categoryId: catFutbol.id,
      },
      {
        title: "Kadın Futbol Takımımız Namağlup Zirvede",
        slug: "kadin-futbol-takimimiz-namaglup-zirvede",
        summary: "Ligde fırtına gibi esen kadın takımımız oynadığı son maçı da farklı kazanarak taraftarlarını mest etti.",
        content: `Kulübümüzün gururu kadın futbol takımımız, disiplinli oyunu ve hücumdaki etkinliğiyle grubunda liderliğini sürdürüyor. Altyapıdan yetişen genç sporcularımızın performansı geleceğe umutla bakmamızı sağlıyor.`,
        imageUrl: "/image/1920x700 kadın takım .jpg",
        isFeatured: false,
        isPublished: true,
        publishedAt: new Date("2024-06-20T11:00:00Z"),
        categoryId: catKadin.id,
      },
    ],
  });

  // 5. Teams
  const teamA = await prisma.team.upsert({
    where: { slug: 'a-takim' },
    update: {},
    create: { name: 'A Takım', slug: 'a-takim' },
  });

  const teamKadin = await prisma.team.upsert({
    where: { slug: 'kadin-takim' },
    update: {},
    create: { name: 'Kadın Takımı', slug: 'kadin-takim' },
  });

  // 6. Players
  await prisma.player.deleteMany();
  await prisma.player.createMany({
    data: [
      {
        name: "Yusuf Yılmaz",
        slug: "yusuf-yilmaz",
        number: 10,
        position: "Orta Saha",
        teamId: teamA.id,
        photoUrl: "/image/YUSUF YILMAZjpeg.jpeg",
        birthYear: 1996,
        nationality: "Türkiye",
        matchesPlayed: 18,
        goals: 7,
        assists: 12,
        bio: "Takım kaptanımız ve oyun kurucumuz. Üstün saha görüşü ve serbest vuruş yeteneği ile takımımızın beyni.",
      },
      {
        name: "Mehmet Baran",
        slug: "mehmet-baran",
        number: 4,
        position: "Defans",
        teamId: teamA.id,
        photoUrl: "/image/MEHMET BARAN.jpeg",
        birthYear: 1998,
        nationality: "Türkiye",
        matchesPlayed: 20,
        goals: 2,
        assists: 1,
        bio: "Defans hattının sigortası. Hava toplarındaki hakimiyeti ve güçlü fiziği ile rakip forvetlere geçit vermiyor.",
      },
      {
        name: "Bayram Terzi",
        slug: "bayram-terzi",
        number: 9,
        position: "Forvet",
        teamId: teamA.id,
        photoUrl: "/image/bayram-terzi-bayrampasa-yenido_1676614538_nwXM8e (1).png",
        birthYear: 1993,
        nationality: "Türkiye",
        matchesPlayed: 16,
        goals: 14,
        assists: 5,
        bio: "Bitirici vuruşları ve ceza sahası içindeki fırsatçılığı ile takımımızın gol yükünü çeken tecrübeli santraforumuz.",
      },
      {
        name: "Emre Can Demir",
        slug: "emre-can-demir",
        number: 1,
        position: "Kaleci",
        teamId: teamA.id,
        photoUrl: "/image/yenidogan.jpg",
        birthYear: 2000,
        nationality: "Türkiye",
        matchesPlayed: 19,
        goals: 0,
        assists: 0,
        bio: "Refleksleri ve ceza sahası hakimiyeti ile kalede güven veren file bekçimiz.",
      },
      {
        name: "Burak Yılmaz",
        slug: "burak-yilmaz",
        number: 7,
        position: "Kanat",
        teamId: teamA.id,
        photoUrl: "/image/bp1.jpg",
        birthYear: 1999,
        nationality: "Türkiye",
        matchesPlayed: 17,
        goals: 6,
        assists: 8,
        bio: "Hızı, çalımları ve çizgiden getirdiği tehlikeli ortalarla hücum gücümüzün dinamosu.",
      },
      {
        name: "Elif Korkmaz",
        slug: "elif-korkmaz",
        number: 10,
        position: "Orta Saha",
        teamId: teamKadin.id,
        photoUrl: "/image/1920x700 kadın 2.jpg",
        birthYear: 2001,
        nationality: "Türkiye",
        matchesPlayed: 15,
        goals: 9,
        assists: 11,
        bio: "Kadın Futbol Takımımızın kaptanı ve maestro oyuncusu.",
      },
    ],
  });

  // 7. Matches
  await prisma.match.deleteMany();
  await prisma.match.createMany({
    data: [
      {
        season: "2025-2026",
        competition: "İstanbul Süper Amatör Ligi",
        week: 16,
        homeTeam: "Bayrampaşa Yenidoğan SK",
        homeLogo: "/image/bayrampaşa logo.png",
        awayTeam: "Gaziosmanpaşaspor",
        awayLogo: "/image/Adsız.png",
        matchDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000), // in ~3 days
        stadium: "Bayrampaşa Belediye Stadı",
        status: "UPCOMING",
        isHomeMatch: true,
        details: "Ligin zirvesini doğrudan ilgilendiren kritik 16. hafta derbi mücadelesi.",
      },
      {
        season: "2025-2026",
        competition: "İstanbul Süper Amatör Ligi",
        week: 15,
        homeTeam: "Küçükçekmecespor",
        homeLogo: "/image/Adsız.png",
        awayTeam: "Bayrampaşa Yenidoğan SK",
        awayLogo: "/image/bayrampaşa logo.png",
        matchDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        stadium: "Metin Oktay Stadı",
        status: "FINISHED",
        homeScore: 1,
        awayScore: 2,
        isHomeMatch: false,
        details: "Takımımız Yusuf Yılmaz ve Bayram Terzi'nin golleriyle deplasmandan 3 puanla döndü.",
      },
      {
        season: "2025-2026",
        competition: "İstanbul Süper Amatör Ligi",
        week: 14,
        homeTeam: "Bayrampaşa Yenidoğan SK",
        homeLogo: "/image/bayrampaşa logo.png",
        awayTeam: "Alibeyköyspor",
        awayLogo: "/image/Adsız.png",
        matchDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
        stadium: "Bayrampaşa Belediye Stadı",
        status: "FINISHED",
        homeScore: 3,
        awayScore: 0,
        isHomeMatch: true,
        details: "Kırmızı-siyahlı ekibimiz baştan sona üstün oynadığı maçı 3-0 net skorla kazandı.",
      },
    ],
  });

  // 8. Standings
  await prisma.standings.deleteMany();
  await prisma.standings.createMany({
    data: [
      { position: 1, teamName: "Bayrampaşa Yenidoğan SK", played: 15, won: 12, drawn: 2, lost: 1, goalsFor: 36, goalsAgainst: 11, points: 38, isClub: true },
      { position: 2, teamName: "Gaziosmanpaşaspor", played: 15, won: 11, drawn: 3, lost: 1, goalsFor: 31, goalsAgainst: 13, points: 36, isClub: false },
      { position: 3, teamName: "Alibeyköyspor", played: 15, won: 9, drawn: 3, lost: 3, goalsFor: 28, goalsAgainst: 16, points: 30, isClub: false },
      { position: 4, teamName: "Küçükçekmecespor", played: 15, won: 8, drawn: 4, lost: 3, goalsFor: 24, goalsAgainst: 18, points: 28, isClub: false },
      { position: 5, teamName: "Gürzaferspor", played: 15, won: 7, drawn: 2, lost: 6, goalsFor: 22, goalsAgainst: 21, points: 23, isClub: false },
      { position: 6, teamName: "Bayrampaşa Sinopspor", played: 15, won: 6, drawn: 3, lost: 6, goalsFor: 19, goalsAgainst: 20, points: 21, isClub: false },
      { position: 7, teamName: "Feriköyspor", played: 15, won: 4, drawn: 4, lost: 7, goalsFor: 16, goalsAgainst: 24, points: 16, isClub: false },
    ],
  });

  // 9. Sponsors
  await prisma.sponsor.deleteMany();
  await prisma.sponsor.createMany({
    data: [
      { name: "Bayrampaşa Belediyesi", tier: "MAIN", logoUrl: "/image/bayrampaşa logo.png", website: "https://bayrampasa.bel.tr", order: 1 },
      { name: "Yenidoğan Spor Mağazası", tier: "SHIRT", logoUrl: "/image/1.png", website: "#", order: 2 },
      { name: "Marmara Medikal", tier: "OFFICIAL", logoUrl: "/image/2.png", website: "#", order: 3 },
      { name: "İstanbul Spor Vakfı", tier: "SUPPORTER", logoUrl: "/image/bayrampaşa logo.png", website: "#", order: 4 },
    ],
  });

  // 10. Staff
  await prisma.staff.deleteMany();
  await prisma.staff.createMany({
    data: [
      { name: "Ahmet Kaya", role: "Teknik Direktör", photoUrl: "/image/MEHMET BARAN.jpeg", bio: "UEFA A Lisanslı, amatör liglerde sayısız şampiyonluğu bulunan tecrübeli hocamız." },
      { name: "Kemal Şahin", role: "Antrenör", photoUrl: "/image/YUSUF YILMAZjpeg.jpeg", bio: "Kondisyon ve taktik analiz sorumlumuz." },
      { name: "Murat Özkan", role: "Kaleci Antrenörü", photoUrl: "/image/yenidogan.jpg", bio: "Eski profesyonel kaleci, kaleci departmanı şefimiz." },
    ],
  });

  console.log('✅ Seed completed successfully with club data!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
