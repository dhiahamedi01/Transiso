"use client";

import React from "react";
import styles from "./InvoiceModal.module.css";

export type OrderData = {
  id: string;
  recipient: string;
  date: string;
  address: string;
  products: string; // pour version avancée on pourrait faire un tableau
  status: string;
  paymentStatus: "Paid" | "Unpaid";
};

interface InvoiceModalProps {
  data: OrderData;
  onClose: () => void;
  onPrint: () => void;
  printRef: React.RefObject<HTMLDivElement | null>;
}

const InvoiceModal: React.FC<InvoiceModalProps> = ({ data, onClose, onPrint, printRef }) => {
  const TVA_RATE = 0.19;
  const totalHT = 120.0; // Remplacer par un calcul réel si nécessaire
  const tva = totalHT * TVA_RATE;
  const totalTTC = totalHT + tva;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} ref={printRef}>
        <header className={styles.header}>
          <img src="/img/logo2.jpg" alt="Logo Société" className={styles.logo} />
          <div className={styles.companyInfo}>
            <p>123 Avenue, Tunis</p>
            <p>Email: contact@societe.com</p>
            <p>TVA: XX-XXX-XXX</p>
          </div>
        </header>

        <section className={styles.clientInfo}>
          <h2>Facture</h2>
          <p><strong>Client :</strong> {data.recipient}</p>
          <p><strong>Adresse :</strong> {data.address}</p>
          <p><strong>Date :</strong> {data.date}</p>
          <p><strong>Produits :</strong> {data.products}</p>
        </section>

        <section className={styles.pricing}>
          <table className={styles.invoiceTable}>
            <thead>
              <tr>
                <th>Désignation</th>
                <th>Quantité</th>
                <th>Prix Unitaire</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{data.products}</td>
                <td>1</td>
                <td>{totalHT.toFixed(2)} TND</td>
                <td>{totalHT.toFixed(2)} TND</td>
              </tr>
              <tr>
                <td colSpan={3} className={styles.rightAlign}>Sous-total HT</td>
                <td>{totalHT.toFixed(2)} TND</td>
              </tr>
              <tr>
                <td colSpan={3} className={styles.rightAlign}>TVA ({(TVA_RATE * 100).toFixed(0)}%)</td>
                <td>{tva.toFixed(2)} TND</td>
              </tr>
              <tr className={styles.totalRow}>
                <td colSpan={3} className={styles.rightAlign}>Total TTC</td>
                <td>{totalTTC.toFixed(2)} TND</td>
              </tr>
            </tbody>
          </table>
        </section>

        <footer className={styles.actions}>
          <button onClick={onPrint} className={styles.printBtn}>Imprimer</button>
          <button onClick={onClose} className={styles.closeBtn}>Fermer</button>
        </footer>
      </div>
    </div>
  );
};

export default InvoiceModal;
