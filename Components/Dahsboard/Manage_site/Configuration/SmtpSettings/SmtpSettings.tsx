'use client';
import * as React from 'react';
import { Typography, Box, TextField, Button } from '@mui/material';

interface SmtpSettingsProps {
  smtpHost: string;
  setSmtpHost: React.Dispatch<React.SetStateAction<string>>;
  smtpPort: string;
  setSmtpPort: React.Dispatch<React.SetStateAction<string>>;
  smtpUser: string;
  setSmtpUser: React.Dispatch<React.SetStateAction<string>>;
  smtpPass: string;
  setSmtpPass: React.Dispatch<React.SetStateAction<string>>;
}

export default function SmtpSettings({
  smtpHost,
  setSmtpHost,
  smtpPort,
  setSmtpPort,
  smtpUser,
  setSmtpUser,
  smtpPass,
  setSmtpPass,
}: SmtpSettingsProps) {
  const handleSmtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`SMTP settings submitted:
    Host: ${smtpHost}
    Port: ${smtpPort}
    User: ${smtpUser}`);
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        SMTP Email Configuration
      </Typography>
      <Box component="form" onSubmit={handleSmtpSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
        <TextField label="SMTP Host" value={smtpHost} onChange={(e) => setSmtpHost(e.target.value)} required />
        <TextField label="Port" type="number" value={smtpPort} onChange={(e) => setSmtpPort(e.target.value)} required />
        <TextField label="User" value={smtpUser} onChange={(e) => setSmtpUser(e.target.value)} required />
        <TextField label="Password" type="password" value={smtpPass} onChange={(e) => setSmtpPass(e.target.value)} required />
        <Button type="submit" variant="contained">
          Save SMTP
        </Button>
      </Box>
    </>
  );
}
