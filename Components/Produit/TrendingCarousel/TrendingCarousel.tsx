'use client';

import { Box, IconButton, Typography, CircularProgress } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, ViewList } from '@mui/icons-material';
import ProductCard from './ProductCard';
import { useTranslation } from 'react-i18next';
import { useProducts } from '@/hooks/useProducts';

export default function TrendingCarousel() {
  const { t } = useTranslation();
  const { products, loading, error } = useProducts();

  useEffect(() => {
    const font = new FontFace(
      'Noto Kufi Arabic',
      'url("/Font/NotoKufiArabic-VariableFont_wght.ttf")',
      {
        style: 'normal',
        weight: '100 900',
        display: 'swap',
      }
    );
    font.load().then((loadedFont) => {
      document.fonts.add(loadedFont);
      document.body.style.fontFamily = "'Noto Kufi Arabic', sans-serif";
    });
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || products.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography color="error">{t('productList.noProducts') || 'Aucun produit à afficher.'}</Typography>
      </Box>
    );
  }

  const topProducts = products.slice(0, 10).map((p) => ({
    id: p.id,
    title: p.name,
    price: Number(p.price),
    oldPrice: p.old_price ? Number(p.old_price) : undefined,
    image: p.image1 || '/img/no-image.png',
    rating: 5, // à adapter si tu stockes la note dans la DB plus tard
    description: p.description || '',
    category: p.category,
  }));

  return (
    <Box sx={{ px: 4, py: 6, zoom: '0.9', paddingInline: '80px' }}>
      <Box
        sx={{
          mx: { xs: 2, sm: 5 },
          mb: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: { xs: 'column-reverse', sm: 'row' },
          textAlign: { xs: 'center', sm: 'right' },
          gap: 2,
          direction: 'ltr',
          fontFamily: 'Noto Kufi Arabic, sans-serif',
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
            fontSize: { xs: '1rem', sm: '1.2rem' },
          }}
        >
          <ViewList />
          <Typography component="span" sx={{ userSelect: 'none',
    fontFamily: 'Noto Kufi Arabic, sans-serif',  }}>
            {t('productList.categories.0')}
          </Typography>
        </Box>

        <Typography
          variant="h5"
          fontWeight="bold"
          color="#0D3546"
          sx={{
            fontSize: { xs: '1.3rem', sm: '1.6rem' },  fontFamily: 'Noto Kufi Arabic, sans-serif'
          }}
        >
          {t('productList.title')}
        </Typography>
      </Box>

      <Box sx={{ position: 'relative', '&:hover .nav-button': { opacity: 1 } }}>
        <IconButton
          className="nav-button"
          sx={{
            position: 'absolute',
            top: '50%',
            left: -25,
            zIndex: 2,
            transform: 'translateY(-50%)',
            backgroundColor: 'white',
            border: '1px solid #ccc',
            opacity: 0,
            transition: '0.3s',
            '&:hover': { backgroundColor: '#f1f1f1' },
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
            right: -25,
            zIndex: 2,
            transform: 'translateY(-50%)',
            backgroundColor: 'white',
            border: '1px solid #ccc',
            opacity: 0,
            transition: '0.3s',
            '&:hover': { backgroundColor: '#f1f1f1' },
          }}
          id="nextBtn"
        >
          <ChevronRight />
        </IconButton>

        <Box sx={{ overflow: 'visible', px: 4 }}>
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: '#nextBtn',
              prevEl: '#prevBtn',
            }}
            spaceBetween={20}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
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
