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
      price, // ✅ Ajout du champ
    } = data;

    // ✅ Insertion dans la table orders avec le champ price
    const [result] = await db.execute(
      `INSERT INTO orders 
        (orderId, customer, date, address, products, status, payment, country, paymentMethod, phone, email, price)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
        price, // ✅ Insertion du prix
      ]
    );

    // ✅ Insertion dans la table notifications
    await db.execute(
      `INSERT INTO notifications (orderId, message) VALUES (?, ?)`,
      [orderId, `Nouvelle commande de ${customer}`]
    );

    return NextResponse.json({ success: true, message: 'تم حفظ الطلب', data: result });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    let rows;
    if (email) {
      [rows] = await db.execute(
        `SELECT * FROM orders WHERE email = ? ORDER BY date DESC`,
        [email]
      );
    } else {
      [rows] = await db.execute(`SELECT * FROM orders ORDER BY date DESC`);
    }

    return NextResponse.json({ success: true, data: rows });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
