'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './Section.module.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import { useTranslation } from 'react-i18next';

interface DescriptionData {
  titre: string;
  sous_titre: string;
  description: string;
  service1: string;
  service2: string;
  service3: string;
  service4: string;
}

const avatars = [
  'avatar-1.jpg',
  'avatar-2.jpg',
  'avatar-3.jpg',
  'avatar-4.jpg',
  'avatar-5.jpg',
  'avatar-6.jpg',
  'avatar-7.jpg',
];

const Section: React.FC = () => {
  const { t,i18n } = useTranslation();
  const [data, setData] = useState<DescriptionData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/Manage_website/description?lang=${i18n.language}`);
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error('Erreur lors du chargement de la description:', error);
      }
    };

    fetchData();
  }, [i18n.language]);

  if (!data) return null;
  const directionClass = i18n.language === 'ar' ? 'dir-rtl' : 'dir-ltr';

  const listItems = [data.service1, data.service2, data.service3, data.service4];

  return (
    <div className={`${styles.about} dir-rtl`}>
      <div className={styles.block12}>
        <div style={{ position: 'relative', width: '500px', height: '500px' }}>
          <Image
            src="/img/about_img01.png"
            alt="عن الشركة"
            fill
            style={{ objectFit: 'contain', borderRadius: '8px' }}
          />
        </div>
      </div>

      <div className={`${styles.block13} dir-rtl`}>
        <div className={styles.text}>
          <div className={styles.titre}>
            <h4 className={styles.section_title2}>{data.titre}</h4>
            <span className={styles.sous_titre}>{data.sous_titre}</span>
          </div>
          <p className={styles.desc}>{data.description}</p>
        </div>
        <br />
        <div className={styles.liste2}>
          <div className={styles.partie1AR}>
            <ul>
              {listItems.map((item, index) => (
                <li key={index}>
                  <CheckCircleIcon style={{ color: '#E71D26', fontSize: '21px' }} />
                  &ensp;{item}
                </li>
              ))}
            </ul>
          </div>
          <div className={`${styles.partie2} ${styles.RTL_direction}`}>
            <div className={styles['text-rating']}>
              <div className={styles['liste-user']}>
                {avatars.map((img, index) => (
                  <div className={styles.user} key={index}>
                    <Image
                      src={`/img/Avatar/${img}`}
                      alt={`user-${index + 1}`}
                      width={30}
                      height={30}
                      style={{ borderRadius: '50%' }}
                    />
                  </div>
                ))}
              </div>
              <div className={styles.rating}>
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    style={{ color: '#fca208', marginRight: '5px', fontSize: '1.2rem' }}
                  />
                ))}
              </div>
              <span className={styles.text_mini}>{t('rate_client')}</span>
            </div>
            <div className={styles.experience}>
              <div className={styles.nbr}>
                <span>+25</span>
              </div>
              <div className={styles.anne}>
                <span >{t('section.experienceLabel')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section;
