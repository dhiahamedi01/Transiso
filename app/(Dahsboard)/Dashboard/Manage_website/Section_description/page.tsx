'use client';

import React, { useState } from 'react';
import styles from '@/Components/Dahsboard/Blog/AddBlogForm/BasicInfoCard.module.css';
import SaveIcon from '@mui/icons-material/Save';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const DescriptionForm = () => {
  const [field1, setField1] = useState('');
  const [field2, setField2] = useState('');
  const [textarea, setTextarea] = useState('');
  const [field3, setField3] = useState('');
  const [field4, setField4] = useState('');
  const [field5, setField5] = useState('');
  const [field6, setField6] = useState('');

  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');
  const [alertMessage, setAlertMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simuler une requête API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setAlertSeverity('success');
      setAlertMessage('Description saved successfully!');
      setAlertOpen(true);

      setField1('');
      setField2('');
      setTextarea('');
      setField3('');
      setField4('');
      setField5('');
      setField6('');
    } catch (err) {
      setAlertSeverity('error');
      setAlertMessage('Error saving description.');
      setAlertOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleAlertClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setAlertOpen(false);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Description Section</h3>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Ligne 1 */}
        <input
          type="text"
          placeholder="Field 1"
          value={field1}
          onChange={(e) => setField1(e.target.value)}
          className={styles.searchInputSmall}
          required
        />
        <input
          type="text"
          placeholder="Field 2"
          value={field2}
          onChange={(e) => setField2(e.target.value)}
          className={styles.searchInputSmall}
          required
        />

        {/* Ligne 2 */}
        <textarea
          placeholder="Description..."
          value={textarea}
          onChange={(e) => setTextarea(e.target.value)}
          className={`${styles.searchInputSmall} ${styles.span4}`}
          rows={6}
          required
        />

        {/* Ligne 3 */}
        <input
          type="text"
          placeholder="Field 3"
          value={field3}
          onChange={(e) => setField3(e.target.value)}
          className={styles.searchInputSmall}
          required
        />
        <input
          type="text"
          placeholder="Field 4"
          value={field4}
          onChange={(e) => setField4(e.target.value)}
          className={styles.searchInputSmall}
          required
        />

        {/* Ligne 4 */}
        <input
          type="text"
          placeholder="Field 5"
          value={field5}
          onChange={(e) => setField5(e.target.value)}
          className={styles.searchInputSmall}
          required
        />
        <input
          type="text"
          placeholder="Field 6"
          value={field6}
          onChange={(e) => setField6(e.target.value)}
          className={styles.searchInputSmall}
          required
        />

        <div className={styles.actions}>
          <button type="submit" className={styles.primary} disabled={loading}>
            <SaveIcon fontSize="small" />
            {loading ? 'Saving...' : 'Save Description'}
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
