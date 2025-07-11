'use client';

import { useEffect, useState } from 'react';
import styles from '../Employe/Liste_employe/ListeEmp.module.css';
import DeleteIcon from '@mui/icons-material/Delete';
import EmailIcon from '@mui/icons-material/Email';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import useSendMail from '@/hooks/useSendMail';

interface Demande {
  id: number;
  service: string;
  shippingFrom: string;
  shippingTo: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  weight: string;
  volume: string;
  cargoDetails: string;
  notes: string;
  filePath: string | null;
  createdAt: string;
}

export default function DemandesTable() {
  const [demandes, setDemandes] = useState<Demande[]>([]);
  const [filteredDemandes, setFilteredDemandes] = useState<Demande[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [targetId, setTargetId] = useState<number | null>(null);

  const [showMailModal, setShowMailModal] = useState(false);
  const [emailTarget, setEmailTarget] = useState<{ email: string; name: string } | null>(null);
  const [mailSubject, setMailSubject] = useState('');
  const [mailMessage, setMailMessage] = useState('');
  const { sendMail, sending, error } = useSendMail();

  useEffect(() => {
    fetch('/api/demande_liste')
      .then((res) => res.json())
      .then((data) => {
        setDemandes(data);
        setFilteredDemandes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erreur lors du fetch:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const formattedDate = selectedDate.format('YYYY-MM-DD');
      const filtered = demandes.filter((d) => d.date.startsWith(formattedDate));
      setFilteredDemandes(filtered);
    } else {
      setFilteredDemandes(demandes);
    }
  }, [selectedDate, demandes]);

  const openModal = (id: number) => {
    setTargetId(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setTargetId(null);
  };

  const confirmDelete = async () => {
    if (targetId === null) return;

    try {
      const res = await fetch('/api/demande_liste', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: targetId }),
      });

      if (res.ok) {
        setDemandes((prev) => prev.filter((d) => d.id !== targetId));
      } else {
        console.error('Échec de la suppression');
      }
    } catch (error) {
      console.error('Erreur réseau lors de la suppression :', error);
    } finally {
      closeModal();
    }
  };

  const openMailModal = (email: string, name: string) => {
    setEmailTarget({ email, name });
    setMailSubject('');
    setMailMessage('');
    setShowMailModal(true);
  };

  const closeMailModal = () => {
    setShowMailModal(false);
    setEmailTarget(null);
  };

  const handleSendMail = async () => {
    if (!emailTarget) return;
    try {
      await sendMail({
        to: emailTarget.email,
        subject: mailSubject,
        text: mailMessage,
      });
      closeMailModal();
    } catch (err) {
      // L’erreur est déjà gérée dans le hook
    }
  };

  return (
    <>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Filtrer par date"
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
            slotProps={{
              textField: {
                variant: 'outlined',
                size: 'small',
                style: { backgroundColor: '#fff', borderRadius: 8 },
              },
            }}
          />
        </LocalizationProvider>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="300px">
          <CircularProgress />
        </Box>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.tableHeader}>Nom</th>
                <th className={styles.tableHeader}>Email</th>
                <th className={styles.tableHeader}>Téléphone</th>
                <th className={styles.tableHeader}>Origine</th>
                <th className={styles.tableHeader}>Destination</th>
                <th className={styles.tableHeader}>Service</th>
                <th className={styles.tableHeader}>Poids</th>
                <th className={styles.tableHeader}>Volume</th>
                <th className={styles.tableHeader}>Date</th>
                <th className={styles.tableHeader}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDemandes.length === 0 ? (
                <tr>
                  <td colSpan={10} className={styles.noData}>
                    Aucune demande trouvée.
                  </td>
                </tr>
              ) : (
                filteredDemandes.map((demande) => (
                  <tr key={demande.id} className={styles.tableRow}>
                    <td className={styles.tableData}>{demande.name}</td>
                    <td className={styles.tableData}>{demande.email}</td>
                    <td className={styles.tableData}>{demande.phone || '-'}</td>
                    <td className={styles.tableData}>{demande.shippingFrom}</td>
                    <td className={styles.tableData}>{demande.shippingTo}</td>
                    <td className={styles.tableData}>{demande.service}</td>
                    <td className={styles.tableData}>{demande.weight}</td>
                    <td className={styles.tableData}>{demande.volume}</td>
                    <td className={styles.tableData}>{demande.date.split('T')[0]}</td>
                    <td className={styles.tableData}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          className={styles.actionButton}
                          onClick={() => openModal(demande.id)}
                          title="Supprimer"
                        >
                          <DeleteIcon />
                        </button>
                        <button
                          className={styles.actionButton}
                          onClick={() => openMailModal(demande.email, demande.name)}
                          title="Envoyer un mail"
                        >
                          <EmailIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <h3>Confirmer la suppression</h3>
            <p>Supprimer cette demande ?</p>
            <div className={styles.modalActions}>
              <button className={styles.cancelBtn} onClick={closeModal}>
                Annuler
              </button>
              <button className={styles.deleteBtn} onClick={confirmDelete}>
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {showMailModal && (
        <div className={styles.modalOverlaymail}>
          <div className={styles.modalCardmail}>
            <h3>Envoyer un email à {emailTarget?.name}</h3>
            <div className={styles.formmail}>
              <input
                type="text"
                placeholder="subject"
                className={styles.inputmail}
                value={mailSubject}
                onChange={(e) => setMailSubject(e.target.value)}
              />
              <textarea
                placeholder="Message"
                value={mailMessage}
                rows={6}
                className={styles.textareamail}
                onChange={(e) => setMailMessage(e.target.value)}
              />
            </div>
            <div className={styles.modalActions}>
              <button className={styles.cancelBtn} onClick={closeMailModal}>
                Cancel
              </button>
              <button className={styles.deleteBtn} onClick={handleSendMail} disabled={sending}>
                {sending ? 'Sending...' : 'Send'}
              </button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>
        </div>
      )}
    </>
  );
}
