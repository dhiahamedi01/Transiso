import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

interface Params {
  id: string;
}

export async function GET(req: NextRequest, { params }: { params: Params }) {
  const { id } = params;

  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);

    if (Array.isArray(rows) && rows.length > 0) {
      return NextResponse.json(rows[0]);
    }
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
