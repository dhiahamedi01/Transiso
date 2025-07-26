'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import AddIcon from '@mui/icons-material/Add';
import {
  Backdrop,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import style from '@/Components/Dahsboard/Tracking/Tracking.module.css';

interface ServiceItem {
  id: number; // PK unique
  service_id: string; // shared across languages
  title: string;
  description: string;
  icon_path: string;
  lang: string;
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

function ServiceManager() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [language, setLanguage] = useState<'tr' | 'en' | 'ar'>('tr');
  const [showModal, setShowModal] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<ServiceItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    fetchServices(language);
  }, [language]);

  const fetchServices = async (lang: 'tr' | 'en' | 'ar') => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/services?lang=${lang}`);
      setServices(response.data.services);
    } catch (err) {
      console.error('Error fetching services:', err);
      setAlert({ type: 'error', message: 'Failed to load services' });
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (service: ServiceItem) => {
    setServiceToDelete(service);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!serviceToDelete) return;
    setLoading(true);
    try {
      await axios.delete(`/api/services/${serviceToDelete.id}`);
      setServices(prev => prev.filter(s => s.id !== serviceToDelete.id));
      setAlert({ type: 'success', message: 'Service deleted successfully' });
    } catch (error) {
      console.error('Failed to delete service:', error);
      setAlert({ type: 'error', message: 'Failed to delete service. Please try again.' });
    } finally {
      setLoading(false);
      setShowModal(false);
      setServiceToDelete(null);
    }
  };

  return (
    <div className={style.card}>
      <h4 style={{ marginBottom: '2rem' }}>Service List</h4>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="language-select" style={{ marginRight: 8 }}>Filter by language:</label>
        <select
          id="language-select"
          value={language}
          onChange={e => setLanguage(e.target.value as 'tr' | 'en' | 'ar')}
          style={{ padding: '4px 8px', borderRadius: 4, border: '1px solid #ccc' }}
        >
          <option value="tr">Turkish (tr)</option>
          <option value="en">English (en)</option>
          <option value="ar">Arabic (ar)</option>
        </select>
      </div>

      <div className={style.actionRow}>
        <input
          type="text"
          placeholder="Search a service..."
          className={style.searchInputSmall}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Link href="/Dashboard/Manage_website/Add_service" className={style.addButtonSmall}>
          <AddIcon fontSize="small" /> New Service
        </Link>
      </div>

      <div className={style.tableWrapper}>
        <table className={style.table}>
          <thead>
            <tr>
              <th className={style.tableHeader}>Icon</th>
              <th className={style.tableHeader}>Title</th>
              <th className={style.tableHeader}>Description</th>
              <th className={style.tableHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services
              .filter(service =>
                service.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map(service => (
                <tr key={service.id} className={style.tableRow}>
                  <td className={style.tableData}>
                    <Image
                      src={service.icon_path}
                      alt={service.title}
                      width={40}
                      height={40}
                      style={{ borderRadius: '6px' }}
                    />
                  </td>
                  <td className={style.tableData}>{service.title}</td>
                  <td className={style.tableData}>{service.description}</td>
                  <td className={style.tableData}>
                    <div className={style.actionButtonsWrapper}>
                      <Link
                        href={`/Dashboard/Manage_website/Manage_service/${service.id}`}
                        className={style.viewButton}
                        title="Edit"
                      >
                        <EditDocumentIcon fontSize="small" />
                      </Link>
                      <button
                        className={style.deleteButton}
                        title="Delete"
                        onClick={() => openDeleteModal(service)}
                      >
                        <DeleteIcon fontSize="small" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {showModal && serviceToDelete && (
        <ModalConfirm
          title="Confirm Deletion"
          message={`Are you sure you want to delete the service "${serviceToDelete.title}"?`}
          onCancel={() => setShowModal(false)}
          onConfirm={confirmDelete}
        />
      )}

      <Backdrop open={loading} style={{ zIndex: 9999, color: '#fff' }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
      open={!!alert}
      autoHideDuration={4000}
      onClose={() => setAlert(null)}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      {alert !== null ? (
        <Alert
          onClose={() => setAlert(null)}
          severity={alert.type}
          sx={{ width: '100%' }}
        >
          {alert.message}
        </Alert>
      ) : undefined}
    </Snackbar>


    </div>
  );
}

export default ServiceManager;
