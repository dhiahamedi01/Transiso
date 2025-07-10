import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

interface User {
  id: number;
  permission: string;
}

export async function GET(req: NextRequest) {
  try {

    const segments = req.nextUrl.pathname.split('/');
    const idStr = segments[segments.length - 1];
    const userId = parseInt(idStr, 10);

    if (isNaN(userId)) {
      return NextResponse.json({ error: "ID invalide" }, { status: 400 });
    }

    console.log("→ Requête utilisateur ID =", userId);

    const result = await query<User>(
      "SELECT id, permission FROM users WHERE id = ?",
      [userId]
    );

    console.log("→ Résultat SQL =", result);

    if (result.length === 0) {
      return NextResponse.json({ error: "Utilisateur introuvable" }, { status: 404 });
    }

    const user = result[0];

    return NextResponse.json({
      id: user.id,
      permissionGroup: user.permission,
    });
  } catch (error) {
    console.error("Erreur serveur :", error);
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 });
  }
}
