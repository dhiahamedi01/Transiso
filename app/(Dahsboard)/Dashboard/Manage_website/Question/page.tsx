'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import style from '@/Components/Dahsboard/Tracking/Tracking.module.css';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  TablePagination,
  TableSortLabel,
} from '@mui/material';

interface FaqItem {
  id: number;       // Identifiant unique par langue
  faq_id: number;   // Identifiant global FAQ partagé par langues
  lang: string;
  question: string;
  answer: string;
}

async function fetchFaqs(): Promise<FaqItem[]> {
  const res = await fetch('/api/faq', { cache: 'no-store' });
  if (!res.ok) throw new Error('Error loading FAQs');
  return await res.json();
}

async function deleteFaq(faqId: number) {
  const res = await fetch(`/api/faq/${faqId}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error during deletion');
}

function ModalConfirm({
  title,
  message,
  onCancel,
  onConfirm,
}: {
  title: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className={style.modalOverlay}>
      <div className={style.modalCard}>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className={style.modalActions}>
          <button className={style.cancelBtn} onClick={onCancel}>Cancel</button>
          <button className={style.deleteBtn} onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}

type Order = 'asc' | 'desc';

function FaqList() {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLang, setSelectedLang] = useState<string>('en');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [faqToDelete, setFaqToDelete] = useState<FaqItem | null>(null);

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Sorting
  const [order, setOrder] = useState<Order>('asc');

  useEffect(() => {
    const loadFaqs = async () => {
      try {
        const data = await fetchFaqs();
        setFaqs(data);
      } catch {
        setError('Unable to load FAQs');
      } finally {
        setLoading(false);
      }
    };
    loadFaqs();
  }, []);

  // Filtrer par langue et recherche
  let filteredFaqs = faqs
    .filter(faq => faq.lang === selectedLang)
    .filter(faq =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Trier par faq_id
  filteredFaqs = filteredFaqs.sort((a, b) => {
    if (order === 'asc') {
      return a.faq_id - b.faq_id;
    } else {
      return b.faq_id - a.faq_id;
    }
  });

  // Pagination
  const paginatedFaqs = filteredFaqs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const openDeleteModal = (faq: FaqItem) => {
    setFaqToDelete(faq);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!faqToDelete) return;

    try {
      await deleteFaq(faqToDelete.faq_id);  // <-- Utiliser faq_id ici
      setFaqs(prev => prev.filter(f => f.faq_id !== faqToDelete.faq_id)); // <-- Filtrer par faq_id
      setShowModal(false);
      setFaqToDelete(null);
    } catch {
      alert('Error during deletion');
    }
  };

  // Gestion du changement de page
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Gestion du changement de nb de lignes par page
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Gestion du tri sur FAQ ID
  const handleRequestSort = () => {
    setOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={style.card}>
      <h4 style={{ marginBottom: '2rem' }}>FAQs List</h4>

      <div className={style.actionRow}>
        <input
          type="text"
          placeholder="Search by question..."
          className={style.searchInputSmall}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Lang</InputLabel>
          <Select
            value={selectedLang}
            label="Lang"
            onChange={(e: SelectChangeEvent<string>) => setSelectedLang(e.target.value)}
          >
            <MenuItem value="en">EN</MenuItem>
            <MenuItem value="ar">AR</MenuItem>
            <MenuItem value="tr">TR</MenuItem>
          </Select>
        </FormControl>

        <Link href="/Dashboard/Manage_website/Question/Add_question" className={style.addButtonSmall}>
          <AddIcon fontSize="small" /> New FAQ
        </Link>
      </div>

      <div className={style.tableWrapper}>
        <table className={style.table}>
          <thead>
            <tr>
              <th className={style.tableHeader} style={{ cursor: 'pointer' }} onClick={handleRequestSort}>
                <TableSortLabel
                  active={true}
                  direction={order}
                >
                  FAQ ID
                </TableSortLabel>
              </th>
              <th className={style.tableHeader}>Question</th>
              <th className={style.tableHeader}>Answer</th>
              <th className={style.tableHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedFaqs.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center', padding: '1rem' }}>
                  No FAQs found for selected language/search.
                </td>
              </tr>
            ) : (
              paginatedFaqs.map(faq => (
                <tr key={faq.id} className={style.tableRow}>
                  <td className={style.tableData}>{faq.faq_id}</td>
                  <td className={style.tableData}>{faq.question}</td>
                  <td className={style.tableData}>{faq.answer}</td>
                  <td className={style.tableData}>
                    <div className={style.actionButtonsWrapper}>
                      <Link
                        href={`/Dashboard/Manage_website/Question/${faq.faq_id}`}
                        className={style.viewButton}
                        title="Edit"
                      >
                        <EditDocumentIcon fontSize="small" />
                      </Link>
                      <button
                        className={style.deleteButton}
                        title="Delete"
                        onClick={() => openDeleteModal(faq)}
                      >
                        <DeleteIcon fontSize="small" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <TablePagination
        component="div"
        count={filteredFaqs.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        labelRowsPerPage="Lignes par page"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} sur ${count}`}
      />

      {showModal && faqToDelete && (
        <ModalConfirm
          title="Confirm Deletion"
          message={`Are you sure you want to delete this FAQ?`}
          onCancel={() => setShowModal(false)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}

export default FaqList;
