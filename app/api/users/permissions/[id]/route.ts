import { NextResponse } from "next/server";
import { query } from "@/lib/db";

interface User {
  id: number;
  permission: string;
}

interface PermissionGroupRow {
  permission_id: number;
}

interface Permission {
  id: number;
  name: string;
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const userId = parseInt(params.id, 10);

  if (isNaN(userId)) {
    return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
  }

  // 1. Récupérer l'utilisateur
  const users = await query<User>("SELECT id, permission FROM users WHERE id = ?", [userId]);
  if (users.length === 0) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  const user = users[0];
  const userName = user.permission;

  // 2. Récupérer les permission_ids
  const permGroupRows = await query<PermissionGroupRow>(
    "SELECT permission_id FROM user_permissions WHERE user_name = ?",
    [userName]
  );
  if (permGroupRows.length === 0) {
    return NextResponse.json({ user, permissions: [] });
  }

  const permissionIds = permGroupRows.map(row => row.permission_id);

  // 3. Récupérer les permissions complètes
  const placeholders = permissionIds.map(() => "?").join(",");
  const permissions = await query<Permission>(
    `SELECT id, name FROM permissions WHERE id IN (${placeholders})`,
    permissionIds
  );

  return NextResponse.json({ user, permissions });
}
