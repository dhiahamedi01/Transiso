// app/api/demande/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const [result] = await pool.query('DELETE FROM demandes WHERE id = ?', [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur DELETE /api/demande/:id', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
