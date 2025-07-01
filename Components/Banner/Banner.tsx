'use client';

import React from 'react';
import Image from 'next/image';
import styles from './Banner.module.css';
import { useTranslation } from 'react-i18next';

function Banner() {
  const { t, i18n } = useTranslation('common');
  const currentLang = i18n.language;
  const isRTL = currentLang === 'ar';

  return (
    <div className={styles.banner} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className={styles.imageWrapper}>
        <Image 
          src="/img/element/shape-image.png" 
          alt="Shape" 
          layout="fill" 
          objectFit="cover" 
          className={styles.shapeImage} 
          priority
        />
      </div>

      <div className={styles.textWrapper}>
        <h2 className={styles.title}>{t('banner.title')}</h2>
        <p className={currentLang === 'ar'
          ? `${styles.subtitle} ${styles.rtl}`
          : `${styles.subtitle} ${styles.ltr}`}>
          
          {t('banner.subtitle')}</p>
        <div className={styles.footerWrapper}>
           <button className={styles.button}>{t('banner.buttonText')}</button>
        </div>
      </div>
    </div>
  );
}

export default Banner;
