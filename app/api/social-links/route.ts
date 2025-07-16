import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  const [rows] = await db.query('SELECT * FROM social_links');
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { platform, url } = body;

  if (!platform || !url) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const [result]: any = await db.query(
    'INSERT INTO social_links (platform, url) VALUES (?, ?)',
    [platform, url]
  );

  const newLink = { id: result.insertId, platform, url };
  return NextResponse.json(newLink, { status: 201 });
}
