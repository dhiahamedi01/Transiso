'use client';

import * as React from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Avatar,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { blue } from '@mui/material/colors';

export default function LogoUploadDynamic() {
  const [logo, setLogo] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [submitting, setSubmitting] = React.useState(false);

  // Pour l'alerte sous la card
  const [alertMessage, setAlertMessage] = React.useState('');
  const [alertSeverity, setAlertSeverity] = React.useState<'success' | 'error' | undefined>(undefined);

  React.useEffect(() => {
    async function fetchLogo() {
      try {
        const res = await axios.get('/api/Manage_website/Logo');
        setLogo(res.data.Logo || null);
      } catch (error) {
        console.error('Erreur lors du chargement du logo :', error);
        setAlertMessage('Erreur lors du chargement du logo');
        setAlertSeverity('error');
      } finally {
        setLoading(false);
      }
    }

    fetchLogo();
  }, []);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setAlertMessage('');
    setAlertSeverity(undefined); // Corrected here
    try {
      const input = document.getElementById('logo-upload-input') as HTMLInputElement;
      const file = input?.files?.[0];
      if (!file) throw new Error('Aucun fichier sélectionné');

      const formData = new FormData();
      formData.append('logo', file);

      const res = await axios.put('/api/Manage_website/Logo', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setLogo(res.data.logoUrl); // Met à jour l'affichage avec le nouveau chemin

      setAlertMessage('Logo sauvegardé avec succès !');
      setAlertSeverity('success');
    } catch (error: any) {
      console.error('Erreur lors du PUT logo :', error);
      setAlertMessage(error.response?.data?.error || 'Erreur lors de la sauvegarde du logo');
      setAlertSeverity('error');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width: 600, mx: 'auto' }}>
      <Box
        sx={{
          height: 160,
          borderRadius: 3,
          border: `2px dashed ${blue[400]}`,
          bgcolor: logo ? 'transparent' : '#f9f9f9',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: blue[400],
          position: 'relative',
          overflow: 'hidden',
          transition: 'background-color 0.3s, border-color 0.3s',
          '&:hover': {
            bgcolor: logo ? 'transparent' : '#e3f2fd',
            borderColor: blue[600],
          },
        }}
        onClick={() => {
          const input = document.getElementById('logo-upload-input');
          input?.click();
        }}
      >
        {logo ? (
          <Avatar
            src={logo}
            alt="Website Logo"
            variant="rounded"
            sx={{ width: '100%', height: '100%', borderRadius: 3 }}
          />
        ) : (
          <>
            <UploadFileIcon sx={{ fontSize: 48, mb: 1 }} />
            <Typography variant="body2" textAlign="center" sx={{ px: 2 }}>
              Glissez votre logo ou cliquez pour sélectionner un fichier
            </Typography>
          </>
        )}
        <input
          id="logo-upload-input"
          type="file"
          accept="image/*"
          hidden
          onChange={handleLogoUpload}
          onClick={(e) => e.stopPropagation()}
        />
      </Box>

      <Button
        variant="contained"
        sx={{
          mt: 3,
          backgroundColor: '#4F46E5',
          '&:hover': { backgroundColor: '#4338ca' },
          textTransform: 'none',
        }}
        onClick={handleSubmit}
        disabled={submitting}
      >
        {submitting ? (
          <>
            <CircularProgress size={20} sx={{ mr: 1, color: 'white' }} />
            Enregistrement...
          </>
        ) : (
          'Sauvegarder le logo'
        )}
      </Button>

      {alertMessage && (
        <Alert
          severity={alertSeverity}
          sx={{ mt: 3 }}
          onClose={() => {
            setAlertMessage('');
            setAlertSeverity(undefined);
          }}
        >
          {alertMessage}
        </Alert>
      )}
    </Box>
  );
}
