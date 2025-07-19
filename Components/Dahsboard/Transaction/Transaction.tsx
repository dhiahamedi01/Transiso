'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import style from './Transaction.module.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Link from 'next/link'
type PaymentStatus = 'Paid' | 'Pending' | 'Failed' | 'Unpaid';

interface Row {
  id: string;
  name: string;
  date: string;
  total: string;
  status: PaymentStatus;
  method: string;
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function mapStatus(status: string): PaymentStatus {
  const s = status.toLowerCase();
  if (s === 'paid') return 'Paid';
  if (s === 'pending') return 'Pending';
  if (s === 'failed') return 'Failed';
  if (s === 'unpaid') return 'Unpaid';
  return 'Pending';
}

const Transaction = () => {
  const [data, setData] = useState<Row[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await axios.get('/api/Liste_order');
        if (response.data.success && Array.isArray(response.data.data)) {
          // Trier par date décroissante
          const sorted = response.data.data
            .sort(
              (a: any, b: any) =>
                new Date(b.date).getTime() - new Date(a.date).getTime()
            )
            .slice(0, 7);

          // Mapper dans le format attendu par le tableau
          const mappedData: Row[] = sorted.map((item: any) => ({
            id: item.orderId,
            name: item.customer,
            date: formatDate(item.date),
            total: `$${parseFloat(item.price).toFixed(2)}`,
            status: mapStatus(item.status),
            method: item.paymentMethod,
          }));

          setData(mappedData);
        } else {
          setError('Données invalides reçues de l’API');
        }
      } catch (err) {
        setError('Erreur lors du chargement des données');
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  if (loading) return <div className={style.card}>Chargement...</div>;
  if (error) return <div className={style.card}>Erreur: {error}</div>;

  return (
    <div className={style.card}>
      <div className={style.header}>Latest Transactions</div>

      <div className={style.tableWrapper}>
        <table className={style.table}>
          <thead>
            <tr>
              <th className={style.tableHeader}>Order ID</th>
              <th className={style.tableHeader}>Billing Name</th>
              <th className={style.tableHeader}>Date</th>
              <th className={style.tableHeader}>Total</th>
              <th className={style.tableHeader}>Payment Status</th>
              <th className={style.tableHeader}>Payment Method</th>
              <th className={style.tableHeader}>View</th>
            </tr>
          </thead>

          <tbody>
            {data.map((row) => {
              const statusClass =
                row.status === 'Paid'
                  ? style.statusPaid
                  : row.status === 'Pending'
                  ? style.statusPending
                  : row.status === 'Failed'
                  ? style.statusFailed
                  : row.status === 'Unpaid'
                  ? style.statusPending
                  : style.statusPending;

              return (
                <tr key={row.id} className={style.tableRow}>
                  <td className={style.tableData}>{row.id}</td>
                  <td className={style.tableData}>{row.name}</td>
                  <td className={style.tableData}>{row.date}</td>
                  <td className={style.tableData}>{row.total}</td>
                  <td className={style.tableData}>
                    <span className={`${style.statusChip} ${statusClass}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className={style.tableData}>{row.method}</td>
                  <td className={style.tableData}>
                  <Link href='/Dashboard/Ecommerce/Orders'>
                    <button className={style.viewButton}>
                      <VisibilityIcon fontSize="small" />
                      Details
                    </button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transaction;
