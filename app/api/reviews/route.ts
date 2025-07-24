import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import pool from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const name = formData.get('name') as string;
    const position = formData.get('position') as string;
    const comment = formData.get('comment') as string;
    const rating = parseInt(formData.get('rating') as string, 10);
    const imageFile = formData.get('image') as File;
    const lang = formData.get('lang') as string;

    if (!name || !position || !comment || !rating || !imageFile || !lang) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Save image file
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `${Date.now()}-${imageFile.name}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    const filePath = path.join(uploadDir, fileName);

    await writeFile(filePath, buffer);

    const imageUrl = `/uploads/${fileName}`;

    // Insert with lang column
    await pool.query(
      `INSERT INTO reviews (name, position, comment, rating, image, lang) VALUES (?, ?, ?, ?, ?, ?)`,
      [name, position, comment, rating, imageUrl, lang]
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
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { message: 'Server error fetching reviews' },
      { status: 500 }
    );
  }
}
