export type Fixture = {
  id: string;
  week: number;
  homeTeam: string;
  awayTeam: string;
  homeScore: number | null;
  awayScore: number | null;
  status: 'scheduled' | 'finished' | 'forfeit';
  dateText: string | null;
  time: string | null;
  venue: string | null;
  sourceMatchUrl: string;
};

export type Standing = {
  position: number;
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  points: number;
};

export type Snapshot = {
  season: '2026-2027';
  category: 'U17/B';
  group: 9;
  sourceUrl: string;
  checkedAt: string;
  fixtures: Fixture[];
  standings: Standing[];
};

export const SOURCE_URL =
  'https://tffistanbul.org/kulup/bayrampasa-yenidogan-spor/1477/2026-2027/30/u17-b-ligi/178';
export const OUR_TEAM = 'BAYRAMPAŞA YENİDOĞAN SPOR';
