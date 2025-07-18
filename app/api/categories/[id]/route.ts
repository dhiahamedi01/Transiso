import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function DELETE(req: NextRequest) {
  // Récupérer id depuis l'URL
  const url = req.nextUrl;
  const idStr = url.pathname.split('/').pop();

  if (!idStr) {
    return NextResponse.json({ error: 'Missing category ID' }, { status: 400 });
  }

  const categoryId = Number(idStr);

  if (isNaN(categoryId)) {
    return NextResponse.json({ error: 'Invalid category ID' }, { status: 400 });
  }

  try {
    const [result] = await pool.query('DELETE FROM categories WHERE id = ?', [categoryId]);

    return NextResponse.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('MySQL DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
  }
}
