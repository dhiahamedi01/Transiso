import { NextResponse } from "next/server";
import { query } from "@/lib/db";

interface User {
  id: number;
  permission: string;
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const userId = parseInt(params.id, 10);

  // Pour debug
  console.log("→ Requête utilisateur ID =", userId);

  const result = await query<User>(
    "SELECT id,permission FROM users WHERE id = ?",
    [userId]
  );

  console.log("→ Résultat SQL =", result);

  if (result.length === 0) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const user = result[0];

  return NextResponse.json({
    id: user.id,
    permissionGroup: user.permission,
  });
}
