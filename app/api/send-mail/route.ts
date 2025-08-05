import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { to, subject, text } = await req.json();

    if (!to || !subject || !text) {
      return NextResponse.json({ error: 'Champs manquants' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 587,
      secure: false, 
      auth: {
        user: 'Info@transisologistic.com',
        pass: 'Transiso@2025',
      },
    });

    await transporter.sendMail({
      from: `"Transiso" <Info@transisologistic.com>`,
      to,
      subject,
      text,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Erreur envoi mail:', error);
    return NextResponse.json({ error: 'Erreur lors de l’envoi', details: error.message }, { status: 500 });
  }
}
