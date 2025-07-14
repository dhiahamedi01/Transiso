import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import fs from 'fs';
import path from 'path';

export async function GET(req: NextRequest) {
  try {
    const result = await pool.query(`
      SELECT * FROM Banner LIMIT 1
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
    const formData = await req.formData();

    const titre1 = formData.get('titre1')?.toString() || '';
    const titre2 = formData.get('titre2')?.toString() || '';
    const description1 = formData.get('description1')?.toString() || '';
    const description2 = formData.get('description2')?.toString() || '';
    const image1File = formData.get('image1') as File | null;
    const image2File = formData.get('image2') as File | null;

    let image1Path = '';
    let image2Path = '';

    if (image1File) {
      const bytes = await image1File.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `image1_${Date.now()}.jpg`;
      const filepath = path.join('public', 'uploads', filename);
      fs.writeFileSync(filepath, buffer);
      image1Path = `/uploads/${filename}`;
    }

    if (image2File) {
      const bytes = await image2File.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `image2_${Date.now()}.jpg`;
      const filepath = path.join('public', 'uploads', filename);
      fs.writeFileSync(filepath, buffer);
      image2Path = `/uploads/${filename}`;
    }

    // Met à jour la première ligne seulement (sans WHERE)
    let updateQuery = `
      UPDATE Banner 
      SET titre1 = ?, description1 = ?, titre2 = ?, description2 = ?
      LIMIT 1
    `;

    const params = [titre1, description1, titre2, description2];

    if (image1Path) {
      updateQuery = updateQuery.replace('LIMIT 1', `, image1 = ? LIMIT 1`);
      params.push(image1Path);
    }

    if (image2Path) {
      updateQuery = updateQuery.replace('LIMIT 1', `, image2 = ? LIMIT 1`);
      params.push(image2Path);
    }

    await pool.query(updateQuery, params);

    return NextResponse.json({ message: 'Mise à jour réussie.' });
  } catch (error) {
    console.error('Erreur PUT Banner:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
