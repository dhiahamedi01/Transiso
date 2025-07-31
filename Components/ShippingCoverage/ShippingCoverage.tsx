import React from 'react';
import Image from 'next/image';
import { Box, Typography, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import styles from './ShippingCoverage.module.css';

// Définition du type de chaque région
interface Region {
  title: string;
  description: string;
  icon: string;
}

export default function ShippingCoverage() {
  const { t, i18n } = useTranslation();

  // On récupère les régions comme un tableau d'objets
  // Le cast est important pour TS, sinon il ne sait pas que c'est un tableau
  const regions = t('map.regions', { returnObjects: true }) as Region[];

  const isRTL = i18n.language === 'ar';

  return (
    <>
      <Box
        className={styles.header}
        sx={{ direction: isRTL ? 'rtl' : 'ltr', textAlign: isRTL ? 'right' : 'left' }}
      >
        <Typography variant="h4" component="h2" className={styles.headerTitle}>
          {t('map.headerTitle')}
        </Typography>
        <Typography component="p" className={styles.headerText}>
          {t('map.headerText')}
        </Typography>
      </Box>

      <Box
        className={styles.container}
        sx={{ direction: isRTL ? 'ltr' : 'rtl' }}
      >
        <Box className={styles.mapContainer}>
          <Image
            src="/img/map.svg"
            alt="World map showing shipping coverage"
            width={1000}
            height={600}
            className={styles.mapImage}
          />
        </Box>

        <Box className={styles.textContainer} sx={{ direction: isRTL ? 'rtl' : 'ltr' }}>
          <Stack spacing={4} justifyContent="center" height="100%">
            {regions.map((region: Region, idx: number) => (
             <Box
             key={idx}
             className={styles.regionBox}
             sx={{
               textAlign: isRTL ? 'right' : 'left',
               direction: isRTL ? 'rtl' : 'ltr',
             }}
           >
             <Image
               src={region.icon}
               alt={region.title}
               width={80}
               height={80}
               className={styles.regionIcon}
             />
             <Box className={styles.regionBoxContent}>
               <Typography
                 variant="h6"
                 color="#ED1C24"
                 fontWeight={600}
                 className={styles.arabica}
               >
                 {region.title}
               </Typography>
               <Typography
                 variant="body2"
                 color="#0D3548"
                 className={styles.arabica}
               >
                 {region.description}
               </Typography>
             </Box>
           </Box>
           
            ))}
          </Stack>
        </Box>
      </Box>
    </>
  );
}
