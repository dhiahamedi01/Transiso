import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import fs from 'fs';
import path from 'path';

export async function GET(req: NextRequest) {
  try {
    const result = await pool.query(`
      SELECT * FROM Section_desc LIMIT 1
    `);
    const rows = result[0] as any[];
    const banner = rows[0];
    return NextResponse.json(banner);
  } catch (error) {
    console.error('Erreur GET Banner:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}


export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      titre,
      sous_titre,
      description,
      service1,
      service2,
      service3,
      service4,
    } = body;

    const updateQuery = `
      UPDATE Section_desc SET 
        titre = ?, 
        sous_titre = ?, 
        description = ?, 
        service1 = ?, 
        service2 = ?, 
        service3 = ?, 
        service4 = ?
      LIMIT 1
    `;

    await pool.query(updateQuery, [
      titre,
      sous_titre,
      description,
      service1,
      service2,
      service3,
      service4,
    ]);

    return NextResponse.json({ message: 'Mise à jour réussie' });
  } catch (error) {
    console.error('Erreur PUT Section_desc:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
