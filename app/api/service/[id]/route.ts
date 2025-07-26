import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import pool from '@/lib/db';

function getIdFromReq(req: NextRequest) {
  const url = req.nextUrl;
  const parts = url.pathname.split('/');
  return parts[parts.length - 1];
}

// GET /api/service/[id]
export async function GET(req: NextRequest) {
  const id = getIdFromReq(req);

  try {
    const [rows]: any = await pool.query(
      `SELECT * FROM services WHERE id = ? LIMIT 1`,
      [id]
    );

    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: 'Service non trouvé' }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Erreur GET Service:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// PUT /api/service/[id]
export async function PUT(req: NextRequest) {
  const id = getIdFromReq(req);

  try {
    const formData = await req.formData();

    const title = formData.get('title')?.toString() || '';
    const description = formData.get('description')?.toString() || '';
    const content = formData.get('content')?.toString() || '';
    const iconFile = formData.get('icon') as File | null;

    let iconPath = '';

    if (iconFile) {
      const bytes = await iconFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadDir = path.join('public', 'uploads', 'services');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const ext = path.extname(iconFile.name) || '.jpg';
      const fileName = `icon_${Date.now()}${ext}`;
      const filePath = path.join(uploadDir, fileName);
      fs.writeFileSync(filePath, buffer);
      iconPath = `/uploads/services/${fileName}`;

      // Supprimer ancien fichier icône si existant
      const oldResult = await pool.query(
        'SELECT icon_path FROM services WHERE id = ?',
        [id]
      );
      const oldRows = oldResult[0] as any[];
      const oldIcon = oldRows[0]?.icon_path;

      if (oldIcon) {
        const oldFullPath = path.join('public', oldIcon);
        if (fs.existsSync(oldFullPath)) {
          fs.unlinkSync(oldFullPath);
        }
      }
    }

    // Mise à jour des données
    let updateQuery = `
      UPDATE services
      SET title = ?, description = ?, content = ?
    `;
    const paramsArray = [title, description, content];

    if (iconPath) {
      updateQuery += `, icon_path = ?`;
      paramsArray.push(iconPath);
    }

    updateQuery += ' WHERE id = ?';
    paramsArray.push(id);

    const result = await pool.query(updateQuery, paramsArray);

    return NextResponse.json({ message: 'Service mis à jour avec succès.' });
  } catch (error) {
    console.error('Erreur PUT Service:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// DELETE /api/service/[id]
export async function DELETE(req: NextRequest) {
  const id = getIdFromReq(req);

  try {
    const result = await pool.query(
      'SELECT icon_path FROM services WHERE id = ?',
      [id]
    );
    const rows = result[0] as any[];
    const iconPath = rows[0]?.icon_path;

    if (iconPath) {
      const fullPath = path.join('public', iconPath);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    }

    const deleteResult = await pool.query(
      'DELETE FROM services WHERE id = ?',
      [id]
    );
    const deleteInfo = deleteResult[0] as any;

    if (deleteInfo.affectedRows === 0) {
      return NextResponse.json({ error: 'Service introuvable.' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Service supprimé avec succès.' });
  } catch (error) {
    console.error('Erreur DELETE Service:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
