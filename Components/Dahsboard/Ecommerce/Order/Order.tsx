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
import InvoiceModal from "./InvoiceModal";
import { usePrintInvoice } from "@/hooks/usePrintInvoice";
import style from "./Order.module.css";

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

function formatDate(isoDate: string) {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const ORDER_STATUSES = [
  "Pending",
  "In Transit",
  "Delivered",
  "Delayed",
  "Cancelled",
];

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

  // Reset status when modal opens
  React.useEffect(() => {
    setStatus(currentStatus);
  }, [currentStatus]);

  const handleSave = () => {
    onSave(status);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Edit Order Status</DialogTitle>
      <DialogContent>
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel id="status-select-label">Status</InputLabel>
          <Select
            labelId="status-select-label"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            label="Status"
          >
            {ORDER_STATUSES.map((statusOption) => (
              <MenuItemMUI key={statusOption} value={statusOption}>
                {statusOption}
              </MenuItemMUI>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [orderList, setOrderList] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);
  const { invoiceData, openInvoice, closeInvoice, printInvoice, printRef } =
    usePrintInvoice();

  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

  // For edit modal
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<OrderData | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch("/api/Liste_order");
        const data = await response.json();
        if (data.success) {
          setOrderList(data.data);
        } else {
          console.error("API returned success:false");
        }
      } catch (error) {
        console.error("Failed to fetch orders", error);
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

  // Open Edit Modal
  const openEditModal = (order: OrderData) => {
    setEditingOrder(order);
    setEditModalOpen(true);
  };

  // Close Edit Modal
  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditingOrder(null);
  };

  // Save status from modal (update frontend & backend)
  const saveStatusUpdate = async (newStatus: string) => {
    if (!editingOrder) return;

    // Optimistic UI update
    setOrderList((prev) =>
      prev.map((order) =>
        order.id === editingOrder.id ? { ...order, status: newStatus } : order
      )
    );

    closeEditModal();

    try {
      const response = await fetch(`/api/update_order_status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingOrder.id, status: newStatus }),
      });
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || "Failed to update status");
      }
    } catch (error) {
      alert("Failed to update status in the database.");
      // Rollback UI change on failure
      setOrderList((prev) =>
        prev.map((order) =>
          order.id === editingOrder.id ? { ...order, status: editingOrder.status } : order
        )
      );
    }
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
              <th className={style.tableHeader}>Payment</th>
              <th className={style.tableHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
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
                  <ButtonGroup variant="contained" size="small" disableElevation>
                    <Button
                      style={{
                        backgroundColor:
                          order.payment.toLowerCase() === "paid"
                            ? "#4caf50"
                            : "#f44336",
                        color: "#fff",
                        fontWeight: "600",
                        minWidth: 70,
                        borderRight: "none",
                      }}
                    >
                      {order.payment}
                    </Button>
                    <Button
                      onClick={(e) => handleMenuOpen(e, order.id)}
                      style={{
                        backgroundColor:
                          order.payment.toLowerCase() === "paid"
                            ? "#4caf50"
                            : "#f44336",
                        color: "#fff",
                        borderLeft: "1px solid rgba(255,255,255,0.2)",
                      }}
                    >
                      <ArrowDropDownIcon />
                    </Button>
                  </ButtonGroup>
                  <Menu
                    anchorEl={menuAnchor}
                    open={selectedOrderId === order.id && Boolean(menuAnchor)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem
                      onClick={() => handleChangePaymentStatus(order.id, "paid")}
                      sx={{ display: "flex", justifyContent: "left" }}
                    >
                      Mark as Paid
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleChangePaymentStatus(order.id, "unpaid")}
                    >
                      Mark as Unpaid
                    </MenuItem>
                  </Menu>
                </td>
                <td className={style.tableData}>
                  <div className={style.actionButtonsWrapper}>
                    <button
                      className={style.viewButton}
                      title="View details"
                      onClick={() => openInvoice(order)}
                    >
                      <VisibilityIcon fontSize="small" />
                    </button>
                    <button
                      className={style.editButton}
                      title="Edit status"
                      onClick={() => openEditModal(order)}
                    >
                      <EditIcon fontSize="small" />
                    </button>
                    <button className={style.deleteButton} title="Delete">
                      <DeleteIcon fontSize="small" />
                    </button>
                    <button className={style.printButton} title="Print invoice">
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

      {invoiceData && (
        <InvoiceModal
          data={invoiceData}
          onClose={closeInvoice}
          onPrint={printInvoice}
          printRef={printRef}
        />
      )}

      {editingOrder && (
        <EditStatusModal
          open={editModalOpen}
          onClose={closeEditModal}
          currentStatus={editingOrder.status}
          onSave={saveStatusUpdate}
        />
      )}
    </div>
  );
}

export default OrdersPage;
