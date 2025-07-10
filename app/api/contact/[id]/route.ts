import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

function extractId(req: NextRequest): number | null {
  const segments = req.nextUrl.pathname.split('/');
  const idStr = segments[segments.length - 1];
  const id = Number(idStr);
  return isNaN(id) ? null : id;
}

export async function DELETE(request: NextRequest) {
  const id = extractId(request);

  if (id === null) {
    return NextResponse.json({ message: 'ID invalide.' }, { status: 400 });
  }

  try {
    await pool.query('DELETE FROM contact WHERE id = ?', [id]);
    return NextResponse.json({ message: 'Contact supprimé.' }, { status: 200 });
  } catch (error) {
    console.error('Erreur base de données :', error);
    return NextResponse.json({ message: 'Erreur base de données.' }, { status: 500 });
  }
}
