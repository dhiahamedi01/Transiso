'use client';

import React from 'react';
import { Typography, Box, Card } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Localisation = () => {
  return (
    <Box
      sx={{
        maxWidth: '1220px',
        margin: '45px auto 40px',
        paddingInline: '20px',
      }}
    >
      {/* Icône de localisation rouge */}
      <Box sx={{ textAlign: 'center', mb: 1 }}>
        <LocationOnIcon sx={{ fontSize: 40, color: 'red' }} />
      </Box>

      {/* Titre principal */}
      <Typography
        variant="h4"
        sx={{
          fontSize: '30px',
          color: '#0C3645',
          fontWeight: 700,
          fontFamily: '"Noto Kufi Arabic", sans-serif',
          textAlign: 'center',
        }}
      >
        موقعنا في اسطنبول
      </Typography>

      {/* Sous-titre */}
      <Typography
        sx={{
          fontSize: '18px',
          color: '#555',
          fontWeight: 400,
          fontFamily: '"Noto Kufi Arabic", sans-serif',
          textAlign: 'center',
          mt: 2,
        }}
      >
        يمكنك زيارتنا في مكتبنا بإسطنبول في أي وقت
      </Typography>

      {/* Carte Google avec cadre rouge */}
      <Card
        sx={{
          width: '100%',
          height: { xs: 320, sm: 420, md: 520 },
          overflow: 'hidden',
          boxShadow: 3,
          marginTop: '70px',
          border: '2px solid #d3d3d3;', // Cadre rouge vif
        }}
      >
        <iframe
          title="Localisation Istanbul"
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ border: 0 }}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12042.674695195986!2d28.9783596!3d41.0082376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab9c09c6f9e57%3A0x5e527e57e5e13b2b!2sIstanbul!5e0!3m2!1sfr!2str!4v1687712345678"
          allowFullScreen
        ></iframe>
      </Card>
    </Box>
  );
};

export default Localisation;
