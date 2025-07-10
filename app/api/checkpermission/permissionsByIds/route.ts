import { NextResponse } from "next/server";
import { query } from "@/lib/db";

interface Permission {
  id: number;
  name: string;
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const idsParam = url.searchParams.get("ids");

    if (!idsParam) {
      return NextResponse.json({ error: "Missing ids parameter" }, { status: 400 });
    }

    const ids = idsParam.split(",").map(id => Number(id)).filter(Boolean);

    if (ids.length === 0) {
      return NextResponse.json({ error: "Invalid ids parameter" }, { status: 400 });
    }

    const placeholders = ids.map(() => "?").join(",");

    const sql = `SELECT id, name FROM permissions WHERE id IN (${placeholders})`;

    const permissions = await query<Permission>(sql, ids);

    return NextResponse.json(permissions);
  } catch (error) {
    console.error("Error in GET /permissionsByIds:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
