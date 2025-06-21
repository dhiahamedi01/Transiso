'use client';

import React from 'react';
import { Fab, Zoom } from '@mui/material';
import { KeyboardArrowUp, WhatsApp } from '@mui/icons-material';
import { useScrollTrigger } from '@mui/material';

const WhatsappButtons: React.FC = () => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 300,
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const openWhatsapp = () => {
    const phone = '+905377671027';
    const message = encodeURIComponent('Bonjour !');
    const url = `https://wa.me/${phone}?text=${message}`;
    window.open(url, '_blank');
  };

  return (
    <>
      {/* Bouton WhatsApp */}
      <Fab
        onClick={openWhatsapp}
        aria-label="Contact via WhatsApp"
        sx={{
          position: 'fixed',
          bottom: 104, // juste au-dessus du bouton scroll
          right: 32,
          zIndex: 1000,
          backgroundColor: '#25D366',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#1ebe5b',
          },
          boxShadow: '0px 4px 20px rgba(0,0,0,0.3)',
          transition: 'all 0.3s ease-in-out',
        }}
      >
        <WhatsApp />
      </Fab>

      {/* Bouton Scroll vers le haut */}
      <Zoom in={trigger}>
        <Fab
          onClick={scrollToTop}
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
          <KeyboardArrowUp />
        </Fab>
      </Zoom>
    </>
  );
};

export default WhatsappButtons;
