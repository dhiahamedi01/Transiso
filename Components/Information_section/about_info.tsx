'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './about.module.css';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

interface ExpertiseData {
  title: string;
  title_highlight: string;
  description: string;
  service_1_title: string;
  service_1_description: string;
  service_1_icon_bg: string;
  service_1_icon: string;
  service_2_title: string;
  service_2_description: string;
  service_2_icon_bg: string;
  service_2_icon: string;
  feature_1: string;
  feature_2: string;
  feature_3: string;
  feature_4: string;
  cta_text: string;
  founder_name: string;
  founder_role: string;
  founder_image: string;
  founder_signature: string;
  image_main: string;
}

interface ExpertiseProps {
  aboutRef: React.RefObject<HTMLDivElement | null>;
}

export default function Expertise({ aboutRef }: ExpertiseProps) {
  const { i18n } = useTranslation();
  const [data, setData] = useState<ExpertiseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lang = i18n.language || 'en';
        const res = await axios.get(`/api/expertise?lang=${lang}`);
        setData(res.data);
      } catch (err) {
        console.error('Erreur lors du chargement des données :', err);
        setError('Une erreur est survenue.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [i18n.language]);

  const handleScrollToAbout = () => {
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) return <div className={styles.expertiseContainer}>Chargement...</div>;
  if (error || !data) return <div className={styles.expertiseContainer}>{error}</div>;

  return (
    <section className={styles.expertiseContainer} dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <div className={styles.expertiseImage}>
        <img
          src={data.image_main || '/img/section/about2.png'}
          alt="Expertise Image"
          className={styles.expertiseImageImg}
        />
      </div>

      <div className={styles.expertiseContent}>
        <h2 className={styles.h2}>
          {data.title} <span className={styles.highlight}>{data.title_highlight}</span>
        </h2>
        <p className={styles.p}>{data.description}</p>

        <div className={styles.servicesRow}>
          <div className={`${styles.serviceBox} ${styles.horizontal}`}>
            <div
              className={styles.iconCircle}
              style={{ backgroundImage: `url(${data.service_1_icon_bg})` }}
            >
              <img
                src={data.service_1_icon}
                alt={data.service_1_title}
                className={styles.iconCircleImg}
              />
            </div>
            <div className={styles.serviceText}>
              <h4 className={styles.serviceTextH4}>{data.service_1_title}</h4>
              <p className={styles.serviceTextP}>{data.service_1_description}</p>
            </div>
          </div>

          <div className={`${styles.serviceBox} ${styles.horizontal}`}>
            <div
              className={styles.iconCircle}
              style={{ backgroundImage: `url(${data.service_2_icon_bg})` }}
            >
              <img
                src={data.service_2_icon}
                alt={data.service_2_title}
                className={styles.iconCircleImg}
              />
            </div>
            <div className={styles.serviceText}>
              <h4 className={styles.serviceTextH4}>{data.service_2_title}</h4>
              <p className={styles.serviceTextP}>{data.service_2_description}</p>
            </div>
          </div>
        </div>

        <ul className={styles.features}>
          <li className={styles.featuresLi}>
            <span className={styles.checkIcon}></span> {data.feature_1}
          </li>
          <li className={styles.featuresLi}>
            <span className={styles.checkIcon}></span> {data.feature_2}
          </li>
          <li className={styles.featuresLi}>
            <span className={styles.checkIcon}></span> {data.feature_3}
          </li>
          <li className={styles.featuresLi}>
            <span className={styles.checkIcon}></span> {data.feature_4}
          </li>
        </ul>

        <div className={styles.cta}>
          <button
            onClick={handleScrollToAbout}
            className={classNames(styles.readMore, {
              [styles.readMoreRtl]: i18n.language === 'ar',
            })}
          >
            <span className={styles.readMoreText}>{data.cta_text}</span>
            <span
              className={classNames(styles.arrowCircle, {
                [styles.arrowCircleRtl]: i18n.language === 'ar',
              })}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 24 24"
                className={styles.arrowIcon}
              >
                <path
                  d="M5 12h14M13 5l7 7-7 7"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>

         {/* <div className={styles.founder}>
            <img
              src={data.founder_image}
              alt={data.founder_name}
              className={styles.founderImg}
            />
            <div className={styles.founderInfo}>
              <h4>{data.founder_name}</h4>
              <p>{data.founder_role}</p>
            </div>
            <img
              src={data.founder_signature}
              alt="Signature"
              className={styles.signature}
            />
          </div>*/}
        </div>
      </div>
    </section>
  );
}
