'use client';

import React, { useState, useEffect } from 'react';
import styles from './Banner.module.css';
import Image from 'next/image';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const Banner2 = () => {
  const { t, i18n } = useTranslation('common');
  const currentLang = i18n.language;
  const isRTL = currentLang === 'ar';

  const [data, setData] = useState<{
    titre?: string;
    sous_titre?: string;
    description?: string;
    titre_track?: string;
    description_track?: string;
    list?: string[];
    buttonText?: string;
  }>({});

  // On charge les données depuis API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/Manage_website/About');
        const about = res.data;

        // Construire la liste dynamique à partir des services, ou fixe sinon
        const listItems = [
          about.service1,
          about.service2,
          about.service,
        ].filter(Boolean);

        setData({
          titre: about.titre,
          sous_titre: about.sous_titre,
          description: about.description,
          titre_track: about.titre_track,
          description_track: about.description_track,
          list: listItems.length ? listItems : undefined,
          buttonText: t('banner2.buttonText'), // on peut garder le texte traduit
        });
      } catch (error) {
        console.error('Failed to load about data', error);
      }
    };

    fetchData();
  }, [t]);

  return (
    <div
      className={styles.banner2}
      dir={isRTL ? 'rtl' : 'ltr'}
      style={{ textAlign: isRTL ? 'right' : 'left' }}
    >
      <div
        className={
          isRTL ? `${styles.partieTexte} ${styles.rtl}` : `${styles.partieTexte2} ${styles.ltr}`
        }
      >
        <div className={isRTL ? `${styles.abou_titre} ${styles.rtl}` : `${styles.abou_titre2} ${styles.ltr}`}>
          <Image src="/img/icon/droite.svg" alt="about" width={25} height={25} className={styles.icon_about} />
          <span className={styles.sous_titre}>{data.sous_titre || t('banner2.aboutTitle')}</span>
          <Image src="/img/icon/gauche.svg" alt="droite" width={25} height={25} className={styles.icon_about} />
        </div>

        <h1>{data.titre || t('banner2.mainTitle')}</h1>

        <p className={styles.description}>{data.description || t('banner2.description')}</p>

        <div
          className={isRTL ? `${styles.card_about} ${styles.rtl}` : `${styles.card_about2} ${styles.ltr}`}
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
              <h3 className={styles.title_about}>{data.titre_track || t('banner2.trackingTitle')}</h3>
              <p className={styles.subtitle_about}>{data.description_track || t('banner2.trackingDesc')}</p>
            </div>
          </div>

          <ul className={styles.list_about}>
            {(data.list ?? [t('banner2.list.item1'), t('banner2.list.item2'), t('banner2.list.item3')]).map((item, idx) => (
              <li key={idx} className={styles.item_about}>
                <CheckCircleIcon className={styles.check_about} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.Footer_about}>
          <button>
            {isRTL ? (
              <>
                {data.buttonText || t('banner2.buttonText')}
                <KeyboardBackspaceIcon style={{ marginRight: '8px' }} />
              </>
            ) : (
              <>
                {data.buttonText || t('banner2.buttonText')}
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
          width={680}
          height={700}
          className={styles.Image}
        />
      </div>
    </div>
  );
};

export default Banner2;
