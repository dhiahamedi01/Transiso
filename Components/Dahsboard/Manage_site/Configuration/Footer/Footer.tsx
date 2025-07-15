'use client';
import * as React from 'react';
import { Typography, TextField, Box } from '@mui/material';

interface FooterSettingsProps {
  footerDesc: string;
  setFooterDesc: React.Dispatch<React.SetStateAction<string>>;
  openingTime: string;
  setOpeningTime: React.Dispatch<React.SetStateAction<string>>;
  closingTime: string;
  setClosingTime: React.Dispatch<React.SetStateAction<string>>;
}

export default function FooterSettings({
  footerDesc,
  setFooterDesc,
  openingTime,
  setOpeningTime,
  closingTime,
  setClosingTime,
}: FooterSettingsProps) {
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
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          label="Opening"
          type="time"
          value={openingTime}
          onChange={(e) => setOpeningTime(e.target.value)}
          InputLabelProps={{ shrink: true }}
          inputProps={{ step: 300 }}
        />
        <TextField
          label="Closing"
          type="time"
          value={closingTime}
          onChange={(e) => setClosingTime(e.target.value)}
          InputLabelProps={{ shrink: true }}
          inputProps={{ step: 300 }}
        />
      </Box>
    </>
  );
}
