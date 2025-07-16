// app/api/orders/route.ts
import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    let rows;
    if (email) {
      [rows] = await db.execute(
        `SELECT * FROM orders ORDER BY date DESC`,
        [email]
      );
    } else {
      [rows] = await db.execute(`SELECT * FROM orders ORDER BY date DESC`);
    }

    return NextResponse.json({ success: true, data: rows });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}