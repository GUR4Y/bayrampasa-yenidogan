import { NextResponse } from 'next/server';
import { readSnapshot } from '@/lib/tff-u17/storage';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await readSnapshot();
    if (!data) {
      return NextResponse.json(
        {
          ready: false,
          message: 'TFF U17/B 9. Grup verisi henüz senkronize edilmedi.',
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { ready: true, ...data },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=300',
        },
      }
    );
  } catch (error) {
    console.error('[API /api/tff/u17]', error);
    return NextResponse.json(
      { ready: false, message: 'Sunucu hatası veya kaynak erişilemedi.' },
      { status: 500 }
    );
  }
}
