'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from '@/Components/Dahsboard/Blog/AddBlogForm/BasicInfoCard.module.css';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import axios from 'axios';

type Lang = 'en' | 'ar' | 'tr';

interface MultilingualData {
  title: string;
  description: string;
  content: string;
}

interface ServiceFormState {
  en: MultilingualData;
  ar: MultilingualData;
  tr: MultilingualData;
  icon: File | null;
}

const AddServiceForm = () => {
  const [language, setLanguage] = useState<Lang>('en');
  const [formData, setFormData] = useState<ServiceFormState>({
    en: { title: '', description: '', content: '' },
    ar: { title: '', description: '', content: '' },
    tr: { title: '', description: '', content: '' },
    icon: null,
  });

  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');
  const [alertMessage, setAlertMessage] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [language]: { ...prev[language], [name]: value },
    }));
  };

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFormData((prev) => ({ ...prev, icon: file }));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) setFormData((prev) => ({ ...prev, icon: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.icon || !formData.en.title.trim()) {
      setAlertSeverity('error');
      setAlertMessage('Icon and English title are required.');
      setAlertOpen(true);
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      (['en', 'ar', 'tr'] as Lang[]).forEach((lng) => {
        data.append(`title_${lng}`, formData[lng].title);
        data.append(`description_${lng}`, formData[lng].description);
        data.append(`content_${lng}`, formData[lng].content);
      });

      if (formData.icon) {
        data.append('icon', formData.icon);
      }

      const res = await axios.post('/api/services', data);

      if (res.status === 200) {
        setAlertSeverity('success');
        setAlertMessage('Service added in all languages!');
        setFormData({
          en: { title: '', description: '', content: '' },
          ar: { title: '', description: '', content: '' },
          tr: { title: '', description: '', content: '' },
          icon: null,
        });
      } else {
        setAlertSeverity('error');
        setAlertMessage('Failed to submit service.');
      }
    } catch (err) {
      console.error(err);
      setAlertSeverity('error');
      setAlertMessage('An error occurred while submitting the form.');
    } finally {
      setAlertOpen(true);
      setLoading(false);
    }
  };

  const handleAlertClose = () => setAlertOpen(false);

  useEffect(() => {
    return () => {
      if (formData.icon) URL.revokeObjectURL(formData.icon as any);
    };
  }, [formData.icon]);

  return (
    <div
      className={styles.container}
      style={{
        direction: language === 'ar' ? 'rtl' : 'ltr',
        textAlign: language === 'ar' ? 'right' : 'left',
        fontFamily: language === 'ar' ? 'Noto Kufi Arabic, sans-serif' : undefined,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginBottom: '1rem' }}>
        {(['en', 'ar', 'tr'] as Lang[]).map((lng) => (
          <button
            key={lng}
            type="button"
            onClick={() => setLanguage(lng)}
            style={{
              backgroundColor: language === lng ? '#0070f3' : '#e0e0e0',
              color: language === lng ? '#fff' : '#000',
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            {lng.toUpperCase()}
          </button>
        ))}
      </div>

      <h3 className={styles.title}>Add Service ({language.toUpperCase()})</h3>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="title"
          placeholder="Service title"
          value={formData[language].title}
          onChange={handleChange}
          className={`${styles.searchInputSmall} ${styles.span4}`}
          required={language === 'en'}
        />

        <textarea
          name="description"
          placeholder="Short description"
          value={formData[language].description}
          onChange={handleChange}
          className={styles.searchInputSmall}
          rows={3}
        />

        <textarea
          name="content"
          placeholder="Detailed content..."
          value={formData[language].content}
          onChange={handleChange}
          className={`${styles.searchInputSmall} ${styles.span4}`}
          rows={6}
        />

        <div
          className={styles.dropZone}
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <CloudUploadIcon className={styles.icon} />
          <p className={styles.text}>
            {formData.icon ? formData.icon.name : "Click or drag an icon"}
          </p>
          <p className={styles.subText}>Recommended size: 80 × 80 px</p>
          <input
            ref={inputRef}
            type="file"
            hidden
            accept="image/*"
            onChange={handleIconChange}
          />
        </div>

        {formData.icon && (
          <div className={styles.previewContainer}>
            <div className={styles.imageWrapper}>
              <button
                type="button"
                className={styles.deleteBtn}
                onClick={() => setFormData(prev => ({ ...prev, icon: null }))}
              >
                <CloseIcon fontSize="small" />
              </button>
              <img
                src={URL.createObjectURL(formData.icon)}
                alt="Icon preview"
                className={styles.image}
              />
            </div>
          </div>
        )}

        <div className={styles.actions}>
          <button type="submit" className={styles.primary} disabled={loading}>
            <SaveIcon fontSize="small" /> {loading ? 'Saving...' : 'Save All Languages'}
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

export default AddServiceForm;
