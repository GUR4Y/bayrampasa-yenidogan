const { execSync } = require('child_process');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const SOURCE_URL = 'https://tffistanbul.org/kulup/bayrampasa-yenidogan-spor/1477/2026-2027/30/u17-b-ligi/178';
const OUR_TEAM = 'BAYRAMPAŞA YENİDOĞAN SPOR';

const tidy = (text) => text.replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim();
const upper = (text) => tidy(text).toLocaleUpperCase('tr-TR');
const isOurTeam = (name) => upper(name) === upper(OUR_TEAM);

async function fetchHtml() {
  console.log('📡 TFF İstanbul U17 sayfası çekiliyor...');
  try {
    const res = await fetch(SOURCE_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7',
      },
      signal: AbortSignal.timeout(15000),
    });
    if (res.ok) {
      const html = await res.text();
      if (html.includes('BAYRAMPA') || html.includes('Bayrampa')) return html;
    }
  } catch (err) {
    console.log('Node fetch uyarısı, curl deneniyor...');
  }

  // Fallback to system curl
  const tempFile = 'tff_temp.html';
  try {
    execSync(`curl.exe -s -L -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" "${SOURCE_URL}" -o "${tempFile}"`);
    const fs = require('fs');
    const html = fs.readFileSync(tempFile, 'utf8');
    fs.unlinkSync(tempFile);
    return html;
  } catch (e) {
    throw new Error('TFF sitesine erişilemedi. Güvenlik duvarı geçici olarak engelliyor olabilir.');
  }
}

async function main() {
  const html = await fetchHtml();
  const cheerio = require('cheerio');
  const $ = cheerio.load(html);
  $('script, style, noscript').remove();

  const standings = [];
  const seenStandings = new Set();
  const candidates = $('tr, li, [class*="standing-row"], [class*="ranking-row"], [class*="puan-row"]');
  candidates.each((_, el) => {
    const $el = $(el);
    const cells = $el.find('td, th');
    const row = cells.length >= 4 ? cells.map((_, c) => tidy($(c).text())).get().join(' ') : tidy($el.text());
    const match = row.match(/^(?:\d{1,2}\s+)?(.+?)\s+(\d{1,2})\s+(\d{1,2})\s+(\d{1,2})\s+(\d{1,3})$/u);
    if (!match) return;
    const team = tidy(match[1]);
    if (!/[\p{L}]/u.test(team) || team.length < 4 || team.length > 85) return;
    if (/HAFTA|STAD|TARİH|TAKIM|PUAN DURUMU/iu.test(team)) return;
    const key = upper(team);
    if (seenStandings.has(key)) return;
    seenStandings.add(key);
    const won = Number(match[2]);
    const drawn = Number(match[3]);
    const lost = Number(match[4]);
    const points = Number(match[5]);
    standings.push({ position: standings.length + 1, team, played: won + drawn + lost, won, drawn, lost, points });
  });

  const fixtureLinks = $('a[href*="/mac/"]');
  const fixtures = [];
  const seenFixtures = new Set();
  const teamNames = standings.map((row) => row.team).sort((a, b) => b.length - a.length);

  fixtureLinks.each((_, element) => {
    const link = $(element);
    const href = link.attr('href');
    if (!href) return;
    let matchUrl;
    try {
      matchUrl = new URL(href, SOURCE_URL).toString();
      if (new URL(matchUrl).hostname !== 'tffistanbul.org') return;
    } catch {
      return;
    }
    const label = tidy(link.text());
    const upperLabel = upper(label);

    const found = [];
    for (const team of teamNames) {
      const idx = upperLabel.indexOf(upper(team));
      if (idx >= 0 && !found.some((item) => item.index === idx)) found.push({ name: team, index: idx });
    }
    found.sort((a, b) => a.index - b.index);
    if (found.length !== 2) return;
    if (!found.some((item) => isOurTeam(item.name))) return;

    const between = upperLabel.slice(found[0].index + upper(found[0].name).length, found[1].index);
    const score = between.match(/(\d{1,2})\s*-\s*(\d{1,2})/);
    const forfeit = /\(H\)/iu.test(label);
    const idFromUrl = new URL(matchUrl).pathname.match(/\/(\d{4,})\/?$/)?.[1];
    const id = idFromUrl ?? `u17b-2026-2027-week-${fixtures.length + 1}`;
    if (seenFixtures.has(id)) return;
    seenFixtures.add(id);

    const week = fixtures.length + 1;
    const trailing = tidy(label.slice(label.toLocaleUpperCase('tr-TR').indexOf(upper(found[1].name)) + found[1].name.length));
    const time = trailing.match(/(?:^|\s|-)\s*(\d{1,2}:\d{2})(?:\s|$)/u)?.[1] ?? null;
    const venue = tidy(trailing.replace(/\s*-?\s*\d{1,2}:\d{2}\s*$/, '')) || null;

    let heading = '';
    const containers = [link, link.parent(), link.parent().parent(), link.parent().parent().parent()];
    for (const container of containers) {
      if (heading) break;
      const previous = container.prevAll().toArray().reverse();
      for (const node of previous) {
        const text = tidy($(node).text());
        if (/\d{1,2}\s*\.\s*HAFTA/iu.test(text)) heading = text;
      }
    }
    const extractedDate = heading.match(/\d{1,2}\s*\.\s*HAFTA\s*-\s*(.+?)(?:\s+\d{1,2}\s*\.\s*HAFTA|$)/iu)?.[1] ?? null;
    const dateText = extractedDate && extractedDate.length < 70 && !/tarih\s*belirlenmedi/iu.test(extractedDate) ? extractedDate : null;

    fixtures.push({
      id,
      week,
      homeTeam: found[0].name,
      awayTeam: found[1].name,
      homeScore: score ? Number(score[1]) : null,
      awayScore: score ? Number(score[2]) : null,
      status: score ? (forfeit ? 'forfeit' : 'finished') : 'scheduled',
      dateText,
      time,
      venue,
      sourceMatchUrl: matchUrl,
    });
  });

  const snapshot = {
    season: '2026-2027',
    category: 'U17/B',
    group: 9,
    sourceUrl: SOURCE_URL,
    checkedAt: new Date().toISOString(),
    fixtures,
    standings,
  };

  await prisma.tffU17Snapshot.upsert({
    where: { id: '2026-2027-u17b-9' },
    update: { payload: JSON.stringify(snapshot) },
    create: { id: '2026-2027-u17b-9', payload: JSON.stringify(snapshot) },
  });

  console.log(`✅ Başarıyla senkronize edildi: ${standings.length} takım, ${fixtures.length} maç veritabanına işlendi.`);
}

main().catch((e) => {
  console.error('❌ Hata:', e.message);
  process.exit(1);
}).finally(() => prisma.$disconnect());
