import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db'; // mysql2/promise

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM fields ORDER BY created_at DESC');
    return NextResponse.json(rows);
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

    const [insertResult]: any = await pool.query(
      'INSERT INTO fields (name) VALUES (?)',
      [name]
    );

    const insertedId = insertResult.insertId;

    const [newField]: any = await pool.query('SELECT * FROM fields WHERE id = ?', [insertedId]);

    return NextResponse.json(newField[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de l’ajout' }, { status: 500 });
  }
}
