'use client';

import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EmailIcon from '@mui/icons-material/Email';
import style from '@/Components/Dahsboard/Tracking/Tracking.module.css';
import useSendMail from '@/hooks/useSendMail';
import { Snackbar, Alert } from '@mui/material';

type Contact = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
};

export default function ContactList() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showMailModal, setShowMailModal] = useState(false);
  const [toDeleteId, setToDeleteId] = useState<number | null>(null);
  const [emailTarget, setEmailTarget] = useState<{ email: string; name: string } | null>(null);
  const [mailSubject, setMailSubject] = useState('');
  const [mailMessage, setMailMessage] = useState('');
  const { sendMail, sending, error } = useSendMail();

  // State pour Snackbar MUI
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    loadContacts();
  }, []);

  async function loadContacts() {
    setLoading(true);
    try {
      const res = await fetch('/api/contact');
      if (!res.ok) throw new Error('Erreur de récupération');
      const data = await res.json();
      setContacts(data);
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: 'Erreur lors de la récupération des contacts.', severity: 'error' });
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
      const res = await fetch(`/api/contact/${toDeleteId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Erreur lors de la suppression');
      setContacts(prev => prev.filter(c => c.id !== toDeleteId));
      setSnackbar({ open: true, message: 'Contact supprimé avec succès.', severity: 'success' });
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: 'Erreur lors de la suppression.', severity: 'error' });
    } finally {
      closeDeleteModal();
    }
  }

  function openMailModal(email: string, name: string) {
    setEmailTarget({ email, name });
    setShowMailModal(true);
    setMailSubject('');
    setMailMessage('');
  }

  function closeMailModal() {
    setShowMailModal(false);
    setEmailTarget(null);
  }

  async function handleSendMail() {
    if (!emailTarget) return;
    try {
      await sendMail({
        to: emailTarget.email,
        subject: mailSubject,
        text: mailMessage,
      });
      setSnackbar({ open: true, message: 'Email envoyé avec succès !', severity: 'success' });
      closeMailModal();
    } catch (err) {
      setSnackbar({ open: true, message: 'Erreur lors de l’envoi du mail : ' + (err as Error).message, severity: 'error' });
    }
  }

  const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
  );

  return (
    <>
      <div className={style.card}>
        <h2 className={style.header}>Liste des contacts</h2>
        <div className={style.actionRow}>
          <input
            type="text"
            placeholder="Rechercher un contact..."
            className={style.searchInputSmall}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className={style.tableWrapper}>
          {loading ? (
            <p>Chargement...</p>
          ) : (
            <table className={style.table}>
              <thead>
                <tr>
                  <th className={style.tableHeader}>Nom</th>
                  <th className={style.tableHeader}>Email</th>
                  <th className={style.tableHeader}>Téléphone</th>
                  <th className={style.tableHeader}>Sujet</th>
                  <th className={style.tableHeader}>Message</th>
                  <th className={style.tableHeader}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: '20px' }}>
                      Aucun contact trouvé
                    </td>
                  </tr>
                ) : (
                  filteredContacts.map(contact => (
                    <tr key={contact.id} className={style.tableRow}>
                      <td className={style.tableData}>{contact.name}</td>
                      <td className={style.tableData}>{contact.email}</td>
                      <td className={style.tableData}>{contact.phone || '-'}</td>
                      <td className={style.tableData}>{contact.subject || '-'}</td>
                      <td className={style.tableData}>{contact.message}</td>
                      <td className={style.tableData}>
                        <div className={style.actionButtonsWrapper}>
                          <button
                            className={style.deleteButton}
                            title="Supprimer"
                            onClick={() => openDeleteModal(contact.id)}
                          >
                            <DeleteIcon fontSize="small" />
                          </button>
                          <button
                            className={style.deleteButton}
                            title="Envoyer un mail"
                            onClick={() => openMailModal(contact.email, contact.name)}
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

      {showDeleteModal && (
        <div className={style.modalOverlay}>
          <div className={style.modalCard}>
            <h3>Confirmer la suppression</h3>
            <p>Êtes-vous sûr de vouloir supprimer ce contact ?</p>
            <div className={style.modalActions}>
              <button className={style.cancelBtn} onClick={closeDeleteModal}>Annuler</button>
              <button className={style.deleteBtn} onClick={handleDelete}>Supprimer</button>
            </div>
          </div>
        </div>
      )}

      {showMailModal && (
        <div className={style.modalOverlaymail}>
          <div className={style.modalCardmail}>
            <h3>Envoyer un email à {emailTarget?.name}</h3>
            <div  className={style.formmail}>
              <input
                type="text"
                placeholder="subject"
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
                {sending ? 'Sending...' : 'send'}
              </button>
            </div>
            {error && <p style={{color: 'red'}}>{error}</p>}
          </div>
        </div>
      )}

      {/* Snackbar pour afficher les alertes */}
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
