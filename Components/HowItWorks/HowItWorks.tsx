'use client';

import React from 'react';
import styles from './HowItWorks.module.css';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const HowItWorks: React.FC = () => {
  const { t, i18n } = useTranslation();

  // Récupère titre, étapes et direction
  const title = t('howItWorks.title');
  const steps = t('howItWorks.steps', { returnObjects: true }) as string[];
  const direction = t('howItWorks.direction') as 'rtl' | 'ltr';

  return (
    <section className={styles.section} style={{ direction }}>
      <Typography variant="h3" className={styles.titleFixed}>
        {title}
      </Typography>
      <div className={styles.mask}>
        <Box className={styles.cardsWrapper}>
          {steps.map((step, index) => (
            <Box key={index} className={styles.card}>
              <Typography className={styles.stepNumber}>{index + 1}</Typography>
              <Typography className={styles.stepText}>{step}</Typography>
            </Box>
          ))}
        </Box>
      </div>
    </section>
  );
};

export default HowItWorks;
