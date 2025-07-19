import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(req: NextRequest) {

  const url = new URL(req.url);
  const segments = url.pathname.split('/');
  const id = segments[segments.length - 1]; 

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
