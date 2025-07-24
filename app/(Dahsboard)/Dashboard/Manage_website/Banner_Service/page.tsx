'use client';
import React, { useState, useEffect, useRef } from 'react';
import {
  Box, Button, Typography, Snackbar, Alert, Stack
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import styles from './Description.module.css';

const LANGUAGES = ['en', 'ar', 'tr'];

const SectionFormGlobalTop = () => {
  const [lang, setLang] = useState<'en' | 'ar' | 'tr'>('en');
  const [globalInput, setGlobalInput] = useState('');
  const [sections, setSections] = useState([
    { input: '', textarea: '', image: null as File | null, existingImage: '' },
    { input: '', textarea: '', image: null as File | null, existingImage: '' },
    { input: '', textarea: '', image: null as File | null, existingImage: '' },
  ]);

  const inputRefs = [
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
  ];

  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/api/Banner_service?lang=${lang}`);
      const data = res.data;

      setGlobalInput(data.titre_globale || '');
      setSections([
        {
          input: data.titre1,
          textarea: data.description1,
          image: null,
          existingImage: data.icon1,
        },
        {
          input: data.titre2,
          textarea: data.description2,
          image: null,
          existingImage: data.icon2,
        },
        {
          input: data.titre3,
          textarea: data.description3,
          image: null,
          existingImage: data.icon3,
        },
      ]);
    };
    fetchData();
  }, [lang]);

  const handleImageChange = (index: number, file: File | null) => {
    const updated = [...sections];
    updated[index].image = file;
    if (file) updated[index].existingImage = ''; // clear previous if new
    setSections(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('lang', lang);
      formData.append('titre_globale', globalInput);

      sections.forEach((section, i) => {
        formData.append(`titre${i + 1}`, section.input);
        formData.append(`description${i + 1}`, section.textarea);
        if (section.image) {
          formData.append(`icon${i + 1}`, section.image);
        } else {
          formData.append(`existing_icon${i + 1}`, section.existingImage);
        }
      });

      await axios.put('/api/Banner_service', formData);
      setAlertSeverity('success');
      setAlertMessage('Successfully updated!');
    } catch {
      setAlertSeverity('error');
      setAlertMessage('Error while saving.');
    } finally {
      setLoading(false);
      setAlertOpen(true);
    }
  };

  return (
    <Box className={styles.container}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" className={styles.title}>
          Service Banner Management
        </Typography>
        <Stack direction="row" spacing={1}>
          {LANGUAGES.map((lng) => (
            <Button
              key={lng}
              variant={lang === lng ? 'contained' : 'outlined'}
              onClick={() => setLang(lng as any)}
            >
              {lng.toUpperCase()}
            </Button>
          ))}
        </Stack>
      </Stack>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={globalInput}
          onChange={(e) => setGlobalInput(e.target.value)}
          className={styles.globalInput}
          placeholder="Global Title"
        />

        {sections.map((section, i) => (
          <div key={i} className={styles.section}>
            <input
              type="text"
              value={section.input}
              onChange={(e) => {
                const updated = [...sections];
                updated[i].input = e.target.value;
                setSections(updated);
              }}
              placeholder={`Title ${i + 1}`}
            />
            <textarea
              value={section.textarea}
              onChange={(e) => {
                const updated = [...sections];
                updated[i].textarea = e.target.value;
                setSections(updated);
              }}
              placeholder={`Description ${i + 1}`}
            />

            <Box
              className={styles.dropZone}
              onClick={() => inputRefs[i]?.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files?.[0];
                if (file) handleImageChange(i, file);
              }}
            >
              <CloudUploadIcon sx={{ fontSize: 40 }} />
              <p>{section.image ? section.image.name : 'Click or drag an image'}</p>
              <input
                type="file"
                hidden
                accept="image/*"
                ref={inputRefs[i]}
                onChange={(e) => handleImageChange(i, e.target.files?.[0] || null)}
              />
            </Box>

            {(section.image || section.existingImage) && (
              <div className={styles.previewImageWrapper}>
                <button
                  type="button"
                  className={styles.deleteBtn}
                  onClick={() => handleImageChange(i, null)}
                >
                  <CloseIcon fontSize="small" />
                </button>
                <img
                  src={
                    section.image
                      ? URL.createObjectURL(section.image)
                      : section.existingImage
                  }
                  alt={`Preview ${i + 1}`}
                  className={styles.previewImage}
                />
              </div>
            )}
          </div>
        ))}

        <div className={styles.actions}>
          <Button
            type="submit"
            variant="contained"
            startIcon={<SaveIcon />}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </form>

      <Snackbar
        open={alertOpen}
        autoHideDuration={4000}
        onClose={() => setAlertOpen(false)}
      >
        <Alert severity={alertSeverity} onClose={() => setAlertOpen(false)}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SectionFormGlobalTop;
