import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import fs from 'fs';
import path from 'path';

export async function GET(req: NextRequest) {
  try {
    const result = await pool.query(`
      SELECT * FROM Logo LIMIT 1
    `);
    const rows = result[0] as any[];
    const banner = rows[0];
    return NextResponse.json(banner);
  } catch (error) {
    console.error('Erreur GET Banner:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
