import { NextRequest, NextResponse } from 'next/server';
import { writeFile, unlink, mkdir } from 'fs/promises';
import path from 'path';
import pool from '@/lib/db';

// GET: Get a review by ID
export async function GET(req: NextRequest) {
  const { pathname } = new URL(req.url);
  const id = pathname.split('/').pop();
  const parsedId = parseInt(id ?? '', 10);

  if (isNaN(parsedId)) {
    return NextResponse.json({ message: 'ID invalide' }, { status: 400 });
  }

  try {
    const [rows] = await pool.query('SELECT * FROM reviews WHERE id = ?', [parsedId]);

    if ((rows as any).length === 0) {
      return NextResponse.json({ message: 'Avis non trouvé' }, { status: 404 });
    }

    return NextResponse.json((rows as any)[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
  }
}

// PUT: Update a review by ID
export async function PUT(req: NextRequest) {
  const { pathname } = new URL(req.url);
  const id = pathname.split('/').pop();
  const parsedId = parseInt(id ?? '', 10);

  if (isNaN(parsedId)) {
    return NextResponse.json({ message: 'ID invalide' }, { status: 400 });
  }

  try {
    const formData = await req.formData();

    const name = formData.get('name') as string;
    const position = formData.get('position') as string;
    const comment = formData.get('comment') as string;
    const rating = parseInt(formData.get('rating') as string, 10);
    const imageFile = formData.get('image') as File | null;

    if (!name || !position || !comment || isNaN(rating)) {
      return NextResponse.json({ message: 'Champs requis manquants' }, { status: 400 });
    }

    const [rows] = await pool.query('SELECT image FROM reviews WHERE id = ?', [parsedId]);
    if ((rows as any).length === 0) {
      return NextResponse.json({ message: 'Avis non trouvé' }, { status: 404 });
    }

    const oldImageUrl = (rows as any)[0].image;
    let imageUrl = oldImageUrl;

    if (imageFile && imageFile.name) {
      try {
        const safePath = path.normalize(oldImageUrl).replace(/^(\.\.[/\\])+/, '');
        const oldFilePath = path.join(process.cwd(), 'public', safePath);
        await unlink(oldFilePath);
      } catch {
        console.warn('Ancienne image non trouvée.');
      }

      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      await mkdir(uploadDir, { recursive: true });

      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = `${Date.now()}-${imageFile.name}`;
      const filePath = path.join(uploadDir, fileName);

      await writeFile(filePath, buffer);
      imageUrl = `/uploads/${fileName}`;
    }

    await pool.query(
      `UPDATE reviews SET name = ?, position = ?, comment = ?, rating = ?, image = ? WHERE id = ?`,
      [name, position, comment, rating, imageUrl, parsedId]
    );

    return NextResponse.json({ message: 'Avis mis à jour avec succès' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
  }
}

// DELETE: Delete a review by ID
export async function DELETE(req: NextRequest) {
  const { pathname } = new URL(req.url);
  const id = pathname.split('/').pop();
  const parsedId = parseInt(id ?? '', 10);

  if (isNaN(parsedId)) {
    return NextResponse.json({ message: 'ID invalide' }, { status: 400 });
  }

  try {
    const [rows] = await pool.query('SELECT image FROM reviews WHERE id = ?', [parsedId]);
    if ((rows as any).length === 0) {
      return NextResponse.json({ message: 'Review not found' }, { status: 404 });
    }

    const imageUrl = (rows as any)[0].image;

    await pool.query('DELETE FROM reviews WHERE id = ?', [parsedId]);

    try {
      const safePath = path.normalize(imageUrl).replace(/^(\.\.[\/\\])+/, '');
      const filePath = path.join(process.cwd(), 'public', safePath);
      await unlink(filePath);
    } catch (err) {
      console.warn('Image file not found or already deleted.');
    }

    return NextResponse.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
