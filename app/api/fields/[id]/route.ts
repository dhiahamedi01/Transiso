import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

function getIdFromReq(req: NextRequest) {
  const url = req.nextUrl;
  const idStr = url.pathname.split('/').pop();
  if (!idStr) return null;
  return Number(idStr);
}

export async function DELETE(req: NextRequest) {
  const fieldId = getIdFromReq(req);
  if (!fieldId || isNaN(fieldId)) {
    return NextResponse.json({ error: 'Invalid field ID' }, { status: 400 });
  }

  try {
    await pool.query('DELETE FROM fields WHERE id = ?', [fieldId]);
    return NextResponse.json({ message: 'Field deleted successfully' });
  } catch (error) {
    console.error('MySQL DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete field' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const fieldId = getIdFromReq(req);
  if (!fieldId || isNaN(fieldId)) {
    return NextResponse.json({ error: 'Invalid field ID' }, { status: 400 });
  }

  try {
    const { name } = await req.json();

    if (!name || name.trim() === '') {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    await pool.query('UPDATE fields SET name = ? WHERE id = ?', [name, fieldId]);

    const [updatedField]: any = await pool.query('SELECT * FROM fields WHERE id = ?', [fieldId]);

    if (updatedField.length === 0) {
      return NextResponse.json({ error: 'Field not found' }, { status: 404 });
    }

    return NextResponse.json(updatedField[0]);
  } catch (error) {
    console.error('MySQL UPDATE error:', error);
    return NextResponse.json({ error: 'Failed to update field' }, { status: 500 });
  }
}
