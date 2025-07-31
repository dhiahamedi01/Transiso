import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const faqId = parseInt(params.id);

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

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const faqId = parseInt(params.id);
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

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
    try {
      const faqId = parseInt(params.id);
  
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
