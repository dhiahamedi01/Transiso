'use client';

import React from 'react';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import styles from './AboutSection.module.css';
import { Typography, Box, Chip, Stack } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';

const AboutSection = () => {
  const { t, i18n } = useTranslation();
  const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';

  // 🔧 Typage explicite pour éviter les erreurs TS
  const keywords = t('keywords', { returnObjects: true }) as string[];
  const values = t('values.items', { returnObjects: true }) as string[];
  const whyItems = t('why.items', { returnObjects: true }) as string[];

  return (
    <>
      <Head>
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
        <meta name="keywords" content={keywords.join(', ')} />
      </Head>

      <Box className={styles.aboutSection} dir={dir}>
        <Box className={styles.bloc}>
          <Typography variant="h5" className={styles.subtitle}>
            - {t('mission.title')}
          </Typography>
          <Typography className={styles.paragraph}>
            {t('mission.text')}
          </Typography>
        </Box>

        <Box className={styles.bloc}>
          <Typography variant="h5" className={styles.subtitle}>
            - {t('vision.title')}
          </Typography>
          <Typography className={styles.paragraph}>
            {t('vision.text')}
          </Typography>
        </Box>

        <Box className={styles.bloc}>
          <Typography variant="h5" className={styles.subtitle}>
            - {t('values.title')}
          </Typography>
          <ul className={styles.list}>
            {values.map((item, i) => (
              <li key={i}>
                <strong>• </strong>
                {item}
              </li>
            ))}
          </ul>
        </Box>

        <Box className={styles.bloc}>
          <Typography variant="h5" className={styles.subtitle}>
            {t('why.title')}
          </Typography>
          <ul className={styles.list}>
            {whyItems.map((item, i) => (
              <li key={i}>
                <VerifiedIcon className={styles.icon} /> {item}
              </li>
            ))}
          </ul>
        </Box>

        <Stack direction="row" flexWrap="wrap" gap={1} justifyContent="center" mt={4}>
          {keywords.map((keyword, i) => (
            <Chip key={i} label={keyword} className={styles.tag} />
          ))}
        </Stack>
      </Box>
    </>
  );
};

export default AboutSection;
