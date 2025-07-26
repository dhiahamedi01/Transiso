import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import pool from '@/lib/db';
import { randomUUID } from 'crypto'; // Ajouté ici

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const lang = url.searchParams.get("lang") || "en";

    const [rows] = await pool.query(
      `SELECT id, service_id, title, description, content, icon_path, lang
       FROM services WHERE lang = ? ORDER BY id DESC`,
      [lang]
    );

    return NextResponse.json({ services: rows }, { status: 200 });
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const iconFile = formData.get('icon') as File;

    const langs = ['en', 'ar', 'tr'];

    const data = langs.map((lang) => ({
      title: formData.get(`title_${lang}`),
      description: formData.get(`description_${lang}`),
      content: formData.get(`content_${lang}`),
      lang,
    }));

    if (!iconFile || !data[0].title) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    // Save the icon file
    const bytes = await iconFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadsDir, { recursive: true });

    const fileName = `${Date.now()}_${iconFile.name}`;
    const filePath = path.join(uploadsDir, fileName);
    await fs.writeFile(filePath, buffer);
    const imagePath = `/uploads/${fileName}`;

    // Generate shared service_id
    const serviceId = randomUUID();

    // Insert 3 language rows with same service_id
    const insertQuery = `
      INSERT INTO services (service_id, title, description, content, icon_path, lang)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    for (const entry of data) {
      await pool.query(insertQuery, [
        serviceId,
        entry.title,
        entry.description,
        entry.content,
        imagePath,
        entry.lang,
      ]);
    }

    return NextResponse.json({ message: 'Services saved in multiple languages.', serviceId }, { status: 200 });
  } catch (err) {
    console.error('DB Error:', err);
    return NextResponse.json({ error: 'Database error.' }, { status: 500 });
  }
}
