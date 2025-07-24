'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from '@/Components/Dahsboard/Blog/AddBlogForm/BasicInfoCard.module.css';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { Snackbar, Alert, CircularProgress, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';

const EditBannerForm = () => {
  const [lang, setLang] = useState<'en' | 'tr' | 'ar'>('en');

  const [title1, setTitle1] = useState('');
  const [title2, setTitle2] = useState('');
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [image1, setImage1] = useState<File | null>(null);
  const [image2, setImage2] = useState<File | null>(null);
  const [image1Url, setImage1Url] = useState('');
  const [image2Url, setImage2Url] = useState('');
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');

  const inputRef1 = useRef<HTMLInputElement | null>(null);
  const inputRef2 = useRef<HTMLInputElement | null>(null);

  const fetchData = async () => {
    setPageLoading(true);
    try {
      const res = await fetch(`/api/Manage_website/Banner?lang=${lang}`);
      const data = await res.json();
      setTitle1(data.titre1 || '');
      setTitle2(data.titre2 || '');
      setText1(data.description1 || '');
      setText2(data.description2 || '');
      setImage1Url(data.image1 || '');
      setImage2Url(data.image2 || '');
    } catch (err) {
      setAlertMessage('Error loading banner data.');
      setAlertSeverity('error');
      setAlertOpen(true);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [lang]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (index === 1) {
      setImage1(file);
      setImage1Url('');
    } else {
      setImage2(file);
      setImage2Url('');
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    if (index === 1) {
      setImage1(file);
      setImage1Url('');
    } else {
      setImage2(file);
      setImage2Url('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('titre1', title1);
      formData.append('titre2', title2);
      formData.append('description1', text1);
      formData.append('description2', text2);
      formData.append('lang', lang);
      if (image1) formData.append('image1', image1);
      if (image2) formData.append('image2', image2);

      const res = await fetch('/api/Manage_website/Banner', {
        method: 'PUT',
        body: formData,
      });

      if (res.ok) {
        setAlertMessage('✅ Banner updated successfully!');
        setAlertSeverity('success');
      } else {
        setAlertMessage('❌ Update failed.');
        setAlertSeverity('error');
      }
    } catch (error) {
      setAlertMessage('Network error. Please try again.');
      setAlertSeverity('error');
    } finally {
      setLoading(false);
      setAlertOpen(true);
    }
  };

  if (pageLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="60vh" width="100%" flexDirection="column">
        <CircularProgress size={48} />
        <p style={{ marginTop: '10px', color: '#666' }}>Loading banner data...</p>
      </Box>
    );
  }

  return (
    <div className={styles.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 className={styles.title}>Edit Banner</h3>
        <div style={{ display: 'flex', gap: '10px' }}>
          {['ar', 'en', 'tr'].map((l) => (
            <button
              key={l}
              onClick={() => setLang(l as 'ar' | 'en' | 'tr')}
              className={`${styles.langButton} ${lang === l ? styles.active : ''}`}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                backgroundColor: lang === l ? '#1976d2' : '#eee',
                color: lang === l ? '#fff' : '#000',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <form className={styles.form} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', gap: '20px' }}>
          <input type="text" value={title1} onChange={(e) => setTitle1(e.target.value)} placeholder="Main Title" className={styles.searchInputSmall} />
          <input type="text" value={title2} onChange={(e) => setTitle2(e.target.value)} placeholder="Subtitle" className={styles.searchInputSmall} />
        </div>

        <div style={{ display: 'flex', gap: '20px' }}>
          <textarea value={text1} onChange={(e) => setText1(e.target.value)} placeholder="Line 1 text" className={styles.searchInputSmall} rows={4} />
          <textarea value={text2} onChange={(e) => setText2(e.target.value)} placeholder="Line 2 text" className={styles.searchInputSmall} rows={4} />
        </div>

        <div style={{ display: 'flex', gap: '20px' }}>
          {[1, 2].map((index) => {
            const image = index === 1 ? image1 : image2;
            const inputRef = index === 1 ? inputRef1 : inputRef2;
            const imageUrl = index === 1 ? image1Url : image2Url;

            return (
              <div
                key={index}
                className={styles.dropZone}
                onClick={() => inputRef.current?.click()}
                onDrop={(e) => handleDrop(e, index)}
                onDragOver={(e) => e.preventDefault()}
              >
                <CloudUploadIcon className={styles.icon} />
                <p className={styles.text}>{image ? image.name : `Upload Image ${index}`}</p>
                <p className={styles.subText}>Recommended size: 1200×400 px</p>
                <input type="file" ref={inputRef} hidden accept="image/*" onChange={(e) => handleImageChange(e, index)} />

                {(image || imageUrl) && (
                  <div className={styles.previewContainer}>
                    <div className={styles.imageWrapper}>
                      <button
                        type="button"
                        className={styles.deleteBtn}
                        onClick={() => {
                          index === 1 ? (setImage1(null), setImage1Url('')) : (setImage2(null), setImage2Url(''));
                        }}
                      >
                        <CloseIcon fontSize="small" />
                      </button>
                      <img
                        src={image ? URL.createObjectURL(image) : imageUrl}
                        alt="Preview"
                        className={styles.image}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <LoadingButton
          type="submit"
          className={styles.primary}
          loading={loading}
          loadingPosition="start"
          startIcon={<SaveIcon fontSize="small" />}
          variant="contained"
        >
          Save Changes
        </LoadingButton>
      </form>

      <Snackbar
        open={alertOpen}
        autoHideDuration={4000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={alertSeverity} onClose={() => setAlertOpen(false)} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default EditBannerForm;
