"use client";

import React, { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import PrintIcon from '@mui/icons-material/Print';
import AddIcon from '@mui/icons-material/Add';
import Image from 'next/image';
import InvoiceModal from './InvoiceModal';
import { usePrintInvoice, InvoiceData } from '@/hooks/usePrintInvoice';
import style from './Tracking.module.css';

const data: InvoiceData[] = [
  { id: '#ARX2001', recipient: 'Amine Chebbi', date: 'July 5, 2025', weight: '4.1 kg', status: 'Delivered', service: 'Overnight' },
  { id: '#ARX2002', recipient: 'Sonia Merhi', date: 'July 4, 2025', weight: '2.3 kg', status: 'In Transit', service: 'Express' },
  { id: '#ARX2003', recipient: 'Karim Haddad', date: 'July 3, 2025', weight: '1.0 kg', status: 'Delayed', service: 'Standard' },
  { id: '#ARX2004', recipient: 'Layla Nasser', date: 'July 2, 2025', weight: '3.7 kg', status: 'Cancelled', service: 'Express' },
  { id: '#ARX2005', recipient: 'Rami Saidi', date: 'July 1, 2025', weight: '0.9 kg', status: 'Delivered', service: 'Same Day' },
  { id: '#ARX2006', recipient: 'Mira Khalil', date: 'June 29, 2025', weight: '6.0 kg', status: 'In Transit', service: 'Standard' },
  { id: '#ARX2007', recipient: 'Youssef Fares', date: 'June 28, 2025', weight: '2.8 kg', status: 'Delivered', service: 'Overnight' },
  { id: '#ARX2008', recipient: 'Nadia Saleh', date: 'June 27, 2025', weight: '1.5 kg', status: 'Delayed', service: 'Express' },

];


function Transaction() {
  const [searchTerm, setSearchTerm] = useState('');
  const { invoiceData, openInvoice, closeInvoice, printInvoice, printRef } = usePrintInvoice();

  const filteredData = data.filter(parcel =>
    parcel.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    parcel.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    parcel.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Delivered': return style.statusDelivered;
      case 'In Transit': return style.statusInTransit;
      case 'Delayed': return style.statusDelayed;
      case 'Cancelled': return style.statusCancelled;
      default: return '';
    }
  };

  return (
    <div className={style.card}>
      <div className={style.logoContainer}>
        <Image src="/img/Aramex_logo.png" alt="Aramex Logo" width={190} height={30} priority />
      </div>

      <div className={style.actionRow}>
        <input
          type="text"
          placeholder="Rechercher un colis..."
          className={style.searchInputSmall}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className={style.addButtonSmall} title="Ajouter un colis">
          <AddIcon fontSize="small" />Order Supplie
        </button>
      </div>

      <div className={style.tableWrapper}>
        <table className={style.table}>
          <thead>
            <tr>
              <th className={style.tableHeader}>Colis ID</th>
              <th className={style.tableHeader}>Destinataire</th>
              <th className={style.tableHeader}>Date</th>
              <th className={style.tableHeader}>Poids</th>
              <th className={style.tableHeader}>Statut</th>
              <th className={style.tableHeader}>Service</th>
              <th className={style.tableHeader}>Voir</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map(parcel => (
              <tr key={parcel.id} className={style.tableRow}>
                <td className={style.tableData}>{parcel.id}</td>
                <td className={style.tableData}>{parcel.recipient}</td>
                <td className={style.tableData}>{parcel.date}</td>
                <td className={style.tableData}>{parcel.weight}</td>
                <td className={style.tableData}>
                  <span className={`${style.statusChip} ${getStatusClass(parcel.status)}`}>
                    {parcel.status}
                  </span>
                </td>
                <td className={style.tableData}>{parcel.service}</td>
                <td className={style.tableData}>
                  <div className={style.actionButtonsWrapper}>
                    <button className={style.viewButton} title="Voir les détails">
                      <VisibilityIcon fontSize="small" />
                    </button>
                    <button className={style.deleteButton} title="Supprimer">
                      <DeleteIcon fontSize="small" />
                    </button>
                    <button
                      className={style.printButton}
                      title="Imprimer"
                      onClick={() => openInvoice(parcel)}
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

      {/* Modal facture */}
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

export default Transaction;
