"use client";

import React, { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import PrintIcon from '@mui/icons-material/Print';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import InvoiceModal from '@/Components/Dahsboard/Ecommerce/Order/InvoiceModal';
import { usePrintInvoice, InvoiceData } from '@/hooks/usePrintInvoice';
import style from '@/Components/Dahsboard/Ecommerce/Order/Order.module.css';

type OrderData = {
  id: string;
  recipient: string;
  date: string;
  address: string;
  products: string;
  status: string;
  paymentStatus: 'Paid' | 'Unpaid';
};

const orders: OrderData[] = [
  {
    id: '#ORD1001',
    recipient: 'Amine Chebbi',
    date: 'July 5, 2025',
    address: '123 Main Street, Tunis',
    products: 'Phone, Charger',
    status: 'Delivered',
    paymentStatus: 'Paid',
  },
  {
    id: '#ORD1003',
    recipient: 'Karim Haddad',
    date: 'July 3, 2025',
    address: 'Route de la Marsa, La Marsa',
    products: 'Books, Pen',
    status: 'Delayed',
    paymentStatus: 'Paid',
  },
  {
    id: '#ORD1004',
    recipient: 'Layla Nasser',
    date: 'July 2, 2025',
    address: 'Centre ville, Ariana',
    products: 'Shoes, T-shirt',
    status: 'Cancelled',
    paymentStatus: 'Unpaid',
  },
  {
    id: '#ORD1006',
    recipient: 'Rim Mansour',
    date: 'July 6, 2025',
    address: 'Rue El Khadra, Sousse',
    products: 'Camera, Tripod',
    status: 'In Transit',
    paymentStatus: 'Unpaid',
  },
];

function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [orderList, setOrderList] = useState<OrderData[]>(orders);
  const { invoiceData, openInvoice, closeInvoice, printInvoice, printRef } = usePrintInvoice();
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const filteredOrders = orderList.filter(order =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.products.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, orderId: string) => {
    setMenuAnchor(event.currentTarget);
    setSelectedOrderId(orderId);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedOrderId(null);
  };

  const handleChangePaymentStatus = (orderId: string, newStatus: 'Paid' | 'Unpaid') => {
    const updatedOrders = orderList.map(order =>
      order.id === orderId ? { ...order, paymentStatus: newStatus } : order
    );
    setOrderList(updatedOrders);
    handleMenuClose();
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Delivered':
        return style.statusDelivered;
      case 'In Transit':
        return style.statusInTransit;
      case 'Delayed':
        return style.statusDelayed;
      case 'Cancelled':
        return style.statusCancelled;
      default:
        return '';
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
            {filteredOrders.map(order => (
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
                  <div className={style.actionButtonsWrapper}>
                    <button className={style.viewButton} title="View details">
                      <VisibilityIcon fontSize="small" />
                    </button>
                    <button className={style.deleteButton} title="Delete">
                      <DeleteIcon fontSize="small" />
                    </button>
                    <button
                      className={style.printButton}
                      title="Print invoice"

                    >
                      <PrintIcon fontSize="small" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
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
    </div>
  );
}

export default OrdersPage;
