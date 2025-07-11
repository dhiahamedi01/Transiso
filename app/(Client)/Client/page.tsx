'use client';

import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography, Fade } from '@mui/material';

function Dashboard_client() {
  const [userName, setUserName] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
      setShowWelcome(true);
    }
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      {showWelcome && (
        <Fade in={showWelcome} timeout={800}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              mb: 4,
              backgroundColor: '#f0f4ff',
              borderLeft: '6px solid #1976d2',
              borderRadius: 2,
            }}
          >
            <Typography variant="h5" fontWeight="bold" sx={{ color: '#1976d2' }}>
              Welcome, {userName} 👋
            </Typography>
            <Typography variant="body1" sx={{ mt: 1, color: '#333' }}>
              Glad to have you back on your dashboard.
            </Typography>
          </Paper>
        </Fade>
      )}
    </Box>
  );
}

export default Dashboard_client;
