import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function DELETE(req: NextRequest) {
  try {

    const url = new URL(req.url);
    const id = url.pathname.split('/').pop(); 

    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    const [result] = await pool.query('DELETE FROM demandes WHERE id = ?', [id]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur DELETE /api/demande/:id', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
