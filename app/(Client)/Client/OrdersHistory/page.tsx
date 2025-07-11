"use client";

import React, { useState, useRef } from "react";
import PrintIcon from "@mui/icons-material/Print";
import InvoiceModal, { OrderData } from "./InvoiceModal";
import style from "@/Components/Dahsboard/Ecommerce/Order/Order.module.css";

const orders: OrderData[] = [
  {
    id: "#ORD1001",
    recipient: "Amine Chebbi",
    date: "July 5, 2025",
    address: "123 Main Street, Tunis",
    products: "Phone, Charger",
    status: "Delivered",
    paymentStatus: "Paid",
  },
  {
    id: "#ORD1003",
    recipient: "Karim Haddad",
    date: "July 3, 2025",
    address: "Route de la Marsa, La Marsa",
    products: "Books, Pen",
    status: "Delayed",
    paymentStatus: "Paid",
  },
  {
    id: "#ORD1004",
    recipient: "Layla Nasser",
    date: "July 2, 2025",
    address: "Centre ville, Ariana",
    products: "Shoes, T-shirt",
    status: "Cancelled",
    paymentStatus: "Unpaid",
  },
  {
    id: "#ORD1006",
    recipient: "Rim Mansour",
    date: "July 6, 2025",
    address: "Rue El Khadra, Sousse",
    products: "Camera, Tripod",
    status: "In Transit",
    paymentStatus: "Unpaid",
  },
];

function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [orderList, setOrderList] = useState<OrderData[]>(orders);

  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);
  const printRef = useRef<HTMLDivElement | null>(null);

  const filteredOrders = orderList.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.products.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openInvoiceModal = (order: OrderData) => {
    setSelectedOrder(order);
  };

  const closeInvoiceModal = () => {
    setSelectedOrder(null);
  };

  const handlePrint = () => {
    if (printRef.current) {
      const printContents = printRef.current.innerHTML;
      const newWindow = window.open("", "", "width=600,height=600");
      if (newWindow) {
        newWindow.document.write("<html><head><title>Facture</title></head><body>");
        newWindow.document.write(printContents);
        newWindow.document.write("</body></html>");
        newWindow.document.close();
        newWindow.focus();
        newWindow.print();
        newWindow.close();
      }
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Delivered":
        return style.statusDelivered;
      case "In Transit":
        return style.statusInTransit;
      case "Delayed":
        return style.statusDelayed;
      case "Cancelled":
        return style.statusCancelled;
      default:
        return "";
    }
  };

  return (
    <div className={style.card}>
      <div className={style.actionRow}>
        <h3 className={style.titre}>Order list</h3>
        <input
          type="text"
          placeholder="Search order..."
          className={style.searchInputSmall}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className={style.tableWrapper}>
        <table className={style.table}>
          <thead>
            <tr>
              <th className={style.tableHeader}>Order ID</th>
              <th className={style.tableHeader}>Customer</th>
              <th className={style.tableHeader}>Date</th>
              <th className={style.tableHeader}>Address</th>
              <th className={style.tableHeader}>Products</th>
              <th className={style.tableHeader}>Status</th>
              <th className={style.tableHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className={style.tableRow}>
                <td className={style.tableData}>{order.id}</td>
                <td className={style.tableData}>{order.recipient}</td>
                <td className={style.tableData}>{order.date}</td>
                <td className={style.tableData}>{order.address}</td>
                <td className={style.tableData}>{order.products}</td>
                <td className={style.tableData}>
                  <span className={`${style.statusChip} ${getStatusClass(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className={style.tableData}>
                  <button
                    className={style.printButton}
                    title="Print invoice"
                    onClick={() => openInvoiceModal(order)}
                  >
                    <PrintIcon fontSize="small" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedOrder && (
  <InvoiceModal
    data={selectedOrder}
    onClose={closeInvoiceModal}
    onPrint={handlePrint}
    printRef={printRef}
  />
)}

    </div>
  );
}

export default OrdersPage;
