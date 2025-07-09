import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await db.query(
      `SELECT id, first_name, last_name, email, phone, location, permission, image_name, created_at 
       FROM users ORDER BY created_at DESC`
    );

    const employees = (rows as any[]).map(emp => ({
      id: emp.id,
      image: emp.image_name ? `/uploads/${emp.image_name}` : null,
      name: `${emp.first_name} ${emp.last_name}`,
      email: emp.email,
      phone: emp.phone,
      location: emp.location,
      role: emp.permission,
      createdAt: emp.created_at,
    }));

    return NextResponse.json({ success: true, employees });
  } catch (error) {
    console.error("Erreur GET Liste_employee:", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
