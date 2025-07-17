import { NextRequest, NextResponse } from 'next/server';
import  pool  from '@/lib/db'; 

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const categoryId = Number(params.id);

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
