'use client';
import React from 'react';
import styles from './Card_service.module.css';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { useTranslation } from 'react-i18next';

function RedLineWithAnimatedArrow() {
  return (
    <div className={styles.redLineWrapper}>
      <DoubleArrowIcon sx={{ fontSize: '30px' }} className={styles.animatedArrow} />
    </div>
  );
}

function Card_service() {
  const { t } = useTranslation('common');

  return (
    <div className={styles.cardServiceContainer}>
      {/* Image en haut à gauche de la section */}


      <div className={styles.sectionHeader}>
        <h4 className={styles.sectionSubheading}>{t('card_service.subheading')}</h4>
        <h2 className={styles.sectionHeading}>{t('card_service.heading')}</h2>
        <p className={styles.sectionDescription}>{t('card_service.description')}</p>
      </div>

      <RedLineWithAnimatedArrow />
    </div>
  );
}

export default Card_service;
