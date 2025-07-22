import type { NextApiRequest, NextApiResponse } from 'next';
import db from '@/lib/db';

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

type Data = {
  success?: boolean;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { text } = req.body;
  if (!text || typeof text !== 'string') return res.status(400).json({ error: 'Text is required' });
  if (!GOOGLE_API_KEY) return res.status(500).json({ error: 'API key not configured' });

  async function translate(target: string) {
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          q: text,
          source: 'ar',
          target,
          format: 'text',
        }),
      }
    );
    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    return data.data.translations[0].translatedText as string;
  }

  try {
    const [english, turkish] = await Promise.all([translate('en'), translate('tr')]);

    // Insérer dans la base
    const sql = `INSERT INTO test (arabic, english, turkish) VALUES (?, ?, ?)`;
    await db.execute(sql, [text, english, turkish]);

    res.status(200).json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Translation or DB insert failed' });
  }
}
