import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    // pool.query retourne [rows, fields]
    const [rows]: [any[], any] = await pool.query('SELECT * FROM Manage_About LIMIT 1');
    const about = rows[0];
    return NextResponse.json(about);
  } catch (error) {
    console.error('GET About error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      titre,
      sous_titre,
      about_text,
      service1,
      service2,
      service3,
      service4,
      service5,
    } = body;

    // Mise à jour en une seule ligne, id = 1
    await pool.query(
      `UPDATE Manage_About
       SET 
         titre = ?, 
         sous_titre = ?, 
         description = ?, 
         service1 = ?, 
         service2 = ?, 
         service = ?, 
         titre_track = ?, 
         description_track = ?
       WHERE id = 1`,
      [titre, sous_titre, about_text, service1, service2, service3, service4, service5]
    );

    return NextResponse.json({ message: 'Update successful' });
  } catch (error) {
    console.error('PUT About error:', error);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}
