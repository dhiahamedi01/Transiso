import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db'; 

export async function GET(req: NextRequest) {
  try {
    const [rows] = await pool.query(`
      SELECT id, Icon, Titre, Description, Image
      FROM Home_Slider
      ORDER BY id ASC
    `);

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des slides:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
