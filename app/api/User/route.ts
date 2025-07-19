import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const [rows] = await pool.query('SELECT * FROM users'); // plus de LIMIT 1
    if (Array.isArray(rows) && rows.length > 0) {
      return NextResponse.json(rows); // renvoyer tout le tableau
    }
    return NextResponse.json({ message: 'Not found' }, { status: 404 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
