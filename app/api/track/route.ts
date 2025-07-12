// app/api/dhl/track/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { trackingNumber } = await req.json();

  const DHL_API_KEY = process.env.DHL_API_KEY!;
  const url = `https://api.dhl.com/track/shipments?trackingNumber=${trackingNumber}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'DHL-API-Key': DHL_API_KEY,
      'Accept': 'application/json',
    },
  });

  const errorText = await res.text(); 

  if (!res.ok) {
    console.error('Erreur API DHL :', errorText); // 🔍 log côté serveur
    return NextResponse.json({ error: errorText }, { status: res.status });
  }

  const data = JSON.parse(errorText);
  return NextResponse.json(data);
}
