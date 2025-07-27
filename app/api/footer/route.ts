// app/api/footer/route.ts
import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(req: NextRequest) {
  const lang = req.nextUrl.searchParams.get('lang') || 'en';

  try {
    const [rows] = await pool.query(
      'SELECT * FROM footer_settings WHERE lang = ? LIMIT 1',
      [lang]
    );
    if (Array.isArray(rows) && rows.length > 0) {
      return NextResponse.json(rows[0]);
    }
    return NextResponse.json({ message: 'Not found' }, { status: 404 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { footer_desc, lang } = await req.json();

    if (!footer_desc || !lang) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    const [result] = await pool.query(
      `UPDATE footer_settings SET footer_desc = ? WHERE lang = ?`,
      [footer_desc, lang]
    );

    // @ts-ignore
    if (result.affectedRows === 0) {
      return NextResponse.json({ message: 'Not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Updated successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
