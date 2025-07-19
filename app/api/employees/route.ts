import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";
import db from "@/lib/db";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const email = formData.get("email") as string | null;
    const phone = formData.get("phone") as string | null;
    const firstName = formData.get("firstName") as string | null;
    const lastName = formData.get("lastName") as string | null;
    const image = formData.get("image") as File | null;
    const password = formData.get("password") as string | null;

    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { success: false, error: "Champs requis manquants" },
        { status: 400 }
      );
    }

    // ✅ Vérifier si un utilisateur avec email OU phone OU même prénom + nom existe déjà
    const [existingUsers] = await db.query(
      `SELECT id FROM users
       WHERE email = ? OR phone = ? OR (first_name = ? AND last_name = ?)`,
      [email, phone, firstName, lastName]
    );

    if (Array.isArray(existingUsers) && existingUsers.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Un utilisateur avec cet email, numéro de téléphone ou nom complet existe déjà",
        },
        { status: 409 }
      );
    }

    const hashedPwd = await bcrypt.hash(password, 10);

    let fileNameInDb: string | null = null;

    if (image && image.size > 0) {
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      await mkdir(uploadDir, { recursive: true });
      const ext = path.extname(image.name);
      const fileName = `${randomUUID()}${ext}`;

      const arrayBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      await writeFile(path.join(uploadDir, fileName), buffer);

      fileNameInDb = fileName;
    }

    await db.query(
      `INSERT INTO users
       (first_name, last_name, email, phone,
        location, permission, image_name, password, role)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        firstName,
        lastName,
        email,
        phone,
        formData.get("location"),
        formData.get("permission"),
        fileNameInDb,
        hashedPwd,
        "employe",
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
