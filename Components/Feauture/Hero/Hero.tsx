'use client'

import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Style from './Hero.module.css'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next';

function Hero() {
  const pathname = usePathname();
  const { t, i18n } = useTranslation('common');
  const currentLang = i18n.language;
  const isRTL = currentLang === 'ar';

  const getContent = () => {
    switch (pathname) {
      case '/About':
        return {
          title: [t('titre_hero')],
          breadcrumbs: [t('home'), t('about')],
        };
      case '/Liste_produit':
        return {
          title: t('products2'),
          breadcrumbs: [t('home'), t('products2')],
        };
      case '/Services':
        return {
          title: t('services'),
          breadcrumbs: [t('home'), t('services')],
        };
      case '/Contact':
        return {
          title: t('contact'),
          breadcrumbs: [t('home'), t('contact')],
        };
      case '/Demande':
        return {
          title: t('inquiryOnline'),
          breadcrumbs: [t('home'), t('inquiryOnline')],
        };
      default:
        return {
          title: t('notCreatedYet'),
          breadcrumbs: [t('home')],
        };
    }
  };

  const { title, breadcrumbs } = getContent();

  return (
    <>
      <Head>
        <link rel="preload" as="image" href="/img/Hero/inner-page1.webp" />
      </Head>

      <div className={Style.hero}>
        <div className={Style.imageWrapper}>
          <Image
            src="/img/Hero/inner-page1.webp"
            alt="Hero background"
            fill
            style={{ objectFit: 'cover' }}
            placeholder="blur"
            blurDataURL="/img/Hero/inner-page1.webp"
            priority
          />
        </div>

        <div className={Style['hero-content']} data-aos="fade-up">
          <h1>{title}</h1>
          <div className={Style.breadcrumb}>
            {breadcrumbs.map((item, index) => (
              <a key={index} href="#">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
