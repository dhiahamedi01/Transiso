import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: 'Name, email and message are required.' },
        { status: 400 }
      );
    }

    try {
      await pool.query(
        'INSERT INTO contact (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)',
        [name, email, phone || null, subject || null, message]
      );
      return NextResponse.json({ message: 'Message received.' }, { status: 201 });
    } catch (error) {
      console.error('Database error:', error);
      return NextResponse.json({ message: 'Database error.' }, { status: 500 });
    }
  } catch (error) {
    console.error('Invalid JSON or other error:', error);
    return NextResponse.json({ message: 'Invalid request body.' }, { status: 400 });
  }
}


export async function GET() {
  try {
    const [rows] = await pool.query('SELECT id, name, email, phone, subject, message FROM contact ORDER BY id DESC');
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ message: 'Database error.' }, { status: 500 });
  }
}

