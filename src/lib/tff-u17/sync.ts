import { parseU17Html } from './parser';
import { readSnapshot, writeSnapshot } from './storage';
import { SOURCE_URL, type Snapshot } from './types';

/** Missing date/time/venue from TFF must not erase previously confirmed fields. */
export function preserveKnownFields(next: Snapshot, previous: Snapshot | null): Snapshot {
  if (!previous) return next;
  const byId = new Map(previous.fixtures.map((f) => [f.id, f]));
  return {
    ...next,
    fixtures: next.fixtures.map((f) => {
      const old =
        byId.get(f.id) ??
        previous.fixtures.find(
          (x) =>
            x.week === f.week &&
            x.homeTeam === f.homeTeam &&
            x.awayTeam === f.awayTeam
        );
      if (!old) return f;
      return {
        ...f,
        dateText: f.dateText ?? old.dateText,
        time: f.time ?? old.time,
        venue: f.venue ?? old.venue,
      };
    }),
  };
}

export async function processSnapshotHtml(
  html: string
): Promise<{ changed: boolean; checkedAt: string; count: number; snapshot: Snapshot }> {
  if (!html.includes('BAYRAMPA') && !html.includes('Bayrampa')) {
    throw new Error('Beklenmedik HTML formatı; Bayrampaşa kulüp kaydı bulunamadı.');
  }

  const previous = await readSnapshot();
  const parsed = parseU17Html(html);
  const next = preserveKnownFields(parsed, previous);

  const content = (snapshot: Snapshot) =>
    JSON.stringify({ fixtures: snapshot.fixtures, standings: snapshot.standings });
  const changed = !previous || content(previous) !== content(next);

  await writeSnapshot(next);
  return { changed, checkedAt: next.checkedAt, count: next.fixtures.length, snapshot: next };
}

export async function synchronize(
  options: { force?: boolean } = {}
): Promise<{ changed: boolean; checkedAt: string; count: number; snapshot: Snapshot }> {
  const isEnabled = process.env.TFF_SYNC_ENABLED === 'true';
  if (!isEnabled && !options.force) {
    throw new Error(
      'TFF_SYNC_ENABLED=true değil; resmî izin ve canlı HTML uyumu onaylandıktan sonra etkinleştirilmelidir.'
    );
  }

  const browserHeaders = {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'Accept-Language': 'tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7',
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
  };

  let lastError: any = null;
  // 1. Try native fetch with retry
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const response = await fetch(SOURCE_URL, {
        headers: browserHeaders,
        cache: 'no-store',
        signal: AbortSignal.timeout(10000),
      });

      if (!response.ok) {
        throw new Error(`TFF erişim hatası: HTTP ${response.status}`);
      }

      const html = await response.text();
      return await processSnapshotHtml(html);
    } catch (err: any) {
      lastError = err;
      if (attempt < 2) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
  }

  // 2. Fallback to system curl (bypasses Node.js undici TLS fingerprinting blocked by F5 WAF)
  try {
    const { execSync } = await import('node:child_process');
    const stdout = execSync(
      `curl.exe -s -L -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36" "${SOURCE_URL}"`,
      { timeout: 15000, encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 }
    );
    if (stdout && (stdout.includes('BAYRAMPA') || stdout.includes('Bayrampa'))) {
      return await processSnapshotHtml(stdout);
    }
  } catch (curlErr: any) {
    console.warn('[TFF Sync] System curl fallback error:', curlErr?.message);
  }

  throw new Error(
    `TFF senkronizasyon başarısız oldu (${lastError?.message || 'Bağlantı hatası'}). TFF güvenlik duvarı geçici olarak istekleri kısıtlamış olabilir.`
  );
}
