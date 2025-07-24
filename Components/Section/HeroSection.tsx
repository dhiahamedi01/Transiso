'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTranslation } from 'react-i18next';
import styles from './HeroSecion.module.css';

interface BannerData {
  titre1: string;
  description1: string;
  image1: string;
  titre2: string;
  description2: string;
  image2: string;
}

const HeroSection = () => {
  const { t,i18n } = useTranslation();
  const [data, setData] = useState<BannerData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const lang = i18n.language || 'en';
        const res = await fetch(`/api/Manage_website/Banner?lang=${lang}`);
        if (!res.ok) throw new Error('Erreur réseau');
        const json: BannerData = await res.json();
        setData(json);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanner();
  }, [i18n.language]); // Re-exécute si la langue change

  if (loading) {
    return <p className={styles.loading}>Chargement...</p>;
  }

  if (!data) {
    return <p className={styles.error}>Impossible de charger les données.</p>;
  }

  return (
    <>
      {/* Section 1 : Fret aérien */}
      <div className={styles.heroContainer}>
        <div className={styles.backgroundImage}>
          <Image
            src={data.image1}
            alt="Fret aérien"
            width={1200}
            height={400}
            className={styles.img}
            priority
          />
        </div>

        <div
          className={styles.contentBox}
          dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
        >
          <h1 className={styles.title}>{data.titre1}</h1>
          <p className={styles.description}>{data.description1}</p>
          <div className={styles.buttonContainer}>
            <Button
              variant="contained"
              endIcon={<ArrowBackIcon />}
              className={styles.btn}
            >
               {t('button_now')}
            </Button>
          </div>
        </div>
      </div>

      {/* Section 2 : Fret maritime */}
      <div className={styles.heroContainer2}>
        <div
          className={styles.contentBox}
          dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
        >
          <h1 className={styles.title}>{data.titre2}</h1>
          <p className={styles.description}>{data.description2}</p>
          <div className={styles.buttonContainer}>
            <Button
              variant="contained"
              endIcon={<ArrowBackIcon />}
              className={styles.btn}
            >
             {t('button_now')}
            </Button>
          </div>
        </div>

        <div className={styles.backgroundImage}>
          <Image
            src={data.image2}
            alt="Fret maritime"
            width={1200}
            height={400}
            className={styles.img}
            priority
          />
        </div>
      </div>
    </>
  );
};

export default HeroSection;
