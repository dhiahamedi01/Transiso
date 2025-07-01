'use client'; 
import React from 'react'
import styles from './Banner.module.css'
import Image from 'next/image'
import DoneIcon from '@mui/icons-material/Done';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useTranslation } from 'react-i18next';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
const Banner2 = () => {
  const { t, i18n } = useTranslation('common'); 
  const currentLang = i18n.language;


  const isRTL = currentLang === 'ar';

  return (
    <div
      className={styles.banner2}
      dir={isRTL ? 'rtl' : 'ltr'}
      style={{ textAlign: isRTL ? 'right' : 'left' }}
    >
      <div className={ currentLang === 'ar'
          ? `${styles.partieTexte} ${styles.rtl}`
          : `${styles.partieTexte2} ${styles.ltr}`}>
        <div className={ currentLang === 'ar'
          ? `${styles.abou_titre} ${styles.rtl}`
          : `${styles.abou_titre2} ${styles.ltr}`}>

          <Image src="/img/icon/droite.svg" alt="about" width={25} height={25} className={styles.icon_about} />
          <span className={styles.sous_titre}>{t('banner2.aboutTitle')}</span>
          <Image src="/img/icon/gauche.svg" alt="droite" width={25} height={25} className={styles.icon_about} />
        </div>
        <h1>{t('banner2.mainTitle')}</h1>
        <p className={styles.description}>{t('banner2.description')}</p>

        <div
      className={
        currentLang === 'ar'
          ? `${styles.card_about} ${styles.rtl}`
          : `${styles.card_about2} ${styles.ltr}`
      }
    >
          <div className={styles.left_about}>
            <Image
              src="/img/icon/rapide2.svg"
              alt="Package icon"
              width={48}
              height={48}
              className={styles.mainIcon_about}
            />
            <div className={styles.text_about}>
              <h3 className={styles.title_about}>{t('banner2.trackingTitle')}</h3>
              <p className={styles.subtitle_about}>{t('banner2.trackingDesc')}</p>
            </div>
          </div>

          <ul className={styles.list_about}>
            <li className={styles.item_about}>
              <CheckCircleIcon className={styles.check_about} />
              {t('banner2.list.item1')}
            </li>
            <li className={styles.item_about}>
              <CheckCircleIcon className={styles.check_about} />
              {t('banner2.list.item2')}
            </li>
            <li className={styles.item_about}>
              <CheckCircleIcon className={styles.check_about} />
              {t('banner2.list.item3')}
            </li>
          </ul>
        </div>

        <div className={styles.Footer_about}>
        <button>
          {currentLang === 'ar' ? (
            <>
              {t('banner2.buttonText')}
              <KeyboardBackspaceIcon style={{ marginRight: '8px' }} />
            </>
          ) : (
            <>
              {t('banner2.buttonText')}
              <ArrowRightAltIcon style={{ marginLeft: '5px' }} />
            </>
          )}
        </button>

        </div>
      </div>

      <div className={styles.partieImage}>
        <Image
          src="/img/Untitled-1.png"
          alt="about"
          width={750}
          height={790}
          className={styles.Image}
        />
      </div>
    </div>
  );
};

export default Banner2;
