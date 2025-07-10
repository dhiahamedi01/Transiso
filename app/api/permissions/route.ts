import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { query } from "@/lib/db";

interface Permission {
  id: number;
  name: string;
}
export async function GET() {
  try {
    const [rows] = await pool.query("SELECT * FROM permissions");
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Erreur GET permissions:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { user_name, selectedPermissions } = body;

    if (!user_name || !Array.isArray(selectedPermissions) || selectedPermissions.length === 0) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    const values = selectedPermissions.map((permId: number) => [user_name, permId]);

    await pool.query("INSERT INTO user_permissions (user_name, permission_id) VALUES ?", [values]);

    return NextResponse.json({ message: "Permissions assignées" }, { status: 201 });
  } catch (error) {
    console.error("Erreur POST permissions:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
