import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";
import db from "@/lib/db";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const image = formData.get("image") as File | null;
    const password = formData.get("password") as string | null;
    if (!password) {
      return NextResponse.json(
        { success: false, error: "Mot de passe manquant" },
        { status: 400 }
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
      `INSERT INTO employees
       (first_name, last_name, email, phone,
        location, permission, image_name, password)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        formData.get("firstName"),
        formData.get("lastName"),
        formData.get("email"),
        formData.get("phone"),
        formData.get("location"),
        formData.get("permission"),
        fileNameInDb,         
        hashedPwd
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
