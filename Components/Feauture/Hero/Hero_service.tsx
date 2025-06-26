'use client'

import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Style from './Hero.module.css'

function Hero_service() {

  return (
    <>
      <Head>
        <link rel="preload" as="image" href="/img/Hero/about_img01.png" />
      </Head>

      <div className={Style.hero2}>
        <div className={Style.imageWrapper}>
          <Image
            src="/img/Hero/page_bg_2.png"
            alt="Hero background"
            fill
            style={{ objectFit: 'cover' }}
            placeholder="blur"
            blurDataURL="/img/Hero/about_img01.png"
            priority
          />
        </div>
      </div>
    </>
  )
}

export default Hero_service
