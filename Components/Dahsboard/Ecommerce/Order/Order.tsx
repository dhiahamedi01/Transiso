"use client";

import React, { useState, useEffect } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import PrintIcon from "@mui/icons-material/Print";
import EditIcon from "@mui/icons-material/Edit";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Select from "@mui/material/Select";
import MenuItemMUI from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Pagination from "@mui/material/Pagination";

import style from "./Order.module.css";
import InvoiceModal from "./InvoiceModal"; // <-- Import du modal facture

type OrderData = {
  id: number;
  orderId: string;
  customer: string;
  date: string; // ISO date string
  address: string;
  country: string;
  products: string;
  status: string;
  payment: string;
  paymentMethod: string;
  createdAt: string;
  phone?: string | null;
  email?: string | null;
};

const ORDER_STATUSES = [
  "Pending",
  "In Transit",
  "Delivered",
  "Delayed",
  "Cancelled",
];

function formatDate(isoDate: string) {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function EditStatusModal({
  open,
  onClose,
  currentStatus,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  currentStatus: string;
  onSave: (newStatus: string) => void;
}) {
  const [status, setStatus] = useState(currentStatus);

  useEffect(() => {
    setStatus(currentStatus);
  }, [currentStatus]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Edit Order Status</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="normal" variant="outlined">
          <InputLabel id="status-select-label">Status</InputLabel>
          <Select
            labelId="status-select-label"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            label="Status"
          >
            {ORDER_STATUSES.map((opt) => (
              <MenuItemMUI key={opt} value={opt}>
                {opt}
              </MenuItemMUI>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button className={style.btn_modal} onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={() => onSave(status)}
          variant="contained"
          color="primary"
          disabled={status === currentStatus}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [orderList, setOrderList] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);

  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

  // Edit status modal
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<OrderData | null>(null);

  // Invoice modal state
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const [invoiceOrder, setInvoiceOrder] = useState<OrderData | null>(null);

  // Snackbar alert state
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<
    "success" | "error" | "info" | "warning"
  >("success");

  // Pagination
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch("/api/Liste_order");
        const data = await response.json();
        if (data.success) {
          setOrderList(data.data);
        } else {
          console.error("API returned success:false");
          setAlertMessage("Failed to load orders.");
          setAlertSeverity("error");
          setAlertOpen(true);
        }
      } catch (error) {
        console.error("Failed to fetch orders", error);
        setAlertMessage("Failed to fetch orders.");
        setAlertSeverity("error");
        setAlertOpen(true);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  const filteredOrders = orderList.filter((order) =>
    [order.orderId, order.customer, order.status, order.address, order.products]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Pagination slice:
  const paginatedOrders = filteredOrders.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    orderId: number
  ) => {
    setMenuAnchor(event.currentTarget);
    setSelectedOrderId(orderId);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedOrderId(null);
  };

  const handleChangePaymentStatus = (orderId: number, newStatus: string) => {
    const updatedOrders = orderList.map((order) =>
      order.id === orderId ? { ...order, payment: newStatus } : order
    );
    setOrderList(updatedOrders);
    handleMenuClose();

    setAlertMessage(`Payment status changed to "${newStatus}"`);
    setAlertSeverity("success");
    setAlertOpen(true);
  };

  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return style.statusDelivered;
      case "in transit":
        return style.statusInTransit;
      case "delayed":
        return style.statusDelayed;
      case "cancelled":
      case "canceled":
        return style.statusCancelled;
      case "pending":
        return style.statusPending;
      case "unpaid":
        return style.statusUnpaid;
      case "paid":
        return style.statusPaid;
      default:
        return "";
    }
  };

  const openEditModal = (order: OrderData) => {
    setEditingOrder(order);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditingOrder(null);
  };

  const saveStatusUpdate = async (newStatus: string) => {
    if (!editingOrder) return;

    const prevStatus = editingOrder.status;

    // Optimistic UI update
    setOrderList((prev) =>
      prev.map((order) =>
        order.id === editingOrder.id ? { ...order, status: newStatus } : order
      )
    );

    closeEditModal();

    try {
      const response = await fetch(`/api/Liste_order/${editingOrder.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || "Failed to update status");
      }
      setAlertMessage("Order status updated successfully.");
      setAlertSeverity("success");
      setAlertOpen(true);
    } catch (error) {
      setAlertMessage("Error updating status.");
      setAlertSeverity("error");
      setAlertOpen(true);
      // Rollback on error
      setOrderList((prev) =>
        prev.map((order) =>
          order.id === editingOrder.id ? { ...order, status: prevStatus } : order
        )
      );
    }
  };

  // Nouvelle fonction pour ouvrir la facture
  const openInvoiceModal = (order: OrderData) => {
    setInvoiceOrder(order);
    setInvoiceModalOpen(true);
  };

  const closeInvoiceModal = () => {
    setInvoiceModalOpen(false);
    setInvoiceOrder(null);
  };

  const handleAlertClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };

  if (loading) {
    return <div className={style.card}>Loading orders...</div>;
  }

  return (
    <div className={style.card}>
      <div className={style.actionRow}>
        <h3 className={style.title}>Order List</h3>
        <input
          type="text"
          placeholder="Search orders..."
          className={style.searchInputSmall}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1); // reset to first page on search
          }}
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
            {paginatedOrders.map((order) => (
              <tr key={order.id} className={style.tableRow}>
                <td className={style.tableData}>{order.orderId}</td>
                <td className={style.tableData}>{order.customer}</td>
                <td className={style.tableData}>{formatDate(order.date)}</td>
                <td className={style.tableData}>{order.address}</td>
                <td className={style.tableData}>{order.products}</td>
                <td className={style.tableData}>
                  <span
                    className={`${style.statusChip} ${getStatusClass(order.status)}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className={style.tableData}>
                  <div className={style.actionButtonsWrapper}>
                    <button
                      className={style.viewButton}
                      title="Edit Status"
                      onClick={() => openEditModal(order)}
                    >
                      <EditIcon fontSize="small" />
                    </button>

                    <button
                      className={style.printButton}
                      title="Print Invoice"
                      onClick={() => openInvoiceModal(order)}
                    >
                      <PrintIcon fontSize="small" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan={8} style={{ textAlign: "center", padding: "20px" }}>
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div
        style={{
          marginTop: "1rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Pagination
          count={Math.ceil(filteredOrders.length / rowsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
          shape="rounded"
        />
      </div>

      {editingOrder && (
        <EditStatusModal
          open={editModalOpen}
          onClose={closeEditModal}
          currentStatus={editingOrder.status}
          onSave={saveStatusUpdate}
        />
      )}

      {invoiceOrder && (
        <InvoiceModal
          open={invoiceModalOpen}
          onClose={closeInvoiceModal}
          order={invoiceOrder}
        />
      )}

      <Snackbar
        open={alertOpen}
        autoHideDuration={4000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleAlertClose}
          severity={alertSeverity}
          sx={{ width: "100%" }}
          variant="filled"
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
