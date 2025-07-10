import { NextResponse } from "next/server";
import { query } from "@/lib/db";

interface PermissionGroupData {
  permission_id: number;
}

export async function GET(
  request: Request,
  { params }: { params: { userName: string } }
) {
  const { userName } = params;

  const result = await query<PermissionGroupData>(
    "SELECT permission_id FROM user_permissions WHERE user_name = ?",
    [userName]
  );

  if (result.length === 0) {
    return NextResponse.json({ error: "Permission group not found" }, { status: 404 });
  }

  const permissionIds = result.map(row => row.permission_id);

  return NextResponse.json({
    permission_ids: permissionIds,
  });
}
