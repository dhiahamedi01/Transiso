import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import path from 'path';
import fs from 'fs';

export async function GET() {
  try {
    const [rows] = await pool.query(`
      SELECT id, Icon, Titre, Description, Image, lang
      FROM Home_Slider
      ORDER BY id ASC
    `);
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des slides:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // Correction ici : récupérer avec title_en, description_en etc.
    const titles = {
      en: formData.get('title_en')?.toString() || '',
      ar: formData.get('title_ar')?.toString() || '',
      tr: formData.get('title_tr')?.toString() || '',
    };

    const descriptions = {
      en: formData.get('description_en')?.toString() || '',
      ar: formData.get('description_ar')?.toString() || '',
      tr: formData.get('description_tr')?.toString() || '',
    };

    const iconFile = formData.get('icon') as File | null;
    const imageFile = formData.get('image') as File | null;

    if (!iconFile || !imageFile) {
      return NextResponse.json({ error: 'Icon and image are required.' }, { status: 400 });
    }

    // Générer des noms de fichiers uniques
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

    const iconFilename = `icon_${Date.now()}_${iconFile.name}`;
    const imageFilename = `image_${Date.now()}_${imageFile.name}`;

    // Sauvegarder les fichiers
    const saveFile = async (file: File, filename: string) => {
      const buffer = Buffer.from(await file.arrayBuffer());
      fs.writeFileSync(path.join(uploadsDir, filename), buffer);
    };

    await saveFile(iconFile, iconFilename);
    await saveFile(imageFile, imageFilename);

    // Insérer dans la base pour chaque langue
    const insertPromises = (['en', 'ar', 'tr'] as const).map(async (lng) => {
      const titre = titles[lng];
      const description = descriptions[lng];
      const lang = lng;

      return pool.query(
        `INSERT INTO Home_Slider (Icon, Titre, Description, Image, lang) VALUES (?, ?, ?, ?, ?)`,
        [`/uploads/${iconFilename}`, titre, description, `/uploads/${imageFilename}`, lang]
      );
    });

    await Promise.all(insertPromises);

    return NextResponse.json({ message: 'Slider added successfully' });
  } catch (error) {
    console.error('Erreur lors de l\'ajout du slider:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
