'use client';

import React, { useEffect, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './HeroSlider.module.css';

interface Slide {
  id: number;
  lang: 'en' | 'tr' | 'ar'; // Typage strict ici
  Icon: string;
  Titre: string;
  Description: string;
  Image: string;
}

// Définition des styles typés par langue
const textStyles: Record<'en' | 'tr' | 'ar', {
  fontFamily: string;
  lineHeight: number;
  fontSizeTitle: string;
  fontSizeDesc: string;
}> = {
  en: {
    fontFamily: "'Roboto', sans-serif",
    lineHeight: 1.4,
    fontSizeTitle: '2.5rem',
    fontSizeDesc: '1.2rem',
  },
  tr: {
    fontFamily: "'Arial', sans-serif",
    lineHeight: 1.5,
    fontSizeTitle: '2.5rem',
    fontSizeDesc: '1.2rem',
  },
  ar: {
    fontFamily: "'Noto Kufi Arabic', sans-serif",
    lineHeight: 1.7,
    fontSizeTitle: '2rem',
    fontSizeDesc: '1.2rem',
  },
};

const HeroSlider: React.FC = () => {
  const { t,i18n } = useTranslation();

  // Typage strict du currentLang avec fallback sur 'en'
  type Lang = 'en' | 'tr' | 'ar';
  const currentLangRaw = i18n.language;
  const currentLang: Lang = ['en', 'tr', 'ar'].includes(currentLangRaw) ? (currentLangRaw as Lang) : 'en';

  const [slides, setSlides] = useState<Slide[]>([]);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await fetch('/api/home-slider');
        const data = await res.json();
        setSlides(data);
      } catch (error) {
        console.error('Erreur lors du chargement des slides:', error);
      }
    };

    fetchSlides();
  }, []);

  // Filtrer les slides selon la langue actuelle
  const slidesFiltered = slides.filter(slide => slide.lang === currentLang);

  const hasMultipleSlides = slidesFiltered.length > 1;

  // Extraction des styles selon la langue
  const { fontFamily, lineHeight, fontSizeTitle, fontSizeDesc } = textStyles[currentLang];

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: '500px', sm: '600px', md: '83vh' },
        overflow: 'hidden',
        '.swiper-pagination-bullet': {
          backgroundColor: '#DE1E27',
          opacity: 1,
        },
        '.swiper-pagination-bullet-active': {
          backgroundColor: '#DE1E27',
          width: 24,
          borderRadius: '12px',
        },
      }}
    >
      {slidesFiltered.length > 0 && (
        <Swiper
          slidesPerView={1}
          loop={hasMultipleSlides}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={{ nextEl: '.custom-next', prevEl: '.custom-prev' }}
          style={{ height: '100%' }}
          modules={[Navigation, Pagination, Autoplay]}
        >
          {slidesFiltered.map(({ id, Image: bgImage, Icon: icon, Titre, Description }) => (
            <SwiperSlide key={id}>
              <Box
                sx={{
                  position: 'relative',
                  height: '100%',
                  width: '100%',
                  backgroundImage: `url(${bgImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  px: { xs: 2, sm: 4 },
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0.9,
                    backgroundColor: 'rgba(13,53,72,0.6)',
                    zIndex: 1,
                  }}
                />
                <Box
                  sx={{
                    position: 'relative',
                    zIndex: 2,
                    color: 'white',
                    textAlign: 'center',
                    maxWidth: '90%',
                    mx: 'auto',
                    fontFamily,
                  }}
                >
                  <div className={styles.contenu_slider}>
                    <Box
                      sx={{
                        position: 'relative',
                        width: 100,
                        height: 100,
                        mx: 'auto',
                        mb: 2,
                      }}
                    >
                      <Image
                        src={icon}
                        alt="icon"
                        fill
                        style={{ objectFit: 'contain' }}
                      />
                    </Box>

                    <h1
                      className={styles.title}
                      style={{ fontSize: fontSizeTitle, lineHeight }}
                    >
                      {Titre}
                    </h1>
                    <p
                      className={styles.sous_title}
                      style={{ fontSize: fontSizeDesc, lineHeight }}
                    >
                      {Description}
                    </p>

                    {/* Bouton "إستفسر الان" */}
                    <Box mt={3}>
                      <Link href="/Demande" style={{ textDecoration: 'none' }}>
                        <Box
                          component="button"
                          sx={{
                            border: '1px solid white',
                            color: 'white',
                            backgroundColor: 'transparent',
                            px: 3,
                            py: 1,
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            fontFamily: currentLang === 'ar' ? "'Noto Kufi Arabic', sans-serif" : "'Roboto', sans-serif",
                            fontSize: { xs: '0.9rem', sm: '1rem' },
                            transition: 'background-color 0.3s, color 0.3s',
                            '&:hover': {
                              backgroundColor: 'white',
                              color: '#0D3548',
                            },
                          }}
                          aria-label="إستفسر الان"
                        >
                       { t('commencer') } 
                        </Box>
                      </Link>
                    </Box>
                  </div>
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* Flèches custom */}
      {hasMultipleSlides && (
        <>
          <IconButton
            className="custom-prev"
            sx={{
              display: { xs: 'none', md: 'flex' },
              position: 'absolute',
              top: { xs: '50%', md: '40%' },
              left: 20,
              transform: 'translateY(-50%)',
              border: '2px solid white',
              color: '#fff',
              backgroundColor: 'rgba(255,255,255,0.1)',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.3)',
              },
              borderRadius: '50%',
              width: { xs: 40, md: 50 },
              height: { xs: 40, md: 50 },
              zIndex: 10,
            }}
            aria-label="Précédent"
          >
            <ArrowBackIosNew />
          </IconButton>

          <IconButton
            className="custom-next"
            sx={{
              display: { xs: 'none', md: 'flex' },
              position: 'absolute',
              top: { xs: '50%', md: '40%' },
              right: 20,
              transform: 'translateY(-50%)',
              border: '2px solid white',
              color: '#fff',
              backgroundColor: 'rgba(255,255,255,0.1)',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.3)',
              },
              borderRadius: '50%',
              width: { xs: 40, md: 50 },
              height: { xs: 40, md: 50 },
              zIndex: 10,
            }}
            aria-label="Suivant"
          >
            <ArrowForwardIos />
          </IconButton>
        </>
      )}
    </Box>
  );
};

export default HeroSlider;
