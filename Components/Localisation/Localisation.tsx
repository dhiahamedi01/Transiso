'use client';

import React, { useState, useEffect } from 'react';
import { Typography, Box, Card, Skeleton } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useTranslation } from 'react-i18next';

const Localisation = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000); 

    return () => clearTimeout(timer);
  }, []);

  const { t, i18n } = useTranslation('common'); 
  const currentLang = i18n.language;


  const isRTL = currentLang === 'ar';
  return (
    <Box
      sx={{
        maxWidth: '1520px',
        margin: '45px auto 40px',
        paddingInline: '20px',
        paddingTop: '30px',
      }}
    >

      {/* Titre */}
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
        {t('titre_map')}
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
        {t('sous_titre_map')}
        </Typography>

      {/* Map Card */}
      <Card
        sx={{
          width: '100%',
          height: { xs: 380, sm: 480, md: 580 }, // Hauteur augmentée
          overflow: 'hidden',
          boxShadow: 3,
          marginTop: '40px',
          border: '2px solid #d3d3d3',
          position: 'relative',
        }}
      >
        {!isLoaded && (
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            animation="wave"
            sx={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
          />
        )}

        <iframe
          title="Localisation Istanbul"
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ border: 0, visibility: isLoaded ? 'visible' : 'hidden' }}
          allowFullScreen
          loading="lazy"
          src="https://www.google.com/maps?q=41.059431,28.652300&z=13&output=embed"

        ></iframe>
      </Card>
    </Box>
  );
};

export default Localisation;
