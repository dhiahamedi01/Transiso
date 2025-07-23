import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';

interface DescriptionRow extends RowDataPacket {
  titre: string;
  sous_titre: string;
  description: string;
  service1: string;
  service2: string;
  service3: string;
  service4: string;
  lang: string;
}

export async function GET(req: NextRequest) {
  const lang = req.nextUrl.searchParams.get('lang') || 'en';

  try {
    const [rows] = await pool.query<DescriptionRow[]>(
      'SELECT * FROM Section_desc WHERE lang = ? LIMIT 1',
      [lang]
    );

    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: 'Aucune donnée trouvée' }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Erreur GET description:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}


export async function PUT(req: NextRequest) {
  try {
    const {
      titre,
      sous_titre,
      description,
      service1,
      service2,
      service3,
      service4,
      lang,
    } = await req.json();

    const query = `
      UPDATE Section_desc SET 
        titre = ?, 
        sous_titre = ?, 
        description = ?, 
        service1 = ?, 
        service2 = ?, 
        service3 = ?, 
        service4 = ?
      WHERE lang = ?
    `;

    await pool.query(query, [
      titre,
      sous_titre,
      description,
      service1,
      service2,
      service3,
      service4,
      lang,
    ]);

    return NextResponse.json({ message: 'Mise à jour réussie' });
  } catch (error) {
    console.error('Erreur PUT description:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

