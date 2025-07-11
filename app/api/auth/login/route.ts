import { NextResponse } from "next/server";
import db from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "DEV_SECRET";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Vérification si email et mot de passe sont fournis
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email ou mot de passe manquant" },
        { status: 400 }
      );
    }

    // Vérifier si l'utilisateur existe dans la table users
    const [rows]: any = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, error: "Email incorrect" },
        { status: 401 }
      );
    }

    const user = rows[0];

    // Vérification du mot de passe avec bcrypt
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { success: false, error: "Mot de passe incorrect" },
        { status: 401 }
      );
    }

    // Génération du token JWT valable 24 heures
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.first_name + " " + user.last_name
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.first_name + " " + user.last_name,
        role: user.role,
        image: user.image_name
      }
    });

  } catch (err) {
    console.error("Erreur interne :", err);
    return NextResponse.json(
      { success: false, error: "Erreur interne" },
      { status: 500 }
    );
  }
}
