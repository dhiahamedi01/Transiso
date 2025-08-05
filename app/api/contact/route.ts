import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    try {
      await pool.query(
        'INSERT INTO contact (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)',
        [name, email, phone || null, subject || null, message]
      );
    } catch (error) {
      console.error('Database error:', error);
      return NextResponse.json({ message: 'Error saving to database.' }, { status: 500 });
    }


    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com',
        port: 587,
        secure: false,
        auth: {
          user: 'Info@transisologistic.com',
          pass: 'Transiso@2025',
        },
      });

      const mailText = `
📩 New message received via the contact form:

👤 Full Name: ${name}
📧 Email Address: ${email}
📞 Phone Number: ${phone || 'Not provided'}
📝 Subject: ${subject || 'Not specified'}

💬 Message:
${message}
      `.trim();

      await transporter.sendMail({
        from: `"Transiso Contact" <Info@transisologistic.com>`,
        to: 'Info@transisologistic.com', 
        subject: `📬 New contact message from ${name}`,
        text: mailText,
      });

    } catch (mailError) {
      console.error('Error sending contact email:', mailError);
    }

    return NextResponse.json({ message: 'Message received and email sent successfully.' }, { status: 201 });
  } catch (error) {
    console.error('Invalid request body or other error:', error);
    return NextResponse.json({ message: 'Invalid request body.' }, { status: 400 });
  }
}

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT id, name, email, phone, subject, message FROM contact ORDER BY id DESC');
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ message: 'Error retrieving contact messages.' }, { status: 500 });
  }
}
