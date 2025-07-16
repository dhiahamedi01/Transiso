import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10);
  await db.query('DELETE FROM social_links WHERE id = ?', [id]);
  return NextResponse.json({ success: true });
}
