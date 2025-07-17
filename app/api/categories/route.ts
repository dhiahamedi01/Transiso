import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db'; // mysql2/promise

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM categories ORDER BY created_at DESC');
    return NextResponse.json(rows); // ✅ rows est un tableau ici
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la récupération' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name } = await req.json();

    if (!name || name.trim() === '') {
      return NextResponse.json({ error: 'Nom requis' }, { status: 400 });
    }

    // Insertion
    const [insertResult]: any = await pool.query(
      'INSERT INTO categories (name) VALUES (?)',
      [name]
    );

    const insertedId = insertResult.insertId;

    // Récupération de la catégorie insérée
    const [newCat]: any = await pool.query('SELECT * FROM categories WHERE id = ?', [insertedId]);

    return NextResponse.json(newCat[0]); // ✅ on retourne l'objet inséré
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de l’ajout' }, { status: 500 });
  }
}
