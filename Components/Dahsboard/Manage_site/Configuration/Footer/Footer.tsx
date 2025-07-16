'use client';

import * as React from 'react';
import axios from 'axios';
import { Typography, TextField, Box, Button, Alert } from '@mui/material';

export default function FooterSettings() {
  const [footerDesc, setFooterDesc] = React.useState('');
  const [openingTime, setOpeningTime] = React.useState('');
  const [closingTime, setClosingTime] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  React.useEffect(() => {
    axios.get('/api/footer')
      .then(({ data }) => {
        setFooterDesc(data.footer_desc);
        setOpeningTime(data.opening_time?.slice(0, 5));
        setClosingTime(data.closing_time?.slice(0, 5));
      })
      .catch(() => {
        setMessage('Error loading data.');
        setError(true);
      });
  }, []);

  const handleSave = () => {
    setMessage('');
    setError(false);
    setSuccess(false);

    axios.put('/api/footer', {
      footer_desc: footerDesc,
      opening_time: openingTime + ':00',
      closing_time: closingTime + ':00',
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
    <>
      <Typography variant="h6" gutterBottom>
        Footer Description
      </Typography>
      <TextField
        fullWidth
        multiline
        minRows={4}
        placeholder="Enter footer description here..."
        value={footerDesc}
        onChange={(e) => setFooterDesc(e.target.value)}
        variant="outlined"
        sx={{ mb: 3 }}
      />

      <Typography variant="subtitle1" gutterBottom>
        Opening and Closing Hours
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label="Opening Time"
          type="time"
          value={openingTime}
          onChange={(e) => setOpeningTime(e.target.value)}
          InputLabelProps={{ shrink: true }}
          inputProps={{ step: 300 }}
        />
        <TextField
          label="Closing Time"
          type="time"
          value={closingTime}
          onChange={(e) => setClosingTime(e.target.value)}
          InputLabelProps={{ shrink: true }}
          inputProps={{ step: 300 }}
        />
      </Box>

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
    </>
  );
}
