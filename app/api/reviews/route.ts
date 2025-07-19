import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import  pool  from '@/lib/db'; // connexion MySQL

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const name = formData.get('name') as string;
    const position = formData.get('position') as string;
    const comment = formData.get('comment') as string;
    const rating = parseInt(formData.get('rating') as string, 10);
    const imageFile = formData.get('image') as File;

    if (!name || !position || !comment || !rating || !imageFile) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `${Date.now()}-${imageFile.name}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    const filePath = path.join(uploadDir, fileName);

    await writeFile(filePath, buffer);

    const imageUrl = `/uploads/${fileName}`;

    // Insérer dans la base de données
    await pool.query(
      `INSERT INTO reviews (name, position, comment, rating, image) VALUES (?, ?, ?, ?, ?)`,
      [name, position, comment, rating, imageUrl]
    );

    return NextResponse.json({ message: 'Review created successfully' }, { status: 200 });

  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
export async function GET() {
    try {
      const [rows] = await pool.query('SELECT * FROM reviews ORDER BY created_at DESC');
      return NextResponse.json(rows);
    } catch (error) {
      console.error('Erreur lors de la récupération des avis :', error);
      return NextResponse.json(
        { message: 'Erreur serveur lors de la récupération des témoignages' },
        { status: 500 }
      );
    }
  }