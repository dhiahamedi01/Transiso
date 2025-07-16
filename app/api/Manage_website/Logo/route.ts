import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import fs from 'fs';
import path from 'path';

export async function GET(req: NextRequest) {
  try {
    const result = await pool.query(`
      SELECT * FROM Logo LIMIT 1
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
    const logoFile = formData.get('logo') as File | null;

    if (!logoFile) {
      console.error('❌ Aucun fichier reçu dans formData');
      return NextResponse.json({ error: 'Aucun fichier fourni' }, { status: 400 });
    }

    // Lis le buffer
    const arrayBuffer = await logoFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Prépare dossier uploads
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Conserve l’extension du fichier d’origine
    const ext = path.extname(logoFile.name) || '.png';
    const fileName = `logo_${Date.now()}${ext}`;
    const filePath = path.join(uploadsDir, fileName);

    // Sauvegarde le fichier
    fs.writeFileSync(filePath, buffer);

    const logoUrl = `/uploads/${fileName}`;

    // Met à jour la DB
    await pool.query('UPDATE Logo SET Logo = ? WHERE id = 1', [logoUrl]);

    return NextResponse.json({ message: 'Logo mis à jour', logoUrl });
  } catch (error) {
    console.error('❌ Erreur PUT logo:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}