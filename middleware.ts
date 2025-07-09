import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "DEV_SECRET");

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/Login", request.url));
  }

  try {
    await jwtVerify(token, secret);

    return NextResponse.next();
  } catch (err) {
    console.error("Token invalide :", err);
    return NextResponse.redirect(new URL("/Login", request.url));
  }
}

export const config = {
  matcher: ["/Dashboard/:path*"],
};
