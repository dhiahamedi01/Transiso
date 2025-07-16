import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import pool from '@/lib/db';

export async function GET(req: NextRequest) {
    try {
      const [rows] = await pool.query('SELECT id, title, description, icon_path FROM services ORDER BY id DESC');
      return NextResponse.json({ services: rows }, { status: 200 });
    } catch (error) {
      console.error('Error fetching services:', error);
      return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
    }
  }
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const iconFile = formData.get('icon') as File;
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const content = formData.get('content') as string;

  if (!iconFile || !title) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
  }

  const bytes = await iconFile.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');

  await fs.mkdir(uploadsDir, { recursive: true });

  const fileName = `${Date.now()}_${iconFile.name}`;
  const filePath = path.join(uploadsDir, fileName);
  await fs.writeFile(filePath, buffer);

  const imagePath = `/uploads/${fileName}`;

  try {
    const query = `
      INSERT INTO services (title, description, content, icon_path)
      VALUES (?, ?, ?, ?)
    `;
    await pool.query(query, [title, description, content, imagePath]);

    return NextResponse.json({ message: 'Service created.' }, { status: 200 });
  } catch (err) {
    console.error('DB Error:', err);
    return NextResponse.json({ error: 'Database error.' }, { status: 500 });
  }
}
