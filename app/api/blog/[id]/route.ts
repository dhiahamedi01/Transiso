import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

// 🔁 Fonction utilitaire pour extraire l'ID depuis l'URL
function extractId(req: NextRequest): number | null {
  const segments = req.nextUrl.pathname.split('/');
  const idStr = segments[segments.length - 1];
  const id = Number(idStr);
  return isNaN(id) ? null : id;
}

// 📌 GET : récupérer un article par ID
export async function GET(req: NextRequest) {
  const id = extractId(req);
  if (id === null) {
    return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
  }

  try {
    const [rows] = await pool.query('SELECT * FROM blogs WHERE id = ?', [id]) as any[];

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Article non trouvé' }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erreur lors de la récupération de l\'article' }, { status: 500 });
  }
}

// 🗑 DELETE : supprimer un article + son image
export async function DELETE(req: NextRequest) {
  const id = extractId(req);
  if (id === null) {
    return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
  }

  try {
    const [rows] = await pool.query('SELECT image_path FROM blogs WHERE id = ?', [id]) as any[];

    if (rows.length && rows[0].image_path) {
      const filePath = path.join(process.cwd(), 'public', rows[0].image_path);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await pool.query('DELETE FROM blogs WHERE id = ?', [id]);

    return NextResponse.json({ message: 'Article supprimé' });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Erreur lors de la suppression' }, { status: 500 });
  }
}

// ✏️ PUT : mettre à jour un article et gérer une nouvelle image si envoyée
export async function PUT(req: NextRequest) {
  const id = extractId(req);
  if (id === null) {
    return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
  }

  try {
    const formData = await req.formData();

    const title = formData.get('title') as string;
    const author = formData.get('author') as string;
    const date = formData.get('date') as string;
    const status = formData.get('status') as string;
    const category = formData.get('category') as string;
    const content = formData.get('content') as string;

    const file = formData.get('image') as File | null;

    const [rows] = await pool.query('SELECT image_path FROM blogs WHERE id = ?', [id]) as any[];
    let imagePath = rows.length ? rows[0].image_path : '';

    if (file && file.name) {
      // Supprimer l'ancienne image
      if (imagePath) {
        const oldPath = path.join(process.cwd(), 'public', imagePath);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }

      // Sauvegarder la nouvelle image
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `${Date.now()}_${file.name}`;
      const uploadPath = path.join(process.cwd(), 'public', 'uploads', filename);
      fs.writeFileSync(uploadPath, buffer);
      imagePath = `/uploads/${filename}`;
    }

    await pool.query(
      `UPDATE blogs SET title = ?, author = ?, date = ?, status = ?, category = ?, content = ?, image_path = ? WHERE id = ?`,
      [title, author, date, status, category, content, imagePath, id]
    );

    return NextResponse.json({ message: 'Article mis à jour avec succès' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erreur lors de la mise à jour' }, { status: 500 });
  }
}
