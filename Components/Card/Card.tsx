'use client';
import React from 'react';
import styles from './Card.module.css';
import Image from 'next/image';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { useTranslation } from 'react-i18next';

function RedLineWithAnimatedArrow() {
  return (
    <div className={styles.redLineWrapper}>
      <DoubleArrowIcon sx={{ fontSize: '30px' }} className={styles.animatedArrow} />
    </div>
  );
}

function Card() {
  const { t, i18n } = useTranslation('common');
  const currentLang = i18n.language;
  const isRTL = currentLang === 'ar';

  return (
    <>
      <div
        className={styles.sectionHeader}>
        <h4 className={styles.sectionSubheading}   dir={isRTL ? 'rtl' : 'ltr'}
        style={{ direction: isRTL ? 'rtl' : 'ltr' }}>{t('card.subtitle')}</h4>
        <h2 className={styles.sectionHeading}>{t('card.title')}</h2>
        <p className={styles.sectionDescription}>{t('card.description')}</p>
        <RedLineWithAnimatedArrow />
      </div>

      <section className={styles.infoSection}>
        <div className={styles.card}>
          <div className={`${styles.icon} ${styles.redBg}`}>
            <Image
              src="/img/icon/groupe.png"
              alt="team"
              width={40}
              height={40}
              className={styles.icon_about}
            />
          </div>
          <h3 className={styles.heading}>{t('card.items.team.title')}</h3>
          <p className={styles.text}>{t('card.items.team.text')}</p>
        </div>

        <div className={`${styles.card} ${styles.darkBg}`}>
          <div className={`${styles.icon} ${styles.redBorder}`}>
            <Image
              src="/img/icon/Rapide.svg"
              alt="delivery"
              width={40}
              height={40}
              className={styles.icon_about2}
            />
          </div>
          <h3 className={styles.heading}>{t('card.items.delivery.title')}</h3>
          <p className={styles.text}>{t('card.items.delivery.text')}</p>
        </div>

        <div className={styles.card}>
          <div className={`${styles.icon} ${styles.redBg}`}>
            <Image
              src="/img/icon/client.svg"
              alt="support"
              width={40}
              height={40}
              className={styles.icon_about}
            />
          </div>
          <h3 className={styles.heading}>{t('card.items.support.title')}</h3>
          <p className={styles.text}>{t('card.items.support.text')}</p>
        </div>
      </section>
    </>
  );
}

export default Card;
