import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import fs from 'fs';
import path from 'path';

// Assure-toi que le dossier uploads existe
const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const lang = url.searchParams.get('lang') || 'en';

    const [rows] = await pool.query('SELECT * FROM Banner WHERE lang = ? LIMIT 1', [lang]);
    const banner = (rows as any[])[0] || null;

    return NextResponse.json(banner);
  } catch (error) {
    console.error('Erreur GET Banner:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const formData = await req.formData();

    const lang = formData.get('lang')?.toString() || 'en';
    const titre1 = formData.get('titre1')?.toString() || '';
    const titre2 = formData.get('titre2')?.toString() || '';
    const description1 = formData.get('description1')?.toString() || '';
    const description2 = formData.get('description2')?.toString() || '';

    const image1File = formData.get('image1') as File | null;
    const image2File = formData.get('image2') as File | null;

    let image1Path = '';
    let image2Path = '';

    const saveFile = async (file: File, prefix: string) => {
      const buffer = Buffer.from(await file.arrayBuffer());
      const ext = path.extname(file.name) || '.jpg';
      const filename = `${prefix}_${Date.now()}${ext}`;
      const filepath = path.join(uploadsDir, filename);
      fs.writeFileSync(filepath, buffer);
      return `/uploads/${filename}`;
    };

    if (image1File) {
      image1Path = await saveFile(image1File, 'image1');
    }

    if (image2File) {
      image2Path = await saveFile(image2File, 'image2');
    }

    // 1. Mise à jour des textes uniquement pour la langue donnée
    const updateTextsQuery = `
      UPDATE Banner SET
        titre1 = ?,
        description1 = ?,
        titre2 = ?,
        description2 = ?
      WHERE lang = ? LIMIT 1
    `;
    await pool.query(updateTextsQuery, [titre1, description1, titre2, description2, lang]);

    // 2. Mise à jour des images sur toutes les lignes (toutes langues)
    if (image1Path) {
      await pool.query(`UPDATE Banner SET image1 = ?`, [image1Path]);
    }
    if (image2Path) {
      await pool.query(`UPDATE Banner SET image2 = ?`, [image2Path]);
    }

    return NextResponse.json({ message: 'Mise à jour réussie.' });
  } catch (error) {
    console.error('Erreur PUT Banner:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

