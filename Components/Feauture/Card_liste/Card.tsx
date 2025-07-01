'use client';
import React from 'react';
import Image from 'next/image';
import styles from './Card.module.css';
import WestIcon from '@mui/icons-material/West';
import { useTranslation } from 'react-i18next';

const Card = () => {
  const { t } = useTranslation('common'); // Utilise le namespace 'common.json'

  return (
    <div className={styles.Liste_card}>
      <div className={styles.card} data-aos="fade-up">
        <div className={styles.contenue}>
          <Image
            className={styles.icon}
            src="/img/icon/cargo.svg"
            alt="cargo"
            width={80}
            height={80}
          />
          <span className={styles.span}>{t('card2.partial_shipping')}</span>
        </div>
        <div className={styles.description}>
          {t('card2.description')}
        </div>
      </div>

      <div className={styles.card1} data-aos="fade-up" data-aos-delay="100">
        <div className={styles.contenue}>
          <Image
            className={styles.icon}
            src="/img/icon/departures.svg"
            alt="cargo"
            width={80}
            height={80}
          />
          <span className={styles.span}>{t('card2.air_shipping')}</span>
        </div>
        <div className={styles.description}>
          {t('card2.description')}
        </div>
      </div>

      <div className={styles.card2} data-aos="fade-up" data-aos-delay="200">
        <div className={styles.contenue}>
          <Image
            className={styles.icon}
            src="/img/icon/cargo-ship.svg"
            alt="cargo"
            width={80}
            height={80}
          />
          <span className={styles.span}>{t('card2.sea_shipping')}</span>
        </div>
        <div className={styles.description}>
          {t('card2.description')}
        </div>
      </div>

      <div className={styles.card3} data-aos="fade-up" data-aos-delay="300">
        <div className={styles.contenue}>
          <Image
            className={styles.icon}
            src="/img/icon/exhibitor.svg"
            alt="cargo"
            width={80}
            height={80}
          />
          <span className={styles.span}>{t('card2.land_shipping')}</span>
        </div>
        <div className={styles.description}>
          {t('card2.description')}
        </div>
      </div>
    </div>
  );
};

export default Card;
