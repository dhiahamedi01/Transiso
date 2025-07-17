'use client';

import React, { useEffect, useState } from 'react';
import { Typography, Box, TextField, Button, Alert, Snackbar } from '@mui/material';

export default function PersonalInformation() {
  const [location, setLocation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  const [loading, setLoading] = useState(true);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/Manage_website/PersonalInformation');
        if (!res.ok) throw new Error('Erreur lors du chargement');
        const data = await res.json();
        setLocation(data.location || '');
        setPhoneNumber(data.phoneNumber || '');
        setEmail(data.email || '');
      } catch {
        setAlertMessage('Erreur lors du chargement des données');
        setAlertSeverity('error');
        setAlertOpen(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/Manage_website/PersonalInformation', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location, phoneNumber, email }),
      });
      const data = await res.json();
      if (res.ok) {
        setAlertMessage('Informations mises à jour avec succès !');
        setAlertSeverity('success');
      } else {
        setAlertMessage(data.error || 'Erreur lors de la mise à jour');
        setAlertSeverity('error');
      }
    } catch {
      setAlertMessage('Erreur réseau');
      setAlertSeverity('error');
    } finally {
      setAlertOpen(true);
      setLoading(false);
    }
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Personal Information
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}
      >
        <TextField
          label="Localisation"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          disabled={loading}
        />
        <TextField
          label="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
          disabled={loading}
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? 'Chargement...' : 'Enregistrer'}
        </Button>
      </Box>

      <Snackbar
        open={alertOpen}
        autoHideDuration={4000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setAlertOpen(false)} severity={alertSeverity} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
