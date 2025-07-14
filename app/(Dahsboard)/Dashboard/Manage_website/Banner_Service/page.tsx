'use client';
import React, { useState, useRef } from 'react';
import { Box, Button, Alert, Snackbar, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import styles from './Description.module.css'; // adapte le chemin

const SectionFormGlobalTop = () => {
  const [globalInput, setGlobalInput] = useState('');
  const [sections, setSections] = useState([
    { input: '', textarea: '', image: null as File | null },
    { input: '', textarea: '', image: null as File | null },
    { input: '', textarea: '', image: null as File | null },
  ]);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');
  const [alertMessage, setAlertMessage] = useState('');

  const handleImageChange = (index: number, file: File | null) => {
    const updated = [...sections];
    updated[index].image = file;
    setSections(updated);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleImageChange(index, file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simule API/save
      await new Promise((res) => setTimeout(res, 1000));
      setAlertSeverity('success');
      setAlertMessage('Sections saved successfully!');
      setAlertOpen(true);
    } catch {
      setAlertSeverity('error');
      setAlertMessage('Failed to save.');
      setAlertOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className={styles.container}>
      <Typography variant="h5" className={styles.title}>
        Formulaire avec input global en haut + 3 sections
      </Typography>
<br />
      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        {/* Input global */}
        <input
          type="text"
          placeholder="Global Input"
          value={globalInput}
          onChange={(e) => setGlobalInput(e.target.value)}
          className={styles.globalInput}
          required
        />

        {/* Les 3 sections */}
        {sections.map((section, i) => (
          <div key={i} className={styles.section}>
            <input
              type="text"
              placeholder={`Input ${i + 1}`}
              value={section.input}
              onChange={(e) => {
                const updated = [...sections];
                updated[i].input = e.target.value;
                setSections(updated);
              }}
            />

            <textarea
              placeholder={`Textarea ${i + 1}`}
              value={section.textarea}
              onChange={(e) => {
                const updated = [...sections];
                updated[i].textarea = e.target.value;
                setSections(updated);
              }}
            />

            <Box
              className={styles.dropZone}
              onClick={() => inputRefs[i].current?.click()}
              onDrop={(e) => handleDrop(e, i)}
              onDragOver={(e) => e.preventDefault()}
            >
              <CloudUploadIcon sx={{ fontSize: 48, mb: 1 }} />
              <p>{section.image ? section.image.name : 'Click or drag an image'}</p>
              <p style={{ fontSize: '0.8rem', color: '#666' }}>
                800 × 800 px recommandée
              </p>

              <input
                type="file"
                hidden
                accept="image/*"
                ref={inputRefs[i]}
                onChange={(e) => handleImageChange(i, e.target.files?.[0] || null)}
              />
            </Box>

            {/* Preview image */}
            {section.image && (
              <div className={styles.previewImageWrapper}>
                <button
                  type="button"
                  className={styles.deleteBtn}
                  onClick={() => handleImageChange(i, null)}
                  aria-label="Supprimer l'image"
                >
                  <CloseIcon fontSize="small" />
                </button>
                <img
                  src={URL.createObjectURL(section.image)}
                  alt={`Preview ${i + 1}`}
                  className={styles.previewImage}
                />
              </div>
            )}
          </div>
        ))}

        {/* Bouton Submit */}
        <div className={styles.actions}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
            startIcon={<SaveIcon />}
          >
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </form>

      {/* Snackbar alert */}
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
