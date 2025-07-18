// app/api/orders/[orderId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    // orderId est dans le pathname : /api/orders/{orderId}
    const orderId = req.nextUrl.pathname.split('/').pop();

    if (!orderId) {
      return NextResponse.json({ success: false, error: 'OrderId missing' }, { status: 400 });
    }

    const [rows] = await db.execute(
      'SELECT * FROM orders WHERE orderId = ? LIMIT 1',
      [orderId]
    );

    if (Array.isArray(rows) && rows.length > 0) {
      return NextResponse.json({ success: true, data: rows[0] });
    } else {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
    }
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
