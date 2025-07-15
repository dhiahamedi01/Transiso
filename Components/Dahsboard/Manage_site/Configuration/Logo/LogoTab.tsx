'use client';

import * as React from 'react';
import { Box, Typography, Avatar, Button } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { blue } from '@mui/material/colors';

export default function LogoUploadDynamic() {
  const [logo, setLogo] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [submitting, setSubmitting] = React.useState(false);

  React.useEffect(() => {
    async function fetchLogo() {
      try {
        const res = await fetch('/api/logo');
        if (!res.ok) throw new Error('Erreur lors du fetch du logo');
        const data = await res.json();
        setLogo(data.Logo || null);
      } catch (error) {
        console.error(error);
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
    if (!logo) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/logo', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ logo }),
      });
      if (!res.ok) throw new Error('Erreur lors de la sauvegarde du logo');
      const result = await res.json();
      alert('Logo sauvegardé avec succès !');
      setLogo(result.logoUrl || logo);
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Typography>Chargement du logo...</Typography>;
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
              Drag & drop your logo here or click to select a file
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
        disabled={submitting || !logo}
      >
        {submitting ? 'Enregistrement...' : 'Sauvegarder le logo'}
      </Button>
    </Box>
  );
}
