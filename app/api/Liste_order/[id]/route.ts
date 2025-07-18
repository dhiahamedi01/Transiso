import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function PUT(req: NextRequest) {
  // Récupérer l'id de l'URL
  const url = req.nextUrl;
  const id = url.pathname.split('/').pop();

  if (!id) {
    return NextResponse.json(
      { success: false, message: 'Missing id in URL' },
      { status: 400 }
    );
  }

  try {
    const body = await req.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json(
        { success: false, message: "Missing 'status' in request body" },
        { status: 400 }
      );
    }

    const [existingRows] = await db.execute(
      'SELECT id FROM orders WHERE id = ?',
      [id]
    );

    if ((existingRows as any[]).length === 0) {
      return NextResponse.json(
        { success: false, message: 'Order not found' },
        { status: 404 }
      );
    }

    await db.execute('UPDATE orders SET status = ? WHERE id = ?', [status, id]);

    return NextResponse.json({ success: true, message: 'Order status updated' });
  } catch (error: any) {
    console.error('Failed to update order status:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
