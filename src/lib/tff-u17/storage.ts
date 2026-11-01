import prisma from '@/lib/prisma';
import type { Snapshot } from './types';

const SNAPSHOT_ID = '2026-2027-u17b-9';

export async function readSnapshot(): Promise<Snapshot | null> {
  try {
    const record = await prisma.tffU17Snapshot.findUnique({
      where: { id: SNAPSHOT_ID },
    });
    if (!record || !record.payload) return null;
    return JSON.parse(record.payload) as Snapshot;
  } catch (error) {
    console.error('[TFF U17 readSnapshot]', error);
    return null;
  }
}

export async function writeSnapshot(snapshot: Snapshot): Promise<boolean> {
  try {
    const payload = JSON.stringify(snapshot);
    await prisma.tffU17Snapshot.upsert({
      where: { id: SNAPSHOT_ID },
      update: {
        payload,
      },
      create: {
        id: SNAPSHOT_ID,
        payload,
      },
    });
    return true;
  } catch (error) {
    console.error('[TFF U17 writeSnapshot]', error);
    return false;
  }
}
