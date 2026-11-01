import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'node:crypto';
import { synchronize } from '@/lib/tff-u17/sync';
import { isAuthenticated } from '@/lib/auth';

export const runtime = 'nodejs';

async function isAuthorized(req: NextRequest): Promise<boolean> {
  // 1. Check Vercel Cron header
  if (req.headers.get('x-vercel-cron') === '1') {
    return true;
  }

  // 2. Check Admin Session cookie
  if (await isAuthenticated()) {
    return true;
  }

  // 3. Check Bearer Token
  const secret = process.env.TFF_SYNC_SECRET;
  if (!secret || secret.length < 16) return false;

  const token = req.headers.get('authorization')?.replace(/^Bearer /i, '') ?? '';
  try {
    const expected = Buffer.from(secret);
    const actual = Buffer.from(token);
    return actual.length === expected.length && timingSafeEqual(actual, expected);
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  if (!(await isAuthorized(req))) {
    return NextResponse.json({ error: 'Yetkisiz erişim (Unauthorized)' }, { status: 401 });
  }

  try {
    const result = await synchronize({ force: true });
    return NextResponse.json({ ok: true, ...result });
  } catch (error: any) {
    console.error('[API /api/tff/u17/sync]', error);
    return NextResponse.json(
      {
        ok: false,
        error: error.message || 'Senkronizasyon başarısız; mevcut veriler korundu.',
      },
      { status: 502 }
    );
  }
}
