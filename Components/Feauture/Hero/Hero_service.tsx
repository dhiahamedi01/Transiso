'use client'

import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Style from './Hero.module.css'

const imagesBySlug = {
  Plane: '/img/Hero/page_bg_2.png',
  customs: '/img/import.jpg',
  truck: '/img/Hero/about_img01.png',
  Sea: '/img/Hero/page_bg_1.png',
} as const

type SlugType = keyof typeof imagesBySlug

function Hero_service() {
  const pathname = usePathname()
  const slug = pathname.split('/').pop() as SlugType | undefined

  const imageSrc = (slug && imagesBySlug[slug]) || '/img/Hero/page_bg_2.png'

  return (
    <>
      <Head>
        <link rel="preload" as="image" href={imageSrc} />
      </Head>

      <div className={Style.hero2}>
        <div className={Style.imageWrapper}>
          <Image
            src={imageSrc}
            alt={`Hero background for ${slug}`}
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
