// lib/db.ts
import mysql from 'mysql2/promise';

const dbUrl = process.env.DATABASE_URL!;
const url = new URL(dbUrl);

const pool = mysql.createPool({
  host: url.hostname,
  user: url.username,
  password: url.password,
  database: url.pathname.replace('/', ''), // remove leading slash
  port: Number(url.port) || 3306,
});

export async function query<T>(sql: string, params?: any[]): Promise<T[]> {
  const [rows] = await pool.execute(sql, params);
  return rows as T[];
}

export default pool;
