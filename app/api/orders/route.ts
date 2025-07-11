// app/api/orders/route.ts
import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const {
      orderId,
      customer,
      date,
      address,
      products,
      status,
      payment,
      country,
      paymentMethod,
      phone,
      email,
    } = data;

    const [result] = await db.execute(
      `INSERT INTO orders 
        (orderId, customer, date, address, products, status, payment, country, paymentMethod, phone, email)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        orderId,
        customer,
        date,
        address,
        products,
        status,
        payment,
        country,
        paymentMethod,
        phone,
        email,
      ]
    );

    return NextResponse.json({ success: true, message: 'تم حفظ الطلب', data: result });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
