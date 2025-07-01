'use client';

import React from 'react';
import Image from 'next/image';
import styles from './Section.module.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import { useTranslation } from 'react-i18next';

const Section: React.FC = () => {

  const { t, i18n } = useTranslation('common'); 
  const listItems = t('section.list', { returnObjects: true }) as string[];
  const avatars = t('section.avatars', { returnObjects: true }) as string[];
  
  const directionClass = i18n.dir() === 'rtl' ? 'dir-rtl' : 'dir-ltr';
  return (
    <div className={`${styles.about} ${directionClass}`}>
      <div className={styles.block12}>
        <Image
          src="/img/about_img01.png"
          alt="about"
          width={500}
          height={500}
          style={{ height: 'auto', width: '100%', maxWidth: '500px' }}
        />
      </div>

      <div className={styles.block13}>
        <div className={styles.text}>
          <div className={styles.titre}>
            <h4 className={styles.section_title2}>{t('section.subheading')}</h4>
            <span className={styles.sous_titre}>{t('section.subtitle')}</span>
          </div>
          <p className={styles.desc}>{t('section.description')}</p>
        </div>
        <br />
        <div className={styles.liste2}>
          <div className={styles.partie1AR}>
            <ul>
              {listItems.map((item: string, index: number) => (
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
                {avatars.map((img: string, index: number) => (
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
              <span className={styles.text_mini}>{t('section.ratingText')}</span>
            </div>
            <div className={styles.experience}>
              <div className={styles.nbr}>
                <span>{t('section.experienceYears')}</span>
              </div>
              <div className={styles.anne}>
                <span>{t('section.experienceLabel')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section;
