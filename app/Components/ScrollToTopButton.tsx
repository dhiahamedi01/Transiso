'use client';

import React from 'react';
import { Fab, Zoom } from '@mui/material';
import { KeyboardArrowUp } from '@mui/icons-material';
import { useScrollTrigger } from '@mui/material';

const ScrollToTopButton: React.FC = () => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 300,
  });

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Zoom in={trigger}>
      <Fab
        onClick={handleClick}
        color="error" 
        aria-label="scroll back to top"
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          zIndex: 1000,
          backgroundColor: '#d32f2f', 
          color: '#fff',
          '&:hover': {
            backgroundColor: '#b71c1c',
          },
          boxShadow: '0px 4px 20px rgba(0,0,0,0.3)',
          transition: 'all 0.3s ease-in-out',
        }}
      >
        <KeyboardArrowUp  />
      </Fab>
    </Zoom>
  );
};

export default ScrollToTopButton;
