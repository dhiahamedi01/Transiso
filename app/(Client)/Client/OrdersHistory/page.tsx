'use client';

import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import PrintIcon from '@mui/icons-material/Print';
import InvoiceModal, { OrderData } from '@/Components/Dahsboard/Ecommerce/Order/InvoiceModal';
import style from '@/Components/Dahsboard/Ecommerce/Order/Order.module.css';

const OrdersHistoryPage: React.FC = () => {
  const [orderList, setOrderList] = useState<OrderData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);
  const printRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const email = localStorage.getItem('userEmail');
        if (!email) return;

        const res = await axios.get('/api/orders', { params: { email } });

        if (res.data.success) {
          setOrderList(res.data.data);
        } else {
          console.error('Failed to fetch orders:', res.data.error);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orderList.filter((order) =>
    searchTerm === '' ? true : (
      order.orderId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.products?.toLowerCase().includes(searchTerm.toLowerCase())
    )
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
      const newWindow = window.open('', '', 'width=600,height=600');
      if (newWindow) {
        newWindow.document.write('<html><head><title>Invoice</title></head><body>');
        newWindow.document.write(printContents);
        newWindow.document.write('</body></html>');
        newWindow.document.close();
        newWindow.focus();
        newWindow.print();
        newWindow.close();
      }
    }
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
        <h3 className={style.titre}>Order History</h3>
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
              <tr key={order.orderId} className={style.tableRow}>
                <td className={style.tableData}>{order.orderId}</td>
                <td className={style.tableData}>{order.customer}</td>
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
};

export default OrdersHistoryPage;
