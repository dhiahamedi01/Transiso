import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

// --- GET handler ---
export async function GET(_: NextRequest, context: any) {
  try {
    const faqId = parseInt(context.params.id);

    if (!faqId) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const [rows]: any = await pool.query(
      `SELECT id, lang, question, answer FROM faq WHERE faq_id = ?`,
      [faqId]
    );

    return NextResponse.json(rows);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to fetch FAQ' }, { status: 500 });
  }
}

// --- PUT handler ---
export async function PUT(req: NextRequest, context: any) {
  try {
    const faqId = parseInt(context.params.id);
    const body = await req.json();
    const translations = body.translations;

    if (!faqId || !translations || typeof translations !== 'object') {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    await pool.query(`DELETE FROM faq WHERE faq_id = ?`, [faqId]);

    for (const lang of ['en', 'tr', 'ar']) {
      const entry = translations[lang] || { question: '', answer: '' };

      await pool.query(
        `INSERT INTO faq (faq_id, lang, question, answer) VALUES (?, ?, ?, ?)`,
        [faqId, lang, entry.question || '', entry.answer || '']
      );
    }

    return NextResponse.json({ message: 'FAQ updated', faqId });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Update error' }, { status: 500 });
  }
}

// --- DELETE handler ---
export async function DELETE(_: NextRequest, context: any) {
  try {
    const faqId = parseInt(context.params.id);

    if (!faqId) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    await pool.query(`DELETE FROM faq WHERE faq_id = ?`, [faqId]);

    return NextResponse.json({ message: 'FAQ deleted', faqId });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Delete error' }, { status: 500 });
  }
}
