'use client';

import React from 'react';
import { Box, IconButton } from '@mui/material';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import styles from './HeroSlider.module.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const slides = [

  {
    id: 2,
    title: 'موانئ العالم',
    description: 'نقدم خدمات الشحن من اسطنبول وتركيا توفر ال ترانسيسكو لوجستيك عبر الموانئ التركية خدمة شحن الحاويات البحرية إلى معظم دول العالم',
    image: '/img/Slide/slide2.jpg',
  },
  {
    id: 3,
    title: 'ترانسيسكو لوجستيك',
    description: 'نقدم خدمات الشحن من اسطنبول وتركيا توفر ال ترانسيسكو لوجستيك عبر الموانئ التركية خدمة شحن الحاويات البحرية إلى معظم دول العالم',
    image: '/img/Slide/slide3.jpg',
  },
    {
    id: 4,
    title: 'عبر المطارات التركية',
    description: 'نأتي إليك أينما كنت مع خدمات النقل الجوي العالمية من تركيا إلى العالم توفر ال ترانسيسكو لوجستيك الإمدادات اللازمة لأعمالكم عبر الشحن الجوي',
    image: '/img/Slide/airt.jpg',
  }
];

const HeroSlider: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: '500px', md: '80vh' },
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
      <Swiper
        slidesPerView={1}
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={{
          nextEl: '.custom-next',
          prevEl: '.custom-prev',
        }}
        style={{ height: '100%' }}
        modules={[Navigation, Pagination, Autoplay]}
      >
        {slides.map(({ id, title, description, image }) => (
          <SwiperSlide key={id}>
            <Box
              sx={{
                position: 'relative',
                height: { xs: '500px', md: '80vh' },
                width: '100%',
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                px: 2,
              }}
            >
              {/* Overlay (masque) */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(13, 53, 72, 0.6)', // Masque semi-transparent
                  zIndex: 1,
                }}
              />

              {/* Contenu du slide */}
              <Box
                sx={{
                  position: 'relative',
                  zIndex: 2,
                  color: 'white',
                  textAlign: 'center',
                  textShadow: '0 0 10px rgba(0,0,0,0.7)',
                }}
              >
                <div className={styles.contenu_slider}>
                    <Image className={styles.icon_slider} src='/img/icon/ocean-freight.svg' alt="" width={100} height={100}/>
                    <h1  className={styles.title} style={{ fontSize: '3rem', marginBottom: 10 }}>{title}</h1>
                    <p className={styles.sous_title}  style={{ fontSize: '1.2rem', maxWidth: 600 }}>{description}</p>
                </div>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Boutons navigation personnalisés */}
      <IconButton
        className="custom-prev"
        sx={{
          position: 'absolute',
          top: '40%',
          left: 20,
          transform: 'translateY(-50%)',
          border: '2px solid white',
          color: '#fff',
          backgroundColor: 'rgba(255,255,255,0.1)',
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.3)',
          },
          borderRadius: '50%',
          width: 50,
          height: 50,
          zIndex: 10,
        }}
        aria-label="Précédent"
      >
        <ArrowBackIosNew />
      </IconButton>

      <IconButton
        className="custom-next"
        sx={{
          position: 'absolute',
          top: '40%',
          right: 20,
          transform: 'translateY(-50%)',
          border: '2px solid white',
          color: '#fff',
          backgroundColor: 'rgba(255,255,255,0.1)',
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.3)',
          },
          borderRadius: '50%',
          width: 50,
          height: 50,
          zIndex: 10,
        }}
        aria-label="Suivant"
      >
        <ArrowForwardIos />
      </IconButton>
    </Box>
  );
};

export default HeroSlider;
