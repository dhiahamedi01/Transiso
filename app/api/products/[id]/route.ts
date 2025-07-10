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

function extractIdFromUrl(req: NextRequest): number | null {
  const segments = req.nextUrl.pathname.split('/');
  const idStr = segments[segments.length - 1];
  const id = parseInt(idStr, 10);
  return isNaN(id) ? null : id;
}

// ✅ GET produit par ID
export async function GET(req: NextRequest) {
  const id = extractIdFromUrl(req);
  if (id === null) {
    return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
  }

  try {
    const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
    if ((rows as any).length === 0) {
      return NextResponse.json({ error: 'Produit non trouvé' }, { status: 404 });
    }

    return NextResponse.json((rows as any)[0]);
  } catch (err) {
    console.error('[product GET]', err);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// ✅ PUT mise à jour produit par ID
export async function PUT(req: NextRequest) {
  const id = extractIdFromUrl(req);
  if (id === null) {
    return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
  }

  try {
    const form = await req.formData();

    const name = String(form.get('productName') ?? '');
    const category = String(form.get('category') ?? '');
    const oldPriceStr = form.get('oldPrice')?.toString();
    const priceStr = form.get('price')?.toString() ?? '0';
    const stockStr = form.get('stock')?.toString() ?? '0';
    const description = form.get('description')?.toString() ?? null;

    if (!name || !category || !priceStr) {
      return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 });
    }

    const rawFiles = form.getAll('images');
    const files = rawFiles.filter(f => f instanceof File) as File[];
    const limitedFiles = files.slice(0, 5);
    const images = new Array<string | null>(5).fill(null);

    for (let i = 0; i < limitedFiles.length; i++) {
      images[i] = await saveFile(limitedFiles[i]);
    }

    const [rows] = await db.query(
      'SELECT image1, image2, image3, image4, image5 FROM products WHERE id = ?',
      [id]
    );
    if ((rows as any).length === 0) {
      return NextResponse.json({ error: 'Produit non trouvé' }, { status: 404 });
    }

    const oldImages = (rows as any)[0];
    for (let i = 0; i < 5; i++) {
      if (!images[i]) images[i] = oldImages[`image${i + 1}`];
    }

    const oldPrice = oldPriceStr ? parseFloat(oldPriceStr) : null;
    const price = parseFloat(priceStr);
    const stock = parseInt(stockStr, 10);

    const sql = `
      UPDATE products SET
        name = ?, category = ?, old_price = ?, price = ?, stock = ?, description = ?,
        image1 = ?, image2 = ?, image3 = ?, image4 = ?, image5 = ?
      WHERE id = ?
    `;

    const paramsSQL = [
      name,
      category,
      oldPrice,
      price,
      stock,
      description,
      ...images,
      id,
    ];

    await db.execute(sql, paramsSQL);

    return NextResponse.json({ id }, { status: 200 });
  } catch (err) {
    console.error('[product PUT]', err);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
