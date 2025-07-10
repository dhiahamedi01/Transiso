import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await pool.query("SELECT DISTINCT user_name FROM user_permissions");
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des groupes :", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
