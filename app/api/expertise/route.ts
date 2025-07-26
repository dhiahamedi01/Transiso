import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import fs from 'fs';
import path from 'path';
import { RowDataPacket, OkPacket } from 'mysql2';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

export async function GET(req: NextRequest) {
  const lang = req.nextUrl.searchParams.get('lang') || 'en';

  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM expertise_section WHERE lang = ?',
      [lang]
    );

    if (rows.length === 0) {
      return NextResponse.json({ message: 'Section expertise introuvable.' }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Erreur GET /expertise:', error);
    return NextResponse.json({ message: 'Erreur serveur.' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const formData = await req.formData();
    const lang = (formData.get('lang') as string) || 'en';

    const fields = [
      'title', 'title_highlight', 'description',
      'service_1_title', 'service_1_description', 'service_1_icon_bg',
      'service_2_title', 'service_2_description', 'service_2_icon_bg',
      'feature_1', 'feature_2', 'feature_3', 'feature_4',
      'cta_text', 'founder_name', 'founder_role'
    ];

    const data: Record<string, string> = {};
    fields.forEach(field => {
      data[field] = (formData.get(field) as string) || '';
    });

    // Fichiers à gérer
    const founder_image_file = formData.get('founder_image') as File | null;
    const founder_signature_file = formData.get('founder_signature') as File | null;
    const image_main_file = formData.get('image_main') as File | null;
    const service_1_icon_file = formData.get('service_1_icon') as File | null;
    const service_2_icon_file = formData.get('service_2_icon') as File | null;

    const [existingRows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM expertise_section WHERE lang = ?',
      [lang]
    );
    const existingData = existingRows[0] || {};

    const saveFile = async (file: File | null, existingPath: string): Promise<string> => {
      if (!file || !file.name) return existingPath;
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = `${Date.now()}_${file.name.replace(/\s/g, '_')}`;
      const filepath = path.join(UPLOAD_DIR, filename);
      fs.writeFileSync(filepath, buffer);
      return `/uploads/${filename}`;
    };

    // Sauvegarde des fichiers
    const founder_image = await saveFile(founder_image_file, existingData.founder_image || '');
    const founder_signature = await saveFile(founder_signature_file, existingData.founder_signature || '');
    const image_main = await saveFile(image_main_file, existingData.image_main || '');
    const service_1_icon = await saveFile(service_1_icon_file, existingData.service_1_icon || '');
    const service_2_icon = await saveFile(service_2_icon_file, existingData.service_2_icon || '');

    if (existingRows.length > 0) {
      // UPDATE
      await pool.query<OkPacket>(
        `UPDATE expertise_section SET
          title = ?, title_highlight = ?, description = ?,
          service_1_title = ?, service_1_description = ?, service_1_icon_bg = ?, service_1_icon = ?,
          service_2_title = ?, service_2_description = ?, service_2_icon_bg = ?, service_2_icon = ?,
          feature_1 = ?, feature_2 = ?, feature_3 = ?, feature_4 = ?,
          cta_text = ?, founder_name = ?, founder_role = ?,
          founder_image = ?, founder_signature = ?, image_main = ?
        WHERE lang = ?`,
        [
          data.title, data.title_highlight, data.description,
          data.service_1_title, data.service_1_description, data.service_1_icon_bg, service_1_icon,
          data.service_2_title, data.service_2_description, data.service_2_icon_bg, service_2_icon,
          data.feature_1, data.feature_2, data.feature_3, data.feature_4,
          data.cta_text, data.founder_name, data.founder_role,
          founder_image, founder_signature, image_main,
          lang
        ]
      );
    } else {
      // INSERT
      await pool.query<OkPacket>(
        `INSERT INTO expertise_section (
          lang, title, title_highlight, description,
          service_1_title, service_1_description, service_1_icon_bg, service_1_icon,
          service_2_title, service_2_description, service_2_icon_bg, service_2_icon,
          feature_1, feature_2, feature_3, feature_4,
          cta_text, founder_name, founder_role,
          founder_image, founder_signature, image_main
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          lang, data.title, data.title_highlight, data.description,
          data.service_1_title, data.service_1_description, data.service_1_icon_bg, service_1_icon,
          data.service_2_title, data.service_2_description, data.service_2_icon_bg, service_2_icon,
          data.feature_1, data.feature_2, data.feature_3, data.feature_4,
          data.cta_text, data.founder_name, data.founder_role,
          founder_image, founder_signature, image_main
        ]
      );
    }

    return NextResponse.json({ message: 'Section expertise sauvegardée avec succès.' });
  } catch (error) {
    console.error('Erreur PUT /expertise:', error);
    return NextResponse.json({ message: 'Erreur serveur.' }, { status: 500 });
  }
}
