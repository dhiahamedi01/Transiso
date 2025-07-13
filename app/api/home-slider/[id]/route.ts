import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import { mkdirSync, existsSync } from 'fs';
import pool from '@/lib/db'; // Assure-toi que c'est bien mysql2/promise

// 📦 Créer le dossier public/uploads s'il n'existe pas
const uploadDir = path.join(process.cwd(), 'public', 'uploads');
if (!existsSync(uploadDir)) {
  mkdirSync(uploadDir, { recursive: true });
}

// 🟢 GET - Lire un slider par ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;

  try {
    const [rows]: any = await pool.query(
      'SELECT id, Icon, Titre, Description, Image FROM Home_Slider WHERE id = ? LIMIT 1',
      [id]
    );

    if (Array.isArray(rows) && rows.length > 0) {
      return NextResponse.json(rows[0]);
    } else {
      return NextResponse.json({ error: 'Slider not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// 🟠 PUT - Mettre à jour un slider
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;

  try {
    const formData = await req.formData();

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    // 🖼️ Gestion fichiers
    let iconPath = formData.get('iconUrl') as string;
    const iconFile = formData.get('icon') as File;

    if (iconFile && typeof iconFile === 'object' && iconFile.size > 0) {
      const buffer = Buffer.from(await iconFile.arrayBuffer());
      const fileName = `icon_${Date.now()}_${iconFile.name}`;
      const filePath = path.join(uploadDir, fileName);
      await fs.writeFile(filePath, buffer);
      iconPath = `/uploads/${fileName}`;
    }

    let imagePath = formData.get('imageUrl') as string;
    const imageFile = formData.get('image') as File;

    if (imageFile && typeof imageFile === 'object' && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const fileName = `image_${Date.now()}_${imageFile.name}`;
      const filePath = path.join(uploadDir, fileName);
      await fs.writeFile(filePath, buffer);
      imagePath = `/uploads/${fileName}`;
    }

    // 🛠️ Update SQL
    await pool.query(
      'UPDATE Home_Slider SET Titre = ?, Description = ?, Icon = ?, Image = ? WHERE id = ?',
      [title, description, iconPath, imagePath, id]
    );

    return NextResponse.json({ message: 'Slider updated successfully' });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
