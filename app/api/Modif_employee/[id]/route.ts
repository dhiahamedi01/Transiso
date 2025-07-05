import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';
import bcrypt from 'bcryptjs';
import db from '@/lib/db';

/* ------------------------------------------------------------------
   GET /api/employees/:id         → récupérer un employé pour pré‑remplir
-------------------------------------------------------------------*/
export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const [rows] = await db.query('SELECT * FROM employees WHERE id = ?', [id]);

  if ((rows as any[]).length === 0) {
    return NextResponse.json({ success: false }, { status: 404 });
  }

  const emp = (rows as any[])[0];
  return NextResponse.json({
    success: true,
    employee: {
      id: emp.id,
      image: emp.image_name ? `/uploads/${emp.image_name}` : null,
      firstName: emp.first_name,
      lastName: emp.last_name,
      email: emp.email,
      phone: emp.phone ?? '',
      location: emp.location ?? '',
      permission: emp.permission,          // 'user' | 'manager' | 'admin'
    },
  });
}

/* ------------------------------------------------------------------
   PATCH /api/employees/:id       → mettre à jour
-------------------------------------------------------------------*/
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    const formData = await req.formData();

    /* ---------- Mot de passe (optionnel) ---------- */
    let hashedPwdClause = '';
    const newPwd = formData.get('password') as string | null;
    if (newPwd) {
      const confirm = formData.get('confirmPassword') as string | null;
      if (newPwd !== confirm)
        return NextResponse.json(
          { success: false, error: 'Passwords mismatch' },
          { status: 400 }
        );
      const hash = await bcrypt.hash(newPwd, 10);
      hashedPwdClause = ', password = ?';
      formData.set('hashedPwd', hash); // temp pour values
    }

    /* ---------- Image (optionnelle) ---------- */
    let imageClause = '';
    const image = formData.get('image') as File | null;
    if (image && image.size > 0) {
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      await mkdir(uploadDir, { recursive: true });
      const ext = path.extname(image.name);
      const fileName = `${randomUUID()}${ext}`;
      const buffer = Buffer.from(await image.arrayBuffer());
      await writeFile(path.join(uploadDir, fileName), buffer);

      imageClause = ', image_name = ?';
      formData.set('newImageName', fileName); // temp pour values
    }

    /* ---------- Construction dynamique ---------- */
    const sql =
      `UPDATE employees SET
         first_name = ?,
         last_name  = ?,
         email      = ?,
         phone      = ?,
         location   = ?,
         permission = ?` +
      imageClause +
      hashedPwdClause +
      ` WHERE id = ?`;

    const values = [
      formData.get('firstName'),
      formData.get('lastName'),
      formData.get('email'),
      formData.get('phone'),
      formData.get('location'),
      formData.get('permission'),
    ];

    if (imageClause) values.push(formData.get('newImageName'));
    if (hashedPwdClause) values.push(formData.get('hashedPwd'));
    values.push(id);

    await db.query(sql, values);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('PATCH /employees/:id', err);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
