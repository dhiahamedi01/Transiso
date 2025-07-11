// backend: app/api/signup/route.ts (Next.js 13+ app router)
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import db from "@/lib/db";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const {
      firstName,
      lastName,
      email,
      phone,
      location,
      permission,
      password,
      company,
      role = "user" // role par défaut à user
    } = data;

    if (!password) {
      return NextResponse.json(
        { success: false, error: "Mot de passe manquant" },
        { status: 400 }
      );
    }

    const hashedPwd = await bcrypt.hash(password, 10);

    // On insère en base (image_name à null)
    await db.query(
      `INSERT INTO users
       (first_name, last_name, email, phone, location, permission, image_name, password, role, company)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        firstName,
        lastName,
        email,
        phone,
        location,
        permission,
        null,
        hashedPwd,
        role,
        company
      ]
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: String(err) },
      { status: 500 }
    );
  }
}
