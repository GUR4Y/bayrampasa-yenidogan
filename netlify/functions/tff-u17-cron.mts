/** Netlify Scheduled Function: triggers the protected Next.js sync route. */
export const config = { schedule: '*/30 * * * *' };

export default async function handler() {
  if (process.env.TFF_SYNC_ENABLED !== 'true') return;
  const site = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL;
  const secret = process.env.TFF_SYNC_SECRET;
  if (!site || !secret) {
    console.warn('[TFF U17 Cron] SITE_URL veya TFF_SYNC_SECRET eksik');
    return;
  }
  const endpoint = new URL('/api/tff/u17/sync', site);
  const response = await fetch(endpoint.toString(), {
    method: 'POST',
    headers: { Authorization: `Bearer ${secret}` },
    signal: AbortSignal.timeout(22000),
  });
  if (!response.ok) {
    throw new Error(`U17 sync failed: HTTP ${response.status}`);
  }
  const result = await response.json();
  console.log('U17/B sync completed successfully:', result);
}
