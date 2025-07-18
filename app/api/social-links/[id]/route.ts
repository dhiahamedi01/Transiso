import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function DELETE(req: NextRequest) {
  const url = req.nextUrl;
  const parts = url.pathname.split('/');
  const id = parseInt(parts[parts.length - 1], 10);

  await db.query('DELETE FROM social_links WHERE id = ?', [id]);
  return NextResponse.json({ success: true });
}
