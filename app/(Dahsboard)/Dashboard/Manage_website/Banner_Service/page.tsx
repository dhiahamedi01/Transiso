'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Alert, Snackbar, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import styles from './Description.module.css'; // Ton propre design CSS

const SectionFormGlobalTop = () => {
  const [globalInput, setGlobalInput] = useState('');
  const [sections, setSections] = useState([
    { input: '', textarea: '', image: null as File | null, existingImage: '' },
    { input: '', textarea: '', image: null as File | null, existingImage: '' },
    { input: '', textarea: '', image: null as File | null, existingImage: '' },
  ]);

// Références fichiers
const inputRefs = [
  useRef<HTMLInputElement | null>(null),
  useRef<HTMLInputElement | null>(null),
  useRef<HTMLInputElement | null>(null),
];


  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');
  const [alertMessage, setAlertMessage] = useState('');

  // Charger les données du backend
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('/api/Banner_service');
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
  }, []);

  const handleImageChange = (index: number, file: File | null) => {
    const updated = [...sections];
    updated[index].image = file;
    setSections(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
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
      setAlertMessage('Mise à jour réussie !');
    } catch {
      setAlertSeverity('error');
      setAlertMessage("Erreur lors de l'enregistrement.");
    } finally {
      setLoading(false);
      setAlertOpen(true);
    }
  };

  return (
    <Box className={styles.container}>
      <Typography variant="h5" className={styles.title}>
        Modifier la Bannière de Service
      </Typography>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={globalInput}
          onChange={(e) => setGlobalInput(e.target.value)}
          className={styles.globalInput}
          placeholder="Titre Global"
          required
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
              placeholder={`Titre ${i + 1}`}
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
              onClick={() => inputRefs[i].current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files?.[0];
                if (file) handleImageChange(i, file);
              }}
            >
              <CloudUploadIcon sx={{ fontSize: 40 }} />
              <p>{section.image ? section.image.name : 'Choisir ou glisser une image'}</p>
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
                  alt={`Aperçu ${i + 1}`}
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
            color="primary"
            startIcon={<SaveIcon />}
            disabled={loading}
          >
            {loading ? 'Enregistrement...' : 'Enregistrer'}
          </Button>
        </div>
      </form>

      <Snackbar
        open={alertOpen}
        autoHideDuration={4000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={alertSeverity} onClose={() => setAlertOpen(false)}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SectionFormGlobalTop;
