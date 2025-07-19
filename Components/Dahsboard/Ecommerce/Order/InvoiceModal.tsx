"use client";

import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

type OrderData = {
  orderId: string;
  customer: string;
  date: string;
  address: string;
  products: string; // Example: "Product A x2 @50, Product B x1 @100"
  status: string;
  payment: string;
  paymentMethod: string;
  phone?: string | null;
  email?: string | null;
  price?: string; // Ajouté pour récupérer prix total venant de l'API
};

interface InvoiceModalProps {
  open: boolean;
  onClose: () => void;
  order: OrderData | null;
}

type Product = {
  name: string;
  quantity: number;
  unitPrice: number;
};

const VAT_RATE = 0.20; // 20% VAT

export default function InvoiceModal({ open, onClose, order }: InvoiceModalProps) {
  if (!order) return null;

  const formattedDate = new Date(order.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Parse products string comme "Product A x2 @50, Product B x1 @100"
  const parseProducts = (productsStr: string): Product[] => {
    if (!productsStr) return [];
    return productsStr.split(",").map((item) => {
      // Le regex cherche un format "nom xquantité @prix"
      const parts = item.trim().match(/^(.+?)\s*x(\d+)\s*@(\d+(\.\d+)?)$/);
      if (parts) {
        return {
          name: parts[1].trim(),
          quantity: Number(parts[2]),
          unitPrice: Number(parts[3]),
        };
      }
      // Si pas de format détecté, on considère produit simple quantité 1, prix 0 (pas fiable)
      return { name: item.trim(), quantity: 1, unitPrice: 0 };
    });
  };

  const products = parseProducts(order.products);

  // Calcul total HT à partir des produits parsés
  const totalHTFromProducts = products.reduce(
    (sum, p) => sum + p.quantity * p.unitPrice,
    0
  );

  // On récupère le prix total depuis l'API, parseFloat + fallback 0
  const apiPrice = order.price ? parseFloat(order.price) : 0;

  // Utilisation prix total venant de l'API si > 0, sinon celui calculé
  const totalHT = apiPrice > 0 ? apiPrice : totalHTFromProducts;

  const vatAmount = totalHT * VAT_RATE;
  const totalTTC = totalHT;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle style={{ textAlign: "center", fontWeight: "bold" }}>
        Invoice #{order.orderId}
      </DialogTitle>
      <DialogContent dividers>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <img
            src="/img/logo2.jpg"
            alt="Transiso Logistic Logo"
            style={{ maxWidth: 150, marginBottom: 10 }}
          />
          <h2 style={{ margin: 0 }}>Transiso Logistic</h2>
          <p>Company Address Here</p>
          <p>Phone: 01 23 45 67 89 | Email: contact@transiso.com</p>
        </div>

        <hr style={{ margin: "20px 0" }} />

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ width: "48%" }}>
            <h3>Customer Information</h3>
            <p><strong>Name:</strong> {order.customer}</p>
            <p><strong>Address:</strong> {order.address}</p>
            {order.phone && <p><strong>Phone:</strong> {order.phone}</p>}
            {order.email && <p><strong>Email:</strong> {order.email}</p>}
          </div>

          <div style={{ width: "48%" }}>
            <h3>Order Details</h3>
            <p><strong>Date:</strong> {formattedDate}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Payment:</strong> {order.payment} ({order.paymentMethod})</p>
          </div>
        </div>

        <hr style={{ margin: "20px 0" }} />

        <h3>Products</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f0f0f0" }}>
              <th style={tableCellStyle}>Description</th>
              <th style={tableCellStyle}>Quantity</th>
              <th style={tableCellStyle}>Unit Price (€)</th>
              <th style={tableCellStyle}>Total excl. VAT (€)</th>
            </tr>
          </thead>
          <tbody>
            {/* Si on a des produits parsés avec prix, on les affiche */}
            {products.length > 0 && products.some(p => p.unitPrice > 0) ? (
              products.map((p, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={tableCellStyle}>{p.name}</td>
                  <td style={tableCellStyle}>{p.quantity}</td>
                  <td style={tableCellStyle}>{p.unitPrice.toFixed(2)}</td>
                  <td style={tableCellStyle}>
                    {(p.quantity * p.unitPrice).toFixed(2)}
                  </td>
                </tr>
              ))
            ) : (
              // Sinon on affiche simplement le produit avec quantité 1, prix = total
              <tr>
                <td colSpan={3} style={{ padding: 15, textAlign: "center" }}>
                  {order.products || "No detailed products"}
                </td>
                <td style={{ ...tableCellStyle, fontWeight: "bold" }}>
                  {totalHT.toFixed(2)} €
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
            {/*
            <tr>
              <td colSpan={3} style={{ ...tableCellStyle, fontWeight: "bold", textAlign: "right" }}>
                Total excl. VAT:
              </td>
              <td style={{ ...tableCellStyle, fontWeight: "bold" }}>
                {totalHT.toFixed(2)} €
              </td>
            </tr>
            <tr>
              <td colSpan={3} style={{ ...tableCellStyle, fontWeight: "bold", textAlign: "right" }}>
                VAT ({(VAT_RATE * 100).toFixed(0)}%):
              </td>
              <td style={{ ...tableCellStyle, fontWeight: "bold" }}>
                {vatAmount.toFixed(2)} €
              </td>
            </tr>*/}
            <tr>
              <td colSpan={3} style={{ ...tableCellStyle, fontWeight: "bold", textAlign: "right", fontSize: "1.2em" }}>
                Total incl. VAT:
              </td>
              <td style={{ ...tableCellStyle, fontWeight: "bold", fontSize: "1.2em" }}>
                {totalTTC.toFixed(2)} €
              </td>
            </tr>
          </tfoot>
        </table>

        <div style={{ marginTop: 30, fontSize: 12, color: "#666" }}>
          <p>
            Thank you for your business.<br />
            This invoice is generated automatically and valid without signature.
          </p>
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Close
        </Button>
        <Button onClick={handlePrint} variant="contained" color="primary">
          Print
        </Button>
      </DialogActions>

      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .MuiDialog-root, .MuiDialog-root * {
            visibility: visible;
          }
          .MuiDialog-root {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            max-width: none !important;
            height: auto !important;
            overflow: visible !important;
          }
          .MuiDialogContent-root {
            overflow: visible !important;
          }
        }
      `}</style>
    </Dialog>
  );
}

const tableCellStyle: React.CSSProperties = {
  border: "1px solid #ddd",
  padding: "8px 12px",
  textAlign: "left",
};
