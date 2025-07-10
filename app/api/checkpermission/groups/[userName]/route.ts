import { NextResponse } from "next/server";
import { query } from "@/lib/db";

interface PermissionGroupData {
  permission_id: number;
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const segments = url.pathname.split('/');
  const userName = segments[segments.length - 1];

  if (!userName) {
    return NextResponse.json({ error: "Nom d'utilisateur manquant" }, { status: 400 });
  }

  try {
    const result = await query<PermissionGroupData>(
      "SELECT permission_id FROM user_permissions WHERE user_name = ?",
      [userName]
    );

    if (result.length === 0) {
      return NextResponse.json({ error: "Groupe de permissions introuvable" }, { status: 404 });
    }

    const permissionIds = result.map(row => row.permission_id);

    return NextResponse.json({
      permission_ids: permissionIds,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
