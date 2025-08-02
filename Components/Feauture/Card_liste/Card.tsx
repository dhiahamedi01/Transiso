'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './Card.module.css';
import { useTranslation } from 'react-i18next';

const cardsData = [
  {
    key: 'partial_shipping',
    icon: '/img/icon/cargo.svg',
    className: styles.card,
    delay: 0,
    href: '/Services/customs',
  },
  {
    key: 'air_shipping',
    icon: '/img/icon/departures.svg',
    className: styles.card1,
    delay: 100,
    href: '/Services/Plane',
  },
  {
    key: 'sea_shipping',
    icon: '/img/icon/cargo-ship.svg',
    className: styles.card2,
    delay: 200,
    href: '/Services/Sea',
  },
  {
    key: 'land_shipping',
    icon: '/img/icon/exhibitor.svg',
    className: styles.card3,
    delay: 300,
    href: '/Services/truck',
  }
];

const Card = () => {
  const { t } = useTranslation('common');
  const router = useRouter();

  return (
    <div className={styles.Liste_card}>
      {cardsData.map(({ key, icon, className, delay, href }) => (
        <div
          key={key}
          className={className}
          data-aos="fade-up"
          data-aos-delay={delay}
          onClick={() => router.push(href)}
          style={{ cursor: 'pointer' }} // Ajoute un curseur clic
        >
          <div className={styles.contenue}>
            <Image
              className={styles.icon}
              src={icon}
              alt={t(`card2.${key}`)}
              width={80}
              height={80}
            />
            <span className={styles.span}>{t(`card2.${key}`)}</span>
          </div>
          <div className={styles.description}>
            {t(`card2.description.${key}`)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
