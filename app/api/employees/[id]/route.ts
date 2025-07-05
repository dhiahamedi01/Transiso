import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop();

  if (!id) {
    return NextResponse.json({ success: false, error: 'ID manquant' }, { status: 400 });
  }

  try {
    await db.query('DELETE FROM employees WHERE id = ?', [id]);
    return NextResponse.json({ success: true, message: 'Employé supprimé' });
  } catch (error) {
    console.error('Erreur DELETE /employees/:id', error);
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}
