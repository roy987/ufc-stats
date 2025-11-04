import { NextResponse } from 'next/server';
import { fighters } from '@/app/data/fighters';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const fighter = fighters.find(f => f.id === parseInt(params.id));

  if (!fighter) {
    return NextResponse.json({ error: 'Fighter not found' }, { status: 404 });
  }

  return NextResponse.json(fighter);
}
