
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
export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ message: 'ID manquant' }, { status: 400 });
    }

    const connection = await pool.getConnection();

    await connection.execute(`DELETE FROM devis WHERE id = ?`, [id]);

    connection.release();

    return NextResponse.json({ message: 'Demande supprimée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression :', error);
    return NextResponse.json(
      { message: 'Erreur serveur lors de la suppression' },
      { status: 500 }
    );
  }
}
