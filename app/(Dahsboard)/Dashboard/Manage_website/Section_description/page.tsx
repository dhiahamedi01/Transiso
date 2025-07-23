'use client';

import React, { useState, useEffect } from 'react';
import styles from '@/Components/Dahsboard/Blog/AddBlogForm/BasicInfoCard.module.css';
import SaveIcon from '@mui/icons-material/Save';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const DescriptionForm = () => {
  const [lang, setLang] = useState<'ar' | 'en' | 'tr'>('en');
  const [data, setData] = useState({
    titre: '',
    sous_titre: '',
    description: '',
    service1: '',
    service2: '',
    service3: '',
    service4: '',
  });

  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');
  const [alertMessage, setAlertMessage] = useState('');

  const fetchData = async () => {
    setLoadingInitial(true);
    try {
      const res = await fetch(`/api/Manage_website/description?lang=${lang}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error('Erreur chargement description:', err);
      setAlertSeverity('error');
      setAlertMessage("Erreur lors du chargement des données.");
      setAlertOpen(true);
    } finally {
      setLoadingInitial(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [lang]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/Manage_website/description', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, lang }),
      });

      if (!res.ok) throw new Error('Update failed');

      setAlertSeverity('success');
      setAlertMessage('Description mise à jour avec succès !');
    } catch (err) {
      setAlertSeverity('error');
      setAlertMessage('Échec de la mise à jour de la description.');
    } finally {
      setAlertOpen(true);
      setLoading(false);
    }
  };

  const handleAlertClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setAlertOpen(false);
  };

  return (
    <div className={styles.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 className={styles.title}>Edit Description Section</h3>
        <div>
        <button
            onClick={() => setLang('ar')}
            className={`${styles.langButton} ${lang === 'ar' ? styles.active : ''}`}
          >
            AR
          </button>
          <button
            onClick={() => setLang('en')}
            className={`${styles.langButton} ${lang === 'en' ? styles.active : ''}`}
          >
            EN
          </button>
          <button
            onClick={() => setLang('tr')}
            className={`${styles.langButton} ${lang === 'tr' ? styles.active : ''}`}
          >
            TR
          </button>


        </div>
      </div>

      {loadingInitial ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
          <CircularProgress />
        </Box>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="titre"
            placeholder="Title"
            value={data.titre}
            onChange={handleChange}
            className={styles.searchInputSmall}
            required
          />
          <input
            type="text"
            name="sous_titre"
            placeholder="Subtitle"
            value={data.sous_titre}
            onChange={handleChange}
            className={styles.searchInputSmall}
            required
          />

          <textarea
            name="description"
            placeholder="Description..."
            value={data.description}
            onChange={handleChange}
            className={`${styles.searchInputSmall} ${styles.span4}`}
            rows={6}
            required
          />

          <input
            type="text"
            name="service1"
            placeholder="Service 1"
            value={data.service1}
            onChange={handleChange}
            className={styles.searchInputSmall}
            required
          />
          <input
            type="text"
            name="service2"
            placeholder="Service 2"
            value={data.service2}
            onChange={handleChange}
            className={styles.searchInputSmall}
            required
          />
          <input
            type="text"
            name="service3"
            placeholder="Service 3"
            value={data.service3}
            onChange={handleChange}
            className={styles.searchInputSmall}
            required
          />
          <input
            type="text"
            name="service4"
            placeholder="Service 4"
            value={data.service4}
            onChange={handleChange}
            className={styles.searchInputSmall}
            required
          />

          <div className={styles.actions}>
            <button type="submit" className={styles.primary} disabled={loading}>
              <SaveIcon fontSize="small" />
              {loading ? 'Updating...' : 'Update'}
            </button>
          </div>
        </form>
      )}

      <Snackbar
        open={alertOpen}
        autoHideDuration={4000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleAlertClose} severity={alertSeverity} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default DescriptionForm;
