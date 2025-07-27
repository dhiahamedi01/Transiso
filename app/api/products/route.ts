import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';

export const config = { api: { bodyParser: false } };

const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads');

async function saveFile(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = `${Date.now()}-${file.name}`.replace(/\s+/g, '');
  await mkdir(UPLOAD_DIR, { recursive: true });
  await writeFile(join(UPLOAD_DIR, fileName), buffer);
  return `uploads/${fileName}`;
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();

    const name        = String(form.get('productName') ?? '');
    const category    = String(form.get('category') ?? '');
    const oldPriceStr = form.get('oldPrice')?.toString();
    const priceStr    = form.get('price')?.toString() ?? '0';
    const stockStr    = form.get('stock')?.toString() ?? '0';
    const description = form.get('description')?.toString() ?? null;
    const lang        = String(form.get('lang') ?? 'en');

    // Validation basique
    if (!name || !category || !priceStr) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // Validation langage autorisé
    const allowedLangs = ['en', 'ar', 'tr'];
    if (!allowedLangs.includes(lang)) {
      return NextResponse.json({ error: 'Invalid language' }, { status: 400 });
    }

    // Validation prix
    const price = parseFloat(priceStr);
    if (isNaN(price) || price < 0) {
      return NextResponse.json({ error: 'Invalid price' }, { status: 400 });
    }

    // Images max 5
    const files = (form.getAll('files') as File[]).slice(0, 5);
    const images = new Array<string | null>(5).fill(null);

    for (let i = 0; i < files.length; i++) {
      images[i] = await saveFile(files[i]);
    }

    // Insert SQL avec colonne lang (à ajouter en DB)
    const sql = `
      INSERT INTO products
        (name, category, old_price, price, stock, description,
         image1, image2, image3, image4, image5, lang)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      name,
      category,
      oldPriceStr || null,
      price,
      stockStr,
      description,
      ...images,
      lang
    ];

    const [result] = await db.execute(sql, params);
    const id = (result as any).insertId;

    return NextResponse.json({ id }, { status: 201 });
  } catch (err) {
    console.error('[products POST]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const [rows] = await db.query('SELECT * FROM products ORDER BY id DESC');
    return NextResponse.json(rows);
  } catch (err) {
    console.error('[products GET]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
