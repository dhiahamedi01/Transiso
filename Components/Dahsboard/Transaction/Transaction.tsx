'use client';
import React from 'react';
import style from './Transaction.module.css';
import VisibilityIcon from '@mui/icons-material/Visibility';

type PaymentStatus = 'Paid' | 'Pending' | 'Failed';

interface Row {
  id: string;
  name: string;
  date: string;
  total: string;
  status: PaymentStatus;
  method: string;
}

const data: Row[] = [
  {
    id: '#SK2540',
    name: 'Zakaria Ben Salah',
    date: 'July 3, 2025',
    total: '$250',
    status: 'Paid',
    method: 'Credit Card',
  },
  {
    id: '#SK2541',
    name: 'Nour Youssef',
    date: 'July 2, 2025',
    total: '$180',
    status: 'Pending',
    method: 'PayPal',
  },
  {
    id: '#SK2542',
    name: 'Lina Amari',
    date: 'July 1, 2025',
    total: '$99',
    status: 'Failed',
    method: 'Debit Card',
  },
  {
    id: '#SK2343',
    name: 'Mohamed Khalil',
    date: 'June 30, 2025',
    total: '$430',
    status: 'Paid',
    method: 'Bank Transfer',
  },
  {
    id: '#SK2548',
    name: 'Nour Youssef',
    date: 'July 2, 2025',
    total: '$180',
    status: 'Pending',
    method: 'PayPal',
  },
  {
    id: '#SK2543',
    name: 'Lina Amari',
    date: 'July 1, 2025',
    total: '$99',
    status: 'Paid',
    method: 'Debit Card',
  },
  {
    id: '#SK5543',
    name: 'Mohamed Khalil',
    date: 'June 30, 2025',
    total: '$430',
    status: 'Paid',
    method: 'Bank Transfer',
  }
];

function Transaction() {
  return (
    <div className={style.card}>
      <div className={style.header}>Latest Transactions</div>

      <div className={style.tableWrapper}>
        <table className={style.table}>
          <thead>
            <tr>
              <th className={style.tableHeader}>Order ID</th>
              <th className={style.tableHeader}>Billing Name</th>
              <th className={style.tableHeader}>Date</th>
              <th className={style.tableHeader}>Total</th>
              <th className={style.tableHeader}>Payment Status</th>
              <th className={style.tableHeader}>Payment Method</th>
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
                  : style.statusPaid;

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
                    <button className={style.viewButton}>
                      <VisibilityIcon fontSize="small" />
                      Details
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Transaction;
