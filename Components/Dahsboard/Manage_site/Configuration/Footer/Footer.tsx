'use client';

import * as React from 'react';
import axios from 'axios';
import { Typography, TextField, Box, Button, Alert, Stack } from '@mui/material';

export default function FooterSettings() {
  const [footerDesc, setFooterDesc] = React.useState('');
  const [lang, setLang] = React.useState<'ar' | 'tr' | 'en'>('en');
  const [message, setMessage] = React.useState('');
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const fetchData = (selectedLang: 'ar' | 'tr' | 'en') => {
    axios.get(`/api/footer?lang=${selectedLang}`)
      .then(({ data }) => {
        setFooterDesc(data.footer_desc || '');
      })
      .catch(() => {
        setMessage('Error loading data.');
        setError(true);
      });
  };

  React.useEffect(() => {
    fetchData(lang);
  }, [lang]);

  const handleSave = () => {
    setMessage('');
    setError(false);
    setSuccess(false);

    axios.put('/api/footer', {
      footer_desc: footerDesc,
      lang,
    })
      .then(() => {
        setMessage('Settings saved successfully!');
        setSuccess(true);
      })
      .catch(() => {
        setMessage('Error saving settings.');
        setError(true);
      });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Footer Description ({lang.toUpperCase()})
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Button variant={lang === 'ar' ? 'contained' : 'outlined'} onClick={() => setLang('ar')}>AR</Button>
        <Button variant={lang === 'tr' ? 'contained' : 'outlined'} onClick={() => setLang('tr')}>TR</Button>
        <Button variant={lang === 'en' ? 'contained' : 'outlined'} onClick={() => setLang('en')}>EN</Button>
      </Stack>

      <TextField
        fullWidth
        multiline
        minRows={4}
        placeholder="Enter footer description here..."
        value={footerDesc}
        onChange={(e) => setFooterDesc(e.target.value)}
        variant="outlined"
        sx={{ mb: 2 }}
      />

      <Button variant="contained" onClick={handleSave}>
        Save Settings
      </Button>

      {message && (
        <Alert
          severity={error ? 'error' : success ? 'success' : 'info'}
          sx={{ mt: 2 }}
        >
          {message}
        </Alert>
      )}
    </Box>
  );
}
