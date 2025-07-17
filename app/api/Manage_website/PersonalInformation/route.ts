import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const [rows]: [any[], any] = await pool.query('SELECT * FROM PersonalInformation LIMIT 1');
    const info = rows[0];
    return NextResponse.json(info);
  } catch (error) {
    console.error('GET PersonalInformation error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { location, phoneNumber, email } = body;

    // Ici on suppose un seul enregistrement avec id = 1
    const [result]: any = await pool.query(
      'UPDATE PersonalInformation SET location = ?, phoneNumber = ?, email = ? WHERE id = 1',
      [location, phoneNumber, email]
    );

    if (result.affectedRows === 1) {
      return NextResponse.json({ message: 'Updated successfully' });
    } else {
      return NextResponse.json({ error: 'Update failed' }, { status: 400 });
    }
  } catch (error) {
    console.error('PUT PersonalInformation error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
