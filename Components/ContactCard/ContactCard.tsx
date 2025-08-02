'use client';

import React, { useEffect, useState } from 'react';
import styles from './ContactCard.module.css';
import Image from 'next/image';
import PhoneIcon from '@mui/icons-material/Phone';
import { useTranslation } from 'react-i18next';

const ContactCard = () => {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language);

  useEffect(() => {
    const handleLangChange = (lng: string) => {
      setLang(lng); // force re-render
    };

    i18n.on('languageChanged', handleLangChange);
    return () => {
      i18n.off('languageChanged', handleLangChange);
    };
  }, [i18n]);

  return (
    <div className={styles.container}>
      <div className={styles.contactCard}>
        <div className={styles.topSection}>
          <Image
            src="/img/service-details-sidebar-img.png"
            alt={t('contactCard.supportImageAlt')}
            width={200}
            height={150}
            className={styles.contactImage}
          />
        </div>

        <div className={styles.orangeBar}>
          <div className={styles.iconWrapper}>
            <PhoneIcon sx={{ color: '#ffffff', fontSize: 18 }} />
          </div>
        </div>

        <div className={styles.bottomSection}>
          <h3 className={styles.phoneNumber}>5377671027 (90 +)</h3>
          <p className={styles.helpText}>
            {t('contactCard.helpText')}
          </p>
          <button className={styles.callButton}>
            {t('contactCard.callNow')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
