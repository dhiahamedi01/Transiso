import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Style from './Hero.module.css'

function Hero() {
  return (
    <>
      <Head>
        <link rel="preload" as="image" href="/img/Hero/inner-page1.webp" />
      </Head>

      <div className={Style.hero}>
        <div className={Style.imageWrapper}>
          <Image src="/img/Hero/inner-page1.webp" alt="Hero background"
            fill style={{ objectFit: 'cover' }} placeholder="blur"
            blurDataURL="/img/Hero/inner-page1-blur.webp"  priority />
        </div>

        <div className={Style['hero-content']} data-aos="fade-up">
          <h1>مرحباً بكم في ترانسيسكو لوجستيك</h1>
          <div className={Style.breadcrumb}>
            <a href="#">الرئيسية</a>
            <a href="#">عن الشركة</a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Hero
