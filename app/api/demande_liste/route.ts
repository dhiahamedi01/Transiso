
import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const connection = await pool.getConnection();

    const [rows] = await connection.execute(`
      SELECT 
        id, service, shipping_from AS shippingFrom, shipping_to AS shippingTo,
        name, email, phone, date, weight, volume, cargo_details AS cargoDetails,
        notes, file_path AS filePath, created_at AS createdAt
      FROM devis
      ORDER BY created_at DESC
    `);

    connection.release();

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des demandes :', error);
    return NextResponse.json(
      { message: 'Erreur serveur lors de la récupération des demandes' },
      { status: 500 }
    );
  }
}
