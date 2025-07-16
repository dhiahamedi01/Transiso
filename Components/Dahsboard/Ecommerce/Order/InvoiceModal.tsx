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
  products: string; // Example format: "Product A x2 @50, Product B x1 @100"
  status: string;
  payment: string;
  paymentMethod: string;
  phone?: string | null;
  email?: string | null;
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

  // Parse products string like "Product A x2 @50, Product B x1 @100"
  const parseProducts = (productsStr: string): Product[] => {
    if (!productsStr) return [];
    return productsStr.split(",").map((item) => {
      const parts = item.trim().match(/^(.+?)\s*x(\d+)\s*@(\d+(\.\d+)?)$/);
      if (parts) {
        return {
          name: parts[1].trim(),
          quantity: Number(parts[2]),
          unitPrice: Number(parts[3]),
        };
      }
      return { name: item.trim(), quantity: 1, unitPrice: 0 };
    });
  };

  const products = parseProducts(order.products);

  const totalHT = products.reduce(
    (sum, p) => sum + p.quantity * p.unitPrice,
    0
  );
  const vatAmount = totalHT * VAT_RATE;
  const totalTTC = totalHT + vatAmount;

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
            {products.length === 0 && (
              <tr>
                <td colSpan={4} style={{ padding: 15, textAlign: "center" }}>
                  No products
                </td>
              </tr>
            )}
            {products.map((p, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={tableCellStyle}>{p.name}</td>
                <td style={tableCellStyle}>{p.quantity}</td>
                <td style={tableCellStyle}>{p.unitPrice.toFixed(2)}</td>
                <td style={tableCellStyle}>
                  {(p.quantity * p.unitPrice).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
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
            </tr>
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
