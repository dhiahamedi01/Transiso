// app/api/test-db/route.ts
import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS result');
    return NextResponse.json({ success: true, result: rows });
  } catch (error) {
    console.error('Erreur de connexion à la base :', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
