'use client';

import React from 'react';
import { Box, IconButton } from '@mui/material';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { slides } from './slidesData';
import styles from './HeroSlider.module.css';

const HeroSlider: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: '500px', sm: '600px', md: '80vh' },
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
        {slides.map(({ id, title, description, image, icon }) => (
          <SwiperSlide key={id}>
            <Box
              sx={{
                position: 'relative',
                height: '100%',
                width: '100%',
                backgroundImage: `url(${image})`,
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
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(13, 53, 72, 0.6)',
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
                }}
              >
                <div className={styles.contenu_slider}>
                  <Image
                    className={styles.icon_slider}
                    src={icon}
                    alt="icon"
                    width={100}
                    height={100}
                    style={{ objectFit: 'contain', maxWidth: '100%' }}
                  />
                  <h1 className={styles.title}>{title}</h1>
                  <p className={styles.sous_title}>{description}</p>
                </div>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>

      <IconButton
        className="custom-prev"
        sx={{
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
    </Box>
  );
};

export default HeroSlider;
