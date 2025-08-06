'use client';

import Hero_service from '@/Components/Feauture/Hero/Hero_service';
import React from 'react';
import styles from '../[id]/Service.module.css';
import Image from 'next/image';
import FAQ from '@/Components/FAQ/FAQ';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SecurityIcon from '@mui/icons-material/Security';
import { Typography } from '@mui/material';
import OtherServices from '@/Components/Service/Side_card/OtherServices';
import { useTranslation } from 'react-i18next';
import Link from "next/link";
function Page() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar'; // Détection langue arabe pour RTL

  return (
    <>
      <Hero_service />
      <div className={`${styles.Paper} ${isRtl ? styles.rtl : styles.ltr}`}>
        <div className={styles.Paper_g}>
          <div className={styles.partie3}>
            <Typography variant="h5" fontWeight={700} className={styles.Arabic2}>
              {t('truck.main_services')}
              <div className={styles.titleUnderline} />
            </Typography>
            <OtherServices />
          </div>

          <div className={styles.partie1}>
            <div className={styles.contenue}>
              <div className={styles.image_demande}>
                <Image
                  className={styles.imagec}
                  src="/img/Background/quote.svg"
                  alt="msg"
                  width={50}
                  height={50}
                />
              </div>
              <h2 className={styles.titre_demande}>{t('truck.request_help_title')}</h2>
              <div className={styles.Description_demande}>{t('truck.request_help_description')}</div>
              <div className={styles.button_demande}>
              <Link href='/Demande'>
                <button className={styles.btn_arabic}>
                  <Image
                    src="/img/Background/email.svg"
                    alt="icon"
                    className={styles.btn_icon}
                    width={20}
                    height={20}
                  />
                  {t('truck.ask_now')}
                </button>
              </Link>
              </div>
            </div>
            <div className={styles.bottom_image_container}>
              <Image
                src="/img/Background/user.png"
                alt="footer decoration"
                width={220}
                height={250}
                className={styles.bottom_image}
              />
            </div>
          </div>
        </div>

        <div className={styles.Paper_d}>
          <h1 className={styles.sectionHeading2}>{t('truck.title')}</h1>

          <div className={styles.description}>{t('truck.description1')}</div>
          <div className={styles.description}>{t('truck.description2')}</div>
          <div className={styles.description}>{t('truck.description3')}</div>
          <div className={styles.description}>{t('truck.description4')}</div>
          <div className={styles.description}>{t('truck.description5')}</div>
          <div className={styles.description}>{t('truck.description6')}</div>

          <div className={styles.Card}>
            <div className={styles.sous_Card1}>
              <div className={styles.texts_card}>
                <div className={styles.titre_card}>
                  <LocalShippingIcon className={styles.icon_card} />
                  {t('truck.card1_title')}
                </div>
                <div className={styles.desc_card}>{t('truck.card1_description')}</div>
              </div>
            </div>

            <div className={styles.sous_Card1}>
              <div className={styles.texts_card}>
                <div className={styles.titre_card}>
                  <SecurityIcon className={styles.icon_card} />
                  {t('truck.card2_title')}
                </div>
                <div className={styles.desc_card}>{t('truck.card2_description')}</div>
              </div>
            </div>
          </div>

          <FAQ />
        </div>
      </div>
    </>
  );
}

export default Page;
