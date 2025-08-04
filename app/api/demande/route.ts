import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { OkPacket } from 'mysql2';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const {
      fullName,
      email,
      phone,
      destination,
      shippingType,
      description,
      weight,
      services,
    } = data;

    const servicesString = Array.isArray(services) ? services.join(', ') : '';

    // ✅ Insertion en base de données
    const [result] = await pool.query(
      `INSERT INTO demandes (
        full_name,
        email,
        phone,
        destination,
        shipping_type,
        description,
        weight,
        services
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        fullName,
        email,
        phone,
        destination,
        shippingType,
        description,
        weight,
        servicesString,
      ]
    ) as [OkPacket, any];

    // ✅ Envoi de l'email en arabe
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',     
      port: 465,                  
      secure: true,
      auth: {
        user: 'dhiahamedi01@gmail.com',   
        pass: 'ybpczdvdzaalhobu',          
      },
    });

    const mailText = `
شكرًا لاختيارك Transiso!

لقد تلقينا طلبك وسنرسل لك عرض السعر خلال أقل من ٢٤ ساعة.

📝 تفاصيل الطلب:

الاسم الكامل: ${fullName}
البريد الإلكتروني: ${email}
رقم الهاتف: ${phone}
الوجهة: ${destination}
نوع الشحن: ${shippingType}
الوزن: ${weight}
الخدمات الإضافية: ${servicesString || 'لا يوجد'}
الوصف: ${description}

📦Transiso فريق  يتمنى لك يومًا سعيدًا.
    `.trim();

    await transporter.sendMail({
      from: `"Transiso" <dhiahamedi01@gmail.com>`, 
      to: email,  
      subject: 'تم استلام طلب الأسعار الخاص بك',
      text: mailText,
    });

    return NextResponse.json({ success: true, id: result.insertId });
  } catch (error: any) {
    console.error('Erreur dans /api/demande :', error);
    return NextResponse.json({ error: 'Erreur serveur', details: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const [rows] = await pool.query(`SELECT * FROM demandes ORDER BY id DESC`);
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Erreur GET /api/demande :', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
