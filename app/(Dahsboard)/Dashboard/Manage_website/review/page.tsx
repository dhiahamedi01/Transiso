'use client';

import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor } from '@mui/material/Alert';
import style from '@/Components/Dahsboard/Tracking/Tracking.module.css';
import Link from 'next/link';
import Image from 'next/image';

type Review = {
  id: number;
  name: string;
  position: string;
  comment: string;
  rating: number;
  image: string;
  lang?: string;
};

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
          <button className={style.cancelBtn} onClick={onCancel}>
            Cancel
          </button>
          <button className={style.deleteBtn} onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function ManageReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLang, setSelectedLang] = useState<string>('all');
  const [showModal, setShowModal] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState<Review | null>(null);

  // Snackbar alert states
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<AlertColor>('success');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch('/api/reviews');
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        console.error('Error fetching reviews:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const filteredReviews = reviews.filter((review) =>
    [review.name, review.position, review.comment]
      .some((field) => field.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Filtrer selon la langue sélectionnée
  const displayedReviews = filteredReviews.filter(
    (review) => selectedLang === 'all' || review.lang === selectedLang
  );

  const openDeleteModal = (review: Review) => {
    setReviewToDelete(review);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!reviewToDelete) return;

    try {
      const res = await fetch(`/api/reviews/${reviewToDelete.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Échec de la suppression');
      }

      setReviews((prev) => prev.filter((r) => r.id !== reviewToDelete.id));
      setAlertMessage('Témoignage supprimé avec succès');
      setAlertSeverity('success');
      setAlertOpen(true);
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
      setAlertMessage('Erreur lors de la suppression');
      setAlertSeverity('error');
      setAlertOpen(true);
    } finally {
      setShowModal(false);
      setReviewToDelete(null);
    }
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <div className={style.card}>
      <h4 style={{ marginBottom: '2rem' }}>Manage Testimonials</h4>

      <div className={style.actionRow} style={{ alignItems: 'center', gap: '1rem' }}>
        <input
          type="text"
          placeholder="Search a review..."
          className={style.searchInputSmall}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Selecteur de langue */}
        <select
          id="lang-select"
          value={selectedLang}
          onChange={(e) => setSelectedLang(e.target.value)}
          style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #ccc' }}
          aria-label="Filter by language"
        >
          <option value="all">All</option>
          <option value="tr">Turkish (tr)</option>
          <option value="en">English (en)</option>
          <option value="ar">Arabic (ar)</option>
        </select>

        <Link href="/Dashboard/Manage_website/AddReview" className={style.addButtonSmall}>
          <AddIcon fontSize="small" /> New Testimonial
        </Link>
      </div>

      <div className={style.tableWrapper}>
        <table className={style.table}>
          <thead>
            <tr>
              <th className={style.tableHeader}>Image</th>
              <th className={style.tableHeader}>Name</th>
              <th className={style.tableHeader}>Position</th>
              <th className={style.tableHeader}>Comment</th>
              <th className={style.tableHeader}>Rating</th>
              <th className={style.tableHeader}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {displayedReviews.map((review) => (
              <tr key={review.id} className={style.tableRow}>
                <td className={style.tableData}>
                  <Image
                    src={review.image}
                    alt={review.name}
                    width={50}
                    height={50}
                    style={{ borderRadius: '50%', objectFit: 'cover' }}
                  />
                </td>
                <td className={style.tableData}>{review.name}</td>
                <td className={style.tableData}>{review.position}</td>
                <td className={style.tableData}>{review.comment}</td>
                <td className={style.tableData}>{'⭐'.repeat(review.rating)}</td>
                <td className={style.tableData}>
                  <div className={style.actionButtonsWrapper}>
                    <Link
                      href={`/Dashboard/Manage_website/review/${review.id}`}
                      className={style.viewButton}
                      title="Edit"
                    >
                      <EditDocumentIcon fontSize="small" />
                    </Link>

                    <button
                      className={style.deleteButton}
                      title="Delete"
                      onClick={() => openDeleteModal(review)}
                    >
                      <DeleteIcon fontSize="small" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {displayedReviews.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '1rem' }}>
                  No testimonials found for the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && reviewToDelete && (
        <ModalConfirm
          title="Confirm Deletion"
          message={`Delete the testimonial from "${reviewToDelete.name}"?`}
          onCancel={() => setShowModal(false)}
          onConfirm={confirmDelete}
        />
      )}

      {/* Snackbar Alert */}
      <Snackbar
        open={alertOpen}
        autoHideDuration={4000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <MuiAlert
          onClose={() => setAlertOpen(false)}
          severity={alertSeverity}
          elevation={6}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {alertMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default ManageReviews;
