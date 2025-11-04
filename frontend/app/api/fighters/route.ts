import { NextResponse } from 'next/server';
import { fighters } from '@/app/data/fighters';

export async function GET() {
  return NextResponse.json(fighters);
}
