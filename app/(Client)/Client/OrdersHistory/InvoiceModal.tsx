// InvoiceModal.tsx
"use client";

import React from "react";
import Image from "next/image";
import style from "./InvoiceModal.module.css";

export interface OrderData {
  orderId: string;
  customer: string;
  date: string;
  address: string;
  products: string;
  status: string;
  paymentStatus: string;
  weight?: string;  // optionnel, si tu veux ajouter plus de détails
  service?: string; // optionnel
}

interface InvoiceModalProps {
  data: OrderData;
  onClose: () => void;
  onPrint: () => void;
  printRef: React.RefObject<HTMLDivElement | null>;
}

export default function InvoiceModal({ data, onClose, onPrint, printRef }: InvoiceModalProps) {
  return (
    <div className={style.modalOverlay}>
      <div className={style.modalContent} ref={printRef}>
        {/* HEADER */}
        <header className={style.header}>
          <div className={style.logoLeft}>
            <Image src="/img/logo2.jpg" alt="Votre Logo" width={190} height={60} />
          </div>
          <div className={style.companyInfo}>
            <p>Adresse: Istanbul, Turkey</p>
            <p>Email: info@transisologistic.com</p>
            <p>Téléphone: (+90) 5377671027</p>
          </div>
          <div className={style.logoRight}>
            <Image src="/img/Aramex_logo.png" alt="Aramex Logo" width={140} height={20} />
          </div>
        </header>

        {/* TITRE */}
        <h2 className={style.invoiceTitle}>FACTURE D'EXPÉDITION</h2>

        {/* DESTINATAIRE */}
        <section className={style.section}>
          <h3>Détails du destinataire</h3>
          <div className={style.detailsGrid}>
            <div><strong>Nom :</strong> {data.customer}</div>
            <div><strong>ID Colis :</strong> {data.orderId}</div>
            <div><strong>Date :</strong> {data.date}</div>
            <div><strong>Adresse :</strong> {data.address}</div>
            <div><strong>Produits :</strong> {data.products}</div>
            <div><strong>Statut :</strong> {data.status}</div>
            <div><strong>Statut Paiement :</strong> {data.paymentStatus}</div>
            <div><strong>Poids :</strong> {data.weight ?? "-"}</div>
            <div><strong>Service :</strong> {data.service ?? "-"}</div>
          </div>
        </section>

        {/* TABLEAU RÉCAPITULATIF */}
        <section className={style.section}>
          <h3>Résumé de l'expédition</h3>
          <table className={style.invoiceTable}>
            <thead>
              <tr>
                <th>ID Colis</th>
                <th>Client</th>
                <th>Poids</th>
                <th>Statut</th>
                <th>Service</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{data.orderId}</td>
                <td>{data.customer}</td>
                <td>{data.weight ?? "-"}</td>
                <td>{data.status}</td>
                <td>{data.service ?? "-"}</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* FOOTER */}
        <footer className={style.footer}>
          <button onClick={onPrint} className={style.printBtn}>Imprimer</button>
          <button onClick={onClose} className={style.closeBtn}>Fermer</button>
        </footer>

        <p className={style.legal}>© 2025 Votre Société Import-Export. Tous droits réservés.</p>
      </div>
    </div>
  );
}
