import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    await pool.query('DELETE FROM contact WHERE id = ?', [id]);
    return NextResponse.json({ message: 'Contact deleted.' }, { status: 200 });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ message: 'Database error.' }, { status: 500 });
  }
}
