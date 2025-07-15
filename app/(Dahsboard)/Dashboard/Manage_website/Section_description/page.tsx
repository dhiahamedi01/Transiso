'use client';

import React, { useState, useEffect } from 'react';
import styles from '@/Components/Dahsboard/Blog/AddBlogForm/BasicInfoCard.module.css';
import SaveIcon from '@mui/icons-material/Save';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const DescriptionForm = () => {
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/Manage_website/description');
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error('Error loading description:', err);
        setAlertSeverity('error');
        setAlertMessage("Erreur lors du chargement des données.");
        setAlertOpen(true);
      } finally {
        setLoadingInitial(false);
      }
    };
    fetchData();
  }, []);

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
        body: JSON.stringify(data),
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

  if (loadingInitial) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Edit Description Section</h3>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Row 1 */}
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

        {/* Row 2 */}
        <textarea
          name="description"
          placeholder="Description..."
          value={data.description}
          onChange={handleChange}
          className={`${styles.searchInputSmall} ${styles.span4}`}
          rows={6}
          required
        />

        {/* Row 3 */}
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

        {/* Row 4 */}
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
