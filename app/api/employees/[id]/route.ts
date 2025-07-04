
import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    await db.query('DELETE FROM employees WHERE id = ?', [id]);
    return NextResponse.json({ success: true, message: 'Employé supprimé' });
  } catch (error) {
    console.error('Erreur DELETE /employees/:id', error);
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}
