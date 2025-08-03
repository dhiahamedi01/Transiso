'use client';

import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EmailIcon from '@mui/icons-material/Email';
import style from '@/Components/Dahsboard/Tracking/Tracking.module.css';
import { Snackbar, Alert } from '@mui/material';

type Demande = {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  destination: string;
  shipping_type: string;
  description: string;
  weight: string;
  services: string;
};

export default function DemandesList() {
  const [demandes, setDemandes] = useState<Demande[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [toDeleteId, setToDeleteId] = useState<number | null>(null);

  const [showMailModal, setShowMailModal] = useState(false);
  const [emailTarget, setEmailTarget] = useState<{ email: string; name: string } | null>(null);
  const [mailSubject, setMailSubject] = useState('');
  const [mailMessage, setMailMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Snackbar
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    loadDemandes();
  }, []);

  async function loadDemandes() {
    setLoading(true);
    try {
      const res = await fetch('/api/demande');
      if (!res.ok) throw new Error('Erreur de récupération');
      const data = await res.json();
      setDemandes(data);
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: 'Error while fetching requests.', severity: 'error' });
    } finally {
      setLoading(false);
    }
  }

  function openDeleteModal(id: number) {
    setToDeleteId(id);
    setShowDeleteModal(true);
  }

  function closeDeleteModal() {
    setShowDeleteModal(false);
    setToDeleteId(null);
  }

  async function handleDelete() {
    if (toDeleteId === null) return;
    try {
      const res = await fetch(`/api/demande/${toDeleteId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Error during deletion');
      setDemandes(prev => prev.filter(d => d.id !== toDeleteId));
      setSnackbar({ open: true, message: 'Request deleted successfully.', severity: 'success' });
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: 'Error during deletion.', severity: 'error' });
    } finally {
      closeDeleteModal();
    }
  }

  function openMailModal(email: string, name: string) {
    setEmailTarget({ email, name });
    setShowMailModal(true);
    setMailSubject('');
    setMailMessage('');
    setError(null);
  }

  function closeMailModal() {
    setShowMailModal(false);
    setEmailTarget(null);
  }

  async function handleSendMail() {
    if (!emailTarget) return;
    setSending(true);
    setError(null);
    try {
      const res = await fetch('/api/send-mail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: emailTarget.email,
          subject: mailSubject,
          text: mailMessage,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Error sending email');
      }
      setSnackbar({ open: true, message: 'Email sent successfully!', severity: 'success' });
      closeMailModal();
    } catch (err: any) {
      setError(err.message);
      setSnackbar({ open: true, message: `Error: ${err.message}`, severity: 'error' });
    } finally {
      setSending(false);
    }
  }

  const filteredDemandes = demandes.filter(d =>
    d.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className={style.card}>
        <h2 className={style.header}>Request List</h2>
        <div className={style.actionRow}>
          <input
            type="text"
            placeholder="Search a request..."
            className={style.searchInputSmall}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className={style.tableWrapper}>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className={style.table}>
              <thead>
                <tr>
                  <th className={style.tableHeader}>Full Name</th>
                  <th className={style.tableHeader}>Email</th>
                  <th className={style.tableHeader}>Phone</th>
                  <th className={style.tableHeader}>Destination</th>
                  <th className={style.tableHeader}>Shipping Type</th>
                  <th className={style.tableHeader}>Weight</th>
                  <th className={style.tableHeader}>Services</th>
                  <th className={style.tableHeader}>Description</th>
                  <th className={style.tableHeader}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDemandes.length === 0 ? (
                  <tr>
                    <td colSpan={9} style={{ textAlign: 'center', padding: '20px' }}>
                      No requests found
                    </td>
                  </tr>
                ) : (
                  filteredDemandes.map(demande => (
                    <tr key={demande.id} className={style.tableRow}>
                      <td className={style.tableData}>{demande.full_name}</td>
                      <td className={style.tableData}>{demande.email}</td>
                      <td className={style.tableData}>{demande.phone}</td>
                      <td className={style.tableData}>{demande.destination}</td>
                      <td className={style.tableData}>{demande.shipping_type}</td>
                      <td className={style.tableData}>{demande.weight}</td>
                      <td className={style.tableData}>{demande.services || '-'}</td>
                      <td className={style.tableData}>{demande.description || '-'}</td>
                      <td className={style.tableData}>
                        <div className={style.actionButtonsWrapper}>
                          <button
                            className={style.deleteButton}
                            title="Delete"
                            onClick={() => openDeleteModal(demande.id)}
                          >
                            <DeleteIcon fontSize="small" />
                          </button>
                          <button
                            className={style.deleteButton}
                            title="Send email"
                            onClick={() => openMailModal(demande.email, demande.full_name)}
                          >
                            <EmailIcon fontSize="small" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className={style.modalOverlay}>
          <div className={style.modalCard}>
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this request?</p>
            <div className={style.modalActions}>
              <button className={style.cancelBtn} onClick={closeDeleteModal}>Cancel</button>
              <button className={style.deleteBtn} onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Mail Modal */}
      {showMailModal && (
        <div className={style.modalOverlaymail}>
          <div className={style.modalCardmail}>
            <h3>Send an email to {emailTarget?.name}</h3>
            <div className={style.formmail}>
              <input
                type="text"
                placeholder="Subject"
                className={style.inputmail}
                value={mailSubject}
                onChange={e => setMailSubject(e.target.value)}
              />
              <textarea
                placeholder="Message"
                value={mailMessage}
                rows={6}
                className={style.textareamail}
                onChange={e => setMailMessage(e.target.value)}
              />
            </div>
            <div className={style.modalActions}>
              <button className={style.cancelBtn} onClick={closeMailModal}>Cancel</button>
              <button className={style.deleteBtn} onClick={handleSendMail} disabled={sending}>
                {sending ? 'Sending...' : 'Send'}
              </button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>
        </div>
      )}

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
