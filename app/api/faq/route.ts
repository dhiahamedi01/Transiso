import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const translations = body.translations;

    if (!translations || typeof translations !== 'object') {
      return NextResponse.json({ error: 'Invalid translations data' }, { status: 400 });
    }

    let faqId: number | null = null;

    for (const lang of ['en', 'tr', 'ar']) {
      const entry = translations[lang] || { question: '', answer: '' };

      const [result]: any = await pool.query(
        `INSERT INTO faq (faq_id, lang, question, answer)
         VALUES (?, ?, ?, ?)`,
        [faqId ?? 0, lang, entry.question || '', entry.answer || '']
      );

      const insertId = result.insertId;

      await pool.query(`UPDATE faq SET faq_id = ? WHERE id = ?`, [faqId ?? insertId, insertId]);

      if (!faqId) faqId = insertId;
    }

    return NextResponse.json({ message: 'FAQ inserted', faqId });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Insertion error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const [rows] = await pool.query(`
      SELECT id, faq_id, lang, question, answer
      FROM faq
      ORDER BY id DESC
    `);

    return NextResponse.json(rows);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Reading error' }, { status: 500 });
  }
}
