import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function GET(req: NextRequest) {
  try {
    const lang = req.nextUrl.searchParams.get('lang') || 'en';
    const [rows] = await pool.query('SELECT * FROM Banner_service WHERE lang = ? LIMIT 1', [lang]);
    if (Array.isArray(rows) && rows.length > 0) {
      return NextResponse.json(rows[0]);
    }
    return NextResponse.json({ message: 'Not found' }, { status: 404 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const formData = await req.formData();
    const lang = formData.get('lang') as string;

    const titre_globale = formData.get('titre_globale') as string;
    const titre1 = formData.get('titre1') as string;
    const description1 = formData.get('description1') as string;
    const titre2 = formData.get('titre2') as string;
    const description2 = formData.get('description2') as string;
    const titre3 = formData.get('titre3') as string;
    const description3 = formData.get('description3') as string;

    const icon1 = await saveImage(formData.get('icon1'), formData.get('existing_icon1'));
    const icon2 = await saveImage(formData.get('icon2'), formData.get('existing_icon2'));
    const icon3 = await saveImage(formData.get('icon3'), formData.get('existing_icon3'));

    await pool.query(
      `UPDATE Banner_service SET 
        titre_globale = ?, 
        titre1 = ?, description1 = ?, icon1 = ?, 
        titre2 = ?, description2 = ?, icon2 = ?, 
        titre3 = ?, description3 = ?, icon3 = ?
      WHERE lang = ?`,
      [
        titre_globale,
        titre1,
        description1,
        icon1,
        titre2,
        description2,
        icon2,
        titre3,
        description3,
        icon3,
        lang
      ]
    );

    return NextResponse.json({ message: 'Updated successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

async function saveImage(file: FormDataEntryValue | null, fallback: FormDataEntryValue | null) {
  if (file && typeof file !== 'string') {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${Date.now()}_${(file as File).name}`;
    const uploadPath = path.join(process.cwd(), 'public/uploads', filename);
    await writeFile(uploadPath, buffer);
    return `/uploads/${filename}`;
  }
  return fallback as string;
}
