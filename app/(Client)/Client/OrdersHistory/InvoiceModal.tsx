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
  weight?: string;
  service?: string;
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
            <Image src="/img/logo2.jpg" alt="Company Logo" width={180} height={60} />
          </div>&ensp;&ensp;
          <div className={style.companyInfo}>
            <p><strong>Address:</strong> Istanbul, Turkey</p>
            <p><strong>Email:</strong> info@transisologistic.com</p>
            <p><strong>Phone:</strong> (+90) 537 767 1027</p>
          </div>
        </header>

        {/* INVOICE TITLE */}
        <h2 className={style.invoiceTitle}>SHIPPING INVOICE</h2>

        {/* RECIPIENT DETAILS */}
        <section className={style.section}>
          <h3>Recipient Details</h3>
          <div className={style.detailsGrid}>
            <div><strong>Name:</strong> {data.customer}</div>
            <div><strong>Package ID:</strong> {data.orderId}</div>
            <div><strong>Date:</strong> {data.date}</div>
            <div><strong>Address:</strong> {data.address}</div>
            <div><strong>Products:</strong> {data.products}</div>
            <div><strong>Status:</strong> {data.status}</div>
            <div><strong>Payment Status:</strong> {data.paymentStatus}</div>
            <div><strong>Weight:</strong> {data.weight ?? "-"}</div>
            <div><strong>Service:</strong> {data.service ?? "-"}</div>
          </div>
        </section>

        {/* SUMMARY TABLE */}
        <section className={style.section}>
          <h3>Shipment Summary</h3>
          <table className={style.invoiceTable}>
            <thead>
              <tr>
                <th>Package ID</th>
                <th>Customer</th>
                <th>Weight</th>
                <th>Status</th>
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
          <button onClick={onPrint} className={style.printBtn}>Print</button>
          <button onClick={onClose} className={style.closeBtn}>Close</button>
        </footer>

        <p className={style.legal}>© 2025 Transiso Logistic. All rights reserved.</p>
      </div>
    </div>
  );
}
