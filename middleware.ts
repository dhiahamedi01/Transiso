import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "DEV_SECRET";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/Login", request.url));
  }

  try {
    jwt.verify(token, JWT_SECRET); 
    return NextResponse.next(); 
  } catch (err) {
    return NextResponse.redirect(new URL("/Login", request.url)); 
  }
}

export const config = {
  matcher: ["/Dashboard/:path*"], 
};
