import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

interface Params {
  params: { id: string };
}

export async function GET(req: NextRequest, { params }: Params) {
  const postId = params.id;  // récupéré depuis /blog_liste/[id]
  const url = new URL(req.url);
  const lang = url.searchParams.get('lang') || 'ar'; // langue par défaut 'ar'

  const allowedLangs = ['ar', 'en', 'tr'];
  if (!postId) {
    return NextResponse.json({ error: 'post_id est requis' }, { status: 400 });
  }
  if (!allowedLangs.includes(lang)) {
    return NextResponse.json({ error: 'langue non supportée' }, { status: 400 });
  }

  try {
    const query = `SELECT * FROM blogs WHERE post_id = ? AND lang = ? LIMIT 1`;
    const [rows]: [any[], any] = await pool.query(query, [postId, lang]);

    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: 'Article non trouvé' }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Erreur backend:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
