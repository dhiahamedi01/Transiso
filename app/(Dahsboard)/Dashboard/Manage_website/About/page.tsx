'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '@/Components/Dahsboard/Blog/AddBlogForm/BasicInfoCard.module.css';
import SaveIcon from '@mui/icons-material/Save';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const ManageAboutForm = () => {
  const [data, setData] = useState({
    title: '',
    subtitle: '',
    about_text: '',
    service1: '',
    service2: '',
    service3: '',
    service4: '',
    service5: '',
  });

  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/Manage_website/About');
        const about = res.data;
        setData({
          title: about.titre || '',
          subtitle: about.sous_titre || '',
          about_text: about.description || '',
          service1: about.service1 || '',
          service2: about.service2 || '',
          service3: about.service || '',
          service4: about.titre_track || '',
          service5: about.description_track || '',
        });
      } catch (error) {
        console.error('Loading error:', error);
        setAlertSeverity('error');
        setAlertMessage('Failed to load data.');
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
      // Map keys back to DB expected keys
      await axios.put('/api/Manage_website/About', {
        titre: data.title,
        sous_titre: data.subtitle,
        about_text: data.about_text,
        service1: data.service1,
        service2: data.service2,
        service3: data.service3,
        service4: data.service4,
        service5: data.service5,
      });
      setAlertSeverity('success');
      setAlertMessage('About section updated successfully!');
    } catch (error) {
      console.error('Update error:', error);
      setAlertSeverity('error');
      setAlertMessage('Failed to update About section.');
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
      <h3 className={styles.title}>Edit About Section</h3>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Line 1: 2 inputs */}
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={data.title}
          onChange={handleChange}
          className={styles.searchInputSmall}
          required
        />
        <input
          type="text"
          name="subtitle"
          placeholder="Subtitle"
          value={data.subtitle}
          onChange={handleChange}
          className={styles.searchInputSmall}
          required
        />

        {/* Line 2: Textarea */}
        <textarea
          name="about_text"
          placeholder="About text..."
          value={data.about_text}
          onChange={handleChange}
          className={`${styles.searchInputSmall} ${styles.span4}`}
          rows={3}
          required
        />

        {/* Line 3: 3 inputs */}
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

        {/* Line 4: 2 inputs */}
        <input
          type="text"
          name="service4"
          placeholder="Service 4"
          value={data.service4}
          onChange={handleChange}
          className={styles.searchInputSmall}
          required
        />
        <input
          type="text"
          name="service5"
          placeholder="Service 5"
          value={data.service5}
          onChange={handleChange}
          className={styles.searchInputSmall}
          required
        />

        {/* Submit button */}
        <div className={styles.actions}>
          <button type="submit" className={styles.primary} disabled={loading}>
            <SaveIcon fontSize="small" />
            {loading ? 'Updating...' : 'Update'}
          </button>
        </div>
      </form>

      {/* Alert Snackbar */}
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

export default ManageAboutForm;
