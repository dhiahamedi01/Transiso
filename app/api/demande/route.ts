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

    // ✅ Insérer dans la base de données
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

    // ✅ Envoi d'e-mail de confirmation
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER, // Assure-toi que c’est bien défini
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailText = `
Nouvelle demande d'expédition:

Nom complet: ${fullName}
Email: ${email}
Téléphone: ${phone}
Destination: ${destination}
Type d'expédition: ${shippingType}
Poids: ${weight}
Services supplémentaires: ${servicesString}
Description: ${description}
    `.trim();

    await transporter.sendMail({
      from: `"Transiso" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || email, // Par défaut, envoie à l’utilisateur sauf si un admin est défini
      subject: 'Nouvelle demande d’expédition',
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
