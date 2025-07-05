import { useState, useRef, useEffect } from 'react';

export interface InvoiceData {
  id: string;
  recipient: string;
  date: string;
  weight: string;
  status: string;
  service: string;
}

export function usePrintInvoice() {
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const printRef = useRef<HTMLDivElement>(null);

  const openInvoice = (data: InvoiceData) => setInvoiceData(data);

  // Fonction pour imprimer la facture (uniquement la div printRef)
  const printInvoice = () => {
    if (!printRef.current) return;

    const printContent = printRef.current.innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();  // recharge pour restaurer React
  };

  const closeInvoice = () => setInvoiceData(null);

  return {
    invoiceData,
    openInvoice,
    closeInvoice,
    printInvoice,
    printRef,
  };
}
