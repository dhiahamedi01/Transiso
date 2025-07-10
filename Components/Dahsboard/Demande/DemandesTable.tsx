'use client';

import { useEffect, useState } from 'react';
import styles from '../Employe/Liste_employe/ListeEmp.module.css';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

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
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [targetId, setTargetId] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/demande_liste')
      .then((res) => res.json())
      .then((data) => {
        setDemandes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erreur lors du fetch:', err);
        setLoading(false);
      });
  }, []);

  const openModal = (id: number) => {
    setTargetId(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setTargetId(null);
  };

  const confirmDelete = () => {
    // À implémenter plus tard si besoin
    closeModal();
  };

  return (
    <>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="300px"
        >
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
              {demandes.length === 0 ? (
                <tr>
                  <td colSpan={10} className={styles.noData}>
                    Aucune demande trouvée.
                  </td>
                </tr>
              ) : (
                demandes.map((demande) => (
                  <tr key={demande.id} className={styles.tableRow}>
                    <td className={styles.tableData}>{demande.name}</td>
                    <td className={styles.tableData}>{demande.email}</td>
                    <td className={styles.tableData}>{demande.phone || '-'}</td>
                    <td className={styles.tableData}>{demande.shippingFrom}</td>
                    <td className={styles.tableData}>{demande.shippingTo}</td>
                    <td className={styles.tableData}>{demande.service}</td>
                    <td className={styles.tableData}>{demande.weight}</td>
                    <td className={styles.tableData}>{demande.volume}</td>
                    <td className={styles.tableData}>
                      {demande.date.split('T')[0]}
                    </td>
                    <td className={styles.tableData}>
                      <button
                        className={styles.actionButton}
                        onClick={() => openModal(demande.id)}
                        title="Supprimer"
                      >
                        <DeleteIcon />
                      </button>
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
    </>
  );
}
