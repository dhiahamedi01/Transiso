'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Card, CardContent, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import styles from './ContactCards.module.css';

const ContactCards = () => {
  const { t, i18n } = useTranslation();
  const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';

  return (
    <Box className={styles.container} dir={dir}>
      <Card className={styles.card}>
        <CardContent>
          <Box className={styles.iconBox}>
            <LocationOnIcon className={styles.icon} />
            <Typography variant="h6" className={styles.title}>
              {t('addressTitle')}
            </Typography>
          </Box>
          <Typography className={styles.text}>{t('address')}</Typography>
        </CardContent>
      </Card>

      <Card className={styles.card}>
        <CardContent>
          <Box className={styles.iconBox}>
            <PhoneIcon className={styles.icon} />
            <Typography variant="h6" className={styles.title}>
              {t('phoneTitle')}
            </Typography>
          </Box>
          <Typography className={styles.text}>{t('phone')}</Typography>
        </CardContent>
      </Card>

      <Card className={styles.card}>
        <CardContent>
          <Box className={styles.iconBox} sx={{paddingTop:'10px'}}>
            <EmailIcon className={styles.icon} />
            <Typography variant="h6" className={styles.title}>
              {t('emailTitle')}
            </Typography>
          </Box>
          <Typography className={styles.text}>{t('email')}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ContactCards;
