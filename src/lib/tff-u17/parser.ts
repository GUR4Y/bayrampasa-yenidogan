import { load } from 'cheerio';
import { OUR_TEAM, SOURCE_URL, type Fixture, type Snapshot, type Standing } from './types';

const tidy = (text: string) => text.replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim();
const upper = (text: string) => tidy(text).toLocaleUpperCase('tr-TR');
const isOurTeam = (name: string) => upper(name) === upper(OUR_TEAM);

/**
 * DOM parsing is based on the TFF club-page structure:
 * - Standings table with 8 rows (G-B-M-P).
 * - 14 fixtures with /mac/ links.
 * Fails closed if the expected structure does not match to avoid recording bad data.
 */
export function parseU17Html(html: string, checkedAt = new Date().toISOString()): Snapshot {
  const $ = load(html);
  $('script, style, noscript').remove();
  const pageText = tidy($('body').text());
  if (!upper(pageText).includes(upper(OUR_TEAM))) throw new Error('Kulüp metni kaynaktaki HTML içinde bulunamadı');
  if (!/U17\s*\/?\s*B\s*LİGİ/iu.test(pageText)) throw new Error('U17/B kategorisi doğrulanamadı');
  if (!/9\s*\.\s*GRUP/iu.test(pageText)) throw new Error('9. Grup doğrulanamadı');

  const standings: Standing[] = [];
  const seenStandings = new Set<string>();
  const candidates = $('tr, li, [class*="standing-row"], [class*="ranking-row"], [class*="puan-row"]');
  candidates.each((_, el) => {
    const $el = $(el);
    const cells = $el.find('td, th');
    const row = cells.length >= 4
      ? cells.map((_, c) => tidy($(c).text())).get().join(' ')
      : tidy($el.text());
    const match = row.match(/^(?:\d{1,2}\s+)?(.+?)\s+(\d{1,2})\s+(\d{1,2})\s+(\d{1,2})\s+(\d{1,3})$/u);
    if (!match) return;
    const team = tidy(match[1]);
    if (!/[\p{L}]/u.test(team) || team.length < 4 || team.length > 85) return;
    if (/HAFTA|STAD|TARİH|TAKIM|PUAN DURUMU/iu.test(team)) return;
    const key = upper(team);
    if (seenStandings.has(key)) return;
    const won = Number(match[2]);
    const drawn = Number(match[3]);
    const lost = Number(match[4]);
    const points = Number(match[5]);
    if (won > 40 || drawn > 40 || lost > 40 || points > 120) return;
    seenStandings.add(key);
    standings.push({ position: standings.length + 1, team, played: won + drawn + lost, won, drawn, lost, points });
  });
  if (standings.length !== 8 || !standings.some(s => isOurTeam(s.team))) {
    throw new Error(`9. Grup puan tablosu okunamadı (okunan satır: ${standings.length}); veri kaydedilmedi`);
  }

  const fixtureLinks = $('a[href*="/mac/"]');
  const fixtures: Fixture[] = [];
  const seenFixtures = new Set<string>();
  const teamNames = standings.map(row => row.team).sort((a, b) => b.length - a.length);

  fixtureLinks.each((_, element) => {
    const link = $(element);
    const href = link.attr('href');
    if (!href) return;
    let matchUrl: string;
    try {
      matchUrl = new URL(href, SOURCE_URL).toString();
      if (new URL(matchUrl).hostname !== 'tffistanbul.org') return;
    } catch {
      return;
    }
    const label = tidy(link.text());
    const upperLabel = upper(label);

    const found: Array<{ name: string; index: number }> = [];
    for (const team of teamNames) {
      const idx = upperLabel.indexOf(upper(team));
      if (idx >= 0 && !found.some(item => item.index === idx)) found.push({ name: team, index: idx });
    }
    found.sort((a, b) => a.index - b.index);
    if (found.length !== 2) return;
    if (!found.some(item => isOurTeam(item.name))) return;
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
    const fixture: Fixture = {
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
    };
    fixtures.push(fixture);
  });

  if (fixtures.length !== 14 || new Set(fixtures.map(f => f.week)).size !== 14) {
    throw new Error(`Beklenen 14 haftalık kulüp fikstürü bulunamadı (okunan ${fixtures.length}); veri kaydedilmedi`);
  }
  return { season: '2026-2027', category: 'U17/B', group: 9, sourceUrl: SOURCE_URL, checkedAt, fixtures, standings };
}
