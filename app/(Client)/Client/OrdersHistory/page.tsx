"use client";

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import PrintIcon from "@mui/icons-material/Print";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CircularProgress from "@mui/material/CircularProgress"; // Pour le loading spinner MUI
import InvoiceModal, { OrderData } from "./InvoiceModal";
import style from "@/Components/Dahsboard/Ecommerce/Order/Order.module.css";

const OrdersHistoryPage: React.FC = () => {
  const [orderList, setOrderList] = useState<OrderData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const printRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const email = localStorage.getItem("userEmail");
        if (!email) {
          setOrderList([]);
          setLoading(false);
          return;
        }

        const res = await axios.get("/api/orders", { params: { email } });

        if (res.data.success) {
          setOrderList(res.data.data);
        } else {
          console.error("Failed to fetch orders:", res.data.error);
          setOrderList([]);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrderList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orderList.filter((order) =>
    searchTerm === ""
      ? true
      : [
          order.orderId,
          order.customer,
          order.status,
          order.address,
          order.products,
        ]
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
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
        newWindow.document.write(
          "<html><head><title>Invoice</title></head><body>"
        );
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

  if (loading) {
    return (
      <div className={style.loadingContainer} style={{ textAlign: "center", padding: "40px" }}>
        <CircularProgress />
        <p>Chargement des commandes...</p>
      </div>
    );
  }

  return (
    <div className={style.card}>
      <div className={style.actionRow}>
        <h3 className={style.titre}>Order History</h3>
        <input
          type="text"
          placeholder="Search order..."
          className={style.searchInputSmall}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredOrders.length === 0 ? (
        <div className={style.noOrdersMessage}>
          <ErrorOutlineIcon className={style.noOrdersIcon} />
          <p>Aucune commande trouvée.</p>
        </div>
      ) : (
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
                <tr key={order.orderId} className={style.tableRow}>
                  <td className={style.tableData}>{order.orderId}</td>
                  <td className={style.tableData}>{order.customer}</td>
                  <td className={style.tableData}>{order.date}</td>
                  <td className={style.tableData}>{order.address}</td>
                  <td className={style.tableData}>{order.products}</td>
                  <td className={style.tableData}>
                    <span
                      className={`${style.statusChip} ${getStatusClass(
                        order.status
                      )}`}
                    >
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
      )}

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
};

export default OrdersHistoryPage;
