'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './Service.module.css';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

interface ServiceData {
  titre_globale?: string;
  titre1?: string;
  description1?: string;
  icon1?: string;
  titre2?: string;
  description2?: string;
  icon2?: string;
  titre3?: string;
  description3?: string;
  icon3?: string;
  lang?: string;
}

// <-- Ici, turc 'tr' est retiré de rtlLangs, car turc est LTR
const rtlLangs = ['ar'];

const Service = () => {
  const { i18n } = useTranslation();
  const [data, setData] = useState<ServiceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lang = i18n.language || 'en';
        setLoading(true);
        const response = await axios.get(`/api/Banner_service?lang=${lang}`);
        setData(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [i18n.language]);

  const isRTL = rtlLangs.includes(i18n.language);
  const direction = isRTL ? 'rtl' : 'ltr';

  if (loading) return <p>Chargement...</p>;
  if (!data) return <p>Pas de données disponibles.</p>;

  return (
    <section
      className={styles['services-section']}
      dir={direction}
      style={{ textAlign: isRTL ? 'right' : 'left' }}
    >
      <div className={styles.service_tout}>
        <div
          className={styles['Service-logistic']}
          style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}
        >
          <div className={styles.part1}>
            <div className={styles['service-title']}>
              {data.titre_globale?.split('\n').map((line, idx) => (
                <React.Fragment key={idx}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </div>
            <div className={styles['footer-servcie']}>
              <button className={styles['service-btn']}>
                <Image
                  src="/img/icon/customer-service.svg"
                  alt="customer"
                  width={25}
                  height={25}
                  priority
                />
                &ensp; {isRTL ? 'تواصل معنا' : 'Contact us'}
              </button>
            </div>
          </div>
          <div className={styles.part2}>
            <Image
              src="/img/delivery-men.png"
              alt="Delivery men"
              width={400}
              height={300}
              priority
            />
          </div>
        </div>

        <div className={styles['Service-etape']} style={{ direction }}>
  {[1, 2, 3].map((num) => (
    <div key={num} className={styles[`etape${num}`]}>
      <div className={styles.icon}>
        <Image
          src={
            data[`icon${num}` as keyof ServiceData] ||
            `/img/icon/truck_icon.png`
          }
          alt={`Service ${num}`}
          width={40}
          height={40}
          priority
        />
      </div>
      <div className={styles['etape-text']}>
        <div
          className={
            num === 1
              ? styles['etape-titre']
              : styles['etape-titre2']
          }
          style={{ textAlign: isRTL ? 'right' : 'left' }}
        >
          {data[`titre${num}` as keyof ServiceData]}
        </div>
        <div
          className={
            num === 1
              ? styles['etape-desc']
              : styles['etape-desc2']
          }
          style={{ textAlign: isRTL ? 'right' : 'left' }}
        >
          {data[`description${num}` as keyof ServiceData]}
        </div>
      </div>
    </div>
  ))}
</div>

      </div>
    </section>
  );
};

export default Service;
