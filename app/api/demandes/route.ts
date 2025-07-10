// app/api/demandes/route.ts
import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import pool from "@/lib/db"; // Assurez-vous que ce chemin est correct pour votre configuration de base de données

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // Récupération de tous les champs du formulaire, y compris les nouveaux
    const service = formData.get("service") as string;
    const shippingFrom = formData.get("from") as string; // Correspond à 'from' envoyé par le frontend
    const shippingTo = formData.get("to") as string;     // Correspond à 'to' envoyé par le frontend
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const date = formData.get("date") as string;
    const weight = formData.get("weight") as string;
    const volume = formData.get("volume") as string;
    const cargoDetails = formData.get("cargoDetails") as string;
    const notes = formData.get("notes") as string;
    const file = formData.get("file") as File | null;

    let filePath = null;

    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      // Assurez-vous que le répertoire de téléchargement est approprié
      const uploadDir = path.join(process.cwd(), "public/uploads/demandes");

      await mkdir(uploadDir, { recursive: true });

      const fileName = `${Date.now()}-${file.name}`;
      filePath = `/uploads/demandes/${fileName}`; // Chemin public pour l'accès via URL
      const fullPath = path.join(uploadDir, fileName); // Chemin complet pour l'écriture du fichier

      await writeFile(fullPath, buffer);
    }

    // Insertion dans la base de données
    const connection = await pool.getConnection();
    await connection.execute(
      `
      INSERT INTO devis 
        (service, shipping_from, shipping_to, name, email, phone, date, weight, volume, cargo_details, notes, file_path) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [service, shippingFrom, shippingTo, name, email, phone, date, weight, volume, cargoDetails, notes, filePath]
    );
    connection.release(); // Libérer la connexion à la base de données

    return NextResponse.json({
      message: "Formulaire de demande enregistré avec succès",
      data: {
        service,
        shippingFrom,
        shippingTo,
        name,
        email,
        phone,
        date,
        weight,
        volume,
        cargoDetails,
        notes,
        filePath,
      },
    });
  } catch (error) {
    // Journalisation d'erreur plus détaillée
    console.error("Erreur lors de l’enregistrement de la demande :", error);
    if (error instanceof Error) {
      console.error("Détails de l'erreur :", error.message);
      if ('sqlMessage' in error) { // Spécifique pour les erreurs MySQL/MariaDB
        console.error("Message SQL :", (error as any).sqlMessage);
        console.error("Code SQL :", (error as any).sqlState);
      }
    }
    return NextResponse.json(
      { message: "Erreur lors de l’enregistrement de la demande" },
      { status: 500 }
    );
  }
}
