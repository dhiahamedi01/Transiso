'use client'

import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Style from './Hero.module.css'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next';

function Hero() {
  const pathname = usePathname()
  const { t, i18n } = useTranslation('common');
  const currentLang = i18n.language;


  const isRTL = currentLang === 'ar';

  const getContent = () => {
    switch (pathname) {
      case '/About':
        return {
          title: t('titre_hero'),
          breadcrumbs: ['الرئيسية', 'عن الشركة'],
        }
      case '/Liste_produit':
        return {
          title: 'قائمة منتجاتنا',
          breadcrumbs: ['الرئيسية', 'المنتجات'],
        }
      case '/Services':
        return {
          title: 'خدماتنا في ترانسيسو',
          breadcrumbs: ['الرئيسية', 'خدماتنا  '],
        }
      case '/Contact':
        return {
          title: 'نحن هنا لخدمتك',
          breadcrumbs: ['الرئيسية', 'إتصل بنا'],
        }
      case '/Demande':
        return {
          title: 'الاستفسار وطلب عروض الأسعار',
          breadcrumbs: ['الرئيسية', 'استفسر الآن'],
          }  
      default:
        return {
          title: 'لم يتم إنشائه بعد',
          breadcrumbs: ['الرئيسية'],
        }
    }
  }

  const { title, breadcrumbs } = getContent()

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
  )
}

export default Hero
