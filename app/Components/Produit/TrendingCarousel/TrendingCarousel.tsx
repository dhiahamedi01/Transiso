'use client';

import { Box, IconButton, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, ViewList } from '@mui/icons-material';
import ProductCard from './ProductCard';
import { products as allProducts } from '../ProductList/Data_produit'; // ✅ Import correct

export default function TrendingCarousel() {
  useEffect(() => {
    const font = new FontFace('Noto Kufi Arabic', 'url("/Font/NotoKufiArabic-VariableFont_wght.ttf")', {
      style: 'normal',
      weight: '100 900',
      display: 'swap',
    });
    font.load().then((loadedFont) => {
      document.fonts.add(loadedFont);
      document.body.style.fontFamily = "'Noto Kufi Arabic', sans-serif";
    });
  }, []);

  const topProducts = allProducts.slice(0, 10); // ✅ Prendre les 10 premiers

  return (
    <Box sx={{ px: 4, py: 6 }}>
      <Box
        sx={{
          mx: { xs: 2, sm: 4 },
          mb: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: { xs: 'column-reverse', sm: 'row' },
          textAlign: { xs: 'center', sm: 'right' },
          gap: 2,
          fontFamily: 'Noto Kufi Arabic, sans-serif'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            cursor: 'pointer',
            color: '#000',
            fontWeight: 'bold',
            fontSize: { xs: '1rem', sm: '1.2rem' }
          }}
        >
          <ViewList />
          <Typography component="span" sx={{ userSelect: 'none', fontFamily: 'Noto Kufi Arabic, sans-serif' }}>
            عرض الكل
          </Typography>
        </Box>

        <Typography
          variant="h5"
          fontWeight="bold"
          color="#0D3546"
          sx={{
            fontSize: { xs: '1.4rem', sm: '2rem' },
            mb: { xs: 1, sm: 0 },
            fontFamily: 'Noto Kufi Arabic, sans-serif'
          }}
        >
          قائمة منتجاتنا
        </Typography>
      </Box>

      <Box sx={{ position: 'relative', '&:hover .nav-button': { opacity: 1 } }}>
        <IconButton
          className="nav-button"
          sx={{
            position: 'absolute',
            top: '50%',
            left: -10,
            zIndex: 2,
            transform: 'translateY(-50%)',
            backgroundColor: 'white',
            border: '1px solid #ccc',
            opacity: 0,
            transition: '0.3s',
            '&:hover': { backgroundColor: '#f1f1f1' }
          }}
          id="prevBtn"
        >
          <ChevronLeft />
        </IconButton>

        <IconButton
          className="nav-button"
          sx={{
            position: 'absolute',
            top: '50%',
            right: -10,
            zIndex: 2,
            transform: 'translateY(-50%)',
            backgroundColor: 'white',
            border: '1px solid #ccc',
            opacity: 0,
            transition: '0.3s',
            '&:hover': { backgroundColor: '#f1f1f1' }
          }}
          id="nextBtn"
        >
          <ChevronRight />
        </IconButton>

        <Box sx={{ overflow: 'visible', px: 2 }}>
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: '#nextBtn',
              prevEl: '#prevBtn'
            }}
            spaceBetween={20}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 }
            }}
          >
            {topProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <Box sx={{ mx: 1, height: '100%' }}>
                  <ProductCard product={product} />
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Box>
    </Box>
  );
}
