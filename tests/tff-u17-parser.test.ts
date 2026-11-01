import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { parseU17Html } from '../src/lib/tff-u17/parser';
import { preserveKnownFields } from '../src/lib/tff-u17/sync';

const synthetic = readFileSync(new URL('./fixtures/u17-synthetic.html', import.meta.url), 'utf8');
const realHtml = readFileSync(new URL('./fixtures/tff-real.html', import.meta.url), 'utf8');

describe('TFF U17/B 9. Grup Parser', () => {
  describe('Synthetic Fixture Tests', () => {
    it('reads 14 fixtures, 8 standings rows and scores from synthetic fixture', () => {
      const data = parseU17Html(synthetic);
      expect(data.group).toBe(9);
      expect(data.standings).toHaveLength(8);
      expect(data.fixtures).toHaveLength(14);
      expect(data.fixtures[0].homeScore).toBe(2);
      expect(data.fixtures[0].awayScore).toBe(2);
      expect(data.fixtures[3].homeScore).toBeNull();
    });

    it('never overwrites existing data with unexpected HTML (fail-closed)', () => {
      expect(() => parseU17Html('<html><body>unrelated body</body></html>')).toThrow();
    });

    it('preserves an existing date if the source has no new date', () => {
      const before = parseU17Html(synthetic);
      before.fixtures[3].dateText = '01 Kasım 2026 Pazar';
      const after = preserveKnownFields(parseU17Html(synthetic), before);
      expect(after.fixtures[3].dateText).toBe('01 Kasım 2026 Pazar');
    });
  });

  describe('REAL TFF Istanbul HTML Tests', () => {
    it('successfully parses the live TFF Istanbul HTML without errors', () => {
      const data = parseU17Html(realHtml);
      expect(data.season).toBe('2026-2027');
      expect(data.category).toBe('U17/B');
      expect(data.group).toBe(9);
      expect(data.standings).toHaveLength(8);
      expect(data.fixtures).toHaveLength(14);
    });

    it('validates 9. Grup standings teams and points from real HTML', () => {
      const data = parseU17Html(realHtml);
      const yenidogan = data.standings.find((s) => s.team === 'BAYRAMPAŞA YENİDOĞAN SPOR');
      expect(yenidogan).toBeDefined();
      expect(yenidogan?.played).toBe(3);
      expect(yenidogan?.won).toBe(1);
      expect(yenidogan?.drawn).toBe(1);
      expect(yenidogan?.lost).toBe(1);
      expect(yenidogan?.points).toBe(4);
    });

    it('validates actual scores and venues from real match fixtures', () => {
      const data = parseU17Html(realHtml);
      // Week 1: Beyoğlu 2 - 2 Bayrampaşa Yenidoğan
      expect(data.fixtures[0].week).toBe(1);
      expect(data.fixtures[0].homeTeam).toBe('BEYOĞLU 1979 YENİÇARŞI SPOR KULÜBÜ');
      expect(data.fixtures[0].homeScore).toBe(2);
      expect(data.fixtures[0].awayScore).toBe(2);
      expect(data.fixtures[0].venue).toContain('OKMEYDANI FETİH SAHASI');

      // Week 2: Bayrampaşa Yenidoğan 0 - 3 Bakırköy 1923
      expect(data.fixtures[1].week).toBe(2);
      expect(data.fixtures[1].homeScore).toBe(0);
      expect(data.fixtures[1].awayScore).toBe(3);
      expect(data.fixtures[1].venue).toContain('BAYRAMPAŞA STADI');

      // Week 3: Ateştuğla 0 - 2 Bayrampaşa Yenidoğan
      expect(data.fixtures[2].week).toBe(3);
      expect(data.fixtures[2].homeScore).toBe(0);
      expect(data.fixtures[2].awayScore).toBe(2);
      expect(data.fixtures[2].venue).toContain('İSTOÇ');

      // Week 4: Scheduled unplayed match
      expect(data.fixtures[3].week).toBe(4);
      expect(data.fixtures[3].homeScore).toBeNull();
      expect(data.fixtures[3].awayScore).toBeNull();
      expect(data.fixtures[3].status).toBe('scheduled');
    });
  });
});
