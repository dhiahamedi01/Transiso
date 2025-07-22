import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import fs from 'fs';
import path from 'path';
import { OkPacket } from 'mysql2'; // ✅ Type de retour de MySQL

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const date = formData.get('date') as string;
  const status = formData.get('status') as string;
  const translationsRaw = formData.get('translations') as string | null;
  const file = formData.get('image') as File | null;

  if (!translationsRaw) {
    return NextResponse.json({ error: 'Translations data missing' }, { status: 400 });
  }

  // ✅ Parse les traductions
  let translations: Record<string, { title: string; author: string; category: string; content: string }>;
  try {
    translations = JSON.parse(translationsRaw);
  } catch (err) {
    return NextResponse.json({ error: 'Invalid translations JSON' }, { status: 400 });
  }

  // ✅ Gérer le fichier image
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
    let postId: number | null = null;
    const insertedIds: number[] = [];

    for (const lang of ['en', 'tr', 'ar']) {
      const t = translations[lang] || { title: '', author: '', category: '', content: '' };
      const [result, _] = await pool.query(
        `INSERT INTO blogs (post_id, lang, title, author, date, status, category, content, image_path)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          postId ?? 0,
          lang,
          t.title || '',
          t.author || '',
          date || null,
          status || 'Draft',
          t.category || '',
          t.content || '',
          imagePath,
        ]
      ) as [OkPacket, any];
      
      const insertId: number = result.insertId;
      
      insertedIds.push(insertId);

      // Met à jour post_id
      await pool.query(
        `UPDATE blogs SET post_id = ? WHERE id = ?`,
        [postId ?? insertId, insertId]
      );

      if (!postId) postId = insertId;
    }

    return NextResponse.json({ message: 'Articles insérés avec succès', ids: insertedIds, postId });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Erreur lors de l\'insertion' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const [rows] = await pool.query(`
      SELECT 
        id,
        post_id,
        lang,
        title,
        author,
        DATE_FORMAT(date, '%Y-%m-%d') AS date,
        status,
        category,
        content,
        image_path
      FROM blogs
      ORDER BY id DESC
    `);

    return NextResponse.json(rows);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Erreur de lecture des articles' }, { status: 500 });
  }
}
