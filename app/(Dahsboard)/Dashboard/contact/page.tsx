'use client';

import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import style from '@/Components/Dahsboard/Tracking/Tracking.module.css';

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
  const [showModal, setShowModal] = useState(false);
  const [toDeleteId, setToDeleteId] = useState<number | null>(null);

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
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function openModal(id: number) {
    setToDeleteId(id);
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setToDeleteId(null);
  }

  async function handleDelete() {
    if (toDeleteId === null) return;
    try {
      const res = await fetch(`/api/contact/${toDeleteId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Erreur lors de la suppression');
      setContacts(prev => prev.filter(c => c.id !== toDeleteId));
    } catch (error) {
      alert('Erreur lors de la suppression.');
      console.error(error);
    } finally {
      closeModal();
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
                {filteredContacts.length === 0 && (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: '20px' }}>
                      Aucun contact trouvé
                    </td>
                  </tr>
                )}
                {filteredContacts.map(contact => (
                  <tr key={contact.id} className={style.tableRow}>
                    <td className={style.tableData}>{contact.name}</td>
                    <td className={style.tableData}>{contact.email}</td>
                    <td className={style.tableData}>{contact.phone || '-'}</td>
                    <td className={style.tableData}>{contact.subject || '-'}</td>
                    <td className={style.tableData}>{contact.message}</td>
                    <td className={style.tableData}>
                      <button
                        className={style.deleteButton}
                        title="Supprimer"
                        onClick={() => openModal(contact.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal de confirmation */}
      {showModal && (
        <div className={style.modalOverlay}>
          <div className={style.modalCard}>
            <h3>Confirmer la suppression</h3>
            <p>Êtes-vous sûr de vouloir supprimer ce contact ?</p>
            <div className={style.modalActions}>
              <button className={style.cancelBtn} onClick={closeModal}>
                Annuler
              </button>
              <button className={style.deleteBtn} onClick={handleDelete}>
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
