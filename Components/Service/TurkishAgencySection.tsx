'use client';
import React from 'react';
import styles from './TurkishAgencySection.module.css';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useTranslation } from 'react-i18next';

function TurkishAgencySection() {
  const { t, i18n } = useTranslation();

  const direction = i18n.language === 'ar' ? 'rtl' : 'ltr';
  const textAlign = direction === 'rtl' ? 'right' : 'left';

  return (
    <div className={styles.sectionWrapper}>
      <section
        className={styles.sectionContainer}
        dir={direction}
        style={{ direction, textAlign }}
      >
        {/* Texte à gauche */}
        <div className={styles.textContainer} style={{ textAlign }}>
          <h2 className={styles.mainTitle}>
            {t('detaille_service.mainTitle')}
          </h2>

          <div className={styles.highlightLine}>
            <VerifiedIcon className={styles.icon} />
            <span>{t('detaille_service.subTitle')}</span>
          </div>

          <h3 className={styles.questionTitle}>
            {t('detaille_service.question')}
          </h3>

          <p className={styles.description}>
            {t('detaille_service.description')}
          </p>

          <p className={styles.description}>
            {t('detaille_service.introList')}
          </p>

            <ul className={`${styles.bulletList} ${direction === 'rtl' ? styles.rtl : styles.ltr}`}>
                <li>{t('detaille_service.list.0')}</li>
                <li>{t('detaille_service.list.1')}</li>
                <li>{t('detaille_service.list.2')}</li>
                <li>{t('detaille_service.list.3')}</li>
                </ul>

        </div>

        {/* Image à droite */}
        <div className={styles.imageContainer}>
          <img src="/img/4-1.png" alt="Produits Turcs" className={styles.image} />
        </div>
      </section>
    </div>
  );
}

export default TurkishAgencySection;
