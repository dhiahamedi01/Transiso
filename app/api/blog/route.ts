import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const title = formData.get('title') as string;
  const author = formData.get('author') as string;
  const date = formData.get('date') as string;
  const status = formData.get('status') as string;
  const category = formData.get('category') as string;
  const content = formData.get('content') as string;
  const file = formData.get('image') as File;

  let imagePath = '';

  if (file && file.name) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${Date.now()}_${file.name}`;
    const uploadPath = path.join(process.cwd(), 'public', 'uploads', filename);
    fs.writeFileSync(uploadPath, buffer);
    imagePath = `/uploads/${filename}`;
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO blogs (title, author, date, status, category, content, image_path)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [title, author, date, status, category, content, imagePath]
    );

    return NextResponse.json({ message: 'Article inséré', id: (result as any).insertId });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Erreur lors de l\'insertion' }, { status: 500 });
  }
}


export async function GET() {
    try {
      const [rows] = await pool.query(`
        SELECT 
          id,                     -- auto‑increment dans votre table
          title,
          author,
          DATE_FORMAT(date,'%M %e, %Y') AS date,  -- July 8, 2025
          status,
          category,
          image_path              -- ex : "/uploads/1720433600000_banner.jpg"
        FROM blogs
        ORDER BY id DESC
      `);
  
      return NextResponse.json(rows);
    } catch (e) {
      console.error(e);
      return NextResponse.json({ error: 'Erreur de lecture' }, { status: 500 });
    }
  }